import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import { NEXT_PUBLIC_UPLOAD_URL } from 'config';
import Card from 'components/card';
import withStyles from './styles';

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
const ListWrapper = ({ children, classes, hasData, ...footerProps }) => (
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
  }) => (
    <ListWrapper
      classes={classes}
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
  )
);

const MapsView = withStyles(
  ({
    classes,
    liked,
    handleBookmark,
    data,
    page,
    matches,
    handlePage,
    isMapsView,
  }) => (
    <Grid container>
      <Grid item xs={5}>
        <ListWrapper
          classes={classes}
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
        Maps
      </Grid>
    </Grid>
  )
);

const sharedProptypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  liked: PropTypes.array.isRequired,
  isMapsView: PropTypes.bool.isRequired,
  handleBookmark: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  matches: PropTypes.bool.isRequired,
  handlePage: PropTypes.func.isRequired,
};
ListView.PropTypes = sharedProptypes;
MapsView.PropTypes = sharedProptypes;

export { ListView, MapsView };
