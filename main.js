const submitButton = document.querySelector('button[type="submit"]');

const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");

title.addEventListener("input", (event) => {
  if (!title.validity.valid) {
    title.nextElementSibling.classList.add("visible");
    if (title.validity.tooShort)
      title.nextElementSibling.textContent = "title is too short";
    else if (title.validity.valueMissing)
      title.nextElementSibling.textContent = "provide a title";
  } else {
    title.nextElementSibling.textContent = "";
    title.nextElementSibling.classList.remove("visible");
  }
});

author.addEventListener("input", (event) => {
  if (!author.validity.valid) {
    author.nextElementSibling.classList.add("visible");
    if (author.validity.tooShort)
      author.nextElementSibling.textContent = "author is too short";
    else if (author.validity.valueMissing)
      author.nextElementSibling.textContent = "provide an author";
  } else {
    author.nextElementSibling.textContent = "";
    author.nextElementSibling.classList.remove("visible");
  }
});

pages.addEventListener("input", (event) => {
  if (!pages.validity.valid) {
    pages.nextElementSibling.classList.add("visible");
    if (pages.validity.valueMissing)
      pages.nextElementSibling.textContent = "provide pages";
  } else {
    pages.nextElementSibling.textContent = "";
    pages.nextElementSibling.classList.remove("visible");
  }
});

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  if (
    !title.checkValidity() ||
    !author.checkValidity() ||
    !pages.checkValidity()
  ) {
    event.preventDefault();
    if (!title.validity.valid) {
      title.nextElementSibling.classList.add("visible");
      if (title.validity.tooShort)
        title.nextElementSibling.textContent = "title is too short";
      else if (title.validity.valueMissing)
        title.nextElementSibling.textContent = "provide a title";
    }
    if (!author.validity.valid) {
      author.nextElementSibling.classList.add("visible");
      if (author.validity.tooShort)
        author.nextElementSibling.textContent = "author is too short";
      else if (author.validity.valueMissing)
        author.nextElementSibling.textContent = "provide an author";
    }
    if (!pages.validity.valid) {
      pages.nextElementSibling.classList.add("visible");
      if (pages.validity.valueMissing)
        pages.nextElementSibling.textContent = "provide pages";
    }
  } else {
    event.preventDefault();
    addBookToLibrary();
  }
}

const formContainer = document.querySelector(".form-container");

formContainer.addEventListener("click", handleAdd);

window.addEventListener("click", handleClick);

function handleClick(event) {
  if (
    formContainer.classList.contains("not-adding") ||
    !"BODYMAINHTML".includes(event.target.tagName)
  )
    return event.stopPropagation();
  closeForm(event);
}

function handleAdd() {
  formContainer.classList.toggle("not-adding");
  document.querySelector("form").classList.toggle("not-adding");
  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", closeForm);
  formContainer.removeEventListener("click", handleAdd);
}

function closeForm(event) {
  document.querySelector(".form-container").classList.toggle("not-adding");
  document.querySelector("form").classList.toggle("not-adding");
  formContainer.addEventListener("click", handleAdd);
  event.stopPropagation();
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
  formContainer.addEventListener("click", handleAdd);
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
    '<button><svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg></button>';
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
