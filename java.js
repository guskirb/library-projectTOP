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

class Book {
    constructor(name, author, genre, read) {
        this.name = name;
        this.author = author;
        this.genre = genre;
        this.read = read;
    }
};

class Library {
    constructor() {
        this.library = [];
    }

    addBook(title) {
        this.library.push(title);
    }
    notRead(x) {
        this.library[x].read = false;
        page.refreshShelf();
    }
    read(x) {
        this.library[x].read = true;
        page.refreshShelf();
    }
    changeRead(x) {
        if (this.library[x].read === true) {
            this.library[x].read = false;
        } if (this.library[x].read === false) {
            this.library[x].read = true;
        };
        page.refreshShelf();
    }
    addBookToLibrary(title, author, genre, read) {
        title = new Book(title, author, genre, read);
        this.library.push(title);
    }
};

class Render {
    refreshShelf() {
        this.clearShelf();
        for (let x = 0; x < myLibrary.library.length; x++) {
            bookShelf.appendChild(document.createElement("div"));
            bookShelf.lastChild.appendChild(document.createElement("button")).classList.add(x);
            bookShelf.lastChild.appendChild(document.createElement("li")).textContent = myLibrary.library[x].name;
            bookShelf.lastChild.appendChild(document.createElement("li")).textContent = myLibrary.library[x].author;
            bookShelf.lastChild.appendChild(document.createElement("li")).textContent = myLibrary.library[x].genre;
            this.readButton(x);
            bookShelf.lastChild.firstChild.addEventListener("click", function () {
                myLibrary.library.splice(x, 1);
                bookShelf.removeChild(bookShelf.lastChild);
            });
        }
    }
    clearShelf() {
        while (bookShelf.hasChildNodes()) {
            bookShelf.removeChild(bookShelf.lastChild);
        }
    }
    readButton(x) {
        if (myLibrary.library[x].read === true) {
            bookShelf.lastChild.appendChild(document.createElement("button")).setAttribute("id", x);
            document.getElementById(x).classList.add("read");
            document.getElementById(x).addEventListener("click", () => {
                myLibrary.library[x].read = false;
                this.refreshShelf();
            });
        } else if (myLibrary.library[x].read === false) {
            bookShelf.lastChild.appendChild(document.createElement("button")).setAttribute("id", x)
            document.getElementById(x).classList.add("notRead");
            document.getElementById(x).addEventListener("click", () => {
                myLibrary.library[x].read = true;
                this.refreshShelf();
            })
        }
    }
    titleVal() {
        titleValue = titleInput.value.toUpperCase();
    }

    authorVal() {
        authorValue = authorInput.value.toUpperCase();
    }

    genreVal() {
        genreValue = genreInput.value.toUpperCase();
    }

    readVal() {
        readValue = readInput.checked;
    }
};

const myLibrary = new Library;
const page = new Render;

button.addEventListener("click", function (event) {
    event.preventDefault();
    if (titleInput.value.length === 0) {
        document.querySelector('.titleText').textContent = "Enter a Book Title";
    } if (authorInput.value.length === 0) {
        document.querySelector('.authorText').textContent = "Enter an Author";
    } if (genreInput.value.length === 0) {
        document.querySelector('.genreText').textContent = "Enter a Genre";
    } else {
        myLibrary.addBookToLibrary(titleValue, authorValue, genreValue, readValue);
        page.refreshShelf();
        titleInput.value = "";
        titleValue = "";
        authorInput.value = "";
        authorValue = "";
        genreInput.value = "";
        genreValue = "";
        readInput.checked = false;
        readValue = false;
        document.querySelector('.titleText').textContent = "";
        document.querySelector('.authorText').textContent = "";
        document.querySelector('.genreText').textContent = "";
    }
});

titleInput.onchange = page.titleVal;
authorInput.onchange = page.authorVal;
genreInput.onchange = page.genreVal;
readInput.onchange = page.readVal;
