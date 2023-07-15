import { app } from "../../fireBaseConfig";
import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { createUserAfterSignUp } from "../database/UserApi";
import { LoginData, SignUpData } from "../../../Types/Auth";

// TODO: add try catches to catch errors

export const auth = getAuth(app);
console.log("logged in user", auth.currentUser);

export async function signup(user: SignUpData) {
  const {
    user: { uid },
  } = await createUserWithEmailAndPassword(auth, user.email, user.password);
  return await createUserAfterSignUp(uid, user);
}
export async function login(data: LoginData) {
  if (data.rememberMe) {
    await setPersistence(auth, browserLocalPersistence);
  } else {
    await setPersistence(auth, browserSessionPersistence);
  }
  const userData = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  if (data.rememberMe) {
    window.localStorage.setItem("currentUser", JSON.stringify(userData));
  } else {
    window.sessionStorage.setItem("currentUser", JSON.stringify(userData));
  }

  return userData;
}

export async function logout() {
  return await auth.signOut();
}

export async function getCurrentUser() {
  return await auth.currentUser;
}
