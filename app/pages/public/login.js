import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { Grid, Checkbox, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { userActions } from '../../redux/_actions';
import { Btn, Select, Input } from '../../components/form';
import withAuth from '../../lib/withAuth';
import { Student, userRoleSelect } from '../../helpers/user';
import { pick } from '../../helpers/convertAndCheck';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    paddingTop: '3rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '2rem ',
      backgroundColor: 'white',
    },
    '& > div > a > img': {
      width: 137,
    },
    '& > div > div': {
      minHeight: 'calc(100vh - 200px)',
    },
    '& h1': {
      display: 'block',
      marginTop: 0,
      marginBottom: '1rem',
      textAlign: 'center',
      fontFamily: 'Open Sans',
      fontSize: '3rem',
      fontWeight: 'bold',
      letterSpacing: 'normal',
      color: '#4f80ff',
    },
    '& h2': {
      paddingLeft: '0',
      marginTop: '0',
      marginBottom: '3rem',
      textAlign: 'center',
      fontFamily: 'Open Sans',
      fontSize: '1.8rem',
      fontWeight: '600',
      color: 'rgba(26, 46, 108, 0.5)',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '1.5rem ',
      },
    },
    '& > div > a': {
      marginBottom: '3.5rem',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '1rem ',
      },
    },
    '& input': {
      display: 'block',
      padding: '3rem 1.4rem',
      boxSizing: 'border-box',
      width: '100%',
      height: '38px',
      borderRadius: '6px',
      border: 'solid 1px #c7cfd6',
      fontFamily: 'Open Sans',
      fontSize: '1.4rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#8e97a1',
    },
    '& input:focus': {
      boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.11)',
      borderColor: '#06ae88',
    },
    '& a': {
      display: 'inline-block',
      color: '#0fc1a9',
    },
  },
  signinFormContainer: {
    padding: '4rem 8.5rem ',
    backgroundColor: 'white',
    borderRadius: '1rem',
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    [theme.breakpoints.down('sm')]: theme.space.bodyWrapper,
  },
  formContainerParent: {
    minHeight: '100vh',
    margin: 'auto',
  },
  formContainer: {
    borderRadius: '15px',
    textAlign: 'left',
    '& p': {
      fontFamily: 'Open Sans',
      fontSize: '1.6rem',
    },
  },
  signinLogo: {
    borderTopLeftRadius: '1rem',
    borderBottomLeftRadius: '1rem',
    background: "url('../../static/img/login.png') no-repeat",
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
      minHeight: '30vh',
      backgroundPosition: 'center',
    },
  },
  loginBtn: {
    padding: '2rem 0',
  },
  btnContainer: {
    marginTop: '3rem',
    '& > div:first-of-type': {
      paddingRight: 5,
      [theme.breakpoints.down('sm')]: {
        paddingRight: 0,
        marginBottom: '2rem',
      },
    },
    '& > div:last-of-type': {
      paddingLeft: 5,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '2rem',
    },
  },
  checkBoxContainer: {
    marginTop: '2rem',
    '& > span': {
      paddingLeft: 0,
    },
    '& h3': {
      color: 'rgba(26, 46, 108, 0.5)',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
  },
  resetPassword: {
    marginTop: '2rem',
    textAlign: 'center',
    fontSize: '1.5rem',
    color: `${theme.palette.primary.main}!important`,
  },
}));
const SignUp = ({ values = {}, handleChange }) => (
  <Grid container item>
    <Input
      label="Nom*"
      placeholder="Nom*"
      onChange={handleChange}
      name="lastName"
      position="left"
    />
    <Input
      label="Prénom*"
      placeholder="Prénom*"
      onChange={handleChange}
      name="firstName"
      position="right"
    />
    <Input
      label="E-mail*"
      placeholder="Votre e-mail"
      onChange={handleChange}
      name="email"
      type="email"
      position="left"
    />
    <Input
      label="Téléphone*"
      placeholder="Téléphone"
      onChange={handleChange}
      name="phone"
      type="phone"
      position="right"
    />
    <Input
      label="Mot de passe*"
      placeholder="Mot de passe"
      onChange={handleChange}
      name="password"
      type="password"
      position="left"
    />
    <Select
      name="role"
      value={values.role}
      onChange={handleChange}
      list={userRoleSelect}
      label="Status*"
      position="right"
    />
    <Input
      value={values.sponsorshipCode}
      label="Code parrain"
      placeholder="Code"
      onChange={handleChange}
      name="sponsorshipCode"
    />
  </Grid>
);
const SignIn = ({ values = {}, handleChange }) => (
  <>
    <Input
      label="E-mail*"
      value={values.email}
      onChange={handleChange}
      name="email"
      type="email"
      placeholder="Votre e-mail"
      position="left"
    />
    <Input
      label="Mot de passe*"
      value={values.password}
      onChange={handleChange}
      name="password"
      type="password"
      placeholder="Mot de passe"
      position="right"
    />
  </>
);
const propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
SignIn.propTypes = propTypes;
SignUp.propTypes = propTypes;

const LoginTab = ({
  login,
  register,
  router: {
    query: { sponsorshipCode },
  },
}) => {
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    sponsorshipCode,
    role: Student,
  });

  const [isRegisterinView, setIsRegisterinView] = useState(!!sponsorshipCode);
  const [checked, setChecked] = React.useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  const toggleView = () => setIsRegisterinView(!isRegisterinView);

  const onClick = () => {
    let data = { ...state };
    let authReq;

    if (!isRegisterinView) {
      data = { email: data.email, password: data.password };
      if (!data.email || !data.password) return;
      authReq = login;
    } else {
      const pickdata = [
        'email',
        'firstName',
        'lastName',
        'role',
        'password',
        'phone',
      ];
      if (
        !data.email ||
        !data.firstName ||
        !data.lastName ||
        !data.password ||
        !data.role ||
        !data.phone
      ) {
        toast.warn('Veuillez remplir les champs obligatoires');
        return;
      }

      if (!checked) {
        toast.warn('Veuillez accepter les conditions générales');
        return;
      }
      if (data.sponsorshipCode?.length) pickdata.push('sponsorshipCode');
      if (document.referrer) {
        data.referrer_url = document.referrer;
        pickdata.push('referrer_url');
      }
      data = pick(data, pickdata);
      authReq = register;
    }

    authReq(data);
  };
  const handleChange = (name) => ({ target: { value } }) =>
    setState({ ...state, [name]: value });
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Grid
        container
        justify="center"
        alignItems="center"
        id="login"
        className={classes.container}
      >
        <div className="fullwidth text-center">
          <a href="/">
            <img src="/logo.svg" alt="kit le nid" />
          </a>
          <Grid container item alignItems="stretch" justify="center">
            <Grid item md={6} xs={12} className={classes.signinLogo} />
            <Grid
              container
              item
              direction="column"
              justify="space-between"
              alignItems="center"
              md={6}
              xs={12}
              className={classes.signinFormContainer}
            >
              <Grid container alignItems="center">
                <div className="fullwidth">
                  <h1>
                    {isRegisterinView
                      ? 'Inscrivez-vous gratuitement !'
                      : 'Connexion'}
                  </h1>
                  <h2>Accéder à tout notre accompagnement.</h2>
                  <Grid
                    container
                    item
                    justify="center"
                    alignItems="center"
                    className={classes.formContainer}
                  >
                    {isRegisterinView ? (
                      <SignUp
                        values={state}
                        handleChange={handleChange}
                        onClick={onClick}
                      />
                    ) : (
                      <SignIn
                        values={state}
                        handleChange={handleChange}
                        onClick={onClick}
                      />
                    )}
                  </Grid>
                  {isRegisterinView && (
                    <Grid
                      container
                      alignItems="center"
                      className={classes.checkBoxContainer}
                    >
                      <Checkbox
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onClick={handleCheck}
                      />
                      <Typography variant="h3">
                        J’accepte les conditions générales
                      </Typography>
                    </Grid>
                  )}
                  <Grid
                    container
                    justify="center"
                    className={classes.btnContainer}
                  >
                    <Grid item>
                      <Btn
                        text={
                          isRegisterinView
                            ? 'Créer un compte'
                            : 'Connectez-vous'
                        }
                        onClick={onClick}
                        className="blueColor full login-btn"
                      />
                    </Grid>
                    <Grid item>
                      <Btn
                        text={
                          isRegisterinView
                            ? 'Connectez-vous'
                            : 'Créer un compte'
                        }
                        onClick={toggleView}
                        whiteColor
                      />
                    </Grid>
                  </Grid>
                  <Link href="/public/resetPassword">
                    <a className={classes.resetPassword}>
                      Mot de passe oublié ?
                    </a>
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

LoginTab.propTypes = {};

const mapState = (state) => {
  const { loggedIn } = state.authentication;

  return { loggedIn };
};

const actionCreators = {
  register: userActions.register,
  login: userActions.login,
  logout: userActions.logout,
};
export default withAuth(
  connect(mapState, actionCreators)(withRouter(LoginTab)),
  {
    logoutRequired: true,
  }
);
