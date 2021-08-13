let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readState;

        if (read) {
            readState = "already read";
        } else {
            readState = "not read yet";
        }

        return `${title} by ${author}, ${pages} pages, ${readState}`;
    }
}

function addBookToLibrary() {
    
}
