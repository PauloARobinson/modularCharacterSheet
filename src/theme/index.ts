import 'styled-components';

const theme = {
  colors: {
    primary: '#4F46E5',
    background: '#F3F4F6',
    text: '#111827',
    box: '#FFFFFF',
  },
  borderRadius: '8px',
};

export type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

export default theme;
