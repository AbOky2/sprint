import { connect } from 'react-redux';
import { userActions } from '../../../redux/_actions';
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
      loc: '',
      typeOfAnnonce,
    },
    { headers },
  );
  return { properties: list, typeOfAnnonce };
};

const mapState = (state) => {
  const { loggingIn, user } = state.authentication;
  return { loggingIn, user };
};

const actionCreators = {
  update: userActions.updateUserDataOnly,
};

export default withAuth(connect(mapState, actionCreators)(SearchPage));
