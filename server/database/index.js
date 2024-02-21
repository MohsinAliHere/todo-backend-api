const mongoose = require("mongoose");

const ConnectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECT , 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    console.log("Connect to MongoDB ..." , conn.connection.host);
  } catch (error) {
    console.log("Failed to connect", error);
    error.process.exit(1)
  }
};

module.exports = ConnectDb;
