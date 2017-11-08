const cassandra = require('cassandra-driver');
const async = require('async');
const assert = require('assert');
var config = require('./config');

const authProviderLocalCassandra =
 new cassandra.auth.PlainTextAuthProvider(config.username, config.password);
const client = new cassandra.Client({contactPoints: [config.contactPoint], authProvider: authProviderLocalCassandra});

async.series([
  
  function connect(next) {
    client.connect(next);
  },
  
  function createKeyspace(next) {
    var query = "CREATE KEYSPACE IF NOT EXISTS uprofile WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' } ";
    client.execute(query, next);
    console.log("created keyspace");    
  },
  
  function createTable(next) {
    var query = "CREATE TABLE IF NOT EXISTS uprofile.user (user_id int PRIMARY KEY, user_name text, user_bcity text)";
    client.execute(query, next);
    console.log("created table");
  },
  
  function insert(next) {
    const queries = [
        {
            query: 'INSERT INTO  uprofile.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
            params: [1, 'VinodS', 'Dubai', '2017-10-3132']
        },
        {
          query: 'INSERT INTO  uprofile.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
          params: [2, 'MohammedS', 'Toronto', '2017-10-3133']
        },
        {
          query: 'INSERT INTO  uprofile.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
          params: [3, 'SiddeshV', 'Mumbai', '2017-10-3134']
        },
        {
          query: 'INSERT INTO  uprofile.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
          params: [4, 'KirilG', 'Seattle', '2017-10-3135']
        },
                {
          query: 'INSERT INTO  uprofile.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
          params: [5, 'GovindS', 'Belgaum', '2017-10-3136']
        },
        {
          query: 'INSERT INTO  uprofile.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
          params: [6, 'CareyM', 'Seattle', '2017-10-3137']
        },
        {
          query: 'INSERT INTO  uprofile.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
          params: [7, 'MatiasQ', 'Buenos Aires', '2017-10-3138']
        },
        {
          query: 'INSERT INTO  uprofile.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
          params: [8, 'Samer', 'Seattle', '2017-10-3139']
        },
        {
          query: 'INSERT INTO  uprofile.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
          params: [9, 'Shireesh', 'Seattle', '2017-10-3140']
        }
    ];
    client.batch(queries, { prepare: true}, next);
  },
  
  function selectAll(next) {
    console.log("\Select ALL");
    var query = 'SELECT * FROM uprofile.user';
    client.execute(query, { prepare: true}, function (err, result) {
      if (err) return next(err);
      result.rows.forEach(function(row) {
        console.log('Obtained row: %d | %s | %s ',row.user_id, row.user_name, row.user_bcity);
      }, this);
      next();
    });
  },
  
  function selectById(next) {
    console.log("\Getting by id");
    var query = 'SELECT * FROM uprofile.user where user_id=1';
    client.execute(query, { prepare: true}, function (err, result) {
      if (err) return next(err);
      result.rows.forEach(function(row) {
        console.log('Obtained row: %d | %s | %s ',row.user_id, row.user_name, row.user_bcity);
      }, this);
      next();
    });
  }
], function (err) {
  if (err) {
    console.error('There was an error', err.message, err.stack);
  }
  console.log('Please delete your table after verifying the presence of data in portal or from CQL');
  client.shutdown();
});