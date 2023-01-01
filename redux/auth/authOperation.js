import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';

import { authSlice } from './authReducer';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

//*  регистрация пользователя
const authSignUpUser =
  ({ email, password, name }) =>
  async dispatch => {
    createUserWithEmailAndPassword(auth, email, password, name)
      .then(async userCredential => {
        const user = userCredential.user;

        if (user !== null) {
          await updateProfile(auth.currentUser, {
            displayName: name,
          });
        }

        const { uid, displayName } = auth.currentUser;

        alert('Everything is ok');
        dispatch(
          updateUserProfile({
            userId: uid,
            nickname: displayName,
          })
        );
      })
      .catch(err)(alert(err.message));
  };

//* логин пользователя
const authSignInUser =
  ({ email, password }) =>
  async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        alert('Everything is ok');
      })
      .catch(error)(alert(error.message));
  };

const authSignOutUser = () => async (dispatch, getState) => {
  signOut(auth)
    .then(() => {
      dispatch(authSignOut());
    })
    .catch(error => {
      alert('Нету сил выйти....', error);
    });
};

const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      const { uid, displayName } = user;
      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export { authSignUpUser, authSignInUser, authSignOutUser, authStateChangeUser };
