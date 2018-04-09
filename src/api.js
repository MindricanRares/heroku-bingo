import io from 'socket.io-client';
const  socket = io.connect('http://localhost:8001/');

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


function sendSesionAnswers(sessionGUID,sessionAnswers){
  socket.emit('create session with GUID',sessionGUID,sessionAnswers);
}

function getSessionAnswers(sessionGUID,cb){
  socket.emit('request session with GUID',sessionGUID);
  socket.on('answers for session '+sessionGUID,sessionAnswers=>cb(null,sessionAnswers));
}

export { subscribeToResults ,submitScore,showNumberOfPlayers,getDefaultAnswers,sendSesionAnswers,getSessionAnswers};
