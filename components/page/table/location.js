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
      margin: 'auto',
      fontSize: '1rem',
      color: theme.palette.button,
      border: `1px solid ${theme.palette.button}`,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div': {
        display: 'none',
        '& > div': {
          padding: '0 2rem',
        },
      },
      '& > div:first-of-type': {
        display: 'flex',
        paddingTop: '2.5rem',
        borderTop: '1px solid rgba(26, 46, 108, 0.5)',
        '& > div:last-of-type': {
          marginTop: '1.6rem',
          padding: 0,
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

const LocationTable = ({ classes, state, currOpen, handleCurrOpen }) =>
  Object.keys(state).map((elem) => {
    const current = state[elem];
    const isOpen = currOpen === elem;

    return (
      <div key={elem}>
        <Grid container>
          <Grid container justify="space-between">
            <Grid item>
              <div>
                {` ${elem} pièce${elem > 1 ? 's' : ''} à partir de `}

                <strong>{` ${current.minPrice}€`}</strong>
              </div>
            </Grid>
            <Grid item onClick={() => handleCurrOpen(elem)} className="text-center pointer">
              <Icon type={isOpen ? 'less' : 'plus'} color="lightBlue" size="small" />
            </Grid>
          </Grid>
          <Grid item md={2} xs={5}>
            <Icon type="door" color="lightBlue" />
            {` ${elem} pièce${elem > 1 ? 's' : ''}`}
          </Grid>
          <Grid item md={3} xs={5}>
            <Icon type="room" color="lightBlue" />
            {` de ${current.minSurface}m² à ${current.maxSurface}m²`}
          </Grid>
          <Grid item md={3} xs={5}>
            <span>à partir de</span>
            <strong>{` ${current.minPrice}€`}</strong>
          </Grid>
          <Grid item md={3} xs={5}>
            {`${current.list.length} logements disponibles`}
          </Grid>
          <Grid
            item
            md={1}
            xs={5}
            onClick={() => handleCurrOpen(elem)}
            className="text-center pointer"
          >
            <Icon type={isOpen ? 'less' : 'plus'} color="lightBlue" size="small" />
          </Grid>
        </Grid>
        {isOpen && (
          <div>
            <Grid container className={classes.discoveryContentHeader}>
              <Grid item md={2} xs={5} className="text-center">
                Superficie
              </Grid>
              <Grid item md={2} xs={5} className="text-center">
                Étage
              </Grid>
              <Grid item md={2} xs={5} className="text-center">
                disponibilité
              </Grid>
              <Grid item md={2} xs={5} className="text-center">
                Loyer/mois
              </Grid>
              <Grid item md={2} xs={5} className="text-center">
                Dépot de garrantie
              </Grid>
              <Grid item md={2} xs={5} className="text-center">
                Plan 2D
              </Grid>
            </Grid>
            {current.list.map((curr) => (
              <Grid key={curr.lot_ref} container className={classes.discoveryContent}>
                <Grid container>
                  <Grid container justify="space-between">
                    <span>Loyer/mois</span>
                    <span>{`${curr.price}€`}</span>
                  </Grid>
                  <Grid container justify="space-between">
                    <span>Superficie</span>
                    <span>{`${curr.surface}m²`}</span>
                  </Grid>
                  <Grid container justify="space-between">
                    <span>disponibilité</span>
                    <span>{curr.available_date}</span>
                  </Grid>
                  <Grid item className="text-center">
                    <Btn text="Formulaire" whiteColor />
                  </Grid>
                </Grid>
                <Grid item md={2} xs={5} className="text-center">
                  {`${curr.surface}m²`}
                </Grid>
                <Grid item md={2} xs={5} className="text-center">
                  {curr.floor}
                </Grid>
                <Grid item md={2} xs={5} className="text-center">
                  {curr.available_date}
                </Grid>
                <Grid item md={2} xs={5} className="text-center">
                  {`${curr.price}€`}
                </Grid>
                <Grid item md={2} xs={5} className="text-center">
                  {`${curr.guarantee}€`}
                </Grid>
                <Grid item md={2} xs={5}>
                  <Btn
                    href="https://form.typeform.com/to/GmNScezn?typeform-medium=embed-snippet"
                    target="_blank"
                    dataMode="popup"
                    text="Formulaire"
                    whiteColor
                  />
                </Grid>
              </Grid>
            ))}
          </div>
        )}
      </div>
    );
  });

export default withStyles(styles)(LocationTable);
