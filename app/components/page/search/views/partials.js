import { useState, useEffect, useRef } from 'react';
import 'intersection-observer';
import clsx from 'clsx';
import Pagination from '@material-ui/lab/Pagination';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import Select from 'components/form/Select';
import Card from 'components/card';
import {
  getAddress,
  getNbPieces,
  sortBySelectMap,
  getCardImg,
} from 'helpers/property';
import { singlePath } from 'helpers/query';

const ListHeader = ({ classes, sortBy, handleSortSelect }) => (
  <Grid
    container
    item
    alignItems="center"
    justify="space-between"
    className={classes.sortContainer}
  >
    <Grid item>
      <Select
        name="sort"
        placeholder="Type de bien"
        list={sortBySelectMap}
        value={sortBy}
        onChange={handleSortSelect}
      />
    </Grid>
  </Grid>
);

const ListFooter = ({ classes, page, matches, isMapsView, handlePage }) =>
  page?.totalPages > 1 && (
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
    <div>
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
    </div>
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
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const [isVisible, setVisible] = useState(false);
  const [ratio, setRatio] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const { current } = domRef;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // if (entry.intersectionRatio > 0.1) {
          setRatio(entry.intersectionRatio);
          // console.log(`entry`, entry, `is = ${entry}`);
          setVisible(entry.isIntersecting);
          // }
        });
      },
      { threshold: [0.9] }
    );
    observer.observe(current);
    return () => observer.unobserve(current);
  }, [domRef]);

  return (
    <Grid
      item
      className={clsx(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : ratio - 0.1,
        transform: `scale(${isVisible ? 1 : ratio - 0.1})`,
        transition: 'all 0.15s ease-in-out',
      }}
    >
      <Link href={singlePath({ typeOfAnnonce, _id })}>
        <a>
          <Card
            _id={_id}
            title={heading}
            src={getCardImg(pictures?.[0])}
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
};
export { ListHeader, ListFooter, ListWrapper, ListElement };
