// GET
exports.getDrillResults = function(req, res) {
  var drillId = req.params.id;

  // TODO: load drill results and send back

  res.send([{
    drillId: 1,
    name: "My Drill",
    score: 10
  }]);
};

// GET
exports.getDrillResult = function(req, res) {
  var drillId = req.params.id;

  // TODO: load drill result and send back

  res.send({
    drillId: 1,
    name: "My Drill",
    score: 10
  });
};

// PUT
exports.updateDrillResult = function(req, res) {
  var drillId = req.params.id;
  let drillResult = req.body;

  // TODO: update drill result

  res.send();
};

// DELETE
exports.deleteDrillResult = function(req, res) {
  var drillId = req.params.id;

  // TODO: delete drill result

  res.send();
};

// POST
exports.createDrillResult = function(req, res) {
  let drillResult = req.body;

  // TODO: delete drill result

  let createdDrillResultId = 1;
  let port = process.env.PORT || 3006;
  res.set('Location', 'localhost:' + port + "/v1/drillresult/" + createdDrillResultId);
  res.status(201).send();
};
