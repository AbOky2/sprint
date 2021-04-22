/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { openPopupWidget } from 'react-calendly';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Maps from 'components/Maps';
import { userActions } from 'redux/_actions';
import { AdminContentWrapper } from 'components/wrapper';
import { Icon, Btn } from 'components/form';
import { addBookmarkApiMethod } from 'lib/api/customer';
import { typeOfAnnoncies, defaultPropertyImg } from 'helpers/property';
import Carrousel from 'components/Carrousel';
import NotFound from 'components/NotFound';
import { spaceCurrency } from 'helpers/convertAndCheck';
import { getNbPieces } from 'helpers/property';
import { BuyTable, LocationTable } from '../table';
import LocationModal from '../table/locationModal';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 'calc(100% - 14px)',
  },
  title: {
    color: theme.palette.newBlue,
  },
  save: {
    color: theme.palette.button,
    fontSize: '1.8rem',
    marginBottom: 30,
    '& > div': {
      position: 'absolute',
      bottom: 0,
      cursor: 'pointer',
      width: '25%',
      justifyContent: 'center',
      padding: '20px 23px',
      background: 'white',
      boxSizing: 'border-box',
      borderRadius: '1rem',
      transform: 'translateY(calc(50%))',
      fontWeight: 'bold',
      color: theme.palette.newBlue,
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
      },
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
    [theme.breakpoints.down('sm')]: {
      '& > div > div': {
        marginLeft: 'auto',
        '&:first-of-type': {
          marginRight: 0,
        },
      },
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
    [theme.breakpoints.down('sm')]: {
      '& h2, & h1 ': {
        marginTop: '1rem',
      },
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
    borderRadius: '2.5rem',
    overflow: 'hidden',
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
      '& > div': {
        margin: 'auto!important',
        textAlign: 'center',
      },
    },
  },
  modal: {
    '& > div > div': {
      '& > span': {
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '22px',
        display: 'inline-block',
        alignItems: 'center',
        color: theme.palette.newBlue,
        background: 'white',
        border: `1px solid ${theme.palette.newBlue}`,
        boxSizing: 'border-box',
        borderRadius: '10px',
        padding: '1.6rem',
      },
    },
  },
  anchorLink: {
    width: 'fit-content',
    background:
      'linear-gradient(180deg, #3563DC 0%, #3E6FEF 4.34%, #3062E3 94.05%, #154AD2 100%)',
    boxShadow:
      '0px 4px 14px rgba(14, 108, 218, 0.35), inset 0px 0px 6px rgba(24, 72, 196, 0.6)',
    color: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.8rem',
    fontWeight: '600',
    padding: '18px 23px',
  },
  priceCta: {
    width: '100%',
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  ecologyContainer: {
    position: 'relative',
    marginTop: '5rem',
    '& > div:first-of-type': {
      position: 'absolute',
      top: '-2.5rem',
      left: 0,
      backgroundColor: '#3e8743',
    },
    '& > div:last-of-type': {
      marginLeft: '5rem',
      backgroundColor: '#f5f5f5',
      padding: '1rem 2rem',
      borderRadius: '2.5rem',
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
}));

const PropertyPage = ({
  id,
  user,
  update,
  property = {},
  isLocation = false,
}) => {
  const [state, setState] = useState({});
  const [selectedLot, setSelectedLot] = useState(null);
  const [total, setTotal] = useState(0);
  const [currOpen, setCurrOpen] = useState('');
  const [liked, setLiked] = useState(
    user?.bookmarks?.find((elem) => elem._id === id)
  );
  const handleBookmark = () => {
    setLiked(!liked);
    addBookmarkApiMethod({ id }).then(({ user }) => update(user));
  };
  const handleSelectLot = (elem) => setSelectedLot(elem);
  const handleCurrOpen = (e) => setCurrOpen(currOpen === e ? null : e);
  useEffect(() => {
    (async () => {
      const newState = {};
      property.lots?.forEach((newElem) => {
        const pieces = newElem.pieces == 0 ? 1 : newElem.pieces;
        const elem = newState[pieces];
        if (Object.prototype.hasOwnProperty.call(newState, pieces)) {
          elem.list.push(newElem);
          if (!elem.minPrice || elem.minPrice > newElem.price)
            elem.minPrice = newElem.price;
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
      setTotal(property.lots?.length);
    })();
  }, [property.lots]);
  const classes = useStyles();

  if (!id) return <NotFound showLink={false} />;
  return (
    <AdminContentWrapper>
      <div>
        <div className="relative">
          {property.pictures && (
            <Carrousel
              list={
                property.pictures.length
                  ? property.pictures
                  : [defaultPropertyImg]
              }
            />
          )}
          <Grid container className={classes.save} justify="center">
            <Grid item container onClick={handleBookmark} alignItems="center">
              <Icon
                type="heart"
                color={liked ? 'red' : 'white'}
                strokeColor={liked ? 'red' : 'newBlue'}
              />
              {liked ? 'Sauvegardé‎‎ ‎' : 'Sauvegarder'}
            </Grid>
          </Grid>
        </div>
        <Grid container justify="space-between" className={classes.description}>
          <Grid item md={6}>
            <Typography variant="h1">{property.heading}</Typography>
            <Typography variant="subtitle1">{property.fullAddress}</Typography>
            {!isLocation && (
              <Typography variant="h2">Programme immobilier neuf</Typography>
            )}
            <div className={classes.houseInfo}>
              <Grid container>
                <div>
                  <Icon type="door" color="newBlue" />

                  <span>
                    {getNbPieces(property.minPieces, property.maxPieces)}
                  </span>
                </div>

                <div>
                  <Icon type="room" color="newBlue" />
                  <span>{` de ${property.minSurface}m² à ${property.maxSurface}m²`}</span>
                </div>
              </Grid>
            </div>
          </Grid>
          <Grid item md={6} className={classes.priceCta}>
            <Typography variant="h1">
              <span>à partir de</span>
              {` ${spaceCurrency(property.price)}€`}
              <span>{isLocation ? 'CC/mois' : ''}</span>
            </Typography>
            {property.available_date && !isLocation ? (
              <Typography variant="body1">
                {`Fin de construction le ${property.available_date}`}
              </Typography>
            ) : (
              ''
            )}
            <div className={classes.phoneContainer}>
              {isLocation ? (
                <a href="#table" className={classes.anchorLink}>
                  Déposer mon dossier
                </a>
              ) : (
                <Btn
                  text="Être rappelé selon mes dispos"
                  alignRight
                  onClick={() =>
                    openPopupWidget({ url: 'https://calendly.com/kitlenid' })
                  }
                />
              )}
              {isLocation ? (
                ''
              ) : (
                <Typography variant="body1">
                  ou appeler le 06.65.07.11.66
                </Typography>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid container alignItems="flex-start">
          <Grid item className={classes.setpsContainer}>
            <div>
              <Typography variant="h3">À propos du logement !</Typography>
              <Typography variant="body1">
                <span
                  dangerouslySetInnerHTML={{ __html: property.description }}
                />
              </Typography>
            </div>
            {property.advantage?.length ? (
              <div className={classes.extras}>
                <Typography variant="h3">Les petits plus :</Typography>
                <Grid container>
                  {property.advantage?.map((elem) => (
                    <Grid
                      container
                      item
                      key={elem}
                      md={4}
                      sm={6}
                      alignItems="center"
                    >
                      <Icon type="elevator" color="newBlue" />
                      <Typography variant="subtitle1">{elem}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              ''
            )}
            <div className={classes.mapContainer}>
              <Maps loc={property.loc?.coordinates} />
            </div>
          </Grid>
        </Grid>

        <Grid container className={classes.discoveryContainer}>
          <Typography variant="h2">
            {total > 1
              ? `Découvrez nos ${total} logements${
                  isLocation ? '' : '  neufs disponibles'
                } :`
              : `Découvrez le logements${isLocation ? '' : '  neufs'} :`}
          </Typography>
          <Grid container id="table">
            {property.typeOfAnnonce === typeOfAnnoncies[0] ? (
              <BuyTable
                state={state}
                property={property}
                currOpen={currOpen}
                handleCurrOpen={handleCurrOpen}
              />
            ) : (
              <LocationTable
                state={state}
                property={property}
                currOpen={currOpen}
                handleSelect={handleSelectLot}
                handleCurrOpen={handleCurrOpen}
              />
            )}
          </Grid>
        </Grid>
        <LocationModal
          className={classes.modal}
          user={user}
          residenceName={property.heading}
          curr={selectedLot}
          fullAddress={property.fullAddress}
          handleClose={() => handleSelectLot(null)}
        />
        {/* <Grid container className={classes.ecologyContainer}>
          <div>
            <Icon type="pen" />
          </div>
          <div>
            <Typography variant="h3">
              Engagements Durables : votre logement plus éco-responsable
            </Typography>
            <Typography>
              Nexity intègre à ses logements une charte durable afin d’optimiser
              la gestion des déchets, réaliser des économies d’eau et d’énergie,
              utiliser des matériaux à l’empreinte écologique limitée et
              réintégrer la biodiversité au sein de ses résidences.
            </Typography>
          </div>
        </Grid> */}
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
