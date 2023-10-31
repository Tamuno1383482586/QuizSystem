var questions = {};
//Fetch Api and Promise to read JSON data
let fetchRequest = fetch("questions.json");

fetchRequest
  .then((response) => {
    return response.json();
  })
  .then((question) => {
    var result = renderQuestions(question);

    document
      .querySelector(".questions")
      .insertAdjacentHTML("beforeend", result);
      var options = renderQuestionsOptions(question,4)
document.querySelector(".options").appendChild(options);
  })
  .catch((error) => {
    console.log(error);
  });

var renderQuestions = (question) => {
  return `<p class="question">${question[0].question}</p>`;
};

function renderQuestionsOptions(question,noOfOptions) {
  var input = document.createElement('input');
  input.type = "radio";
  input.name = "radioElem";
  input.id = "radioElem";
  
  
 return input; 
  
}
