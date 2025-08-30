const myLibrary = [];
const showBtn = document.getElementById("add-book")
const main = document.getElementById("main")
const trigger = document.getElementById("trigger")
const cancel = document.getElementById("cancel")
const dialog = document.getElementById("new-book")
const wrapper = document.querySelector(".wrapper")
const bookForm = document.getElementById("book-form")



trigger.addEventListener("click", () => showLoginDialog(true))
cancel.addEventListener("click", () => showLoginDialog(false))

showBtn.addEventListener("click", bookDisplay)

function Book(title, author, pages, read){

    if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    this.info = function(){
        if(read){
      return  "The " + this.title + " by " + this.author + ", " + this.pages +" read" }
    else{
        return  "The " + this.title + " by " + this.author + ", " + this.pages + " not read yet"
    } 
    }
}

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
}

 addBookToLibrary("1984", "George Orwell", 300, true);
 addBookToLibrary("Animal Farm", "George Orwell", 200, true);
 addBookToLibrary("Norwegian Woods", "Haruki Mukarami", 400, false);


Book.prototype.toggleRead = function () {
    this.read = !this.read;
};




function bookDisplay(){
    main.innerHTML = ""; 
    
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div"); 
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
            <button class="delete-btn" data-id="${book.id}">Delete</button>
            <button class="read-status" data-id="${book.id}" >Read?</button>
        `;
        bookCard.classList.add("cards")
        main.appendChild(bookCard); 
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const bookId = e.target.getAttribute('data-id');
        removeBook(bookId);
    });
});

   
document.querySelectorAll('.read-status').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const bookId = e.target.getAttribute('data-id');
        const book = myLibrary.find(book => book.id === bookId);
        if (book) {
            book.toggleRead(); 
            bookDisplay();
        }
    });
});



}

const showLoginDialog = (show) => show ? dialog.showModal() : dialog.close()

dialog.addEventListener("click", (e) => !wrapper.contains(e.target) && dialog.close())

bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const title = bookForm.title.value.trim();
    const author = bookForm.author.value.trim();
    const pages = parseInt(bookForm.pages.value.trim());
    const read = bookForm.read.checked;

        if (!title || !author || isNaN(pages)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    addBookToLibrary(title, author, pages, read);
    bookDisplay(); 
    bookForm.reset(); 
    dialog.close(); 
});



function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        bookDisplay(); 
    }
}

