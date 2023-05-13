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
