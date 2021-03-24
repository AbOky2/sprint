import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { NEXT_PUBLIC_UPLOAD_URL } from 'config';
import Card from 'components/card';
import styles from './styles';

const ListFooter = ({ classes, page, matches, handlePage }) =>
  page.totalPages > 0 && (
    <Grid container justify="center" className={classes.pagination}>
      <Pagination
        count={page.totalPages}
        page={!isNaN(page.page) ? Number(page.page) : 1}
        siblingCount={matches ? 0 : 1}
        onChange={handlePage}
      />
    </Grid>
  );
const ListWrapper = ({
  children,
  classes,
  hasData,
  page,
  matches,
  handlePage,
}) => (
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
    <ListFooter
      classes={classes}
      page={page}
      matches={matches}
      handlePage={handlePage}
    />
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

const ListView = withStyles(styles)(
  ({ classes, data, liked, handleBookmark, page, matches, handlePage }) => (
    <ListWrapper
      classes={classes}
      hasData={data.length}
      page={page}
      matches={matches}
      handlePage={handlePage}
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

const MapsView = withStyles(styles)(
  ({ classes, data, liked, handleBookmark, page, matches, handlePage }) => (
    <Grid container>
      <Grid item xs={4}>
        <ListWrapper
          classes={classes}
          hasData={data.length}
          page={page}
          matches={matches}
          handlePage={handlePage}
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
      </Grid>
      <Grid item xs={8}>
        Maps
      </Grid>
    </Grid>
  )
);

const sharedProptypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  liked: PropTypes.array.isRequired,
  handleBookmark: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  matches: PropTypes.bool.isRequired,
  handlePage: PropTypes.func.isRequired,
};
ListView.PropTypes = sharedProptypes;
MapsView.PropTypes = sharedProptypes;

export { ListView, MapsView };
