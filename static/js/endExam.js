const endExam = () =>{

    var confirm_input =  window.confirm("Do you really want to end the test??");
    if(confirm_input == true){
        var questionPaper = null;
        var questionPaperInfo = null;
    
    
        if (typeof window !== undefined) {
            if (localStorage.getItem("questionPaperInfo")) {
                questionPaperInfo = JSON.parse(localStorage.getItem("questionPaperInfo"));
                // console.log(questions[questionCount])
            }
            if (localStorage.getItem("questionPaperStorage")) {
                questionPaper = JSON.parse(localStorage.getItem("questionPaperStorage"));
                // console.log(questions[questionCount])
            }
            examPaperSheet={};
            questionPaper.forEach(element => {
                var questionAns = element.userSelectedAnswer;
                var questionId = parseInt(element.id)
                examPaperSheet[questionId]=questionAns;
            });
            console.log(examPaperSheet)
    
    
            fetch('/exam/quiz/end/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'X-CSRFToken':csrftoken,
                }, 
                body:JSON.stringify({'exam_subject':questionPaperInfo.id,'examPaperSheet':examPaperSheet})
            })
            .then((response) => {
                response.json().then((result)=>{
                    // console.log(result)
                    localStorage.clear();
                    this.close();
                    return window.location.href="/exam/quiz/history/";
                })
            })
    
            
        }
     
    }
   
}