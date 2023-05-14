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
  const cross = document.createElement("div");
  cross.dataset.name = book.name;
  cross.innerHTML =
    '<button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg></button>';
  cross.addEventListener("click", handleRemove);
  const name = document.createElement("h3");
  name.textContent = book.name;
  const author = document.createElement("h4");
  author.textContent = book.author;
  const pages = document.createElement("p");
  pages.textContent = `Pages: ${book.pages}`;
  const read = document.createElement("p");
  read.textContent = `Read: ${book.read ? "\u2714" : "\u2717"}`;
  card.appendChild(cross);
  card.appendChild(name);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  main.insertBefore(card, document.querySelector(".form-container"));
}

function handleRemove(event) {
  const main = document.querySelector("main");
  const targetEl = event.target;
  let card = targetEl;
  while (card.tagName !== "DIV") {
    card = card.parentNode;
    console.log(card.tagName);
  }
  console.log(card);
  const a = card.parentNode;
  const name = card.dataset.name;
  removeBookFromLibary(name);
  main.removeChild(a);
}

function removeBookFromLibary(name) {
  console.log(books);
  books.forEach((book, index) => {
    if (book.name === name) books.splice(index, 1);
  });
  console.log(books);
}

displayBooks();
