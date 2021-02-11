import withAuth from '../../../lib/withAuth';
import { getPropertiesApiMethod } from '../../../lib/api/customer';
import Search from '../../../components/page/Search';

const SearchPage = (props) => <Search {...props} />;
SearchPage.getInitialProps = async ({ req }) => {
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }
  const typeOfAnnonce = 'Location';
  const { list } = await getPropertiesApiMethod(
    {
      location: '',
      typeOfAnnonce,
    },
    { headers },
  );
  return { properties: list, typeOfAnnonce };
};

export default withAuth(SearchPage);
