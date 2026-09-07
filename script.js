const container = document.getElementById("card-container");

const addBookDialog = document.getElementById("book-addition-popup");
const addBookForm = document.getElementById("book-addition-form");
const addBookBtn = document.getElementById("add-book-btn");
const submitBook = document.querySelector("#book-addition-form button[type='submit'");

const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const coverInput = document.getElementById("cover-input");
const pageInput = document.getElementById("page-input");
const statusInput = document.getElementById("status-input");

let dropdowns = [];

const deletionConfirmationDialog = document.getElementById("deletion-confirmation-popup");
const deletionConfirmationForm = document.getElementById("deletion-confirmation-form")
const confirm = document.getElementById("confirm");
const cancel = document.getElementById("cancel");

const closeBtns = document.querySelectorAll("button.close");

class Book {
    static #library = [];
    static #pendingDeletion = null;
    
    constructor(title, author, coverLink, pageCount, readStatus) {
        this.title = title;
        this.author = author;   
        this.coverLink = coverLink;
        this.pageCount = pageCount? pageCount : "N/A";
        this.isRead = readStatus? readStatus : false;
    }

    static createCard(book) {
        const html = ` <div class="card" id="${book.id}">
            <div class="card-header">
                <h2 class="book-title">${book.title}</h2>
                <div class="options">
                    <img src="./assets/ellipsis.svg" alt="" class="ellipsis">
                    <ul class="options-dropdown">
                        <li><button class="change-read-status-btn">Change Read Status<img src="./assets/book.svg" alt="" class="svg"></button></li>
                        <li><button class="delete-btn">Delete<img src="./assets/trash.svg" alt="" class="svg"></button></li>
                        <li><button class="id">ID: ${book.id}</button></li>
                    </ul>
                </div>
            </div>
            <p class="author"><b>Author:</b> ${book.author}</p>
            <img src="${book.coverLink}" alt="cover img" class="book-cover">
            <div class="additional-info">
                <p class="page-count"><b># of Pages:</b> ${book.pageCount}</p>
                <p class="status ${book.isRead ? "read" : "unread"}">${book.isRead ? "Read" : "Unread"}</p>
            </div>
        </div>
        `;

        dropdowns = document.querySelectorAll(".options-dropdown");

        container.insertAdjacentHTML('beforeend', html);
    }

    static addBook() {
        const book = new Book(titleInput.value, authorInput.value, coverInput.files[0] ? URL.createObjectURL(coverInput.files[0]) : "./assets/book-placeholder.png", pageInput.value, statusInput.checked);

        Book.createCard(book);

        this.#library.push(book);
    }

    static removeBook(dom) {
        this.#library.pop(this.#library.findIndex(book => book.id === dom.id))
        dom.remove();
    }
}

container.addEventListener('click', (e) => {
    if (e.target.matches(".ellipsis")) {
        const selected = e.target.nextElementSibling;

        selected.classList.toggle("active");

        dropdowns.forEach((element) => {
            if (element !== selected) {
                element.classList.remove("active");
            }
        })
    } else if (e.target.matches(".change-read-status-btn")) {
        const indicator = e.target.closest(".card").querySelector(".status");

        indicator.classList.toggle("unread");
    } else if (e.target.matches(".delete-btn")) {
        Book.removeBook(e.target.closest(".card"));
    } else {
        console.log(dropdowns);
        dropdowns.forEach((dropdown) => {
            console.log(dropdown.classList);
            dropdown.classList.remove("active");
        })
    }
});

closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        this.closest("dialog").close();
    })
})

addBookBtn.addEventListener('click', () => {
    addBookDialog.showModal();
})

submitBook.addEventListener('click', (e) => {
    e.preventDefault();

    Book.addBook();

    addBookForm.reset();
    addBookDialog.close();
})

confirm.addEventListener('click', (e) => {
    e.preventDefault();

    removeBook()
})
cancel.addEventListener('click', (e) => {
    deletionConfirmationDialog.close();
})