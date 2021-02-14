import { userConstants } from '../_constants';
import { signIn, signUp, logOut } from '../../lib/api/public';
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
        dispatch(success(user));
        window.location = user?.role === 'admin' ? '/admin' : '/dashboard';
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
        dispatch(success(user));
        if (callback) callback();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
}

function logout(callback) {
  logOut().then(callback);
  return { type: userConstants.LOGOUT };
}

function register(user) {
  const request = (user) => ({ type: userConstants.REGISTER_REQUEST, user });
  const success = (user) => ({ type: userConstants.REGISTER_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.REGISTER_FAILURE, error });
  return (dispatch) => {
    dispatch(request(user));

    signUp(user).then(
      (user) => {
        dispatch(success());
        console.log(user);
        dispatch(alertActions.success('Registration successful'));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
}

// function getAll() {
//   const request = () => ({ type: userConstants.GETALL_REQUEST });
//   const success = (users) => ({ type: userConstants.GETALL_SUCCESS, users });
//   const failure = (error) => ({ type: userConstants.GETALL_FAILURE, error });
//   return (dispatch) => {
//     dispatch(request());

//     authService.getAll().then(
//       (users) => dispatch(success(users)),
//       (error) => dispatch(failure(error.toString())),
//     );
//   };
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function handleDelete(id) {
//   const request = (id) => ({ type: userConstants.DELETE_REQUEST, id });
//   const success = (id) => ({ type: userConstants.DELETE_SUCCESS, id });
//   const failure = (id, error) => ({ type: userConstants.DELETE_FAILURE, id, error });
//   return (dispatch) => {
//     dispatch(request(id));

//     authService.delete(id).then(
//       (user) => dispatch(success(id)),
//       (error) => dispatch(failure(id, error.toString())),
//     );
//   };
// }

export const userActions = {
  login,
  logout,
  register,
  update,
  // getAll,
  // delete: handleDelete,
};
