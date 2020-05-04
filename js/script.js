const options=document.querySelector(".options").children;
const questionNumberSpan=document.querySelector(".question-num-value");
const totalQuestionSpan=document.querySelector(".total-question");
const question=document.querySelector(".question");
const correctAnswerSpan=document.querySelector(".correct-answers");
const  totalQuestionSpan2=document.querySelector(".total-question2");
const  percentageSpan=document.querySelector(".percentage");

const answerTrackerContainer=document.querySelector(".answers-tracker");
const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
const op4=document.querySelector(".option4");
let questionIndex;
let index=0;
let myArray=[];
let myArr=[];
let score=0;


//questions and options the answers

const questions=[
  {
    q: 'How to create spacing between HTML elements?',
    options: ['Margin','Spacing','Padding','Border'],
    answer: 0
  },
  {
    q: 'Which of the following selector matches all elements of a type?',
    options: ['Type Selector','Universal Selector','Descendant Selector','Class Selector'],
    answer: 0
  },
  {
    q: 'Which of the following value of cursor shows it as an arrow?',
    options: ['crosshair:','default','pointer','move'],
    answer: 1
  },
  {
    q: 'The # symbol specifies that the selector is?',
    options: ['class','tag','first','id'],
    answer: 3
  },
  {
    q: 'How does if Statement starts in Javascript?',
    options: ['if i == 5 then','if (i == 5)','if i = 5','if i = 5 then'],
    answer: 1
  }
]


//set questions and options and question number
totalQuestionSpan.innerHTML=questions.length;
function load(){
        questionNumberSpan.innerHTML=index+1;
        question.innerHTML=questions[questionIndex].q;
        op1.innerHTML=questions[questionIndex].options[0];
        op2.innerHTML=questions[questionIndex].options[1];
        op3.innerHTML=questions[questionIndex].options[2];
        op4.innerHTML=questions[questionIndex].options[3];
        index++;
}

function check(element){
      //Checking if the option is correct or not
      if(element.id == questions[questionIndex].answer){

          element.classList.add("correct");
          updateAnswerTracker("correct");
          score++;
          console.log("score" + score);
     }else{
      element.classList.add("wrong");  
      updateAnswerTracker("wrong");  
      }
      disabledOptions();
    }

//if user selects one of the options then disable all other options
function disabledOptions(){   
        for(let i=0; i<options.length;i++){
          options[i].classList.add("disabled");
//answer is wrong we want to also show correct answer
          if(options[i].id==questions[questionIndex].answer){
            options[i].classList.add("correct");
          }
            
        }

}

function enableOptions(){   
  for(let i=0; i<options.length;i++){
    options[i].classList.remove("disabled","correct","wrong");
  }

}

//If user did not select answer then lets alkert them. else we move to next question.

function validate(){
      if (!options[0].classList.contains("disabled")) {
        alert("You did not Select! Please select answer."); 
      }else{
        enableOptions();
        randomQuestion();
      }
}

//now working on the Next button
function next(){
//before going to next question lets check if user has selected an option or not

validate()

}

function randomQuestion(){
      let randomNumber=Math.floor(Math.random()*questions.length);
      let hitDuplicate=0;
      if (index==questions.length) {
        quizOver();
      }else{
            if (myArray.length>0){
                  for (let i = 0; i < myArray.length; i++) {
                    if (myArray[i]==randomNumber) {
                          hitDuplicate=1
                          break; 
                    }
                    
                  }
                if (hitDuplicate==1) {
                  randomQuestion();
                  
                }else{
                  questionIndex=randomNumber;
              load();
              myArr.push(questionIndex);
                }
            }
            if (myArray.length==0){
              questionIndex=randomNumber;
              load();
              myArr.push(questionIndex);
            }
      myArray.push(randomNumber);
      
    }

}

//Tracking the Answers
function answerTracker(){
      for(let i=0; i<questions.length; i++){
        const div=document.createElement("div");
        answerTrackerContainer.appendChild(div);
      }
}


function updateAnswerTracker(className){
  answerTrackerContainer.children[index-1].classList.add(className);

}

function quizOver(){
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentageSpan.innerHTML=(score/questions.length)*100 + "%";

}
function tryAgain(){
      window.location.reload();
}

window.onload=function(){
  randomQuestion();
  answerTracker();
}

