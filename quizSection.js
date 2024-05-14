//a list of questions
const questions = [
    {
        question: "What are event blocks used for in EV3 robotics?" ,
        answers: [
            {text: " To control the robot's speed", correct: false}, 
            {text: " To trigger actions in response to specific events", correct: true}, 
            {text: " To build physical structures", correct: false}, 
            {text: " To change the robot's color", correct: false}, 
        ]
    },
    {
        question: "What event block would you use to make a robot stop when it detects an obstacle with its ultrasonic sensor?" ,
        answers: [
            {text: " Wait for Touch Sensor", correct: false}, 
            {text: "Wait for Color Sensor", correct: false}, 
            {text: "Wait for Ultrasonic Sensor", correct: true}, 
            {text: "Wait for Sound Sensor", correct: false}, 
        ]
    },
    {
        question: "If you want a robot to stop when it bumps into something, which sensor would you use?" ,
        answers: [
            {text: "Touch Sensor", correct: true}, 
            {text: "Color Sensor", correct: false}, 
            {text: "Ultrasonic Sensor", correct: false}, 
            {text: "Sound Sensor", correct: false}, 
        ]
    },
    {
        question: "What event block would you use to make a robot stop when it detects an obstacle with its ultrasonic sensor?" ,
        answers: [
            {text: " Wait for Touch Sensor", correct: false}, 
            {text: "Wait for Color Sensor", correct: false}, 
            {text: "Wait for Ultrasonic Sensor", correct: true}, 
            {text: "Wait for Sound Sensor", correct: false}, 
        ]
    },
    {
        question: "If you want a robot to move forward until it sees a black line, which event block would you use?" ,
        answers: [
            {text: " Wait for Touch Sensor", correct: false}, 
            {text: "Wait for Color Sensor", correct: true}, 
            {text: "Wait for Ultrasonic Sensor", correct: false}, 
            {text: "Wait for Sound Sensor", correct: false}, 
        ]
    },
    {
        question: "What happens when a robot sends a broadcast message?" ,
        answers: [
            {text: " It dances", correct: false}, 
            {text: "It stops moving", correct: false}, 
            {text: " It sends a message to other parts of the program", correct: true}, 
            {text: " It turns off", correct: false}, 
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons"); //This is the damn problem why i got stuck: answerElement instead of answerButton.
const nextButton = document.getElementById("next-button");

// To keep track of the scores and start the questions
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0; //when start the quiz, the question 1
    score = 0;
    nextButton.innerHTML = 'Next'; //display teh next button once you select an asnwer
    showQuestion(); //calling the next question.
}

function showQuestion(){
    resetState();

    //display  the questions:
    let currentQuestion = questions[currentQuestionIndex]; //keep track of the questions: begin with question 1 and continue.
    
    let questionNumber = currentQuestionIndex + 1; //next question, computer will know that the 1st question it's answered

    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question; //replace the text in the HTML to the texts from the list.


    //displat the multiple questions asnwer texts
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); //in the button:....
        button.innerHTML = answer.text; //get into the list: the answer element
        button.classList.add("btn");
        answerButton.appendChild(button); //Thios is to append a child element to an existing parent element
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){ //this function it's to remove the asnwers 1 answer 2 ... from the html
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){ //the amount of questions I have.
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
