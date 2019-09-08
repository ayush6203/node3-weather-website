const path = require('path')     //manipulate paths
const express = require('express')      //instantiate server
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectory = path.join(__dirname,'../public')    // __dirname ~ gives the route path of the application
const viewsPath = path.join(__dirname, '../templates/views')     // setting path for views
const partialviewspath = path.join(__dirname,'../templates/partialviews')     //setting path for partial views
const app = express()


app.use(express.static(publicDirectory));     //refrencing the path to the node application
app.set('view engine', 'hbs');              // setting hbs as the view engine.   "hbs is the module name here"
app.set('views',viewsPath);
hbs.registerPartials(partialviewspath);


app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather App',
       msg: 'provides all the detials of the weather',
       name:'Ayush singh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        src: "./img/me.jpg",
        info: "this website is completely based on the NODE Js application."+
        "it would be fun making this website.",
        name:'Ayush Singh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        info: 'Help from the dynamic hbs view engine',
        name:'Ayush Singh'
    })
})

app.get('/weather',(req,res) => {
   if(!req.query.address)
   return res.send({
       error:'you need to paas the address to retrive the forecast'
   })   
   
   geocode(req.query.address,(error,{latitude,longitude,place_name}={})=>{

    if(error)
    return res.send({error})

    forecast(latitude,longitude, (errorForecast,forecastData)=>{

        if(error)
        return res.send({errorForecast})

        res.send({
            place:place_name,
            forecast:forecastData
        })
    })
   })

});

app.get('/help/*',(req,res) => {
    res.render('error',{
        errormsg:'Help article not found',
        title:'Error!',
        name:'Ayush Singh'})
})

app.get('*',(req,res)=>{
    res.render('error',{
        errormsg:'page not found',
        title:'Error!',
        name: 'Ayush Singh'})
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})