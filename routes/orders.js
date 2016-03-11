var express = require('express');
var router = express.Router();
var async = require('async');

router.post('/', function(req, res, next) {
	console.log(req.headers['content-type']);
	console.log(req.body);
	var name = req.body.name;
	var address = req.body.address;
	var giftwrap = req.body.giftwrap;
	var products = req.body.products;
	var sql1 = "INSERT INTO orders (name, address, giftwrap) " +
						 "VALUES(?, ?, ?)";
	var sql2 = "INSERT INTO order_details (order_id, product_id, count) " +
					   "VALUES(?, ?, ?)";

	pool.getConnection(function(err, connection) {
		if (err) {
			next(err);
		} else {
			connection.beginTransaction(function(err) {
				if (err) {
					connection.release();
					next(err);
				}
				connection.query(sql1, [name, address, giftwrap], function(err, result) {
					if (err) {
						return connection.rollback(function() {
							connection.release();
							next(err);
						});
					}
					var orderId = result.insertId;

					async.eachSeries(products, function(product, cb) {
						connection.query(sql2, [orderId, product.id, product.count], function(err) {
							if (err) {
								return cb(err);
							}
							cb(null);
						});
					}, function(err) {
						if (err) {
							return connection.rollback(function() {
								connection.release();
								next(err);
							});
						}
						connection.commit(function(err) {
							if (err) {
								return connection.rollback(function() {
									connection.release();
									next(err);
								});
							}
							connection.release();
							res.json({
								id: orderId
							});
						});
					});

				});
			});
		}
	});
});

module.exports = router;
