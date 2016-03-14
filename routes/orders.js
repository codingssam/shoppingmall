var express = require('express');
var router = express.Router();
var async = require('async');

router.route('/')
	.get(function(req, res, next) {
		var order = [
			{
				"id": 1, "name": "김나희", "address": "서울시", "giftwrap": true,
				"products": [
					{"id": 1, "name": "코카콜라", "price": 2000, "count": 5},
					{"id": 2, "name": "뚜러펑", "price": 4500, "count": 1},
					{"id": 3, "name": "오대쌀10kg", "price": 27000, "count": 1}
				]
			},
			{
				"id": 2, "name": "송병훈", "address": "춘천시", "giftwrap": false,
				"products": [
					{"id": 1, "name": "코카콜라", "price": 2000, "count": 2},
					{"id": 4, "name": "백산수1박스", "price": 8000, "count": 2},
					{"id": 5, "name": "스페셜K고구마", "price": 5500, "count": 2}
				]
			},
			{
				"id": 3, "name": "박해범", "address": "용인시", "giftwrap": false,
				"products": [
					{"id": 6, "name": "우유1L", "price": 2000, "count": 1},
					{"id": 7, "name": "퐁퐁", "price": 3500, "count": 1},
					{"id": 8, "name": "식빵", "price": 2500, "count": 1}
				]
			}
		];
		res.json(order);
	})
	.post(function(req, res, next) {
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
