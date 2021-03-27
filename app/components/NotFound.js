import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Logo from '../static/img/logo.png';

const NotFound = ({ showLink = true }) => (
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
      {showLink && <a href="/">Go back home</a>}
    </Grid>
  </Grid>
);

NotFound.propTypes = {
  showLink: PropTypes.bool,
};
NotFound.defaultProps = {
  showLink: true,
};
export default NotFound;
