"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

/**
 * Triggers when a user gets a new follower and sends a notification.
 *
 * Followers add a flag to `/followers/{followedUid}/{followerUid}`.
 * Users save their device notification tokens to `/users/{followedUid}/notificationTokens/{notificationToken}`.
 */
exports.sendFollowerNotification = functions.database
  .ref("/users/{userUid}")
  .onWrite(event => {
    const userUid = event.params.userUid;
    //const followedUid = event.params.followedUid;
    // If un-follow we exit the function.
    if (!event.data.val()) {
      return console.log("User ", userUid);
    }
    console.log("We have a new user UID:", userUid);

    const query = admin
      .database()
      .ref("users")
      .orderByKey()
      .once("value");

    // Get the list of device notification tokens.
    const getDeviceTokensPromise = admin
      .database()
      .ref(`/users/${userUid}/notificationTokens`)
      .once("value");

    // Get the follower profile.
    const getFollowerProfilePromise = admin.auth().getUser(userUid);

    return Promise.all([
      getDeviceTokensPromise,
      getFollowerProfilePromise,
      query
    ]).then(results => {
      const tokensSnapshot = results[0];
      const follower = results[1];
      const tokensPrueba = results[2];

      let tokensPrueba2 = [];
      tokensPrueba.forEach(childSnapshot => {
        const childData = childSnapshot.val();
        tokensPrueba2.push(
          Object.keys(childData.notificationTokens).toString()
        );
      });
      console.log("Prueba", tokensPrueba2);
      // Check if there are any device tokens.
      if (!tokensSnapshot.hasChildren()) {
        return console.log("There are no notification tokens to send to.");
      }
      console.log(
        "There are",
        tokensSnapshot.numChildren(),
        "tokens to send notifications to."
      );
      console.log("Fetched follower profile", follower);

      // Notification details.
      const payload = {
        notification: {
          title: "Hay un nuevo luchador!",
          body: `${follower.displayName} esta participando en el torneo.`
        }
      };

      // Listing all tokens.
      const tokens = tokensPrueba2;
      console.log("Tokens", tokens);
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
              // Cleanup the tokens who are not registered anymore.
              if (
                error.code === "messaging/invalid-registration-token" ||
                error.code === "messaging/registration-token-not-registered"
              ) {
                tokensToRemove.push(
                  tokensSnapshot.ref.child(tokens[index]).remove()
                );
              }
            }
          });
          return Promise.all(tokensToRemove);
        });
    });
  });
