import React from "react";
import { Avatar, RaisedButton } from "material-ui";
import { logout } from "../helpers/auth";
import { firebaseAuth } from "../configs/constants";
import "./styles.css";

const appTokenKey = "appToken"; // also duplicated in Login.js
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firebaseUser: firebaseAuth().currentUser
    };

    console.log("User:", this.state.firebaseUser);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    logout().then(
      function() {
        localStorage.removeItem(appTokenKey);
        this.props.history.push("/login");
        console.log("user signed out from firebase");
      }.bind(this)
    );
  }

  goToStatus = () => this.props.history.push("/app/pj");

  render() {
    const { firebaseUser } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <h3>Welcome</h3>
        {/*<Avatar src={this.state.firebaseUser.user.photoURL}/>*/}

        <div className="bottonTorneo">
          <RaisedButton
            backgroundColor="#46c9f4"
            labelColor="#ffffff"
            label="Crear PJ"
            onClick={this.goToStatus}
          />
          <RaisedButton
            backgroundColor="#a4c639"
            labelColor="#ffffff"
            label="Sign Out"
            onClick={this.handleLogout}
          />
        </div>
      </div>
    );
  }
}
