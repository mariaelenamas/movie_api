const express = require("express");
(morgan = require("morgan")),
  (fs = require("fs")),
  (path = require("path")),
  (bodyParser = require("body-parser")),
  (uuid = require("uuid"));

const app = express();

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Kim",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "Joe",
    favoriteMovies: ["Maleficent"],
  },
  {
    id: 3,
    name: "James",
    favoriteMovies: ["Harry Potter and the Philosopher's Stone"],
  },
];

let movies = 

[
  {
    Title: "Harry Potter and the Philosopher's Stone",
    Year: "2001",
    Genre: 
      [
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
        {
          Name: "Adventure",
          Description: "Adventure movies contain many of the same features of action movies, but are usually set in exotic locations. The main theme is adventure, with the characters often exploring places they have not been before or doing things they have not done before. (Source: Wikipedia)"
        }
      ],
    Directors: 
      [
        { Name: "Chris Columbus",
          Birth: "1958",
          Death: "-",
          Bio: "Chris Joseph Columbus is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking. (Source: Wikipedia)"
        },
      ],
  },
  {
    Title: "Maleficent",
    Year: "2014",
    Genre: 
      [
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
        {
          Name: "Adventure",
          Description: "Adventure movies contain many of the same features of action movies, but are usually set in exotic locations. The main theme is adventure, with the characters often exploring places they have not been before or doing things they have not done before. (Source: Wikipedia)"
        }
      ],
    Directors: 
      [
        { Name: "Robert Stromberg", 
          Birth: "1965",
          Death: "-",
          Bio: "Robert Stromberg is an American special effects artist, designer and filmmaker. Stromberg's credits include films such as James Cameron's Avatar, Tim Burton's Alice in Wonderland, and Sam Raimi's Oz the Great and Powerful. (Source: Wikipedia)"
        },
      ],
  },
  {
    Title: "Bridget Jones's Baby",
    Year: "2016",
    Genre:
      [
        {
          Name: "Comedy",
          Description: "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter. (Source: Wikipedia)",
        },
        {
          Name: "Romance",
          Description: "Romance film can be defined as a genre wherein the plot revolves around the love between two protagonists. This genre usually has a theme that explores an issue within love, including but not limited to: love at first sight, forbidden love, love triangles, and sacrificial love. (Source: thescriptlab.com)"
        }
      ],
    Directors: 
      [
        { Name: "Sharon Maguire",
          Birth: "1960",
          Death: "-",
          Bio: "Sharon Maguire is a film director best known for directing Bridget Jones's Diary. The film was based on the book by her close friend Helen Fielding, and one of the main characters, Shazza, is allegedly based on Maguire. (Source: Wikipedia)"
        },
      ],
  },
  {
    Title: "Fantastic Beasts: The Crimes of Grindelwald",
    Year: "2018",
    Genre: 
      [
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
        {
          Name: "Adventure",
          Description: "Adventure movies contain many of the same features of action movies, but are usually set in exotic locations. The main theme is adventure, with the characters often exploring places they have not been before or doing things they have not done before. (Source: Wikipedia)"
        }
      ],
    Directors: 
      [
        { Name: "David Yates", 
          Birth: "1963",
          Death: "-",
          Bio: "David Yates is an English film director, producer and screenwriter, who has directed feature films, short films, and television productions. He is best known for directing the final four films in the Harry Potter series and the three films of its prequel series, Fantastic Beasts. (Source: Wikipedia)"
        },
      ], 
  },
  {
    Title: "Casper",
    Year: "1995",
    Genre: 
      {
        Name: "Fantasy",
        Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
      },
    Directors: 
      [
        { Name: "Brad Silberling",
          Birth: "1963",
          Death: "-",
          Bio: "Bradley Mitchell Silberling is an American television and film director whose credits include the feature films Casper, City of Angels, Moonlight Mile, Lemony Snicket's A Series of Unfortunate Events and Land of the Lost. (Source: Wikipedia)"
        },
      ],
  },
  {
    Title: "Jumanji",
    Year: "1995",
    Genre: 
      [
        {
          Name: "Fantasy",
          Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
        },
        {
          Name: "Adventure",
          Description: "Adventure movies contain many of the same features of action movies, but are usually set in exotic locations. The main theme is adventure, with the characters often exploring places they have not been before or doing things they have not done before. (Source: Wikipedia)"
        }
      ],
    Directors: 
      [
        { Name: "Joe Johnston",
          Birth: "1950",
          Death: "-",
          Bio: "Joe Johnston is an American film director, producer, writer, and visual effects artist. He is best known for directing effects-driven films, including Honey, I Shrunk the Kids; The Rocketeer; Jumanji; Jurassic Park III; The Wolfman; and Captain America: The First Avenger. (Source: Wikipedia)"
        },
      ],
  },
  {
    Title: "Star Wars: Episode II - Attack of the Clones",
    Year: "2002",
    Genre: 
      {
        Name: "Sci-Fi",
        Description: "A form of fiction that deals principally with the impact of actual or imagined science upon society or individuals. (Source: britannica.com",
      },
    Directors: 
      [
        { Name: "George Lucas",
          Birth: "1944",
          Death: "-",
          Bio: "George Walton Lucas Jr. is an American filmmaker. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts, Industrial Light & Magic and THX. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012. (Source: Wikipedia)"
        },
      ]
  },
  {
    Title: "Pride and prejudice",
    Year: "2005",
    Genre: 
      {
        Name: "Romance",
        Description: "Romance film can be defined as a genre wherein the plot revolves around the love between two protagonists. This genre usually has a theme that explores an issue within love, including but not limited to: love at first sight, forbidden love, love triangles, and sacrificial love. (Source: thescriptlab.com)"
      },
    Directors: { Name: "Joe Wright" },
  },
  {
    Title: "The mask",
    Year: "1994",
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
    Directors: 
      [
        { Name: "Chuck Russell",
          Birth: "1958",
          Death: "-",
          Bio: "Charles Russell is an American filmmaker and actor known for his work on several genre films. Some of Russell's best known films include the slasher fantasy film A Nightmare on Elm Street 3: Dream Warriors, the 1988 remake[1] of the 1958 monster horror film The Blob, the fantasy superhero comedy film The Mask, the action film Eraser, and the action-adventure The Scorpion King. (Source: Wikipedia)"
        },
      ]
   
  },
  {
    Title: "Edward Scissorhands",
    Year: "1990",
    Genre: 
      {
        Name: "Fantasy",
        Description: "Fantasy is a genre that features magical and supernatural elements that do not exist in the real world. (Source: bookriot.com)",
      },
    Directors: 
      [
        { Name: "Tim Burton",
          Birth: "1958",
          Death: "-",
          Bio: "Timothy Walter Burton is an American filmmaker, animator, and artist. He is known for his gothic fantasy and horror films such as Beetlejuice, Edward Scissorhands, The Nightmare Before Christmas, and Dark Shadows, as well as the television series Wednesday (2022). (Source: Wikipedia)"
        },
      ]
  },
];

// READ "Welcome" - GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie App!");
});

// CREATE Allow new users to register
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("No such user. Users need names");
  }
});

// CREATE Allow users to add a movie to their list of favorites
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s favorite movies list`);
  } else {
    res.status(400).send("No such user");
  }
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

// UPDATE Allow users to update their user info (username)
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user");
  }
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
app.delete("/users/:id", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`User ${id} has been deleted`);
  } else {
    res.status(400).send("No such user");
  }
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
