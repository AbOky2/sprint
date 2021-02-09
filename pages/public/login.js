import React, { useState } from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import { Grid, Checkbox, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Btn, Select, Input } from '../../components/form';
import withAuth from '../../lib/withAuth';
import { Student, Buyer } from '../../helpers/user';
import { signIn, signUp } from '../../lib/api/public';
import LogoImg from '../../static/img/logo-full.png';

const useStyles = makeStyles({
  container: {
    height: '100%',
    paddingTop: '3rem',
    '& > div > a > img': {
      width: 137,
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
      marginBottom: '30px',
      textAlign: 'center',
      fontFamily: 'Open Sans',
      fontSize: '1.8rem',
      fontWeight: '600',
      color: 'rgba(26, 46, 108, 0.5)',
    },
    '& > div > a': {
      marginBottom: '3.5rem',
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
  },
  loginBtn: {
    padding: '2rem 0',
  },
  btnContainer: {
    marginTop: 30,
    '& > div:first-of-type': {
      paddingRight: 5,
    },
    '& > div:last-of-type': {
      paddingLeft: 5,
    },
  },
  checkBoxContainer: {
    marginTop: '2rem',
    '& > span': {
      paddingLeft: 0,
    },
    '& h3': {
      color: 'rgba(26, 46, 108, 0.5)',
    },
  },
});
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
      label="Téléphone"
      placeholder="Téléphone"
      onChange={handleChange}
      name="phone"
      type="phone"
      position="right"
    />
    <Input
      label="Mot de passe"
      placeholder="Mot de passe"
      onChange={handleChange}
      name="password"
      type="password"
      position="left"
    />
    <Select
      name="status"
      value={values.role}
      onChange={handleChange}
      list={[
        { name: 'Etudiant', value: Student },
        { name: 'Jeune Actif', value: Buyer },
      ]}
      label="Status"
      position="right"
    />
    <Input label="Code parrain" placeholder="Code" onChange={handleChange} name="sponsorshipCode" />
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
      position="left"
    />
    <Input
      label="Mot de passe"
      value={values.password}
      onChange={handleChange}
      name="password"
      type="password"
      position="right"
    />
  </>
);
const propTypes = {
  values: PropTypes.objectOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
};
SignIn.propTypes = propTypes;
SignUp.propTypes = propTypes;

const LoginTab = () => {
  const [state, setState] = useState({
    email: 'toto@test.test',
    firstName: 'toto',
    lastName: 'toto',
    password: 'test',
    phone: '000000000',
    sponsorshipCode: 'sdfsdf',
    role: Student,
  });
  // const [state, setState] = useState({ email: 'roomer@test.test', password: 'test' });
  const [isRegisterinView, setIsRegisterinView] = useState(true);
  const [checked, setChecked] = React.useState(true);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const toggleView = () => setIsRegisterinView(!isRegisterinView);

  const onClick = () => {
    let data = state;
    let authReq = signUp;
    NProgress.start();

    if (!isRegisterinView) {
      data = { email: data.email, password: data.password };
      authReq = signIn;
    }

    authReq(data).then(({ user }) => {
      NProgress.done();
      window.location = user.role === 'admin' ? '/admin' : '/dashboard';
    });
  };
  const handleChange = (name) => ({ target: { value } }) => setState({ ...state, [name]: value });
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Grid container justify="center" alignItems="center" id="login" className={classes.container}>
        <div className="fullwidth text-center">
          <a href="/">
            <img src={LogoImg} alt="kit le nid" />
          </a>
          <Grid container item alignItems="stretch" justify="center">
            <Grid item xs={6} className={classes.signinLogo} />
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
              <Grid container item alignItems="flex-end">
                <div className="fullwidth">
                  <h1>{isRegisterinView ? 'Inscrivez-vous gratuitement !' : 'Connexion'}</h1>
                  <h2>Accéder à tout notre accompagnement.</h2>
                  <Grid container item justify="center" className={classes.formContainer}>
                    {isRegisterinView ? (
                      <SignUp values={state} handleChange={handleChange} onClick={onClick} />
                    ) : (
                      <SignIn values={state} handleChange={handleChange} onClick={onClick} />
                    )}
                  </Grid>
                  {isRegisterinView && (
                    <Grid container alignItems="center" className={classes.checkBoxContainer}>
                      <Checkbox
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                      <Typography variant="h3">J’accepte les conditions générales</Typography>
                    </Grid>
                  )}
                  <Grid container justify="center" className={classes.btnContainer}>
                    <Grid item>
                      <Btn
                        text={isRegisterinView ? 'Créer un compte' : 'Connectez-vous'}
                        onClick={onClick}
                        className="blueColor full login-btn"
                      />
                    </Grid>
                    <Grid item>
                      <Btn
                        text={isRegisterinView ? 'Connectez-vous' : 'Créer un compte'}
                        onClick={toggleView}
                        whiteColor
                      />
                    </Grid>
                  </Grid>
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

export default withAuth(LoginTab, { logoutRequired: true });
