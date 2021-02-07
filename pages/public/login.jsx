import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { styleLoginButton } from '../../components/SharedStyles';
import { Btn } from '../../components/form';
import withAuth from '../../lib/withAuth';
import {login} from '../../lib/api/public';

const propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      redirectUrl: PropTypes.string,
    }),
  }).isRequired,
};

function Login({ router }) {
  const redirectUrl = (router && router.query && router.query.redirectUrl) || '';
  const handleClick = ()=> login({email: 'admin@test.test', password: 'test'}).then(()=>{
    console.log('finish')
    window.location = '/';
  })
  return (
    <div style={{ textAlign: 'center', margin: '0 20px' }}>
      <Head>
        <title>Log in to Builder Book</title>
        <meta name="description" content="Login page for builderbook.org" />
      </Head>
      <br />
      <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>Log in</p>
      <p>You’ll be logged in for 14 days unless you log out manually.</p>
      <br />
      <Button
        variant="contained"
        style={styleLoginButton}
        href={`/auth/google?redirectUrl=${redirectUrl}`}
      >
        <img
          src="https://builderbook-public.s3.amazonaws.com/G.svg"
          alt="Log in with Google"
          style={{ marginRight: '10px' }}
        />
        Log in with Google
      </Button>
      <Btn text='Signin' onClick={handleClick} />
    </div>
  );
}

Login.propTypes = propTypes;

export default withAuth(withRouter(Login), { logoutRequired: true });
