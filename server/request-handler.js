/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

exports.requestHandler = function(request, response) {

  // Message's DataBase
  var data = require('./data');

    // Request and Response come from node's http module.
    //
    // They include information about both the incoming request, such as
    // headers and URL, and about the outgoing response, such as its status
    // and content.
    //
    // Documentation for both request and response can be found in the HTTP section at
    // http://nodejs.org/documentation/api/

    // Do some basic logging.
    //
    // Adding more logging to your server can be an easy way to get passive
    // debugging help, but you should always be careful about leaving stray
    // console.logs in your code.
    console.log("Serving request type " + request.method + " for url " + request.url);
    // curl -X GET http://localhost:3000

    // The outgoing status.
    var statusCode = 200;

    // See the note below about CORS headers.
    var headers = defaultCorsHeaders;

    // Tell the client we are sending them plain text.
    //
    // You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.
    headers['Content-Type'] = "text/plain";

    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.

    /* =============== ROUTES ====================*/

    if(request.url === '/') {
      console.log('basic directory');
    }
    // curl -X GET http://localhost:3000/classes/messages
    else if (request.method === "GET" && request.url === '/classes/messages') {
      console.log('GET',request.url);
      var stringifiedData = JSON.stringify(data);
      headers['Content-Type'] = "application/json";
      // write the HEAD
      response.writeHead(statusCode, headers);
      // send the response with stringified data
      response.end(stringifiedData);
      // curl -X POST http://localhost:3000/send --data '{"short_description":"Test with CURL"}'
    }


    else if(request.method === 'GET' && request.url === '/classes/room1') {
      console.log('GET',request.url);
      headers['Content-Type'] = "text/plain";
      response.writeHead(200, headers);
      response.end(JSON.stringify(data));
    }


    else if(request.method === 'POST' && request.url === '/classes/messages') {
      // data revceived from the request;
         console.log('POST', request.url)
      var postData = '',
          parsedData;

      headers['Content-Type'] = "application/json";
      response.writeHead(201,headers);

      request.on('data', function(chunk) {
        // add the chunk data
        postData += chunk;
        parsedData = JSON.parse(postData);
        parsedData['createdAt'] = new Date();
        data.results.unshift(parsedData);
        response.end(JSON.stringify(data));
      });

    }

    else if(request.method === 'POST' && request.url === '/classes/room1') {
        console.log('POST', request.url);
        var postData = '',
            parsedData;

        headers['Content-Type'] = "application/json";
        response.writeHead(201,headers);

        request.on('data', function(chunk) {
          // add the chunk data
          postData += chunk;
          parsedData = JSON.parse(postData);
          parsedData['createdAt'] = new Date();
          data.results.unshift(parsedData);
          response.end(JSON.stringify(data));
        })

        response.end();
    }

    else {
         console.log('ANY',request.url)
      headers['Content-Type'] = "application/json";
      response.writeHead(404,headers)
      response.end('Page not found');
    }

  };

  // These headers will allow Cross-Origin Resource Sharing (CORS).
  // This code allows this server to talk to websites that
  // are on different domains, for instance, your chat client.
  //
  // Your chat client is running from a url like file://your/chat/client/index.html,
  // which is considered a different domain.
  //
  // Another way to get around this restriction is to serve you chat
  // client from this domain by setting up static file serving.

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

