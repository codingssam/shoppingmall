var express = require('express');
var router = express.Router();
var async = require('async');

router.post('/', function(req, res, next) {
	var name = req.body.name;
	var address = req.body.address;
	var giftwrap = req.body.giftwrap;
	var productId = req.body.productId;
	var sql1 = "INSERT INTO orders (name, address, giftwrap) " +
						 "VALUES(?, ?, ?)";
	var sql2 = "INSERT INTO order_details (order_id, product_id) " +
					   "VALUES(?, ?)";
	pool.getConnection(function(err, conn) {
		if (err) {
			next(err);
		} else {
			conn.query(sql1, [name, address, giftwrap], function(err, result) {
				if (err) {
					conn.release();
					next(err);
				} else {
					var orderId = result.insertId;
				}
			});
		}
	});



});

module.exports = router;
