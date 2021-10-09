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
    <Typography variant="h3">Les petits plus :</Typography>
    <Grid container>
      {advantages.map((elem) => (
        <Grid key={elem} container item alignItems="center">
          <Icon
            type="checked"
            color="newBlue"
            customSize={{ width: 20, height: 20 }}
          />
          <Typography>{elem}</Typography>
        </Grid>
      ))}
    </Grid>
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
          <Typography variant="h3">Les transports à proximité :</Typography>
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
      {advantages.length ? (
        <div className={classes.extras}>
          <Extras advantages={advantages} />
        </div>
      ) : (
        ''
      )}
      {isLocation && (
        <div className={classes.fees}>
          <Typography variant="h3">Frais à prévoir :</Typography>
          <Typography>
            Il s’agit de frais uniques, à débourser une seule et unique fois.
          </Typography>
          <Typography>
            Honoraires d’organisation de la visite + Constitution du dossier +
            Rédaction du bail à la charge du locataire :<span> 502€ TTC</span>
          </Typography>
          <Typography>
            Honoraires de réalisation d'état des lieux à la charge du locataire
            :<span> 188€ TTC</span>
          </Typography>
          <Typography variant="h3">Total des frais : 1284€ TTC</Typography>
        </div>
      )}
      {!isLocation && (
        <span>
          <BtnCalendly />
        </span>
      )}
    </div>
  );
};
export { BtnCalendly };
export default Sidebar;
