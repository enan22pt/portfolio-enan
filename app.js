const express = require("express"); // loads the express package
const session = require("express-session");
const { engine } = require("express-handlebars"); // loads handlebars for Express
const port = 8080; // defines the port
const app = express(); // creates the Express application
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); //loads bcrypt
const connectSqlite3 = require("connect-sqlite3");
const SQLiteStore = connectSqlite3(session);
// const cookieParser = require ("cookie-parser");

// MODEL (DATA)
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("projects-en.db");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// creates user table at startup
db.run(
  "CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, hash TEXT NOT NULL, is_admin INTEGER NOT NULL)",
  (error) => {
    if (error) {
      console.error("ERROR: ", error);
    } else {
      console.log("---> Table users created!");
      const users = [
        {
          id: "1",
          username: "Admin",
          password: "TrueAdmin",
          hash: "TrueAdmin",
          is_admin: 1,
        },
        {
          id: "2",
          username: "OtherUser",
          password: "OtherUser1234",
          hash: "OtherUser1234",
          is_admin: 0,
        },
        {
          id: "3",
          username: "OtherUser1",
          password: "OtherUser2345",
          hash: "OtherUser2345",
          is_admin: 0,
        },
        {
          id: "4",
          username: "OtherUser2",
          password: "OtherUser3456",
          hash: "OtherUser3456",
          is_admin: 0,
        },
        {
          id: "5",
          username: "OtherUser3",
          password: "OtherUser4567",
          hash: "OtherUser4567",
          is_admin: 0,
        },
      ];
      users.forEach((user) => {
        const hash = bcrypt.hashSync(user.password, 10);

        db.run(
          "INSERT INTO users (id, username, password, hash, is_admin) VALUES (?, ?, ?, ?, ?)",
          [user.id, user.username, user.password, hash, user.is_admin],
          (error) => {
            if (error) {
              console.error("ERROR: ", error);
              // res.status(500).send({ error: "Server error" });
            } else {
              console.log("Line has been added into the users table!");
            }
          }
        );
      });
    }
  }
);

// // creates table projects at startup
db.run(
  "CREATE TABLE projects (pid INTEGER PRIMARY KEY, pname TEXT NOT NULL, pdesc TEXT NOT NULL, ptype TEXT NOT NULL, pimgURL TEXT NOT NULL)",
  (error) => {
    if (error) {
      // tests error: display error
      console.log("ERROR: ", error);
    } else {
      // tests error: no error, the table has been created
      console.log("---> Table school projects created!");
      const projects = [
        {
          id: "1",
          name: "Soundscape",
          type: "University assignment",
          desc: "A small part of my work from the magazine.",
          url: "/img/alt-magazine.png",
        },
        {
          id: "2",
          name: "Lunar Lander",
          type: "University assignment",
          desc: "Small game I created.",
          url: "/img/lunar-lander.png",
        },
        {
          id: "3",
          name: "Me in p5",
          type: "University assignment",
          desc: "Selfie created using p5.",
          url: "/img/selfie.png",
        },
        {
          id: "4",
          name: "Serotonin Simulator",
          type: "University assignment",
          desc: " A more advanced game created with Linnea.",
          url: "/img/serotonin.png",
        },
        {
          id: "5",
          name: "To Do List",
          type: "University assignment",
          desc: " Cat themed to-do list.",
          url: "/img/to-do-list.png",
        },
      ];
      // inserts projects
      projects.forEach((oneProject) => {
        db.run(
          "INSERT INTO projects (pid, pname, pdesc, ptype, pimgURL) VALUES (?, ?, ?, ?, ?)",
          [
            oneProject.id,
            oneProject.name,
            oneProject.desc,
            oneProject.type,
            oneProject.url,
          ],
          (error) => {
            if (error) {
              console.log("ERROR: ", error);
            } else {
              console.log(
                "Line has been added into the school projects table!"
              );
            }
          }
        );
      });
    }
  }
);

// creates table drawings at startup
db.run(
  "CREATE TABLE hobbies (hid INTEGER PRIMARY KEY, hname TEXT NOT NULL, hdesc TEXT NOT NULL, htype TEXT NOT NULL, himgURL TEXT NOT NULL)",
  (error) => {
    if (error) {
      // tests error: display error
      console.log("ERROR: ", error);
    } else {
      // tests error: no error, the table has been created
      console.log("---> Table hobbies created!");
      const hobbies = [
        {
          id: "1",
          name: "Devilman Crybaby",
          desc: "My favourite drawing based on the anime Devilman Crybaby.",
          type: "Drawing made by me",
          url: "/img/devilman.jpeg",
        },
        {
          id: "2",
          name: "Mystery Girl",
          desc: "My first drawing in this style.",
          type: "Drawing made by me",
          url: "/img/inspo.jpeg",
        },
        {
          id: "3",
          name: "Original Character",
          desc: "My originally made character.",
          type: "Drawing made by me",
          url: "/img/og.jpeg",
        },
        {
          id: "4",
          name: "Tomie",
          desc: "Fanart based on the manga Tomie.",
          type: "Drawing made by me",
          url: "/img/tomie.jpeg",
        },
        {
          id: "5",
          name: "Uzumaki",
          desc: "Favourite panels from the manga Uzumaki.",
          type: "Drawing made by me",
          url: "/img/uzumaki.jpeg",
        },
      ];
      // inserts drawings
      hobbies.forEach((oneHobby) => {
        db.run(
          "INSERT INTO hobbies (hid, hname, hdesc, htype, himgURL) VALUES (?, ?, ?, ?, ?)",
          [
            oneHobby.id,
            oneHobby.name,
            oneHobby.desc,
            oneHobby.type,
            oneHobby.url,
          ],
          (error) => {
            if (error) {
              console.log("ERROR: ", error);
            } else {
              console.log("Line has been added into the hobbies table!");
            }
          }
        );
      });
    }
  }
);

// defines handlebars engine
app.engine("handlebars", engine());
// defines the view engine to be handlebars
app.set("view engine", "handlebars");
// defines the views directory
app.set("views", "./views");

// define static directory "public" to access css/ and img/
app.use(express.static("public"));

//...
// POST FORMS
//...


// Add the express-session middleware
app.use(
  session({
    store: new SQLiteStore({ db: "session-db.db" }),
    secret: "mamaligacucarnatisicucastravetimurati", // Replace with your secret key
    resave: false,
    saveUninitialized: true,
  })
);
// CONTROLLER (THE BOSS)

// defines route "/"
app.get("/login", function (request, response) {
  const model = {};
  response.render("login.handlebars", model);
});
app.post("/login", (req, res) => {
  // Get username and password from request body
  const username = req.body.username;
  const password = req.body.password;

  console.log("LOGIN: ", username);
  console.log("PASSWORD: ", password);

  // Requires bcrypt to be installed
  // const hash = bcrypt.hashSync(password, 10);

  // Requires a sqlite3 database
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      res.status(500).send({ error: "Server error" });
    } else if (!user) {
      res.status(401).send({ error: "User not found" });
    } else {
      console.log("Stored username:", user.username);
      console.log("Stored hashed password:", user.hash);
      const result = bcrypt.compareSync(password, user.hash);
      if (result) {
        req.session.user = user;
        res.redirect("/home");
      } else {
        res.status(401).send({ error: "Wrong password or username" });
      }
    }
  });
});
app.get("/home", function (request, response) {
  response.render("home.handlebars");
});
app.get("/about", function (request, response) {
  response.render("about.handlebars");
});
app.get("/hobby", function (request, response) {
  response.render("hobby.handlebars");
});
app.get("/project", function (request, response) {
  response.render("project.handlebars");
});
app.get("/contact", function (request, response) {
  response.render("contact.handlebars");
});

// defines route "/projects"
app.get("/projects", function (request, response) {
  db.all("SELECT * FROM projects", function (error, theProjects) {
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: error,
        projects: [],
      };
      //will render the page with the model
      response.render("project.handlebars", model);
    } else {
      console.log("Projects data:", theProjects);
      const model = {
        hasDatabaseError: false,
        theError: "",
        projects: theProjects,
      };
      //will render the page with the model
      response.render("project.handlebars", model);
    }
  });
});

// defines route "/hobbies"
app.get("/hobbies", function (request, response) {
  db.all("SELECT * FROM hobbies", function (error, theHobbies) {
    if (error) {
      console.error("Database error:", error);
      const model = {
        hasDatabaseError: true,
        theError: error,
        hobbies: [],
      };
      //will render the page with the model
      response.render("hobby.handlebars", model);
    } else {
      console.log("Hobbies data:", theHobbies);
      const model = {
        hasDatabaseError: false,
        theError: "",
        hobbies: theHobbies,
      };
      //will render the page with the model
      response.render("hobby.handlebars", model);
    }
  });
});

app.use(function (req, res) {
  res.status(404).render("404.handlebars");
});

// runs the app and listens to the port
app.listen(port, () => {
  console.log(`Server running and listening on port ${port}...`);
});
