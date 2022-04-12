import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';
import { Button, Grid, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import withAuth from 'lib/withAuth';
import { AdminContentWrapper } from 'components/wrapper';
import { Btn, Icon } from 'components';
import {
  isYoungWorker,
  toArr,
  toggleArray,
  toQueryParams,
  ucfirst,
} from 'helpers';
import {
  addBookmarkApiMethod,
  getPartnersApiMethod,
  getUserLatestSearchApiMethod,
} from 'lib/api/customer';
import LocationImg from 'static/img/location.png';
import HouseImg from 'static/img/house.png';
import LogoImg from 'static/img/logo.png';
import { pageLink } from 'constants/index';
import { ListElement } from 'components/page/search/views/partials';
import { useEffect, useState } from 'react';
import { userActions } from 'redux/_actions';
// import signIn from 'next-auth/react';

const styles = (theme) => ({
  container: {
    padding: '2.4rem',
    margin: '1.6rem 0 3.2rem',
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
    '& > h1': {
      fontFamily: 'Space Grotesk',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '2.8rem',
      lineHeight: '2.8rem',
      textAlign: 'center',
      color: theme.palette.newDarkBlue,
      '& > span': {
        color: theme.palette.normalBlue,
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '3rem',
      textAlign: 'center',
      '& > div': {
        display: 'block',
        marginBottom: 15,
      },
      '& img': {
        height: 50,
        display: 'inline-block',
        width: 'auto',
      },
    },
  },
  welcomeSub: {
    fontFamily: 'Space Grotesk',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '1.6rem',
    lineHeight: '2rem',
    color: theme.palette.newLightBlue,
  },
  lastSearch: {
    position: 'relative',
    border: '2px solid #EFF4FF',
    boxSizing: 'border-box',
    borderRadius: '12px',
    marginTop: '8px',
    padding: '1.8rem',
    background: '#FFFFFF',
    '& h2': {
      marginBottom: '4px',
      color: theme.palette.normalBlue,
    },
    '& span': {
      position: 'absolute',
      top: '50%',
      right: '1.6rem',
      transform: 'translateY(-50%)',
    },
  },
  lastViewdContainer: {
    margin: '24px 0',
    '& h2': {
      marginBottom: '8px',
    },
  },
  advisorContainer: {
    '& h2': {
      marginBottom: '4px',
    },
  },
  advisorInfo: {
    flexGrow: '1',
    paddingLeft: '1.6rem',
    '& h2': {
      color: theme.palette.normalBlue,
    },
    '& p:last-of-type': {
      marginBottom: 0,
    },
  },
  advisorContact: {
    '& svg:first-of-type': {
      marginRight: '1.4rem',
    },
  },
  subTitle: {
    margin: '.4rem 0 2.2rem',
  },
  customH2: {
    fontFamily: theme.typography.secondFontFamily,
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
    margin: '.4rem 0 2rem',
  },
  partnerListContainer: {
    width: '33.33%',
    '& > a': {
      display: 'block',
      background: '#ffffff',
      ...theme.ui.bordered,
      border: `1px solid ${theme.palette.lightBlue}`,
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
    padding: '.8rem 1.4rem',
    borderRadius: '9px',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: '16px',
    color: '#BE8B07',
    background: 'rgba(248, 191, 44, 0.2)',
    margin: '1rem 0 1.6rem',
  },
  partnerCardTitle: {
    marginBottom: '.8rem',
    color: '#4F80FF',
  },
  partnerListTextContainer: {
    position: 'relative',
    width: '100%',
    '& > p': {
      width: 'calc(100% - 3rem)',
      margin: 0,
      ...theme.typography.body1,
      color: '#6976A0',
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

const AuthContext = ({
  classes,
  liked = [],
  userSearch = {},
  handleBookmark,
}) => (
  <div className={classes.authContext}>
    <Typography variant="h2">Vos recherches récentes</Typography>
    {userSearch.lastSearch
      ?.slice(0, 3)
      .map(({ loc, maxPrice, page, pieces, sort, ...search }, index) => (
        <Link
          key={index}
          href={`/dashboard/search/${
            search.typeOfAnnonce === 'Location' ? 'location' : 'buy'
          }/?${toQueryParams({
            loc,
          })}`}
        >
          <a>
            <div className={classes.lastSearch}>
              <Typography variant="h2">{loc}</Typography>
              <Typography>
                {`${
                  pieces ? toArr(pieces).join(', ') : 'Toute type de'
                } pièces | ${
                  maxPrice && maxPrice > 0 ? `${maxPrice}€` : 'Prix indéfini'
                }`}
              </Typography>
              <span classes={classes.iconContainer}>
                <Icon type="sliderArrow" size="small" />
              </span>
            </div>
          </a>
        </Link>
      ))}
    <div className={classes.lastViewdContainer}>
      <Typography variant="h2">Vos récentes consultations</Typography>
      {userSearch.lastViewed?.slice(0, 3).map((elem, index) => (
        <ListElement
          key={index}
          liked={liked}
          {...elem}
          handleBookmark={handleBookmark}
        />
      ))}
    </div>
    <div className={classes.advisorContainer}>
      <Typography variant="h2">Votre conseiller</Typography>
      <Grid container alignItems="center">
        <Grid item>
          <img src="static/img/advisor.png" alt="" />
        </Grid>
        <Grid item className={classes.advisorInfo}>
          <Grid container justify="space-between">
            <Grid item>
              <Grid container justify="space-between">
                <div>
                  <Typography variant="h2">Raphael Altman</Typography>
                  <Typography>raltman@nexity.fr</Typography>
                  <Typography>06 99 77 65 16</Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container className={classes.advisorContact}>
                <Icon type="phone" />
                <Icon type="mail" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  </div>
);

const Dashboard = ({ classes, user = {}, userSearch, update }) => {
  const [liked, setLiked] = useState(
    user?.bookmarks?.map((elem) => elem._id) || []
  );
  const isAuth = true;
  const handleBookmark = (id) => {
    setLiked(toggleArray(liked, id));
    addBookmarkApiMethod({ id }).then(({ user: currUser }) => update(currUser));
  };

  return (
    <AdminContentWrapper noRedirect>
      <div className={classes.heading}>
        <div>
          <img src="static/img/kitlenid_bynexity.png" alt="" />
        </div>
        <Typography variant="h1">
          {isAuth
            ? 'Ravis de vous revoir '
            : 'Devenir propriétaire devient plus '}
          <span>
            {isAuth ? (
              <>
                <br />
                {`${ucfirst(user?.firstName)}  !`}
              </>
            ) : (
              'accessible.'
            )}
          </span>
          <p className={classes.welcomeSub}>
            {!isAuth &&
              'Réalisez votre premier achat immobilier pour seulement 700€ par mois !*'}
          </p>
        </Typography>
      </div>
      <AuthContext
        classes={classes}
        liked={liked}
        userSearch={userSearch}
        handleBookmark={handleBookmark}
      />
    </AdminContentWrapper>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

Dashboard.getInitialProps = async ({ req, res }) => {
  // if (req && !req.user) {
  //   res.redirect(pageLink.home);
  //   return { partners: [] };
  // }

  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }

  const { list } = await getPartnersApiMethod({ headers });
  console.log(list, 'list');
  let userSearch = {};
  if (req && req.user) {
    userSearch = await getUserLatestSearchApiMethod({
      headers,
    }).userSearch;
  }
  console.log(userSearch, 'userSearch');
  return { partners: list, userSearch };
};
const mapState = (state) => {
  const { user } = state?.authentication;
  return { user };
};
const actionCreators = {
  update: userActions.updateUserDataOnly,
};
export default withAuth(
  withStyles(styles)(connect(mapState, actionCreators)(Dashboard))
);
