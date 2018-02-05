"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendFollowerNotification = functions.database
  .ref("/users/{userUid}")
  .onWrite(event => {
    const userUid = event.params.userUid;

    if (!event.data.val()) {
      return console.log("User ", userUid);
    }
    console.log("We have a new user UID:", userUid);

    const getAllUsers = admin
      .database()
      .ref("users")
      .orderByKey()
      .once("value");

    // Get the follower profile.
    const getPlayerProfilePromise = admin.auth().getUser(userUid);

    return Promise.all([getPlayerProfilePromise, getAllUsers]).then(results => {
      const player = results[0];
      const tokensPrueba = results[1];

      let tokens = [];
      tokensPrueba.forEach(childSnapshot => {
        const childData = childSnapshot.val();
        tokens.push(Object.keys(childData.notificationTokens).toString());
      });

      // Notification details.
      const payload = {
        notification: {
          title: "Hay un nuevo luchador!",
          body: `${player.displayName} esta participando en el torneo.`
        }
      };

      // Send notifications to all tokens.
      return admin
        .messaging()
        .sendToDevice(tokens, payload)
        .then(response => {
          // For each message check if there was an error.
          const tokensToRemove = [];
          response.results.forEach((result, index) => {
            const error = result.error;
            if (error) {
              console.error(
                "Failure sending notification to",
                tokens[index],
                error
              );
            }
          });
          return Promise.all(tokensToRemove);
        });
    });
  });
