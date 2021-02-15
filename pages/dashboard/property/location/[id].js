import { getPropertyApiMethod } from '../../../../lib/api/customer';
import Single from '../../../../components/page/single';
import withAuth from '../../../../lib/withAuth';

const PropertyPage = (props) => <Single {...props} isLocation />;
PropertyPage.getInitialProps = async ({ req, query: { id } }) => {
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }
  const property = await getPropertyApiMethod(id, { headers });

  return { property, id };
};

export default withAuth(PropertyPage);
