import React, { useState, useEffect } from 'react';
import withAuth from 'lib/withAuth';
import { getUsersApiMethod, deleteUserApiMethod } from 'lib/api/admin';
import Table from 'components/admin/table';
import { CSVLink } from 'react-csv';
import { userRoleKeyVal, toDate } from 'helpers';

const Dashboard = ({ studentList = {} } = {}) => {
  const [state, setState] = useState(studentList);
  const [data, setData] = useState([]);
  console.log(state);
  useEffect(() => {
    setData(
      state?.docs?.map((item) => ({
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phone: item.phone,
        sponsorshipCode: item.sponsorshipCode,
        role: userRoleKeyVal[item.role],
        origin: item.origin,
        date: toDate(item.created_at),
      }))
    );
  }, [state]);

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
      <CSVLink data={data}> Exporter en CSV </CSVLink>
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
    res.redirect('/');
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
