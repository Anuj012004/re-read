const express = require("express");
const router = express.Router();
const { addBook, getBooks, getBookById, updateBook, deleteBook, getMyBooks} = require("../controllers/bookController");

// middlewares
const { protect } = require("../middleware/auth"); // auth check
const upload = require("../middleware/multer"); // multer config for file upload
const { validateBook } = require("../middleware/validation"); // your validation rules
const { validationResult } = require("express-validator");

// validation handler
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Routes

//route to post new book
router.post(
  "/",
  protect,
   upload.single("image"),   // expect book image
  validateBook,           // express-validator rules
  handleValidation,         // handle errors
  addBook
);

//to get all books 
router.get("/", getBooks);

//get my-books
router.get('/my-books', protect, getMyBooks)

//Get book by ID
router.get("/:id", getBookById);


//to delete book
router.delete("/:id", protect, deleteBook);


module.exports = router;
