import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { GoogleMaps, CustomInput } from 'components/form/Input';
import { DropdownSelect } from 'components/form/Select';
import { propertyPiecesSelectMap } from 'helpers/property';
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
            placeholder="Localisation"
          />
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
searchFields.PropTypes = {
  classes: PropTypes.object.isRequired,
  isLocation: PropTypes.bool.isRequired,
  isMdView: PropTypes.bool.isRequired,
  queryData: PropTypes.object.isRequired,
  handleMapSearch: PropTypes.func.isRequired,
  handleBudget: PropTypes.func.isRequired,
  handleSumit: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
export default searchFields;
