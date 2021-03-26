import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import { NEXT_PUBLIC_UPLOAD_URL } from 'config';
import Card from 'components/card';
import { Icon } from 'components/form';
import Select from 'components/form/Select';
import { MultipleMarkers } from 'components/Maps';
import { sortBySelectMap, sortByKeys } from 'helpers/property';
import withStyles from './styles';

const ListHeader = ({
  classes,
  isMapsView,
  toggleView,
  sortBy,
  handleSortSelect,
}) => (
  <Grid
    container
    item
    xs={isMapsView ? 12 : 5}
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
        <Icon type={isMapsView ? 'eyeClosed' : 'eyeOpened'} color="newBlue" />
        <span>{`${isMapsView ? 'Masquer' : 'Afficher'} la carte`}</span>
      </div>
    </Grid>
  </Grid>
);
const ListFooter = ({ classes, page, matches, isMapsView, handlePage }) =>
  page.totalPages > 0 && (
    <Grid container justify="center" className={classes.pagination}>
      <Pagination
        count={page.totalPages}
        page={!isNaN(page.page) ? Number(page.page) : 1}
        siblingCount={matches || isMapsView ? 0 : 1}
        onChange={handlePage}
      />
    </Grid>
  );
const ListWrapper = ({
  children,
  classes,
  hasData,
  sortBy,
  toggleView,
  isMapsView,
  handleSortSelect,
  ...footerProps
}) => (
  <>
    <ListHeader
      classes={classes}
      sortBy={sortBy}
      toggleView={toggleView}
      isMapsView={isMapsView}
      handleSortSelect={handleSortSelect}
    />
    <Grid container>
      {hasData ? (
        children
      ) : (
        <div className={classes.notFound}>
          <Typography variant="body1">
            <span role="img" aria-label="cring">
              😢
            </span>
            Aucun résultat ne correspond à votre critère de recherche.
          </Typography>
        </div>
      )}
      <ListFooter classes={classes} {...footerProps} />
    </Grid>
  </>
);
const ListElement = ({
  className,
  liked,
  handleBookmark,
  _id,
  heading,
  pictures,
  city,
  postal,
  typeOfAnnonce,
  dimensions,
  price,
}) => (
  <Grid item key={_id} className={className}>
    <Link
      href={`/dashboard/property/${
        typeOfAnnonce === 'Vente' ? 'buy' : 'location'
      }/${_id}`}
    >
      <a>
        <Card
          _id={_id}
          title={heading}
          src={NEXT_PUBLIC_UPLOAD_URL + pictures?.[0]}
          address={`${city} ${postal ? `/ ${postal.slice(0, 2)}` : ''}`}
          description={typeOfAnnonce}
          dimensions={dimensions}
          price={price}
          liked={liked?.includes(_id)}
          onClick={handleBookmark}
        />
      </a>
    </Link>
  </Grid>
);

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
    showMaps,
    handleSetShowMaps,
    handleBookmark,
    toggleView,
    data,
    page,
    matches,
    handlePage,
    isMapsView,
    sortBy,
    handleSortSelect,
  }) => {
    useEffect(() => {
      handleSetShowMaps(true);
      console.log('ok');
    }, []);

    return (
      <Grid container>
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
            isMapsView={isMapsView}
          >
            {data?.map((elems) => (
              <ListElement
                key={elems._id}
                className={classes.mapsListContainer}
                liked={liked}
                handleBookmark={handleBookmark}
                {...elems}
              />
            ))}
          </ListWrapper>
        </Grid>
        <Grid item xs={7} className={classes.mapsContainer}>
          {showMaps && <MultipleMarkers locs={data} />}
        </Grid>
      </Grid>
    );
  }
);

const sharedProptypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  sortBy: PropTypes.oneOf(sortByKeys).isRequired,
  liked: PropTypes.array.isRequired,
  isMapsView: PropTypes.bool.isRequired,
  showMaps: PropTypes.bool.isRequired,
  toggleView: PropTypes.func.isRequired,
  handleSortSelect: PropTypes.func.isRequired,
  handleSetShowMaps: PropTypes.func.isRequired,
  handleBookmark: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  matches: PropTypes.bool.isRequired,
  handlePage: PropTypes.func.isRequired,
};
ListView.PropTypes = sharedProptypes;
MapsView.PropTypes = sharedProptypes;

export { ListView, MapsView };
