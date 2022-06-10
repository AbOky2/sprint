import React from 'react'
import { AdminContentWrapper } from 'components/wrapper';
import { UpdateProfile } from 'components';
import PropTypes from 'prop-types';
import withAuth from 'lib/withAuth';



const Profile = ({ user = {}, logout, update, noHeaderMargin }) => {

  return (
        <>
            <AdminContentWrapper noRedirect mobilePadding>

        <UpdateProfile 
        text="Mon compte"
              user={user}
              update={update}
              transparent
        />
        </AdminContentWrapper>
        </>
      );
  };

  Profile.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  };
  
  export default Profile;
  

   

