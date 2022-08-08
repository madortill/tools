//completeSentence
let nSentenceCurrentQuestion = 0;
let strSentenceCurrentAns = 0;
// const
const DELAY_AFTER_SENTENCE = 3000;

/* addContentToSentence
--------------------------------------------------------------
Description: */
const addContentToSentence = () => {
    document.querySelector(`.completeSentenceContainer`).innerHTML = "";
    // create sentence
    let sentence = El("div", {cls: `sentenceContainer`},
        El("div", {cls: `sentence`}, DATA.completeSentence[nSentenceCurrentQuestion].sentence[0]),
        El("div", {cls: `dropDown`},
            El("div", {cls: `dropDownTitle`, listeners: {click : controlDropDown}}, "בחר/י..."),
            El("div", {cls: `containerDropDown`})),
        El("div", {cls: `sentence`}, DATA.completeSentence[nSentenceCurrentQuestion].sentence[1]),
    );
    document.querySelector(`.completeSentenceContainer`).append(sentence);
    //create check button (without listener)
    let check =  El("div", {cls: `checkButtonSentence`}, "בדיקה");
    document.querySelector(`.completeSentenceContainer`).append(check);
}

/* controlDropDown
--------------------------------------------------------------
Description: */
const controlDropDown = () => {
    // remove listener and add drop down
    document.querySelector(`.dropDownTitle`).removeEventListener("click" , controlDropDown);
    for(let i = 0; i < DATA.completeSentence[nSentenceCurrentQuestion].dropDownAns.length; i++){
        let dropDownItem = El("div", {classes: [`dropDownItem`, `ans${i}`, i], listeners: {click : selectAnswer}},DATA.completeSentence[nSentenceCurrentQuestion].dropDownAns[i]);
        document.querySelector(`.containerDropDown`).append(dropDownItem);
    }
}

/* selectAnswer
--------------------------------------------------------------
Description: */
const selectAnswer = (event) => {
    let currAns = event.currentTarget.classList[2];
    strSentenceCurrentAns = event.currentTarget.classList[1];
    document.querySelector(`.dropDownTitle`).innerHTML = DATA.completeSentence[nSentenceCurrentQuestion].dropDownAns[currAns];
    document.querySelector(`.containerDropDown`).innerHTML = ``;
    document.querySelector(`.dropDownTitle`).addEventListener("click", controlDropDown);
    document.querySelector(`.checkButtonSentence`).addEventListener("click", checkAnswer);
}

/* checkAnswer
--------------------------------------------------------------
Description: */
const checkAnswer = () => {
    document.querySelector(`.checkButtonSentence`).removeEventListener("click", checkAnswer);
    if (strSentenceCurrentAns ===  DATA.completeSentence[nSentenceCurrentQuestion].correctAns){
        console.log("תשובה נכונה");   
        nSentenceCurrentQuestion++;
        document.querySelector(`.dropDownTitle`).removeEventListener("click" , controlDropDown);
        setTimeout(() => {
            if(nSentenceCurrentQuestion <  DATA.completeSentence.length) {
                addContentToSentence();
            } else {
                questionsEnd();
            }
        }, DELAY_AFTER_SENTENCE) 

    } else {
        console.log("תשובה לא נכונה");    
    }
}