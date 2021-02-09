/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withAuth from '../../lib/withAuth';
import {
  getPropertiesApiMethod,
  addBookmarkApiMethod,
  getUserSearchApiMethod,
} from '../../lib/api/customer';
import { toggleArray } from '../../helpers/convertAndCheck';
import { typeOfProperties } from '../../helpers/property';
import { AdminContentWrapper } from '../../components/wrapper';
import Card from '../../components/card';
import { Icon, Input, Select } from '../../components/form';

const useStyles = makeStyles({
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
  },
  listContainer: {
    width: 'calc(33% - 11px)',
    marginBottom: '2rem',
    '&:nth-child(3n+2)': {
      margin: '0 2.1rem 2rem',
    },
  },
});
const SearchPage = ({ user, properties, query: { type: queryType } = {} }) => {
  const [state, setState] = useState(properties);
  const [queryData, setQueryData] = useState({
    location: '',
    maxPrice: 0,
    typeOfProperty: typeOfProperties[0],
  });
  const [liked, setLiked] = useState(user?.bookmarks?.map((elem) => elem._id));
  const classes = useStyles();
  const handleSearch = (name) => ({ target: { value } }) =>
    setQueryData({ ...queryData, [name]: value });

  const handleBookmark = (id) => {
    setLiked(toggleArray(liked, id));
    addBookmarkApiMethod({ id });
  };
  const handleSumit = async () => {
    // const queryData = { maxPrice: '20000', typeOfProperty: 'Appartement' };
    if (!queryData.maxPrice) queryData.maxPrice = 0;
    const { list } = await getUserSearchApiMethod(queryData);
    setState(list);
  };

  return (
    <AdminContentWrapper redirectDashboard>
      <div>
        {queryType !== 'location' && (
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
            <Select
              name="typeOfProperty"
              list={typeOfProperties.map((name) => ({ name, value: name }))}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item md={4} className="relative">
            <Input name="maxPrice" onChange={handleSearch} placeholder="Budget maximal" />
            <div onClick={handleSumit}>
              <Icon type="search" size="large" />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          {state?.map(({ _id, title, pictures, address, typeOfProperty, dimensions, price }) => (
            <Grid item key={_id} className={classes.listContainer}>
              <Link href={`/dashboard/property/${_id}`}>
                <a>
                  <Card
                    _id={_id}
                    title={title}
                    src={pictures?.[0]}
                    address={address}
                    description={typeOfProperty}
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
    </AdminContentWrapper>
  );
};

SearchPage.getInitialProps = async ({ req, query }) => {
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }
  const { list } = await getPropertiesApiMethod({ headers });
  return { properties: list, query };
};

export default withAuth(SearchPage);
