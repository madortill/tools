
// question
let nMultipleCurrentQuestion = 0;
let nMultipleCorrectAnswers = 0;
let arrThisLomdaData = [];
let currTool;
let visitedTools = [];
let strChoosenBhd;
let strChoosenCourse;
let AMOUNT_OF_QUESTION;
let courses;
let toolsInfo = {
  tool0: {
    name: "פטיש",
    explanation:
      "הפטיש הוא חלק ממשפחת הכלים לשימוש יומיומי. הפטיש מאפשר לתלות מדפים ומסייע בתיקון תקלות בתשתיות ומבנים.",
    questions: [],
  },
    tool1: {
    name: "קאטר",
    explanation:
      "הקאטר נחשב חלק ממשפחת הכלים לפירוק פצצות ויכול לשמש לחיתוך כבלי החשמל שמפעילים את הפצצה.",
    questions: [],
  },
  tool2: {
    name: "מסור",
    explanation:
      "המסור הוא חלק ממשפחת הכלים לשימוש מקצועי בלבד. המסור מאפשר לבצע חיתוכים גדולים בחומרים קשיחים.",
    questions: [],
  },
  tool3: {
    name: "מברג",
    explanation:
      "המברג הוא חלק ממשפחת הכלים לפירוק פצצות ויכול לשמש לפתיחת מארז הפצצה.",
    questions: [],
  },
  tool4: {
    name: "פלייר",
    explanation:
      "הפלייר נחשב חלק ממשפחת הכלים לפירוק פצצות ויכול לשמש לשליפת מסמרים שתקועים במארז הפצצה או לתפיסה מדויקת של חוטי חשמל.",
    questions: [],
  },
  tool5: {
    name: "סרט מידה",
    explanation:
      "סרט המידה הוא חלק ממשפחת הכלים לשימוש יומיומי והוא משמש למדידת גדלים של רהיטים או מידות של בגדים.",
    questions: [],
  },
};

/*  REMOVE ACCEST TO strChoosenBhd and strChoosenCourse. CALL IT ONLY ONCE WHEN CREATING THE DATA! */

// const
const TOOLS_NUM = 6;
const DELAY_AFTER_QUESTION = 2000;
const TOOL_NAMES = {
  tool0: "מפתח צינורות",
  tool1: "מפתח צינורות",
  tool2: "מפתח צינורות",
  tool3: "מפתח צינורות",
  tool4: "מפתח צינורות",
  tool5: "מפתח צינורות",
  tool6: "מפתח צינורות",
  tool7: "מפתח צינורות",
};


/* loading function
--------------------------------------------------------------
Description: */
window.addEventListener("load", () => {
  createCourseList(courses);
  createMainPage();
  document.querySelector(".loader").classList.add("fade");
  handleFirstPage();
});

const createCourseList = () => {
  courses = {};
  Object.keys(DATA).forEach((key) => {
    courses[key] = [...Object.keys(DATA[key])];
  });
}

const handleFirstPage = () => {
  for (key in courses) {
    document.getElementById("bahad").append(El("option", { attributes: { value: `${key}` } }, `${addSpace(key)}`));
  }
  document.getElementById("bahad").addEventListener("input", addCourseSelection);
};

const addCourseSelection = () => {
  document.getElementById("course").disabled = false;
  document.getElementById("course").innerHTML = "";
  document.getElementById("course").append(El("option", { attributes: { value: ``, disabled: "", selected: "" } },`באיזה קורס אתם?`));
  let courseList = courses[document.getElementById("bahad").value];
  for (course in courseList) {
    document.getElementById("course").append(
        El("option",{ attributes: { value: `${courseList[course]}` } },`${addSpace(courseList[course])}`)
      );
  }
  document.getElementById("course").addEventListener("input", () => {
    document.getElementById("start").style.filter = "grayscale(0%)";
    document.getElementById("start").addEventListener("click", start);
  });
};

const addSpace = (phrase) => {
  return phrase.replace(/-/g, " ");
};

// main code
const start = () => {
  strChoosenBhd = document.getElementById("bahad").value;
  strChoosenCourse = document.getElementById("course").value;
  AMOUNT_OF_QUESTION = DATA[strChoosenBhd][strChoosenCourse]["tools"]["amountOfQuestions"]; // how many questions we want out of the array
  for (let toolCounter = 0; toolCounter < TOOLS_NUM; toolCounter++) {
    for (let questionCounter = 0; questionCounter < AMOUNT_OF_QUESTION; questionCounter++) {
      toolsInfo[`tool${toolCounter}`]["questions"].push(DATA[strChoosenBhd][strChoosenCourse]["tools"].questions[toolCounter * 3 + questionCounter]);
    }
  }
  document.getElementById("start").removeEventListener("click", start);
  document.querySelector(".open").style.display = "none";
  document.querySelector("#main-page").style.display = "block";
  document.querySelector("#start").removeEventListener("click", start);
};

const openAbout = () => {
  document.querySelector(".about-icon").removeEventListener("click", openAbout);
  document.querySelector("#about").style.display = "block";
  document.querySelector("#main-page").style.pointerEvents = "none";
  document.querySelector(`#main-page`).style.display = "none";
  document.querySelector(".exit").addEventListener("click", closeAbout);
};

const closeAbout = () => {
  document.querySelector(".about-icon").addEventListener("click", openAbout);
  document.querySelector("#about").style.display = "none";
  document.querySelector("#main-page").style.pointerEvents = "all";
  document.querySelector(`#main-page`).style.display = "block";
  document.querySelector(".exit").removeEventListener("click", closeAbout);
};

const createMainPage = () => {
  document
    .querySelector("#main-page")
    .append(
      El("img", { cls: "main-title", attributes: {src: "assets/media/title.svg"} },),
      El("img", {
        cls: "about-icon",
        attributes: { src: "assets/media/about.svg" },
        alt: "אודות",
        listeners: { click: openAbout },
      })
    );
  let elPicContainer = El("div", { cls: "tools-container" });
  let elToolPic;
  for (let counter = 0; counter < TOOLS_NUM; counter++) {
    elToolPic = 
    El("div", {
      cls: "tool-pic",
      id: `tool${counter}`,
      attributes: { style: `background-image: url(assets/media/tool${counter}.svg);` },
      listeners: { click: addPreQuestion },
    },
    El("img", {attributes: {src: "assets/media/V.svg"}, cls: "v-sign", id: `tool${counter}-v-sign`}));
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

const addPreQuestion = (e) => {
  currTool = e.currentTarget.id;
  document.querySelector("#main-page").style.pointerEvents = "none";
  document.querySelector(`#main-page`).style.display = "none";
  document.querySelector("#multipleQuestionContainer").style.display = "block";
  if (isVisited(currTool)) {
    showExplanation();
  } else {
    let toolName =
      toolsInfo[currTool]["name"];
    document.querySelector(
      `#multipleQuestionContainer`
    ).innerHTML = `<div class="title">שם הכלי: ${toolName}</div><img src="assets/media/${currTool}.svg" alt="${toolName}}" class="curr-tool-pic"><p class="text">לפתיחת ההסבר נדרש לוודא כי יש לך הכשרה מספקת לשימוש בכלי ולכן אתה נדרש לענות נכון לפחות על 2 שאלות מתוך 3</p><div class="btn" id="to-questions">לשאלות</div>`;
    arrThisLomdaData = shuffle(
      toolsInfo[currTool]["questions"]
    );
    document
      .querySelector("#to-questions")
      .addEventListener("click", addContentToQuestion);
  }
};

const isVisited = (toolId) => {
  for (let i = 0; i < visitedTools.length; i++) {
    if (toolId === visitedTools[i]) {
      return true;
    }
  }
  return false;
};

/* addContentToQuestion
--------------------------------------------------------------
Description: */
const addContentToQuestion = () => {
  document.querySelector(`#multipleQuestionContainer`).innerHTML = "";
  
  // add question
  let question = El(
    "div",
    { cls: `multipleQuestion` },
    arrThisLomdaData[nMultipleCurrentQuestion].question
  );
  document.querySelector(`#multipleQuestionContainer`).append(question);
  
  // add answeres
  if (arrThisLomdaData[nMultipleCurrentQuestion].type === "multiple") {
    let ansContainer = El("div", { cls: `ansContainer` });
    document.querySelector(`#multipleQuestionContainer`).append(ansContainer);
    for (let i = 1; i <= 4; i++) {
      let answer = El(
        "div", {classes: [`multipleAns`, `ans${i}`, `ans`],
          listeners: { click: onClickAnswer }},
        arrThisLomdaData[nMultipleCurrentQuestion][`ans${i}`]
      );
      document.querySelector(`.ansContainer`).append(answer);
    }
    document.querySelector(`#multipleQuestionContainer`).append(El("div", {id: "question-number", classes: ["about-text", "question-num"]}, `שאלה ${nMultipleCurrentQuestion + 1} מתוך ${AMOUNT_OF_QUESTION}`))
    scaleFontSize(document.querySelector(`#multipleQuestionContainer`));
  } else {
    let ansContainer = El(
      "div",
      { cls: `ansContainer` },
      El(
        "div",
        {
          classes: [`binaryAns`, `true`, `ans`],
          listeners: { click: onClickAnswer },
        },
        "נכון"
      ),
      El(
        "div",
        {
          classes: [`binaryAns`, `false`, `ans`],
          listeners: { click: onClickAnswer },
        },
        "לא נכון"
      )
    );
    document.querySelector(`#multipleQuestionContainer`).append(ansContainer);
  }
};

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
    String(arrThisLomdaData[nMultipleCurrentQuestion].correctAns)
  ) {
    event.currentTarget.style.backgroundImage = "url('assets/media/correctQuestion.svg')";
    nMultipleCorrectAnswers++;
  } else {
    event.currentTarget.style.backgroundImage= "url('assets/media/wrongQuestion.svg')";
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

const showExplanation = () => {
  visitedTools.push(currTool);
  console.log(document.getElementById(currTool))
  document.getElementById(`${currTool}-v-sign`).style.display = "block";
  document.querySelector(`#multipleQuestionContainer`).innerHTML = "";
  document
    .querySelector(`#multipleQuestionContainer`)
    .append(
      El(
        "div",
        { cls: "title" },
        `שם הכלי: ${toolsInfo[currTool]["name"]}`
      ),
      El("img", {
        attributes: {
          src: `assets/media/${currTool}.svg`,
          alt: `${toolsInfo[currTool].name}`,
        },
        cls: "curr-tool-pic",
      }),
      El(
        "p",
        { cls: "text" },
        `הסבר: ${toolsInfo[currTool]["explanation"]}`
      ),
      El(
        "div",
        { cls: "btn", listeners: { click: backToMain } },
        "לרשימת הכלים"
      )
    );
};

const backToMain = () => {
  document.querySelector(".btn").removeEventListener("click", backToMain);
  document.querySelector(`#main-page`).style.display = "block";
  document.querySelector("#multipleQuestionContainer").style.display = "none";
  document.querySelector("#main-page").style.pointerEvents = "all";
};

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
