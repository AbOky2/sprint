import { createMuiTheme } from '@material-ui/core/styles';

const shared = {
  colors: {
    primary: '#1A2E6C',
    newBlue: '#4F80FF',
    lightBlue: '#D2DCF5',
    lighterGray: '#1a2e6c80',
    iconBlue: '#5379EF',
    gray: '#c7cfd6',
    lightGray: '#E2E2E2',
    white: '#fff',
    red: '#E02A50',
  },
  fonts: {
    titles: {
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    others: {
      fontSize: '1.8rem',
      lineHeight: '2.8rem',
    },
  },
};

const theme = createMuiTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        background:
          'linear-gradient(109.69deg, rgba(204, 149, 223, 0.3) 6.69%, rgba(79, 128, 255, 0.3) 63.14%)',
      },
    },
  },
  ui: {
    bordered: {
      borderRadius: 15,
    },
  },
  palette: {
    primary: {
      main: shared.colors.newBlue,
    },
    newBlue: shared.colors.newBlue,
    blue: shared.colors.primary,
    gray: shared.colors.gray,
    lightGray: shared.colors.lightGray,
    lighterGray: shared.colors.lighterGray,
    lightBlue: shared.colors.lightBlue,
    button: shared.colors.button,
  },
  space: {
    bodyWrapper: {
      padding: '2rem',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: 'Open Sans',
    h1: {
      fontFamily: 'Nunito',
      fontStyle: 'normal',
      fontWeight: 'bolder',
      fontSize: '3rem',
      lineHeight: '4.1rem',
      color: shared.colors.newBlue,
    },
    h2: {
      ...shared.fonts.titles,
      fontSize: '2.6rem',
      lineHeight: '3.5rem',
      letterSpacing: 'normal',
      fontWeight: 'bolder',
      color: shared.colors.newBlue,
    },
    h3: {
      ...shared.fonts.titles,
      ...shared.fonts.others,
      color: shared.colors.newBlue,
      fontWeight: 'bolder',
      fontSize: '2rem',
    },
    h4: {
      ...shared.fonts.titles,
      ...shared.fonts.others,
      color: shared.colors.primary,
      fontWeight: 'bolder',
    },
    subtitle1: {
      ...shared.fonts.titles,
      ...shared.fonts.others,
      fontWeight: '600',
      color: 'rgba(26, 46, 108, 0.75)',
    },
    body1: {
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.6rem',
      lineHeight: '2.2rem',
      color: shared.colors.primary,
    },
  },
});
theme.ui.listContainer = {
  width: '25%',
  marginBottom: '2rem',
  '&:nth-child(3n+2)': {
    padding: '0 1rem 0rem',
  },
  '&:nth-child(3n+1)': {
    paddingRight: '1rem',
  },
  '&:nth-child(3n+3)': {
    paddingLeft: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '0!important',
    '&:last-child': {
      marginBottom: 0,
    },
  },
};
export { theme, shared };
