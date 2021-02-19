/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getPropertiesApiMethod, addBookmarkApiMethod } from '../../lib/api/customer';
import { toggleArray } from '../../helpers/convertAndCheck';
import { typeOfProperties } from '../../helpers/property';
import { AdminContentWrapper } from '../wrapper';
import Card from '../card';
import { Icon, Input } from '../form';
import { GoogleMaps } from '../form/Input';
import { DropdownSelect } from '../form/Select';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 'calc(100% - 14px)',
  },
  title: {
    color: '#4F80FF',
  },
  subTitle: {
    margin: '4px 0 22px',
    color: 'rgba(26, 46, 108, 0.75)',
  },
  setpsContainer: {
    marginBottom: '40px',
    padding: '3.2rem',
    borderRadius: '2.5rem',
    color: 'white',
    background: 'white',
    boxShadow: '0px 4px 13px rgb(0 0 0 / 10%), inset 0px -3px 10px rgb(149 149 149 / 20%)',
    '& ul': {
      paddingLeft: 0,
    },
    '& li': {
      marginBottom: 15,
    },
    '& span': {
      padding: '0 5px',
      color: 'white',
      marginRight: 10,
      background: '#4F80FF',
      borderRadius: '3px',
    },
  },
  searchContainer: {
    marginBottom: 22,
    boxShadow: '0px 4.15441px 16.6176px rgb(0 0 0 / 10%)',
    '& input:focus': {
      border: `solid 1px ${theme.palette.gray}`,
    },
    '& > div:first-of-type > div > div': {
      '&:first-of-type': {
        minHeight: 62,
        borderRadius: '.6rem',
        fontFamily: 'Open Sans',
        fontSize: '1.6rem',
        fontWeight: '600',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
        border: `solid 1px ${theme.palette.gray}`,
        borderColor: theme.palette.gray,
        [theme.breakpoints.down('sm')]: {
          borderBottomLeftRadius: 0,
          borderTopRightRadius: '.6rem',
          borderRight: `1px solid ${theme.palette.gray}`,
          borderBottom: 0,
        },
      },
      '&:last-of-type': {
        zIndex: 3,
      },
    },
    '& > div:last-of-type svg': {
      position: 'absolute',
      right: 0,
      top: '50%',
      width: 40,
      height: 40,
      transform: 'translateY(-50%)',
    },
    '& > div:nth-child(2) > div > div > div': {
      backgroundColor: 'white',
      borderRadius: 0,
    },
    '& > div:first-of-type input': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: 'none',
    },
    '& > div:last-of-type input': {
      borderLeft: 'none',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div': {
        display: 'block',
        width: '100%',
      },
      '& > div:nth-child(2) > div > div > div': {
        backgroundColor: 'white',
        borderRadius: 0,
      },
      '& > div input': {
        borderRadius: '.6rem',
      },
      '& > div:first-of-type input': {
        borderRight: `1px solid ${theme.palette.gray}`,
        borderBottom: `1px solid ${theme.palette.gray}`,
        borderRadius: '0 !important',
      },
      '& > div:last-of-type input': {
        borderLeft: `1px solid ${theme.palette.gray}`,
        borderTopLeftRadius: '0 !important',
        borderTopRightRadius: '0 !important',
        borderTop: 'none',
      },
    },
  },
  isLocation: {
    '& > div:last-of-type input': {
      borderLeft: `1px solid ${theme.palette.gray}`,
    },
  },
  listContainer: theme.ui.listContainer,
  pagination: {
    marginTop: '1rem',
  },
  notFound: {
    width: '100%',
    textAlign: 'center',
    margin: '2rem 0',
    '& span': {
      marginRight: '1rem',
    },
  },
  search: {
    position: 'relative',
  },
  locationMaxBudget: {
    borderTop: `solid 1px ${theme.palette.gray}`,
  },
}));

const SearchPage = ({ user, properties = { limit: 6 }, typeOfAnnonce, update, ...props }) => {
  const [page, setPage] = useState({
    limit: properties.limit,
    offset: properties.offset,
    totalPages: properties.totalPages,
  });
  const [state, setState] = useState(properties.docs);
  const [queryData, setQueryData] = useState({
    loc: '',
    maxPrice: -1,
    typeOfAnnonce,
    typeOfProperty: [],
  });
  const [liked, setLiked] = useState(user?.bookmarks?.map((elem) => elem._id));
  const classes = useStyles();
  const handleSearch = (name) => ({ target: { value } }) =>
    setQueryData({ ...queryData, [name]: value });
  const handleMapSearch = (value) => setQueryData({ ...queryData, loc: value?.label });
  const handleSelect = (typeOfProperty) => setQueryData({ ...queryData, typeOfProperty });
  const handleBookmark = (id) => {
    setLiked(toggleArray(liked, id));
    addBookmarkApiMethod({ id }).then(({ user }) => update(user));
  };
  const requestData = async (offset = 0) => {
    if (!queryData.maxPrice) queryData.maxPrice = -1;
    const { list: { docs, ...pageInfo } = {} } = await getPropertiesApiMethod({
      ...queryData,
      limit: page.limit,
      offset,
    });
    setState(docs);
    setPage(pageInfo);
  };
  const handleSumit = () => requestData();
  const handlePage = (e, offset) => requestData(offset);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const isLocation = typeOfAnnonce === 'Location';

  return (
    <AdminContentWrapper redirectDashboard href="/dashboard">
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
                  Je sélectionne l'appartement qui me convient avec l'aide d'un conseiller Kit Le
                  Nid
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
                  J'effectue les démarches de prêt immobilier ou la confie à Kit Le Nid
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <span>4</span>
                  Je signe chez le notaire et devient officiellement propriétaire
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
            isLocation || true
              ? clsx(classes.searchContainer, classes.isLocation)
              : classes.searchContainer
          }
        >
          <Grid item md={isLocation ? 6 : 4}>
            {/* <Input name="loc" onChange={handleSearch} placeholder="Localisation" /> */}
            <GoogleMaps name="loc" onChange={handleMapSearch} placeholder="Localisation" />
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
            className={
              isLocation ? clsx(classes.search, classes.locationMaxBudget) : classes.search
            }
          >
            <Input name="maxPrice" onChange={handleSearch} placeholder="Budget maximal" />
            <div onClick={handleSumit} className="pointer">
              <Icon type="search" size="large" color="white" />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          {state?.length ? (
            state.map(
              ({ _id, heading, pictures, fullAddress, typeOfAnnonce, dimensions, price }) => (
                <Grid item key={_id} className={classes.listContainer}>
                  <Link
                    href={`/dashboard/property/${
                      typeOfAnnonce === 'Vente' ? 'buy' : 'location'
                    }/${_id}`}
                  >
                    <a>
                      <Card
                        _id={_id}
                        title={heading}
                        src={pictures?.[0]}
                        address={fullAddress}
                        description={typeOfAnnonce}
                        dimensions={dimensions}
                        price={price}
                        liked={liked?.includes(_id)}
                        onClick={handleBookmark}
                      />
                    </a>
                  </Link>
                </Grid>
              ),
            )
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
        </Grid>
      </div>
      {page.totalPages > 0 && (
        <Grid container justify="center" className={classes.pagination}>
          <Pagination
            count={page.totalPages}
            page={page.offset}
            siblingCount={matches ? 0 : 1}
            onChange={handlePage}
          />
        </Grid>
      )}
    </AdminContentWrapper>
  );
};

export default SearchPage;
