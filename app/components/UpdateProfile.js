/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Select, Modal, Icon } from './form';
import { userRoleSelect } from '../helpers/user';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  contextMenu: {
    display: 'none',
    position: 'absolute',
    top: 0,
    width: '100%',
    transform: 'translateY(calc(-100% - 2rem))',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '15px',
    textAlign: 'left',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '1.6rem',
    lineHeight: '22px',
    cursor: 'pointer',
    boxShadow:
      '0px 4px 13px rgb(0 0 0 / 10%), inset 0px -3px 10px rgb(149 149 149 / 20%)',
  },
  openMenu: {
    display: 'block',
  },
  logoutBtn: {
    marginBottom: '1.5rem',
    color: '#eb5757',
  },
  profileContainer: {
    position: 'relative',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '15px',
    cursor: 'pointer',
    maxWidth: 235,
    '& svg:last-of-type': {
      position: 'absolute',
      top: '50%',
      right: '10px',
      width: '1.2rem!important',
      transform: 'translateY(calc(50% - 13px)) rotate(180deg)',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  profileContainerOpen: {
    '& svg:last-of-type': {
      transform: 'translateY(calc(50% - 13px)) rotate(0deg)',
    },
  },
  userName: {
    width: 'calc(100% - 30px)',
    marginRight: 'auto',
    padding: '0 10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  userPictureContainer: {
    width: 50,
    paddingRight: 10,
  },
  userPicture: {
    maxWidth: 40,
    borderRadius: '100%',
  },
}));

const UpdateProfile = ({ user, update, logout }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState(user);
  const handleChange = (name) => ({ target: { value } }) =>
    setState({ ...state, [name]: value });
  const handleOpenModal = () => setOpenModal(true);
  const toggleShowSubMenu = () => setShowSubMenu(!showSubMenu);
  const handleModalClose = (showMessage) => {
    if (showMessage && JSON.stringify(user) !== JSON.stringify(state))
      toast.success('Profil mis à jour');
    toggleShowSubMenu();
    setOpenModal(false);
  };
  // eslint-disable-next-line no-return-assign
  const handleLogOut = () => logout(() => (window.location = '/login'));
  const handleSumbit = () => {
    update(state, () => handleModalClose(true));
  };
  const classes = useStyles();

  return (
    <div>
      <div className="relative">
        <div
          className={
            !showSubMenu
              ? classes.contextMenu
              : clsx(classes.contextMenu, classes.openMenu)
          }
        >
          <div onClick={handleLogOut} className={classes.logoutBtn}>
            Déconnexion
          </div>
          <div onClick={handleOpenModal}>Modifier vos informations</div>
        </div>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={
            !showSubMenu
              ? classes.profileContainer
              : clsx(classes.profileContainer, classes.profileContainerOpen)
          }
          onClick={toggleShowSubMenu}
        >
          <Icon type="user" />
          <Typography variant="subtitle1" className={classes.userName}>
            {`${state?.firstName} ${state?.lastName}`}
          </Typography>
          <Icon type="triangle" size="small" />
        </Grid>
      </div>
      <Modal
        openModal={openModal}
        onClose={handleModalClose}
        onClick={handleSumbit}
        title="Vos informations"
        confirmText="Mettre à jour"
      >
        <Grid container item justify="center" className="form-container">
          <Grid container item>
            <Input
              value={state.lastName}
              label="Nom*"
              onChange={handleChange}
              name="lastName"
              position="left"
            />
            <Input
              value={state.firstName}
              label="Prénom*"
              onChange={handleChange}
              name="firstName"
              position="right"
            />
            <Input
              value={state.email}
              label="E-mail*"
              onChange={handleChange}
              name="email"
              type="email"
              position="left"
            />
            <Input
              value={state.phone}
              label="Téléphone"
              onChange={handleChange}
              name="phone"
              type="phone"
              position="right"
            />
            <Input
              value={state.password}
              label="Mot de passe"
              placeholder="Votre mot de passe"
              onChange={handleChange}
              name="password"
              type="password"
              position="left"
            />
            <Select
              name="role"
              value={state.role}
              onChange={handleChange}
              label="Status"
              position="right"
              list={userRoleSelect}
            />
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};
export default UpdateProfile;
