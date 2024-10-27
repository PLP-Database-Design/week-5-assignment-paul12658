

const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql2')
const app = express()
dotenv.config()



const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// console.log(process.env.DB_USRENAME)
// console.log(process.env.DB_HOST)
// console.log(process.env.DB_PASSWORD)
// console.log(process.env.DB_DATABASE)


// app.get('/', (req, res) => {
//   res.send("Hello, world")
// })




// Question 1 goes here
app.get('/patients', (req,res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  

  db.query(sql, (err,results) => {
      if(err){
        return res.status(500).send(err)
      }
      res.json(results);
       

    })
  
})


// Question 2 goes here

app.get('/providers', (req,res) => {
  const sql = 'SELECT  first_name, last_name, provider_specialty FROM providers';
  

  db.query(sql, (err,results) => {
      if(err){
        return res.status(500).send(err)
      }
      res.json(results);
       

    })
  
})

// Question 3 goes here
app.get('/patients/:first_name', (req, res) => {
  const {first_name} = req.params; // Get 'first_name' from query parameters
  console.log({first_name})

  // SQL query to select patients by first name, using a placeholder to prevent SQL injection
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';

  // Execute the query with 'first_name' as the parameter
  db.query(sql, [first_name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Check if patients were found
    if (results.length === 0) {
      return res.status(404).json({ message: 'No patients found with that first name' });
    }

    // Send results as JSON
    res.json(results);
  });
});




// Question 4 goes here
app.get('/providers_specialty/:specialty', (req,res) => {
   const { specialty } = req.params; //destructuring of params object
   console.log({specialty}); //test if  it works in terminal
   const sql = 'SELECT  first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  

  db.query(sql, [specialty], (err,results) => {  //pass specialty as array
      if(err){
        return res.status(500).send(err)
      }
      if(results.length === 0) {
        return res.status(404).json({message: 'Specialty doesnt exists!'})
      }
      res.json(results)
       

    })
  
})



// listen to the server
const PORT = 3003
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})
