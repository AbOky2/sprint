/* eslint-disable react/jsx-no-duplicate-props */
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { spaceCurrency, locationAvailableDate } from 'helpers/convertAndCheck';
import { Icon, Btn } from 'components/form';
import styles from './styles';

const LocationTable = ({ classes, state, currOpen, handleCurrOpen, handleSelect }) =>
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
                Réserver
              </Grid>
            </Grid>
            {current.list
              ?.sort((a, b) => a.price - b.price)
              .map((curr) => {
                const availableDate = locationAvailableDate(
                  curr.available_date,
                  curr.contract_end_date,
                );
                const floor = curr.floor ? `Étage ${curr.floor}` : 'RDC';

                return (
                  <Grid key={curr.ref} container className={classes.discoveryContent}>
                    <Grid container>
                      <Grid container justify="space-between">
                        <span>Loyer/mois</span>
                        <span>
                          <strong>{curr.price}</strong>
€
</span>
                      </Grid>
                      <Grid container justify="space-between">
                        <span>Superficie</span>
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
                      <Grid item className="text-center" className={classes.btnContainer}>
                        <Btn text="Réserver" whiteColor onClick={()=>handleSelect(curr)}/>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item md={2} xs={5} className="text-center">
                        {`${curr.surface}m²`}
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {floor}
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {availableDate}
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        <strong>{curr.price}</strong>€
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {`${curr.guarantee}€`}
                      </Grid>
                      <Grid item md={2} xs={5} className={classes.btnContainer}>
                        <Btn
                          onClick={()=>handleSelect(curr)}
                          target="_blank"
                          dataMode="popup"
                          text="Réserver"
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
