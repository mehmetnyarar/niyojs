import {
  BROWSER_STYLES,
  NODE_STYLES,
  setBrowserStyles,
  setNodeStyles
} from 'src/styles'

describe('styles', () => {
  describe('setNodeStyles', () => {
    it('should merge the node styles', () => {
      const style = 'black'
      setNodeStyles({ debug: style })

      expect(NODE_STYLES.debug).toBe(style)
      expect(NODE_STYLES.error).toBe('red')
    })
  })

  describe('setBrowserStyles', () => {
    it('should merge the browser styles', () => {
      const style = 'background: black; color: white;'
      setBrowserStyles({ debug: style })

      expect(BROWSER_STYLES.debug).toBe(style)
      expect(BROWSER_STYLES.error).toBe('color: red;')
    })
  })
})
