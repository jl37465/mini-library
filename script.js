let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // Either "Read" or "Not Read"
    this.position = null; // Position in myLibrary array as an index.
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    book.position = myLibrary.indexOf(book);
    return `"${book.title}" added to library!`;
}

function removeBookFromLibrary(book) {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    for (book in myLibrary) {
        book.position = myLibrary.indexOf(book);
    }
}

function createNewCard(book) {
    let cardContainer = document.getElementById("card-container");
    let newCard = document.createElement("div");
    let titleText = document.createElement("p");
    let authorText = document.createElement("p");
    let pagesText = document.createElement("p");
    let readYetToggle = document.createElement("button");
    let deleteButton = document.createElement("button");
    
    newCard.className = "book-card";
    titleText.className = "title-text";
    titleText.textContent = book.title;
    authorText.className = "author-text";
    authorText.textContent = book.author;
    pagesText.className = "pages-text";
    pagesText.textContent = book.pages;
    readYetToggle.className = "read-yet-toggle card-button";
    readYetToggle.textContent = book.read;

    readYetToggle.addEventListener("click", () => {
        if (book.read === "Read") {
            book.read = "Not Read";
        } else {
            book.read = "Read";
        }
        readYetToggle.textContent = book.read;
    })
    

    deleteButton.textContent = "Remove Book\nfrom Library";
    deleteButton.className = "delete-button card-button";
    deleteButton.style.backgroundColor = "red";
    deleteButton.addEventListener("click", () => {
        cardContainer.removeChild(newCard);
        removeBookFromLibrary(book);
    })

    newCard.appendChild(titleText);
    newCard.appendChild(authorText);
    newCard.appendChild(pagesText);
    newCard.appendChild(readYetToggle);
    newCard.appendChild(deleteButton);
    cardContainer.appendChild(newCard);


    addBookToLibrary(book);
    console.log(`${book.title} card added!`);
    console.log(myLibrary);
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

let example1 = new Book("Hello", "Mr. Brown", 164, "Read");
let example2 = new Book("Wus gud", "Ms. Keaton", 351, "Not Read");
let example3 = new Book("EW EW EW", "Some Kid", 6, "Read");
let htmlForm = document.getElementById("new-card-form");

createNewCard(example1);
createNewCard(example2);
createNewCard(example3);


addButtonListeners();

/*
>>>>TO DO:<<<<
- Save to local library (check TOP for that) and create new card for each.
- Add animations and transitions for adding/removing books if possible.
- Look up good designs.
- Finish footer with stats like total books, total read, etc.
- Maybe add confirmation of book being added by form?
*/