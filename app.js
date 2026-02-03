//book constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


//local storage

function Store(){}

  Store.prototype.getBooks = function(){

    let books;

    if(localStorage.getItem("books") === null){

      books = [];

    }else{

      books = JSON.parse(localStorage.getItem("books"));
      
    }
    return books;
  };

 Store.prototype.addBook = function(book){

  
    const books = this.getBooks();

    books.push(book);

    localStorage.setItem("books",JSON.stringify(books));
  };

  Store.prototype.removeBook = function(isbn){

    const books = this.getBooks();

    books.forEach(function(book,index){

      if(book.isbn === isbn){

        books.splice(index,1);

      }
    });

    localStorage.setItem("books",JSON.stringify(books));

  };


  Store.prototype.clearBooks = function(){
    localStorage.removeItem("books");
  };



// Add book to UI

function UI() {
  UI.prototype.addBookToList = function (book) {

    const list = document.querySelector("#book-list");
    
    // create tr element
    const row = document.createElement("tr");

    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td class="delete">
                        <span class="btn btn-danger">X</span>
                    </td>`;


    list.appendChild(row);

  };

  UI.prototype.clearFields = function(){

     document.querySelector("#title").value = "";
     document.querySelector("#author").value = "";
     document.querySelector("#isbn").value = "";

  }

  UI.prototype.clearTasks = function(){

    document.querySelector("#book-list").innerHTML = "";
  }

  UI.prototype.deleteBook = function(item){
    
    item.parentElement.remove();

  }


  UI.prototype.showAlert = function(message,type){

    this.clearAlert();

    //create div
    const div = document.createElement("div");

    //add class
    div.className = `alert alert-${type}`;

    //add text
    div.innerText = message;

    //get show alert from parent
    document.querySelector(".show-alert").appendChild(div);

    setTimeout(function(){
      document.querySelector(".alert").remove();

      this.clearAlert();
      
    },3000);
  }

  UI.prototype.clearAlert = function(){

    const currentAlert = document.querySelector(".alert");

    if(currentAlert){
      currentAlert.remove();
    }
  }

}


//load book after refresh

document.addEventListener("DOMContentLoaded",function(){

  const store = new Store();

  const ui = new UI();

  store.getBooks().forEach(function(book){

    ui.addBookToList(book);

  });
});

//add event listner to submit

document.querySelector("#book-form").addEventListener("submit", function (e) {

  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validate

  //  const ui = new UI(); //create instance for UI for both if and else instead of seperate for if and else like below
  if (title === "" || author === "" || isbn === "") {

    const ui = new UI();

    const store = new store();


    ui.showAlert("Fill All Required Details","danger");

   

  } else {

    const ui = new UI(); //create instance for UI

    const book = new Book(title, author, isbn);//passing the parameter to the constructor Book
    
    ui.addBookToList(book); //calling addBookList

    const store = new Store();

    store.addBook(book);

     ui.showAlert("Book Added Successfully","success");

    ui.clearFields();//to clear i/p fields after book added
}


});




//delete book

  document.querySelector("#book-list").addEventListener("click",function(e){

    if(e.target.parentElement.classList.contains("delete")){

      const ui = new UI();

      ui.deleteBook(e.target.parentElement);
      
      const isbn = e.target.parentElement.previousElementSibling.textContent;

      
      const store = new Store();

      store.removeBook(isbn);

      ui.showAlert("Book Deleted","danger");
    }
  })

//clear all
document.querySelector("#clear").addEventListener("click",function(e){
  
    const ui = new UI();

    ui.clearTasks();

    const store = new Store();

    store.clearBooks();

     ui.showAlert("All Book Cleared","success");

    
})