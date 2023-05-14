const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener("click", addBookToLibrary);

const formContainer = document.querySelector(".form-container");

formContainer.addEventListener("click", handleAdd);

function handleAdd() {
  formContainer.classList.toggle("not-adding");
  document.querySelector("form").classList.toggle("not-adding");
  formContainer.removeEventListener("click", handleAdd);
}

const books = [];

books[0] = new Book("The Hobbit", "J.R.R Tokien", 294, true);
books[1] = new Book("Invention", "James Dyson", 348, true);
books[2] = new Book("Dune", "Frank Herbert", 400, true);

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(event) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  const newBook = new Book(title, author, pages, read);
  books.push(newBook);
  displayBook(newBook);
  document.querySelector(".form-container").classList.toggle("not-adding");
  document.querySelector("form").classList.toggle("not-adding");
  event.stopPropagation();
  formContainer.addEventListener("click", handleAdd);
  event.preventDefault();
}

function displayBooks() {
  books.forEach((e) => {
    displayBook(e);
  });
}

function displayBook(book) {
  const main = document.querySelector("main");
  const card = document.createElement("div");
  card.classList.add("book-card");
  const name = document.createElement("h3");
  name.textContent = book.name;
  const author = document.createElement("h4");
  author.textContent = book.author;
  const pages = document.createElement("p");
  pages.textContent = `Pages: ${book.pages}`;
  const read = document.createElement("p");
  read.textContent = `Read: ${book.read ? "\u2714" : "\u2717"}`;
  card.appendChild(name);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  main.insertBefore(card, document.querySelector(".form-container"));
}

displayBooks();
