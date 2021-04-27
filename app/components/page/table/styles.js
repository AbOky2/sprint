const styles = (theme) => ({
  header: {
    '&> p': {
      color: theme.palette.newGray,
      fontFamily: theme.typography.secondFontFamily,
    },
  },
  headerPricing: {
    '& > p > strong': {
      color: theme.palette.blue,
      fontWeight: 'bold',
    },
  },
  discoveryContentHeader: {
    padding: '2.5rem 0',
    fontFamily: theme.typography.secondFontFamily,
    borderTop: '1px solid rgba(26, 46, 108, 0.5)',
    ...theme.typography.body1,
    color: theme.palette.newBlue,

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
  contentContainer: {
    '& > div': {
      color: theme.palette.blue,
      fontWeight: 600,
      lineHeight: '1.9rem',
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
  mail: {
    '& > div': {
      marginBottom: '2.8rem',
      '&:last-of-type': {
        marginTop: '2.4rem',
      },
      '& > div:first-of-type': {
        textAlign: 'right',
        padding: '1.25rem 1rem 0 0',
        [theme.breakpoints.down('sm')]: {
          textAlign: 'left',
        },
      },
      '& > div:nth-child(2)': {
        padding: '1.5rem 2rem',
        borderRadius: '1rem',
        fontWeight: 600,
        border: `1px solid ${theme.palette.lightBlue}`,
        color: theme.palette.blue,
      },
      '& > div:last-child': {
        paddingLeft: '1rem',
        '& > div': {
          width: 'fit-content',
          height: 'fit-content',
          padding: '1.5rem 2rem',
          borderRadius: '1rem',
          color: theme.palette.newBlue,
          border: `1px solid ${theme.palette.newBlue}`,
          boxShadow:
            '0px 4px 14px rgba(14, 108, 218, 0.35), inset 0px 0px 6px rgba(24, 72, 196, 0.6)',
          cursor: 'pointer',
          fontWeight: 600,
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
          },
          '& svg': {
            marginRight: '1rem',
            [theme.breakpoints.down('sm')]: {
              marginRight: 0,
            },
          },
        },
      },
    },
  },
});

export default styles;
