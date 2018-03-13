const possibleAnswers = [
  "Know-it-all",
  "Someone is typing",
  "Misuse of words",
  "Someone snezees",
  "Innapropriate joke",
  "Foreign accent",
  "Loud talker",
  "Nothing accomplished",
  "On the same page",
  "Weather mention",
  "Sports mention",
  "Someone calling from the car",
  "Someone calling from home",
  "Dog barking",
  "Cellphone ringing",
  "Argument",
  "Dropped caller",
  "Someone enters late",
  "Some one repeats themselvs",
  "Uncontrollable cough",
  "Win win",
  "Can everyone hear me",
  "Is ____ on the call",
  "Nothing accomplished",
  "Some one has bad reception",
  "Questions avoided",
  "Is everyone here",
  "Soft talker",
  "Talk offline",
  "Can you repeat that",
  "Any updates",
  "Testing team",
  "How are things with _",
  "Working on it",
  "No updates",
  "I`ll take it as a follow up",
  "Laughing",
  "Are you still working on",
  "Talk to you later",
  "I`ll run some quick tests",
  "Sighing",
  "Can i asign this to you",
  "What`s the problem",
  "I will take a look",
  "Do you need any help",
  "Can you see my screen",
  "Backlog mention"
];

function pickAnswers() {
    let answers=[];
  while (answers.length < 25) {
    var randomnumber =
      Math.floor(Math.random() * possibleAnswers.length - 1) + 1;
    if (answers.indexOf(possibleAnswers[randomnumber]) > -1) continue;
    answers[answers.length] = possibleAnswers[randomnumber];
  }
  return answers;
};




export default {pickAnswers};
