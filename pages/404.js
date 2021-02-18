import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Logo from '../static/img/logo.png';

export default function FourOhFour() {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="container"
      style={{ height: '100vh', textAlign: 'center' }}
    >
      <Grid item>
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <h1>404 - Page Not Found</h1>
        <Link href="/">
          <a>Go back home</a>
        </Link>
      </Grid>
    </Grid>
  );
}
