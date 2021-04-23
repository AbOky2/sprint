/* eslint-disable react/jsx-no-duplicate-props */
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { spaceCurrency, locationAvailableDate } from 'helpers/convertAndCheck';
import { Icon, Btn } from 'components/form';
import styles from './styles';

const LocationTable = ({
  classes,
  state,
  currOpen,
  handleCurrOpen,
  handleSelect,
}) =>
  Object.keys(state).map((elem) => {
    const current = state[elem];
    const isOpen = currOpen === elem;
    const countList = current.list.length;

    return (
      <div key={elem}>
        <Grid
          container
          className="pointer"
          onClick={() => handleCurrOpen(elem)}
        >
          <Grid container justify="space-between">
            <Grid item>
              <div>
                {` ${elem} pièce${elem > 1 ? 's' : ''} à partir de `}

                <strong>{` ${spaceCurrency(current.minPrice)}€`}</strong>
              </div>
            </Grid>
            <Grid item className="text-center">
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
              <Grid item md={2} xs={5} className="text-center">
                Loyer mensuel
              </Grid>
              <Grid item md={2} xs={5} className="text-center">
                Dépot de garrantie
              </Grid>
              <Grid item md={2} xs={5} className="text-center">
                Surface
              </Grid>
              <Grid item md={2} xs={5} className="text-center">
                Étage
              </Grid>
              <Grid item md={2} xs={5} className="text-center">
                disponibilité
              </Grid>
              <Grid item md={2} xs={5} className="text-center">
                Réserver
              </Grid>
            </Grid>
            {current.list
              ?.sort((a, b) => a.price - b.price)
              .map((curr) => {
                const availableDate = locationAvailableDate(
                  curr.available_date,
                  curr.contract_end_date
                );
                const floor = curr.floor ? `Étage ${curr.floor}` : 'RDC';

                return (
                  <Grid
                    key={curr.ref}
                    container
                    className={classes.discoveryContent}
                  >
                    <Grid container>
                      <Grid container justify="space-between">
                        <span>Loyer mensuel</span>
                        <span>
                          <strong>{curr.price}</strong>€
                        </span>
                      </Grid>
                      <Grid container justify="space-between">
                        <span>Surface</span>
                        <span>{`${curr.surface}m²`}</span>
                      </Grid>
                      <Grid container justify="space-between">
                        <span>Étage</span>
                        <span>{floor}</span>
                      </Grid>
                      <Grid container justify="space-between">
                        <span>disponibilité</span>
                        <span>{availableDate}</span>
                      </Grid>
                      <Grid
                        item
                        className="text-center"
                        className={classes.btnContainer}
                      >
                        <Btn
                          text="Réserver"
                          whiteColor
                          boxShadow
                          onClick={() => handleSelect(curr)}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      alignItems="center"
                      className={classes.contentContainer}
                    >
                      <Grid item md={2} xs={5} className="text-center">
                        <strong>{curr.price}</strong>€
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {`${curr.guarantee}€`}
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {`${curr.surface}m²`}
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {floor}
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {availableDate}
                      </Grid>
                      <Grid item md={2} xs={5} className={classes.btnContainer}>
                        <Btn
                          onClick={() => handleSelect(curr)}
                          target="_blank"
                          dataMode="popup"
                          text="Envoyer une demande"
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
