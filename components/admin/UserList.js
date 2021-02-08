import React from 'react';
import { Grid } from '@material-ui/core';

const Header = ({ headerList = [] }) => (
  <Grid container item alignItems="center" justify="center" className="user-list-header spacing">
    {headerList?.map(({ name, size }) => (
      <Grid key={name} item container alignItems="center" {...size}>
        <Grid item>
          <p>{name}</p>
        </Grid>
      </Grid>
    ))}
  </Grid>
);
const UserList = ({ contentList = [], headerList }) => {
  const list = contentList; /* .splice(state.offset, state.limit) */

  console.log(list);

  return (
    <Grid container item>
      <Header headerList={headerList} />
      {list?.map((elem) => (
        <Grid
          container
          item
          key={elem._id}
          alignItems="center"
          justify="center"
          className="user-list spacing"
        >
          <Grid item container alignItems="center" xs={3}>
            <Grid item>
              <span>{`${elem.firstName} ${elem.lastName}`}</span>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" xs={3}>
            <span>{elem.email}</span>
          </Grid>
          <Grid item container alignItems="center" xs={2}>
            <span>{elem.phone}</span>
          </Grid>
          <Grid item container alignItems="center" xs={2}>
            <span>{elem.referer}</span>
          </Grid>
          <Grid item container alignItems="center" xs={2}>
            <span>{elem.referer}</span>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserList;
