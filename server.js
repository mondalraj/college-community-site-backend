const express = require("express");
require("dotenv").config();

const app = express();
const { auth, requiresAuth } = require('express-openid-connect');

app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
    })
);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

//middleware
// app.use(express.json())

// get all users
// app.get("/api/users", (req, res) => {
//     res.status(200).json({
//         status: "success",
//         data: {
//             user: ["Rajib", "Mondal"],
//         }
//     })
// })

//get a particular user
// app.get("/api/users/:id", (req, res) => {
//     console.log(req.params);
// })



//Create a new User
// app.post("/api/users", (req, res) => {
//     console.log(req.body)
// })

//update a user
// app.put("/api/users/:id", (req, res) => {
//     console.log(req.params.id);
//     console.log(req.body);
// })

//delete a user
// app.delete("/api/users/:id", (req, res) => {
//     res.status(204).json({
//         status: "success",
//         data: "no-data"
//     })
// })

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});