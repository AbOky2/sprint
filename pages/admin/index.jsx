import React, { useState, useEffect, useCallback } from 'react';
import withAuth from '../../lib/withAuth';
import { getUsersApiMethod } from '../../lib/api/admin';
import Table from '../../components/admin/table';

const Dashboard = () => {
  const [state, setState] = useState({
    docs: [],
  });

  const handleChange = useCallback((name, value) => setState({ ...state, [name]: value }), [
    state,
    setState,
  ]);
  useEffect(() => {
    (async () => {
      try {
        const { list } = await getUsersApiMethod();
        if (list) {
          setState(list);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <Table data={state} />
    </div>
  );
};

export default withAuth(Dashboard, { adminRequired: true });
