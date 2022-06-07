import { Grid, Typography } from '@material-ui/core';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import {
  spaceCurrency,
  round10,
  individualAdvantages,
  reducedVat,
} from 'helpers';
import { Icon, Btn } from 'components';
import { NEXT_PUBLIC_UPLOAD_URL } from 'config';
import styles from './styles';

const LocationTable = ({
  classes,
  state,
  user,
  currOpen,
  handleCurrOpen,
  setShowAuthModal,
}) =>
  Object.keys(state).map((elem) => {
    const current = state[elem];
    const isOpen = currOpen === elem;
    const countList = current.list.length;
    const surface =
      current.minSurface === current.maxSurface
        ? ` ${current.minSurface}m²`
        : ` de ${current.minSurface}m² à ${current.maxSurface}m²`;
    const vat = parseFloat(current.vat);
    const hasReduction = vat === reducedVat || vat === 0;
    const conditionalColumn = hasReduction ? 1 : 2;

    return (
      <div
        key={elem}
        className="flex flex-col space-x-3 items-start justify-center p-4 bg-white border rounded-xl border-_aPropos w-96 mb-4"
      >
        <Grid
          container
          className="pointer"
          alignItems="center"
          onClick={() => handleCurrOpen(elem)}
        >
          <Grid container justify="space-between">
            <Grid item>
              <div
                style={{
                  color: 'rgba(79, 128, 255, 1)',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '17px',
                }}
              >
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
            <Typography>
              <Icon type="door" color="newBlue" />
              {` ${elem} pièce${elem > 1 ? 's' : ''}`}
            </Typography>
          </Grid>
          <Grid item md={3} xs={5} className={classes.header}>
            <Typography>
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
            <Typography>
              <span>à partir de</span>
              <strong>{` ${spaceCurrency(current.minPrice)}€`}</strong>
            </Typography>
          </Grid>
          <Grid item md={3} xs={5} className={classes.header}>
            <Typography>
              {`${countList} logement${countList > 1 ? 's' : ''} disponible${
                countList > 1 ? 's' : ''
              }`}
            </Typography>
          </Grid>
          <Grid item md={1} xs={5} className="text-center pointer">
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
              {hasReduction && (
                <Grid item md={2} xs={2} className="text-center">
                  {`TVA réduite${vat ? ` ${vat}%` : ''}`}
                </Grid>
              )}
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
              <Grid
                item
                md={conditionalColumn}
                xs={conditionalColumn}
                className="text-center"
              >
                Parking
              </Grid>
              <Grid
                item
                md={conditionalColumn}
                xs={conditionalColumn}
                className="text-center"
              >
                Les +
              </Grid>
              <Grid item md={2} xs={2} className="text-center">
                Plan 2D
              </Grid>
            </Grid>
            {current.list
              ?.sort((a, b) => a.price - b.price)
              .map((curr) => {
                const price = spaceCurrency(curr.price);
                const orientation = curr.orientation ?? '-';
                const floor = curr.floor
                  ? curr.floor > 1
                    ? `${curr.floor}ème étage`
                    : '1er étage'
                  : 'RDC';
                const parking = curr.nb_parking
                  ? `${curr.nb_parking} inclus`
                  : '-';
                const advantages = curr.advantages
                  ?.filter((e) => individualAdvantages.includes(e))
                  .join(', ');
                const standardTva = (curr.price / 1.055) * 1.2;
                const vatPrice =
                  hasReduction && !vat
                    ? '-'
                    : !hasReduction
                    ? price
                    : `${spaceCurrency(round10(standardTva, 1))}€`;

                return (
                  <Grid
                    key={curr.lot_ref}
                    container
                    className={classes.discoveryContent}
                  >
                    <Grid container>
                      {hasReduction && (
                        <Grid container justify="space-between">
                          <span>{`TVA réduite${vat ? ` ${vat}%` : ''}`}</span>
                          <strong>{`${price}€`}</strong>
                        </Grid>
                      )}
                      <div className="flex flex-col items-center md:items-end w-full">
                        <div className="flex flex-row justify-between mb-1">
                          <p className="w-44 h-5 text-sm font-medium">
                            Prix TVA 20%
                          </p>
                          <p className="w-44 h-5 text-sm font-medium justify-end flex">
                            {vatPrice}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between mb-1">
                          <p className="w-44 h-5 text-sm font-medium">
                            Surface
                          </p>
                          <p className="w-44 h-5 text-sm font-medium justify-end flex">{`${curr.surface}m²`}</p>
                        </div>
                        <div className="flex flex-row justify-between mb-1">
                          <p className="w-44 h-5 text-sm font-medium">Étage</p>
                          <p className="w-44 h-5 text-sm font-medium justify-end flex">
                            {floor}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between mb-1">
                          <p className="w-44 h-5 text-sm font-medium">
                            Orientation
                          </p>
                          <p className="w-44 h-5 text-sm font-medium justify-end flex">
                            {orientation}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between mb-1">
                          <p className="w-44 h-5 text-sm font-medium">
                            Parking
                          </p>
                          <p className="w-44 h-5 text-sm font-medium justify-end flex">
                            {parking}
                          </p>
                        </div>
                      </div>

                      <Grid item className={classes.btnContainer}>
                        <a
                          className="flex justify-center items-center w-_344 relative gap-2.5 px-32 py-4 rounded-xl mb-10 mt-8"
                          // href={NEXT_PUBLIC_UPLOAD_URL + curr.file}
                          onClick={() =>
                            setShowAuthModal(NEXT_PUBLIC_UPLOAD_URL + curr.file)
                          }
                          style={{
                            background:
                              'linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)',
                          }}
                        >
                          <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
                            {curr.file ? 'Telecharger le plan en 2D' : '-'}
                          </p>
                        </a>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      alignItems="center"
                      className={classes.contentContainer}
                    >
                      {hasReduction && (
                        <Grid item md={2} xs={2} className="text-center">
                          {price}€
                        </Grid>
                      )}
                      <Grid item md={2} xs={2} className="text-center">
                        {vatPrice}
                      </Grid>
                      <Grid item md={1} xs={1} className="text-center">
                        {`${curr.surface}m²`}
                      </Grid>
                      <Grid item md={2} xs={2} className="text-center">
                        {floor}
                      </Grid>
                      <Grid item md={1} xs={1} className="text-center">
                        {orientation}
                      </Grid>
                      <Grid
                        item
                        md={conditionalColumn}
                        xs={conditionalColumn}
                        className="text-center"
                      >
                        {parking}
                      </Grid>
                      <Grid
                        item
                        md={conditionalColumn}
                        xs={conditionalColumn}
                        className="text-center"
                      >
                        {advantages.length ? advantages : '-'}
                      </Grid>
                      <Grid item md={2} xs={2} className={classes.btnContainer}>
                        <Btn
                          text={curr.file ? 'Voir le plan' : '-'}
                          // href={NEXT_PUBLIC_UPLOAD_URL + curr.file}
                          onClick={() =>
                            setShowAuthModal(NEXT_PUBLIC_UPLOAD_URL + curr.file)
                          }
                          download
                          disabled={!curr.file}
                          target="_blank"
                          dataMode="popup"
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
