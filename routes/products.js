var express = require('express');
var router = express.Router();
var async = require('async');

router.get('/', function(req, res, next) {
	var products = [];
	var sql = "SELECT id, name, description, category, price " +
					  "FROM products";
	pool.getConnection(function(err, conn) {
		if (err) {
			next(err);
		} else {
			conn.query(sql, function(err, rows, fields) {
				if (err) {
					conn.release();
					next(err);
				} else {
					conn.release();
					async.each(rows, function(row, callback) {
						var product = {
							"id": row['id'],
							"name": row['name'],
							"description": row['description'],
							"category": row['category'],
							"price": row['price']
						};
						products.push(product);
						callback();
					}, function(err) {
						if (err) {
							next(err);
						} else {
							res.json(products);
						}
					});
				}
			});
		}
	});



});

module.exports = router;
