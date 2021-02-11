/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { getPropertiesApiMethod, addBookmarkApiMethod } from '../../lib/api/customer';
import { toggleArray } from '../../helpers/convertAndCheck';
import { typeOfProperties } from '../../helpers/property';
import { AdminContentWrapper } from '../wrapper';
import Card from '../card';
import { Icon, Input } from '../form';
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
        borderRadius: '.6rem!important',
      },
      '& > div:first-of-type input': {
        borderRight: `1px solid ${theme.palette.gray}`,
        borderTopRightRadius: 1,
        borderBottomLeftRadius: '0 !important',
        borderBottomRightRadius: '0 !important',
        borderBottom: 'none',
      },
      '& > div:last-of-type input': {
        borderLeft: `1px solid ${theme.palette.gray}`,
        borderTopLeftRadius: '0 !important',
        borderTopRightRadius: '0 !important',
        borderTop: 'none',
      },
    },
  },
  listContainer: {
    width: 'calc(33% - 11px)',
    marginBottom: '2rem',
    '&:nth-child(3n+2)': {
      margin: '0 2.1rem 2rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '&:nth-child(3n+2)': {
        margin: '0 0 2rem',
      },
      '&:last-child': {
        margin: 0,
      },
    },
  },
  pagination: {
    marginTop: '1rem',
  },
}));
const SearchPage = ({ user, properties = { limit: 6 }, typeOfAnnonce }) => {
  const [page, setPage] = useState({
    limit: properties.limit,
    offset: properties.offset,
    totalPages: properties.totalPages,
  });
  const [state, setState] = useState(properties.docs);
  const [queryData, setQueryData] = useState({
    location: '',
    maxPrice: 0,
    typeOfAnnonce,
    typeOfProperty: [],
  });
  const [liked, setLiked] = useState(user?.bookmarks?.map((elem) => elem._id));
  const classes = useStyles();
  const handleSearch = (name) => ({ target: { value } }) =>
    setQueryData({ ...queryData, [name]: value });
  const handleSelect = (typeOfProperty) => setQueryData({ ...queryData, typeOfProperty });

  const handleBookmark = (id) => {
    setLiked(toggleArray(liked, id));
    addBookmarkApiMethod({ id });
  };
  const requestData = async (offset = 0) => {
    if (!queryData.maxPrice) queryData.maxPrice = 0;
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

  return (
    <AdminContentWrapper redirectDashboard>
      <div>
        {typeOfAnnonce !== 'location' && (
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
        <Grid container className={classes.searchContainer}>
          <Grid item md={4}>
            <Input name="location" onChange={handleSearch} placeholder="Localisation" />
          </Grid>
          <Grid item md={4}>
            <DropdownSelect
              name="typeOfAnnonce"
              list={typeOfProperties.map((name) => ({ name, value: name }))}
              value={queryData.typeOfProperty}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item md={4} className="relative">
            <Input name="maxPrice" onChange={handleSearch} placeholder="Budget maximal" />
            <div onClick={handleSumit} className="pointer">
              <Icon type="search" size="large" color="white" />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          {state?.map(({ _id, heading, pictures, address, typeOfAnnonce, dimensions, price }) => (
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
                    address={address}
                    description={typeOfAnnonce}
                    dimensions={dimensions}
                    price={price}
                    liked={liked.includes(_id)}
                    onClick={handleBookmark}
                  />
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
      {page.totalPages > 0 && (
        <Grid container justify="center" className={classes.pagination}>
          <Pagination count={page.totalPages} page={page.offset} onChange={handlePage} />
        </Grid>
      )}
    </AdminContentWrapper>
  );
};

export default SearchPage;
