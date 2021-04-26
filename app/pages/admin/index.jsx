import React, { useState } from 'react';
import withAuth from 'lib/withAuth';
import { getUsersApiMethod, deleteUserApiMethod } from 'lib/api/admin';
import Table from 'components/admin/table';

const Dashboard = ({ studentList = {} } = {}) => {
  const [state, setState] = useState(studentList);

  const handleDelete = async (id) => {
    try {
      const { list } = await deleteUserApiMethod(id);
      if (list) {
        setState(list);
      }
    } catch (error) {
      console.error(error);
    }
  };
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
      <Table
        {...state}
        handlePaginateList={handleQuery}
        handleDelete={handleDelete}
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
