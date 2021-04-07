// Array of the questions

const questions = [
    {
        id : 1,
        question:"Q 1 : what is your name ?",
        a:"rahul",
        b : "gaurav",
        c : "deep",
        d : "shubham",
        ans : "ans2",
        flag : 0,
    },
    {   
        id : 2,
        question:"Q 2 : which is your favourite colour ?",
        a:"red",
        b : "brown",
        c : "green",
        d : "blue",
        ans : "ans1",
        flag : 0,
    },
    {   
        id : 3,
        question:"Q 3 : which is your favourite hobby?",
        a : "playing cricket",
        b : "watching movie",
        c : "reading books",
        d : "travelling",
        ans : "ans4",
        flag : 0,
    }

]

// places at which the data will be put is assigned into a const
const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector('#submit-btn');
const prev = document.querySelector('#prev-btn');
const next = document.querySelector('#next-btn');
const answers = document.querySelectorAll('.answer');

let questionCount = 0;
let score = 0;

var questionList = questions[questionCount];



// Function to load the question
const loadQuestion = () => {

    console.log(questionCount);
    console.log(questions[questionCount]);
    question.innerHTML =  questions[questionCount].question;
    option1.innerHTML =  questions[questionCount].a;
    option2.innerHTML =  questions[questionCount].b;
    option3.innerHTML =  questions[questionCount].c;
    option4.innerHTML =  questions[questionCount].d;


}

// By default called this function
loadQuestion();




// Function to check whether the selected answer is correct or not
const getCheckAnswer = () => {
    let selectedAnswer ;

    answers.forEach(curAnsEle => {
        if(curAnsEle.checked){
            selectedAnswer = curAnsEle.id;
        }
    })
    return selectedAnswer;
}



// value of Actual answer
let  actualAnswer = questions[questionCount].ans;
let saveFlag;

const saveFlagFunction = () => {
    questions[questionCount].flag = 1;
    saveFlag = question.flag;

    return saveFlag;
}



// Logic when clicked the submit button


            submit.addEventListener('click',() => {
                const checkedAnswer = getCheckAnswer();
                console.log(checkedAnswer);

                questions[questionCount].flag = 1;
                boxes();


                if( actualAnswer == checkedAnswer){
                    score++;
                    document.querySelector('.score').innerHTML = score; 
                }

                
            });


            prev.addEventListener('click',() => {
                
                questionCount--;
                if(questionCount< questions.length){
                    loadQuestion();
                }
                boxes();
            });

            next.addEventListener('click',() => {
                
                
                
                if(questionCount < questions.length){
                    // document.querySelector('.questioncount').innerHTML = questionCount;
                    questionCount++;
                    loadQuestion();
                }

                boxes();

                answers.forEach(curEle => {
                    if(curEle.checked){
                        if(savedFlag == 0){
                            document.querySelector('.review').innerHTML = "Please save the answer";
                        }
                    }else{
                        document.querySelector('.review').innerHTML = "Please select something";
                        document.querySelector('h1').style.backgroundColor ="yellow";
                    }
                })
            });




// logic for no. of boxes that is equal to questions
const boxes = () => {

    console.log("id=" + questionCount + 1)
    const questionNo = questionCount + 1;
    var x="", i;
    for (i=1; i<= questions.length;i++) {

        if(i == questions[questionCount].id && questions[questionCount].flag ==1) {
            x= x + "<h1 class='here done'>"  + i + "</h1>";
        }
        else if(i == questions[questionCount].id && questions[questionCount].flag ==0) {
             x= x + "<h1 class='here notdone'>"  + i + "</h1>";
        } else{
                    x= x + "<h1 >"  + i + "</h1>";
        }

        

     document.getElementById("demo").innerHTML = x;
    }
    
    
}

boxes();
