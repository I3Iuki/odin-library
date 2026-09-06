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