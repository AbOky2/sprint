import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Icon } from '../form';
import { userActions } from '../../redux/_actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    '& > a': {
      display: 'block',
      padding: '1rem',
      height: 64,
      textAlign: 'center',
      '& > img': {
        display: 'inline-block',
        height: 'calc(64px - 2rem)',
      },
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logout: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
}));

const menuList = [
  {
    slug: 'List',
    text: 'Utilisateurs',
    name: 'Gestion des utilisateurs',
    path: '/admin',
    iconType: 'house',
  },
  {
    slug: 'partners',
    text: 'Partenaires',
    name: 'Gestion des offres partenaires',
    path: '/admin/partners',
    iconType: 'house',
  },
  {
    slug: 'lot',
    text: 'Selection Lot',
    name: 'Lot mis en avant',
    path: '/admin/selected_lot',
    iconType: 'house',
  },
];
function ResponsiveDrawer({ children, window, logout }) {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const currNamElem = menuList.find((elem) => elem.path === router.pathname);
  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Link href="/admin">
          <a>
            <img src="/logo.png" alt="kit le nid" />
          </a>
        </Link>
      </div>
      <Divider />
      {menuList.map(({ text, slug, path, iconType }) => (
        <div key={slug}>
          <Link href={path}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <a>
                    <Icon type={iconType} color="iconBlue" />
                  </a>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </List>
          </Link>
          <Divider />
        </div>
      ))}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Icon type="logo" />
          </IconButton>
          <Typography variant="h6" noWrap>
            {currNamElem ? currNamElem.name : ''}
          </Typography>
          <div onClick={logout} className={classes.logout}>
            Se déconnecter
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{children}</main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const mapState = () => ({});

const actionCreators = {
  logout: userActions.logout,
};
export default connect(mapState, actionCreators)(ResponsiveDrawer);
