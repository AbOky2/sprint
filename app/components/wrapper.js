import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'next/router';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const redirectStyle = (theme) => ({
  display: 'inline-block',
  position: 'sticky',
  top: '.5rem',
  padding: '.5rem 1.5rem',
  marginBottom: '2.4rem',
  borderRadius: '1rem',
  backgroundColor: '#f7f8fa',
  zIndex: 35,
  [theme.breakpoints.down('sm')]: {
    top: '2.5rem',
  },
  '& h4': {
    textAlign: 'left',
    color: theme.palette.newBlue,
    fontFamily: theme.typography.fontFamily,
    cursor: 'pointer',
    fontSize: '1.2rem',
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
});

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
  noPadding: {
    padding: 0,
  },
  redirectStyle: redirectStyle(theme),
  mobilePadding: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '2rem',
    },
  },
});

const AdminContentWrapper = withStyles(styles)(
  withRouter(
    ({
      classes,
      router,
      href,
      noRedirect,
      noPadding,
      mobilePadding,
      children,
    }) => (
      <Grid
        className={clsx(
          classes.container,
          noPadding ? classes.noPadding : '',
          mobilePadding ? classes.mobilePadding : ''
        )}
      >
        {noRedirect ? (
          ''
        ) : (
          <div
            className={classes.redirectStyle}
            onClick={(e) => {
              if (href) router.push("http://kitlenid.fr");
              else router.back();
            }}
          >
            <Typography variant="h4">Retour</Typography>
          </div>
        )}
        {children}
      </Grid>
    )
  )
);

export { AdminContentWrapper, redirectStyle };
