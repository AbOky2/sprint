import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { Grid, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { openPopupWidget } from 'react-calendly';
import { pages } from 'helpers/query';
import { Icon, Btn } from './form';
import LogoImg from '../static/img/logo.png';
import UpdateProfile from './UpdateProfile';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '4rem 3.5rem 2.4rem',
    '& > div': {
      width: 'auto',
    },
  },
  logoContainer: {
    textAlign: 'center',
    '& img': {
      width: 35,
    },
  },
  navContainer: {
    width: 'auto',
    marginLeft: '6rem',
    '& > div .active-nav-link': {
      backgroundColor: 'rgba(79, 128, 255, 0.19)',
      border: '1px solid #c1cde7',
    },
    '& > div a': {
      display: 'flex',
      marginBottom: '9px',
      padding: '.8rem 1.6rem',
      width: '100%',
      alignItems: 'center',
      textAlign: 'left',
      cursor: 'pointer',
    },
    '& > div span': {
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
  mobileContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0px 4px 13px rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: '.5rem 1rem',
    boxSizing: 'border-box',
    zIndex: 10,
    '& > div a': {
      display: 'inline-block',
      width: 'fit-content',
      marginBottom: 0,
      textAlign: 'center',
      padding: '1rem .3rem',
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
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
  },
  calendar: {
    '& img': {
      width: 20,
    },
  },
  drawer: {
    padding: '2.7rem',
  },
  rightMenu: {
    '& > div:first-of-type': {
      marginRight: '2rem',
      '& > div': {
        padding: '1.5rem 2.4rem',
        width: '100%',
      },
      '& svg': {
        marginRight: '1.5rem',
      },
      '& span': {
        fontSize: 14,
        padding: 0,
      },
    },
  },
  rightMenuMobile: {
    '& > div:first-of-type': {
      margin: '3rem 0 1.5rem',
    },
  },
  activeLink: {
    position: 'relative',
    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      width: 'calc(100% - 2rem)',
      left: 'calc(1rem)',
      borderBottom: `1px solid ${theme.palette.newBlue}`,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'initial',
    },
    '& svg path': {
      fill: '#4f80ff!important',
    },
    '& span': {
      color: `${theme.palette.newBlue}!important`,
    },
  },
  mobileActiveMobile: {
    '&::after': {
      display: 'none',
    },
  },
}));

const MenuItems = [
  { href: '/dashboard', iconType: 'home', txt: 'Accueil' },
  { href: '/dashboard/search/buy', iconType: 'heart', txt: 'Acheter' },
  { href: '/dashboard/search/location', iconType: 'heart', txt: 'Louer' },
  { href: '/dashboard/bookmark', iconType: 'heart', txt: 'Favoris' },
  {
    href: '/dashboard/sponsorship',
    iconType: 'sponsorship',
    txt: 'Parrainage',
  },
];
const MobileMenuItems = [
  { href: '/dashboard', iconType: 'home', txt: 'Accueil' },
  { href: '/dashboard/bookmark', iconType: 'heart', txt: 'Favoris' },
  {
    href: '/dashboard/sponsorship',
    iconType: 'sponsorship',
    txt: 'Parrainage',
  },
];
export const MobileMenu = ({ user = {}, logout, update }) => {
  const [showMenu, setShowMenu] = useState(false);
  const classes = useStyles();
  const { asPath } = useRouter();

  const toggleMenu = () => setShowMenu(!showMenu);
  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={clsx(classes.navContainer, classes.mobileContainer)}
    >
      {MobileMenuItems?.map(({ href, txt, iconType }) => (
        <Grid key={href} item>
          <Link href={href}>
            <a
              className={
                asPath === href
                  ? clsx(classes.activeLink, classes.mobileActiveMobile)
                  : null
              }
            >
              <Icon type={iconType} />
              <p>{txt}</p>
            </a>
          </Link>
        </Grid>
      ))}
      <Grid item onClick={toggleMenu} className={classes.calendar}>
        <Icon type="burgerMenu" />
      </Grid>
      <Drawer anchor="right" open={showMenu} onClose={toggleMenu}>
        <div className={classes.drawer}>
          <Grid className={classes.logoContainer}>
            <Link href={pages.dashboard}>
              <a onClick={toggleMenu}>
                <img src={LogoImg} alt="" />
              </a>
            </Link>
          </Grid>
          <Grid
            container
            item
            className={clsx(classes.rightMenu, classes.rightMenuMobile)}
            alignItems="center"
          >
            <div>
              <Btn
                text="Prendre rendez-vous"
                iconType="calendar"
                onClick={() =>
                  openPopupWidget({ url: 'https://calendly.com/kitlenid' })
                }
              />
            </div>
          </Grid>
          <UpdateProfile
            user={user}
            logout={logout}
            update={update}
            transparent
          />
        </div>
      </Drawer>
    </Grid>
  );
};

const StudentProfile = ({ user = {}, logout, update }) => {
  const { asPath } = useRouter();
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.container}
    >
      <Grid container item>
        <Grid className={classes.logoContainer}>
          <Link href={pages.dashboard}>
            <a>
              <img src={LogoImg} alt="" />
            </a>
          </Link>
        </Grid>
        <Grid container alignItems="center" className={classes.navContainer}>
          {MenuItems?.map(({ href, txt }) => (
            <Grid key={href} item alignItems="center">
              <Link href={href}>
                <a className={asPath === href ? classes.activeLink : null}>
                  <span>{txt}</span>
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container item className={classes.rightMenu} alignItems="center">
        <div>
          <Btn
            text="Prendre rendez-vous"
            iconType="calendar"
            onClick={() =>
              openPopupWidget({ url: 'https://calendly.com/kitlenid' })
            }
          />
        </div>
        <UpdateProfile
          user={user}
          logout={logout}
          update={update}
          transparent
        />
      </Grid>
    </Grid>
  );
};
StudentProfile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default StudentProfile;
