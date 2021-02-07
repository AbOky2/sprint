import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Btn from './Btn';

const Modal = ({
  children,
  openModal,
  onClose,
  title,
  showActions = true,
  onClick,
  confirmText = 'Confirmer',
  ...props
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openModal}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      disableBackdropClick
      fullWidth
      overlaystyle={{
        background: `linear-gradient(109.69deg, rgba(204, 149, 223, 0.3) 6.69%,
          rgba(79, 128, 255, 0.3) 63.14%)`,
      }}
      {...props}
    >
      <div className="modal-content-container">
        {title ? <div className="modal-title">{title}</div> : ''}
        <div>{children}</div>
        {showActions && (
          <Grid container justify="center" className="modal-action-container">
            <Btn text="Annuler" onClick={onClose} className="login-btn no-border" auto={false} />
            <Btn
              text={confirmText}
              onClick={onClick}
              className="blueColor login-btn"
              auto={false}
            />
          </Grid>
        )}
      </div>
    </Dialog>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  openModal: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  confirmText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  title: '',
  openModal: false,
  showActions: true,
  confirmText: 'Confirmer',
};

export default Modal;
