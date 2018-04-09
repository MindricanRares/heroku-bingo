import io from 'socket.io-client';
const  socket = io.connect('http://localhost:8000/');

function subscribeToResults(cb) {
  socket.on('results', results => cb(null, results));
  socket.emit('subscribeToResults', 1000);
}

function submitScore(name,totalScore) {
  socket.emit('chat message',[name+" : ",totalScore]);
}

function showNumberOfPlayers(cb) {
  socket.on('numberOfPlayer', numberOfPlayers => cb(null, numberOfPlayers));
  socket.emit('showNumberOfPlayers', 1000);
}

function getDefaultAnswers(cb){
  socket.emit('request for default answers');
  socket.on('default answers',defaultAnswers=>cb(null,defaultAnswers));
}

export { subscribeToResults ,submitScore,showNumberOfPlayers,getDefaultAnswers};
