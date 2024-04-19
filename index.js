const express = require("express");

const app = express();

// Middleware functions
function myGlobalMiddleware(req, res, next) {
  const date = new Date();
  console.log(`[${date.getTime()}] Running myGlobalMiddleware`);
  next();
}

function myRouteMiddleware(req, res, next) {
  const date = new Date();
  console.log(`[${date.getTime()}] Running myRouteMiddleware`);
  next();
}

// Apply this middleware to every route
app.use(myGlobalMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello, World!</h1>");
});

// Only apply myRouteMiddleware to thi specific route
app.get("/middleware", [myRouteMiddleware], (req, res) => {
  res.status(200).send("<h1>Hello from /middleware!</h1>");
});

// 404
app.get("*", (req, res) => {
  res.status(404).send("<h1>404</h1>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port : ${port}`);
});