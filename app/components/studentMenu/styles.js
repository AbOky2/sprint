import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '1.6rem 3.5rem 1.6rem',
    marginBottom: '2.4rem',
    '& > div': {
      width: 'auto',
    },
  },
  noHeaderMargin: {
    marginBottom: 0,
  },
  logoContainer: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    '& a': {
      margin: 'auto',
      '& img': {
        width: 20,
      },
    },
  },
  navContainer: {
    width: 'auto',
    marginLeft: '1.6rem',
    '& > div .active-nav-link': {
      backgroundColor: 'rgba(79, 128, 255, 0.19)',
      border: '1px solid #c1cde7',
    },
    '& > div a': {
      display: 'flex',
      margin: '4px 0',
      padding: '.8rem 1.6rem',
      width: '100%',
      alignItems: 'center',
      textAlign: 'left',
      cursor: 'pointer',
    },
    '& > div span': {
      color: '#1a2e6c',
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
      fontSize: '1.4rem',
      lineHeight: '2.8rem',
    },
    '& > div .active-nav-link span': {
      color: '#4f80ff',
    },
    '& > div .active-nav-link svg path': {
      fill: '#4f80ff',
    },
    '& > div svg path': {
      fill: '#1a2e6c',
    },
  },
  mobileContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0px 4px 13px rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: '.5rem 2rem',
    boxSizing: 'border-box',
    zIndex: 10,
    '& > div a': {
      display: 'inline-block',
      width: 'fit-content',
      marginBottom: 0,
      textAlign: 'center',
      padding: '1rem .3rem',
    },
    '& > div p': {
      margin: '4px 0 6px',
      fontSize: 10,
      color: theme.palette.blue,
    },
    '& span': {
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
  },
  calendar: {
    textAlign: 'center',
  },
  drawer: {
    padding: '2.7rem',
  },
  rightMenu: {
    '& > div:first-of-type': {
      textAlign: 'center',
      '& > div': {
        paddingLeft: '2rem',
      },
      '& a': {
        ...theme.typography.body1,
        display: 'inline-block',
        textAlign: 'center',
        fontSize: '1.4rem',
        color: theme.palette.blue,
      },
    },
    '& > div:nth-child(2)': {
      marginRight: '2rem',
      '& > div': {
        padding: '1.5rem 2.4rem',
        width: '100%',
      },
      '& svg': {
        marginRight: '1.5rem',
      },
      '& span': {
        fontSize: 14,
        padding: 0,
        color: theme.palette.newBlue,
      },
    },
  },
  rightMenuMobile: {
    '& > div:first-of-type': {
      width: '100%',
      marginTop: '3rem',
    },
    '& > div:nth-child(2)': {
      margin: '3rem 0 1.5rem',
      width: '100%',
      '& span': {
        color: 'white',
      },
    },
  },
  activeLink: {
    position: 'relative',
    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      width: 'calc(100% - 2rem)',
      left: 'calc(1rem)',
      borderBottom: `1px solid ${theme.palette.newBlue}`,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'initial',
    },
    '& svg path': {
      fill: '#4f80ff!important',
      stroke: '#4f80ff!important',
    },
    '& span': {
      color: `${theme.palette.newBlue}!important`,
    },
  },
  mobileActiveMobile: {
    '&::after': {
      display: 'none',
    },
    '& p': {
      color: `${theme.palette.newBlue}!important`,
    },
  },
}));

export default useStyles;
