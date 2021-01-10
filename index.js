const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const fileUpload = require('express-fileupload');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qemdz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('doctor'));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

const port = 5000;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const DoctorsPortalcollection = client.db("doctorsPortal").collection("doctorsPortalCollection");

//   app.post('/addData', (req, res) => {
//       const appointment = req.body;
//       DoctorsPortalcollection.insertOne(appointment)
//       .then(result => {
//           res.send(result.insertedCount);
//       })
//   })

app.post('/appointment', (req, res) => {
  const data = req.body;
  DoctorsPortalcollection.insertOne(data)
  .then((result) => {
    console.log(result)
  })
})

app.post('/appointmentByDate', (req, res) => {
  const data = req.body;
  console.log(data.date)
  DoctorsPortalcollection.find({date : data.date})
  .toArray((err, documents) => {    
    res.send(documents)
  })
})

app.get('/', (req, res) => {
  res.send("hefdf dfndfd")
})

// app.post('/addDoctor', (req, res) => {
// const file = req.files.file; 
// const email = req.body.email;
// console.log(file, email);
// })

// app.post('/addDoctor', (req, res) =>{
//   console.log(req.files.foo); // the uploaded file object
//   // req.files.foo.mv(`${__dirname}/doctor/`, err =>{
//   //   if(err){console.log(err)}
//   // })
// });



    
console.log('connect')
//   client.close();
});

 



app.listen(process.env.PORT || port)