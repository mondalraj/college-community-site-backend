const express = require("express");
require("dotenv").config();

const app = express();

//middleware
app.use(express.json())

// get all users
app.get("/api/users", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            user: ["Rajib", "Mondal"],
        }
    })
})

//get a particular user
app.get("/api/users/:id", (req, res) => {
    console.log(req.params);
})



//Create a new User
app.post("/api/users", (req, res) => {
    console.log(req.body)
})

//update a user
app.put("/api/users/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
})

//delete a user
app.delete("/api/users/:id", (req, res) => {
    res.status(204).json({
        status: "success",
        data: "no-data"
    })
})

const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});