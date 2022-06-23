let nTools;
// question
let nMultipleCurrentQuestion = 0;
let nMultipleCorrectAnswers = 0;
let arrMultipleQuestions = [];
let currTool;
let visitedTools = [];
// const
const AMOUNT_OF_QUESTION = DATA.tools.amountOfQuestions; // how many questions we want out of the array
const DELAY_AFTER_QUESTION = 2000;
const TOOL_NAMES = {
    "tool0":"מפתח צינורות",
    "tool1": "מפתח צינורות",
    "tool2": "מפתח צינורות",
    "tool3": "מפתח צינורות",
    "tool4":"מפתח צינורות",
    "tool5":"מפתח צינורות",
    "tool6":"מפתח צינורות",
    "tool7": "מפתח צינורות"}

/* loading function
--------------------------------------------------------------
Description: */
window.addEventListener("load", () => {
  nTools = DATA.tools.length;
  createMainPage();
});

const createMainPage = () => {
  document
    .querySelector("#main-page")
    .append(El("p", { cls: "main-title" }, "רשימת כלים"));
  let elPicContainer = El("div", { cls: "tool-container" });
  let elToolPic;
  for (let counter = 0; counter < 8; counter++) {
    elToolPic = El("img", {
      cls: "tool-pic",
      id: `tool${counter}`,
      attributes: { src: `assets/media/tool${counter}.png` },
      listeners: { click: addPreQuestion },
    });
    elPicContainer.append(elToolPic);
  }
  document.querySelector("#main-page").append(elPicContainer);
};


/*
shuffle
------------------------------------------------
Description: take orgnaized array and shuffle it
Parameters: array.
------------------------------------------------
Proggramer: Gal
------------------------------------------------
*/
function shuffle(arr) {
  let tmp = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let index = Math.floor(Math.random() * tmp.length);
    arr[i] = tmp[index];
    tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
  }
  return arr;
}

// Change display to flex?
// Change innerHTML to El?
const addPreQuestion = (e) => {
    currTool = e.currentTarget.id;
    document.querySelector("#main-page").style.pointerEvents = "none";
    if (isVisited(currTool)) {
        showExplanation();
    } else {
        document.querySelector(`.black-cover`).style.display = "block";
        document.querySelector(".multipleQuestionContainer").style.display = "block";
        document.querySelector(`.multipleQuestionContainer`).innerHTML = `<div class="pre-title">שם הכלי: ${DATA["tools"][currTool]["name"]}</div><img src="assets/media/${currTool}.png" alt="${TOOL_NAMES[currTool]}" class="pre-tool"><p class="pre-text">לפתיחת ההסבר נדרש לוודא כי יש לך הכשרה מספקת לשימוש בכלי ולכן אתה נדרש לענות נכון לפחות על 2 שאלות מתוך 3</p><button class="to-questions">לשאלות</button>`;
        arrMultipleQuestions = shuffle(DATA["tools"][currTool]["questions"]);
        document.querySelector(".to-questions").addEventListener("click", addContentToQuestion);
    }
}

const isVisited = (toolId) => {
    for (let i = 0; i < visitedTools.length; i++) {
        if (toolId === visitedTools[i]) {
            return true;
        }
    }
    return false;
}

/* addContentToQuestion
--------------------------------------------------------------
Description: */
const addContentToQuestion = () => {
  document.querySelector(`.multipleQuestionContainer`).innerHTML = "";
  // add question
  let question = El(
    "div",
    { cls: `multipleQuestion` },
    arrMultipleQuestions[nMultipleCurrentQuestion].question
  );
  document.querySelector(`.multipleQuestionContainer`).append(question);
  // add answeres
  if (arrMultipleQuestions[nMultipleCurrentQuestion].type === "multiple") {
    let ansContainer = El("div", { cls: `ansContainer` });
    document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
    for (let i = 1; i <= 4; i++) {
      let answer = El(
        "div",
        {
          classes: [`multipleAns`, `ans${i}`, `ans`],
          listeners: { click: onClickAnswer },
        },
        arrMultipleQuestions[nMultipleCurrentQuestion][`ans${i}`]
      );
      document.querySelector(`.ansContainer`).append(answer);
    }
  }
};

/* onClickAnswer
--------------------------------------------------------------
Description: */
const onClickAnswer = (event) => {
  // remove listeners
  let arrAns = document.querySelectorAll(`.ans`);
  for (let i = 0; i < arrAns.length; i++) {
    arrAns[i].removeEventListener("click", onClickAnswer);
  }
  // check if answer is correct
  if (
    event.currentTarget.classList[1] ===
    String(arrMultipleQuestions[nMultipleCurrentQuestion].correctAns)
  ) {
      event.currentTarget.style.backgroundColor = "green";
    console.log("נכון");
    nMultipleCorrectAnswers++;
  } else {
    console.log("לא נכון");
    event.currentTarget.style.backgroundColor = "red";
  }

  // send to next question.
  nMultipleCurrentQuestion++;
  setTimeout(() => {
    if (nMultipleCurrentQuestion < AMOUNT_OF_QUESTION) {
      addContentToQuestion();
    } else {
      questionsEnd();
    }
  }, DELAY_AFTER_QUESTION);
};

/* questionsEnd
--------------------------------------------------------------
Description: for multiple and binary questions or for complete the sentence */
const questionsEnd = () => {
  console.log("סיימתי");
  if (nMultipleCorrectAnswers >= 2) {
    visitedTools.push(currTool);
    showExplanation();
  } else {
    document.querySelector(`.multipleQuestionContainer`).innerHTML = "";
    document.querySelector(`.multipleQuestionContainer`).append(El("div", {cls:"fail"},
    El("div", {cls:"pre-title"}, "פספסת כמה שאלות...<br> אולי בפעם הבאה "),
    El("button", {cls: "to-questions", listeners: {click: backToMain}}, "לרשימת הכלים")));
  }
};

const backToMain = () => {
    document.querySelector(".to-questions").removeEventListener("click", backToMain);
    document.querySelector(`.black-cover`).style.display = "none";
    document.querySelector(".multipleQuestionContainer").style.display = "none";
    document.querySelector("#main-page").style.pointerEvents = "all";

}

/* El
--------------------------------------------------------------
Description: for all of the options - dont delete */
function El(tagName, options = {}, ...children) {
  let el = Object.assign(document.createElement(tagName), options.fields || {});
  if (options.classes && options.classes.length)
    el.classList.add(...options.classes);
  else if (options.cls) el.classList.add(options.cls);
  if (options.id) el.id = options.id;
  el.append(...children.filter((el) => el));
  for (let listenerName of Object.keys(options.listeners || {}))
    if (options.listeners[listenerName])
      el.addEventListener(listenerName, options.listeners[listenerName], false);
  for (let attributeName of Object.keys(options.attributes || {})) {
    if (options.attributes[attributeName] !== undefined)
      el.setAttribute(attributeName, options.attributes[attributeName]);
  }
  return el;
}
