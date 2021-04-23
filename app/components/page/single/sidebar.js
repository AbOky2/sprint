import { openPopupWidget } from 'react-calendly';
import { Grid, Typography } from '@material-ui/core';
import { Icon, Btn } from 'components/form';

const BtnCalendly = () => (
  <Btn
    text="Être rappelé selon mes dispos"
    alignRight
    onClick={() => openPopupWidget({ url: 'https://calendly.com/kitlenid' })}
  />
);

const Extras = ({ property }) =>
  property.advantages?.length ? (
    <div>
      <Typography variant="h3">Les petits plus :</Typography>
      <Grid container>
        {property.advantages?.map((elem) => (
          <Grid container item key={elem} alignItems="center">
            <Icon type="elevator" color="newBlue" />
            <Typography>{elem}</Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    ''
  );

const BuySidebar = ({ property, classes }) => (
  <div className={classes.extras}>
    <div>
      <Typography variant="h3">Les transports à proximité :</Typography>
      <Grid container justify="space-around">
        {/* <img src={StationCImg} /> */}
        {/* <img src={Station4Img} /> */}
        {/* <img src={Station3AImg} /> */}
      </Grid>
    </div>
    <Extras property={property} />
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
        Honoraires de réalisation d'état des lieux à la charge du locataire :
        <span> 188€ TTC</span>
      </Typography>
      <Typography variant="h3">Total des frais : 1284€ TTC</Typography>
    </div>
    <span>
      <BtnCalendly />
    </span>
  </div>
);
export { BuySidebar, BtnCalendly };
