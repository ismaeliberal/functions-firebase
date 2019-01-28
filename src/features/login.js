import React from "react";
import { FontIcon, RaisedButton } from "material-ui";
import { loginWithGoogle } from "../helpers/auth";
import { firebaseAuth, firebaseDB } from "../configs/constants";
import "./styles.css";
import firebase from "firebase";

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splashScreen: false
    };
  }

  handleGoogleLogin() {
    loginWithGoogle().catch(error => {
      alert(error); // or show toast
      localStorage.removeItem(firebaseAuthKey);
    });
    localStorage.setItem(firebaseAuthKey, "1");
  }

  componentWillMount() {
    if (localStorage.getItem(appTokenKey)) {
      this.props.history.push("/app/home");
      return;
    }
    this.requestPermission();

    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        console.log("User signed in: ", JSON.stringify(user));

        firebaseDB()
          .ref(`users/${user.uid}`)
          .update({
            displayName: user.displayName
          });
        this.saveToken(user);
        //this.displayAllUsers();
        //this.currentUid = user.uid;

        localStorage.removeItem(firebaseAuthKey);

        // here you could authenticate with you web server to get the
        // application specific token so that you do not have to
        // authenticate with firebase every time a user logs in
        localStorage.setItem(appTokenKey, user.uid);

        // store the token
        this.props.history.push("/app/home");
      }
    });
  }

  // Saves the token to the database if available. If not request permissions.
  saveToken = user => {
    firebase
      .messaging()
      .getToken()
      .then(currentToken => {
        if (currentToken) {
          firebaseDB()
            .ref("users/" + user.uid + "/notificationTokens/" + currentToken)
            .set(true);
        } else {
          this.requestPermission();
        }
      })
      .catch(err => {
        console.error("Unable to get messaging token.", err);
        if (err.code === "messaging/permission-default") {
          this.fcmErrorContainer.innerText =
            "You have not enabled notifications on this browser. To enable notifications reload the page and allow notifications using the permission dialog.";
        } else if (err.code === "messaging/notifications-blocked") {
          this.fcmErrorContainer.innerHTML =
            'You have blocked notifications on this browser. To enable notifications follow these instructions: <a href="https://support.google.com/chrome/answer/114662?visit_id=1-636150657126357237-2267048771&rd=1&co=GENIE.Platform%3DAndroid&oco=1">Android Chrome Instructions</a><a href="https://support.google.com/chrome/answer/6148059">Desktop Chrome Instructions</a>';
        }
      });
  };

  // Requests permission to send notifications on this browser.
  requestPermission = () => {
    console.log("Requesting permission...");
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        console.log("Notification permission granted.");
        this.saveToken();
      })
      .catch(err => {
        console.error("Unable to get permission to notify.", err);
      });
  };

  render() {
    console.log(firebaseAuthKey + "=" + localStorage.getItem(firebaseAuthKey));
    if (localStorage.getItem(firebaseAuthKey) === "1") return <SplashScreen />;
    return <LoginPage handleGoogleLogin={this.handleGoogleLogin} />;
  }
}

const iconStyles = {
  color: "#ffffff"
};
const LoginPage = ({ handleGoogleLogin }) => (
  <div>
    <h1>Login</h1>
    <div className="bottonTorneo">
      <RaisedButton
        label="Sign in with Google"
        labelColor={"#ffffff"}
        backgroundColor="#dd4b39"
        icon={<FontIcon className="fa fa-google-plus" style={iconStyles} />}
        onClick={handleGoogleLogin}
      />
    </div>
  </div>
);
const SplashScreen = () => <p>Loading...</p>;
