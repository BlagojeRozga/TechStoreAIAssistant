const express = require("express"); 

const chatRoutes = require("./routes/chatRoutes"); 

const app = express(); 

// Middleware 
app.use(express.json()); 

// // Health check 
app.get("/", (req, res) => { res.json({ success: true, message: "TechStore AI API is running" }); }); 

// Chat routes 
app.use("/chat", chatRoutes); 

module.exports = app;