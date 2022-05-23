import React from 'react'
import { AdminContentWrapper } from 'components/wrapper';
import { UpdateProfile } from 'components';


export default function profile(user = {}, logout, update ) {
    return (
        <>
        
        <UpdateProfile 
        text="Mon compte"
              user={user}
              logout={logout}
              update={update}
              transparent
        />
        </>
      );
    };

