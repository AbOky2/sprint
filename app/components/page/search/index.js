/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { getPropertiesApiMethod, addBookmarkApiMethod } from 'lib/api/customer';
import { toggleArray, isArray, pick } from 'helpers/convertAndCheck';
import { typeOfAnnonciesObj, sortByKeys } from 'helpers/property';
import { pages } from 'helpers/query';
import NotFound from 'components/NotFound';
import { AdminContentWrapper } from 'components/wrapper';
import { ListView, MapsView } from './views';
import SearchFields from './searchFields';
import withStyles from './styles';

const pagePropertyWhilist = ['page', 'limit', 'totalPages'];
const isMapsView = true;
const SearchPage = ({
  classes,
  user,
  properties = {},
  typeOfAnnonce,
  update,
  loc,
  page: defaultPage,
  maxPrice,
  sort,
  pieces = [],
}) => {
  const [page, setPage] = useState({
    ...pick(properties, pagePropertyWhilist),
    page: defaultPage,
  });
  const [currView, setCurrView] = useState(isMapsView);
  const [makeRequest, setMakeRequest] = useState(false);
  const [allData, setAllData] = useState(properties);
  const [state, setState] = useState([]);
  const [sortBy, setSortBy] = useState(sort || sortByKeys[0]);
  const [queryData, setQueryData] = useState({
    loc,
    maxPrice,
    typeOfAnnonce,
    sort,
    pieces,
  });

  const toggleView = () => setCurrView(!currView);
  const [liked, setLiked] = useState(user?.bookmarks?.map((elem) => elem._id));

  const handleBudget = (value) =>
    setQueryData({ ...queryData, maxPrice: value });
  const handleMapSearch = (value) => {
    setQueryData({ ...queryData, loc: value?.label });
    setMakeRequest(true);
  };
  const handleSelect = (arg) => {
    let pieces = isArray(arg) ? arg : [arg];

    pieces = pieces.map((e) => parseInt(e, 10));
    setQueryData({ ...queryData, pieces });
  };
  const handleSortSelect = () => ({ target: { value } }) => {
    setSortBy(value);
    setState(
      state.sort((a, b) => {
        if (value === sortByKeys[0]) return +a.price - +b.price;
        else return +b.price - +a.price;
      })
    );
    // setQueryData({ ...queryData, sort: value });
    // setMakeRequest(true);
  };
  const handleBookmark = (id) => {
    setLiked(toggleArray(liked, id));
    addBookmarkApiMethod({ id }).then(({ user: currUser }) => update(currUser));
  };
  const handlePointChange = (list) => {
    const listId = list
      .map(({ points = [] }) => points.map((e) => e.id))
      .flat();
    const newState = properties.docs.filter((e) => listId.includes(e._id));
    setState(newState);
  };

  const isLocation = typeOfAnnonce === typeOfAnnonciesObj.location;
  const requestData = async (page = 1) => {
    if (!queryData.maxPrice) queryData.maxPrice = -1;
    if (!queryData.loc) queryData.loc = null;

    const {
      list: { docs, near, ...pageInfo } = {},
    } = await getPropertiesApiMethod({
      ...queryData,
      page,
    });
    setState(docs);
    setAllData({ docs, near });
    setPage(pick(pageInfo, pagePropertyWhilist));

    Router.push(
      {
        query: {
          listView: currView,
          page: pageInfo.page,
          loc: queryData.loc,
          sort: sortBy,
          maxPrice: queryData.maxPrice,
          ...(isLocation ? {} : { pieces: queryData.pieces }),
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
  const isMdView = useMediaQuery(theme.breakpoints.down('sm'));
  const View = currView ? MapsView : ListView;

  useEffect(() => {
    if (makeRequest) {
      requestData();
      setMakeRequest(false);
    }
  }, [makeRequest]);

  if (!state) return <NotFound showLink={false} />;

  return (
    <AdminContentWrapper redirectDashboard href={pages.dashboard}>
      <div>
        <div
          className={
            isMdView && !currView
              ? clsx(
                  classes.searchMapContainer,
                  classes.resetSearchMapContainer
                )
              : classes.searchMapContainer
          }
        >
          <SearchFields
            isLocation={isLocation}
            queryData={queryData}
            isMdView={isMdView}
            handleMapSearch={handleMapSearch}
            handleBudget={handleBudget}
            handleSumit={handleSumit}
            toggleView={toggleView}
            handleSelect={handleSelect}
            isMapsView={currView}
          />
          <View
            allData={allData}
            queryData={queryData}
            data={state}
            liked={liked}
            sortBy={sortBy}
            handleBookmark={handleBookmark}
            handleSortSelect={handleSortSelect}
            toggleView={toggleView}
            page={page}
            matches={matches}
            isMdView={isMdView}
            handlePage={handlePage}
            handlePointChange={handlePointChange}
            isMapsView={currView}
          />
        </div>
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
  pieces: PropTypes.array,
  update: PropTypes.func.isRequired,
  loc: PropTypes.string,
};
SearchPage.defaultProps = {
  loc: '',
  page: '1',
  maxPrice: null,
  pieces: [],
};
export default withRouter(withStyles(SearchPage));
