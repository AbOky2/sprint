import React from 'react';
import { withRouter } from 'next/router';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    margin: 'auto',
    padding: '0 0 5.5rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingTop: 0,
      paddingBottom: '2rem',
    },
  },
  redirect: {
    display: 'inline-block',
    position: 'sticky',
    top: '.5rem',
    marginBottom: '3.2rem',
    borderRadius: '1rem',
    zIndex: 35,
    [theme.breakpoints.down('sm')]: {
      top: '3.5rem',
    },
    '& h4': {
      textAlign: 'left',
      color: theme.palette.newBlue,
      cursor: 'pointer',
      fontSize: '1.4rem',
      fontWeight: 'bold',
      '&::before': {
        content: "''",
        border: `1px solid ${theme.palette.newBlue}`,
        borderWidth: '0 2px 2px 0',
        display: 'inline-block',
        padding: '3px',
        marginRight: '1rem',
        transform: 'rotate(135deg);-webkit-transform: rotate(135deg)',
      },
    },
  },
});
const AdminContentWrapper = withStyles(styles)(
  withRouter(({ classes, router, href, noRedirect, children }) => (
    <Grid className={classes.container}>
      {noRedirect ? (
        ''
      ) : (
        <div
          className={classes.redirect}
          onClick={(e) => {
            if (href) router.push(href);
            else router.back();
          }}
        >
          <Typography variant="h4">Retourner à la recherche</Typography>
        </div>
      )}
      {children}
    </Grid>
  ))
);

export { AdminContentWrapper };
