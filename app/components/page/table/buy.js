import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import {
  spaceCurrency,
  ucfirst,
  getDateQuarter,
} from 'helpers/convertAndCheck';
import { Icon, Btn } from '../../form';
import { NEXT_PUBLIC_UPLOAD_URL } from 'config';
import styles from './styles';

const LocationTable = ({ classes, state, currOpen, handleCurrOpen }) =>
  Object.keys(state).map((elem) => {
    const current = state[elem];
    const isOpen = currOpen === elem;
    const countList = current.list.length;

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
            <Grid
              item
              onClick={() => handleCurrOpen(elem)}
              className="text-center pointer"
            >
              <Icon
                type={isOpen ? 'less' : 'plus'}
                color="newBlue"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item md={2} xs={5} className={classes.header}>
            <Typography variant="h3">
              <Icon type="door" color="newBlue" />
              {` ${elem} pièce${elem > 1 ? 's' : ''}`}
            </Typography>
          </Grid>
          <Grid item md={3} xs={5} className={classes.header}>
            <Typography variant="h3">
              <Icon type="room" color="newBlue" />
              {` de ${current.minSurface}m² à ${current.maxSurface}m²`}
            </Typography>
          </Grid>
          <Grid
            item
            md={3}
            xs={5}
            className={clsx(classes.header, classes.headerPricing)}
          >
            <Typography variant="h3">
              <span>à partir de</span>
              <strong>{` ${spaceCurrency(current.minPrice)}€`}</strong>
            </Typography>
          </Grid>
          <Grid item md={3} xs={5} className={classes.header}>
            <Typography variant="h3">
              {`${countList} logement${countList > 1 ? 's' : ''} disponible${
                countList > 1 ? 's' : ''
              }`}
            </Typography>
          </Grid>
          <Grid
            item
            md={1}
            xs={5}
            onClick={() => handleCurrOpen(elem)}
            className="text-center pointer"
          >
            <Icon
              type={isOpen ? 'less' : 'plus'}
              color="newBlue"
              size="small"
            />
          </Grid>
        </Grid>
        {isOpen && (
          <div>
            <Grid container className={classes.discoveryContentHeader}>
              {/* <Grid item md={1} xs={1} className="text-center">
                Type
              </Grid> */}
              <Grid item md={2} xs={2} className="text-center">
                Prix TVA 20%
              </Grid>
              <Grid item md={1} xs={1} className="text-center">
                Surface
              </Grid>
              <Grid item md={2} xs={2} className="text-center">
                Étage
              </Grid>
              <Grid item md={1} xs={1} className="text-center">
                Orientation
              </Grid>
              <Grid item md={2} xs={2} className="text-center">
                Parking
              </Grid>
              <Grid item md={2} xs={2} className="text-center">
                Les +
              </Grid>
              <Grid item md={2} xs={2} className="text-center">
                Plan 2D
              </Grid>
            </Grid>
            {current.list.map((curr) => {
              const price = spaceCurrency(curr.price);
              const orientation = curr.orientation ?? '-';
              const typeOfProperty = ucfirst(curr.typeOfProperty);

              return (
                <Grid
                  key={curr.ref}
                  container
                  className={classes.discoveryContent}
                >
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
                      <span>Orientation</span>
                      <span>{orientation}</span>
                    </Grid>

                    <Grid
                      item
                      className="text-center"
                      className={classes.btnContainer}
                    >
                      <Btn
                        text={curr.file ? 'Voir' : '-'}
                        whiteColor
                        href={NEXT_PUBLIC_UPLOAD_URL + curr.file}
                        download
                        disabled={!curr.file}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    className={classes.contentContainer}
                  >
                    {/* <Grid item md={1} xs={1} className="text-center">
                      {typeOfProperty}
                    </Grid> */}
                    <Grid item md={2} xs={2} className="text-center">
                      {`${price}€`}
                    </Grid>
                    <Grid item md={1} xs={1} className="text-center">
                      {`${curr.surface}m²`}
                    </Grid>
                    <Grid item md={2} xs={2} className="text-center">
                      {curr.floor ? `Étage ${curr.floor}` : 'RDC'}
                    </Grid>
                    <Grid item md={1} xs={1} className="text-center">
                      {orientation}
                    </Grid>
                    <Grid item md={2} xs={2} className="text-center">
                      {curr.nb_parking ? `${curr.nb_parking} inclus` : '-'}
                    </Grid>
                    <Grid item md={2} xs={2} className="text-center">
                      {curr.advantages.length
                        ? curr.advantages.join(', ')
                        : '-'}
                    </Grid>
                    <Grid item md={2} xs={2} className={classes.btnContainer}>
                      <Btn
                        text={curr.file ? 'Voir le plan' : '-'}
                        href={NEXT_PUBLIC_UPLOAD_URL + curr.file}
                        download
                        disabled={!curr.file}
                        target="_blank"
                        dataMode="popup"
                        boxShadow
                        whiteColor
                      />
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
