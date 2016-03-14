var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
	console.log(req.body);
	res.json({
		"message": "로그인 성공"
	});
});

module.exports = router;
