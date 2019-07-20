
let questionNumber = 0;
let score = 0;
let progress = 0;
let reset = false;

//home button
function backToHome() {
  $('.home').click(function() {
    location.reload();
  });
}

//set up Start page by displaying correct elements
function setUpStartPage(){
  console.log('setUpStartPage begin');
  $('.start-page').show();
  $('.nav-items').hide();
  $('.question-page').hide();
  $('.question-result').hide();
  $('.results-page').hide();
  // set inital values
  $('.score').html('Score: '+score+'/0');
  $('.progress').html('Progress: '+progress+'%');
  console.log('setUpStartPage end');
}

//set up Question page by displaying correct elements
function setUpQuestionPage() {
  console.log('setUpQuestionPage begin');
  $('.start-page').hide();
  $('.question-page').show();
  $('#questionButton').show();
  $('.nav-items').show();
  $('.question-result').hide();
  console.log('setUpQuestionPage end');
}

//set up Question Result page by displaying correct elements
function setUpQuestionResultPage() {
  console.log('setUpQuestionResultPage begin');
  $('.question-page').hide();
  $('#questionButton').hide();
  $('.answer').hide();
  $('.question-result').show();
  console.log('setUpQuestionResultPage end');
}

//set up Final Results page by displaying correct elements
function setUpFinalResultPage() {
  console.log('setUpFinalResultPage begin');
  // $('.results-page').toggleClass('hide');
  $('.results-page').show();
  $('.nav-items').hide();
  $('.question-result').remove();
  console.log('setUpFinalResultPage end');
}

//make the question html
function buildCurrentQuestion() {
  console.log('buildCurrentQuestion begin');
  $('.question-page').append(
  `<form>  
  <button type="button" id="questionButton">${QUIZ[questionNumber].question}</br></button>
  <button type="submit" name="answer"  value="${QUIZ[questionNumber].answers[0]}" class="answer" id="answer-1">${QUIZ[questionNumber].answers[0]}</button>
  <button type="submit" name="answer" value="${QUIZ[questionNumber].answers[1]}" class="answer" id="answer-2">${QUIZ[questionNumber].answers[1]}</button>
  <button type="submit" name="answer" value="${QUIZ[questionNumber].answers[2]}" class="answer" id="answer-3">${QUIZ[questionNumber].answers[2]}</button>
  <button type="submit" name="answer" value="${QUIZ[questionNumber].answers[3]}" class="answer" id="answer-4">${QUIZ[questionNumber].answers[3]}</button>
  </form>`
  );
  console.log('buildCurrentQuestion end');
}

//display question page and wait for answer
function askQuestion() {
  console.log('askQuestion begin');
  // setUpQuestionPage();
  //on click of question button show answers
  $('.question-page').show();
  $('.answer').hide();
  $('#questionButton').click(function(){
    // console.log('#questionButton triggered xxxxxxxxxxx');
    $('.answer').slideDown('slow');
  });
  //on click of answer run answer results
  $('.answer').click(function(event){
    // console.log('.answer triggered xxxxxxxxxxxxxx');
    event.preventDefault();
    answerResults($(this).val()===`${QUIZ[questionNumber].correctAnswer}`);
  });
  console.log('askQuestion end');
}

//display how many questions left; give finished message if no more questions
function howManyQuestionsLeft(){
  console.log('howManyQuestionsLeft begin');
  if (questionNumber < QUIZ.length-1) {
  $('.question-result').append(
    `<div class="display-box">
    <p>Your score is now : ${score}/${questionNumber+1}</p>
    <p>Keep pushing!  Only ${QUIZ.length-questionNumber-1} more questions to go!</p>
    </div>
    <button type="button" id ='next' class='next-button'>Next</button>`); 
  } else {
    $('.question-result').append(
      `<div class="display-box">
      <p>You made it to the finish!</p>
      <p>Great Job!!</p>
      </div>
      <button type="button" id ='next' class='next-button'>Click here for your results</button>` );
  }
  console.log('howManyQuestionsLeft end');
}

//display whether answer was right or wrong
function answerResults(isCorrect) {
  console.log('answerResults begin');
  setUpQuestionResultPage();
  //if right answer, display 'you got it right' page
  //then increment question number and score and onto next question
  if (isCorrect) {
    score++;
    $('.question-result').append(
   `<div class="correct-answer">
    <h2>Correct!</h2>
    <p>${QUIZ[questionNumber].answerExplaination}<p>`);
    howManyQuestionsLeft();
    $('.score').html('Score : '+score+'/'+(questionNumber+1));
    $('.progress').html('Progress: '+((questionNumber+1)/QUIZ.length)*100+'%');
  } else {
  //if wrong answer, display 'you got it wrong' page
  //then increment question number and onto next question  
    $('.question-result').append(
    `<h2>Incorrect</h2>
      <p>Sorry, the correct answer was: </p>
      <div class="display-correct-answer">${QUIZ[questionNumber].correctAnswer}</div>
      <p>${QUIZ[questionNumber].answerExplaination}<p>`);
      howManyQuestionsLeft();
      $('.score').html('Score : '+score+'/'+(questionNumber+1));
      $('.progress').html('Progress: '+((questionNumber+1)/QUIZ.length)*100+'%');
  }
  nextButton();
  console.log('answerResults end');
}

//on click of next button, increment question number, remove old question, and onto next question
function nextButton() {
  console.log('nextButton begin');
  // console.log('nextButton #next listening for click...................');
  $('#next').click(function() {
    // console.log('#next triggered xxxxxxxxxxxxxxxxxxx');
  // increment current question number
  questionNumber++;
  //check if we are out of questions
  if (questionNumber<QUIZ.length) {
    //remove old question
    $('.question-page').empty();
    $('.question-result').empty();
    buildCurrentQuestion();
    askQuestion();
  } else {
    console.log('sent here by nextButton >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    finalResults();
  }
  });
  console.log('nextButton end');
}

//reset quiz
function resetQuiz () {
  console.log('resetQuiz begin')
  questionNumber = 0;
  score = 0;
  progress = 0;
  //remove event listener??
  // button.removeEventListener(click, nextQuestion);

  // beginQuiz();
  // setUpQuestionPage();
  // buildCurrentQuestion();
  // askQuestion();
   setUpStartPage();
  // console.log('in reset after setUpStartPage');
  // nextQuestion();
  // console.log('in reset after nextQuestion');
  // console.log(`questionNumber is ${questionNumber} - score is ${score} - progress is ${progress} - reset is ${reset}`);
  console.log('resetQuiz end');
}

//display final results
function finalResults() {
  console.log('finalResults begin');
  setUpFinalResultPage();
  $('.results-page').append(`
  <h2 class="results-title">You Finished!</h2>
  <p class="results-message">Let's see how you did-</p>
  <p class="results-message">Out of ${QUIZ.length} questions,</br> you scored a ${score}</p>
  <button type="button" id="start-button">Click here to start again</button>`);
  //on click of button, reset quiz
    console.log('finalResults listening for #start-button click...........................................')
    $('#start-button').click(function() {
    console.log('#start-button triggered xxxxxxxxxxxxxxxxxxxxxxxxx');
        //remove old question
        $('.question-page').empty();
        $('.question-result').empty();
    //reset quiz
    resetQuiz();
    // location.reload();
    console.log('at end of finalResults click event>>>>>>>>>>>>>>>>>');
    
  });
  console.log('finalResults end');
}

//on click of next button, ask next question
function nextQuestion() {
  console.log('nextQuestion begin');
  console.log('nextQuestion .next-button listening for click...................');
  $('.next-button').click(function() {
    console.log('nextQuestion .next-button triggered xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log('in nextQuestion click');
    setUpQuestionPage();
    buildCurrentQuestion();
    askQuestion();
    console.log('at end of nextQuestion click');
    });
    console.log('nextQuestion end');
}

//start app with intro page and wait for click on button to start quiz
function beginQuiz() {
  // if (reset) {
  //   console.log('reset is true');
  //   reset=false;
  //   return;
  // };
  console.log('beginQuiz begin');
  console.log(`questionNumber is ${questionNumber} - score is ${score} - progress is ${progress} - reset is ${reset}`);
  setUpStartPage();
  console.log('in beginQuiz after setUpStartPage')
  nextQuestion();
  console.log('in beginQuiz after nextQuestion');
  console.log('beginQuiz end');
}

$(beginQuiz);