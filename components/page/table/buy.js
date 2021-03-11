import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { spaceCurrency, ucfirst, getDateQuarter } from '../../../helpers/convertAndCheck';
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
          <Grid container justify="space-between">
            <Grid item>
              <div>
                {` ${elem} pièce${elem > 1 ? 's' : ''} à partir de `}

                <strong>{` ${spaceCurrency(current.minPrice)}€`}</strong>
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
            <strong>{` ${spaceCurrency(current.minPrice)}€`}</strong>
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
              <Grid item md={1} xs={1} className="text-center">
                Type
              </Grid>
              <Grid item md={2} xs={2} className="text-center">
                Prix TVA 20%
              </Grid>
              <Grid item md={1} xs={1} className="text-center">
                Livraison
              </Grid>
              <Grid item md={1} xs={1} className="text-center">
                Surface
              </Grid>
              <Grid item md={2} xs={2} className="text-center">
                Étage
              </Grid>
              <Grid item md={2} xs={2} className="text-center">
                Parking
              </Grid>
              <Grid item md={2} xs={2} className="text-center">
                Les +
              </Grid>
              <Grid item md={1} xs={1} className="text-center">
                Plan 2D/3D
              </Grid>
            </Grid>
            {current.list.map((curr) => {
              const price = spaceCurrency(curr.price);
              const available_date = getDateQuarter(curr.available_date);
              const typeOfProperty = ucfirst(curr.typeOfProperty);

              return (
                <Grid key={curr.ref} container className={classes.discoveryContent}>
                  <Grid container>
                    <Grid container justify="space-between">
                      <span>Type</span>
                      <span>{typeOfProperty}</span>
                    </Grid>
                    <Grid container justify="space-between">
                      <span>Prix</span>
                      <strong>{`${price}€`}</strong>
                    </Grid>
                    <Grid container justify="space-between">
                      <span>Superficie</span>
                      <span>{`${curr.surface}m²`}</span>
                    </Grid>
                    <Grid container justify="space-between">
                      <span>Étage</span>
                      <span>{curr.floor}</span>
                    </Grid>
                    <Grid container justify="space-between">
                      <span>Disponibilité</span>
                      <span>{available_date}</span>
                    </Grid>
                    {curr.file && (
                      // eslint-disable-next-line react/jsx-no-duplicate-props
                      <Grid item className="text-center" className={classes.btnContainer}>
                        <Btn
                          text="Voir"
                          whiteColor
                          href={NEXT_PUBLIC_UPLOAD_URL + curr.file}
                          download
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid container alignItems="center">
                    <Grid item md={1} xs={1} className="text-center">
                      {typeOfProperty}
                    </Grid>
                    <Grid item md={2} xs={2} className="text-center">
                      {`${price}€`}
                    </Grid>
                    <Grid item md={1} xs={1} className="text-center">
                      {available_date}
                    </Grid>
                    <Grid item md={1} xs={1} className="text-center">
                      {`${curr.surface}m²`}
                    </Grid>
                    <Grid item md={2} xs={2} className="text-center">
                      {curr.floor ? `Étage ${curr.floor}` : 'RDC'}
                    </Grid>
                    <Grid item md={2} xs={2} className="text-center">
                      {curr.nb_parking ? `${curr.nb_parking} inclus` : '-'}
                    </Grid>
                    <Grid item md={2} xs={2} className="text-center">
                      {curr.advantages.join(', ')}
                    </Grid>
                    <Grid item md={1} xs={1} className={classes.btnContainer}>
                      {curr.file && (
                        <Btn
                          href={NEXT_PUBLIC_UPLOAD_URL + curr.file}
                          download
                          target="_blank"
                          dataMode="popup"
                          text="Voir"
                          whiteColor
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </div>
        )}
      </div>
    );
  });

export default withStyles(styles)(LocationTable);
