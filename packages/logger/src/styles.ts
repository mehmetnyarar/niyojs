import { DEFAULT_BROWSER_STYLES, DEFAULT_NODE_STYLES } from './const'
import { LogStyles } from './types'
import { merge } from './utility'

/**
 * Node styles.
 */
let NODE_STYLES = DEFAULT_NODE_STYLES

/**
 * Browser styles.
 */
let BROWSER_STYLES = DEFAULT_BROWSER_STYLES

/**
 * Updates the global node styles.
 * @param value Styles.
 */
export function setNodeStyles (styles: Partial<LogStyles>): void {
  NODE_STYLES = merge(DEFAULT_NODE_STYLES, styles, '')
}

/**
 * Updates the global browser styles.
 * @param value Styles.
 */
export function setBrowserStyles (styles: Partial<LogStyles>): void {
  BROWSER_STYLES = merge(DEFAULT_BROWSER_STYLES, styles, '')
}

export { NODE_STYLES, BROWSER_STYLES }
