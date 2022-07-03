
// question
let nMultipleCurrentQuestion = 0;
let nMultipleCorrectAnswers = 0;
let arrMultipleQuestions = [];
let currTool;
let visitedTools = [];
let strChoosenBhd = "בהד-6";
let strChoosenCourse = "קורס-1";
let toolsInfo = {
  tool0: {
    name: "פטיש",
    explanation:
      "הפטיש הוא חלק ממשפחת הכלים לשימוש יומיומי. הפטיש מאפשר לתלות מדפים ומסייע בתיקון תקלות בתשתיות ומבנים.",
    questions: [],
  },
  tool1: {
    name: "מפתח ברגים",
    explanation:
      "מפתח הברגים הוא חלק ממשפחת הכלים הביתיים. הוא מאפשר להדק ולפתוח סוגי ברגים שונים וגם כדי להחזיק דיבלים.",
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
  tool6: {
    name: "אזמל",
    explanation:
      "האיזמל הוא חלק ממשפחת הכלים למקצוענים בלבד, והוא משמש לחציבה ולפיסול של אבנים.",
    questions: [],
  },
  tool7: {
    name: "קאטר",
    explanation:
      "הקאטר נחשב חלק ממשפחת הכלים לפירוק פצצות ויכול לשמש לחיתוך כבלי החשמל שמפעילים את הפצצה.",
    questions: [],
  },
};

// const
const TOOLS_NUM = 8;
const AMOUNT_OF_QUESTION =
  DATA[strChoosenBhd][strChoosenCourse]["tools"]["amountOfQuestions"]; // how many questions we want out of the array
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
  document.querySelector(".loader").classList.add("fade");
  for (let questionCounter = 0; questionCounter < TOOLS_NUM; questionCounter++) {
    toolsInfo[`tool${Math.floor(questionCounter / 3)}`]["questions"].push(DATA[strChoosenBhd][strChoosenCourse]["tools"].questions[questionCounter]);
  }
  // add drop down code
  document.querySelector("#start").addEventListener("click", start);
});

const start = () => {
  document.querySelector(".open").style.display = "none";
  document.querySelector("#main-page").style.display = "block";
  document.querySelector("#start").removeEventListener("click", start);
  createMainPage();
};

const openAbout = () => {
  document.querySelector(".about-icon").removeEventListener("click", openAbout);
  document.querySelector("#about").style.display = "block";
  document.querySelector("#main-page").style.pointerEvents = "none";
  document.querySelector(`.black-cover`).style.display = "block";
  document.querySelector(".exit").addEventListener("click", closeAbout);
};

const closeAbout = () => {
  document.querySelector(".about-icon").addEventListener("click", openAbout);
  document.querySelector("#about").style.display = "none";
  document.querySelector("#main-page").style.pointerEvents = "all";
  document.querySelector(`.black-cover`).style.display = "none";
  document.querySelector(".exit").removeEventListener("click", closeAbout);
};

const createMainPage = () => {
  document
    .querySelector("#main-page")
    .append(
      El("p", { cls: "main-title" }, "רשימת כלים"),
      El("img", {
        cls: "about-icon",
        attributes: { src: "assets/media/about.png" },
        alt: "אודות",
        listeners: { click: openAbout },
      })
    );
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
  // document.querySelector("#main-page").style.display = "none";
  document.querySelector("#main-page").style.pointerEvents = "none";
  document.querySelector(`.black-cover`).style.display = "block";
  document.querySelector("#multipleQuestionContainer").style.display = "block";
  if (isVisited(currTool)) {
    showExplanation();
  } else {
    let toolName =
      toolsInfo[currTool]["name"];
    document.querySelector(
      `#multipleQuestionContainer`
    ).innerHTML = `<div class="title">שם הכלי: ${toolName}</div><img src="assets/media/${currTool}.png" alt="${toolName}}" class="curr-tool-pic"><p class="text">לפתיחת ההסבר נדרש לוודא כי יש לך הכשרה מספקת לשימוש בכלי ולכן אתה נדרש לענות נכון לפחות על 2 שאלות מתוך 3</p><button class="btn" id="to-questions">לשאלות</button>`;
    arrMultipleQuestions = shuffle(
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
    arrMultipleQuestions[nMultipleCurrentQuestion].question
  );
  document.querySelector(`#multipleQuestionContainer`).append(question);
  // add answeres
  if (arrMultipleQuestions[nMultipleCurrentQuestion].type === "multiple") {
    let ansContainer = El("div", { cls: `ansContainer` });
    document.querySelector(`#multipleQuestionContainer`).append(ansContainer);
    for (let i = 1; i <= 4; i++) {
      let answer = El(
        "div", {classes: [`multipleAns`, `ans${i}`, `ans`],
          listeners: { click: onClickAnswer }},
        arrMultipleQuestions[nMultipleCurrentQuestion][`ans${i}`]
      );
      document.querySelector(`.ansContainer`).append(answer);
    }
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
    nMultipleCorrectAnswers++;
  } else {
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
  if (nMultipleCorrectAnswers >= 2) {
    visitedTools.push(currTool);
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
            "button",
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
          src: `assets/media/${currTool}.png`,
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
        "button",
        { cls: "btn", listeners: { click: backToMain } },
        "לרשימת הכלים"
      )
    );
  arrMultipleQuestions = shuffle(
    toolsInfo[currTool]["questions"]
  );
};

const backToMain = () => {
  document.querySelector(".btn").removeEventListener("click", backToMain);
  document.querySelector(`.black-cover`).style.display = "none";
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
