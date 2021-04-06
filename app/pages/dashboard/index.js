import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';
import { Grid, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import withAuth from '../../lib/withAuth';
import { AdminContentWrapper } from '../../components/wrapper';
import { Icon } from '../../components/form';
import { isBuyer } from '../../helpers/user';
import { ucfirst } from '../../helpers/convertAndCheck';
import { getPartnersApiMethod } from '../../lib/api/customer';
import LocationImg from '../../static/img/location.png';
import HouseImg from '../../static/img/house.png';
import LogoImg from '../../static/img/logo.png';

const styles = (theme) => ({
  container: {
    padding: '2.8rem',
    marginTop: '3rem',
    marginBottom: '6rem',
    backgroundColor: 'white',
    boxShadow: '0px 4px 20px rgb(24 55 50 / 4%)',
    borderRadius: '25px',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      padding: '2.5rem ',
    },
  },
  presentationContainer: {
    '& > div:first-of-type': {
      paddingRight: '1.5rem',
    },
    '& > div:last-of-type': {
      paddingLeft: '1.5rem',
    },
    '& > div:first-of-type > div': {
      height: '100%',
    },
    '& > div:first-of-type > div > a': {
      height: '100%',
      background: 'linear-gradient(99.78deg, #CC95DF -24.64%, #4F80FF 62.6%)',
      boxShadow:
        '0px 6px 15px rgba(79, 128, 255, 0.3), inset 0px -3px 10px rgba(12, 37, 100, 0.3)',
    },
    '& > div:last-of-type > div': {
      height: '100%',
      boxShadow:
        '0px 4px 13px rgba(0, 0, 0, 0.1), inset 0px -3px 10px rgba(149, 149, 149, 0.2)',
    },
    '& > div > div > a > img': {
      width: 77,
    },
    '& > div > div > a > svg': {
      width: 'auto!important',
      height: 'auto!important',
    },
    '& > div > div > a': {
      ...theme.ui.bordered,
      display: 'block',
      position: 'relative',
      height: '100%',
      padding: 32,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    '& > div > div div svg': {
      position: 'absolute',
      bottom: 16,
      right: 16,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div:first-of-type': {
        marginBottom: '2rem',
      },
      '& > div:first-of-type, & > div:last-of-type': {
        padding: 0,
        width: '100%',
      },
    },
  },
  heading: {
    '& > div': {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      '& > div': {
        display: 'block',
        marginBottom: 15,
      },
      '& img': {
        height: 50,
      },
    },
  },
  welcomeSub: {
    display: 'block',
    fontWeight: 'normal',
  },
  subTitle: {
    margin: '1.2rem 0 2.5rem',
  },
  customH2: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
  presentationCardTitle: {
    color: theme.palette.newBlue,
    margin: '1.6rem 0 .5rem',
  },
  buyText: {
    color: '#526190',
  },
  partnerDescription: {
    margin: '.5rem 0 2rem',
  },
  partnerListContainer: {
    width: '33.33%',
    '& > a': {
      display: 'block',
      background: '#ffffff',
      boxShadow: '0px 0px 2px rgb(0 0 0 / 25%)',
      ...theme.ui.bordered,
      padding: '2rem',
      marginBottom: '2rem',
    },
    ...theme.ui.listContainer,
  },
  whiteColor: {
    color: 'white',
  },
  partnerListImgContainer: {
    height: 70,
    marginTop: '3rem',
    textAlign: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  partnerCardType: {
    display: 'inline-block',
    padding: '8px 14px',
    borderRadius: '9px',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: '16px',
    color: '#BE8B07',
    background: 'rgba(248, 191, 44, 0.2)',
    margin: '10px 0 8px',
  },
  partnerCardTitle: {
    marginBottom: '4px',
    color: '#4F80FF',
  },
  partnerListTextContainer: {
    position: 'relative',
    width: '100%',
    '& > p': {
      width: 'calc(100% - 3rem)',
      margin: 0,
      ...theme.typography.body1,
      color: '#5379EF',
      height: '6.5rem',
      overflow: 'hidden',
    },
    '& p': {
      margin: 0,
    },
    '& > svg': {
      position: 'absolute',
      bottom: '0',
      right: '0',
      transform: 'translateY(.5rem)',
    },
  },
});

const Dashboard = ({ user = {}, partners, classes }) => (
  <AdminContentWrapper noRedirect>
    <div className={classes.heading}>
      <div>
        <img src={LogoImg} alt="" />
      </div>
      <Typography variant="h1">
        {`Bonjour ${ucfirst(user?.firstName)} `}
        <span role="img" aria-label="">
          🎉
        </span>
        <span className={classes.welcomeSub}>
          Bienvenue sur votre espace personnel Kit le Nid.
        </span>
      </Typography>
    </div>
    <div className={classes.container}>
      <Typography variant="h2" className={classes.customH2}>
        Premiers pas dans votre logement
      </Typography>
      <Typography variant="subtitle1" className={classes.subTitle}>
        Kit le nid vous accompagne pour votre premier achat, votre location,
        <br />
        et vous aide à avoir un bon garant.
      </Typography>
      <Grid
        container
        justify="space-between"
        className={classes.presentationContainer}
      >
        <Grid item md={12} md={6}>
          <div>
            <Link href="/dashboard/search/buy">
              <a>
                <img src={HouseImg} alt="" />

                <Typography
                  variant="h4"
                  className={clsx(
                    classes.whiteColor,
                    classes.presentationCardTitle
                  )}
                >
                  Mon premier achat
                </Typography>
                <Grid container justify="space-between" alignItems="flex-end">
                  <Typography className={classes.whiteColor}>
                    {isBuyer(user)
                      ? 'Un parcours simplifié 100% digital.'
                      : 'Vous ne révez pas ! Réservez votre logement dès votre dernière année d’étude.'}
                  </Typography>
                  <Icon type="arrow" color="white" />
                </Grid>
              </a>
            </Link>
          </div>
        </Grid>
        <Grid item md={12} md={6}>
          <div>
            <Link href="/dashboard/search/location">
              <a>
                <img src={LocationImg} alt="" />
                <Typography
                  variant="h4"
                  className={classes.presentationCardTitle}
                >
                  Location
                </Typography>
                <Grid container justify="space-between" alignItems="flex-end">
                  <Typography className={classes.buyText}>
                    Des logements étudiants dans toute la France.
                  </Typography>
                  <Icon type="arrow" color="iconBlue" />
                </Grid>
              </a>
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
    <Typography variant="h2" className={classes.customH2}>
      Les services Kit le nid
    </Typography>
    <Typography variant="subtitle1" className={classes.partnerDescription}>
      Kit le nid vous propose un ensemble de services complémentaires négociés
      <br />
      avec nos patenaires pour mieux vous accompagner pendant vos études.
    </Typography>
    <Grid container>
      {partners?.map((elem) => (
        <Grid key={elem._id} item className={classes.partnerListContainer}>
          <Link href={`/dashboard/partners/${elem._id}`}>
            <a>
              <div
                className={classes.partnerListImgContainer}
                style={{ backgroundImage: `url(${elem.picture})` }}
              />
              <Typography variant="h5" className={classes.partnerCardType}>
                {elem.type}
              </Typography>
              <Typography variant="h4" className={classes.partnerCardTitle}>
                {elem.name}
              </Typography>
              <Grid container justify="space-between" alignItems="flex-end">
                <div className={classes.partnerListTextContainer}>
                  <ReactMarkdown>{elem.description}</ReactMarkdown>
                  <Icon type="arrow" color="iconBlue" />
                </div>
              </Grid>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  </AdminContentWrapper>
);
Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
};

Dashboard.getInitialProps = async ({ req, res }) => {
  if (req && !req.user) {
    res.redirect('/login');
    return { partners: [] };
  }

  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }

  const { list } = await getPartnersApiMethod({ headers });
  return { partners: list };
};
const mapState = (state) => {
  const { user } = state?.authentication;
  return { user };
};
export default withAuth(withStyles(styles)(connect(mapState)(Dashboard)));
