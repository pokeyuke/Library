const myLibrary = [];
const btn = document.getElementById("add-book")
const main = document.getElementById("main")

btn.addEventListener("click", bookDisplay)

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

function bookDisplay(){
    main.innerHTML = ""; 
    
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div"); 
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
        `;
        main.appendChild(bookCard); 
    });

}
