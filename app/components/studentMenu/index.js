import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { Grid, Drawer } from '@material-ui/core';
import { openPopupWidget } from 'react-calendly';
import { isFn, pages } from 'helpers';
import LogoImg from 'static/img/logo.png';
import { UpdateProfile } from 'components';
import { Icon, Btn, Modal } from '../form';
import useStyles from './styles';
import { Authentification } from 'components/authentification';
import {Partenaires} from 'components/Partenaires/index';

const MobileItems = [
  {
    href: '/dashboard',
    iconProps: { type: 'home' },
    txt: 'Accueil',
  },
  {
    href: '/dashboard/search/buy',
    singleType: '/dashboard/property/buy',
    iconProps: { type: 'search', style: { padding: 1 } },
    txt: 'Recherche',
  },
  // {
  //   href: '/dashboard/bookmark',
  //   iconProps: { type: 'heart' },
  //   txt: 'Favoris',
  // },
  // {
  //   href: '/dashboard/search/location',
  //   singleType: '/dashboard/property/location',
  //   iconProps: { type: 'profile' },
  //   txt: 'Mon profil',
  // },
];
const sponsorship = {
  href: '/dashboard/sponsorship',
  iconProps: { type: 'mobileSponsorship' },
  txt: 'Parrainage',
};

const partenaires = {
  //href: '/dashboard/demo2',
  iconProps: { type: 'mobileSponsorship' },
  txt: 'Partenaires',
};


const MenuItems = [...MobileItems, sponsorship];

export const MobileMenu = ({ user = {}, logout, update }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const classes = useStyles();
  const { asPath } = useRouter();
  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleModal = () => setShowModal(!showModal);
  const toggleModal1 = () => setShowModal1(!showModal);

  const handleSumbit = () => console.log('submit');

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={clsx(classes.navContainer, classes.mobileContainer)}
    >
      {MobileItems?.map((props) => {
        let { href, txt, singleType, iconProps } = props;
        if (!user._id) {
          if (href === '/dashboard/bookmark') return null;
          txt = 'Recherche';
        }

        return (
          <Grid key={href} item>
            <Link href={href}>
              <a>
                <Grid container alignItems="center" direction="column">
                  <Icon {...iconProps} />
                  <p>{txt}</p>
                </Grid>
              </a>
            </Link>
          </Grid>
        );
      })}
      <Grid item onClick={toggleModal} justifyContent="center">
        <Grid container alignItems="center" direction="column">
          <Icon type="profile" />
          <p>Connexion</p>
        </Grid>
      </Grid>
      <Grid item onClick={toggleMenu} className={classes.calendar}>
        <Icon type="menu" />
        <p>Menu</p>
      </Grid>
      <Drawer anchor="right" open={showMenu} onClose={toggleMenu}>
        <div className={classes.drawer}>
          <div className={clsx(classes.rightMenu, classes.rightMenuMobile)}>
            <div>
              <Link href={sponsorship.href}>
                <a
                  className={
                    asPath === sponsorship.href ||
                    asPath.includes(sponsorship.href)
                      ? classes.mobileDrawerActiveMobile
                      : null
                  }
                >
                  <span>{sponsorship.txt}</span>
                </a>
              </Link>
            <br/>
              <div>
                <a
                onClick={toggleModal1}
                  className={
                    asPath === partenaires.href ||
                    asPath.includes(partenaires.href)
                      ? classes.mobileDrawerActiveMobile
                      : null
                  }
                >
                  <span>{partenaires.txt}</span>
                </a>
              </div>
            </div>
            <UpdateProfile
              text="Mon compte"
              user={user}
              logout={logout}
              update={update}
              transparent
            />
            {/* <div>
              <Btn
                text="Prendre rendez-vous"
                iconType="calendar"
                onClick={() =>
                  openPopupWidget({ url: 'https://calendly.com/kitlenid' })
                }
              />
            </div> */}
          </div>
        </div>
      </Drawer>
      {console.log(changeName)}
      <Modal
        openModal={showModal}
        onClose={toggleModal}
        onClick={handleSumbit}
        showActions={false}
        title={
          changeName ? 'Finalise ton inscription' : 'Connexion ou inscription'
        }
        // confirmText="Enregistrer"
      >
        <Authentification setChangeName={setChangeName} />
      </Modal>


      <Modal
        openModal={showModal1}
        onClose={toggleModal1}
        onClick={handleSumbit}
        showActions={false}
        title='Partenaires'
   
        // confirmText="Enregistrer"
      >
        <Partenaires />
      </Modal>
    </Grid>
  );
};

const StudentProfile = ({ user = {}, logout, update, noHeaderMargin }) => {
  const { asPath } = useRouter();
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={clsx(
        classes.container,
        noHeaderMargin ? classes.noHeaderMargin : ''
      )}
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
            <Grid key={href} item>
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
