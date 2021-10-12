// Import mysql module
let mysql = require('mysql2');

// Setup database connection parameter
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'survey'
});

// Connect with the database
connection.connect(function(e) {
    if (e) {

        // Show error messaage on failure
        return console.error('error: ' + e.message);
    }

    // Show success message if connected
    console.log('\nConnected to the MySQL server...\n');
});

// Set the query message
// $query = 'SELECT * from user';

// // Execute the database query
// connection.query($query, function(e, rows) {
//     if (e) {
//         // Show the error message
//         console.log("Error ocurred in executing the query.");
//         return;
//     }
//     /* Display the formatted data retrieved from 'book' table
//     using for loop */
//     console.log("The records of book table:\n");
//     console.log("Title\t\t\t\t Author\t\tprice\n");
//     for (let row of rows) {
//         console.log(row['name'], "\t\t", row['phone'], "\t", row['gmail']);
//     }
// });

// Close the database connection
connection.end(function() {
    console.log('\nConnection closed.\n');
});
module.exports = connection;