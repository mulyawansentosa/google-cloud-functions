var drillResultsController = require('./controllers/drillResultsController');

module.exports = function(app) {
  app.route('/v1/drillresult')
    .post(drillResultsController.createDrillResult);

  app.route('/v1/drillresult/:id')
    .put(drillResultsController.updateDrillResult);

  app.route('/v1/drillresult/:id')
    .delete(drillResultsController.deleteDrillResult);

  app.route('/v1/drillresult/:id')
    .get(drillResultsController.getDrillResult);

  app.route('/v1/drillresult')
    .get(drillResultsController.getDrillResults);
};
