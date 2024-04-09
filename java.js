const bookShelf = document.getElementById("bookShelf");
const button = document.getElementById("bookButton");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const genreInput = document.getElementById("genreInput");
const readInput = document.getElementById("readInput");

const allBooks = bookShelf.children;
let titleValue = "";
let authorValue = "";
let genreValue = "";
let readValue = false;

titleInput.onchange = titleVal;
authorInput.onchange = authorVal;
genreInput.onchange = genreVal;
readInput.onchange = readVal;

function titleVal() {
    titleValue = titleInput.value;
};

function authorVal() {
    authorValue = authorInput.value;
};

function genreVal() {
    genreValue = genreInput.value;
};

function readVal() {
    readValue = readInput.checked;
};


const myLibrary = [];

function Book(name, author, genre, read) {
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.read = read;
};

function addBookToLibrary(title, author, genre, read) {
    title = new Book(title, author, genre, read);
    myLibrary.push(title);
};

button.addEventListener("click", function (event) {
    event.preventDefault();
    if (myLibrary.length === 12) {
        return;
    } else {
        clearShelf();
        addBookToLibrary(titleValue, authorValue, genreValue, readValue);
        for (let x = 0; x < myLibrary.length; x++) {
            bookShelf.appendChild(document.createElement("div"));
            bookShelf.lastChild.appendChild(document.createElement("button")).classList.add(x);
            bookShelf.lastChild.appendChild(document.createElement("li")).textContent = myLibrary[x].name;
            bookShelf.lastChild.appendChild(document.createElement("li")).textContent = myLibrary[x].author;
            bookShelf.lastChild.appendChild(document.createElement("li")).textContent = myLibrary[x].genre;
            bookShelf.lastChild.firstChild.addEventListener("click", function () {
                myLibrary.splice(x, 1);
                bookShelf.removeChild(bookShelf.lastChild);
            });
            if (myLibrary[x].read === true) {
                bookShelf.lastChild.appendChild(document.createElement("button")).classList.add("read");
            } else {
                bookShelf.lastChild.appendChild(document.createElement("button")).classList.add("notRead");
            };
        };
    }
});

function clearShelf() {
    while (bookShelf.hasChildNodes()) {
        bookShelf.removeChild(bookShelf.lastChild);
    }
};

function changeRead() {

}