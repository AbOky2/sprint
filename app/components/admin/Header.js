import React from 'react';
import { Grid } from '@material-ui/core';
import LogoutIcon from 'assets/img/icons/logout.png';
import DropDownMenu from '../../elements/dropdown';
import Avatar from '../../../assets/img/picture.png';
import { useAuth } from '../../../context/auth';
import './header.css';

const ProfileMenu = ({ Avatar, authUser: { firstName, picture } = {} }) => (
  <Grid container alignItems="center" className="dropdownContainer">
    <Grid>
      <span>{firstName}</span>
    </Grid>
    <Grid>
      <img src={LogoutIcon} alt="Avatar" className="tiny" />
    </Grid>
  </Grid>
);

const Header = () => {
  const { authUser, logOut } = useAuth();
  const childList = [{ value: 'logout', onClick: logOut }];

  return (
    <header>
      <Grid container>
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justify="flex-end"
          className="menu-container"
        >
          <DropDownMenu
            menuTitle={<ProfileMenu authUser={authUser} Avatar={Avatar} />}
            childList={childList}
          />
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
