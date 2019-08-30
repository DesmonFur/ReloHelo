const express = require("express");
const massive = require("massive");
require("dotenv").config();
const app = express();
const session = require("express-session");
const { CONNECTION_STRING, PORT, SESSION_SECRET} = process.env;
const ctrl = require("./controller");


app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10
    }
  })
);

app.post('/api/auth/register', ctrl.register)
app.post('/api/auth/login',ctrl.login)
app.get('/api/posts', ctrl.getPosts)
app.get('/api/posts/:userid', ctrl.getUserPosts)
app.get('/api/post/:postid', ctrl.getOnePost)
app.post('/api/post/:userid', ctrl.post)
app.post('/api/auth/logout', ctrl.logout)


massive(CONNECTION_STRING).then(db => {
    app.set("db", db);
    app.listen(PORT, () =>
      console.log(`'DINGLEBERRY CLYDI RUNNNI ${PORT} FLIES`)
    );
  });
  