import { Grid } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from '../components/admin/Sidebar';
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
});

export const StudentSidebarComp = withStyles(styles)(({ children, user, classes }) => (
  <Grid container className="admin-container student-container">
    <Grid container item xs={12} className="content">
      <Hidden smDown>
        <Grid item smup="true" sm={2}>
          <StudentSidebar user={user} />
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <MobileMenu user={user} />
      </Hidden>
      <Grid item xs={12} sm={10} className={classes.studentContainer}>
        {children}
        <UpdateProfile user={user} />
      </Grid>
    </Grid>
  </Grid>
));

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
