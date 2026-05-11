const express = require("express");
const protect = require("../middleware/authMiddleware");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.post("/", protect, bookController.createBook);

router.get("/", bookController.getBooks);


router.get("/:id", bookController.getBookById);

router.put("/:id", protect, bookController.updateBook);


router.delete("/:id", protect, bookController.deleteBook);

module.exports = router;
