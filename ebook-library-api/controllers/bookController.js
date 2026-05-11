const { books } = require("../data/db");


exports.createBook = (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author are required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    user: req.user.id, 
  };

  books.push(newBook);
  res.status(201).json(newBook);
};


exports.getBooks = (req, res) => {
  res.json(books);
};

exports.getBookById = (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};


exports.updateBook = (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.user !== req.user.id) {
    return res.status(403).json({ message: "Not allowed to update this book" });
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.json(book);
};


exports.deleteBook = (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const book = books[index];
  if (book.user !== req.user.id) {
    return res.status(403).json({ message: "Not allowed to delete this book" });
  }

  books.splice(index, 1);
  res.json({ message: "Book deleted" });
};
