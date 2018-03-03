import io from 'socket.io-client';
// const  socket = io.connect('http://localhost');
var host = location.origin;
const  socket =io.connect(host, {port: PORT, transports: ["websocket"]});
function subscribeToResults(cb) {
  socket.on('results', results => cb(null, results));
  socket.emit('subscribeToResults', 1000);
}

function submitScore(totalScore) {
  socket.emit('chat message',totalScore);
}

export { subscribeToResults ,submitScore};