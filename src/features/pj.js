import React from "react";
import { RaisedButton } from "material-ui";
import "./styles.css";
import { firebaseDB } from "../configs/constants";

export default class Pj extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      buttonLabel: "Apuntarse a torneo"
    };
  }
  inscribirseTorneo = () => {
    firebaseDB()
      .ref("campeones/")
      .push()
      .set({
        nombre: "ISMAEL"
      });
    this.setState({
      disabled: true,
      buttonLabel: "Ya estas apuntado!"
    });
  };

  render() {
    const { disabled, buttonLabel } = this.state;
    return (
      <div>
        <h1>Campeon ...</h1>
        <h3>Stats</h3>
        {/*<Avatar src={this.state.firebaseUser.user.photoURL}/>*/}
        <div className="pjExtraInfoCont">
          <span className="extraInfoText">{`Dex: 99`}</span>
          <span className="extraInfoText">{`Str: 99`}</span>
          <span className="extraInfoText">{`Spd: 99`}</span>
          <span className="extraInfoText">{`Int: 99`}</span>
        </div>
        <div className="bottonTorneo">
          <RaisedButton
            disabled={disabled}
            backgroundColor="#dd4b39"
            labelColor="#ffffff"
            label={buttonLabel}
            onClick={this.inscribirseTorneo}
          />
        </div>
      </div>
    );
  }
}
