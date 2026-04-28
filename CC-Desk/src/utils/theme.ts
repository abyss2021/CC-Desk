import chalk, { Chalk } from 'chalk'
import { env } from './env.js'

export type Theme = {
  autoAccept: string
  bashBorder: string
  claude: string
  claudeShimmer: string // Lighter version of claude color for shimmer effect
  claudeBlue_FOR_SYSTEM_SPINNER: string
  claudeBlueShimmer_FOR_SYSTEM_SPINNER: string
  permission: string
  permissionShimmer: string // Lighter version of permission color for shimmer effect
  planMode: string
  ide: string
  promptBorder: string
  promptBorderShimmer: string // Lighter version of promptBorder color for shimmer effect
  text: string
  inverseText: string
  inactive: string
  inactiveShimmer: string // Lighter version of inactive color for shimmer effect
  subtle: string
  suggestion: string
  remember: string
  background: string
  // Semantic colors
  success: string
  error: string
  warning: string
  merged: string
  warningShimmer: string // Lighter version of warning color for shimmer effect
  // Diff colors
  diffAdded: string
  diffRemoved: string
  diffAddedDimmed: string
  diffRemovedDimmed: string
  // Word-level diff highlighting
  diffAddedWord: string
  diffRemovedWord: string
  // Agent colors
  red_FOR_SUBAGENTS_ONLY: string
  blue_FOR_SUBAGENTS_ONLY: string
  green_FOR_SUBAGENTS_ONLY: string
  yellow_FOR_SUBAGENTS_ONLY: string
  purple_FOR_SUBAGENTS_ONLY: string
  orange_FOR_SUBAGENTS_ONLY: string
  pink_FOR_SUBAGENTS_ONLY: string
  cyan_FOR_SUBAGENTS_ONLY: string
  // Grove colors
  professionalBlue: string
  // Chrome colors
  chromeYellow: string
  // TUI V2 colors
  clawd_body: string
  clawd_background: string
  userMessageBackground: string
  userMessageBackgroundHover: string
  /** Message-actions selection. Cool shift toward `suggestion` blue; distinct from default AND userMessageBackground. */
  messageActionsBackground: string
  /** Text-selection highlight background (alt-screen mouse selection). Solid
   *  bg that REPLACES the cell's bg while preserving its fg — matches native
   *  terminal selection. Previously SGR-7 inverse (swapped fg/bg per cell),
   *  which fragmented badly over syntax highlighting. */
  selectionBg: string
  bashMessageBackgroundColor: string

  memoryBackgroundColor: string
  rate_limit_fill: string
  rate_limit_empty: string
  fastMode: string
  fastModeShimmer: string
  // Brief/assistant mode label colors
  briefLabelYou: string
  briefLabelClaude: string
  // Rainbow colors for ultrathink keyword highlighting
  rainbow_red: string
  rainbow_orange: string
  rainbow_yellow: string
  rainbow_green: string
  rainbow_blue: string
  rainbow_indigo: string
  rainbow_violet: string
  rainbow_red_shimmer: string
  rainbow_orange_shimmer: string
  rainbow_yellow_shimmer: string
  rainbow_green_shimmer: string
  rainbow_blue_shimmer: string
  rainbow_indigo_shimmer: string
  rainbow_violet_shimmer: string
}

export const THEME_NAMES = [
  'dark',
  'light',
  'light-daltonized',
  'dark-daltonized',
  'light-ansi',
  'dark-ansi',
] as const

/** A renderable theme. Always resolvable to a concrete color palette. */
export type ThemeName = (typeof THEME_NAMES)[number]

export const THEME_SETTINGS = ['auto', ...THEME_NAMES] as const

/**
 * A theme preference as stored in user config. `'auto'` follows the system
 * dark/light mode and is resolved to a ThemeName at runtime.
 */
export type ThemeSetting = (typeof THEME_SETTINGS)[number]

// ─── Modern Blue Palette ───────────────────────────────────────────────
// Blue-300: rgb(147, 197, 253) — light / shimmer (dark mode)
// Blue-400: rgb(96,  165, 250) — primary (dark) / shimmer (light)
// Blue-500: rgb(59,  130, 246) — primary (light) / strong (dark)
// Blue-600: rgb(37,  99,  235) — strong (light)

/**
 * Modern light theme — blue primary, pure white background.
 */
const lightTheme: Theme = {
  autoAccept: 'rgb(37,99,235)', // Blue-600
  bashBorder: 'rgb(59,130,246)', // Blue-500
  claude: 'rgb(59,130,246)', // Blue-500
  claudeShimmer: 'rgb(96,165,250)', // Blue-400
  claudeBlue_FOR_SYSTEM_SPINNER: 'rgb(59,130,246)', // Blue-500
  claudeBlueShimmer_FOR_SYSTEM_SPINNER: 'rgb(96,165,250)', // Blue-400
  permission: 'rgb(59,130,246)', // Blue-500
  permissionShimmer: 'rgb(96,165,250)', // Blue-400
  planMode: 'rgb(37,99,235)', // Blue-600
  ide: 'rgb(59,130,246)', // Blue-500
  promptBorder: 'rgb(148,163,184)', // Slate-400
  promptBorderShimmer: 'rgb(203,213,225)', // Slate-300
  text: 'rgb(15,23,42)', // Slate-900  (near-black, soft)
  inverseText: 'rgb(255,255,255)',
  inactive: 'rgb(148,163,184)', // Slate-400
  inactiveShimmer: 'rgb(203,213,225)', // Slate-300
  subtle: 'rgb(203,213,225)', // Slate-300
  suggestion: 'rgb(59,130,246)', // Blue-500
  remember: 'rgb(59,130,246)', // Blue-500
  background: 'rgb(255,255,255)', // Pure white
  success: 'rgb(22,163,74)', // Green-600
  error: 'rgb(220,38,38)', // Red-600
  warning: 'rgb(217,119,6)', // Amber-600
  merged: 'rgb(37,99,235)', // Blue-600
  warningShimmer: 'rgb(245,158,11)', // Amber-500
  diffAdded: 'rgb(187,247,208)', // Green-200
  diffRemoved: 'rgb(254,202,202)', // Red-200
  diffAddedDimmed: 'rgb(220,252,231)', // Green-100
  diffRemovedDimmed: 'rgb(254,226,226)', // Red-100
  diffAddedWord: 'rgb(22,163,74)', // Green-600
  diffRemovedWord: 'rgb(220,38,38)', // Red-600
  // Agent colors (vibrant, distinguishable)
  red_FOR_SUBAGENTS_ONLY: 'rgb(220,38,38)',
  blue_FOR_SUBAGENTS_ONLY: 'rgb(37,99,235)',
  green_FOR_SUBAGENTS_ONLY: 'rgb(22,163,74)',
  yellow_FOR_SUBAGENTS_ONLY: 'rgb(202,138,4)',
  purple_FOR_SUBAGENTS_ONLY: 'rgb(147,51,234)',
  orange_FOR_SUBAGENTS_ONLY: 'rgb(234,88,12)',
  pink_FOR_SUBAGENTS_ONLY: 'rgb(219,39,119)',
  cyan_FOR_SUBAGENTS_ONLY: 'rgb(8,145,178)',
  professionalBlue: 'rgb(59,130,246)',
  chromeYellow: 'rgb(251,188,4)',
  // TUI V2
  clawd_body: 'rgb(59,130,246)', // Blue-500
  clawd_background: 'rgb(255,255,255)', // White
  userMessageBackground: 'rgb(241,245,249)', // Slate-100
  userMessageBackgroundHover: 'rgb(226,232,240)', // Slate-200
  messageActionsBackground: 'rgb(219,234,254)', // Blue-100
  selectionBg: 'rgb(191,219,254)', // Blue-200
  bashMessageBackgroundColor: 'rgb(248,250,252)', // Slate-50

  memoryBackgroundColor: 'rgb(239,246,255)', // Blue-50
  rate_limit_fill: 'rgb(59,130,246)', // Blue-500
  rate_limit_empty: 'rgb(226,232,240)', // Slate-200
  fastMode: 'rgb(37,99,235)', // Blue-600
  fastModeShimmer: 'rgb(96,165,250)', // Blue-400
  briefLabelYou: 'rgb(37,99,235)', // Blue-600
  briefLabelClaude: 'rgb(59,130,246)', // Blue-500
  rainbow_red: 'rgb(239,68,68)',
  rainbow_orange: 'rgb(249,115,22)',
  rainbow_yellow: 'rgb(250,204,21)',
  rainbow_green: 'rgb(34,197,94)',
  rainbow_blue: 'rgb(59,130,246)',
  rainbow_indigo: 'rgb(99,102,241)',
  rainbow_violet: 'rgb(168,85,247)',
  rainbow_red_shimmer: 'rgb(252,165,165)',
  rainbow_orange_shimmer: 'rgb(253,186,116)',
  rainbow_yellow_shimmer: 'rgb(253,224,71)',
  rainbow_green_shimmer: 'rgb(134,239,172)',
  rainbow_blue_shimmer: 'rgb(147,197,253)',
  rainbow_indigo_shimmer: 'rgb(165,180,252)',
  rainbow_violet_shimmer: 'rgb(196,167,252)',
}

/**
 * Modern light ANSI theme — 16-color fallback.
 */
const lightAnsiTheme: Theme = {
  autoAccept: 'ansi:blue',
  bashBorder: 'ansi:blue',
  claude: 'ansi:blue',
  claudeShimmer: 'ansi:blueBright',
  claudeBlue_FOR_SYSTEM_SPINNER: 'ansi:blue',
  claudeBlueShimmer_FOR_SYSTEM_SPINNER: 'ansi:blueBright',
  permission: 'ansi:blue',
  permissionShimmer: 'ansi:blueBright',
  planMode: 'ansi:blue',
  ide: 'ansi:blueBright',
  promptBorder: 'ansi:blackBright',
  promptBorderShimmer: 'ansi:white',
  text: 'ansi:black',
  inverseText: 'ansi:white',
  inactive: 'ansi:blackBright',
  inactiveShimmer: 'ansi:white',
  subtle: 'ansi:blackBright',
  suggestion: 'ansi:blue',
  remember: 'ansi:blue',
  background: 'ansi:white',
  success: 'ansi:green',
  error: 'ansi:red',
  warning: 'ansi:yellow',
  merged: 'ansi:blue',
  warningShimmer: 'ansi:yellowBright',
  diffAdded: 'ansi:green',
  diffRemoved: 'ansi:red',
  diffAddedDimmed: 'ansi:green',
  diffRemovedDimmed: 'ansi:red',
  diffAddedWord: 'ansi:greenBright',
  diffRemovedWord: 'ansi:redBright',
  // Agent colors
  red_FOR_SUBAGENTS_ONLY: 'ansi:red',
  blue_FOR_SUBAGENTS_ONLY: 'ansi:blue',
  green_FOR_SUBAGENTS_ONLY: 'ansi:green',
  yellow_FOR_SUBAGENTS_ONLY: 'ansi:yellow',
  purple_FOR_SUBAGENTS_ONLY: 'ansi:magenta',
  orange_FOR_SUBAGENTS_ONLY: 'ansi:redBright',
  pink_FOR_SUBAGENTS_ONLY: 'ansi:magentaBright',
  cyan_FOR_SUBAGENTS_ONLY: 'ansi:cyan',
  professionalBlue: 'ansi:blueBright',
  chromeYellow: 'ansi:yellow',
  // TUI V2
  clawd_body: 'ansi:blue',
  clawd_background: 'ansi:white',
  userMessageBackground: 'ansi:white',
  userMessageBackgroundHover: 'ansi:whiteBright',
  messageActionsBackground: 'ansi:white',
  selectionBg: 'ansi:cyan',
  bashMessageBackgroundColor: 'ansi:whiteBright',

  memoryBackgroundColor: 'ansi:white',
  rate_limit_fill: 'ansi:blue',
  rate_limit_empty: 'ansi:blackBright',
  fastMode: 'ansi:blue',
  fastModeShimmer: 'ansi:blueBright',
  briefLabelYou: 'ansi:blue',
  briefLabelClaude: 'ansi:blueBright',
  rainbow_red: 'ansi:red',
  rainbow_orange: 'ansi:redBright',
  rainbow_yellow: 'ansi:yellow',
  rainbow_green: 'ansi:green',
  rainbow_blue: 'ansi:cyan',
  rainbow_indigo: 'ansi:blue',
  rainbow_violet: 'ansi:magenta',
  rainbow_red_shimmer: 'ansi:redBright',
  rainbow_orange_shimmer: 'ansi:yellow',
  rainbow_yellow_shimmer: 'ansi:yellowBright',
  rainbow_green_shimmer: 'ansi:greenBright',
  rainbow_blue_shimmer: 'ansi:cyanBright',
  rainbow_indigo_shimmer: 'ansi:blueBright',
  rainbow_violet_shimmer: 'ansi:magentaBright',
}

/**
 * Modern dark ANSI theme — 16-color fallback.
 */
const darkAnsiTheme: Theme = {
  autoAccept: 'ansi:blueBright',
  bashBorder: 'ansi:blueBright',
  claude: 'ansi:blueBright',
  claudeShimmer: 'ansi:cyan',
  claudeBlue_FOR_SYSTEM_SPINNER: 'ansi:blueBright',
  claudeBlueShimmer_FOR_SYSTEM_SPINNER: 'ansi:cyan',
  permission: 'ansi:blueBright',
  permissionShimmer: 'ansi:cyan',
  planMode: 'ansi:blueBright',
  ide: 'ansi:blue',
  promptBorder: 'ansi:white',
  promptBorderShimmer: 'ansi:whiteBright',
  text: 'ansi:whiteBright',
  inverseText: 'ansi:black',
  inactive: 'ansi:white',
  inactiveShimmer: 'ansi:whiteBright',
  subtle: 'ansi:white',
  suggestion: 'ansi:blueBright',
  remember: 'ansi:blueBright',
  background: 'ansi:black',
  success: 'ansi:greenBright',
  error: 'ansi:redBright',
  warning: 'ansi:yellowBright',
  merged: 'ansi:blueBright',
  warningShimmer: 'ansi:yellowBright',
  diffAdded: 'ansi:green',
  diffRemoved: 'ansi:red',
  diffAddedDimmed: 'ansi:green',
  diffRemovedDimmed: 'ansi:red',
  diffAddedWord: 'ansi:greenBright',
  diffRemovedWord: 'ansi:redBright',
  // Agent colors
  red_FOR_SUBAGENTS_ONLY: 'ansi:redBright',
  blue_FOR_SUBAGENTS_ONLY: 'ansi:blueBright',
  green_FOR_SUBAGENTS_ONLY: 'ansi:greenBright',
  yellow_FOR_SUBAGENTS_ONLY: 'ansi:yellowBright',
  purple_FOR_SUBAGENTS_ONLY: 'ansi:magentaBright',
  orange_FOR_SUBAGENTS_ONLY: 'ansi:redBright',
  pink_FOR_SUBAGENTS_ONLY: 'ansi:magentaBright',
  cyan_FOR_SUBAGENTS_ONLY: 'ansi:cyanBright',
  professionalBlue: 'ansi:blueBright',
  chromeYellow: 'ansi:yellowBright',
  // TUI V2
  clawd_body: 'ansi:blueBright',
  clawd_background: 'ansi:black',
  userMessageBackground: 'ansi:blackBright',
  userMessageBackgroundHover: 'ansi:white',
  messageActionsBackground: 'ansi:blackBright',
  selectionBg: 'ansi:blue',
  bashMessageBackgroundColor: 'ansi:black',

  memoryBackgroundColor: 'ansi:blackBright',
  rate_limit_fill: 'ansi:blueBright',
  rate_limit_empty: 'ansi:white',
  fastMode: 'ansi:blueBright',
  fastModeShimmer: 'ansi:cyan',
  briefLabelYou: 'ansi:blueBright',
  briefLabelClaude: 'ansi:blueBright',
  rainbow_red: 'ansi:red',
  rainbow_orange: 'ansi:redBright',
  rainbow_yellow: 'ansi:yellow',
  rainbow_green: 'ansi:green',
  rainbow_blue: 'ansi:cyan',
  rainbow_indigo: 'ansi:blue',
  rainbow_violet: 'ansi:magenta',
  rainbow_red_shimmer: 'ansi:redBright',
  rainbow_orange_shimmer: 'ansi:yellow',
  rainbow_yellow_shimmer: 'ansi:yellowBright',
  rainbow_green_shimmer: 'ansi:greenBright',
  rainbow_blue_shimmer: 'ansi:cyanBright',
  rainbow_indigo_shimmer: 'ansi:blueBright',
  rainbow_violet_shimmer: 'ansi:magentaBright',
}

/**
 * Modern light daltonized theme (color-blind friendly).
 * Uses blue/orange contrast with adjusted luminance for deuteranopia.
 */
const lightDaltonizedTheme: Theme = {
  autoAccept: 'rgb(37,99,235)', // Blue-600
  bashBorder: 'rgb(37,99,235)', // Blue-600
  claude: 'rgb(37,99,235)', // Blue-600
  claudeShimmer: 'rgb(96,165,250)', // Blue-400
  claudeBlue_FOR_SYSTEM_SPINNER: 'rgb(59,130,246)', // Blue-500
  claudeBlueShimmer_FOR_SYSTEM_SPINNER: 'rgb(96,165,250)', // Blue-400
  permission: 'rgb(59,130,246)', // Blue-500
  permissionShimmer: 'rgb(96,165,250)', // Blue-400
  planMode: 'rgb(37,99,235)', // Blue-600
  ide: 'rgb(59,130,246)', // Blue-500
  promptBorder: 'rgb(148,163,184)', // Slate-400
  promptBorderShimmer: 'rgb(203,213,225)', // Slate-300
  text: 'rgb(15,23,42)', // Slate-900
  inverseText: 'rgb(255,255,255)',
  inactive: 'rgb(148,163,184)', // Slate-400
  inactiveShimmer: 'rgb(203,213,225)', // Slate-300
  subtle: 'rgb(203,213,225)', // Slate-300
  suggestion: 'rgb(59,130,246)', // Blue-500
  remember: 'rgb(59,130,246)', // Blue-500
  background: 'rgb(255,255,255)',
  success: 'rgb(37,99,235)', // Blue instead of green for deuteranopia
  error: 'rgb(220,38,38)', // Red stays red (deuteranopia-safe)
  warning: 'rgb(217,119,6)', // Amber
  merged: 'rgb(37,99,235)', // Blue-600
  warningShimmer: 'rgb(245,158,11)', // Amber-500
  diffAdded: 'rgb(191,219,254)', // Blue-200
  diffRemoved: 'rgb(254,202,202)', // Red-200
  diffAddedDimmed: 'rgb(219,234,254)', // Blue-100
  diffRemovedDimmed: 'rgb(254,226,226)', // Red-100
  diffAddedWord: 'rgb(37,99,235)', // Blue-600
  diffRemovedWord: 'rgb(185,28,28)', // Red-700
  // Agent colors (daltonism-friendly, high contrast)
  red_FOR_SUBAGENTS_ONLY: 'rgb(220,38,38)',
  blue_FOR_SUBAGENTS_ONLY: 'rgb(37,99,235)',
  green_FOR_SUBAGENTS_ONLY: 'rgb(14,116,144)', // Cyan-700 alternative
  yellow_FOR_SUBAGENTS_ONLY: 'rgb(202,138,4)',
  purple_FOR_SUBAGENTS_ONLY: 'rgb(147,51,234)',
  orange_FOR_SUBAGENTS_ONLY: 'rgb(234,88,12)',
  pink_FOR_SUBAGENTS_ONLY: 'rgb(219,39,119)',
  cyan_FOR_SUBAGENTS_ONLY: 'rgb(8,145,178)',
  professionalBlue: 'rgb(59,130,246)',
  chromeYellow: 'rgb(251,188,4)',
  // TUI V2
  clawd_body: 'rgb(59,130,246)',
  clawd_background: 'rgb(255,255,255)',
  userMessageBackground: 'rgb(241,245,249)',
  userMessageBackgroundHover: 'rgb(226,232,240)',
  messageActionsBackground: 'rgb(219,234,254)',
  selectionBg: 'rgb(191,219,254)',
  bashMessageBackgroundColor: 'rgb(248,250,252)',

  memoryBackgroundColor: 'rgb(239,246,255)',
  rate_limit_fill: 'rgb(59,130,246)',
  rate_limit_empty: 'rgb(226,232,240)',
  fastMode: 'rgb(37,99,235)',
  fastModeShimmer: 'rgb(96,165,250)',
  briefLabelYou: 'rgb(37,99,235)',
  briefLabelClaude: 'rgb(59,130,246)',
  rainbow_red: 'rgb(239,68,68)',
  rainbow_orange: 'rgb(249,115,22)',
  rainbow_yellow: 'rgb(250,204,21)',
  rainbow_green: 'rgb(34,197,94)',
  rainbow_blue: 'rgb(59,130,246)',
  rainbow_indigo: 'rgb(99,102,241)',
  rainbow_violet: 'rgb(168,85,247)',
  rainbow_red_shimmer: 'rgb(252,165,165)',
  rainbow_orange_shimmer: 'rgb(253,186,116)',
  rainbow_yellow_shimmer: 'rgb(253,224,71)',
  rainbow_green_shimmer: 'rgb(134,239,172)',
  rainbow_blue_shimmer: 'rgb(147,197,253)',
  rainbow_indigo_shimmer: 'rgb(165,180,252)',
  rainbow_violet_shimmer: 'rgb(196,167,252)',
}

/**
 * Modern dark theme — blue primary, deep blue-black background.
 */
const darkTheme: Theme = {
  autoAccept: 'rgb(59,130,246)', // Blue-500
  bashBorder: 'rgb(96,165,250)', // Blue-400
  claude: 'rgb(96,165,250)', // Blue-400
  claudeShimmer: 'rgb(147,197,253)', // Blue-300
  claudeBlue_FOR_SYSTEM_SPINNER: 'rgb(96,165,250)', // Blue-400
  claudeBlueShimmer_FOR_SYSTEM_SPINNER: 'rgb(147,197,253)', // Blue-300
  permission: 'rgb(96,165,250)', // Blue-400
  permissionShimmer: 'rgb(147,197,253)', // Blue-300
  planMode: 'rgb(59,130,246)', // Blue-500
  ide: 'rgb(96,165,250)', // Blue-400
  promptBorder: 'rgb(100,116,139)', // Slate-500
  promptBorderShimmer: 'rgb(148,163,184)', // Slate-400
  text: 'rgb(241,245,249)', // Slate-100  (near-white, soft)
  inverseText: 'rgb(2,8,23)', // Slate-950
  inactive: 'rgb(100,116,139)', // Slate-500
  inactiveShimmer: 'rgb(148,163,184)', // Slate-400
  subtle: 'rgb(51,65,85)', // Slate-700
  suggestion: 'rgb(96,165,250)', // Blue-400
  remember: 'rgb(96,165,250)', // Blue-400
  background: 'rgb(2,8,23)', // Slate-950  (near-black, modern)
  success: 'rgb(74,222,128)', // Green-400
  error: 'rgb(248,113,113)', // Red-400
  warning: 'rgb(251,191,36)', // Amber-300
  merged: 'rgb(59,130,246)', // Blue-500
  warningShimmer: 'rgb(253,224,71)', // Amber-200
  diffAdded: 'rgb(20,83,45)', // Green-900
  diffRemoved: 'rgb(127,29,29)', // Red-900
  diffAddedDimmed: 'rgb(5,46,22)', // Green-950
  diffRemovedDimmed: 'rgb(69,10,10)', // Red-950
  diffAddedWord: 'rgb(74,222,128)', // Green-400
  diffRemovedWord: 'rgb(248,113,113)', // Red-400
  // Agent colors
  red_FOR_SUBAGENTS_ONLY: 'rgb(248,113,113)',
  blue_FOR_SUBAGENTS_ONLY: 'rgb(96,165,250)',
  green_FOR_SUBAGENTS_ONLY: 'rgb(74,222,128)',
  yellow_FOR_SUBAGENTS_ONLY: 'rgb(250,204,21)',
  purple_FOR_SUBAGENTS_ONLY: 'rgb(168,85,247)',
  orange_FOR_SUBAGENTS_ONLY: 'rgb(251,146,60)',
  pink_FOR_SUBAGENTS_ONLY: 'rgb(244,114,182)',
  cyan_FOR_SUBAGENTS_ONLY: 'rgb(34,211,238)',
  professionalBlue: 'rgb(96,165,250)',
  chromeYellow: 'rgb(251,188,4)',
  // TUI V2
  clawd_body: 'rgb(96,165,250)', // Blue-400
  clawd_background: 'rgb(2,8,23)', // Slate-950
  userMessageBackground: 'rgb(30,41,59)', // Slate-800
  userMessageBackgroundHover: 'rgb(51,65,85)', // Slate-700
  messageActionsBackground: 'rgb(30,58,95)', // Blue-900 tint
  selectionBg: 'rgb(29,78,137)', // Blue-800
  bashMessageBackgroundColor: 'rgb(15,23,42)', // Slate-900

  memoryBackgroundColor: 'rgb(30,41,59)', // Slate-800
  rate_limit_fill: 'rgb(96,165,250)', // Blue-400
  rate_limit_empty: 'rgb(51,65,85)', // Slate-700
  fastMode: 'rgb(96,165,250)', // Blue-400
  fastModeShimmer: 'rgb(147,197,253)', // Blue-300
  briefLabelYou: 'rgb(96,165,250)', // Blue-400
  briefLabelClaude: 'rgb(147,197,253)', // Blue-300
  rainbow_red: 'rgb(248,113,113)',
  rainbow_orange: 'rgb(251,146,60)',
  rainbow_yellow: 'rgb(250,204,21)',
  rainbow_green: 'rgb(74,222,128)',
  rainbow_blue: 'rgb(96,165,250)',
  rainbow_indigo: 'rgb(129,140,248)',
  rainbow_violet: 'rgb(192,132,252)',
  rainbow_red_shimmer: 'rgb(252,165,165)',
  rainbow_orange_shimmer: 'rgb(253,186,116)',
  rainbow_yellow_shimmer: 'rgb(253,224,71)',
  rainbow_green_shimmer: 'rgb(134,239,172)',
  rainbow_blue_shimmer: 'rgb(147,197,253)',
  rainbow_indigo_shimmer: 'rgb(165,180,252)',
  rainbow_violet_shimmer: 'rgb(216,180,252)',
}

/**
 * Modern dark daltonized theme (color-blind friendly).
 * Blue/orange high-contrast palette for deuteranopia.
 */
const darkDaltonizedTheme: Theme = {
  autoAccept: 'rgb(96,165,250)', // Blue-400
  bashBorder: 'rgb(96,165,250)', // Blue-400
  claude: 'rgb(96,165,250)', // Blue-400
  claudeShimmer: 'rgb(147,197,253)', // Blue-300
  claudeBlue_FOR_SYSTEM_SPINNER: 'rgb(96,165,250)', // Blue-400
  claudeBlueShimmer_FOR_SYSTEM_SPINNER: 'rgb(147,197,253)', // Blue-300
  permission: 'rgb(96,165,250)', // Blue-400
  permissionShimmer: 'rgb(147,197,253)', // Blue-300
  planMode: 'rgb(59,130,246)', // Blue-500
  ide: 'rgb(96,165,250)', // Blue-400
  promptBorder: 'rgb(100,116,139)', // Slate-500
  promptBorderShimmer: 'rgb(148,163,184)', // Slate-400
  text: 'rgb(241,245,249)', // Slate-100
  inverseText: 'rgb(2,8,23)', // Slate-950
  inactive: 'rgb(100,116,139)', // Slate-500
  inactiveShimmer: 'rgb(148,163,184)', // Slate-400
  subtle: 'rgb(51,65,85)', // Slate-700
  suggestion: 'rgb(96,165,250)', // Blue-400
  remember: 'rgb(96,165,250)', // Blue-400
  background: 'rgb(2,8,23)', // Slate-950
  success: 'rgb(96,165,250)', // Blue-400 — blue instead of green for deuteranopia
  error: 'rgb(252,165,165)', // Red-300 — bright enough for dark bg
  warning: 'rgb(253,224,71)', // Amber-200
  merged: 'rgb(96,165,250)', // Blue-400
  warningShimmer: 'rgb(254,240,138)', // Amber-100
  diffAdded: 'rgb(23,37,84)', // Blue-950
  diffRemoved: 'rgb(127,29,29)', // Red-900
  diffAddedDimmed: 'rgb(15,23,42)', // Blue-tinted dark
  diffRemovedDimmed: 'rgb(69,10,10)', // Red-950
  diffAddedWord: 'rgb(59,130,246)', // Blue-500
  diffRemovedWord: 'rgb(248,113,113)', // Red-400
  // Agent colors
  red_FOR_SUBAGENTS_ONLY: 'rgb(252,165,165)',
  blue_FOR_SUBAGENTS_ONLY: 'rgb(147,197,253)',
  green_FOR_SUBAGENTS_ONLY: 'rgb(34,211,238)', // Cyan-400 alternative
  yellow_FOR_SUBAGENTS_ONLY: 'rgb(253,224,71)',
  purple_FOR_SUBAGENTS_ONLY: 'rgb(192,132,252)',
  orange_FOR_SUBAGENTS_ONLY: 'rgb(253,186,116)',
  pink_FOR_SUBAGENTS_ONLY: 'rgb(244,114,182)',
  cyan_FOR_SUBAGENTS_ONLY: 'rgb(34,211,238)',
  professionalBlue: 'rgb(96,165,250)',
  chromeYellow: 'rgb(251,188,4)',
  // TUI V2
  clawd_body: 'rgb(96,165,250)',
  clawd_background: 'rgb(2,8,23)',
  userMessageBackground: 'rgb(30,41,59)',
  userMessageBackgroundHover: 'rgb(51,65,85)',
  messageActionsBackground: 'rgb(30,58,95)',
  selectionBg: 'rgb(29,78,137)',
  bashMessageBackgroundColor: 'rgb(15,23,42)',

  memoryBackgroundColor: 'rgb(30,41,59)',
  rate_limit_fill: 'rgb(96,165,250)',
  rate_limit_empty: 'rgb(51,65,85)',
  fastMode: 'rgb(96,165,250)',
  fastModeShimmer: 'rgb(147,197,253)',
  briefLabelYou: 'rgb(96,165,250)',
  briefLabelClaude: 'rgb(147,197,253)',
  rainbow_red: 'rgb(248,113,113)',
  rainbow_orange: 'rgb(251,146,60)',
  rainbow_yellow: 'rgb(250,204,21)',
  rainbow_green: 'rgb(74,222,128)',
  rainbow_blue: 'rgb(96,165,250)',
  rainbow_indigo: 'rgb(129,140,248)',
  rainbow_violet: 'rgb(192,132,252)',
  rainbow_red_shimmer: 'rgb(252,165,165)',
  rainbow_orange_shimmer: 'rgb(253,186,116)',
  rainbow_yellow_shimmer: 'rgb(253,224,71)',
  rainbow_green_shimmer: 'rgb(134,239,172)',
  rainbow_blue_shimmer: 'rgb(147,197,253)',
  rainbow_indigo_shimmer: 'rgb(165,180,252)',
  rainbow_violet_shimmer: 'rgb(216,180,252)',
}

export function getTheme(themeName: ThemeName): Theme {
  switch (themeName) {
    case 'light':
      return lightTheme
    case 'light-ansi':
      return lightAnsiTheme
    case 'dark-ansi':
      return darkAnsiTheme
    case 'light-daltonized':
      return lightDaltonizedTheme
    case 'dark-daltonized':
      return darkDaltonizedTheme
    default:
      return darkTheme
  }
}

// Create a chalk instance with 256-color level for Apple Terminal
// Apple Terminal doesn't handle 24-bit color escape sequences well
const chalkForChart =
  env.terminal === 'Apple_Terminal'
    ? new Chalk({ level: 2 }) // 256 colors
    : chalk

/**
 * Converts a theme color to an ANSI escape sequence for use with asciichart.
 * Uses chalk to generate the escape codes, with 256-color mode for Apple Terminal.
 */
export function themeColorToAnsi(themeColor: string): string {
  const rgbMatch = themeColor.match(/rgb\(\s?(\d+),\s?(\d+),\s?(\d+)\s?\)/)
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]!, 10)
    const g = parseInt(rgbMatch[2]!, 10)
    const b = parseInt(rgbMatch[3]!, 10)
    // Use chalk.rgb which auto-converts to 256 colors when level is 2
    // Extract just the opening escape sequence by using a marker
    const colored = chalkForChart.rgb(r, g, b)('X')
    return colored.slice(0, colored.indexOf('X'))
  }
  // Fallback to magenta if parsing fails
  return '\x1b[35m'
}
