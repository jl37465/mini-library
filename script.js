let finalLibrary = [];
let initialStart = true;

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
    book.position = finalLibrary.length;
    let stringBook = JSON.stringify(book);
    finalLibrary[book.position] = stringBook; // Enters finalLibrary array as stringify.
    console.log("Stringified book: " + stringBook + ", position: " + book.position);

    if (!initialStart) {
        localStorage.setItem(book.position, stringBook); // Enters localStorage as stringify.
    }
    
    
}

function getPositionInArray(book) {
    for (key in finalLibrary) {
        if (book.title == (JSON.parse(finalLibrary[key])).title && book.author == (JSON.parse(finalLibrary[key])).author) {
            return key;
        }
    }
}

function removeBookFromLibrary(book) {

    let bookLocation = getPositionInArray(book);// Finds the actual book's position within the array, not just the one initially created within createNewCard().
    
    finalLibrary.splice(bookLocation, 1);
    localStorage.clear();
    if (finalLibrary.length === 0) {
        finalLibrary = [];
    } else {
        for (index in finalLibrary) {
            let parsedBook = JSON.parse(finalLibrary[index]);
            parsedBook.position = index;
            finalLibrary[index] = JSON.stringify(parsedBook);
            localStorage.setItem(index, JSON.stringify(parsedBook));
        }
    }

    console.log("New localStorage: " + localStorage);
    console.log("New finalLibrary: " + JSON.parse(JSON.stringify(finalLibrary)))
}

function changeReadStatus(book) {
    let bookPosition = getPositionInArray(book);
    let parsedBook = JSON.parse(finalLibrary[bookPosition]);
    if (book.read === "Read") {
        parsedBook.read = "Not Read";
    } else {
        parsedBook.read = "Read";
    }

    let stringBook = JSON.stringify(parsedBook);
    finalLibrary[bookPosition] = stringBook;
    localStorage.setItem(bookPosition, stringBook);


}

function createNewCard(book) {

    let jsonBook = book;
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
    createNewCard(newCard);
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
    console.log("localStorage length: " + localStorage.length);
    console.log("localStorage: " + (localStorage));
    if (localStorage.length > 0) {
        /* Object.keys(localStorage).forEach((key) => { */
        for (let i = 0; i < localStorage.length; i++) {
            console.log("It looks like: " + (localStorage.getItem(i)));
            let parsedBook = JSON.parse(localStorage.getItem(i));
            createNewCard(parsedBook);
        }
    }
    initalStart = false;
    
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
>>>>>NOTES<<<<<
- The books are stored in the array/storage as a stringify and must be parsed whenever they are used, then re-stringified when they enter storage again.



>>>>TO DO:<<<<

BUGS <<<<<<<<
 - 
 - Currently, the read/unread button doesn't seem to change the value within localStorage. (UPDATE: the actual value changes, just need to get the button to change to match now. EASY STUFF!!!!)


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