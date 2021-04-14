import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import withAuth from 'lib/withAuth';
import { getUsersApiMethod } from 'lib/api/admin';
import { userRoleKeyVal } from 'helpers/user';

const columns = [
  { field: 'firstName', headerName: 'prenom', width: 150 },
  { field: 'lastName', headerName: 'Nom' },
  { field: 'email', headerName: 'Mail', width: 200 },
  { field: 'phone', headerName: 'Téléphone', width: 130 },
  {
    field: 'sponsorshipCode',
    headerName: 'Parrain',
  },
  {
    field: 'role',
    headerName: 'Status',
    valueGetter: (data) => userRoleKeyVal[data.value],
  },
  { field: 'origin', headerName: 'Origin' },
];
const Dashboard = ({ studentList = {} } = {}) => {
  const [state, setState] = useState(studentList);

  const handleQuery = async (page) => {
    try {
      const { list } = await getUsersApiMethod(page);
      if (list) {
        setState(list);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <DataGrid
        rows={state.docs}
        rowCount={state.totalDocs}
        columns={columns}
        pageSize={10}
        getRowId={(data) => data._id}
        onPageChange={({ page }) => handleQuery(page + 1)}
        checkboxSelection
        paginationMode="server"
        autoHeight
      />
    </div>
  );
};

Dashboard.getInitialProps = async ({ req, res }) => {
  if (req && !req.user) {
    res.redirect('/login');
    return { partners: [] };
  }

  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }

  const { list } = await getUsersApiMethod(1, { headers });

  return { studentList: list };
};

export default withAuth(Dashboard, { adminRequired: true });
