const style = (theme) => ({
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
    marginBottom: 22,
    '& input:focus': {
      border: `solid 1px ${theme.palette.lightGray}`,
    },
    '& > div:first-of-type': {
      position: 'relative',
      zIndex: 30,
    },
    '& > div:first-of-type > div > div': {
      '&:first-of-type': {
        minHeight: 62,
        borderRadius: '.6rem',
        fontFamily: 'Open Sans',
        fontSize: '1.6rem',
        fontWeight: '600',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
        border: `solid 1px ${theme.palette.lightGray}`,
        borderColor: theme.palette.lightGray,
        [theme.breakpoints.down('sm')]: {
          borderBottomLeftRadius: 0,
          borderTopRightRadius: '.6rem',
          borderRight: `1px solid ${theme.palette.lightGray}`,
          borderBottom: 0,
        },
      },
      '&:last-of-type': {
        zIndex: 3,
      },
    },
    '& > div:last-of-type svg': {
      position: 'absolute',
      right: 0,
      top: '50%',
      width: 40,
      height: 40,
      transform: 'translateY(-50%)',
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
        borderRadius: '.6rem',
      },
      '& > div:first-of-type input': {
        borderRight: `1px solid ${theme.palette.lightGray}`,
        borderBottom: `1px solid ${theme.palette.lightGray}`,
        borderRadius: '0 !important',
      },
      '& > div:last-of-type input': {
        borderLeft: `1px solid ${theme.palette.lightGray}`,
        borderTopLeftRadius: '0 !important',
        borderTopRightRadius: '0 !important',
        borderTop: 'none',
      },
    },
  },
  isLocation: {
    '& > div:last-of-type input': {
      borderLeft: `1px solid ${theme.palette.lightGray}`,
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
  search: {
    position: 'relative',
  },
  locationMaxBudget: {
    '& input': {
      border: `1px solid ${theme.palette.lightGray}`,
    },
  },
  changeView: {
    marginTop: 0,
    transform: 'translateY(-1.5rem)',
    textAlign: 'right',
    fontSize: '1rem',
    '& span': {
      cursor: 'pointer',
    },
  },
  listContainer: theme.ui.listContainer,
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
});
export default style;
