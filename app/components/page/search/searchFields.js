import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { Icon, Input } from 'components/form';
import { GoogleMaps } from 'components/form/Input';
import Select, { DropdownSelect } from 'components/form/Select';
import {
  typeOfProperties,
  sortByKeys,
  sortBySelectMap,
} from 'helpers/property';
import withStyles from './styles';

const searchFields = withStyles(
  ({
    classes,
    isLocation,
    queryData,
    handleMapSearch,
    handleSearch,
    handleSumit,
    handleSelect,
    handleSortSelect,
    sortBy,
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
            placeholder="Localisation"
          />
        </Grid>
        {!isLocation && (
          <Grid item md={4}>
            <DropdownSelect
              name="typeOfAnnonce"
              placeholder="Type de bien"
              list={typeOfProperties.map((name) => ({ name, value: name }))}
              value={queryData.typeOfProperty}
              onChange={handleSelect}
            />
          </Grid>
        )}
        <Grid
          item
          md={isLocation ? 6 : 4}
          className={clsx(classes.search, classes.locationMaxBudget)}
        >
          <Input
            name="maxPrice"
            value={
              queryData.maxPrice > 0 && !Number.isNaN(queryData.maxPrice)
                ? queryData.maxPrice
                : ''
            }
            onChange={handleSearch}
            placeholder="Budget maximal"
          />
          <div onClick={handleSumit} className="pointer">
            <Icon type="search" size="large" color="white" />
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        item
        md={5}
        xs={12}
        alignItems="center"
        justify="space-between"
        className={classes.sortContainer}
      >
        <Grid item md={6} xs={12}>
          <Select
            name="sort"
            placeholder="Type de bien"
            list={sortBySelectMap}
            value={sortBy}
            onChange={handleSortSelect}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <div className={classes.changeView} onClick={toggleView}>
            <Icon
              type={isMapsView ? 'eyeClosed' : 'eyeOpened'}
              color="newBlue"
            />
            <span>{`${isMapsView ? 'Masquer' : 'Afficher'} la carte`}</span>
          </div>
        </Grid>
      </Grid>
    </>
  )
);
searchFields.PropTypes = {
  classes: PropTypes.object.isRequired,
  isLocation: PropTypes.bool.isRequired,
  queryData: PropTypes.object.isRequired,
  isMapsView: PropTypes.bool.isRequired,
  sortBy: PropTypes.oneOf(sortByKeys).isRequired,
  handleMapSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSumit: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleSortSelect: PropTypes.func.isRequired,
  toggleView: PropTypes.func.isRequired,
};
export default searchFields;
