 // sort to groups
 let drag;
 let drop;
 // const
 const ARR_GROUPS = DATA.sortToGroups.drop;
 
 /* createItems
 --------------------------------------------------------------
 Description: */
 const createItems = () => {
     setDrag();
     setDrop();
     let data = shuffle(DATA.sortToGroups);
     // create drop
     let dropContainer = El("div", {cls: `dropContainer`});
     document.querySelector(`.sortToGroupsContainer`).append(dropContainer);
     for(let j = 0; j < ARR_GROUPS.length; j++){
         let dropItem = El("div", {cls: `drop`, attributes: {"data-num": j + 1}}, ARR_GROUPS[j]);
         document.querySelector(`.dropContainer`).append(dropItem);
     }
     // create drag
     let dragContainer = El("div", {cls: `dragContainer`});
     document.querySelector(`.sortToGroupsContainer`).append(dragContainer);
     for(let i = 0; i < DATA.sortToGroups.length; i++){
         let dragItem = El("div", {cls: `drag`, attributes: {"data-num": `${data[i].group}`, draggable: "true"}}, data[i].drag);
         document.querySelector(`.dragContainer`).append(dragItem);
     }
 } 
 
 /* setDrag
 --------------------------------------------------------------
 Description: */
 setDrag = () => {
     /* events fired on the draggable target */
     document.addEventListener("drag", function(event) {
     }, false);
     document.addEventListener("dragstart", function(event) {
         // store a ref. on the dragged elem
         drag = event.target;
         drag.style.opacity = 0;
     }, false);
     document.addEventListener("dragend", function(event) {
         drag.style.opacity = 1;
     }, false);
 }
 
 /* setDrop
 --------------------------------------------------------------
 Description: */
 setDrop = () => {
     document.addEventListener("dragover", function(event) {
         event.preventDefault();
     }, false);
     document.addEventListener("drop", function(event) {
         drop = event.target
         // prevent default action (open as link for some elements)
         event.preventDefault();
         // move dragged elem to the selected drop target
         if (drop.className == "drop") {
             // locate drag on drop
             drag.parentNode.removeChild(drag);
             drop.appendChild(drag);
             // style
             onDrop(drag, drop);        }
     }, false);
 }
 
 /* onDrop
 --------------------------------------------------------------
 Description: */ 
 onDrop = () => {
     if (drop.getAttribute("data-num") === drag.getAttribute("data-num")) {
         drag.style.backgroundColor = "green";
     } else {
         drag.style.backgroundColor = "red";
     }
 }
 