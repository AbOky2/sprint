/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Input, Select, Modal, Icon, Btn } from './form';
import Calendr from '../static/img/icons/calendr.png';
import { logOut } from '../lib/api/public';
import LogoImg from '../static/img/logo.png';

const UpdateProfile = ({ handleChange, handleSumbit, openModal, onClose, values = {} }) => (
  <Modal
    openModal={openModal}
    onClose={onClose}
    onClick={handleSumbit}
    title="Vos informations"
    confirmText="Mettre à jour"
  >
    <Grid container item justify="center" className="form-container">
      <Grid container item>
        <Input
          value={values.lastName}
          label="Nom*"
          onChange={handleChange}
          name="lastName"
          position="left"
        />
        <Input
          value={values.firstName}
          label="Prénom*"
          onChange={handleChange}
          name="firstName"
          position="right"
        />
        <Input
          value={values.email}
          label="E-mail*"
          onChange={handleChange}
          name="email"
          type="email"
          position="left"
        />
        <Input
          value={values.phone}
          label="Téléphone"
          onChange={handleChange}
          name="phone"
          type="phone"
          position="right"
        />
        <Input
          value={values.password}
          label="Mot de passe"
          placeholder="Votre mot de passe"
          onChange={handleChange}
          name="password"
          type="password"
          position="left"
        />
        <Select
          name="status"
          value={values.status}
          onChange={handleChange}
          label="Status"
          position="right"
          list={[
            { name: 'Etudiant', value: 'student' },
            { name: 'Jeune Travailleur', value: 'worker' },
          ]}
        />
      </Grid>
    </Grid>
  </Modal>
);

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 60px)',
    padding: '3rem 0 0',
  },
  logoContainer: {
    marginBottom: '40px',
    width: '100%',
    textAlign: 'center',
    '& img': {
      width: 35,
    },
  },
  navContainer: {
    width: '100%',
    '& > div .active-nav-link': {
      backgroundColor: 'rgba(79, 128, 255, 0.19)',
      border: '1px solid #c1cde7',
    },
    '& > div a': {
      display: 'flex',
      marginBottom: '9px',
      padding: 'calc(2rem - 6px)',
      width: '100%',
      alignItems: 'center',
      textAlign: 'left',
      borderRadius: '13px',
      border: '1px solid transparent',
      cursor: 'pointer',
    },
    '& > div span': {
      marginLeft: '25px',
      color: '#1a2e6c',
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
      fontSize: '1.7rem',
    },
    '& > div .active-nav-link span': {
      color: '#4f80ff',
    },
    '& > div .active-nav-link svg path': {
      fill: '#4f80ff',
    },
    '& > div svg path': {
      fill: '#1a2e6c',
    },
  },
  contextMenu: {
    marginBottom: '1.5rem',
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
    '& svg:first-of-type': {},
    '& svg:last-of-type': {
      position: 'absolute',
      top: '50%',
      right: '10px',
      width: '12px!important',
      transform: 'translateY(calc(50% - 13px)) rotate(180deg)',
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
  mobileContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0px 4px 13px rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 10,
    '& > div a': {
      display: 'inline-block',
      width: 'fit-content',
      marginBottom: 0,
      textAlign: 'center',
    },
    '& > div .active-nav-link': {
      backgroundColor: 'initial',
      border: 'none',
      textAlign: 'center',
    },
    '& > div .active-nav-link p': {
      fontWeight: 'bold',
      color: '#4F80FF',
    },
    '& > div p': {
      margin: '4px 0 6px',
      fontSize: 10,
    },
    '& span': {
      display: 'block',
    },
  },
  calendar: {
    '& img': {
      width: 20,
    },
  },
  sponsorship: {
    width: '100%',
    '& > div': {
      padding: '1.5rem 0',
      width: '100%',
    },
    '& svg': {
      marginRight: '1.5rem',
    },
    '& span': {
      fontSize: 14,
    },
  },
  activeLink: {
    backgroundColor: 'rgba(79, 128, 255, 0.19)',
    border: '1px solid #c1cde7',
    '& svg path': {
      fill: '#4f80ff!important',
    },
    '& span': {
      color: `${theme.palette.newBlue}!important`,
    },
  },
}));
const MenuItems = [
  { href: '/dashboard', iconType: 'home', txt: 'Accueil' },
  { href: '/dashboard/bookmark', iconType: 'heart', txt: 'Favoris' },
  { href: '/dashboard/sponsorship', iconType: 'sponsorship', txt: 'Parrainage' },
];
export const MobileMenu = () => {
  const classes = useStyles();
  const { asPath } = useRouter();

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={clsx(classes.navContainer, classes.mobileContainer)}
    >
      {MenuItems?.map(({ href, txt, iconType }) => (
        <Grid key={href} item>
          <Link href={href}>
            <a className={asPath === href ? classes.activeLink : null}>
              <Icon type={iconType} />
              <p>{txt}</p>
            </a>
          </Link>
        </Grid>
      ))}
      <Grid item className={classes.calendar}>
        <Link href="#">
          <a>
            <div>
              <img src={Calendr} alt="" />
            </div>
            <p>Rendez-vous</p>
          </a>
        </Link>
      </Grid>
    </Grid>
  );
};

const logoSize = { width: 37 };

const StudentProfile = ({ user }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState(user);
  const { asPath } = useRouter();
  const handleChange = (name) => ({ target: { value } }) => setState({ ...state, [name]: value });
  const handleModalClose = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);
  const toggleShowSubMenu = () => setShowSubMenu(!showSubMenu);
  // eslint-disable-next-line no-return-assign
  const handleLogOut = () => logOut().then(() => (window.location = '/login'));
  const handleSumbit = () => {
    handleModalClose();
    console.log('Submit');
  };
  const classes = useStyles();

  return (
    <div id="sidebar">
      <Grid container direction="column" justify="space-between" className={classes.container}>
        <Grid container>
          <Grid className={classes.logoContainer}>
            <Link href="/dashboard">
              <a>
                <img src={LogoImg} alt="" />
              </a>
            </Link>
          </Grid>
          <Grid className={classes.navContainer}>
            {MenuItems?.map(({ href, txt, iconType }) => (
              <Grid key={href} container alignItems="center">
                <Link href={href}>
                  <a className={asPath === href ? classes.activeLink : null}>
                    <Icon type={iconType} />
                    <span>{txt}</span>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
          <div className={classes.sponsorship}>
            <Btn
              text="Prendre rendez-vous"
              iconType="calendar"
              onClick={() => console.log('Implement calendly')}
            />
          </div>
        </Grid>
        <div>
          {showSubMenu && (
            <div className={classes.contextMenu}>
              <div onClick={handleLogOut} className={classes.logoutBtn}>
                Déconnexion
              </div>
              <div onClick={handleOpenModal}>Modifier vos informations</div>
            </div>
          )}
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.profileContainer}
            onClick={toggleShowSubMenu}
          >
            <Icon type="user" />
            <Typography variant="subtitle1" className={classes.userName}>
              {`${state?.firstName} ${state?.lastName}`}
            </Typography>
            <Icon type="triangle" size="small" />
          </Grid>
        </div>
        <UpdateProfile
          values={state}
          handleChange={handleChange}
          handleSumbit={handleSumbit}
          openModal={openModal}
          onClose={handleModalClose}
        />
      </Grid>
    </div>
  );
};
StudentProfile.propTypes = {
  user: PropTypes.object.isRequired,
};
export default StudentProfile;
