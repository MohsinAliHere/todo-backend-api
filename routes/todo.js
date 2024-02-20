const { createTodo, getTodo, getSingleTodo, deleteSingleTodo, UpdateTodo, deleteAllTodo } = require("../controllers/todo");
const verifyToken = require("../middleware/verifyToken");
const router = require("express").Router();

// todo routes
router.post("/todo", verifyToken, createTodo);
router.get("/todo", verifyToken , getTodo );
router.get("/todo/:id", verifyToken , getSingleTodo );
router.delete("/todo/:id", verifyToken , deleteSingleTodo );
router.patch("/todo/:id", verifyToken , UpdateTodo );
router.delete("/todo", verifyToken , deleteAllTodo );


module.exports = router;
