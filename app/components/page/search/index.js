/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Router, { withRouter } from 'next/router';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getPropertiesApiMethod, addBookmarkApiMethod } from 'lib/api/customer';
import { toggleArray, pick } from 'helpers/convertAndCheck';
import { typeOfProperties, typeOfAnnonciesObj } from 'helpers/property';
import { pages } from 'helpers/query';
import { AdminContentWrapper } from 'components/wrapper';
import { Icon, Input } from 'components/form';
import { GoogleMaps } from 'components/form/Input';
import { DropdownSelect } from 'components/form/Select';
import { ListView, MapsView } from './view';
import styles from './styles';

const useStyles = makeStyles(styles);
const pagePropertyWhilist = ['page', 'limit', 'totalPages'];
const isListView = true;
const SearchPage = ({
  user,
  properties = {},
  typeOfProperty = [],
  typeOfAnnonce,
  listView,
  update,
  loc,
  page: defaultPage,
  maxPrice,
}) => {
  const [page, setPage] = useState({
    ...pick(properties, pagePropertyWhilist),
    page: defaultPage,
  });
  const [currView, setCurrView] = useState(isListView);
  const [state, setState] = useState(properties.docs);
  const [queryData, setQueryData] = useState({
    loc,
    maxPrice,
    typeOfAnnonce,
    typeOfProperty,
  });
  console.log(listView);
  const toggleView = () => setCurrView(!currView);
  const [liked, setLiked] = useState(user?.bookmarks?.map((elem) => elem._id));
  const handleSearch = (name) => ({ target: { value } }) =>
    setQueryData({ ...queryData, [name]: value });
  const handleMapSearch = (value) =>
    setQueryData({ ...queryData, loc: value?.label });
  const handleSelect = (newTypeOfProperty) =>
    setQueryData({ ...queryData, typeOfProperty: newTypeOfProperty });
  const handleBookmark = (id) => {
    setLiked(toggleArray(liked, id));
    addBookmarkApiMethod({ id }).then(({ user: currUser }) => update(currUser));
  };

  const isLocation = typeOfAnnonce === typeOfAnnonciesObj.location;
  const requestData = async (page = 1) => {
    if (!queryData.maxPrice) queryData.maxPrice = -1;
    if (!queryData.loc) queryData.loc = null;

    const { typeOfProperty, ...requestParams } = queryData;
    const { list: { docs, ...pageInfo } = {} } = await getPropertiesApiMethod({
      ...(isLocation ? {} : { typeOfProperty }),
      ...requestParams,
      page,
    });
    setState(docs);
    setPage(pick(pageInfo, pagePropertyWhilist));

    Router.push(
      {
        query: {
          listView: currView,
          page: pageInfo.page,
          loc: queryData.loc,
          maxPrice: queryData.maxPrice,
          ...(isLocation ? {} : { typeOfProperty }),
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
  const classes = useStyles();

  return (
    <AdminContentWrapper redirectDashboard href={pages.dashboard}>
      <div>
        {!isLocation && (
          <div className={classes.setpsContainer}>
            <Typography variant="h2" className={classes.title}>
              Mon premier achat en 5 étapes !
            </Typography>
            <Typography variant="body1" className={classes.subTitle}>
              Comment ça marche?
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  <span>1</span>
                  Je sélectionne l'appartement qui me convient avec l'aide d'un
                  conseiller Kit Le Nid
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <span>2</span>
                  J'effectue la réservation du bien, qui est bloqué pour moi
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <span>3</span>
                  J'effectue les démarches de prêt immobilier ou la confie à Kit
                  Le Nid
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <span>4</span>
                  Je signe chez le notaire et devient officiellement
                  propriétaire
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <span>5</span>
                  J'attends la livraison du bien et emménage!
                </Typography>
              </li>
            </ul>
          </div>
        )}
        <Grid
          container
          className={
            isLocation
              ? clsx(classes.searchContainer, classes.isLocation)
              : classes.searchContainer
          }
        >
          <Grid item md={isLocation ? 6 : 4}>
            <GoogleMaps
              name="loc"
              value={queryData.loc}
              onChange={handleMapSearch}
              placeholder="Localisation"
            />
          </Grid>
          {!isLocation && (
            <Grid item md={4}>
              <DropdownSelect
                name="typeOfAnnonce"
                placeholder="Type de bien"
                list={typeOfProperties.map((name) => ({ name, value: name }))}
                value={queryData.typeOfProperty}
                onChange={handleSelect}
              />
            </Grid>
          )}
          <Grid
            item
            md={isLocation ? 6 : 4}
            className={clsx(classes.search, classes.locationMaxBudget)}
          >
            <Input
              name="maxPrice"
              value={
                queryData.maxPrice > 0 && !Number.isNaN(queryData.maxPrice)
                  ? queryData.maxPrice
                  : ''
              }
              onChange={handleSearch}
              placeholder="Budget maximal"
            />
            <div onClick={handleSumit} className="pointer">
              <Icon type="search" size="large" color="white" />
            </div>
          </Grid>
        </Grid>
        <p className={classes.changeView}>
          <span onClick={toggleView}> Changer de vue</span>
        </p>
        {currView ? (
          <ListView
            data={state}
            liked={liked}
            handleBookmark={handleBookmark}
            page={page}
            matches={matches}
            handlePage={handlePage}
          />
        ) : (
          <MapsView
            data={state}
            liked={liked}
            handleBookmark={handleBookmark}
            page={page}
            matches={matches}
            handlePage={handlePage}
          />
        )}
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
  typeOfProperty: PropTypes.any,
  update: PropTypes.func.isRequired,
  loc: PropTypes.string,
};
SearchPage.defaultProps = {
  loc: '',
  page: '1',
  maxPrice: null,
  typeOfProperty: [],
};
export default withRouter(SearchPage);
