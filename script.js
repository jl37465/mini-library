let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.position = null;
    this.info = function () {
        let readState;

        if (read.toLowerCase() === "yes" || read.toLowerCase() === "y") {
            readState = "read";
        } else if (read.toLowerCase() === "no" || read.toLowerCase() === "n"){
            readState = "not read yet";
        }

        return `${title} by ${author}, ${pages} pages, ${readState}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    book.position = myLibrary.length;
    return `"${book.title}" added to library!`;
}

function updateTable(data) {
    let htmlBody = document.getElementById("the-body");
    let table = document.createElement("table");

    let topRow = table.insertRow(0);
    let titleCell = topRow.insertCell(0);
    let authorCell = topRow.insertCell(1);
    let pagesCell = topRow.insertCell(2);
    let readYetCell = topRow.insertCell(3);

    topRow.style.fontWeight = "bold";

    titleCell.textContent = "TITLE";
    authorCell.textContent = "AUTHOR";
    pagesCell.textContent = "PAGES";
    readYetCell.textContent = "READ?";


    /* for (let i = 1; i < data.length + 1; i++) {
        let newRow = table.insertRow(i);
        let title = newRow.insertCell(0);
        let author = newRow.insertCell(1);
        let pages = newRow.insertCell(2);
        let readYet = newRow.insertCell(3);

        title.textContent = data[i].title;

    } */
    
    data.forEach(function(item) {
        let newRow = table.insertRow();
        let title = newRow.insertCell(0);
        let author = newRow.insertCell(1);
        let pages = newRow.insertCell(2);
        let readYet = newRow.insertCell(3);
        title.textContent = item.title;
        author.textContent = item.author;
        pages.textContent = item.pages;
        readYet.textContent = item.read;
    })

    htmlBody.textContent = "";
    htmlBody.appendChild(table);
}

let example1 = new Book("Hello", "Mr. Brown", 164, "Yes");
let example2 = new Book("Wus gud", "Ms. Keaton", 351, "Yes");
let example3 = new Book("EW EW EW", "Some Kid", 6, "No");

console.log(addBookToLibrary(example1));
console.log(addBookToLibrary(example2));
console.log(addBookToLibrary(example3));

updateTable(myLibrary);

/*

>>>>TO DO:<<<<
- Remove table stuff and insert a new card (div) for each individual book
with all the appropriate information.
- Ensure that the formatting (dimensions, height, width, etc.) are all
consistent for each card.
- Add a button that creates a form to add a new book:
    TITLE?
    AUTHOR?
    NO. OF PAGES?
    READ IT? (Checkbox)
- Each finished card should have an option to toggle read/unread and to
remove the card itself.
*/