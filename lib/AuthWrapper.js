import { Grid } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
// import Sidebar from '../components/private/admin/sidebar';
import StudentSidebar, { MobileMenu } from '../components/StudentSidebar';
// import AdminHeader from '../components/private/admin/header';

export const StudentSidebarComp = ({ children, user }) => (
  <Grid container className="admin-container student-container">
    <Grid container item xs={12} className="content">
      <Hidden mdDown>
        <Grid item smup="true" sm={2}>
          <StudentSidebar user={user} />
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <MobileMenu user={user} />
      </Hidden>
      <Grid item xs={12} sm={10} className="student-content-wrapper">
        {children}
      </Grid>
    </Grid>
  </Grid>
);

// export const AdminSidebarComp = ({ children }) => (
//   <Grid container className="admin-container">
//     <Grid item xs={2}>
//       <Sidebar />
//     </Grid>
//     <Grid item xs={10} className="content">
//       <Grid item xs={12}>
//         <AdminHeader />
//       </Grid>
//       <Grid item xs={12}>
//         {children}
//       </Grid>
//     </Grid>
//   </Grid>
// );
