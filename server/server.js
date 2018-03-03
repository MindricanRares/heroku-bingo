const io = require('socket.io')();

let scoreResults=[];

io.on('connection', (client) => {
  client.on('subscribeToResults', (interval) => {
    console.log('client is subscribing to results with interval ', interval);
    setInterval(() => {
      client.emit('results',scoreResults );
    }, interval);
  });

  client.on('chat message', (msg)=>{
    console.log(msg);
    scoreResults.push(msg);
  });
  client.on('error',function () {
  
  });
});


const port = 8087;
io.listen(port);
console.log('listening on port ', port);