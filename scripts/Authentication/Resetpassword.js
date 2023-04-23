const admin = require("../../utils/admin");

// change user password by taking email and password as input from terminal

const email = process.argv[2];
const password = process.argv[3];

admin
  .auth()
  .getUserByEmail(email)
  .then((userRecord) => {
    admin
      .auth()
      .updateUser(userRecord.uid, {
        password: password,
      })
      .then((userRecord) => {
        console.log("Successfully updated user", userRecord.toJSON());
      })
      .catch((error) => {
        console.log("Error updating user:", error);
      });
  })
  .catch((error) => {
    console.log("Error fetching user data:", error);
  });
