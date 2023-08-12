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

let users = [
  {
    userid: 1,
    username: "Kim",
    birthday: "1993-05-15",
    email: "kim@gmail.com",
    favoriteMovies: "The mask"
  },
  {
    userid: 2,
    username: "Joe",
    birthday: "1995-09-22",
    email: "joe@gmail.com",
    favoriteMovies: "Maleficent"
  },
  {
    userid: 3,
    username: "James",
    birthday: "1987-12-10",
    email: "james@gmail.com",
    favoriteMovies: "Harry Potter and the Philosopher's Stone"
  },
  // {
  //   userid: 4,
  //   username: "Emily",
  //   birthday: "1992-08-03",
  //   email: "emily@gmail.com",
  //   favoriteMovies: "Bridget Jones's Baby"
  // },
  {
    userid: 5,
    username: "David",
    birthday: "1989-04-28",
    email: "david@gmail.com",
    favoriteMovies: "Casper"
  }
];

let movies = 

[
  {
    Title: "Harry Potter and the Philosopher's Stone",
    Year: "2001",
    Image: "https://w.forfun.com/fetch/65/650a89610bd21be3a615fa8f866a731e.jpeg",
    Genre: 
      [
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
        {
          Name: "Adventure",
          Description: "Adventure movies contain many of the same features of action movies, but are usually set in exotic locations. The main theme is adventure, with the characters often exploring places they have not been before or doing things they have not done before. (Source: Wikipedia)",
        }
      ],
    Description: "An 11-year-old orphan living with his unwelcoming aunt, uncle, and cousin, who learns of his own fame as a wizard known to have survived his parents' murder at the hands of the dark wizard Lord Voldemort as an infant when he is accepted to Hogwarts School of Witchcraft and Wizardry.  Harry makes close friends and a few enemies during his first year at the school and with the help of his friends, Ron Weasley and Hermione Granger, he faces an attempted comeback by the dark wizard Lord Voldemort. (Source: Wikipedia)",
    Directors: 
        { Name: "Chris Columbus",
          Birthyear: "1958",
          Deathyear: "-",
          Bio: "Chris Joseph Columbus is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking. The comedy Mrs. Doubtfire (1993), starring Robin Williams, was another box office success for Columbus. (Source: Wikipedia)",
        },
  },
  {
    Title: "Home Alone",
    Year: "1990",
    Image: "https://images-na.ssl-images-amazon.com/images/I/51Gnbsy8IML.jpg",
    Genre:
        {
          Name: "Comedy",
          Description: "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter. (Source: Wikipedia)",
        },
    Description: "An eight-year-old troublemaker, mistakenly left home alone, must defend his home against a pair of burglars on Christmas eve. (Source: imdb.com)",
    Directors: 
        { 
          Name: "Chris Columbus",
          Birthyear: "1958",
          Deathyear: "-",
          Bio: "Chris Joseph Columbus is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking. (Source: Wikipedia)",
        },
  },
  {
    Title: "Maleficent",
    Year: "2014",
    Image: "https://www.imdb.com/title/tt4777008/mediaviewer/rm3549991681/?ref_=tt_ov_i",
    Genre: 
      [
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
        {
          Name: "Adventure",
          Description: "Adventure movies contain many of the same features of action movies, but are usually set in exotic locations. The main theme is adventure, with the characters often exploring places they have not been before or doing things they have not done before. (Source: Wikipedia)",
        }
      ],
    Description: "Maleficent is a kind-hearted fairy, who is deceived by the love of her life, Stefan. Soon, she places a curse on his daughter, Aurora, in order to exact revenge. (Source: Wikipedia)",
    Directors: 
        { 
          Name: "Robert Stromberg", 
          Birthyear: "1965",
          Deathyear: "-",
          Bio: "Robert Stromberg is an American special effects artist, designer and filmmaker. Stromberg's credits include films such as James Cameron's Avatar, Tim Burton's Alice in Wonderland, and Sam Raimi's Oz the Great and Powerful. (Source: Wikipedia)",
        },
  },
  {
    Title: "Bridget Jones's Baby",
    Year: "2016",
    Image: "https://www.miramax.com/assets/bjb_digital_artt.jpg",
    Genre:
      [
        {
          Name: "Comedy",
          Description: "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter. (Source: Wikipedia)",
        },
        {
          Name: "Romance",
          Description: "Romance film can be defined as a genre wherein the plot revolves around the love between two protagonists. This genre usually has a theme that explores an issue within love, including but not limited to: love at first sight, forbidden love, love triangles, and sacrificial love. (Source: thescriptlab.com)",
        }
      ],
    Description: "After breaking up with Mark, Bridget bumps into a handsome stranger, Jack. Soon, Bridget finds out that she is pregnant and unsure about the identity of her baby's father. (Source: Wikipedia)",
    Directors: 
        {
          Name: "Sharon Maguire",
          Birthyear: "1960",
          Deathyear: "-",
          Bio: "Sharon Maguire is a film director best known for directing Bridget Jones's Diary. The film was based on the book by her close friend Helen Fielding, and one of the main characters, Shazza, is allegedly based on Maguire. (Source: Wikipedia)",
        },
  },
  {
    Title: "Fantastic Beasts: The Crimes of Grindelwald",
    Year: "2018",
    Image: "https://upload.wikimedia.org/wikipedia/en/3/3c/Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png",
    Genre: 
      [
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
        {
          Name: "Adventure",
          Description: "Adventure movies contain many of the same features of action movies, but are usually set in exotic locations. The main theme is adventure, with the characters often exploring places they have not been before or doing things they have not done before. (Source: Wikipedia)",
        }
      ],
    Description: "Gellert Grindelwald plans to raise an army of wizards to rule over non-magical beings. In response, Newt Scamander's former professor, Albus Dumbledore, seeks his help to stop him. (Source: Wikipedia)",
    Directors: 
        { 
          Name: "David Yates", 
          Birthyear: "1963",
          Deathyear: "-",
          Bio: "David Yates is an English film director, producer and screenwriter, who has directed feature films, short films, and television productions. He is best known for directing the final four films in the Harry Potter series and the three films of its prequel series, Fantastic Beasts. (Source: Wikipedia)",
        },
  },
  {
    Title: "Casper",
    Year: "1995",
    Image: "https://m.media-amazon.com/images/I/71QInfg9JCL._AC_UF894,1000_QL80_.jpg",
    Genre: 
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
    Description: "An afterlife therapist and his daughter meet a friendly young ghost when they move into a crumbling mansion in order to rid the premises of wicked spirits. (Source: imdb.com)",
    Directors: 
        { 
          Name: "Brad Silberling",
          Birthyear: "1963",
          Deathyear: "-",
          Bio: "Bradley Mitchell Silberling is an American television and film director whose credits include the feature films Casper, City of Angels, Moonlight Mile, Lemony Snicket's A Series of Unfortunate Events and Land of the Lost. (Source: Wikipedia)",
        },
  },
  {
    Title: "Jumanji",
    Year: "1995",
    Image: "https://nicevintageco.com/cdn/shop/products/DesignohneTitel-585_x500@2x.jpg?v=1673627308",
    Genre: 
      [
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
        {
          Name: "Adventure",
          Description: "Adventure movies contain many of the same features of action movies, but are usually set in exotic locations. The main theme is adventure, with the characters often exploring places they have not been before or doing things they have not done before. (Source: Wikipedia)",
        }
      ],
    Description: "Two children come across a magical board game. While playing it, they meet Alan, a man who was trapped in the game, and attempt to free him while facing different kinds of danger. (Source: Wikipedia)",
    Directors: 
        { 
          Name: "Joe Johnston",
          Birthyear: "1950",
          Deathyear: "-",
          Bio: "Joe Johnston is an American film director, producer, writer, and visual effects artist. He is best known for directing effects-driven films, including Honey, I Shrunk the Kids; The Rocketeer; Jumanji; Jurassic Park III; The Wolfman; and Captain America: The First Avenger. (Source: Wikipedia)",
        },
  },
  {
    Title: "Star Wars: Episode II - Attack of the Clones",
    Year: "2002",
    Image: "https://static.wikia.nocookie.net/starwars/images/9/98/Aotctpb.jpg/revision/latest?cb=20110206033257",
    Genre: 
        {
          Name: "Sci-Fi",
          Description: "A form of fiction that deals principally with the impact of actual or imagined science upon society or individuals. (Source: britannica.com",
        },
    Description: "While pursuing an assassin, Obi Wan uncovers a sinister plot to destroy the Republic. With the fate of the galaxy hanging in the balance, the Jedi must defend the galaxy against the evil Sith. (Source: Wikipedia)",
    Directors: 
        { 
          Name: "George Lucas",
          Birthyear: "1944",
          Deathyear: "-",
          Bio: "George Walton Lucas Jr. is an American filmmaker. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts, Industrial Light & Magic and THX. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012. (Source: Wikipedia)",
        },
  },
  {
    Title: "Pride and prejudice",
    Year: "2005",
    Image: "https://cdn.shopify.com/s/files/1/0308/7889/2172/t/13/assets/description_image_pp5poster.jpg?v=1595757076",
    Genre: 
        {
          Name: "Romance",
          Description: "Romance film can be defined as a genre wherein the plot revolves around the love between two protagonists. This genre usually has a theme that explores an issue within love, including but not limited to: love at first sight, forbidden love, love triangles, and sacrificial love. (Source: thescriptlab.com)",
        },
    Description: "Mrs Bennet insists that her daughters find rich husbands and settle down. When a wealthy bachelor starts living near them, Mrs Bennet's happiness knows no bounds. (Source: Wikipedia)",
    Directors: 
        { 
          Name: "Joe Wright",
          Birthyear: "1972",
          Deathyear: "-",
          Bio: "Joseph Wright is an English film director residing in Somerset, England. His motion pictures include the literary adaptations Pride & Prejudice (2005), Atonement (2007), Anna Karenina (2012), and Cyrano (2021), the action thriller Hanna (2011), Peter Pan origin story Pan (2015), and Darkest Hour (2017), a political drama following Winston Churchill during World War II nominated for Best Picture. (Source: Wikipedia)",
        },
  },
  {
    Title: "The mask",
    Year: "1994",
    Image: "https://image.tmdb.org/t/p/original/xbbXp9px4o8Oe7IbGd0yIbla8mZ.jpg",
    Genre: 
      [
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
        {
          Name: "Comedy",
          Description: "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter. (Source: Wikipedia)",
        },
      ],
    Description: "Stanley, a meek bank employee, turns into an eccentric and maniacal green-skinned superhero who can bend reality, after wearing a wooden mask that was created by Loki, the Norse god of mischief. (Source: Wikipedia)",
    Directors: 
        { 
          Name: "Charles Russell",
          Birthyear: "1958",
          Deathyear: "-",
          Bio: "Charles Russell is an American filmmaker and actor known for his work on several genre films. Some of Russell's best known films include the slasher fantasy film A Nightmare on Elm Street 3: Dream Warriors, the 1988 remake of the 1958 monster horror film The Blob, the fantasy superhero comedy film The Mask, the action film Eraser, and the action-adventure The Scorpion King. (Source: Wikipedia)",
        },
  },
  {
    Title: "Edward Scissorhands",
    Year: "1990",
    Image: "https://lumiere-a.akamaihd.net/v1/images/esh25_584x800_022aaeef.jpeg?region=0%2C0%2C584%2C800",
    Genre: 
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
    Description:"Edward, a synthetic man with scissor hands, is taken in by Peg, a kindly Avon lady, after the passing of his inventor. Things take a turn for the worse when he is blamed for a crime he did not commit. (Source: Wikipedia)",
    Directors: 
        { 
          Name: "Tim Burton",
          Birthyear: "1958",
          Deathyear: "-",
          Bio: "Timothy Walter Burton is an American filmmaker, animator, and artist. He is known for his gothic fantasy and horror films such as Beetlejuice, Edward Scissorhands, The Nightmare Before Christmas, and Dark Shadows, as well as the television series Wednesday (2022). (Source: Wikipedia)",
        },
  },
];

// READ "Welcome" - GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie App!");
});

// CREATE Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
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

// CREATE Allow new users to register | TO DELETE - Old Code app.post
// app.post("/users", (req, res) => {
//   const newUser = req.body;

//   if (newUser.name) {
//     newUser.id = uuid.v4();
//     users.push(newUser);
//     res.status(201).json(newUser);
//   } else {
//     res.status(400).send("No such user. Users need names");
//   }
// });

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

// CREATE Allow users to add a movie to their list of favorites | TO DELETE - Old code add movie to favorites
// app.post("/users/:id/:movieTitle", (req, res) => {
//   const { id, movieTitle } = req.params;
//   let user = users.find((user) => user.id == id);

//   if (user) {
//     user.favoriteMovies.push(movieTitle);
//     res.status(200).send(`${movieTitle} has been added to user ${id}'s favorite movies list`);
//   } else {
//     res.status(400).send("No such user");
//   }
// });

// READ Return a list of ALL movies to the user
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
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

//READ Return data about a director by name
app.get("/movies/directors/:directorsName", (req, res) => {
  const { directorsName } = req.params;
  const directors = movies.find((movie) => movie.Directors.Name === directorsName).Directors;

  if (directors) {
    return res.status(200).json(directors);
  } else {
    res.status(400).send("No such Director");
  }
});

// UPDATE Allow users to update their user info (username) | TO DELETE upd users info
// app.put("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const updatedUser = req.body;

//   let user = users.find((user) => user.id == id);

//   if (user) {
//     user.name = updatedUser.name;
//     res.status(200).json(user);
//   } else {
//     res.status(400).send("No such user");
//   }
// });

// UPDATE a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
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
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter((title) => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("No such user");
  }
});

// DELETE Allow existing users to deregister
// app.delete("/users/:id", (req, res) => {
//   const { id, movieTitle } = req.params;

//   let user = users.find((user) => user.id == id);

//   if (user) {
//     users = users.filter((user) => user.id != id);
//     res.status(200).send(`User ${id} has been deleted`);
//   } else {
//     res.status(400).send("No such user");
//   }
// });

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

// // Listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

// // Setup error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
