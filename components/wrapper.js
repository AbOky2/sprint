import React from 'react';
import { withRouter } from 'next/router';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    width: 'calc(100% - 100px)',
    margin: 'auto',
    padding: '5.5rem 0',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingTop: 0,
      paddingBottom: '2rem',
    },
  },
  redirect: {
    display: 'inline-block',
    '& h4': {
      marginBottom: '3.2rem',
      textAlign: 'left',
      color: '#8692a6',
      cursor: 'pointer',
      fontWeight: 'bold',
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
          <Typography variant="h4">Revenir en arrière</Typography>
        </div>
      )}
      {children}
    </Grid>
  )),
);

export { AdminContentWrapper };
