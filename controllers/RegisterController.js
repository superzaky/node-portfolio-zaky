var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    var data = {
        name: "John Doe",
        username: "john",
        admin: false
    };
    res.status(200).json(data);
});

module.exports = router;
