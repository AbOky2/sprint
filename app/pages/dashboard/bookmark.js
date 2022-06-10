import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { userActions } from 'redux/_actions';
import { AdminContentWrapper } from 'components/wrapper';
import { addBookmarkApiMethod } from 'lib/api/customer';
import { Card, Btn, btnHover } from 'components';
import { getAddress, getNbPieces, getCardImg, singlePath } from 'helpers';
import withAuth from 'lib/withAuth';
import Demo from './demo'
import Demo2 from './demo2'
import Demo3 from './demo3'
import Partager from './partageButtom'
import Profile from '../../components/UpdateProfile'
import clsx from 'clsx';
import { Input, Select, Modal, Icon } from '../../components/form';
import { userRoleSelect } from 'helpers';



const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: '3.2rem',
    color: theme.palette.blue,
  },
  notFound: {
    '& > div:first-of-type': {
      marginBottom: '40px',
      padding: '3.2rem',
      borderRadius: '2.5rem',
      color: 'white',
      background: 'white',
      boxShadow: '0px 4px 20px rgba(24, 55, 50, 0.04)',
    },
    '& > div:first-of-type h3': {
      marginBottom: '1.7rem',
      color: theme.palette.blue,
      fontWeight: 800,
      '& span': {
        marginRight: 5,
      },
    },
  },
  card: {
    width: 'calc(100% - 14px)',
  },
  btnContainer: {
    textAlign: 'center',
    '& > div': {
      display: 'inline-block',
      background: '#4f80ff',
      borderRadius: '10px',
      marginBottom: '1rem',
      '&:first-of-type': {
        marginRight: 12,
      },
      '&:last-of-type': {
        marginLeft: 12,
        background: 'white',
        border: `1px solid ${theme.palette.newBlue}`,
        ...btnHover.white,
        '& a': {
          color: '#4f80ff',
        },
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: '2rem',
        padding: '1.8rem 1rem',
        width: '100%',
        '&:first-of-type': {
          marginRight: 0,
          '& a': {
            padding: 0,
          },
        },
        '&:last-of-type': {
          marginLeft: 0,
          marginBottom: 0,
          padding: 0,
        },
        '& a': {
          justifyContent: 'center',
        },
      },
    },
    '& a': {
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '28px',
      display: 'flex',
      alignItems: 'center',
      color: '#ffffff',
    },
  },
  listContainer: {
    '& > a > div': {
      border: `1px solid ${theme.palette.hoverGray}`,
    },
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
  const handleLogOut = () => logout(() => (window.location = '/login'));

  const handleSumbit = () => update(state, () => handleModalClose(true));
  const onKeyPress = (e) => e.key === 'Enter' && handleSumbit(true);

  const classes = useStyles();

  return (
    <div className=''>
      <div className="relative">
        <div
          className={
            !showSubMenu
              ? classes.contextMenu
              : clsx(classes.contextMenu, classes.openMenu)
          }
        >
         
        </div>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className=''
          onClick={toggleShowSubMenu}
        >
          {/* <Icon type="user" /> */}
          <div className="w-[287px] h-[30px] mb-[39px]">
            <p className="w-[287px] h-[30px] absolute left-4 top-8 text-[28px] font-bold text-left text-_aPropos">
              Mon profil
            </p>
          </div>

          <div className='flex justify-center gap-9 mx-4 mt-7 mb-5 sm:gap-14'>
                    <div>
                      <p className=" text-xl font-extrabold text-left text-[#272832]">Mes informations</p>
                      </div>
                      <div
                        className="flex justify-between items-center relative px-[47px] py-2 rounded-xl border-2 border-[#eff4ff]"
                        style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}
                      >
                        <button type="submit" className=" cursor-pointer flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">Enregistrer</button>
                      </div>
        </div>
        </Grid>
      </div>
      <div
      
        onClick={handleSumbit}
        title="Mon Profil"
        confirmText="Enregistrer"
      >
        <Grid container item justify="center" className="form-container">
          <Grid container item>
            <div
              style={{
                background:
                  'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)',
                width: '86px',
                height: '86px',
                borderRadius: '50%',
                padding: '22px',
                marginBottom: '19px',
                
              }}
            >
              <Icon type="leK" size="large" noColor />
            </div>
            <Input
              value={state.lastName}
              onChange={handleChange}
              onKeyPress={onKeyPress}
              name="lastName"
              position="left"
              placeholder='Nom'
            />
            <Input
              value={state.firstName}
              onChange={handleChange}
              onKeyPress={onKeyPress}
              name="firstName"
              position="right"
              placeholder="Prenom"
            />
            <Input
              value={state.email}
              onChange={handleChange}
              onKeyPress={onKeyPress}
              name="email"
              type="email"
              position="left"
              placeholder='Email'
            />
            <Input
              value={state.phone}
              onChange={handleChange}
              onKeyPress={onKeyPress}
              name="phone"
              type="phone"
              position="right"
              placeholder='Telephone'
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
          <div onClick={handleLogOut}
            className="mt-5 bg-red-700 cursor-pointer text-white flex justify-between items-center relative px-[47px] py-2 rounded-xl border-2 border-[#eff4ff]"
          >
            Déconnexion
          </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};








    /*
    <AdminContentWrapper noRedirect mobilePadding>
      <div>
        <Typography variant="h1" className={classes.title}>
          Vos favoris
        </Typography>
        {state?.length ? (
          <Grid container spacing={3}>
            {state.map(
              ({
                _id,
                heading,
                pictures,
                city,
                postal,
                typeOfAnnonce,
                minPieces,
                maxPieces,
                dimensions,
                price,
              }) => (
                <Grid
                  item
                  key={_id}
                  xs={12}
                  sm={4}
                  md={3}
                  className={classes.listContainer}
                >
                  <Link href={singlePath({ typeOfAnnonce, _id })}>
                    <a>
                      <Card
                        _id={_id}
                        title={heading}
                        src={getCardImg(pictures?.[0])}
                        address={getAddress({ city, postal })}
                        description={getNbPieces(minPieces, maxPieces)}
                        dimensions={dimensions}
                        price={price}
                        liked
                        onClick={handleBookmark}
                      />
                    </a>
                  </Link>
                </Grid>
              )
            )}
          </Grid>
        ) : (
          <div className={classes.notFound}>
            <div>
              <Typography variant="h3">
                <span role="img" aria-label="cring">
                  😢
                </span>
                Vous n’avez pas encore de logements sauvegardés en favoris
              </Typography>
              <Typography variant="body1">
                Pour ajouter un logement dans vos favoris, il vous suffit de
                cliquer sur la coeur en haut à gauche quand vous effectuez une
                recherche de logements. Ou bien, vous pouvez cliquer sur le
                boutton “sauvegarder” quand vous êtes sur la page d’un logement.
              </Typography>
            </div>

              <Demo>
              <Demo2/>
              </Demo>
            <div>
              <Grid container justify="center" className={classes.btnContainer}>
                <Btn
                  href="/dashboard/search/buy"
                  text="Rechercher un logement à acheter"
                />
                <Btn
                  href="/dashboard/search/location"
                  text="Rechercher un logement à louer"
                  whiteColor
                />
              </Grid>
            </div>
          </div>
        )}
      </div>
    </AdminContentWrapper>
    */
  

UpdateProfile.propTypes = {
  user: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  logout:PropTypes.func.isRequired,
};
const mapState = (state) => {
  const { loggingIn, user } = state.authentication;
  return { loggingIn, user };
};

const actionCreators = {
  update: userActions.updateUserDataOnly,
  logout: userActions.logout,

};
export default withAuth(connect(mapState, actionCreators)(UpdateProfile));
