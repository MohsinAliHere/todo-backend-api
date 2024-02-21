const { todoJoiSchema } = require("../common/joiSchema");
const Todo_schema = require("../model/todo");
const createTodo = async (req, res) => {
  try {
    const { error } = todoJoiSchema.validate(req.body);
    if (error) {
      return res.sendError(error.message, 400);
    }

    const data = {
      ...req.body,
      userId: res.userId,
    };

    const makeTodo = await Todo_schema.create(data);

    // add userId in todo object
    makeTodo.userId = res.userId;

    if (makeTodo) {
      return res.sendSuccess(makeTodo, "Todo created successfully");
    }
  } catch (error) {
    return res.sendError(error.message, 500);
  }
};

const getTodo = async (req, res) => {
  try {
    const todo = await Todo_schema.find({ userId: res.userId });
    if (!todo) {
      return res.sendSuccess("Todo not found", 400);
    }
    return res.sendSuccess(todo, "todo fetched successfully");
  } catch (error) {
    return res.sendError(error.message, 500);
  }
};

const getSingleTodo = async (req, res) => {
  try {
    
    const todo = await Todo_schema.findOne({
      userId: res.userId,
      _id: req.params.id,
    });
    if (!todo) {
      return res.sendSuccess("Single todo not found", 400);
    }
    return res.sendSuccess(todo, "Single todo fetched successfully");
  } catch (error) {
    return res.sendError(error.message, 500);
  }
};

const deleteSingleTodo = async (req, res) => {
  try {
   
    const todo = await Todo_schema.findOneAndDelete({
      userId: res.userId,
      _id: req.params.id,
    });
    if (!todo) {
      return res.sendSuccess(null, "todo not found");
    }
    return res.sendSuccess(null, "todo delete successfully");
  } catch (error) {
    return res.sendError(error.message, 500);
  }
};
const UpdateTodo = async (req, res) => {
  try {
    const todo = await Todo_schema.findOneAndUpdate(
      {
        userId: res.userId,
        _id: req.params.id,
      },
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    if (!todo) {
      return res.sendSuccess(null, "todo not found");
    }
    return res.sendSuccess(todo, "todo update successfully");
  } catch (error) {
    return res.sendError(error.message, 500);
  }
};

const deleteAllTodo = async (req, res) => {
  try {
    const todo = await Todo_schema.deleteMany({
      userId: res.userId,
    });
    if (!todo) {
      return res.sendSuccess(null, "todo not found");
    }
    return res.sendSuccess(null, "All todo delete successfully");
  } catch (error) {
    return res.sendError(error.message, 500);
  }
};
module.exports = {
  createTodo,
  getTodo,
  getSingleTodo,
  deleteSingleTodo,
  UpdateTodo,
  deleteAllTodo,
};
