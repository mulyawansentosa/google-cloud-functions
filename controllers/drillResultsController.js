// GET
exports.getDrillResults = function(req, res) {
  console.log("Get Drill Results");

  // TODO: load drill results and send back

  res.send([{
    drillId: 1,
    name: "My Drill",
    score: 10
  }]);
};

// GET
exports.getDrillResult = function(req, res) {
  console.log("Get Drill Result");
  var drillId = req.params.id;
  console.log("Drill Id: " + drillId);

  // TODO: load drill result and send back

  res.send({
    drillId: 1,
    name: "My Drill",
    score: 10
  });
};

// PUT
exports.updateDrillResult = function(req, res) {
  console.log("Update Drill Result");
  var drillId = req.params.id;
  var drillRequest = req.body;

  console.log("Drill Id: " + drillId);
  console.log("Drill Request: " + drillRequest);

  // TODO: update drill result

  res.send();
};

// DELETE
exports.deleteDrillResult = function(req, res) {
  console.log("Delete Drill Result");
  var drillId = req.params.id;
  console.log("Drill Id: " + drillId);

  // TODO: delete drill result

  res.send();
};

// POST
exports.createDrillResult = function(req, res) {
  console.log("Create Drill Result");
  var drillRequest = req.body;
  console.log("Drill Request: " + drillRequest);

  // TODO: delete drill result

  var createdDrillResultId = 1;
  var port = process.env.PORT || 3006;
  res.set('Location', 'localhost:' + port + "/v1/drillresult/" + createdDrillResultId);
  res.status(201).send();
};
