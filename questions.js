// question
let nMultipleCurrentQuestion = 0;
let nMultipleCorrectAnswers = 0;
let strCurrentAns;

// const
const AMOUNT_OF_QUESTION = 2; // how many questions we want out of the array
const DELAY_AFTER_QUESTION = 3000;

/* addContentToQuestion
--------------------------------------------------------------
Description: */
/* addContentToQuestion
--------------------------------------------------------------
Description: */
const addContentToQuestion = () => {
    document.querySelector(`#multipleQuestionContainer`).innerHTML = "";
    document.querySelector(`#multipleQuestionContainer`).style.pointerEvents ="all";
    
    // add question
    let question = El(
      "div",
      { cls: `multipleQuestion` },
      arrThisLomdaData[nMultipleCurrentQuestion].question
    );
    document.querySelector(`#multipleQuestionContainer`).append(question);
    
    // add answeres
    let ansContainer
    switch (arrThisLomdaData[nMultipleCurrentQuestion].type) {
        case "multiple":
        case "multipleWithPic":
            ansContainer = El("div", {cls: `ansContainer`},);
            document.querySelector(`#multipleQuestionContainer`).append(ansContainer);
            for(let i = 1; i <= 4; i++){
                let answer = El("div", {classes: [`multipleAns`, `ans${i}`, `ans`] , listeners: {click : onClickAnswer}}, arrThisLomdaData[nMultipleCurrentQuestion][`ans${i}`]);
                document.querySelector(`.ansContainer`).append(answer);
            }    
            break;
    
        case "multipleAllPic":
            ansContainer = El("div", {classes: [`ansContainer`, `ansContainerPic`]},);
            document.querySelector(`#multipleQuestionContainer`).append(ansContainer);
            for(let i = 0; i < arrThisLomdaData[nMultipleCurrentQuestion].answers.length ; i++){
                let answer = El("img", {classes: [`questionPic`, `ans${i + 1}`, `ans`],attributes: {src: arrThisLomdaData[nMultipleCurrentQuestion].answers[i]}, listeners: {click : onClickAnswer}}, arrThisLomdaData[nMultipleCurrentQuestion][`ans${i}`]);
                document.querySelector(`.ansContainer`).append(answer);
            }    
            break;
    
        case "sixChoices":
        case "sixChoicesWithPic":
            strCurrentAns = [];
            ansContainer = El("div", {cls: `ansContainer`},);
            document.querySelector(`#multipleQuestionContainer`).append(ansContainer);
            for(let i = 1; i <= 6; i++){
                let answer = El("div", {classes: [`multipleAns`, `ans${i}`, `ans`] , listeners: {click : onClickAnswerSixChoices}}, arrThisLomdaData[nMultipleCurrentQuestion][`ans${i}`]);
                document.querySelector(`.ansContainer`).append(answer);
            }    
            break;
    
        case "binary":
        case "binaryWithPic":
            ansContainer = El("div", {cls: `ansContainer`},
                El("div", {classes: [`binaryAns`, `true`, `ans`] , listeners: {click : onClickAnswer}}, "נכון"),
                El("div", {classes: [`binaryAns`, `false`, `ans`] , listeners: {click : onClickAnswer}}, "לא נכון"),
            );
            document.querySelector(`#multipleQuestionContainer`).append(ansContainer);
            break;
    
        case "completeSentence":
            let sentence = El("div", {cls: `sentenceContainer`},
                El("div", {cls: `sentence`}, arrThisLomdaData[nMultipleCurrentQuestion].sentence[0]),
                El("div", {cls: `dropDown`},
                    El("div", {cls: `dropDownTitle`, listeners: {click : controlDropDown}}, "בחר/י..."),
                    El("div", {cls: `containerDropDown`})),
                El("div", {cls: `sentence`}, arrThisLomdaData[nMultipleCurrentQuestion].sentence[1]),
            );
            document.querySelector(`#multipleQuestionContainer`).append(sentence);
            break;
    
        default:
            break;
    }
      document.querySelector(`#multipleQuestionContainer`).append(El("div", {id: "question-number", classes: ["about-text", "question-num"]}, `שאלה ${nMultipleCurrentQuestion + 1} מתוך ${AMOUNT_OF_QUESTION}`));
      scaleFontSize(document.querySelector(`#multipleQuestionContainer`));
      if (arrThisLomdaData[nMultipleCurrentQuestion].type.includes("WithPic")) {
        img = El("img", {cls: `questionPic`, attributes: {src: arrThisLomdaData[nMultipleCurrentQuestion].src}},);
        document.querySelector(`.multipleQuestion`).append(img);
    }
    //create check button (without listener)
    let check =  El("div", {cls: `checkButtonSentence`}, "בדיקה");
    document.querySelector(`.multipleQuestionContainer`).append(check);
    };
   /* onClickAnswer
  --------------------------------------------------------------
  Description: */
  const onClickAnswer = (event) => {
    if(document.querySelector(`.${strCurrentAns}`)) {
        document.querySelector(`.${strCurrentAns}`).style.backgroundColor = "white";
    }
    strCurrentAns = event.currentTarget.classList[1];
    document.querySelector(`.${strCurrentAns}`).style.backgroundColor = "gray";
    document.querySelector(`.checkButtonSentence`).addEventListener("click", checkAnswer);
}

/* onClickAnswerSixChoices
--------------------------------------------------------------
Description: */
const onClickAnswerSixChoices = (event) => {
    let currAns = event.currentTarget.classList[1];
    if(document.querySelector(`.${currAns}`).style.backgroundColor === "gray") {
        document.querySelector(`.${currAns}`).style.backgroundColor = "white";
        strCurrentAns = strCurrentAns.filter(e => e !== currAns);
    } else if(strCurrentAns.length < arrThisLomdaData[nMultipleCurrentQuestion].correctAns.length) {
        strCurrentAns.push(event.currentTarget.classList[1]);
        document.querySelector(`.${currAns}`).style.backgroundColor = "gray";
    }
    if(strCurrentAns.length === arrThisLomdaData[nMultipleCurrentQuestion].correctAns.length){
        document.querySelector(`.checkButtonSentence`).addEventListener("click", checkAnswer);
    } else {
        document.querySelector(`.checkButtonSentence`).removeEventListener("click", checkAnswer);
    }
} 
    // // check if answer is correct
    // if (
    //   event.currentTarget.classList[1] ===
    //   String(arrThisLomdaData[nMultipleCurrentQuestion].correctAns)
    // ) {
    //   event.currentTarget.style.backgroundImage = "url('assets/media/correctQuestion.svg')";
    //   nMultipleCorrectAnswers++;
    // } else {
    //   event.currentTarget.style.backgroundImage= "url('assets/media/wrongQuestion.svg')";
    // }

    /* controlDropDown
--------------------------------------------------------------
Description: */
const controlDropDown = () => {
    // remove listener and add drop down
    document.querySelector(`.dropDownTitle`).removeEventListener("click" , controlDropDown);
    for(let i = 0; i < arrThisLomdaData[nMultipleCurrentQuestion].dropDownAns.length; i++){
        let dropDownItem = El("div", {classes: [`dropDownItem`, `ans${i}`, i], listeners: {click : selectAnswer}},arrThisLomdaData[nMultipleCurrentQuestion].dropDownAns[i]);
        document.querySelector(`.containerDropDown`).append(dropDownItem);
    }
    if(strCurrentAns) {
        document.querySelector(`.${strCurrentAns}`).style.backgroundColor = "gray";
    }
}

/* selectAnswer
--------------------------------------------------------------
Description: */
const selectAnswer = (event) => {
    let currAns = event.currentTarget.classList[2];
    strCurrentAns = event.currentTarget.classList[1];
    document.querySelector(`.dropDownTitle`).innerHTML = arrThisLomdaData[nMultipleCurrentQuestion].dropDownAns[currAns];
    document.querySelector(`.containerDropDown`).innerHTML = ``;
    document.querySelector(`.dropDownTitle`).addEventListener("click", controlDropDown);
    document.querySelector(`.checkButtonSentence`).addEventListener("click", checkAnswer);
}

/* compareOutOfOrder
--------------------------------------------------------------
Description: */
const compareOutOfOrder = (arr1, arr2) => {
    if(arr1.length !== arr2.length){ return false; } 
    const counts = new Map();
    arr1.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1)); 
    arr2.forEach((value) => counts.set(value, (counts.get(value) ?? 0) - 1));
    return Array.from(counts.values()).every((count) => count === 0);
};

/* checkAnswer
--------------------------------------------------------------
Description: */
const checkAnswer = () => {
    document.querySelector(`.checkButtonSentence`).removeEventListener("click", checkAnswer);
    document.querySelector(`.multipleQuestionContainer`).style.pointerEvents ="none";
    if (arrThisLomdaData[nMultipleCurrentQuestion].type.includes("sixChoices")) {
        // color the answers acordingly
        strCurrentAns.forEach(e => {
            document.querySelector(`.${e}`).style.backgroundImage= "url('assets/media/wrongQuestion.svg')";   
            arrThisLomdaData[nMultipleCurrentQuestion].correctAns.forEach(correctAns => {
                if (e === correctAns) {
                    document.querySelector(`.${e}`).style.backgroundImage = "url('assets/media/correctQuestion.svg')";   
                }
            })
        })
        // compare arrays
        if(compareOutOfOrder(strCurrentAns, arrThisLomdaData[nMultipleCurrentQuestion].correctAns)) {
            nMultipleCorrectAnswers++;
        }
    } else {
        if (strCurrentAns === String(arrThisLomdaData[nMultipleCurrentQuestion].correctAns)){
            nMultipleCorrectAnswers++;
            if(document.querySelector(`.dropDownTitle`)) {
                document.querySelector(`.dropDownTitle`).style.backgroundImage = "url('assets/media/correctQuestion.svg')"; // Change graphics
            } else {
                document.querySelector(`.${strCurrentAns}`).style.backgroundImage = "url('assets/media/correctQuestion.svg')";   
            }
        } else {
            if(document.querySelector(`.dropDownTitle`)) {
                document.querySelector(`.dropDownTitle`).style.backgroundImage= "url('assets/media/wrongQuestion.svg')"; // Change graphics
            } else {
                document.querySelector(`.${strCurrentAns}`).style.backgroundImage= "url('assets/media/wrongQuestion.svg')";   
            }
        }
    }
    nMultipleCurrentQuestion++;
    strCurrentAns = undefined;
    setTimeout(() => {
        if(nMultipleCurrentQuestion <  AMOUNT_OF_QUESTION) {
            addContentToQuestion();
        } else {
            questionsEnd();
        }
    }, DELAY_AFTER_QUESTION) 
}


  /* scaleFontSize
  --------------------------------------------------------------
  Description: controls text fit to container*/
  function scaleFontSize(element) {
    console.log(element)
    // We only want to scale down long text, so first we reset
    // font-size to 100%
    element.style.fontSize = "1.8em";
    // Now we chceck if the content is higher than parent
    // If so, then reduce letter spacing a tiny bit, maybe it's enough
    if (element.scrollHeight > element.clientHeight) {
        element.style.letterSpacing = "-0.05em";
    }
    // We check the content height oncemore and if it still doesn't fit
    // then we reduce font size, but also reset letter spacing to 0 for legibility.
    if (element.scrollHeight > element.clientHeight) {
        element.style.letterSpacing = "0";
        element.style.fontSize = `${element.clientHeight/23}px`;
        }
  }
  
 
  
  /* questionsEnd
  --------------------------------------------------------------
  Description: for multiple and binary questions or for complete the sentence */
  const questionsEnd = () => {
    if (nMultipleCorrectAnswers >= 2) {
      showExplanation();
    } else {
      document.querySelector(`#multipleQuestionContainer`).innerHTML = "";
      document
        .querySelector(`#multipleQuestionContainer`)
        .append(
          El(
            "div",
            { cls: "fail" },
            El("div", { cls: "title" }, "פספסת כמה שאלות..."),
            El("div", { cls: "title" }, "אולי בפעם הבאה"),
            El(
              "div",
              { cls: "btn", id: "to-main", listeners: { click: backToMain } },
              "לרשימת הכלים"
            )
          )
        );
    }
    nMultipleCurrentQuestion = 0;
    nMultipleCorrectAnswers = 0;
  };
  