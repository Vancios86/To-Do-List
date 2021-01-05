// Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// Show the date
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us", options);

// add items to the localstorage
let data = localStorage.getItem("TODO");

// clear the localstorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST); // load the list to the UI
} else {
    LIST = [];
    id = 0;
}

//load items to the UI
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// add to-do function
function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                 <i class="fa ${DONE}" job="complete" id=${id}></i>
                 <p class="text ${LINE}">${toDo}</p>
                 <i class="fa fa-trash-o de" job="delete" id=${id}></i>  
              </li>`;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
    
}

// add an item to the list using Enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            
            //add item to localstorage(add this code where the LIST array gets updated)
localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        
        }
        
        input.value = "";
    }
});

// completing the to do functionality
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to-do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element
    const elementJob = element.attributes.job.value; //completed or delete it
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to localstorage(add this code where the LIST array gets updated)
localStorage.setItem("TODO", JSON.stringify(LIST));
});
    
    
    


