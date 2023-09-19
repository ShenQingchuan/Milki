import type { RegisterOptions } from 'react-hook-form'
import {
  SIGN_UP_PASSWORD_MAX_LEN,
  SIGN_UP_PASSWORD_MIN_LEN,
  SIGN_UP_PASSWORD_PATTERN,
  SIGN_UP_USERNAME_MAX_LEN,
  SIGN_UP_USERNAME_MIN_LEN,
  SIGN_UP_USERNAME_PATTERN,
} from '../../shared/constants'

export const MARKDOWN_CODE_BLOCK_LANGS = [
  'javascript',
  'typescript',
  'css',
  'scss',
  'html',
  'json',
  'bash',
  'shell',
  'python',
  'java',
  'c',
  'c++',
  'c#',
  'go',
  'rust',
  'ruby',
  'php',
  'kotlin',
  'swift',
  'dart',
  'yaml',
  'xml',
  'markdown',
  'md',
  'text',
  'plaintext',
  'latex',
  'sql',
  'graphql',
  'http',
  'toml',
  'ini',
  'diff',
  'dockerfile',
  'makefile',
  'r',
  'jsx',
  'tsx',
  'haskell',
  'lisp',
  'lua',
  'matlab',
  'powershell',
  'shell',
  'yaml',
  'tex',
  'vim',
  'yaml',
].map(lang => lang.toUpperCase())

export const USERNAME_FORM_FIELD_VALIDATION: RegisterOptions = {
  required: true,
  minLength: SIGN_UP_USERNAME_MIN_LEN,
  maxLength: SIGN_UP_USERNAME_MAX_LEN,
  pattern: new RegExp(SIGN_UP_USERNAME_PATTERN),
}

export const PASSWORD_FORM_FIELD_VALIDATION: RegisterOptions = {
  required: true,
  minLength: SIGN_UP_PASSWORD_MIN_LEN,
  maxLength: SIGN_UP_PASSWORD_MAX_LEN,
  pattern: new RegExp(SIGN_UP_PASSWORD_PATTERN),
}
