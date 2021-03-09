import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Icon, Btn } from '../../form';
import { NEXT_PUBLIC_UPLOAD_URL } from '../../../config';

import styles from './styles';

const LocationTable = ({ classes, state, currOpen, handleCurrOpen }) =>
  Object.keys(state).map((elem) => {
    const current = state[elem];
    const isOpen = currOpen === elem;

    return (
      <div key={elem}>
        <Grid container>
          {/* <Typeform /> */}
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
              <Grid item md={3} xs={5} className="text-center">
                Superficie
              </Grid>
              <Grid item md={3} xs={5} className="text-center">
                Disponibilité
              </Grid>
              <Grid item md={3} xs={5} className="text-center">
                Prix
              </Grid>
              <Grid item md={3} xs={5} className="text-center">
                Plan 2D
              </Grid>
            </Grid>
            {current.list.map((curr) => (
              <Grid key={curr.lot_ref} container className={classes.discoveryContent}>
                <Grid container>
                  <Grid container justify="space-between">
                    <span>Prix</span>
                    <span>{`${curr.price}€`}</span>
                  </Grid>
                  <Grid container justify="space-between">
                    <span>Superficie</span>
                    <span>{`${curr.surface}m²`}</span>
                  </Grid>
                  <Grid container justify="space-between">
                    <span>Disponibilité</span>
                    <span>{curr.available_date}</span>
                  </Grid>
                  {curr.file && (
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    <Grid item className="text-center" className={classes.btnContainer}>
                      <Btn
                        text="Télécharger"
                        whiteColor
                        href={NEXT_PUBLIC_UPLOAD_URL + curr.file}
                        download
                      />
                    </Grid>
                  )}
                </Grid>
                <Grid container alignItems="center">
                  <Grid item md={3} xs={5} className="text-center">
                    {`${curr.surface}m²`}
                  </Grid>
                  <Grid item md={3} xs={5} className="text-center">
                    {curr.available_date}
                  </Grid>
                  <Grid item md={3} xs={5} className="text-center">
                    {`${curr.price}€`}
                  </Grid>
                  <Grid item md={3} xs={5} className={classes.btnContainer}>
                    {curr.file && (
                      <Btn
                        href={NEXT_PUBLIC_UPLOAD_URL + curr.file}
                        download
                        target="_blank"
                        dataMode="popup"
                        text="Télécharger"
                        whiteColor
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </div>
        )}
      </div>
    );
  });

export default withStyles(styles)(LocationTable);
