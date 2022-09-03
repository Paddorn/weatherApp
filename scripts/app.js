const express=require('express');
const app=express();
const port=3000;
const https = require('https');
app.get('/', (req, res) => {
    const query="London";
    const apiKey="8d0029fb5aefc8da01e557b71611a1a6";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units"+unit+"&appid="+apiKey;
 
    https.get(url, (response) => {
        console.log('statusCode:', response.statusCode);
        response.on("data",(data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description;
            const feel = weatherData.main.feels_like;
            const icon = weatherData.weather[0].icon;
            console.log(icon);
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(imageURL)
            res.write("<h1>The Temperature in "+query+" is "+temp+" degrees celsius</h1>");
            res.write("<p>It feels like: "+feel+" degrees celsius</p>");
            res.write("<p>The weather is currently "+description+"</p>");
            res.write("<img src="+imageURL+">")
            res.send();
            }); 
        }); 
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})