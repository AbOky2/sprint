import React, { useState } from 'react';
// import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AdminContentWrapper } from '../../../../components/wrapper';
import { Icon, Btn } from '../../../../components/form';
import { getPropertyApiMethod, getPropertiesApiMethod } from '../../../../lib/api/customer';
import Carrousel from '../../../../components/Carrousel';
import withAuth from '../../../../lib/withAuth';

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
    },
    '& > div:last-of-type > div h6 ': {
      color: '#526190',
    },
    '& > div:first-of-type': {
      marginBottom: 20,
    },
    '& h3': {
      marginBottom: 32,
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
    '& > div > div:first-of-type': {
      borderTop: '1px solid rgba(26, 46, 108, 0.5)',
    },
    '& > div > div:nht-child(3)': {
      background: 'red',
    },
    '& > div > div': {
      padding: '2rem',
      borderBottom: '1px solid rgba(26, 46, 108, 0.5)',
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
}));
const bonusList = [
  { key: 'digicode', value: 'Digicode' },
  { key: 'elevator', value: 'Ascenseur' },
  { key: 'intercom', value: 'Intercom' },
];

const PropertyPage = ({ property = {}, properties = [] }) => {
  const [state, setState] = useState(false);
  const toggle = () => setState(!state);
  const classes = useStyles();

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
            <Grid item container onClick={toggle}>
              <Icon
                type="heart"
                color={state ? 'red' : 'white'}
                strokeColor={state ? 'red' : 'lightBlue'}
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
                <div>
                  <Icon type="room" color="lightBlue" />
                  <span>{` de ${property.surface}`}</span>
                </div>
              </Grid>
            </div>
          </Grid>
          <Grid item md={6} className="text-right">
            <Typography variant="h1">
              <span>à partir de</span>
              {` ${property.price}€`}
            </Typography>
            <Typography variant="body1">
              Disponible dès le
              {` ${property.available_date}`}
            </Typography>
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
          <Typography variant="h2">Découvrez nos 13 logements neufs disponibles :</Typography>
          <Grid container>
            {properties.map((elem) => (
              <Grid key={elem._id} container>
                <Grid item md={2} xs={5} alignItems="center">
                  <Icon type="room" color="lightBlue" />
                  {` ${property.nb_pieces} pièce${property.nb_pieces?.length > 1 ? 's' : ''}`}
                </Grid>
                <Grid item md={3} xs={5} alignItems="center">
                  <Icon type="room" color="lightBlue" />
                  {` de ${property.surface}`}
                </Grid>
                <Grid item md={3} xs={5} alignItems="center">
                  <span>à partir de</span>
                  <strong>{` ${property.price}€`}</strong>
                </Grid>
                <Grid item md={3} xs={5} alignItems="center">
                  {`${property.price} logements disponibles`}
                </Grid>
                <Grid item md={1} xs={5} alignItems="center">
                  <Icon type="plus" color="lightBlue" size="small" />
                </Grid>
              </Grid>
            ))}
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
PropertyPage.getInitialProps = async ({ req, query }) => {
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }
  const property = await getPropertyApiMethod(query.id, { headers });
  const { list: properties = [] } = await getPropertiesApiMethod({ headers });
  return { property, properties };
};

export default withAuth(PropertyPage);
