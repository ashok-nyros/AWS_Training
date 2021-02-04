var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "database-2.cvmfllpurn7p.ap-southeast-1.rds.amazonaws.com",
    user: "dbadmin",
    password: "AshokNyros",
    port: 3306,
    database: "CRUD"
})
connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

connection.query("select * from Employee", (err, rows, fields) => {
    if (!err)
        console.log(rows[0])
    else
        console.log(err);
});
// console.log(result)
connection.end();