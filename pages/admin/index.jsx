import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import notify from '../../lib/notify';
import withAuth from '../../lib/withAuth';
import { getUsersApiMethod } from '../../lib/api/admin';
import { AdminContentWrapper } from '../../components/wrapper';
import UserList from '../../components/admin/UserList';
import { Icon } from '../../components/form';
// import './index.css';

const Dashboard = () => {
  const [state, setState] = useState({
    users: [],
  });

  const handleChange = useCallback((name, value) => setState({ ...state, [name]: value }), [
    state,
    setState,
  ]);
  useEffect(() => {
    (async () => {
      try {
        const { list } = await getUsersApiMethod();
        handleChange('users', list);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const { users = [] } = state;
  const headerList = [
    { name: 'Nom', size: { xs: 3 } },
    { name: 'Mail', size: { xs: 3 } },
    { name: 'Téléphone', size: { xs: 2 } },
    { name: 'Origin', size: { xs: 2 } },
    { name: 'Parrain', size: { xs: 2 } },
  ];
  const { length } = users;

  return (
    <AdminContentWrapper>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className="spacing header"
      >
        <Grid item container xs={6} justify="flex-start">
          <Grid item container alignItems="center">
            <Grid>
              <span className="header-icon">
                <Icon type="house" />
              </span>
            </Grid>
            <Grid>
              <h1>
                Utilisateurs
                {`${length ? ` (${length})` : ''}`}
              </h1>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={6} justify="flex-end">
          <Grid item container alignItems="center" justify="flex-end">
            {/* <div
              className="pointer filter"
              onClick={() =>
                handleChange('filterName', state.filterName === Roomer ? Buyer : Roomer)
              }
            >
              <span className="icon icon-filter" />
              <span className="header-btn">Filter</span>
            </div> */}
            {/* <div className="pointer export">
              <span className="icon icon-export"></span>
              <span className="header-btn">
                <CSVLink data={csvData} filename="students_locataire.csv">
                  Exporter
                </CSVLink>
              </span>
            </div> */}
          </Grid>
        </Grid>
      </Grid>
      <UserList headerList={headerList} contentList={users.docs} />
    </AdminContentWrapper>
  );
};

export default withAuth(Dashboard, { adminRequired: true });
