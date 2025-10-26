const Book = require("../models/Books");
const cloudinary = require("../middleware/cloudinary");

// Add new book
const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      class: bookClass,
      semester,
      subject,
      publishedYear,
      organization,
      price,
      condition,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Book image is required" });
    }

    const newBook = new Book({
      title,
      author,
      class: bookClass,
      semester,
      subject,
      publishedYear,
      organization,
      price,
      condition: condition || "good",
      image: req.file.path,
      cloudinaryId: req.file.filename,
      seller: req.user._id,
    });

    await newBook.save();

    // --- Socket.IO emit ---
    const io = req.app.get('io');
    io.emit('newBook', newBook); // send new book to all connected clients

    res.status(201).json({ success: true, message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Add Book Error:", error);
    res.status(500).json({ success: false, message: "Server error adding book" });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    if (req.user && book.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to update this book" });
    }

    if (req.file) {
      if (book.cloudinaryId) await cloudinary.uploader.destroy(book.cloudinaryId);
      book.image = req.file.path;
      book.cloudinaryId = req.file.filename;
    }

    Object.assign(book, req.body);
    await book.save();

    // --- Socket.IO emit ---
    const io = req.app.get('io');
    io.emit('updatedBook', book);

    res.status(200).json({ success: true, message: "Book updated successfully", book });
  } catch (error) {
    console.error("Update Book Error:", error);
    res.status(500).json({ success: false, message: "Server error updating book" });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    if (req.user && book.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this book" });
    }

    if (book.cloudinaryId) await cloudinary.uploader.destroy(book.cloudinaryId);

    await book.deleteOne();

    //Socket.IO emit 
    const io = req.app.get('io');
    io.emit('bookDeleted', book._id);

    res.status(200).json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete Book Error:", error);
    res.status(500).json({ success: false, message: "Server error deleting book" });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("seller", "name email");
    res.status(200).json({ success: true, books });
  } catch (error) {
    console.error("Get Books Error:", error);
    res.status(500).json({ success: false, message: "Server error fetching books" });
  }
};

// Get books uploaded by the current user
const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ seller: req.user._id })
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      books,
      count: books.length 
    });
  } catch (error) {
    console.error("Get My Books Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error fetching your books" 
    });
  }
};
// Get single book
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("seller", "name email");
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.status(200).json({ success: true, book });
  } catch (error) {
    console.error("Get Book Error:", error);
    res.status(500).json({ success: false, message: "Server error fetching book" });
  }
};


module.exports = { addBook, getBooks, getBookById, updateBook, deleteBook, getMyBooks};
