let finalLibrary = [];

function populateStorage() {
    finalLibrary = [];

    /* Object.keys(localStorage).forEach((key) => {
        let finalJson = JSON.parse(localStorage.getItem(key));

        finalLibrary[finalJson.position] = finalJson;
    }) */
    for (let i = 0; i < localStorage.length; i++) {
        let finalJson = JSON.parse(localStorage.getItem(i));

        finalLibrary[i] = finalJson;
    }
    console.log("localStorage: " + JSON.stringify(localStorage));
    console.log("finalLibrary: " + JSON.parse(JSON.stringify(finalLibrary)));
}

/* function storageAvailable(type) { // returns true if localStorage can be used
    let storage;
    try {
        storage = window[type];
        let x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === "QuotaExceededError" ||
            e.name === "NE_ERROR_DOM_QUOTA_REACHED") &&
            (storage && storage.length !== 0);
    }
} */

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // Either "Read" or "Not Read"
    this.position = null; // Position in finalLibrary array as an index.
}

function addBookToLibrary(book) {
    if (!localStorage.length) {
        book.position = 0;
    } else {
        finalLibrary.push(book);
        book.position = finalLibrary.indexOf(book);
    }
    
    localStorage.setItem(book.position, JSON.stringify(book));
    
}

function removeBookFromLibrary(book) {
    let jsonBook = book;

    /* if (finalLibrary.length === 1) {
        finalLibrary = [];
        localStorage.clear();
    } else {
        Object.keys(localStorage).forEach((key) => {
            if (localStorage.getItem(key).position == jsonBook.position) {
                localStorage.removeItem(jsonBook.position);
                populateStorage();

                let nextBook = finalLibrary[entry.position];
                if (typeof nextBook !== "undefined") {
                    localStorage.removeItem(finalLibrary.indexOf(nextBook));
                    populateStorage();
                }
            }
            // set localStorage, then convert that localStorage info into a final library array in JSON form for each book.
        })
        
        Object.keys(localStorage).forEach((key) => {
            localStorage.getItem(key).position = finalLibrary.indexOf(key);
        })
            
    }
    
    populateStorage(); */

    finalLibrary.splice(book.position, 1);
    localStorage.clear();
    for (book in finalLibrary) {
        localStorage.setItem(book.position, JSON.stringify(book));
    };
    console.log("New localStorage: " + JSON.stringify(localStorage));
    console.log("New finalLibrary: " + JSON.parse(JSON.stringify(finalLibrary)));
}

function changeReadStatus(book) {
    if (book.read === "Read") {
        book.read = "Not Read";
    } else {
        book.read = "Read";
    }

    let newBook = book;
    localStorage.setItem(book.position, JSON.stringify(newBook));


}

function createNewCard(book) {

    let jsonBook = JSON.parse(book);
    let cardContainer = document.getElementById("card-container");
    let newCard = document.createElement("div");
    let titleText = document.createElement("p");
    let authorText = document.createElement("p");
    let pagesText = document.createElement("p");
    let readYetToggle = document.createElement("button");
    let deleteButton = document.createElement("button");
    
    newCard.className = "book-card";
    titleText.className = "title-text";
    titleText.textContent = jsonBook.title;
    authorText.className = "author-text";
    authorText.textContent = jsonBook.author;
    pagesText.className = "pages-text";
    pagesText.textContent = jsonBook.pages;
    readYetToggle.className = "read-yet-toggle card-button";
    readYetToggle.textContent = jsonBook.read;

    readYetToggle.addEventListener("click", () => {
        changeReadStatus(jsonBook);
        readYetToggle.textContent = jsonBook.read;
    })
    

    deleteButton.textContent = "Remove Book\nfrom Library";
    deleteButton.className = "delete-button card-button";
    deleteButton.style.backgroundColor = "red";
    deleteButton.addEventListener("click", () => {
        cardContainer.removeChild(newCard);
        removeBookFromLibrary(jsonBook);
    })

    newCard.appendChild(titleText);
    newCard.appendChild(authorText);
    newCard.appendChild(pagesText);
    newCard.appendChild(readYetToggle);
    newCard.appendChild(deleteButton);
    cardContainer.appendChild(newCard);


    addBookToLibrary(jsonBook);
    console.log(`${jsonBook.title} card added!!!`);
}

let formState = false;

function getFormDetails() {
    let element = document.getElementById("new-card-form");
    let formData = new FormData(element);
    let inputTitle = document.getElementById("input-title");
    let inputAuthor = document.getElementById("input-author");
    let inputPages = document.getElementById("input-pages");
    let inputReadYet = document.getElementById("input-read-yet");

    for (entry of formData.entries()) {
        if(entry[1] == "") {
            alert("Invalid form input. Please fill out all fields correctly.");
            return null;
        }
    }

    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputReadYet.value = "Read";

    
    let entryArray = [];
    let newCard = new Book();

    for (entry of formData.entries()) {
        entryArray.push(entry[1]); // entry[0] = key, entry[1] = value;
        newCard[entry[0]] = entry[1];
        console.log(newCard[entry[0]]);
    } 
    console.log(newCard);
    createNewCard(JSON.stringify(newCard));
    }



function showForm() {
    let form = document.getElementById("new-card-form");
    let formDiv = document.getElementById("form-div");

    form.style.animation = "form-slidein 1s forwards";
    formDiv.style.animation = "become-opaque 1s forwards";
    form.classList.toggle("present");
}

function removeForm() {
    let form = document.getElementById("new-card-form");
    let formDiv = document.getElementById("form-div");

    form.style.animation = "form-slideout 1s forwards";
    formDiv.style.animation = "become-transparent 0s forwards";
    form.classList.toggle("present");
}

function addButtonListeners() {
    let addBookButton = document.getElementById("new-card-button");
    let cancelButton = document.getElementById("cancel-button");
    let submitButton = document.getElementById("submit-button");

    addBookButton.addEventListener("click", () => {
        if (!formState) {
            showForm();
            formState = true;
        }
    });

    cancelButton.addEventListener("click", () => {
        if(formState) {
            removeForm();
            formState = false;
        }
    });

    submitButton.addEventListener("click", () => {
        getFormDetails();
    });
}

function initalize() {
/*     if (localStorage.length > 0) {
        for (book in localStorage) {
            createNewCard(localStorage.getItem(book));
            console.log(localStorage.getItem(book));
        }
    } */
    if (localStorage.length > 0) {
        Object.keys(localStorage).forEach((key) => {
        createNewCard(localStorage.getItem(key));
    })
}
    
}

let example1 = new Book("Hello", "Mr. Brown", 164, "Read");
let example2 = new Book("Wus gud", "Ms. Keaton", 351, "Not Read");
let example3 = new Book("EW EW EW", "Some Kid", 6, "Read");
let htmlForm = document.getElementById("new-card-form");

initalize();
addButtonListeners();

/* localStorage.clear();
finalLibrary = []; */


/*
>>>>TO DO:<<<<

BUGS <<<<<<<<
 - For some reason, in addBookToLibrary, the position of the book reads undefined and doesn't assign a value properly. Maybe change to JSON?


- Add animations and transitions for adding/removing books if possible.
- Look up good designs.
- Finish footer with stats like total books, total read, etc.
- Maybe add confirmation of book being added by form?
*/

/* localStorage.removeItem(0);
localStorage.removeItem(1);
localStorage.removeItem(2);
localStorage.removeItem(-1);
localStorage.removeItem("2");
localStorage.removeItem(undefined);
localStorage.removeItem("library");
localStorage.removeItem("[object Object]");
localStorage.removeItem("myLibrary"); */