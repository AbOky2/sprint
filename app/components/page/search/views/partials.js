import Pagination from '@material-ui/lab/Pagination';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import { Icon } from 'components/form';
import Select from 'components/form/Select';
import { NEXT_PUBLIC_UPLOAD_URL } from 'config';
import Card from 'components/card';
import { getAddress, getNbPieces, sortBySelectMap } from 'helpers/property';
import { singlePath } from 'helpers/query';

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
  minPieces,
  maxPieces,
  dimensions,
  price,
  showLikes,
  handleHover,
}) => (
  <Grid item key={_id} className={className} onMouseEnter={handleHover}>
    <Link href={singlePath({ typeOfAnnonce, _id })}>
      <a>
        <Card
          _id={_id}
          title={heading}
          src={NEXT_PUBLIC_UPLOAD_URL + pictures?.[0]}
          address={getAddress({ city, postal })}
          description={getNbPieces(minPieces, maxPieces)}
          dimensions={dimensions}
          price={price}
          liked={liked?.includes(_id)}
          onClick={handleBookmark}
          showLikes={showLikes}
        />
      </a>
    </Link>
  </Grid>
);
export { ListHeader, ListFooter, ListWrapper, ListElement };
