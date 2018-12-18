const express       = require('express');
const app           = express();
const Detail        = require('./db/Detail.js');
const bodyParser    = require('body-parser');
const UserRequest   = require('./db/UserRequest.js');
      
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(__dirname));

app.use('/homes/:index/detail-information', express.static(__dirname));
// app.use('/', (req, res) => {
//   res.send(`
//   Url need to define specific home index and information type.
//   ex)/homes/5/detail-information`)
// })

//api endpoints
app.get('/api/homes/all/detail-information', (req, res) => {
    Detail.find({})
        .then(data => {
            res.send(data);
        });
  });
  
//get one detail
app.get('/api/homes/:index/detail-information', (req, res) => {
    Detail.findOne({_index: req.params.index})
        .then(data => {
            res.send(data);
        });
});  

// user-request
app.post('/api/user-request', (req, res) => {
    let data = req.body.data;
    let eachPhone = Number(data.phone);
    UserRequest.findOne({ phone: eachPhone })
        .then(result => {
        if(!eachPhone){
            throw 'Please Fill the Form';
        }else if(!result){
            UserRequest.create(data)
            .then( result => {
                console.log('SEND OK: ', result);
                res.send(result);
            })
            }else{
                throw 'You already made an offer!';
            }
        })
        .catch(err => {
            res.send(err);
        })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('zillow mock site is working on ', port);
});