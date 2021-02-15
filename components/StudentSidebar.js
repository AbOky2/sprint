import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { userActions } from '../redux/_actions';
import { Icon, Btn } from './form';
import Calendr from '../static/img/icons/calendr.png';
import LogoImg from '../static/img/logo.png';
import UpdateProfile from './UpdateProfile';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 60px)',
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
  mobileContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0px 4px 13px rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: '.5rem 3rem',
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
    [theme.breakpoints.down('md')]: {
      margin: 'auto',
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

const StudentProfile = ({ user = {}, logout, update }) => {
  const { asPath } = useRouter();
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
        <UpdateProfile user={user} logout={logout} update={update} />
      </Grid>
    </div>
  );
};
StudentProfile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};
const mapState = (state) => {
  const { loggingIn, user } = state?.authentication;
  return { loggingIn, user };
};
const actionCreators = {
  logout: userActions.logout,
  update: userActions.update,
};
export default connect(mapState, actionCreators)(StudentProfile);
