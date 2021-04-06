import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import MultiMaps from 'components/Maps/MultiMaps';

import { MapsCarousel } from 'components/Carrousel';
import { sortByKeys } from 'helpers/property';
import { ListWrapper, ListElement } from './partials';
import withStyles from '../styles';

const ListView = withStyles(
  ({
    classes,
    data,
    liked,
    isMapsView,
    handleBookmark,
    page,
    matches,
    handlePage,
    toggleView,
    sortBy,
    handleSortSelect,
  }) => (
    <>
      <ListWrapper
        classes={classes}
        sortBy={sortBy}
        toggleView={toggleView}
        isMapsView={isMapsView}
        handleSortSelect={handleSortSelect}
        hasData={data.length}
        page={page}
        matches={matches}
        handlePage={handlePage}
        isMapsView={isMapsView}
      >
        {data?.map((elems) => (
          <ListElement
            key={elems._id}
            className={classes.listContainer}
            liked={liked}
            handleBookmark={handleBookmark}
            {...elems}
          />
        ))}
      </ListWrapper>
    </>
  )
);

const MapsView = withStyles(
  ({
    classes,
    liked,
    handleBookmark,
    toggleView,
    data = [],
    allData = [],
    page,
    matches,
    handlePage,
    isMapsView,
    isMdView,
    handlePointChange,
    sortBy,
    handleSortSelect,
  }) => {
    const locs = data?.map((e, index) => ({
      index,
      _id: e._id,
      coor: e.loc?.coordinates,
    }));
    const [curr, setCurr] = useState(null);
    const [carrouselIndex, setCarrouselIndex] = useState(0);
    const handleChildClick = (id) => {
      const currIndex = locs.findIndex((e) => id.includes(e._id));
      const found = data[currIndex];

      setCarrouselIndex(currIndex);
      if (found) setCurr(found);
    };
    const handleCarouselChange = (index) => setCurr(data[index]);
    const handleMouseEnter = (id) => () => {
      if (!id) return setCurr(null);

      const currIndex = data.findIndex((e) => e._id === id);
      setCurr(data[currIndex]);
    };

    return (
      <Grid container className={classes.mapsViewContainer}>
        <Grid item xs={5}>
          <ListWrapper
            classes={classes}
            sortBy={sortBy}
            toggleView={toggleView}
            isMapsView={isMapsView}
            handleSortSelect={handleSortSelect}
            hasData={data.length}
            page={page}
            matches={matches}
            handlePage={handlePage}
          >
            {data?.map((elems) => (
              <ListElement
                key={elems._id}
                handleMouseEnter={handleMouseEnter(elems._id)}
                handleMouseLeave={handleMouseEnter(null)}
                className={
                  elems._id !== curr?._id
                    ? classes.mapsListContainer
                    : clsx(
                        classes.mapsListContainer,
                        classes.mapsCurrListContainer
                      )
                }
                liked={liked}
                handleBookmark={handleBookmark}
                {...elems}
              />
            ))}
          </ListWrapper>
        </Grid>
        <Grid item md={7} xs={12}>
          <MultiMaps
            data={allData}
            curr={curr}
            handleChildClick={handleChildClick}
            isMobile={isMdView}
            handlePointChange={handlePointChange}
          />
          <div></div>
          <Grid container>
            <MapsCarousel
              index={carrouselIndex}
              handleChange={handleCarouselChange}
            >
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
        </Grid>
      </Grid>
    );
  }
);

const sharedProptypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
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
ListView.PropTypes = sharedProptypes;
MapsView.PropTypes = sharedProptypes;

export { ListView, MapsView };
