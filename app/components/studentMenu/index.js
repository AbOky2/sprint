import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { Grid, Drawer } from '@material-ui/core';
import { openPopupWidget } from 'react-calendly';
import { pages } from 'helpers/query';
import { Icon, Btn } from '../form';
import LogoImg from 'static/img/logo.png';
import UpdateProfile from '../UpdateProfile';
import useStyles from './styles';

const MenuItems = [
  {
    href: '/dashboard',
    iconProps: { type: 'home' },
    txt: 'Accueil',
  },
  {
    href: '/dashboard/search/buy',
    singleType: '/dashboard/property/buy',
    iconProps: { type: 'home' },
    txt: 'Acheter',
  },
  {
    href: '/dashboard/search/location',
    singleType: '/dashboard/property/location',
    iconProps: { type: 'home' },
    txt: 'Louer',
  },
  {
    href: '/dashboard/bookmark',
    iconProps: { type: 'heart', strokeColor: 'primary' },
    txt: 'Favoris',
  },
  {
    href: '/dashboard/sponsorship',
    iconProps: { type: 'sponsorship' },
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
      {MenuItems?.map(({ href, txt, singleType, iconProps }) => (
        <Grid key={href} item>
          <Link href={href}>
            <a
              className={
                asPath === href ||
                (href.includes('search') && asPath.includes(href)) ||
                (singleType && asPath.includes(singleType))
                  ? clsx(classes.activeLink, classes.mobileActiveMobile)
                  : null
              }
            >
              <Icon {...iconProps} />
              <p>{txt}</p>
            </a>
          </Link>
        </Grid>
      ))}
      <Grid item onClick={toggleMenu} className={classes.calendar}>
        <Icon type="burgerMenu" />
        <p>Menu</p>
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
          {MenuItems?.map(({ href, txt, singleType }) => (
            <Grid key={href} item alignItems="center">
              <Link href={href}>
                <a
                  className={
                    asPath === href ||
                    (href.includes('search') && asPath.includes(href)) ||
                    (singleType && asPath.includes(singleType))
                      ? classes.activeLink
                      : null
                  }
                >
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
            iconType="calendr"
            whiteColor
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
