/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { userActions } from 'redux/_actions';
import { AdminContentWrapper } from 'components/wrapper';
import { addBookmarkApiMethod } from 'lib/api';
import {
  typeOfAnnoncies,
  defaultPropertyImg,
  getNbPieces,
  spaceCurrency,
} from 'helpers';
import { Carrousel, NotFound, Icon, Maps } from 'components';

import { BuyTable, LocationTable } from '../table';
import LocationModal from '../table/locationModal';
import Sidebar, { BtnCalendly } from './sidebar';
import useStyles from './styles';
import "@fontsource/space-grotesk";
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
          if (!elem.vat || elem.vat < newElem.vat) elem.vat = newElem.vat;
          newState[pieces] = elem;
        } else {
          newState[pieces] = {
            list: [newElem],
            minSurface: newElem.surface,
            maxSurface: newElem.surface,
            minPrice: newElem.price,
            vat: newElem.vat,
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
        <div className="relative" style={{margin:'-22px', marginTop:'-60px', display:"flex", flexDirection:"column"}}>
          {property.pictures && (
            <Carrousel
              list={
                property.pictures.length
                  ? property.pictures
                  : [defaultPropertyImg]
              }
            />
          )}
          <Grid
           
            className={clsx(classes.save, liked ? classes.saved : '')}
            style={{display:'flex', flexDirection:'row-reverse', position:"absolute", top:"64px", left:'380px'}}
          >
            <div onClick={handleBookmark} style={{display:'flex', flexDirection:'row-reverse', background:"transparent"}}>
              <div style={{backgroundColor:'white', width:"30px", height:"30px", borderRadius:"50%", padding:'7px'}}>
              <Icon
                type="heart"
                size='small'
                color={liked ? 'newBlue' : 'white'}
                strokeColor={liked ? 'newBlue' : 'newBlue'}
              /></div>
              <div style={{backgroundColor:'white', width:"30px", height:"30px", borderRadius:"50%", padding:'2px', marginRight:'8px'}}>
              <Icon
              type="partageV2"
              noColor
              />
              </div>

            </div>
          </Grid>
        </div>
        <Grid container justify="space-between" className={classes.description}>
          <Grid item md={6}>
            <Typography variant="h1" style={{fontFamily:'Space Grotesk', fontWeight:'700', fontSize:"28px", fontStyle:"normal", backgroundColor:'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)'}} >{property.heading}</Typography>
            <Typography style={{color:'#6976A0', fontSize:'14px', fontWeight:'bold', lineHeight:'18px'}}>{property.fullAddress}</Typography>
            
            <div className={classes.houseInfo} style={{borderLeft:'0.4rem solid rgba(129, 163, 249, 1)', padding:''}}>
                  <Typography style={{fontWeight:'bold', fontSize:'18px', lineHeight:'23px', marginLeft:'16px'}}>
                    {getNbPieces(property.minPieces, property.maxPieces)}
                              <br/>{` de ${
                      property.minSurface !== property.maxSurface
                        ? `${property.minSurface}m² à ${property.maxSurface}m²`
                        : `${property.minSurface}m²`
                    }`}
                    </Typography>
              <Typography variant="h2" style={{color:'#3679FF', fontFamily:'space grotesk', fontWeight:'549', marginLeft:'16px'}}>
              à partir de
              {` ${spaceCurrency(property.price)}€`}
              <span>{isLocation ? 'CC/mois' : ''}</span>
            </Typography>
            {property.available_date && !isLocation ? (
              <Typography variant="body1" style={{fontFamily:'Space Grotesk',marginLeft:'16px'}}>
                {`Fin de construction le ${property.available_date}`}
              </Typography>
            ) : (
              ''
            )}
            </div>
          </Grid>
          <Grid item md={6} className={classes.priceCta}>
            
            <div className={classes.phoneContainer}>
              {isLocation ? (
                <AnchorLink href="#table" className={classes.anchorLink}>
                  Déposer mon dossier
                </AnchorLink>
              ) : (
                <BtnCalendly />
              )}
              {isLocation ? (
                ''
              ) : (
                <Typography variant="body1" style={{fontFamily:'Space Grotesk', fontWeight:'550', fontSize:'15px'}}>
                  ou appeler le 06 65 07 11 66
                </Typography>
              )}
            </div>
          </Grid>
        </Grid>


        <Typography variant="h1" style={{background:'#FFFFFF', border:'1px solid #3679FF', boxSizing:"border-box", borderRadius:'12px', fontFamily:'Space Grotesk', fontSize:'14px', padding:'4px', marginBottom:'20px', textAlign:'center'}}>
            {!isLocation
              ? `${total} logement${total > 1 ? 's' : ''} ${
                  total > 1 ? 'neufs disponibles' : 'neuf disponible'
                } à l’achat dans cette résidence. `
              : `${total} logement${total > 1 ? 's' : ''} disponible${
                  total > 1 ? 's' : ''
                } à la location dans cette résidence.`}
          </Typography>


        <Grid container className={classes.discoveryContainer}>
          
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


          <Grid item md={8} xs={12} className={classes.setpsContainer}
          style={{background : 'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)', borderRadius:'12px', marginBottom:"20px", marginTop:"16px", padding:'24px'}}>
            <Icon 
            type='logoK'
            color='white'
            size='medium'
            />
            <h2 style={{color:'#FFFFFF'}}>Le mot de Kit le nid.</h2>
            <Typography style={{ color:'white', marginTop:"-8px", fontWeight:"bold"}} zeroMinWidth>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis felis eu posuere semper. Proin egestas eros at odio porttitor efficitur. Quisque id enim orci.
            
            </Typography>
            
          </Grid>



        <div className='grid'>
          <div className='grid grid-flow-row md:grid-flow-col'>
            <div className="flex flex-col justify-start items-start  gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mt-9 mb-5">
              <p className="flex-grow-0 flex-shrink-0 w-_295 text-left text-_titre text-2xl font-semibold">
                À propos de cette résidence</p>
                <p className="self-stretch flex-grow-0 flex-shrink-0 w-[295px] text-sm font-normal text-left text-[#6976a0] text-_gris">
                <span
                  dangerouslySetInnerHTML={{ __html: property.description }}
                />
              </p>
            </div>
            <Sidebar
              isLocation={isLocation}
              property={property}
              classes={classes}
            />
            <div className="flex flex-col h-_343 justify-start items-start  gap-2 rounded-2xl bg-white border border-_bordureBleu mt-9 mb-5">
              <Maps loc={property.loc?.coordinates} />
            </div>
          </div>
         
            
             
        </div>

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
