// import GoogleMapReact from 'google-map-react';
import { getPropertyApiMethod, getPropertiesApiMethod } from '../../../../lib/api/customer';
import Single from '../../../../components/page/Single';
import withAuth from '../../../../lib/withAuth';

const PropertyPage = (props) => <Single {...props} isLocation />;
PropertyPage.getInitialProps = async ({ req, query: { id } }) => {
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }
  const property = await getPropertyApiMethod(id, { headers });
  const { list: properties = [] } = await getPropertiesApiMethod({ headers });
  return { property, properties, id };
};

export default withAuth(PropertyPage);
