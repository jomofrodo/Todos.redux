var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var app = new express()

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
//var publicPath = path.resolve(__dirname, 'static');
var publicPath = config.output.publicPath;

//express.static('/dist');
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(express.static(publicPath));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/app/index.html')
})


//Route calls to the backend to tomcat
app.all('/todos/*', function (req, res) {
  proxy.web(req, res, {
    target: 'http://kanband:8080'
  });
});

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
