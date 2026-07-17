const library = [];

const addBookDialog = document.getElementById("book-addition-popup");
const addBookForm = document.getElementById("book-addition-form");
const addBookBtn = document.getElementById("add-book-btn");
const submitAddBookForm = document.querySelector("#book-addition-form button[type='submit'");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const coverInput = document.getElementById("cover-input");
const pageInput = document.getElementById("page-input");
const statusInput = document.getElementById("status-input")

const deletionConfirmationDialog = document.getElementById("deletion-confirmation-popup");

const closeBtns = document.querySelectorAll("button.close");

function book(title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount? pageCount : undefined;
    this.readStatus = readStatus? readStatus : undefined;
}

function updateLibrary() {

}

closeBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
        this.closest('dialog').close();
    });
});
    
addBookBtn.addEventListener('click', () => {
    addBookDialog.showModal();
});

submitAddBookForm.addEventListener('click', (e) => {
    console.log("submitted");
    e.preventDefault();

    const temp = new book(titleInput.value, authorInput.value, coverInput.value, pageInput.value, statusInput.value);
    library.push(temp);

    addBookForm.reset();

    addBookDialog.close();

    console.log(library);
    console.log(temp);

});






/*
            <div id="card-container">
                <div class="card">
                    <div class="card-header">
                        <h2 class="book-title">Jewels</h2>
                        <div class="options">
                            <img src="./assets/ellipsis.svg" alt="" class="ellipsis">
                            <ul class="options-dropdown active">
                                <li class="change-status"><button class="change-read-status-btn">Mark as read<img src="./assets/book.svg" alt="" class="svg"></button></li>
                                <li class="delete"><button class="delete-btn">Delete<img src="./assets/trash.svg" alt="" class="svg"></button></li>
                                <li><button>asdflkasjdflj</button></li>
                            </ul>
                        </div>
                    </div>
                    <p class="author"><b>Author:</b> Danielle Steel</p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43K1fHKj7DUzHKageMmuwG0VEG_JxWft1i_AxwGjpqQ&s=10" alt="cover img" class="book-cover">
                    <div class="additional-info">
                        <p class="page-count"><b># of Pages:</b> 234</p>
                        <p class="status unread">Read</p>
                    </div>
                </div>
*/