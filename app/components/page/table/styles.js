export default (theme) => ({
  discoveryContentHeader: {
    padding: '2.5rem 0',
    fontFamily: 'Nunito',
    borderTop: '1px solid rgba(26, 46, 108, 0.5)',
    color: theme.palette.newBlue,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.6rem',
    lineHeight: '2.2rem',

    [theme.breakpoints.down('sm')]: {
      paddingBottom: '2.5rem',
      display: 'none',
      '& > div': {
        display: 'none',
      },
    },
  },
  discoveryContent: {
    marginBottom: '2.4rem',
    '& > div:first-of-type': {
      display: 'none',
    },
    '& > div:last-child > div > div': {
      margin: 'auto',
      fontSize: '1rem',
      color: theme.palette.newBlue,
      border: `1px solid ${theme.palette.newBlue}`,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div': {
        display: 'none',
        '& > div': {
          padding: '0 2rem',
        },
      },
      '& > div:first-of-type': {
        display: 'flex',
        paddingTop: '2.5rem',
        borderTop: '1px solid rgba(26, 46, 108, 0.5)',
        '& > div:last-of-type': {
          marginTop: '1.6rem',
          padding: 0,
          width: '100%',
          '& > div': {
            width: '100%',
            color: theme.palette.newBlue,
            border: `1px solid ${theme.palette.newBlue}`,
          },
        },
      },
    },
  },
  btnContainer: {
    '& a': {
      padding: '10px 23px',
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: theme.palette.newBlue,
    },
  },
});
