const library = [];

const container = document.getElementById("card-container");

const addBookDialog = document.getElementById("book-addition-popup");
const addBookForm = document.getElementById("book-addition-form");
const addBookBtn = document.getElementById("add-book-btn");
const submitAddBookForm = document.querySelector("#book-addition-form button[type='submit'");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const coverInput = document.getElementById("cover-input");
const pageInput = document.getElementById("page-input");
const statusInput = document.getElementById("status-input");

const cardOptionsBtns = [];

const deletionConfirmationDialog = document.getElementById("deletion-confirmation-popup");
const deletionConfirmationForm = document.getElementById("deletion-confirmation-form")
const confirm = document.getElementById("confirm");
const cancel = document.getElementById("cancel");

const closeBtns = document.querySelectorAll("button.close");

let pendingDeletion;



function bookConstructor(title, author, coverLink, pageCount, readStatus, id) {
    this.title = title;
    this.author = author;   
    this.coverLink = coverLink;
    this.pageCount = pageCount? pageCount : "N/A";
    this.isRead = readStatus? readStatus : false;
    this.id = id;
}

function createCard(book) {
    return ` <div class="card" id="${book.id}">
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
}

function addBook() {
    const book = library[library.length - 1];
    const HTMLBook = createCard(book);

    container.insertAdjacentHTML('beforeend', HTMLBook);
}

function removeBook() {
    library.pop(library.findIndex(book => book.id === pendingDeletion.id));
    pendingDeletion.remove();
    pendingDeletion = undefined;
}

container.addEventListener('click', (e) => {
    if (e.target.matches(".ellipsis")) {
        const dropdown = e.target.nextElementSibling;
        
        document.querySelectorAll(".options-dropdown").forEach((element) => {
            if (element !== dropdown) {
                element.classList.remove("active");
            } else {

            }
        });
        dropdown.classList.toggle("active");     
    } else {
        document.querySelectorAll(".options-dropdown").forEach((element) => {
            element.classList.remove("active");
        })

        if (e.target.matches(".change-read-status-btn")) {
            const statusIndicator = e.target.closest(".card").querySelector(".status");

            statusIndicator.classList.toggle("unread");
            console.log(statusIndicator);
            
            if (statusIndicator.classList.contains("unread")) {
                console.log("unread");
                statusIndicator.innerText = "Unread";
            } else {
                statusIndicator.innerText = "Read";
            }
        } else if (e.target.matches(".delete-btn")) {
            pendingDeletion =   e.target.closest(".card");
            deletionConfirmationDialog.showModal();
        }
    }
});

closeBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
        this.closest('dialog').close();
    });
});
    
addBookBtn.addEventListener('click', () => {
    addBookDialog.showModal();
});

submitAddBookForm.addEventListener('click', (e) => {
    e.preventDefault();

    const temp = new bookConstructor(titleInput.value, authorInput.value, coverInput.files[0] ? URL.createObjectURL(coverInput.files[0]) : "./assets/book-placeholder.png", pageInput.value, statusInput.checked, crypto.randomUUID());

    console.log(pageInput.value)
    
    library.push(temp);

    addBookForm.reset();
    addBookDialog.close();

    addBook();
});

confirm.addEventListener('click', (e) => {
    e.preventDefault();
    removeBook();
    deletionConfirmationDialog.close();
    console.log(library);
})

cancel.addEventListener('click', (e) => {
    deletionConfirmationDialog.close();
}) 
