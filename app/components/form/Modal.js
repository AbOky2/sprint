/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Btn, Icon } from 'components';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '4rem 10rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      ...theme.space.bodyWrapper,
      paddingTop: '2rem',
    },
    '& h2': {
      color: "linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%);",
      fontWeight: 800,
    },
  },
  close: {
    position: 'absolute',
    top: 35,
    right: 35,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      top: '1rem',
      right: '1rem',
    },
  },
  contentContainer: {
    display: 'inline-block',
    width: '100%',
    margin: '0 auto 1rem',
    padding: '4rem 0 5rem',
    borderBottom: `1px solid ${theme.palette.newGray}`,
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 0 4rem',
    },
  },
  noDivider: {
    borderBottom: `none`,
    paddingBottom: 0,
  },
  btnContainer: {
    marginTop: 30,
    '& > div:first-of-type': {
      paddingRight: 11,
      '& div': {
        marginLeft: 'auto',
      },
    },
    '& > div:last-of-type': {
      paddingLeft: 11,
    },
    '& > div': {
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '2rem',
      },
    },
  },
}));
export const Modal = ({
  children,
  openModal,
  onClose,
  title,
  showActions = true,
  showDivider = true,
  onClick,
  confirmText = 'Confirmer',
  ...props
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={!!openModal}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      disableBackdropClick
      fullWidth
      overlaystyle={{
        background: `linear-gradient(109.69deg, rgba(204, 149, 223, 0.3) 6.69%,
          rgba(79, 128, 255, 0.3) 63.14%)`,
      }}
      maxWidth="lg"
      {...props}
    >
      <div className={classes.close} onClick={onClose}>
        <Icon type="close" />
      </div>
      <div className={classes.container}>
        {title ? (
          <Typography variant="h2" className="text-center">
            {title}
          </Typography>
        ) : (
          ''
        )}
        <div
          className={clsx(
            classes.contentContainer,
            !showDivider ? classes.noDivider : ''
          )}
        >
          {children}
        </div>
        {showActions && (
          <Grid container justify="center" className={classes.btnContainer}>
            <Grid item md={6}>
              <Btn text="Annuler" whiteColor onClick={onClose} />
            </Grid>
            <Grid item md={6}>
              <Btn text={confirmText} onClick={onClick} />
            </Grid>
          </Grid>
        )}
      </div>
    </Dialog>
  );
};

Modal.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  openModal: PropTypes.bool,
  showDivider: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  confirmText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  title: '',
  openModal: false,
  showDivider: true,
  showActions: true,
  onClick: null,
  confirmText: 'Confirmer',
};
