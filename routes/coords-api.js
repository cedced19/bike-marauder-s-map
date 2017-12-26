var express = require('express');
var router = express.Router();
var auth = require('../policies/auth');
var fs = require('fs');
var coords;

try {
  coords = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../coordinates.json'), 'utf8'));
} catch (e) {
  coords = [];
}

/* GET Coords: get all coords */
router.get('/', auth, function(req, res) {
  res.json(coords);
});

/* POST Coords */
router.post('/', function(req, res, next) {
  coords = coords.concat(req.body);
  fs.writeFile('./coordinates.json', JSON.stringify(coords), function (err) {
    if (err) {
      err = new Error('Error saving the new coords.');
      err.status = 500;
      return next(err);
    }
    res.json({status: 'ok'});
  });
});

module.exports = router;
