import openSocket from 'socket.io-client';
const  socket = openSocket('https://heroku-bingo.herokuapp.com:3000');
function subscribeToResults(cb) {
  socket.on('results', results => cb(null, results));
  socket.emit('subscribeToResults', 1000);
}

function submitScore(totalScore) {
  socket.emit('chat message',totalScore);
}

export { subscribeToResults ,submitScore};