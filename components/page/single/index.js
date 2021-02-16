/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Maps from '../../Maps';
import { userActions } from '../../../redux/_actions';
import { AdminContentWrapper } from '../../wrapper';
import { Icon, Btn } from '../../form';
import { addBookmarkApiMethod } from '../../../lib/api/customer';
import Carrousel from '../../Carrousel';
import LocationTable from '../table/location';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 'calc(100% - 14px)',
  },
  title: {
    color: '#4F80FF',
  },
  save: {
    color: theme.palette.button,
    fontSize: '1.8rem',
    marginBottom: 30,
    '& > div': {
      position: 'absolute',
      bottom: 0,
      cursor: 'pointer',
      width: 'fit-content',
      padding: '20px 23px',
      background: '#FFFFFF',
      border: '2px solid #4F80FF',
      boxSizing: 'border-box',
      borderRadius: '10px',
      transform: 'translateY(calc(50%))',
    },
    '& svg': {
      marginRight: 15,
    },
  },
  subTitle: {
    margin: '4px 0 22px',
    color: 'rgba(26, 46, 108, 0.75)',
  },
  setpsContainer: {
    paddingRight: 20,
    '& h3': {
      marginBottom: 8,
    },
    '& > div:first-of-type': {
      padding: '3.2rem',
      borderRadius: '2.5rem',
      color: 'white',
      background: 'white',
      boxShadow: '0px 4px 20px rgba(24, 55, 50, 0.04)',
      '& li': {
        marginBottom: 15,
      },
      '& span': {
        padding: '0 5px',
        marginRight: 10,
        borderRadius: '3px',
      },
    },
  },
  houseInfo: {
    marginTop: '1.8rem',
    '& > div > div span': {
      color: theme.palette.blue,
    },
    '& > div > div:first-of-type': {
      marginRight: 40,
    },
    '& svg': {
      marginRight: 8,
    },
  },
  searchContainer: {
    marginBottom: 22,
    '& > div:last-of-type svg': {
      position: 'absolute',
      right: 0,
      top: '50%',
      width: 40,
      height: 40,
      transform: 'translateY(-50%)',
    },
    '& > div:nth-child(2) > div > div > div': {
      backgroundColor: 'white',
      borderRadius: 0,
    },
    '& > div:first-of-type input': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: 'none',
    },
    '& > div:last-of-type input': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  description: {
    marginTop: '6rem',
    marginBottom: '4rem',
    '& h2, & h1 > div:last-of-type ': {
      color: theme.palette.blue,
    },
    '& h6': {
      marginBottom: 10,
      color: 'rgba(26, 46, 108, 0.5)',
    },
    '& > div:last-of-type h1 span': {
      fontSize: '1.6rem',
      color: 'rgba(26, 46, 108, 0.5)',
    },
    '& > div:last-of-type > div': {
      marginTop: 22,
    },
  },

  extras: {
    marginTop: '2rem',
    boxSizing: 'border-box',
    padding: 32,
    background: '#F4F5F7',
    borderRadius: '15px',
    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
    '& svg': {
      marginRight: '1rem',
    },
    '& h3': {
      color: theme.palette.blue,
      marginBottom: '.8rem',
    },
    '& > div:last-of-type > div h6 ': {
      color: '#526190',
    },
    '& > div:first-of-type': {
      marginBottom: 20,
    },
    '& > div:last-of-type h6': {
      maxWidth: 'calc(100% - 32px)',
    },
    '& > div:last-of-type svg': {
      marginRight: 8,
    },
  },

  extraInfo: {
    '& > div': {
      boxSizing: 'border-box',
      padding: 32,
      background: '#F4F5F7',
      borderRadius: '15px',
      boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
      '& svg': {
        marginRight: '1rem',
      },
    },
    '& h3': {
      color: theme.palette.blue,
      marginBottom: 32,
    },
    '& > div:last-of-type > div h6 ': {
      color: '#526190',
    },
    '& > div:first-of-type': {
      marginBottom: 20,
    },
    '& > div:last-of-type h6': {
      marginBottom: 9,
    },
    '& > div:last-of-type svg': {
      marginRight: 8,
    },
  },
  mapContainer: {
    marginTop: 24,
    '& > div': {
      minHeight: 400,
    },
    '& img': {
      display: 'block',
      width: '100%',
    },
  },
  discoveryContainer: {
    marginTop: '4rem',
    '& h2': {
      color: theme.palette.blue,
      marginBottom: '4rem',
    },

    '& > div > div:last-of-type > div:first-of-type': {
      borderBottom: '1px solid rgba(26, 46, 108, 0.5)',
    },
    '& > div > div': {
      width: '100%',
      '& > div:first-of-type': {
        borderTop: '1px solid rgba(26, 46, 108, 0.5)',
        padding: '2.5rem 0',
        '& > div:first-of-type': {
          display: 'none',
          padding: '0 2rem',
        },
        [theme.breakpoints.down('sm')]: {
          '& > div': {
            display: 'none',
          },
          '& > div:first-of-type': {
            display: 'flex',
          },
        },
      },
    },
  },
  phoneContainer: {
    display: 'inline-block',
    '& > p': {
      marginTop: '.8rem',
      textAlign: 'center',
      color: 'rgba(26, 46, 108, 0.5)',
    },
  },
  buttomBtnContainer: {
    margin: '5rem auto',
  },
}));
const PropertyPage = ({ id, user, update, property = {}, isLocation = false }) => {
  const [state, setState] = useState({});
  const [total, Total] = useState({});
  const [currOpen, setCurrOpen] = useState('');
  const [liked, setLiked] = useState(user?.bookmarks?.find((elem) => elem._id === id));
  const handleBookmark = () => {
    setLiked(!liked);
    addBookmarkApiMethod({ id }).then(({ user }) => update(user));
  };
  const handleCurrOpen = (e) => setCurrOpen(currOpen === e ? null : e);
  useEffect(() => {
    (async () => {
      const newState = {};
      property.lots.forEach((newElem) => {
        const pieces = newElem.pieces == 0 ? 1 : newElem.pieces;
        const elem = newState[pieces];
        if (Object.prototype.hasOwnProperty.call(newState, pieces)) {
          elem.list.push(newElem);
          if (!elem.minPrice || elem.minPrice > newElem.price) elem.minPrice = newElem.price;
          if (!elem.minSurface || elem.minSurface > newElem.surface)
            elem.minSurface = newElem.surface;
          if (!elem.maxSurface || elem.maxSurface < newElem.surface)
            elem.maxSurface = newElem.surface;
          newState[pieces] = elem;
        } else {
          newState[pieces] = {
            list: [newElem],
            minSurface: newElem.surface,
            maxSurface: newElem.surface,
            minPrice: newElem.price,
          };
        }
      });
      setState(newState);
      Total(property.lots.length);
    })();
  }, [property.lots]);
  const classes = useStyles();

  return (
    <AdminContentWrapper>
      <div>
        <div className="relative">
          {property.pictures && <Carrousel list={property.pictures} />}
          <Grid container className={classes.save} justify="center">
            <Grid item container onClick={handleBookmark}>
              <Icon
                type="heart"
                color={liked ? 'red' : 'white'}
                strokeColor={liked ? 'red' : '#4F80FF'}
              />
              {` Sauvegarder`}
            </Grid>
          </Grid>
        </div>
        <Grid container justify="space-between" className={classes.description}>
          <Grid item md={6}>
            <Typography variant="h1">{property.heading}</Typography>
            <Typography variant="subtitle1">
              {property.address}
              {` - ${property.postal} ${property.city}`}
            </Typography>
            {!isLocation && <Typography variant="h2">Programme immobilier neuf</Typography>}
            <div className={classes.houseInfo}>
              <Grid container>
                <div>
                  <Icon type="door" color="lightBlue" />

                  <span>{`de ${property.minPieces} à ${property.maxPieces}  pièces`}</span>
                </div>

                <div>
                  <Icon type="room" color="lightBlue" />
                  <span>{` de ${property.minSurface}m² à ${property.maxSurface}m²`}</span>
                </div>
              </Grid>
            </div>
          </Grid>
          <Grid item md={6} className="text-right">
            <Typography variant="h1">
              <span>à partir de</span>
              {` ${property.price}€`}
              <span>{isLocation ? 'CC/mois' : ''}</span>
            </Typography>
            {property.available_date && !isLocation ? (
              <Typography variant="body1">
                {`Disponible dès le ${property.available_date}`}
              </Typography>
            ) : (
              ''
            )}
            <div className={classes.phoneContainer}>
              <Btn
                text={isLocation ? 'Déposer mon dossier' : 'Être rappelé selon mes dispos'}
                alignRight
              />
              {isLocation ? (
                ''
              ) : (
                <Typography variant="body1">ou appeler le 06.65.07.11.66</Typography>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid container alignItems="flex-start">
          <Grid item md={8} className={classes.setpsContainer}>
            <div>
              <Typography variant="h3">À propos du logement !</Typography>
              <Typography variant="body1">
                <span dangerouslySetInnerHTML={{ __html: property.description }} />
              </Typography>
            </div>
            <div className={classes.extras}>
              <Typography variant="h3">Les petits plus :</Typography>
              <Grid container>
                {property.advantage?.map((elem) => (
                  <Grid container item key={elem} md={6} alignItems="center">
                    <Icon type="elevator" />
                    <Typography variant="subtitle1">{elem}</Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className={classes.mapContainer}>
              <Maps loc={property.loc?.coordinates} />
            </div>
          </Grid>
          <Grid item md={4} className={classes.extraInfo}>
            <div>
              <Typography variant="h3">Les transports à proximité :</Typography>
              <Grid container justify="space-around">
                {/* <img src={Station4Img} /> */}
                {/* <img src={Station3AImg} /> */}
              </Grid>
            </div>
          </Grid>
        </Grid>

        <Grid container className={classes.discoveryContainer}>
          <Typography variant="h2">
            {`Découvrez nos ${total} logements${isLocation ? '' : '  neufs disponibles'} :`}
          </Typography>
          <Grid container>
            <LocationTable
              state={state}
              property={property}
              currOpen={currOpen}
              handleCurrOpen={handleCurrOpen}
            />
          </Grid>
          <Grid className={classes.buttomBtnContainer}>
            <Btn
              text={isLocation ? 'Déposer mon dossier' : 'Être rappelé selon mes dispos'}
              alignRight
            />
          </Grid>
        </Grid>
      </div>
    </AdminContentWrapper>
  );
};

PropertyPage.propTypes = {
  property: PropTypes.object.isRequired,
};
const mapState = (state) => {
  const { loggingIn, user } = state.authentication;
  return { loggingIn, user };
};

const actionCreators = {
  update: userActions.updateUserDataOnly,
};
export default connect(mapState, actionCreators)(PropertyPage);
