import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Icon, Btn } from '../../form';

const styles = (theme) => ({
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
});

const orientationObj = {
  south_orientation: 'Sud',
  east_orientation: 'Est',
  west_orientation: 'Ouest',
  north_orientation: 'Nord',
};
const extraObj = {
  terrace: 'Terrace',
  balcony: 'Balcon',
  intercom: 'Intercom',
  guardian: 'guardien',
};

const getExactData = (elem, obj) => {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) if (elem[keys[i]] === 'OUI') return obj[keys[i]];
};
const getOrientation = (elem) => getExactData(elem, orientationObj);
const getExtra = (elem) => getExactData(elem, extraObj);

const LocationTable = ({ classes, state, property, currOpen, handleCurrOpen }) =>
  Object.keys(state).map((elem) => {
    const curr = state[elem];
    const isOpen = currOpen === elem;
    return (
      <div key={elem}>
        <Grid container>
          <Grid container justify="space-between">
            <Grid item>
              <div>
                {` ${elem} pièce${elem > 1 ? 's' : ''} à partir de `}

                <strong> 
{' '}
{` ${curr.minPrice}€`}
{' '}
 </strong>
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
                Superficie
              </Grid>
              <Grid item md={2} xs={5} className="text-center" alignItems="center">
                Étage
              </Grid>
              <Grid item md={1} xs={5} className="text-center" alignItems="center">
                disponibilité
              </Grid>
              <Grid item md={2} xs={5} className="text-center" alignItems="center">
                Loyer/mois
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
                  {elem.surface}
                  m²
                </Grid>
                <Grid item md={2} xs={5} className="text-center" alignItems="center">
                  {elem.floor}
                </Grid>
                <Grid item md={1} xs={5} className="text-center" alignItems="center">
                  {elem.surface}
                  m²
                </Grid>
                <Grid item md={2} xs={5} className="text-center" alignItems="center">
                  {elem.price}€
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
  });

export default withStyles(styles)(LocationTable);
