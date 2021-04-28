import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import MultiMaps from 'components/Maps/MultiMaps';
import { MapsCarousel } from 'components/Carrousel';
import { Icon } from 'components/form';
import { sortByKeys } from 'helpers/property';
import { ListWrapper, ListElement } from './partials';
import { defaultLimit } from 'helpers/query';
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
  queryData,
  isMapsView,
  toggleView,
  index,
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
      handleChildClick={handleChildClick}
      isMobile={isMdView}
      handlePointChange={handlePointChange}
      liked={liked}
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

const MapsView = withStyles(
  ({
    classes,
    liked,
    handleBookmark,
    queryData,
    toggleView,
    data = [],
    allData = [],
    page: defaultPage,
    matches,
    isMapsView,
    isMdView,
    handlePointChange,
    sortBy,
    handleSortSelect,
  }) => {
    const [page, setPage] = useState({
      pageList: data?.slice(10),
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
    const handleChildClick = (id) => {
      const currIndex = locs.findIndex((e) => id.includes(e._id));
      const found = data[currIndex];

      setCarrouselIndex(currIndex);
      if (found) {
        setCurr({ ...found, showInfoWindow: true, ...getChildPostion() });
      }
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
      console.log(e);
      setPage({ ...page, page: pageOffset });
    };
    useEffect(() => {
      setPage({
        ...page,
        pageList: paginate(page.page),
      });
    }, [page.page]);
    useEffect(() => {
      setPage({
        ...page,
        page: 1,
        pageList: data?.slice(0, 10),
        totalPages: Math.ceil(data?.length / page.limit),
      });
      console.log(data.length, data?.slice(0, 10));
    }, [data]);
    // console.log(page, data);
    return (
      <Grid
        container
        className={clsx(
          classes.mapsViewContainer,
          isMapsView ? classes.fullMapsViewContainer : ''
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
          pageList={page?.pageList?.map((e) => e._id)}
          curr={curr}
          handleChildClick={handleChildClick}
          handleCarouselChange={handleCarouselChange}
          isMobile={isMdView}
          handlePointChange={handlePointChange}
          liked={liked}
          toggleView={toggleView}
          handleBookmark={handleBookmark}
        />
      </Grid>
    );
  }
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
  toggleView: PropTypes.func.isRequired,
  handleSortSelect: PropTypes.func.isRequired,
  handleBookmark: PropTypes.func.isRequired,
  handlePointChange: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  matches: PropTypes.bool.isRequired,
  handlePage: PropTypes.func.isRequired,
};
MapsView.PropTypes = sharedProptypes;

export { MapsView };
