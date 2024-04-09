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
    titleValue = titleInput.value.toUpperCase();
};

function authorVal() {
    authorValue = authorInput.value.toUpperCase();
};

function genreVal() {
    genreValue = genreInput.value.toUpperCase();
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
    addBookToLibrary(titleValue, authorValue, genreValue, readValue);
    refreshShelf();
    titleInput.value = "";
    titleValue = "";
    authorInput.value = "";
    authorValue = "";
    genreInput.value = "";
    genreValue = "";
    readInput.checked = false;
    readValue = false;
});

function clearShelf() {
    while (bookShelf.hasChildNodes()) {
        bookShelf.removeChild(bookShelf.lastChild);
    }
};

function notRead(x) {
    myLibrary[x].read = false;
    refreshShelf();
}

function read(x) {
    myLibrary[x].read = true;
    refreshShelf();
}

function changeRead(x) {
    if (myLibrary[x].read === true) {
        myLibrary[x].read = false;
    } if (myLibrary[x].read === false) {
        myLibrary[x].read = true;
    };
    refreshShelf();
};

function refreshShelf() {
    clearShelf();
    for (let x = 0; x < myLibrary.length; x++) {
        bookShelf.appendChild(document.createElement("div"));
        bookShelf.lastChild.appendChild(document.createElement("button")).classList.add(x);
        bookShelf.lastChild.appendChild(document.createElement("li")).textContent = myLibrary[x].name;
        bookShelf.lastChild.appendChild(document.createElement("li")).textContent = myLibrary[x].author;
        bookShelf.lastChild.appendChild(document.createElement("li")).textContent = myLibrary[x].genre;
        readButton(x);
        bookShelf.lastChild.firstChild.addEventListener("click", function () {
            myLibrary.splice(x, 1);
            bookShelf.removeChild(bookShelf.lastChild);
        });


    };
}

function readButton(x) {
    if (myLibrary[x].read === true) {
        bookShelf.lastChild.appendChild(document.createElement("button")).setAttribute("id", x);
        document.getElementById(x).classList.add("read");
        document.getElementById(x).addEventListener("click", function () {
            myLibrary[x].read = false;
            refreshShelf();
        });
    } else if (myLibrary[x].read === false) {
        bookShelf.lastChild.appendChild(document.createElement("button")).setAttribute("id", x)
        document.getElementById(x).classList.add("notRead");
        document.getElementById(x).addEventListener("click", function () {
            myLibrary[x].read = true;
            refreshShelf();
        });
    };
}