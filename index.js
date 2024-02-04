const mongoose = require("mongoose");
const Models = require("./models.js");
const express = require("express");
const { check, validationResult } = require("express-validator");
require('dotenv').config()
const Movies = Models.Movie;
const Users = Models.User;

// mongoose.connect("mongodb://127.0.0.1:27017/moviesapi", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

(morgan = require("morgan")),
  (fs = require("fs")),
  (path = require("path")),
  (bodyParser = require("body-parser")),
  (uuid = require("uuid"));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

let auth = require("./auth")(app);

const passport = require("passport");
require("./passport");

// NO PROTECTION - READ "Welcome" - GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie App!");
});

// NO PROTECTION - READ documentation file
app.get("/documentation",
  (req, res) => {
    const filePath = path.join(__dirname, "public", "documentation.html");
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(404).send("File not found");
      }
    });
  });

// PROTECTION - CREATE Add a movie to a user's list of favorites
app.post("/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
      $push: { FavoriteMovies: req.params.MovieID }
    },
      { new: true }) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

// PROTECTION - READ Return a list of all users
app.get("/users/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.find()
      .then((users) => {
        res.status(200)
          .json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500)
          .send("Error: " + err);
      });
  }
);

// PROTECTION - READ Get a user by username
app.get("/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
      .then((user) => {

        delete user._doc.Password // Just a recommendation for the future 
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

// PROTECTION - READ Return all movies
app.get("/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(200).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

// PROTECTION - READ Return a single movie by title 
app.get("/movies/:movieTitle",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Movies.findOne({ Title: req.params.movieTitle })
      .then((movie) => {
        res.status(200)
          .json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500)
          .send("Error: " + err);
      });
  }
);

// PROTECTION - READ Return a genre by name
app.get("/movies/genre/:genreName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.params.genreName)
    await Movies.find({ "Genre.Name": req.params.genreName })
      .then((genreName) => {
        res.status(200)
          .json(genreName);
      })
      .catch((err) => {
        console.error(err);
        res.status(500)
          .send("Error: " + err);
      });
  }
);

// PROTECTION - READ Return a director by name
app.get("/movies/directors/:directorsName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ "Directors.Name": req.params.directorsName })
      .then((director) => {
        res.status(200)
          .json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500)
          .send("Error: " + err);
      });
  }
);

// PROTECTION - UPDATE info users
app.put("/users/:Username", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // CONDITION TO CHECK ADDED HERE
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send("Permission denied");
  }
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error: " + err);
    })
});

app.post("/users",
  // Validation logic here for request
  // you can either use a chain of methods like .not().isEmpty()
  // which means "opposite of isEmpty" in plain english "is not empty"
  // or use .isLength({min: 5}) which means
  // minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ], async (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  });

// PROTECTION - DELETE Allow users to remove a movie from their list of favorites
app.delete("/users/:Username/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
      { new: true }) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      })
  });

// PROTECTION - TO ADD a movie "to watch" list 
app.post("/users/:Username/towatch/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
      $push: { ToWatch: req.params.MovieID }
    },
      { new: true }) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

// PROTECTION - TO REMOVE a movie "to watch" list 
app.delete("/users/:Username/towatch/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
      $pull: { ToWatch: req.params.MovieID }
    },
      { new: true }) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      })
  });

// PROTECTION - DELETE a user by username
app.delete("/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });


// Setup static files (all requests route to the "public" folder)
app.use(express.static("public"));

// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});

// Setup error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
