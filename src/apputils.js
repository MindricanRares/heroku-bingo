function pickAnswers(possibleAnswers) {
  debugger;
    let answers=[];
  while (answers.length < 25) {
    var randomnumber =
      Math.floor(Math.random() * possibleAnswers.length - 1) + 1;
    if (answers.indexOf(possibleAnswers[randomnumber]) > -1) continue;
    answers[answers.length] = possibleAnswers[randomnumber];
  }
  return answers;
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export  {pickAnswers,guid};
