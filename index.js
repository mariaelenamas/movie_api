const express = require("express");
(morgan = require("morgan")), (fs = require("fs")), (path = require("path"));

const app = express();

let movies = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    year: "2001",
    directors: "Chris Columbus",
  },
  {
    title: "Maleficent",
    year: "2014",
    directors: "Robert Stromberg",
  },
  {
    title: "Bridget Jones's Baby",
    year: "2016",
    directors: "Sharon Maguire",
  },
  {
    title: "Fantastic Beasts: The Crimes of Grindelwald",
    year: "2018",
    directors: "David Yates",
  },
  {
    title: "Casper",
    year: "1995",
    directors: "Stephanie Meyer",
  },
  {
    title: "Jumanji",
    year: "1995",
    directors: "Jake Kasdan, Joe Johnston",
  },
  {
    title: "Twilight",
    year: "2001",
    directors: "Stephanie Meyer",
  },
  {
    title: "Pride and prejudice",
    year: "2005",
    directors: "Joe Wright",
  },
  {
    title: "The mask",
    year: "1994",
    directors: "Chuck Russell",
  },
  {
    title: "Edward Scissorhands",
    year: "1990",
    directors: "Tim Burton",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie App!");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

// Setup static files (all requests route to the "public" folder)
app.use(express.static("public"));

// Listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

// Setup error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
