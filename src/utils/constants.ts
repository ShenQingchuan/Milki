import type { RegisterOptions } from 'react-hook-form'
import {
  SIGN_UP_PASSWORD_MAX_LEN,
  SIGN_UP_PASSWORD_MIN_LEN,
  SIGN_UP_PASSWORD_PATTERN,
  SIGN_UP_USERNAME_MAX_LEN,
  SIGN_UP_USERNAME_MIN_LEN,
  SIGN_UP_USERNAME_PATTERN,
} from '../../shared/constants'
import type { SideBarItem } from './types'

export function NOOP() {}

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

export const SIDE_BAR_RELATE_TO_ME_ITEMS: SideBarItem[] = [
  { icon: 'i-carbon-recently-viewed', label: 'home-page.side-bar.recently-viewed', route: '/' },
  { icon: 'i-carbon-share-knowledge', label: 'home-page.side-bar.shared-with-me', route: '/shared-with-me' },
  { icon: 'i-ep-collection-tag', label: 'home-page.side-bar.collections', route: '/collections' },
]

export const SIDE_BAR_WORKSPACE_ITEMS: SideBarItem[] = [
  { icon: 'i-carbon-home', label: 'home-page.side-bar.my-desktop', route: '/my-desktop' },
  { icon: 'i-iconoir-group', label: 'home-page.side-bar.team-spaces', route: '/team-spaces' },
]

export const SIDEBAR_BOTTOM_ITEMS: SideBarItem[] = [
  { icon: 'i-carbon-trash-can', label: 'home-page.side-bar.recycle-bin', route: '/recycle-bin' },
]
