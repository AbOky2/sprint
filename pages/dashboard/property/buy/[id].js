import React, { useState, useEffect } from 'react';
// import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AdminContentWrapper } from '../../../../components/wrapper';
import { Icon, Btn } from '../../../../components/form';
import {
  getPropertyApiMethod,
  getPropertiesApiMethod,
  getNewPropertiesApiMethod,
  addBookmarkApiMethod,
} from '../../../../lib/api/customer';
import Carrousel from '../../../../components/Carrousel';
import withAuth from '../../../../lib/withAuth';


const orientationObj = {
  'south_orientation': 'Sud',
  'east_orientation': 'Est',
  'west_orientation': 'Ouest',
  'north_orientation': 'Nord',
}
const extraObj = {
  'terrace': 'Terrace',
  'balcony': 'Balcon',
  'intercom': 'Intercom',
  'guardian': 'guardien',
}

const getExactData = (elem, obj)=> {
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i+=1)
  if (elem[keys[i]] === 'OUI')
    return obj[keys[i]]
}
const getOrientation = (elem) => getExactData(elem, orientationObj)
const getExtra = (elem) => getExactData(elem, extraObj)
const useStyles = makeStyles((theme) => ({
  card: {
    width: 'calc(100% - 14px)',
  },
  title: {
    color: '#4F80FF',
  },
  save: {
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
        color: 'white',
        marginRight: 10,
        background: '#4F80FF',
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
    marginBottom: '1.8rem',
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
  extraInfo: {
    '& > div': {
      boxSizing: 'border-box',
      padding: 32,
      background: '#F4F5F7',
      borderRadius: '15px',
      boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
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
  discoveryContentHeader: {
    padding: '2.5rem 0',
    fontFamily: 'Nunito',
    borderTop: '1px solid rgba(26, 46, 108, 0.5)',
    color: theme.palette.button,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.6rem',
    lineHeight: '2.2rem',

    [theme.breakpoints.down('sm')]: {
      paddingBottom: '2.5rem',
      display: 'none',
      '& > div': {
        display: 'none',
      },
    },
  },
  discoveryContent: {
    marginBottom: '2.4rem',
    '& > div:first-of-type': {
      display: 'none',
    },
    '& > div:last-child > div': {
      padding: '.8rem',
      fontSize: '1rem',
      color: theme.palette.button,
      border: `1px solid ${theme.palette.button}`,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div': {
        display: 'none',
      },
      '& > div:first-of-type': {
        display: 'flex',
        paddingTop: '2.5rem',
        borderTop: '1px solid rgba(26, 46, 108, 0.5)',
        '& > div:first-of-type': {
          padding: '0 2rem',
        },
        '& > div:last-of-type': {
          marginTop: '1.6rem',
          width: '100%',
          '& > div': {
            width: '100%',
            color: theme.palette.button,
            border: `1px solid ${theme.palette.button}`,
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
    margin: '5rem auto'
  }
}));
const bonusList = [
  { key: 'digicode', value: 'Digicode' },
  { key: 'elevator', value: 'Ascenseur' },
  { key: 'intercom', value: 'Intercom' },
];

const PropertyPage = ({ id, user, property = {}, properties = [] }) => {
  const [state, setState] = useState({});
  const [total, Total] = useState({});
  const [currOpen, setCurrOpen] = useState('1');
  const [liked, setLiked] = useState(user?.bookmarks?.find((elem) => elem._id));
  const handleBookmark = () => {
    setLiked(!liked);
    addBookmarkApiMethod({ id });
  };
  const handleCurrOpen = (e) => setCurrOpen(currOpen === e ? null : e);
  useEffect(() => {
    (async () => {
      const { list = [] } = await getNewPropertiesApiMethod();
      const newState = { };

      list.forEach((newElem) => {
        const elem = newState[newElem.nb_pieces];
        if (Object.prototype.hasOwnProperty.call(newState, newElem.nb_pieces)) {
          elem.list.push(newElem);
          if (!elem.minPrice || elem.minPrice > newElem.price) elem.minPrice = newElem.price;
          if (!elem.minSurface || elem.minSurface > newElem.surface)
            elem.minSurface = newElem.surface;
          if (!elem.maxSurface || elem.maxSurface < newElem.surface)
            elem.maxSurface = newElem.surface;
          newState[newElem.nb_pieces] = elem;
        } else {
          newState[newElem.nb_pieces] = {
            list: [newElem],
            minSurface: newElem.surface,
            maxSurface: newElem.surface,
          };
        }
      });
      setState(newState);
      Total(list.length)
    })();
  }, []);
  const classes = useStyles();

  console.log(state)
  return (
    <AdminContentWrapper
      redirectDashboard
      redirectUri="/dashboard/search"
      redirectText="Revenir à la recherche"
    >
      <div>
        <div className="relative">
          {property.pictures && <Carrousel list={property.pictures} />}
          <Grid container className={classes.save} justify="center">
            <Grid item container onClick={handleBookmark}>
              <Icon
                type="heart"
                color={liked ? 'red' : 'white'}
                strokeColor={liked ? 'red' : 'lightBlue'}
              />
              {` Sauvegarder`}
            </Grid>
          </Grid>
        </div>
        <Grid container justify="space-between" className={classes.description}>
          <Grid item md={6}>
            <Typography variant="h1">{property.heading}</Typography>
            <Typography variant="subtitle1">
              {property.city}
              {` - ${property.postal}`}
            </Typography>
            <Typography variant="h2">Programme immobilier neuf</Typography>
            <div className={classes.houseInfo}>
              <Grid container>
                <div>
                  <Icon type="door" color="lightBlue" />

                  <span>{`de 1 à ${property.nb_pieces}  pièces`}</span>
                </div>
                {property.surface ? <div>
                  <Icon type="room" color="lightBlue" />
                  <span>{` de ${property.surface}`}</span>
                </div>: ''}
              </Grid>
            </div>
          </Grid>
          <Grid item md={6} className="text-right">
            <Typography variant="h1">
              <span>à partir de</span>
              {` ${property.price}€`}
            </Typography>
            {property.available_date ?<Typography variant="body1">
              {`Disponible dès le ${property.available_date}`}
            </Typography>: ''}
            <div className={classes.phoneContainer}>
              <Btn text="Être rappelé selon mes dispos" alignRight />
              <Typography variant="body1">ou appeler le 06.65.07.11.66</Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container alignItems="flex-start">
          <Grid item md={8} className={classes.setpsContainer}>
            <div>
              <Typography variant="h3">À propos du logement !</Typography>
              <Typography variant="body1">{property.description}</Typography>
            </div>
            <div className={classes.mapContainer}>
              {/* <GoogleMapReact bootstrapURLKeys={{ key: '' }} defaultCenter={property.address}>
                <LocationPin lat={location.lat} lng={location.lng} text={location.address} />
              </GoogleMapReact> */}
            </div>
          </Grid>
          <Grid item md={4} className={classes.extraInfo}>
            <div>
              <Typography variant="h3">Les transports à proximité :</Typography>
              <Grid container justify="space-around">
                {/* <img src={StationCImg} /> */}
                {/* <img src={Station4Img} /> */}
                {/* <img src={Station3AImg} /> */}
              </Grid>
            </div>
            <div>
              <Typography variant="h3">Les petits plus :</Typography>
              <Grid>
                {bonusList.map((elem) =>
                  property[elem.key] && property[elem.key] === 'NON' ? (
                    <Typography variant="subtitle1" key={elem.key}>
                      <Icon type="elevator" />
                      {elem.value}
                    </Typography>
                  ) : (
                    ''
                  ),
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid container className={classes.discoveryContainer}>
          <Typography variant="h2">
            {`Découvrez nos ${total} logements neufs disponibles :`}
          </Typography>
          <Grid container>
            {Object.keys(state).map((elem) => {
              const curr = state[elem];
              const isOpen = currOpen === elem;
              return (
                <div key={elem}>
                  <Grid container>
                    <Grid container justify="space-between">
                      <Grid item>
                        <div>
                          {` ${elem} pièce${elem > 1 ? 's' : ''} à partir de ${elem.surface}`}
                        </div>
                      </Grid>
                      <Grid
                        item
                        alignItems="center"
                        onClick={() => handleCurrOpen(elem)}
                        className="text-center pointer"
                      >
                        <Icon type={isOpen ? 'less' : 'plus'} color="lightBlue" size="small" />
                      </Grid>
                    </Grid>
                    <Grid item md={2} xs={5} alignItems="center">
                      <Icon type="door" color="lightBlue" />
                      {` ${elem} pièce${elem > 1 ? 's' : ''}`}
                    </Grid>
                    <Grid item md={3} xs={5} alignItems="center">
                      <Icon type="room" color="lightBlue" />
                      {` de ${curr.minSurface}m² à ${curr.maxSurface}m²`}
                    </Grid>
                    <Grid item md={3} xs={5} alignItems="center">
                      <span>à partir de</span>
                      <strong>{` ${curr.minPrice}€`}</strong>
                    </Grid>
                    <Grid item md={3} xs={5} alignItems="center">
                      {`${property.price} logements disponibles`}
                    </Grid>
                    <Grid
                      item
                      md={1}
                      xs={5}
                      alignItems="center"
                      onClick={() => handleCurrOpen(elem)}
                      className="text-center pointer"
                    >
                      <Icon type={isOpen ? 'less' : 'plus'} color="lightBlue" size="small" />
                    </Grid>
                  </Grid>
                  {isOpen && (
                    <div>
                      <Grid container className={classes.discoveryContentHeader}>
                        <Grid item md={2} xs={5} className="text-center" alignItems="center">
                          Type
                        </Grid>
                        <Grid item md={2} xs={5} className="text-center" alignItems="center">
                          Prix TVA 20%
                        </Grid>
                        <Grid item md={1} xs={5} className="text-center" alignItems="center">
                          Surface
                        </Grid>
                        <Grid item md={2} xs={5} className="text-center" alignItems="center">
                          Étage
                        </Grid>
                        <Grid item md={2} xs={5} className="text-center" alignItems="center">
                          Orientation
                        </Grid>
                        <Grid item md={2} xs={5} className="text-center" alignItems="center">
                          Les +
                        </Grid>
                        <Grid item md={1} xs={5} className="text-center" alignItems="center">
                          Plan 2D
                        </Grid>
                      </Grid>
                      {curr.list.map((elem) => (
                        <Grid key={elem._id} container className={classes.discoveryContent}>
                          <Grid container>
                            <Grid container>
                              <Grid item xs={6}>
                                <div>{elem.typeOfProperty}</div>
                                <div>
                                  {elem.surface}
                                  m²
                                </div>
                              </Grid>
                              <Grid item xs={6} className="text-center">
                                <div>Prix TVA 20%</div>
                                <div>{elem.typeOfProperty}</div>
                              </Grid>
                            </Grid>
                            <Grid item className="text-center" alignItems="center">
                              <Btn text="Voir le plan" whiteColor />
                            </Grid>
                          </Grid>
                          <Grid item md={2} xs={5} className="text-center" alignItems="center">
                            {elem.typeOfProperty}
                          </Grid>
                          <Grid item md={2} xs={5} className="text-center" alignItems="center">
                            Prix TVA 20%
                          </Grid>
                          <Grid item md={1} xs={5} className="text-center" alignItems="center">
                            {elem.surface}
                            m²
                          </Grid>
                          <Grid item md={2} xs={5} className="text-center" alignItems="center">
                            {elem.floor}
                          </Grid>
                          <Grid item md={2} xs={5} className="text-center" alignItems="center">
                            {getOrientation(elem)}
                          </Grid>
                          <Grid item md={2} xs={5} className="text-center" alignItems="center">
                          {getExtra(elem)}
                          </Grid>
                          <Grid item md={1} xs={5} className="text-center" alignItems="center">
                            <Btn text="Voir le plan" whiteColor />
                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </Grid>
          <Grid className={classes.buttomBtnContainer} justify='center'>
          <Btn text="Être rappelé selon mes dispos" alignRight />
          </Grid>

        </Grid>
      </div>
    </AdminContentWrapper>
  );
};

PropertyPage.propTypes = {
  property: PropTypes.object.isRequired,
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
};
PropertyPage.getInitialProps = async ({ req, query: { id } }) => {
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }
  const property = await getPropertyApiMethod(id, { headers });
  const { list: properties = [] } = await getPropertiesApiMethod({ headers });
  console.log(property);
  return { property, properties, id };
};

export default withAuth(PropertyPage);
