const mongoose = require('mongoose');
const Models = require('./models.js');
const express = require("express");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://127.0.0.1:27017/moviesapi', { useNewUrlParser: true, useUnifiedTopology: true });

(morgan = require("morgan")),
  (fs = require("fs")),
  (path = require("path")),
  (bodyParser = require("body-parser")),
  (uuid = require("uuid"));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

// PROTECTION - CREATE Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Users.findOneAndUpdate({ Username: req.params.Username },
            {
                $push: { FavoriteMovies: req.params.MovieID }
            },
            { new: true }) // this makes sure that the updated document is returned
            .populate('FavoriteMovies', 'movieTitle')
            .then((updatedUser) => {
                res.status(201)
                    .json(updatedUser);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

// PROTECTION - READ Return all movies
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// PROTECTION - READ Return single movie by title 
app.get('/movies/:movieTitle',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Movies.findOne({ Title: req.params.movieTitle })
            .populate('Genre', 'Name')
            .populate('Director', 'Name')
            .then((movie) => {
                res.status(200)
                    .json(movie);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

// PROTECTION - READ Return a list of all users
app.get('/users/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Users.find()
            .populate('FavoriteMovies', 'movieTitle')
            .then((users) => {
                res.status(200)
                    .json(users);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

// PROTECTION - Update info users
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // CONDITION TO CHECK ADDED HERE
  if(req.user.Username !== req.params.Username){
      return res.status(400).send('Permission denied');
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
          res.status(500).send('Error: ' + err);
      })
});

// PROTECTION - READ Return a list of all genres
app.get('/genre',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await genre.find()
            .then((genre) => {
                res.status(200)
                    .json(genre);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

// PROTECTION - READ Return a genre by name
app.get('/movies/genre/:genreName',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await genre.findOne({ Name: req.params.genreName })
            .then((genreName) => {
                res.status(200)
                    .json(genreName);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

// PROTECTION - READ Return a list of all directors
app.get('movies/directors',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Directors.find()
            .then((directors) => {
                res.status(200)
                    .json(director);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

// PROTECTION - READ Return a director by name
app.get('/movies/directors/:directorsName',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await directors.findOne({ Name: req.params.directorsName })
            .then((director) => {
                res.status(200)
                    .json(director);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

// CREATE Add a user, Allow new users to register
app.post('/users/', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists.');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// CREATE Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// READ "Welcome" - GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie App!");
});

// READ Return a list of ALL movies to the user
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// READ Return data about a single movie by title to the user
app.get("/movies/:movieTitle", (req, res) => {
  // Same as: const title = req.params.title;
  const { movieTitle } = req.params;
  const movie = movies.find((movie) => movie.Title === movieTitle);

  if (movie) {
    return res.status(200).json(movie);
  } else {
    res.status(400).send("No such movie");
  }
});

// READ "Users" - GET all users 
app.get('/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while fetching users' });
    });
});

// READ Get a user by username
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// READ Return all genres
app.get("/genre", (req, res) => {
  return res.send("You have all!")
});

// READ Return data about a genre by name/title
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    return res.status(200).json(genre);
  } else {
    res.status(400).send("No such genre");
  }
});

// READ Return data about a director by name
app.get("/movies/directors/:directorsName", (req, res) => {
  const { directorsName } = req.params;
  const directors = movies.find((movie) => movie.Directors.Name === directorsName).Directors;

  if (directors) {
    return res.status(200).json(directors);
  } else {
    res.status(400).send("No such Director");
  }
});

// UPDATE a user's info, by username
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
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
    console.error(err);
    res.status(500).send('Error: ' + err);
  })

});

// DELETE Allow users to remove a movie from their list of favorites
app.delete("/users/:Username/:MovieID", async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }) // This line makes sure that the updated document is returned
 .then((updatedUser) => {
   res.json(updatedUser);
  })
 .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  })
});

// DELETE a user by username
app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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
