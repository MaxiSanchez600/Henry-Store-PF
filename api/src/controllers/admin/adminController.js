const adminapp = require ('../../utils/config/firebaseAdmin.js')

function banUser (req,res,next) {
    let {id, boolean} = req.body;
    adminapp
    .auth()
    .updateUser(id, {
        disabled: boolean,
    })
    .then((userRecord) => {
        res.send(userRecord);
    })
    .catch((error) => {
        console.log('Error updating user:', error);
    });
}

function resetEmailUser (req,res,next) {
    let {id, email} = req.body;
    adminapp
    .auth()
    .updateUser(id, {
        email: email,
    })
    .then((userRecord) => {
        res.send(userRecord);
    })
    .catch((error) => {
        console.log('Error updating user:', error);
    });

}

function resetPassUser (req,res,next) {
    let {id} = req.body;
    adminapp
    .auth()
    .updateUser(id, {
        password: "valuecaracteristics07",
    })
    .then((userRecord) => {
        res.send(userRecord);
    })
    .catch((error) => {
        console.log('Error updating user:', error);
    });

}

function readUsers (req,res,next) {
    const listAllUsers = (nextPageToken) => {

        adminapp.auth()
          .listUsers(1000, nextPageToken)
          .then((listUsersResult) => {
            let listFormatUsers = listUsersResult.users.map(u => {
              return {
                  id: u.uid,
                  email: u.email,
                  disabled: u.disabled,
                  lastSignIn: u.metadata.lastSignInTime,
                  creationTime: u.metadata.creationTime,
                  registrationOrigin: u.providerData.providerId
              }
            });
            if (listUsersResult.pageToken) {
              listAllUsers(listUsersResult.pageToken);
            }
            return res.send(listFormatUsers)
          })
          .catch((error) => {
            console.log('Error listing users:', error);
          });
      };
      // Start listing users from the beginning, 1000 at a time.
      listAllUsers();
      

  
}

module.exports ={
    banUser,
    resetEmailUser,
    resetPassUser,
    readUsers
}