import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import MultiMaps from 'components/Maps/MultiMaps';
import { MapsCarousel } from 'components/Carrousel';
import { Icon, Checkbox } from 'components/form';
import { sortByKeys } from 'helpers/property';
import { defaultLimit } from 'helpers/query';
import { ListWrapper, ListElement } from './partials';
import withStyles from '../styles';

const ListContainer = ({
  classes,
  sortBy,
  curr,
  isMapsView,
  handleSortSelect,
  hasData,
  page,
  matches,
  handlePage,
  handleMouseEnter,
  liked,
  handleBookmark,
}) => (
  <Grid item xs={5} className={classes.listViewContainer}>
    <ListWrapper
      classes={classes}
      sortBy={sortBy}
      isMapsView={isMapsView}
      handleSortSelect={handleSortSelect}
      hasData={hasData}
      page={page}
      matches={matches}
      handlePage={handlePage}
    >
      {page.pageList?.map((elems) => (
        <ListElement
          key={elems._id}
          handleMouseEnter={handleMouseEnter(elems._id)}
          handleMouseLeave={handleMouseEnter(null)}
          className={
            elems._id !== curr?._id
              ? classes.mapsListContainer
              : clsx(classes.mapsListContainer, classes.mapsCurrListContainer)
          }
          liked={liked}
          handleBookmark={handleBookmark}
          {...elems}
        />
      ))}
    </ListWrapper>
  </Grid>
);

const MapsContainer = ({
  classes,
  data,
  pageList,
  curr,
  liked,
  allData,
  isMdView,
  reloadMaps,
  refresh,
  queryData,
  isMapsView,
  toggleView,
  toggleReloadMaps,
  toggleRefresh,
  index,
  handleDistance,
  handleBookmark,
  handleChildClick,
  handlePointChange,
  handleCarouselChange,
}) => (
  <Grid item md={isMapsView ? 12 : 7} xs={12}>
    <MultiMaps
      data={allData}
      queryData={queryData}
      pageList={pageList}
      curr={curr}
      isMobile={isMdView}
      liked={liked}
      reloadMaps={reloadMaps}
      refresh={refresh}
      toggleRefresh={toggleRefresh}
      handleDistance={handleDistance}
      handleChildClick={handleChildClick}
      handlePointChange={handlePointChange}
      handleBookmark={handleBookmark}
    />
    <Grid container className={classes.changeViewContainer}>
      <div className={classes.changeView} onClick={toggleView}>
        {isMapsView && <span>Afficher la liste</span>}
        <Icon
          type="sliderArrow"
          size="small"
          color="newBlue"
          rotate={isMapsView ? '0' : '180deg'}
        />
      </div>
    </Grid>
    <Grid container className={classes.reloadMapsContainer} direction="column">
      <Checkbox
        checked={reloadMaps}
        bordered
        cornered
        label="Actualiser quand je déplace la carte"
        onChange={toggleReloadMaps}
      />
      {!reloadMaps ? (
        <Grid container alignItems="center" onClick={() => toggleRefresh(true)}>
          <Icon type="refresh" size="small" color="white" />
          <Typography>Rafraichir</Typography>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
    {isMdView && (
      <Grid container>
        <MapsCarousel index={index} handleChange={handleCarouselChange}>
          {data?.map(({ city, postal, ...elems }) => (
            <ListElement
              key={elems._id}
              className={clsx(
                classes.mapsListContainer,
                classes.mapsMobileListContainer
              )}
              showLikes={false}
              handleBookmark={handleBookmark}
              {...elems}
            />
          ))}
        </MapsCarousel>
      </Grid>
    )}
  </Grid>
);

const MapsView = withRouter(
  withStyles(
    ({
      classes,
      liked,
      refresh,
      handleBookmark,
      queryData,
      toggleView,
      toggleRefresh,
      data = [],
      allData = [],
      page: defaultPage,
      matches,
      isMapsView,
      isMdView,
      handlePointChange,
      handleDistance,
      sortBy,
      handleSortSelect,
      router,
    }) => {
      const [page, setPage] = useState({
        pageList: data?.slice(0, defaultLimit),
        limit: defaultLimit,
        page: defaultPage,
        totalPages: data?.length,
      });
      const locs = data?.map((e, index) => ({
        index,
        _id: e._id,
        coor: e.loc?.coordinates,
      }));
      const [curr, setCurr] = useState(null);
      const [reloadMaps, setReloadMaps] = useState(true);
      const [carrouselIndex, setCarrouselIndex] = useState(0);
      const getChildPostion = () => {
        const bounds = document
          .getElementById('maps-container')
          ?.getBoundingClientRect();
        if (!bounds || !window?.event) return {};

        const e = window.event;
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        return {
          isTop: bounds.height / 2 < bounds.height - y,
          isLeft: bounds.width / 2 < bounds.width - x,
        };
      };
      const toggleReloadMaps = (reloadMaps) => setReloadMaps(!!reloadMaps);
      const handleChildClick = (id) => {
        const currIndex = locs.findIndex((e) => id?.includes(e._id));
        const found = data[currIndex];
        let newCurr = { showInfoWindow: false, ...getChildPostion() };

        setCarrouselIndex(currIndex);
        if (found) newCurr = { ...found, ...newCurr, showInfoWindow: true };
        setCurr(newCurr);
      };
      const handleCarouselChange = (index) => setCurr(data[index]);
      const handleMouseEnter = (id) => () => {
        if (!id) return setCurr(null);

        const currIndex = data.findIndex((e) => e._id === id);
        setCurr({ ...data[currIndex], showInfoWindow: false });
      };
      const paginate = (page_number) =>
        data?.slice((page_number - 1) * page.limit, page_number * page.limit) ||
        [];
      const handlePage = (e, pageOffset) => {
        e.preventDefault();
        setPage({ ...page, page: pageOffset });
        router.push(
          {
            query: {
              ...router.query,
              page: pageOffset,
            },
          },
          undefined,
          { shallow: true }
        );
      };
      useEffect(
        () =>
          setPage({
            ...page,
            pageList: paginate(page.page),
          }),
        [page.page]
      );
      useEffect(() => {
        const currPage = defaultPage || 1;

        setPage({
          ...page,
          page: currPage,
          pageList: paginate(currPage),
          totalPages: Math.ceil(data?.length / page.limit),
        });
      }, [data, data[0], defaultPage]);

      return (
        <Grid
          container
          className={clsx(
            classes.mapsViewContainer,
            isMapsView ? classes.fullMapsViewContainer : '',
            isMdView ? classes.mdMapsViewContainer : ''
          )}
        >
          {!isMapsView && (
            <ListContainer
              classes={classes}
              curr={curr}
              sortBy={sortBy}
              isMapsView={isMapsView}
              handleSortSelect={handleSortSelect}
              handleMouseEnter={handleMouseEnter}
              hasData={data.length}
              page={page}
              matches={matches}
              handlePage={handlePage}
              liked={liked}
              handleBookmark={handleBookmark}
            />
          )}
          <MapsContainer
            classes={classes}
            index={carrouselIndex}
            allData={allData}
            data={data}
            queryData={queryData}
            isMapsView={isMapsView}
            isMdView={isMdView}
            reloadMaps={reloadMaps}
            refresh={refresh}
            pageList={page?.pageList?.map((e) => e._id)}
            curr={curr}
            handleChildClick={handleChildClick}
            handleCarouselChange={handleCarouselChange}
            handlePointChange={handlePointChange}
            handleDistance={handleDistance}
            liked={liked}
            toggleView={toggleView}
            toggleReloadMaps={toggleReloadMaps}
            toggleRefresh={toggleRefresh}
            handleBookmark={handleBookmark}
          />
        </Grid>
      );
    }
  )
);

const sharedProptypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  queryData: PropTypes.object.isRequired,
  allData: PropTypes.arrayOf(PropTypes.object),
  sortBy: PropTypes.oneOf(sortByKeys).isRequired,
  liked: PropTypes.array.isRequired,
  isMapsView: PropTypes.bool.isRequired,
  isMdView: PropTypes.bool.isRequired,
  refresh: PropTypes.bool.isRequired,
  toggleView: PropTypes.func.isRequired,
  handleSortSelect: PropTypes.func.isRequired,
  handleBookmark: PropTypes.func.isRequired,
  handlePointChange: PropTypes.func.isRequired,
  handleDistance: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  matches: PropTypes.bool.isRequired,
  handlePage: PropTypes.func.isRequired,
  toggleRefresh: PropTypes.func.isRequired,
};
MapsView.propTypes = sharedProptypes;

export { MapsView };
