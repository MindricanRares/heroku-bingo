import io from 'socket.io-client';
const  socket = io.connect('https://heroku-bingo-server.herokuapp.com/');

function subscribeToResults(cb) {
  socket.on('results', results => cb(null, results));
  socket.emit('subscribeToResults', 1000);
}

function submitScore(name,totalScore) {
  socket.emit('chat message',[name+" : ",totalScore]);
}

export { subscribeToResults ,submitScore};