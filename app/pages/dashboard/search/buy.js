import { connect } from 'react-redux';
import { typeOfAnnonciesObj } from 'helpers/property';
import { searchQueryWhitelist, defaultLoc, defaultOffset } from 'helpers/query';
import { pick, unPick } from 'helpers/convertAndCheck';
import { userActions } from 'redux/_actions';
import withAuth from 'lib/withAuth';
import { getPropertiesApiMethod } from 'lib/api/customer';
import Search from 'components/page/search';

const SearchPage = (props) => <Search {...props} />;
SearchPage.getInitialProps = async ({ req, query }) => {
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }

  const queryParams = pick(query, searchQueryWhitelist);
  queryParams.typeOfAnnonce = typeOfAnnonciesObj.buy;
  queryParams.loc = queryParams.loc || defaultLoc.buy;
  queryParams.page = queryParams.page || defaultOffset;
  queryParams.point = [];

  const { list } = await getPropertiesApiMethod(
    unPick(queryParams, ['listView']),
    { headers }
  );
  return { properties: list, ...queryParams };
};

const mapState = (state) => {
  const { loggingIn, user } = state.authentication;
  return { loggingIn, user };
};

const actionCreators = {
  update: userActions.updateUserDataOnly,
};

export default withAuth(connect(mapState, actionCreators)(SearchPage));
