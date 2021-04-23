import { withStyles } from '@material-ui/core';

const inputRadius = '1.5rem';

const styles = (theme) => ({
  searchMapContainer: {
    '& > div:first-of-type > div:first-of-type > div:last-of-type > svg ': {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      '& > div:first-of-type': {
        position: 'absolute',
        top: 0,
        left: '15%',
        transform: 'translateY(calc(10% + 1rem))',
        zIndex: 1,
        width: '70%',
        '& > div:first-of-type > div:last-of-type > svg': {
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 3,
          transform: 'initial',
        },
      },
    },
  },
  resetSearchMapContainer: {
    '& > div:first-of-type': {
      position: 'relative',
      marginBottom: '5rem',
      transform: 'initial',
    },
  },
  card: {
    width: 'calc(100% - 14px)',
  },
  title: {
    color: '#4F80FF',
  },
  subTitle: {
    margin: '4px 0 22px',
    color: 'rgba(26, 46, 108, 0.75)',
  },
  setpsContainer: {
    marginBottom: '40px',
    padding: '3.2rem',
    borderRadius: '2.5rem',
    color: 'white',
    background: 'white',
    boxShadow:
      '0px 4px 13px rgb(0 0 0 / 10%), inset 0px -3px 10px rgb(149 149 149 / 20%)',
    '& ul': {
      paddingLeft: 0,
    },
    '& li': {
      marginBottom: 15,
    },
    '& span': {
      padding: '0 5px',
      color: 'white',
      marginRight: 10,
      background: '#4F80FF',
      borderRadius: '3px',
    },
  },
  searchContainer: {
    maxWidth: '742px',
    margin: 'auto',
    marginBottom: '1.6rem',
    '& input:focus': {
      border: `solid 1px ${theme.palette.lightGray}`,
    },
    '& > div:first-of-type': {
      position: 'relative',
      zIndex: 30,
    },
    '& > div:last-of-type > div > div:first-of-type > input': {
      borderTopRightRadius: inputRadius,
      borderBottomRightRadius: inputRadius,
    },
    '& > div:first-of-type > div': {
      height: '100%',
      '& > div': {
        '&:first-of-type': {
          minHeight: 62,
          borderRadius: inputRadius,
          fontFamily: 'Open Sans',
          fontSize: '1.6rem',
          fontWeight: '600',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: 0,
          border: `solid 1px ${theme.palette.lightBlue}`,
          borderColor: theme.palette.lightBlue,
          height: '100%',
          [theme.breakpoints.down('sm')]: {
            borderRadius: '1.1rem!important',
            borderRight: `1px solid ${theme.palette.lightBlue}`,
            borderBottom: 0,
            minHeight: 46,
          },
        },
        '&:last-of-type': {
          '& > div > div': {
            paddingLeft: '2.4rem',
          },
          zIndex: 3,
          '& input': {
            ...theme.ui.searchInput,
          },
        },
      },
    },
    '& > div:last-of-type svg': {
      position: 'absolute',
      right: 0,
      top: '50%',
      width: 40,
      height: 40,
      transform: 'translateY(calc(-50% - -3px))',
    },
    '& > div:nth-child(2) > div > div > div': {
      backgroundColor: 'white',
      borderRadius: 0,
    },
    '& > div:first-of-type input': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: 'none',
    },
    '& > div:last-of-type input': {
      margin: 0,
      borderLeft: 'none',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div': {
        display: 'block',
        width: '100%',
      },
      '& > div:nth-child(2) > div > div > div': {
        backgroundColor: 'white',
        borderRadius: 0,
      },
      '& > div input': {
        borderRadius: inputRadius,
      },
      '& > div:first-of-type input': {
        borderRight: `1px solid ${theme.palette.lightBlue}`,
        borderBottom: `1px solid ${theme.palette.lightBlue}`,
        borderRadius: '0 !important',
      },
      '& > div:last-of-type input': {
        borderLeft: `1px solid ${theme.palette.lightBlue}`,
        borderTopLeftRadius: '0 !important',
        borderTopRightRadius: '0 !important',
        borderTop: 'none',
      },
    },
  },
  isLocation: {
    '& > div:last-of-type input': {
      borderLeft: `1px solid ${theme.palette.lightBlue}`,
    },
  },
  notFound: {
    width: '100%',
    textAlign: 'center',
    margin: '2rem 0',
    '& span': {
      marginRight: '1rem',
    },
  },
  locationMaxBudget: {
    '& input': {
      border: `1px solid ${theme.palette.lightBlue}`,
    },
  },
  changeViewContainer: {
    position: 'absolute',
    top: '2.5rem',
    left: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  changeView: {
    ...theme.ui.bordered,
    display: 'flex',
    marginTop: 0,
    alignItems: 'center',
    padding: '.8rem 1.4rem',
    border: `1px solid ${theme.palette.lightGray}`,
    backgroundColor: 'white',
    borderRadius: '.8rem',
    textAlign: 'right',
    fontSize: '1rem',
    cursor: 'pointer',
    '& span': {
      paddingRight: '1rem',
      ...theme.typography.body1,
      fontSize: '1.4rem',
      marginLeft: 'auto',
      color: theme.palette.blue,
    },
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: 55,
      left: '50%',
      transform: 'translateX(-50%)',
      '& > svg': {
        position: 'initial!important',
        transform: 'initial!important',
        top: 0,
      },
      '& span': {
        paddingLeft: '.8rem',
      },
    },
  },
  listContainer: theme.ui.listContainer,
  mapsListContainer: {
    ...theme.ui.bordered,
    position: 'relative',
    width: '100%',
    border: `1px solid ${theme.palette.lightBlue}`,
    backgroundColor: 'white',
    marginTop: '.8rem',
    '&:first-of-type': {
      marginTop: 0,
    },
    '& > a > div': {
      display: 'flex',
      '& > div:first-of-type': {
        display: 'flex',
        jsutifyContent: 'stretch',
        width: '40%',
        minHeight: '100%',
        '& > div': {
          ...theme.ui.bordered,
          position: 'initial',
          width: '100%',
          height: '100%',
          '& > span': {
            top: '1.6rem',
            right: '1.6rem',
          },
        },
      },
      '& > div:last-of-type': {
        width: '60%',
        padding: '2.5rem 1.6rem',
        paddingRight: '3.5rem',
        '& > p:last-of-type': {
          textAlign: 'left',
        },
      },
    },
  },
  mapsCurrListContainer: {
    border: `1px solid ${theme.palette.newBlue}`,
  },
  mapsMobileListContainer: {
    padding: 0,
    '& > a > div > div:first-of-type > div': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    '& > a > div > div:last-of-type': {
      padding: '1.6rem',
      '& h4': {
        fontSize: '1.4rem',
      },
      '& p': {
        fontSize: '1.2rem',
      },
    },
  },
  listViewContainer: {
    padding: '0 2.4rem',
  },
  mapsViewContainer: {
    '& > div': {
      '&:last-of-type': {
        position: 'sticky',
        top: 0,
        minHeight: '80vh',
        maxHeight: '100vh',
        '& > div': {
          zIndex: 3,
          '&:first-of-type': {
            borderTopLeftRadius: '1.5rem',
            overflow: 'hidden',
          },
        },
      },
      [theme.breakpoints.down('sm')]: {
        '&:first-of-type': {
          display: 'none',
        },
        '&:last-of-type': {
          paddingLeft: 0,
          minHeight: '65vh',
          '& > div:last-of-type': {
            display: 'flex!important',
            position: 'absolute',
            bottom: '2rem',
          },
        },
      },
    },
  },
  fullMapsViewContainer: {
    '& > div:last-of-type': {
      width: '100%',
      '& > div:first-of-type': {
        borderTopLeftRadius: 0,
      },
    },
  },
  pagination: {
    marginTop: '1rem',
  },
  notFound: {
    width: '100%',
    textAlign: 'center',
    margin: '2rem 0',
    '& span': {
      marginRight: '1rem',
    },
  },
  sortContainer: {
    marginBottom: '1.6rem',
    '& > div': {
      minWidth: '42%',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
        padding: '0!important',
        '&:last-of-type': {
          marginTop: '.8rem',
          textAlign: 'center',
          '& span': {
            marginLeft: 'initial',
          },
        },
      },
      '&:first-of-type': {
        '& select': {
          ...theme.ui.bordered,
          backgroundColor: theme.palette.lightBlue,
          padding: '1.27rem 1.4rem',
          color: theme.palette.newBlue,
        },
        '& fieldset': {
          border: 'none',
        },
        '& svg': {
          fill: theme.palette.newBlue,
        },
      },
      '&:last-of-type': {
        '& > div': {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  },
});
export default withStyles(styles);
