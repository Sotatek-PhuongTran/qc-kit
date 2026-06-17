#!/usr/bin/env python3
"""
Kiểm tra tính nhất quán của thư viện QC UI Action Collector (bản RUNTIME).

Chạy:
  python scripts/validate.py                 # mặc định: ../qc/ui-act-library
  python scripts/validate.py <library-dir>   # trỏ tới 1 ui-act-library khác

Cấu trúc <library-dir> kỳ vọng:
  <library-dir>/ac-library/atomic_actions.yaml
  <library-dir>/ac-library/composite_actions.yaml
  <library-dir>/ui-elements/**/*.md           (Lean field set, bỏ qua file _*.md)

Danh mục category đọc từ references/conventions.yaml của SKILL (nguồn chung).

Bắt các lỗi:
  - Trùng `id` / `canonical` (theo ngôn ngữ) trong atomic / composite.
  - Alias collision: một alias map về >1 canonical khác nhau.
  - `category` không nằm trong danh mục đóng ở conventions.yaml.
  - composite.steps[].action không tồn tại trong atomic.
  - composite.page không có file ui-elements tương ứng.
  - composite.steps[].target sai định dạng "<page>#<row>", sai page,
    hoặc row không có trong bảng element của page.
"""

from __future__ import annotations
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("Thiếu PyYAML. Cài: pip install pyyaml --break-system-packages")

SKILL_ROOT = Path(__file__).resolve().parent.parent
CONVENTIONS = SKILL_ROOT / "references" / "conventions.yaml"
# Mặc định: runtime library nằm ở <project>/qc/ui-act-library
DEFAULT_LIB = SKILL_ROOT.parent / "qc" / "ui-act-library"

errors: list[str] = []


def load_yaml(path: Path):
    if not path.exists():
        errors.append(f"Không tìm thấy file: {path}")
        return None
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def check_dup(items, key, where):
    seen = set()
    for it in items:
        v = it.get(key)
        if v in seen:
            errors.append(f"[{where}] Trùng {key}: {v!r}")
        seen.add(v)


def check_terms(actions, where):
    """canonical + alias (theo ngôn ngữ) phải map về duy nhất 1 id."""
    term_to_id: dict[tuple, str] = {}
    for a in actions:
        aid = a.get("id")
        canon = a.get("canonical", {}) or {}
        aliases = a.get("aliases", {}) or {}
        for lang in ("vi", "en"):
            terms = []
            if canon.get(lang):
                terms.append(canon[lang].strip().lower())
            for al in (aliases.get(lang) or []):
                terms.append(al.strip().lower())
            for t in terms:
                key = (lang, t)
                if key in term_to_id and term_to_id[key] != aid:
                    errors.append(
                        f"[{where}] Term {t!r} ({lang}) trùng giữa "
                        f"{term_to_id[key]} và {aid}"
                    )
                term_to_id[key] = aid


FM_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


def parse_ui_md(path: Path):
    """Trả về (page_name, set_các_row_index) từ 1 file ui-elements markdown."""
    text = path.read_text(encoding="utf-8")

    page = None
    m = FM_RE.match(text)
    if m:
        for line in m.group(1).splitlines():
            if ":" in line:
                k, _, v = line.partition(":")
                if k.strip().lower() in ("page name", "page"):
                    page = v.strip()
                    break
    if not page:
        errors.append(f"[ui-elements] {path.name}: thiếu 'Page name' ở front matter")
        return None, set()

    rows: set[str] = set()
    for line in text.splitlines():
        s = line.strip()
        if not s.startswith("|"):
            continue
        cells = [c.strip() for c in s.strip("|").split("|")]
        first = cells[0] if cells else ""
        if first.isdigit():
            rows.add(first)
    if not rows:
        errors.append(f"[ui-elements] {path.name}: không đọc được dòng element nào")
    return page, rows


def main() -> int:
    lib = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else DEFAULT_LIB
    if not lib.exists():
        print(f"✗ Không tìm thấy library dir: {lib}")
        print("  (chạy skill để bootstrap, hoặc truyền đường dẫn: validate.py <dir>)")
        return 1

    conv = load_yaml(CONVENTIONS) or {}
    atomic = (load_yaml(lib / "ac-library" / "atomic_actions.yaml") or {}).get("actions", []) or []
    composite = (load_yaml(lib / "ac-library" / "composite_actions.yaml") or {}).get("actions", []) or []

    atomic_cats = {c["id"] for c in conv.get("atomic_categories", [])}
    comp_cats = {c["id"] for c in conv.get("composite_categories", [])}

    # --- Atomic ---
    check_dup(atomic, "id", "atomic")
    check_terms(atomic, "atomic")
    atomic_ids = {a["id"] for a in atomic}
    for a in atomic:
        if a.get("category") not in atomic_cats:
            errors.append(
                f"[atomic] {a.get('id')}: category {a.get('category')!r} "
                f"không có trong atomic_categories"
            )

    # --- UI elements (markdown, đệ quy; bỏ file template _*.md) ---
    pages: dict[str, set] = {}
    ui_dir = lib / "ui-elements"
    if ui_dir.exists():
        md_files = [p for p in sorted(ui_dir.rglob("*.md")) if not p.name.startswith("_")]
        if not md_files:
            errors.append(f"{ui_dir} không có file .md nào")
        for f in md_files:
            page, rows = parse_ui_md(f)
            if page:
                if page in pages:
                    errors.append(f"[ui-elements] page {page!r} bị khai báo ở 2 file")
                pages[page] = rows
    else:
        errors.append(f"Không tìm thấy thư mục {ui_dir}")

    # --- Composite ---
    check_dup(composite, "id", "composite")
    check_terms(composite, "composite")
    for c in composite:
        cid = c.get("id")
        if c.get("category") not in comp_cats:
            errors.append(
                f"[composite] {cid}: category {c.get('category')!r} "
                f"không có trong composite_categories"
            )
        page = c.get("page")
        if page not in pages:
            errors.append(
                f"[composite] {cid}: page {page!r} không có file ui-elements tương ứng"
            )
        for i, step in enumerate(c.get("steps", []) or []):
            act = step.get("action")
            if act not in atomic_ids:
                errors.append(
                    f"[composite] {cid} step#{i}: action {act!r} không có trong atomic"
                )
            tgt = step.get("target")
            if tgt is None:
                continue
            if "#" not in str(tgt):
                errors.append(
                    f"[composite] {cid} step#{i}: target {tgt!r} sai định dạng "
                    f"(cần '<page>#<row>')"
                )
                continue
            tpage, _, trow = str(tgt).rpartition("#")
            if tpage not in pages:
                errors.append(
                    f"[composite] {cid} step#{i}: target page {tpage!r} không tồn tại"
                )
            elif trow not in pages[tpage]:
                errors.append(
                    f"[composite] {cid} step#{i}: target {tgt!r} - row {trow!r} "
                    f"không có trong ui-elements của page {tpage!r}"
                )

    # --- Báo cáo ---
    print(f"Library: {lib}")
    print(f"Atomic: {len(atomic)} | Composite: {len(composite)} | Pages: {len(pages)}")
    if errors:
        print(f"\n✗ {len(errors)} lỗi:")
        for e in errors:
            print("  -", e)
        return 1
    print("\n✓ Thư viện nhất quán, không có lỗi.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
