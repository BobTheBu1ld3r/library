const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener("click", addBookToLibrary);

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

  books.push(new Book(title, author, pages, read));
  event.preventDefault();
}

function displayBooks() {
  books.forEach((e) => {
    const main = document.querySelector("main");
    const card = document.createElement("div");
    card.classList.add("book-card");
    const name = document.createElement("h3");
    name.textContent = e.name;
    const author = document.createElement("h4");
    author.textContent = e.author;
    const pages = document.createElement("p");
    pages.textContent = e.pages;
    const read = document.createElement("p");
    read.textContent = e.read;
    card.appendChild(name);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    main.insertBefore(card, document.querySelector("form"));
  });
}

displayBooks();
