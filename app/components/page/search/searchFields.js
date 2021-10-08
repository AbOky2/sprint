import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { Icon } from 'components/form';
import { GoogleMaps, CustomInput } from 'components/form/Input';
import { DropdownSelect } from 'components/form/Select';
import { propertyPiecesSelectMap } from 'helpers';
import withStyles from './styles';

const searchFields = withStyles(
  ({
    classes,
    isLocation,
    isMdView,
    queryData,
    handleMapSearch,
    handleBudget,
    handleSumit,
    handleSelect,
    toggleView,
    isMapsView,
  }) => (
    <>
      <Grid
        container
        className={
          isLocation
            ? clsx(classes.searchContainer, classes.isLocation)
            : classes.searchContainer
        }
      >
        <Grid item md={isLocation ? 6 : 4}>
          <GoogleMaps
            name="loc"
            value={queryData.loc}
            onChange={handleMapSearch}
            placeholder={isMdView ? 'Où cherchez-vous ?' : 'Localisation'}
          />
          {isMdView && (
            <>
              <div onClick={handleSumit} className={classes.submit}>
                <Icon type="search" size="nearBig" color="white" />
              </div>
              <span className={classes.changeView} onClick={toggleView}>
                <Icon
                  type={isMapsView ? 'eyeClosed' : 'eyeOpened'}
                  color="newBlue"
                />
                <span>Carte</span>
              </span>
            </>
          )}
        </Grid>
        {!isLocation && !isMdView && (
          <Grid item md={4}>
            <DropdownSelect
              name="typeOfAnnonce"
              placeholder="Nombre de pièces"
              list={propertyPiecesSelectMap}
              value={queryData.pieces}
              onChange={handleSelect}
            />
          </Grid>
        )}
        {!isMdView && (
          <Grid
            item
            md={isLocation ? 6 : 4}
            className={clsx(classes.search, classes.locationMaxBudget)}
          >
            <CustomInput
              name="maxPrice"
              value={
                queryData.maxPrice > 0 && !Number.isNaN(queryData.maxPrice)
                  ? queryData.maxPrice
                  : ''
              }
              showSub={!isLocation}
              onChange={handleBudget}
              placeholder="Budget maximal"
              handleSumit={handleSumit}
            />
          </Grid>
        )}
      </Grid>
    </>
  )
);
searchFields.propTypes = {
  classes: PropTypes.object,
  isLocation: PropTypes.bool.isRequired,
  isMapsView: PropTypes.bool.isRequired,
  isMdView: PropTypes.bool.isRequired,
  queryData: PropTypes.object.isRequired,
  toggleView: PropTypes.func.isRequired,
  handleMapSearch: PropTypes.func.isRequired,
  handleBudget: PropTypes.func.isRequired,
  handleSumit: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
export default searchFields;
