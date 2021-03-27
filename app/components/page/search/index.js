/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { getPropertiesApiMethod, addBookmarkApiMethod } from 'lib/api/customer';
import { toggleArray, pick } from 'helpers/convertAndCheck';
import { typeOfAnnonciesObj, sortByKeys } from 'helpers/property';
import { pages } from 'helpers/query';
import { AdminContentWrapper } from 'components/wrapper';
import { ListView, MapsView } from './view';
import SearchFields from './searchFields';
import Instructions from './instructions';

const pagePropertyWhilist = ['page', 'limit', 'totalPages'];
const isMapsView = true;
const SearchPage = ({
  user,
  properties = {},
  typeOfProperty = [],
  typeOfAnnonce,
  listView,
  update,
  loc,
  page: defaultPage,
  maxPrice,
}) => {
  const [page, setPage] = useState({
    ...pick(properties, pagePropertyWhilist),
    page: defaultPage,
  });
  const [currView, setCurrView] = useState(isMapsView);
  const [state, setState] = useState(properties.docs);
  const [queryData, setQueryData] = useState({
    loc,
    maxPrice,
    typeOfAnnonce,
    typeOfProperty,
  });
  const [sortBy, setSortBy] = useState(sortByKeys[0]);
  const [showMaps, setShowMaps] = useState(false);

  const toggleView = () => setCurrView(!currView);
  const [liked, setLiked] = useState(user?.bookmarks?.map((elem) => elem._id));
  const handleBudget = (value) =>
    setQueryData({ ...queryData, maxPrice: value });
  const handleMapSearch = (value) =>
    setQueryData({ ...queryData, loc: value?.label });
  const handleSelect = (newTypeOfProperty) =>
    setQueryData({ ...queryData, typeOfProperty: newTypeOfProperty });
  const handleSetShowMaps = (e) => setShowMaps(true);
  const handleSortSelect = () => ({ target: { value } }) => setSortBy(value);
  const handleBookmark = (id) => {
    setLiked(toggleArray(liked, id));
    addBookmarkApiMethod({ id }).then(({ user: currUser }) => update(currUser));
  };

  const isLocation = typeOfAnnonce === typeOfAnnonciesObj.location;
  const requestData = async (page = 1) => {
    if (!queryData.maxPrice) queryData.maxPrice = -1;
    if (!queryData.loc) queryData.loc = null;

    const { typeOfProperty, ...requestParams } = queryData;
    const { list: { docs, ...pageInfo } = {} } = await getPropertiesApiMethod({
      ...(isLocation ? {} : { typeOfProperty }),
      ...requestParams,
      page,
    });
    setState(docs);
    setPage(pick(pageInfo, pagePropertyWhilist));

    Router.push(
      {
        query: {
          listView: currView,
          page: pageInfo.page,
          loc: queryData.loc,
          maxPrice: queryData.maxPrice,
          ...(isLocation ? {} : { typeOfProperty }),
        },
      },
      undefined,
      { shallow: true }
    );
  };
  const handleSumit = () => requestData();
  const handlePage = (e, pageOffset) => requestData(pageOffset);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const View = currView ? MapsView : ListView;

  return (
    <AdminContentWrapper redirectDashboard href={pages.dashboard}>
      <div>
        {!isLocation && <Instructions />}
        <SearchFields
          isLocation={isLocation}
          queryData={queryData}
          handleMapSearch={handleMapSearch}
          handleBudget={handleBudget}
          handleSumit={handleSumit}
          handleSelect={handleSelect}
        />
        <View
          data={state}
          liked={liked}
          sortBy={sortBy}
          showMaps={showMaps}
          handleSetShowMaps={handleSetShowMaps}
          handleBookmark={handleBookmark}
          handleSortSelect={handleSortSelect}
          toggleView={toggleView}
          page={page}
          matches={matches}
          handlePage={handlePage}
          isMapsView={currView}
        />
      </div>
    </AdminContentWrapper>
  );
};
SearchPage.propTypes = {
  user: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
  maxPrice: PropTypes.string,
  page: PropTypes.string,
  typeOfAnnonce: PropTypes.string.isRequired,
  typeOfProperty: PropTypes.any,
  update: PropTypes.func.isRequired,
  loc: PropTypes.string,
};
SearchPage.defaultProps = {
  loc: '',
  page: '1',
  maxPrice: null,
  typeOfProperty: [],
};
export default withRouter(SearchPage);
