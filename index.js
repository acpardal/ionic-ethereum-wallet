// include dependencies
var express = require('express');
var proxy = require('http-proxy-middleware');

// proxy middleware options
var options = {
        target: 'http://localhost:7545', // target host
        changeOrigin: true,               // needed for virtual hosted sites
        ws: true,                         // proxy websockets
        // pathRewrite: {
        //     '^/api/old-path' : '/api/new-path',     // rewrite path
        //     '^/api/remove/path' : '/path'           // remove base path
        // },
        router: {
            // when request.headers.host == 'dev.localhost:3000',
            // override target 'http://www.example.org' to 'http://localhost:8000'
            // 'dev.localhost:3000' : 'http://localhost:8000'
        },
        onProxyRes: function (proxyRes, req, res) {
          proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin; 
          proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';     
        }
    };

// create the proxy (without context)
var exampleProxy = proxy(options);

// mount `exampleProxy` in web server
var app = express();
    app.use('/', exampleProxy);
    app.listen(7546);