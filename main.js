var questions = {};
var questionCount = 0;

//Fetch Api and Promise to read JSON data
let fetchRequest = fetch("questions.json");

fetchRequest
  .then((response) => {
    return response.json();
  })
  .then((question) => {
    var optionsArrayLen = question[questionCount].options.length;



    nextAndPreviousButtonFunctionality(question, optionsArrayLen);
    renderQuestions(question, questionCount)
    checkForCorrectAnswer()
    renderQuestionsOptions(question, optionsArrayLen, questionCount)




  })
  .catch((error) => {
    console.log(error);
  });

function renderQuestions(question, questionNumber) {
  var questionJSON = `
<p class="question">${question[questionNumber].question}</p>
`;
  document.querySelector('.questions').innerHTML = questionJSON;

}

function renderQuestionsOptions(question, noOfOptionsLen, questionNumber) {

  for (let i = 0; i < noOfOptionsLen; i++) {
    var alphabet = String.fromCharCode(97 + i)
    var optionLabelText = question[questionNumber].options[i][`${alphabet}`];

    var input = document.createElement('input');
    input.type = "radio";
    input.name = "radioElem";
    input.id = "radioElem " + i;
    input.value = question[questionNumber].options[i]['correct'];
    var breaker = document.createElement('br')
    var label = document.createElement('label');

    label.htmlFor = "radioElem " + i;
    var alphabet = String.fromCharCode(97 + i)
    var optionLabelText = question[questionNumber].options[i][`${alphabet}`];

    //console.log(optionLabelText);
    //  console.log(alphabet);
    label.appendChild(document.createTextNode(optionLabelText));


  //  var inputGroup = input + label + breaker;


    document.querySelector('.options').append(input);
    document.querySelector(".options").append(label);
    document.querySelector(".options").append(breaker);
  }
}

function checkForCorrectAnswer() {
  var correctAnswerCount = 0;
  var incorrectAnswerCount = 0;
  var optionsParent = document.querySelector('.options');
  optionsParent.addEventListener('change', (e) => {

    e.stopImmediatePropagation();
    if (e.target.getAttribute("value") == "true") {

      correctAnswerCount = correctAnswerCount + 1;
      console.log("Correct Count : " + correctAnswerCount);
    } else {

      incorrectAnswerCount = incorrectAnswerCount + 1;
      console.log("Incorrect Count : " + incorrectAnswerCount);
    }
  });
  optionsParent.removeEventListener('change', null);

}

//checkForCorrectAnswer()
function nextAndPreviousButtonFunctionality(question, optionsArrayLen) {

  var prevButton = document.querySelector('#prev');
  var nextButton = document.querySelector('#next')
  var controlButtonsParent = document.querySelector('.control-buttons');


  controlButtonsParent.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();



    if (e.target.id == "next" && questionCount < question.length - 1) {

      questionCount += 1;
      document.querySelector('.options').innerHTML = '';
      renderQuestions(question, questionCount)

      renderQuestionsOptions(question, optionsArrayLen, questionCount)
      checkForCorrectAnswer()
    } else if (e.target.id == "prev" && questionCount > 0) {
      questionCount -= 1;
      document.querySelector('.options').innerHTML = '';
      renderQuestions(question, questionCount)

      renderQuestionsOptions(question, optionsArrayLen, questionCount)
      checkForCorrectAnswer()

    }
    prevButton.disabled = questionCount === 0;
    nextButton.disabled = questionCount === question.length - 1;



  });
  controlButtonsParent.removeEventListener('click', null);
}


function submitQuiz([correctCount, incorrectCount]) {

  var submitButton = document.querySelector('input[type = "submit"]')

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    alert(`Correct Answers : ${correctCount} \n
    IncorrectAnswers : ${incorrectCount}
    `)
  });
  submitButton.removeEventListener('click', null);
}




function rememberLastOptionClicked(question) {
  
}