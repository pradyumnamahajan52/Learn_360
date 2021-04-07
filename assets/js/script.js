
const fullmodebtn = document.querySelector(".start-confirmation-btn");


fullmodebtn.addEventListener('click', () => {
    // console.log("hello");
	// var examId = this.dataset.examId;
    // console.log(examId);
    // return window.location.href="/testpage.html";
    
    // document.getElementsByClassName("start-confirmation").style.display = "none";
    document.documentElement.requestFullscreen().catch((e) => {
        console.log(e);
    });
});

const view = () => {
    document.querySelector(".start-confirmation").style.display = "none";
}

window.onload = function () {
    if (questions[questionCount].userSelectedAnswer == "") {
        deSelectAll();

    } else {
        answers.forEach(curEle => {
            if (questions[questionCount].userSelectedAnswer == curEle.id) {
                curEle.checked = true;
                console.log(curEle);
                console.log(questions[questionCount].userSelectedAnswer);
                console.log(curEle.id);
            }
        })
    }
}



// places at which the data will be put is assigned into a const
const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const optionInput1 = document.querySelector('#A');
const optionInput2 = document.querySelector('#B');
const optionInput3 = document.querySelector('#C');
const optionInput4 = document.querySelector('#D');
const submit = document.querySelector('#submit-btn');
const prev = document.querySelector('#prev-btn');
const next = document.querySelector('#next-btn');
const answers = document.querySelectorAll('.answer');

let questionCount = 0;
let score = 0;



var questions = null;

if (typeof window !== undefined) {
    if (localStorage.getItem("questionPaperStorage")) {
        questions = JSON.parse(localStorage.getItem("questionPaperStorage"));
        // console.log(questions[questionCount])
    }
}




// Function to load the question 
const loadQuestion = () => {

    if (questionCount == 0) {
        document.querySelector('.prev').style.display = "none";
    } else {
        document.querySelector('.prev').style.display = "block";
    }


    question.innerHTML = (questionCount + 1).toString().concat(questions[questionCount].question);
    option1.innerHTML = questions[questionCount].A;
    option2.innerHTML = questions[questionCount].B;
    option3.innerHTML = questions[questionCount].C;
    option4.innerHTML = questions[questionCount].D;

}

// By default called this function
loadQuestion();


// Function to check whether the selected answer is correct or not
const getCheckAnswer = () => {
    let selectedAnswer;

    answers.forEach(curAnsEle => {
        if (curAnsEle.checked) {
            selectedAnswer = curAnsEle.id;
            questions[questionCount].userSelectedAnswer = selectedAnswer;
            localStorage.setItem('questionPaperStorage', JSON.stringify(questions));
        }
    })

    return selectedAnswer;
}



// value of Actual answer
let actualAnswer = questions[questionCount].ans;
let saveFlag;

const saveFlagFunction = () => {
    questions[questionCount].flag = 1;
    saveFlag = question.flag;

    return saveFlag;
}



// Logic when clicked the submit button


submit.addEventListener('click', () => {


    answers.forEach(curEle => {


        if (curEle.checked) {
            const btnSelected = curEle.id;
            questions[questionCount].clickedSave = 1;
        }
    })

    if (questions[questionCount].clickedSave == 1) {
        const checkedAnswer = getCheckAnswer();
        // console.log(checkedAnswer);

        document.querySelector('.popup').style.display = "none";
        questions[questionCount].flag = 1;
        boxes();


        if (actualAnswer == checkedAnswer) {
            score++;
            document.querySelector('.score').innerHTML = score;
        }

    } else {
        console.log('passs')
        selectSomething();
    }


});

let scrollAmount;

// boxes scrolls left to maintain its position
const scrollquestionLeft = () => {
    // Scrolls the demo 
    if (questionCount == questions.length - 1) {
        let when = 0;
        document.querySelector('#demo').scrollLeft = when;
        scrollAmount = when;
    } else {
        let when = questionCount * 64;
        document.querySelector('#demo').scrollLeft = when;
        scrollAmount = when;
    }

}

// boxes scrolls right to maintain its position
const scrollquestionRight = () => {
    // Scrolls the demo 

    document.querySelector('#demo').scrollLeft = scrollAmount - 45;
    scrollAmount = scrollAmount - 64;
}


// Function for deselecting the buttons
const deSelectAll = () => {
    answers.forEach((curAnsEle) => curAnsEle.checked = false);
}

let prevnext;

// After click on previos button
prev.addEventListener('click', () => {

    prevnext =0;

    // checks if the question is attempted or not
    answers.forEach(curEle => {
        // questions is attempted
        if (curEle.checked) {
            // but question is not saved
            if (questions[questionCount].flag != 1) {
                // then display this block
                document.querySelector('.popup').style.display = "block";
            }
        }
    })

    if (document.querySelector('.popup').style.display != "block") {
        if (questions[questionCount].flag == 2) {
            questions[questionCount].flag = 0;
        }

        const element = document.querySelector('h1');


        scrollquestionRight();

        if (questions[questionCount].id == questions.length) {
            questions[questionCount].flag = 0;
        }

        questionCount--;
        if (questionCount < questions.length) {
            
            loadQuestion();
        }

        //automatically checks the button which user has checked 
        if (questions[questionCount].userSelectedAnswer == "") {
            deSelectAll();

        } else {
            answers.forEach(curEle => {
                if (questions[questionCount].userSelectedAnswer == curEle.id) {
                    curEle.checked = true;
                    console.log(curEle);
                    console.log(questions[questionCount].userSelectedAnswer);
                    console.log(curEle.id);
                }
            })
        }


        boxes();
    }
});



// After click on next button
next.addEventListener('click', () => {

    prevnext =1;

    scrollquestionLeft();

    // checks if the question is attempted or not
    answers.forEach(curEle => {
        // questions is attempted
        if (curEle.checked) {
            // but question is not saved
            if (questions[questionCount].flag != 1) {
                // then display this block
                document.querySelector('.popup').style.display = "block";
            }
        }
    })

    if (document.querySelector('.popup').style.display != "block") {
        if (questions[questionCount].flag == 2) {
            questions[questionCount].flag = 0;
        }


        const element = document.querySelector('h1');

        // deSelectAll();

        if (questions[questionCount].id == questions.length) {
            questionCount = 0;
            loadQuestion();
        } else if (questions[questionCount].id < questions.length) {
            // document.querySelector('.questioncount').innerHTML = questionCount;
            questionCount++;
            loadQuestion();
        }

        //automatically checks the button which user has checked 
        if (questions[questionCount].userSelectedAnswer == "") {
            deSelectAll();

        } else {
            answers.forEach(curEle => {
                if (questions[questionCount].userSelectedAnswer == curEle.id) {
                    curEle.checked = true;
                    // console.log(curEle);
                    // console.log(questions[questionCount].userSelectedAnswer);
                    // console.log(curEle.id);
                }
            })
        }

        boxes();
    }
});

const flagQuestionsArray = [];


// logic for no. of boxes that is equal to questions
const boxes = () => {

    const questionNo = questionCount + 1;
    var x = "", i;

    for (i = 1; i <= questions.length; i++) {

        if (questions[i - 1].flag == 2) {
            if (i == questions[questionCount].id) {
                flagQuestionsArray[i] = "<h1 class='here center'>" + i + "</h1>";
            } else {
                flagQuestionsArray[i] = "<h1>" + i + "</h1>";
            }
        } else if (questions[i - 1].flag == 0) {

            if (i == questions[questionCount].id) {
                flagQuestionsArray[i] = "<h1 class='here notdone center'>" + i + "</h1>";
            } else {
                flagQuestionsArray[i] = "<h1 class='notdone'>" + i + "</h1>";
            }

        } else {
            if (i == questions[questionCount].id) {
                flagQuestionsArray[i] = "<h1 class='here done center'>" + i + "</h1>";
            } else {
                flagQuestionsArray[i] = "<h1 class='done'>" + i + "</h1>";
            }
        }

        document.getElementById("demo").innerHTML = flagQuestionsArray;

    }
}
boxes();



const popupYes = () => {
    questions[questionCount].flag = 1;
    document.querySelector('.popup').style.display = "none";
    const checkedAnswer = getCheckAnswer();
    // console.log(checkedAnswer);

    document.querySelector('.popup').style.display = "none";
    questions[questionCount].flag = 1;
    boxes();


    if (actualAnswer == checkedAnswer) {
        score++;
        document.querySelector('.score').innerHTML = score;
    }

    if (document.querySelector('.popup').style.display != "block") {
        if (questions[questionCount].flag == 2) {
            questions[questionCount].flag = 0;
        }

        if (questions[questionCount].id == questions.length) {
            questionCount = 0;
            loadQuestion();
        } else if (questions[questionCount].id < questions.length) {
            if(prevnext==0){
                questionCount--;
            }else if(prevnext==1){
                questionCount++;
            }
            
            loadQuestion();
        }

        if (questions[questionCount].userSelectedAnswer == "") {
            deSelectAll();

        } else {
            answers.forEach(curEle => {
                if (questions[questionCount].userSelectedAnswer == curEle.id) {
                    curEle.checked = true;
                    console.log(curEle);
                    console.log(questions[questionCount].userSelectedAnswer);
                    console.log(curEle.id);
                }
            })
        }

        boxes();

    }
}
const popupNo = () => {
    questions[questionCount].flag = 0;
    document.querySelector('.popup').style.display = "none";

    if (document.querySelector('.popup').style.display != "block") {
        if (questions[questionCount].flag == 2) {
            questions[questionCount].flag = 0;
        }


        if (questions[questionCount].id == questions.length) {
            questionCount = 0;
            loadQuestion();
        } else if (questions[questionCount].id < questions.length) {
            if(prevnext==0){
                questionCount--;
            }else if(prevnext==1){
                questionCount++;
            }
            loadQuestion();
        }

        if (questions[questionCount].userSelectedAnswer == "") {
            deSelectAll();

        } else {
            answers.forEach(curEle => {
                if (questions[questionCount].userSelectedAnswer == curEle.id) {
                    curEle.checked = true;
                    console.log(curEle);
                    console.log(questions[questionCount].userSelectedAnswer);
                    console.log(curEle.id);
                }
            })
        }

        boxes();
    }
}


// Alert function when not selected any option and clicked on save btn
const selectSomething = () => {
    alert("please Select Something");
}



// If Flag = 0;  --> question is skipped
// If Flag = 1;  --> question is saved
// If Flag = 2;  --> question is not yet attempted

const ShowScore = () => {
   
}