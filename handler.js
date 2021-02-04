'use strict';
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: "database-2.cvmfllpurn7p.ap-southeast-1.rds.amazonaws.com",
    user: "dbadmin",
    password: "AshokNyros",
    port: 3306,
    database: "CRUD",

});
module.exports.getEmployees = (event, context, callback) => {
    console.log("Before connecting")
    context.callbackWaitsForEmptyEventLoop = false;
    connection.query('SELECT * from Employee', (error, results, fields) => {
        if (error) {
            callback(error, null)
        } else {
            if (results.length > 0) {
                callback(null, results)
            } else {
                callback(null, "No records found")
            }
        }
        console.log("in connection function")
    })
}

module.exports.getEmployee = (event, context, callback) => {
    console.log("Before connecting")
    context.callbackWaitsForEmptyEventLoop = false;
    console.log(event)
    let emp_id = event.query.empid;
    connection.query("SELECT * from Employee where emp_id =" + emp_id, (error, results, fields) => {
        if (error) {
            callback(error, null)
        } else {
            if (results.length > 0) {
                callback(null, results)
            } else {
                callback(null, "No Employee Exist with Employee Id " + emp_id)
            }
        }
        console.log("in connection function")
    })
}

module.exports.deleteEmployee = (event, context, callback) => {
    console.log("Before connecting")
    context.callbackWaitsForEmptyEventLoop = false;
    console.log(event)
    let emp_id = event.query.empid;
    connection.query("DELETE from Employee where emp_id =" + emp_id, (error, results, fields) => {
        if (error) {
            callback(error, null)
        } else {
            if (results.affectedRows > 0) {
                callback(null, "Record Deleted")
            } else {
                callback(null, "No Employee Exist with Employee Id " + emp_id)
            }
        }
        console.log("in connection function")
    })
}

module.exports.createEmployee = (event, context, callback) => {
    console.log("Before connecting")
    context.callbackWaitsForEmptyEventLoop = false;
    let empid = event.body.id;
    let empname = event.body.name;
    connection.query("INSERT into Employee(emp_id,emp_name) Values('" + empid + "','" + empname + "' )", (error, results, fields) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, "Record Inserted")
        }
        console.log("in connection function")
    })
}

module.exports.updateEmployee = (event, context, callback) => {
    console.log("Before connecting")
    context.callbackWaitsForEmptyEventLoop = false;
    let empid = event.query.empid;
    let empname = event.body.name;
    console.log("data 1 is" + event.query.empid)
    console.log("data 2 is" + event.body.name)
    connection.query("update Employee set emp_name = '" + empname + "' where emp_id= '" + empid + "'", (error, results, fields) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, "Record Updated")
        }
        console.log("in connection function")
    })
}