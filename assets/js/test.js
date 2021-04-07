function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 60 * 60  * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  


const startTest = (subjectId) => {
  

  if(user == 'AnonymousUser')
  {
    var confirm_input =  confirm("for quiz start you need to login first.Do you want to login for start the test?");
    if(confirm_input == true){
      window.location.href="/user/accounts/login/";
    }
    

  }
  else
  {
    var confirm_input =  confirm("Do you want to start the test ?");
   if(confirm_input == true){
    loadQuestionPaper(parseInt(subjectId));
   }
  }
}

const loadQuestionPaper = (subjectId) => {

        fetch(`http://localhost:8000/exam/subjects/${subjectId}/`, {
            method: "GET",
        
          })
            .then((response) => {
                response.json().then((result)=>{
                   // console.log(result.exam_time);
                  
                    var questionPaperTimer = result.exam_time;
                    var questionPaperTime1 = questionPaperTimer.split(':');
                    var totalSeconds = (+questionPaperTime1[0]) * 60 * 60 + (+questionPaperTime1[1]) * 60 + (+questionPaperTime1[2]);
                    var countDownDate = (new Date().getTime()+(totalSeconds*1000));
                    sessionStorage.setItem("exam-timer",countDownDate);
                   
                    localStorage.setItem("questionPaperStorage",JSON.stringify(result.examQuestions));
                    delete result.examQuestions;
                    localStorage.setItem("questionPaperInfo",JSON.stringify(result));
                    // console.log(countDownDate);
                    // console.log(JSON.stringify(result).exam_time)
                    // console.log(results);
                    
                    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=${screen.availWidth},height=${screen.availHeight},left=-1000,top=-1000,fullscreen=yes`;
                    return setTimeout(() => open('/exam/quiz/start/','Quiz',params),300);
                })
             
            })
            .catch((err) => console.log(err));
        
}



