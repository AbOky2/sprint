import { useState } from 'react';
import clsx from 'clsx';
import { openPopupWidget } from 'react-calendly';
import { Grid, Typography } from '@material-ui/core';
import { Icon, Btn } from 'components';
import { tranportationsKeys, individualAdvantages } from 'helpers';

const BtnCalendly = () => (
  <Btn
    text="Être rappelé selon mes dispos"
    alignRight
    onClick={() => openPopupWidget({ url: 'https://calendly.com/kitlenid' })}
  />
);

const Extras = ({ advantages = [] }) => (
  <>
  <p className="flex-grow-0 flex-shrink-0 w-[295px] font-bold text-left text-[#3679ff] text-_rougeStudea text-2xl">
Les petits plus </p>
<div className="flex flex-col justify-start items-start  gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mt-9 mb-5">
      {advantages.map((elem) => (
        <div key={elem} alignItems="center">
          <Icon
            type="checked"
            color='newRed'
            
            customSize={{ width: 20, height: 20 }}
          />
          <p>{elem}</p>
        </div>
      ))}
    </div>
  </>
);
const currIcons = ['bus', 'rer', 'tramway', 'metro'];
const Sidebar = ({ isLocation, property, classes }) => {
  const [showExtra, setShowExtra] = useState(false);
  const transportations = property.transportations || {};
  const advantages =
    property.advantages?.filter((e) => !individualAdvantages.includes(e)) || [];
  const limit = 8;
  let maxLength = 0;

  const toggleExtra = () => setShowExtra(!showExtra);

  return (
    <div className={classes.extraContainer}>
      {Object.keys(transportations).length ? (
        <div
          className={clsx(
            classes.transportations,
            showExtra ? classes.transportationsWithExtra : ''
          )}
        >
        {isLocation ? (
            <p className="flex-grow-0 flex-shrink-0 w-[295px] text-2xl font-bold text-center text-_rougeStudea mb-5">
            Transports à proximité</p>
        ): (
          <p className="flex-grow-0 flex-shrink-0 w-[295px] text-2xl font-bold text-center text-_aPropos mb-5">
          Transports à proximité</p>

        )}
       

          <Grid container justify="flex-start">
            {Object.keys(transportations)
              .sort((a, b) => a < b)
              .map((elem) => {
                const list = transportations[elem];
                maxLength = list.length > maxLength ? list.length : maxLength;

                return (
                  <Grid item key={elem} xs={4}>
                    <h2>
                      {currIcons.includes(tranportationsKeys[elem]) ? (
                        <Icon
                          type={tranportationsKeys[elem]}
                          noColor
                          size="middle"
                        />
                      ) : (
                        tranportationsKeys[elem]
                      )}
                    </h2>
                    <ul>
                      {list.map((e) => (
                        <li key={e.name}>{e.name}</li>
                      ))}
                    </ul>
                  </Grid>
                );
              })}
          </Grid>
          {maxLength > limit ? (
            <div className={classes.transportDisplayMore} onClick={toggleExtra}>
              <Icon
                type="sliderArrow"
                size="small"
                rotate={showExtra ? '270deg' : '90deg'}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      
      {isLocation && (
        <div className="flex flex-col justify-start items-start  gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mt-9 mb-5">
        <p className="flex-grow-0 flex-shrink-0 w-[295px] font-bold text-left text-[#3679ff] text-_rougeStudea text-2xl">
          Frais à prevoir:
        </p>
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[295px] text-sm font-normal text-left text-[#6976a0] text-_gris">
           Il s’agit de frais uniques, à débourser une seule et unique fois.
     
         <br/>Honoraires d’organisation de la visite + Constitution du dossier + Rédaction du bail à la charge du locataire : <strong className=' text-_rougeStudea font-semibold'>502€ TTC</strong>
     
         <br/>Honoraires de réalisation d’état des lieux à la charge du locataire :<strong className=' text-_rougeStudea font-semibold'> 188€ TTC</strong><br/>
     
        <br/>  <strong className=' text-_rougeStudea font-semibold'>Total des frais : 1284€ TTC</strong>
          </p>
      </div>
      )}
      
    </div>
  );
};
export { BtnCalendly };
export default Sidebar;
