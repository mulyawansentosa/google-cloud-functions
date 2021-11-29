var admin = require('firebase-admin');

// Generate serviceAccount.json by going to Firebase Console > Project Settings > Service Accounts > Generate Private Key
// This has been added to .gitignore as it shouldn't be commited to repo as it has ultimate power over your firebase project
var serviceAccount = {
  credential: admin.credential.cert(require("./serviceAccount.json"))
};
admin.initializeApp(serviceAccount);

let verifyRequest = function(req, res, callback) {
  var token;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
    // Handle token presented as a Bearer token in the Authorization header
    token = req.headers.authorization.split(' ')[1];

    admin.auth().verifyIdToken(token)
    .then(function(decodedToken) {
      console.log("Decoded token:")
      console.log(decodedToken);

      if (callback) {
        callback(req, res);
      }
    }).catch(function(error) {
      // Setup response
      console.log(error);
      res.status(401).send();
    });
  } else {
    // Setup response
    console.log('No bearer token');
    res.status(401).send();
  }
};

// GET
exports.getDrillResults = function(req, res) {
  console.log("Get Drill Results");

  let callback = function(req, res) {
    res.send([{
      id: 1,
      drillId: 1,
      name: "My Drill",
      score: 10
    }]);
  };

  verifyRequest(req, res, callback);
};

// GET
exports.getDrillResult = function(req, res) {
  console.log("Get Drill Result");
  var drillId = req.params.id;
  console.log("Drill Id: " + drillId);

  let callback = function(req, res) {
    res.send({
      drillId: 1,
      name: "My Drill",
      score: 10
    });
  };

  verifyRequest(req, res, callback);
};

// PUT
exports.updateDrillResult = function(req, res) {
  console.log("Update Drill Result");
  var drillId = req.params.id;
  var drillRequest = req.body;

  console.log("Drill Id: " + drillId);
  console.log("Drill Request: ");
  console.log(drillRequest);

  let callback = function(req, res) {
    res.send();
  };

  verifyRequest(req, res, callback);
};

// DELETE
exports.deleteDrillResult = function(req, res) {
  console.log("Delete Drill Result");
  var drillId = req.params.id;
  console.log("Drill Id: " + drillId);

  let callback = function(req, res) {
    res.send();
  };

  verifyRequest(req, res, callback);
};

// POST
exports.createDrillResult = function(req, res) {
  console.log("Create Drill Result");
  var drillRequest = req.body;
  console.log("Drill Request: ");
  console.log(drillRequest);

  let callback = function(req, res) {
    var createdDrillResultId = 1;
    var port = 3006;
    res.set("Location", "localhost:3006/v1/drillresult/" + createdDrillResultId);
    res.status(201).send();
  };

  verifyRequest(req, res, callback);
};
