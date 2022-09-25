const express = require('express'); //Import the express dependency
const app = express();
// app.use(express.urlencode());          //Instantiate an express app, the main work horse of this server
const port = 3000; //Save the port number where your server will be listening
const axios = require('axios');
let response = null;
require('dotenv').config();

const appid = process.env.uri;
const cmc = process.env.cmc;



// app.use(express.static('public',{extensions:['html']}));
// app.use(express.static('public/css',{extensions:['css']}));
// app.use(express.static('public/js',{extensions:['js']}));


//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => { //get requests to the root ("/") will route here
    res.sendFile('/public/index.html', {
        root: __dirname
    }); //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/main.js', (req, res) => { //get requests to the root ("/") will route here
    res.sendFile('/main.js', {
        root: __dirname
    }); //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/style.css', (req, res) => { //get requests to the root ("/") will route here
    res.sendFile('/public/css/style.css', {
        root: __dirname
    }); //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/more-info/:country', (req, res) => {
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://restcountries.com/v3.1/alpha/' + req.params.country + '')
        } catch (ex) {
            response = null;
            // error
            console.log(ex);
            reject(ex);
        }
        if (response) {
            // success
            const json = response.data;
            res.send(json);
            resolve(json);
        }
    });

});


app.get('/getweather/:latlon', (req, res) => {

    let latlon_array = req.params.latlon.split("_");

    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + latlon_array[0] + '&lon=' + latlon_array[1] + '&appid='+process.env.uri+'')
        } catch (ex) {
            response = null;
            // error
            console.log(ex);
            reject(ex);
        }
        if (response) {
            // success
            const json = response.data;
            res.send(json);
            resolve(json);
        }
    });

});


app.get('/time/:latlon', (req, res) => {

    let text = req.params.latlon;
    const latlon_array = text.split("_");
    console.log(latlon_array);

    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://timeapi.io/api/Time/current/coordinate?latitude='+latlon_array[0] +'&longitude='+ latlon_array[1])
        } catch (ex) {
            response = null;
            // error
            console.log(ex);
            reject(ex);
        }
        if (response) {
            // success
            const json = response.data;
            res.send(json);
            resolve(json);
        }
    });

});


app.get('/bankholidays/:country', (req, res) => {

    let text = req.params.country;

    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://date.nager.at/api/v3/PublicHolidays/2022/' + req.params.country)
        } catch (ex) {
            response = null;
            // error

            reject(ex);
        }
        if (response) {
            // success
            const json = response.data;
 
            res.send(json);
            resolve(json);
        }
    });

});


app.get('/latlon/:place', (req, res) => {

    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('http://api.openweathermap.org/geo/1.0/direct?q=' + req.params.place + '&limit=5&appid='+process.env.uri+'')
        } catch (ex) {
            response = null;
            // error

            reject(ex);
        }
        if (response) {
            // success
            const json = response.data;
            res.send(json);
            resolve(json);
        }
    });

});

/* FAMOUS QUOTES*/

app.get('/trump', (req, res) => {  

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://api.whatdoestrumpthink.com/api/v1/quotes')
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;



    console.log(json);
      res.send(json); 
    resolve(json);
  }
});

});

app.get('/kwest', (req, res) => {  

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://api.kanye.rest')
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
      res.send(json); 
    resolve(json);
  }
});

});

app.get('/chucknoris', (req, res) => {  

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://api.chucknorris.io/jokes/random')
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
      res.send(json); 
    resolve(json);
  }
});

});

app.get('/cmc',(req, res) => { 


let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.cmc,
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
    res.send(json);
    resolve(json);
  }
});


 });


app.get('/cmcgeneral',(req, res) => { 

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.cmc,
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
    res.send(json);
    resolve(json);
  }
});


 });




/* Fear and greed*/

app.get('/fng', (req, res) => {  

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://api.alternative.me/fng/?limit=10')
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
      res.send(json); 
    resolve(json);
  }
});

});



app.listen(port, () => { //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});