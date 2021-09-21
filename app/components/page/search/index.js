/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  getPublicPropertiesApiMethod,
  getPropertiesByCoordApiMethod,
  addBookmarkApiMethod,
} from 'lib/api/customer';
import { toggleArray, isArray, pick } from 'helpers/convertAndCheck';
import { typeOfAnnonciesObj, sortByKeys } from 'helpers/property';
import NotFound from 'components/NotFound';
import { AdminContentWrapper } from 'components/wrapper';
import { MapsView } from './views';
import SearchFields from './searchFields';
import withStyles from './styles';

const pagePropertyWhilist = ['page', 'limit', 'totalPages'];
const isMapsView = false;
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
  const [center, setCenter] = useState([]);
  const [distance, setDistance] = useState(0);
  const [mapOptions, setMapOptions] = useState({});
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isFirstRequest, setIsFirstRequest] = useState(true);
  const [makeChangeRequest, setMakeChangeRequest] = useState(false);
  const [makeRequest, setMakeRequest] = useState(false);
  const [allData, setAllData] = useState(properties);
  const [state, setState] = useState(allData.docs);
  const [delimiter, setDelimiter] = useState({
    coord: allData.coord,
    department: allData?.department,
  });
  const [sortBy, setSortBy] = useState(sort || sortByKeys[0]);
  const [liked, setLiked] = useState(
    user?.bookmarks?.map((elem) => elem._id) || []
  );
  const [queryData, setQueryData] = useState({
    loc,
    maxPrice,
    typeOfAnnonce,
    sort,
    pieces,
  });

  const handleDistance = (distance) => setDistance(distance);
  const toggleRefresh = (refresh) => setRefresh(refresh);
  const toggleView = () => setCurrView(!currView);

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
        return +b.price - +a.price;
      })
    );
    setQueryData({ ...queryData, sort: value });
    Router.push(
      {
        query: {
          ...Router.query,
          sort: value,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  const handleBookmark = (id) => {
    setLiked(toggleArray(liked, id));
    addBookmarkApiMethod({ id }).then(({ user: currUser }) => update(currUser));
  };
  const handlePointChange = async (list, mapOptions = {}) => {
    if (isArray(mapOptions.center)) return;

    setMapOptions(mapOptions);
    setCenter(mapOptions.center);
    setList(list);
    setMakeChangeRequest(true);
  };

  const isLocation = typeOfAnnonce === typeOfAnnonciesObj.location;
  const requestData = async (page = 1) => {
    if (!queryData.maxPrice) queryData.maxPrice = -1;
    if (!queryData.loc) return (queryData.loc = null);

    const {
      list: { docs, near, zoom, coord, department, ...pageInfo } = {},
    } = await getPublicPropertiesApiMethod({
      ...queryData,
      page,
    });

    setState(docs);
    setAllData({ docs, near, zoom, department, coord });
    setDelimiter({ department, coord });
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const isMdView = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (isFirstRequest) return;
    setMakeRequest(true);
  }, [queryData.loc]);
  useEffect(() => {
    const fetchByCoord = async () => {
      if (!makeChangeRequest || isArray(center)) return;
      if (!queryData.maxPrice) queryData.maxPrice = -1;
      if (!queryData.loc) queryData.loc = null;

      const {
        list: { docs, near, zoom, ...pageInfo } = {},
      } = await getPropertiesByCoordApiMethod({
        ...queryData,
        loc: center,
        zoom: mapOptions.zoom,
        page: 1,
      });
      const listId = list
        ?.map(({ points = [] }) => points.map((e) => e.id))
        .flat();
      const newState = docs?.filter((e) => listId.includes(e._id));
      if (newState) setState(newState);
      setState(docs);
      setAllData({ docs, near, zoom, department: null });
      setPage(pick(pageInfo, pagePropertyWhilist));
      setMakeChangeRequest(false);
    };
    fetchByCoord();
  }, [makeChangeRequest]);

  useEffect(() => {
    if (makeRequest) {
      requestData();
      setMakeRequest(false);
    }
  }, [makeRequest]);

  if (!state) return <NotFound showLink={false} />;

  return (
    <AdminContentWrapper noRedirect noPadding>
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
          <MapsView
            allData={allData}
            queryData={queryData}
            delimiter={delimiter}
            isFirstRequest={isFirstRequest}
            data={state}
            liked={liked}
            sortBy={sortBy}
            refresh={refresh}
            handleBookmark={handleBookmark}
            handleSortSelect={handleSortSelect}
            toggleView={toggleView}
            page={page?.page}
            matches={matches}
            isMdView={isMdView}
            handlePointChange={handlePointChange}
            toggleRefresh={toggleRefresh}
            handleDistance={handleDistance}
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
  page: PropTypes.any,
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
