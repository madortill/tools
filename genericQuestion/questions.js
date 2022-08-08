// question
let nMultipleCurrentQuestion = 0;
let nMultipleCorrectAnswers = 0;
let arrThisLomdaData = shuffle(DATA.questions)
let strCurrentAns;

// const
const AMOUNT_OF_QUESTION = arrThisLomdaData.length; // how many questions we want out of the array
const DELAY_AFTER_QUESTION = 2000;

/* addContentToQuestion
--------------------------------------------------------------
Description: */
const addContentToQuestion = () => {
    document.querySelector(`.multipleQuestionContainer`).innerHTML = "";
    document.querySelector(`.multipleQuestionContainer`).style.pointerEvents ="all";
    // add question
    let question = El("div", {cls: `multipleQuestion`}, arrThisLomdaData[nMultipleCurrentQuestion].question);
    document.querySelector(`.multipleQuestionContainer`).append(question);
    // add answeres
    let ansContainer
    switch (arrThisLomdaData[nMultipleCurrentQuestion].type) {
        case "multiple":
        case "multipleWithPic":
            ansContainer = El("div", {cls: `ansContainer`},);
            document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
            for(let i = 1; i <= 4; i++){
                let answer = El("div", {classes: [`multipleAns`, `ans${i}`, `ans`] , listeners: {click : onClickAnswer}}, arrThisLomdaData[nMultipleCurrentQuestion][`ans${i}`]);
                document.querySelector(`.ansContainer`).append(answer);
            }    
            break;
    
        case "multipleAllPic":
            ansContainer = El("div", {classes: [`ansContainer`, `ansContainerPic`]},);
            document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
            for(let i = 0; i < arrThisLomdaData[nMultipleCurrentQuestion].answers.length ; i++){
                let answer = El("img", {classes: [`questionPic`, `ans${i + 1}`, `ans`],attributes: {src: arrThisLomdaData[nMultipleCurrentQuestion].answers[i]}, listeners: {click : onClickAnswer}}, arrThisLomdaData[nMultipleCurrentQuestion][`ans${i}`]);
                document.querySelector(`.ansContainer`).append(answer);
            }    
            break;
    
        case "sixChoices":
        case "sixChoicesWithPic":
            strCurrentAns = [];
            ansContainer = El("div", {cls: `ansContainer`},);
            document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
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
            document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
            break;
    
        case "completeSentence":
            let sentence = El("div", {cls: `sentenceContainer`},
                El("div", {cls: `sentence`}, arrThisLomdaData[nMultipleCurrentQuestion].sentence[0]),
                El("div", {cls: `dropDown`},
                    El("div", {cls: `dropDownTitle`, listeners: {click : controlDropDown}}, "בחר/י..."),
                    El("div", {cls: `containerDropDown`})),
                El("div", {cls: `sentence`}, arrThisLomdaData[nMultipleCurrentQuestion].sentence[1]),
            );
            document.querySelector(`.multipleQuestionContainer`).append(sentence);
            break;
    
        default:
            break;
    }
    if (arrThisLomdaData[nMultipleCurrentQuestion].type.includes("WithPic")) {
        img = El("img", {cls: `questionPic`, attributes: {src: arrThisLomdaData[nMultipleCurrentQuestion].src}},);
        document.querySelector(`.multipleQuestion`).append(img);
    }
    //create check button (without listener)
    let check =  El("div", {cls: `checkButtonSentence`}, "בדיקה");
    document.querySelector(`.multipleQuestionContainer`).append(check);
}

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
            document.querySelector(`.${e}`).style.backgroundColor = "red";   
            arrThisLomdaData[nMultipleCurrentQuestion].correctAns.forEach(correctAns => {
                if (e === correctAns) {
                    document.querySelector(`.${e}`).style.backgroundColor = "green";   
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
                document.querySelector(`.dropDownTitle`).style.backgroundColor = "green"; 
            } else {
                document.querySelector(`.${strCurrentAns}`).style.backgroundColor = "green";   
            }
        } else {
            if(document.querySelector(`.dropDownTitle`)) {
                document.querySelector(`.dropDownTitle`).style.backgroundColor = "red"; 
            } else {
                document.querySelector(`.${strCurrentAns}`).style.backgroundColor = "red";   
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


/* questionsEnd
--------------------------------------------------------------
Description:  */
const questionsEnd = () => {
    console.log("סיימתי");
    console.log(nMultipleCorrectAnswers);
}