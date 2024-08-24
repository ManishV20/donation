const express = require('express');
const Razorpay = require('razorpay');
const app = express()
const cors = require('cors')
//const dotenv = require('dotenv')

//require('dotenv').config()
const port = 3100

//app.use(express.static("donate-box"));

const corsOptions = {
  origin: 'https://thesmartcoders.in',//(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//app.use(cors({origin: '*',}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// app.get('/', (req, res) => {
//   res.send('All is Bad')
// })


//console.log(process.env) 
let instance = new Razorpay({
  key_id:'rzp_live_j6bTMrbcSAQgta',  //Put your key_id from razor key website
  key_secret:'pGeaQgc7AadQGbs2ObSTR3bh' //Put your key_secret from razor key website
})


app.post('/', (req,res,next)=>{
    let options = {
        amount:req.body.amount,
        currency:"INR",
        receipt:'Order0',
        payment_capture:0,
        notes:req.body
    }

    instance.orders.create(options, (err,order)=>{
        if(err){
        next(err);
        res.json({success:false, status:"Order Failed", value:order, key:instance.key_id})

        }
        if(order){
        res.json({success:true, status:"Order Created Successfully", value:order, key:instance.key_id})
        }})
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})