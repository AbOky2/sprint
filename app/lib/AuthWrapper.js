import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from '../components/admin/Sidebar';
import { userActions } from '../redux/_actions';
import StudentSidebar, { MobileMenu } from '../components/StudentSidebar';
import UpdateProfile from '../components/UpdateProfile';

const styles = (theme) => ({
  studentContainer: {
    padding: '0 3rem',
    '& > div:last-of-type': {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
      ...theme.space.bodyWrapper,
      paddingBottom: '11rem',
      '& > div:last-of-type': {
        display: 'block',
      },
    },
  },
  studentSidebarFixed: {
    position: 'sticky',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});

const mapState = (state) => {
  const { loggingIn, user } = state?.authentication;
  return { loggingIn, user };
};
const actionCreators = {
  logout: userActions.logout,
  update: userActions.update,
};
export const StudentSidebarComp = connect(
  mapState,
  actionCreators,
)(
  withStyles(styles)(({ children, user, logout, update, classes }) => (
    <Grid container className="admin-container student-container">
      <Grid container item xs={12} className="content">
        <Grid item smup="true" sm={2} elevation={15} className={classes.studentSidebarFixed}>
          <Hidden smDown>
            <StudentSidebar user={user} logout={logout} update={update} />
          </Hidden>
        </Grid>
        <Hidden mdUp>
          <MobileMenu user={user} />
        </Hidden>
        <Grid item xs={12} sm={10} className={classes.studentContainer}>
          {children}
          <UpdateProfile user={user} logout={logout} update={update} />
        </Grid>
      </Grid>
    </Grid>
  )),
);

export const AdminSidebarComp = ({ children }) => (
  <Grid container className="admin-container">
    <Grid item xs={2}>
      <Sidebar />
    </Grid>
    <Grid item xs={10} className="content">
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  </Grid>
);
