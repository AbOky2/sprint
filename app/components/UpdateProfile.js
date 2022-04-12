import React, { useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userRoleSelect } from 'helpers';
import { pageLink } from 'constants/index';
import { Input, Select, Modal, Icon } from './form';
import { pageLink } from 'constants/index';

const useStyles = makeStyles((theme) => ({
  contextMenu: {
    display: 'none',
    position: 'absolute',
    top: '100%',
    width: 'max-content',
    right: 0,
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '1.5rem',
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
    top: 'calc(100% + .3rem)',
    '& > div': {
      '&:nth-child(2)': {
        marginBottom: '1.5rem',
      },
    },
  },
  logoutBtn: {
    marginBottom: '1.5rem',
    color: '#eb5757',
  },
  profileContainer: {
    position: 'relative',
    padding: '1.5rem 2.5rem',
    backgroundColor: 'white',
    borderRadius: '1.5rem',
    cursor: 'pointer',
    '& svg:last-of-type': {
      position: 'absolute',
      top: '50%',
      right: '2rem',
      width: '1.2rem!important',
      transform: 'translateY(calc(50% - 1.5rem)) rotate(90deg)',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  profileContainerOpen: {
    '& svg:last-of-type': {
      transform: 'translateY(calc(50% - 1.5rem)) rotate(-90deg)',
    },
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  userName: {
    marginRight: '.8rem',
    padding: '0 2.5rem 0 .8rem',
    lineHeight: '2.8rem',
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

export const UpdateProfile = ({ user, update, logout, transparent }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState(user);
  const handleChange =
    (name) =>
    ({ target: { value } }) =>
      setState({ ...state, [name]: value });
  const handleOpenModal = () => setOpenModal(true);
  const toggleShowSubMenu = () => setShowSubMenu(!showSubMenu);
  const handleModalClose = (showMessage = false) => {
    const hasUpdate =
      showMessage == true && JSON.stringify(user) !== JSON.stringify(state);

    if (hasUpdate) toast.success('Profil mis à jour');
    toggleShowSubMenu();
    setOpenModal(false);
    if (!hasUpdate) setState(user);
  };
  // eslint-disable-next-line no-return-assign
  const handleLogOut = () => logout(() => (window.location = pageLink.home));
  const handleSumbit = () => update(state, () => handleModalClose(true));
  const onKeyPress = (e) => e.key === 'Enter' && handleSumbit(true);

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
              ? clsx(
                  classes.profileContainer,
                  transparent ? classes.transparent : ''
                )
              : clsx(
                  classes.profileContainer,
                  classes.profileContainerOpen,
                  transparent ? classes.transparent : ''
                )
          }
          onClick={toggleShowSubMenu}
        >
          {/* <Icon type="user" /> */}
          <Typography className={classes.userName}>Mon profil</Typography>
          <Icon type="sliderArrow" size="small" />
        </Grid>
      </div>
      <Modal
        openModal={openModal}
        onClose={handleModalClose}
        onClick={handleSumbit}
        title="Mon Profil"
        confirmText="Enregistrer"
      >
        <Grid container item justify="center" className="form-container">
          <Grid container item>
            <div style={{background:"linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)", width:"86px", height:"86px", borderRadius:"50%", padding:"15px", marginBottom:"19px"}}>
              <Icon
              type='leK'
              size='large'
              noColor
               />

            </div>
            <Input
              value={state.lastName}
              onChange={handleChange}
              onKeyPress={onKeyPress}
              name="lastName"
              position="left"
            />
            <Input
              value={state.firstName}
              onChange={handleChange}
              onKeyPress={onKeyPress}
              name="firstName"
              position="right"
            />
            <Input
              value={state.email}
              onChange={handleChange}
              onKeyPress={onKeyPress}
              name="email"
              type="email"
              position="left"
            />
            <Input
              value={state.phone}
              onChange={handleChange}
              onKeyPress={onKeyPress}
              name="phone"
              type="phone"
              position="right"
            />
            <Input
              value={state.password}
              placeholder="Votre mot de passe"
              onChange={handleChange}
              onKeyPress={onKeyPress}
              name="password"
              type="password"
              position="left"
            />
            <Select
              name="role"
              value={state.role}
              onChange={handleChange}
              position="right"
              list={userRoleSelect}
            />
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};
