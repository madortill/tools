const DATA = { 
    // multiple and binary questions
    amountOfQoustions: "4",
    "questions": [
        {
            type: `sixChoices`,
            question: `שאלה עם 6 בחירות`,
            ans1: `1תשובה`,
            ans2: `תשובה2`,
            ans3: `תשובה3`,
            ans4: `תשובה4`,
            ans5: `תשובה5`,
            ans6: `תשובה6`,
            correctAns: [`ans1`, `ans2`, `ans5`] // the legth will determine how many answers are reqwiered
        },
        {
            type: `multipleAllPic`,
            question: `שאלה אמריקאית שהתשובות שלה הן תמונות`,
            answers: [`./assets/panda.jpg`, `./assets/dog.jpg`, `./assets/panda.jpg`, `./assets/dog.jpg`],// the legth will determine how many pics will be im the question, one correct ans
            correctAns: `ans1`
        },
        {
            type: `sixChoicesWithPic`,
            src: `./assets/panda.jpg`,
            question: `שאלה עם 6 בחירות ותמונה`,
            ans1: `1תשובה`,
            ans2: `תשובה2`,
            ans3: `תשובה3`,
            ans4: `תשובה4`,
            ans5: `תשובה5`,
            ans6: `תשובה6`,
            correctAns: [`ans1`, `ans2`, `ans5`]
        },
        {
            type: `multiple`,
            question: `שאלהההההההה`,
            ans1: `1תשובה`,
            ans2: `תשובה2`,
            ans3: `תשובה3`,
            ans4: `תשובה4`,
            correctAns: `ans1`
        },
        {
            type: `multipleWithPic`,
            src: `./assets/panda.jpg`,
            question: `שאלה עם תמונה`,
            ans1: `1תשובה`,
            ans2: `תשובה2`,
            ans3: `תשובה3`,
            ans4: `תשובה4`,
            correctAns: `ans1`
        },
        {
            type: `binary`,
            question: `סזבכבסססססססססססס`,
            correctAns: true
        },
        {
            type: `binaryWithPic`,
            src: `./assets/dog.jpg`,
            question: `נכון או לא נכון עם תמונה`,
            correctAns: true
        },
        {
            type: "completeSentence",
            sentence: [`חלק ראשון של המשפט`, `חלק שני של המשפט`], // put each part of the sentence as an string in the array
            dropDownAns: [
                `אופציה 1`,
                `אופציה 2`,
                `אופציה 3`,
                `אופציה 4`,
            ], // all the options that will apear in the dropDown.
            correctAns: "ans0" // location of answer in array
        }, 
    ],
    // sort to groups
    "sortToGroups": {
        drop : [`קבוצה 1`, `קבוצה 2`, `קבוצה 3`],
        drag: [
            {
                drag: "קבוצה 1",
                group: 1
            },
            {
                drag: "קבוצה 2",
                group: 2
            },
            {
                drag: "קבוצה 3",
                group: 3
            },
            {
                drag: "קבוצה 1",
                group: 1
            },
            {
                drag: "קבוצה 2",
                group: 2
            },
            {
                drag: "קבוצה 3",
                group: 3
            },
            {
                drag: "קבוצה 1",
                group: 1
            },
            {
                drag: "קבוצה 2",
                group: 2
            },
            {
                drag: "קבוצה 3",
                group: 3
            },
        ]
    },
};

/* loading function
--------------------------------------------------------------
Description: */
window.addEventListener("load", () => { 
    /* for multiple and binary questions--------------------------*/
    // arrMultipleQuestions = shuffle(arrThisLomdaData);
    addContentToQuestion();
    /* for complete the sentence----------------------------------*/
    // addContentToSentence();
    /* for sort to groups-----------------------------------------*/
    // createItems();
});

// for all of the options - dont delete
/*
shuffle
------------------------------------------------
Description: take orgnaiz array and shffel it
Parameters: array.
------------------------------------------------
Programer: Gal
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

/* El
--------------------------------------------------------------
Description: for all of the options - dont delete */
function El(tagName, options = {}, ...children) {
    let el = Object.assign(document.createElement(tagName), options.fields || {});
    if (options.classes && options.classes.length) el.classList.add(...options.classes);
    else if (options.cls) el.classList.add(options.cls);
    if (options.id) el.id = options.id;
    el.append(...children.filter(el => el));
    for (let listenerName of Object.keys(options.listeners || {}))
        if (options.listeners[listenerName]) el.addEventListener(listenerName, options.listeners[listenerName], false);
    for (let attributeName of Object.keys(options.attributes || {})) {
        if (options.attributes[attributeName] !== undefined) el.setAttribute(attributeName, options.attributes[attributeName]);
    }
    return el;
}
