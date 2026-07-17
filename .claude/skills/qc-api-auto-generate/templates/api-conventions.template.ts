// helpers/api/api-conventions.ts — the project's API idioms, QC-EDITABLE (the API twin of
// notification-channels.ts). Generated ONCE from project-config §7 + the digest's error schema;
// regenerations NEVER overwrite this file. Fix an idiom here — every spec benefits.
// NO secrets in this file: paths and formats only.

export const conventions = {
  auth: {
    // mode: 'login' (gọi API login lấy token) | 'env-token' (user cấp API_TOKEN_<ROLEKEY> trong .env — ROLEKEY = Key trong bảng ## Accounts của data md)
    //     | 'cookie' (login API giữ session cookie trong context)
    mode: 'login' as 'login' | 'env-token' | 'cookie',
    loginEndpoint: '/api/v1/auth/login',            // từ project-config §7
    loginBody: (username: string, password: string) => ({ username, password }),
    tokenPath: 'data.accessToken',                  // vị trí token trong response — §7
    header: (token: string) => ({ Authorization: `Bearer ${token}` }),
  },
  errorBody: {
    // Đường dẫn tới message/code trong error body — suy từ schema lỗi của digest.
    // TODO: xác nhận với response thật ở lần chạy đầu.
    messagePath: 'message',
    codePath: 'code',
  },
};

/** Read a dot-path from a parsed JSON body. */
export function atPath(obj: unknown, dotPath: string): unknown {
  return dotPath.split('.').reduce<any>((o, k) => (o == null ? undefined : o[k]), obj);
}
