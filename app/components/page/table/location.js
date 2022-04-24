/* eslint-disable react/jsx-no-duplicate-props */
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { spaceCurrency, locationAvailableDate } from 'helpers';
import { Icon, Btn } from 'components';
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
    const surface =
      current.minSurface === current.maxSurface
        ? ` ${current.minSurface}m²`
        : ` de ${current.minSurface}m² à ${current.maxSurface}m²`;

    return (
      <div key={elem} className="flex flex-col justify-center p-4 bg-white border rounded-xl border-_rougeStudea w-96 items-center">
        <Grid
          container
          className="pointer"
          alignItems="center"
          onClick={() => handleCurrOpen(elem)}
        >
          <Grid container justify="space-between">
            <Grid item>
              <div className=' text-_rougeStudea'>
                {` ${elem} pièce${elem > 1 ? 's' : ''} à partir de `}

                <strong>{` ${spaceCurrency(current.minPrice)}€`}</strong>
              </div>
            </Grid>
            <Grid item className="text-center">
              <Icon
                type={isOpen ? 'less' : 'plus'}
                color="red"
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
              {surface}
            </Typography>
          </Grid>
          <Grid
            item
            md={3}
            xs={5}
            className={clsx(classes.header, classes.headerPricing)}
          >
            <p className="text-2xl font-medium text-left text-_rougeStudea mx-4">
              à partir de
              <strong>{` ${spaceCurrency(current.minPrice)}€`}</strong>
            </p>
          </Grid>
          <Grid item md={3} xs={5} className={classes.header}>
          <p className="text-2xl font-medium text-left text-_rougeStudea mx-4">
              {`${countList} logement${countList > 1 ? 's' : ''} disponible${
                countList > 1 ? 's' : ''
              }`}
            </p>
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
                       <div className='flex flex-col items-center md:items-end w-full'>
                            <div className='flex flex-row justify-between mb-1'>
                            <p className="w-44 h-5 text-sm font-medium ">Loyer Mensuel</p>
                            <p className="w-44 h-5 text-sm font-medium justify-end flex">{curr.price} €</p>
                            </div>
                            <div className='flex flex-row  mb-1'>
                            <p className="w-44 h-5 text-sm font-medium">Surface</p>
                            <p className="w-44 h-5 text-sm font-medium justify-end flex">{`${curr.surface}m²`}</p>
                              <span></span>
                            </div>
                            <div className='flex flex-row mb-1'>
                            <p className="w-44 h-5 text-sm font-medium">Étage</p>
                            <p className="w-44 h-5 text-sm font-medium justify-end flex">{floor} </p>
                              
                            </div>
                            <div className='flex flex-row mb-1'>
                              <p className="w-44 h-5 text-sm font-medium">disponibilité</p>
                              <p className="w-44 h-5 text-sm font-medium justify-end flex">{availableDate}</p>
                              
                            </div>
                            <div
                              className="text-center" item
                            >
                              
                              <div className="flex justify-center items-center w-_344 relative gap-2.5 px-32 py-4 rounded-xl mb-1 mt-8 bg-_rougeStudea cursor-pointer" onClick={() =>handleSelect(curr)} >
                              <button className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white" >
                                Réserver.
                              </button></div>
                            </div>

                       </div>
                       
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
                                bordered
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
