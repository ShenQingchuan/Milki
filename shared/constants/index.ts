export * as ErrCodes from './err-codes'

export const SIGN_UP_USERNAME_MIN_LEN = 3
export const SIGN_UP_USERNAME_MAX_LEN = 24
export const SIGN_UP_PASSWORD_MIN_LEN = 8
export const SIGN_UP_PASSWORD_MAX_LEN = 24
// Username must be:
// 1. 3-24 characters length
// 2. Must contain letters
// 3. Can contain numbers and underscores
export const SIGN_UP_USERNAME_PATTERN = '^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,24}$'
// Password must be:
// 1. 8-24 characters length
// 2. Contain at least one letter and one number
export const SIGN_UP_PASSWORD_PATTERN = '^(?=.*[a-zA-Z])(?=.*\\d).{8,24}$'
