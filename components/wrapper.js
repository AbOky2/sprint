import React from 'react';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    width: 'calc(100% - 100px)',
    margin: 'auto',
    padding: '5.6rem 0',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      paddingTop: '3.6rem',
      paddingBottom: 95,
    },
  },
  redirect: {
    display: 'inline-block',
    marginBottom: '3.2rem',
    textAlign: 'left',
    color: '#8692a6',
    '&::before': {
      content: "''",
      border: '1px solid #8692a6',
      borderWidth: '0 3px 3px 0',
      display: 'inline-block',
      padding: '3px',
      marginRight: '1rem',
      transform: 'rotate(135deg);-webkit-transform: rotate(135deg)',
    },
  },
});
const AdminContentWrapper = withStyles(styles)(
  ({
    classes,
    children,
    redirectDashboard,
    redirectUri = '/dashboard',
    redirectText = 'Revenir à l’accueil',
  }) => (
    <Grid className={classes.container}>
      {redirectDashboard ? (
        <div className="text-left">
          <Link to={redirectUri} className={classes.redirect}>
            {redirectText}
          </Link>
        </div>
      ) : (
        ''
      )}
      {children}
    </Grid>
  ),
);

export { AdminContentWrapper };
