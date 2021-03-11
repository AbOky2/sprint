import { userConstants } from '../_constants';
import { signIn, signUp, logOut, resetPassword } from '../../lib/api/public';
import { updateUserApiMethod } from '../../lib/api/customer';
import { alertActions } from './alert.actions';

function login(args) {
  const request = (user) => ({ type: userConstants.LOGIN_REQUEST, user });
  const success = (user) => ({ type: userConstants.LOGIN_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.LOGIN_FAILURE, error });
  return (dispatch) => {
    dispatch(request({ username: args.username }));

    signIn(args)
      .then(({ user }) => {
        if (user && user._id) {
          dispatch(success(user));
          window.location = user?.role === 'admin' ? '/admin' : '/dashboard';
        }
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };
}

function update(args, callback) {
  const request = (user) => ({ type: userConstants.UPDATE_REQUEST, user });
  const success = (user) => ({ type: userConstants.UPDATE_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.UPDATE_FAILURE, error });
  return (dispatch) => {
    dispatch(request({ username: args.username }));
    updateUserApiMethod(args).then(
      ({ user }) => {
        if (user && user._id) {
          dispatch(success(user));
          if (callback) callback();
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
}

function updateUserDataOnly(args, callback) {
  const request = (user) => ({ type: userConstants.UPDATE_REQUEST, user });
  const success = (user) => ({ type: userConstants.UPDATE_SUCCESS, user });
  return (dispatch) => {
    dispatch(request({ username: args.username }));
    dispatch(success(args));
    if (callback) callback();
  };
}

function logout() {
  logOut().then(() => {
    window.location = '/login';
  });
  return { type: userConstants.LOGOUT };
}

function register(user) {
  const request = (user) => ({ type: userConstants.REGISTER_REQUEST, user });
  const success = (user) => ({ type: userConstants.REGISTER_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.REGISTER_FAILURE, error });
  return (dispatch) => {
    dispatch(request(user));

    signUp(user).then(
      ({ user }) => {
        if (user && user._id) {
          dispatch(success(user));
          window.location = user?.role === 'admin' ? '/admin' : '/dashboard';
          dispatch(alertActions.success('Registration successful'));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
}
function resetPass(args) {
  const success = (user) => ({ type: userConstants.LOGIN_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.LOGIN_FAILURE, error });
  return (dispatch) => {
    resetPassword(args)
      .then(({ user }) => {
        if (user && user._id) {
          dispatch(success(user));
          window.location = user?.role === 'admin' ? '/admin' : '/dashboard';
        }
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };
}
export const userActions = {
  login,
  logout,
  register,
  update,
  resetPass,
  updateUserDataOnly,
};
