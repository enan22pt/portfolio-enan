// Required constants
const express = require("express"); // Loads the express package
const session = require("express-session"); // Loads the express-session package for managing sessions
const { engine } = require("express-handlebars"); // Loads Handlebars for Express
const port = 2911; // Defines the port number for the server
const app = express(); // Creates an instance of the Express application
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const bcrypt = require("bcrypt"); // Loads the bcrypt library for password hashing
const connectSqlite3 = require("connect-sqlite3"); // Connects SQLite database to store sessions
const SQLiteStore = connectSqlite3(session); // Creates an SQLite store for session data

// MODEL (DATA)
// Import the SQLite library and create a new SQLite database
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("projects-en.db");

// Middleware setup
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

// creates table skills at startup
db.run(
  "CREATE TABLE skills (sid INTEGER PRIMARY KEY, sname TEXT NOT NULL, sdesc TEXT NOT NULL)",
  (error) => {
    if (error) {
      // tests error: display error
      console.log("ERROR: ", error);
    } else {
      // tests error: no error, the table has been created
      console.log("---> Table skills created!");
      const skills = [
        {
          id: "1",
          name: "Adobe Creative Suite",
          desc: "Photoshop, Illustrator, InDesign",
        },
        {
          id: "2",
          name: "Markup language",
          desc: "HTML",
        },
        {
          id: "3",
          name: "Stylesheet language",
          desc: "CSS",
        },
        {
          id: "4",
          name: "Programming language.",
          desc: "JavaScript",
        },
        {
          id: "5",
          name: "Microsoft Office",
          desc: "Outlook, OneNote, Word, PowerPoint, Excel",
        },
      ];
      // inserts skills
      skills.forEach((oneSkill) => {
        db.run(
          "INSERT INTO skills (sid, sname, sdesc) VALUES (?, ?, ?)",
          [oneSkill.id, oneSkill.name, oneSkill.desc],
          (error) => {
            if (error) {
              console.log("ERROR: ", error);
            } else {
              console.log("Line has been added into the skills table!");
            }
          }
        );
      });
    }
  }
);

// creates table projects at startup
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
          desc: "My favourite drawing.",
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

// Define the Handlebars template engine
app.engine("handlebars", engine());

// Set the view engine to Handlebars
app.set("view engine", "handlebars");

// Define the views directory
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
    secret: "mamaligacucarnatisicucastravetimurati", // Secret key
    resave: false,
    saveUninitialized: true,
  })
);

// Route responsible for logging out the user
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out");
});

// Route to render the login form
app.get("/login", function (req, response) {
  const model = {
    isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin,
  };
  response.render("login.handlebars", model);
});

// Route to handle login form submission
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("LOGIN: ", username);

  // Check if the username exists in the SQLite database
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      // Handle server error
      res.status(500).send({ error: "Server error" });
    } else if (!user) {
      // Handle the case when the user is not found
      res.status(401).send({ error: "User not found" });
    } else {
      console.log("Stored username:", user.username);
      console.log("Stored hashed password:", user.hash);
      const result = bcrypt.compareSync(password, user.hash);
      if (result) {
        // If the password is correct, set user session data
        req.session.user = user;
        if (user.is_admin === 1) {
          req.session.isAdmin = true;
          req.session.isLoggedIn = true;
          req.session.name = "Admin";
          console.log("admin logged");
        } else {
          req.session.isAdmin = false;
          req.session.isLoggedIn = true;
          req.session.name = user.username;
          console.log("user logged");
        }
        // Redirect to the home page
        res.redirect("/home");
      } else {
        // Handle the case when the password is incorrect
        req.session.isAdmin = false;
        req.session.isLoggedIn = false;
        req.session.name = "";
        res.status(401).send({ error: "Wrong password or username" });
      }
    }
  });
});

// Handle the POST request to log the user out
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

//Define route for the home page
app.get("/home", function (req, response) {
  const model = {
    isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin,
  };
  response.render("home.handlebars", model);
});

//Define route for the contact page
app.get("/contact", function (req, response) {
  const model = {
    isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin,
  };
  response.render("contact.handlebars", model);
});

//Defines route "/about"
app.get("/about", function (req, response) {
  // Fetches all records from the "skills" table in the database
  db.all("SELECT * FROM skills", function (error, theSkills) {
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: error,
        skills: [],
      };
      // Renders the "about.handlebars" page with the error model
      response.render("about.handlebars", model);
    } else {
      console.log("Skills data:", theSkills);
      const model = {
        hasDatabaseError: false,
        theError: "",
        skills: theSkills,
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      // Renders the "about.handlebars" page with the populated model
      response.render("about.handlebars", model);
    }
  });
});

// Route to create a new project
app.get("/projects/new/", (req, res) => {
  if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
    const model = {
      isLoggedIn: req.session.isLoggedIn,
      name: req.session.name,
      isAdmin: req.session.isAdmin,
    };
    res.render("newproject.handlebars", model);
  } else {
    // If not logged in or not an admin, redirect to the login page
    res.redirect("/login");
  }
});

// Route to handle creating a new project
app.post("/projects/new/", (req, res) => {
  // Extract project information from the request body
  const newproj = [
    req.body.projname,
    req.body.projdesc,
    req.body.projtype,
    req.body.projimg,
  ];
  if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
    // Insert the new project data into the database
    db.run(
      "INSERT INTO projects (pname, pdesc, ptype, pimgURL) VALUES (?, ?, ?, ?)",
      newproj,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Line added into the projects table!");
        }
        res.redirect("/projects");
      }
    );
  } else {
    res.redirect("/login");
  }
});

// Handles the GET request to send the form for modifying a project.
app.get("/projects/update/:id", (req, res) => {
  const id = req.params.id;
  db.get(
    "SELECT * FROM projects WHERE pid=?",
    [id],
    function (error, theProject) {
      if (error) {
        console.log("ERROR: ", error);
        const model = {
          dbError: true,
          theError: error,
          project: {},
          isLoggedIn: req.session.isLoggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
        };
        res.render("modifyproject.handlebars", model);
      } else {
        const model = {
          dbError: false,
          theError: "",
          project: theProject,
          isLoggedIn: req.session.isLoggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
          helpers: {
            typeO(value) {
              return value == "other";
            },
            typeU(value) {
              return value == "university assignment";
            },
          },
        };
        res.render("modifyproject.handlebars", model);
      }
    }
  );
});

// Handles the POST request to modify an existing project.
app.post("/projects/update/:id", (req, res) => {
  const id = req.params.id;
  const mp = [
    req.body.projname,
    req.body.projdesc,
    req.body.projtype,
    req.body.projimg,
    id,
  ];
  if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
    db.run(
      "UPDATE projects SET pname=?, pdesc=?, ptype=?, pimgURL=? WHERE pid=?",
      mp,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("You modified the project");
        }
        res.redirect("/projects");
      }
    );
  } else {
    // Redirect to the login page if the user is not logged in as an admin.
    res.redirect("/login");
  }
});

// Route to display the list of projects
app.get("/projects", function (req, response) {
  // Query the database to retrieve all projects from the "projects" table
  db.all("SELECT * FROM projects", function (error, theProjects) {
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: error,
        projects: [],
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      // Render the "projects" page with the model, indicating an error
      response.render("project.handlebars", model);
    } else {
      // If the database query is successful, log the retrieved project data
      console.log("Projects data:", theProjects);
      const model = {
        hasDatabaseError: false,
        theError: "",
        projects: theProjects,
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      // Render the "projects" page with the model and the project data
      response.render("project.handlebars", model);
    }
  });
});

// Route to display detailed information about a specific project
app.get("/projects/:id", function (request, response) {
  const id = request.params.id;
  // Query the database to retrieve the project with the specified ID
  db.get(
    "SELECT * FROM projects WHERE pid = ?",
    [id],
    function (error, project) {
      if (!project) {
        // Send 404 if no project found
        return response.status(404).send("Project not found");
      }
      if (error) {
        const model = {
          hasDatabaseError: true,
          theError: "Project not found",
        };
        response.render("each-project.handlebars", model);
      } else {
        // If the database query is successful, create a model with project details
        const model = {
          hasDatabaseError: false,
          theError: "",
          pname: project.pname,
          pdesc: project.pdesc,
          ptype: project.ptype,
          pimgURL: project.pimgURL,
          isLoggedIn: request.session.isLoggedIn,
          name: request.session.name,
          isAdmin: request.session.isAdmin,
        };
        response.render("each-project.handlebars", model);
      }
    }
  );
});

// Route to delete a project by ID
app.get("/projects/delete/:id", (req, res) => {
  const id = req.params.id;
  if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
    db.run(
      "DELETE FROM projects WHERE pid=?",
      [id],
      function (error, theProjects) {
        if (error) {
          const model = {
            dbError: true,
            theError: error,
            isLoggedIn: req.session.isLoggedIn,
            name: req.session.name,
            isAdmin: req.session.isAdmin,
          };
          res.render("home.handlebars", model);
        } else {
          // If the project is deleted successfully,
          //create a model with no database error and no error message
          const model = {
            dbError: false,
            theError: "",
            isLoggedIn: req.session.isLoggedIn,
            name: req.session.name,
            isAdmin: req.session.isAdmin,
          };
          res.render("home.handlebars", model);
        }
      }
    );
  } else {
    res.redirect("/login");
  }
});

// Route to display the form for creating a new hobby
app.get("/hobbies/new/", (req, res) => {
  if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
    const model = {
      isLoggedIn: req.session.isLoggedIn,
      name: req.session.name,
      isAdmin: req.session.isAdmin,
    };
    res.render("newhobby.handlebars", model);
  } else {
    res.redirect("/login");
  }
});

// Route to handle the creation of a new hobby
app.post("/hobbies/new/", (req, res) => {
  const newhobby = [
    req.body.hobbyname,
    req.body.hobbydesc,
    req.body.hobbytype,
    req.body.hobbyimg,
  ];
  if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
    db.run(
      "INSERT INTO hobbies (hname, hdesc, htype, himgURL) VALUES (?, ?, ?, ?)",
      newhobby,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Line added into the hobbies table!");
        }
        res.redirect("/hobbies");
      }
    );
  } else {
    res.redirect("/login");
  }
});

// Handles the GET request to send the form for modifying a hobby.
app.get("/hobbies/update/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM hobbies WHERE hid=?", [id], function (error, theHobby) {
    if (error) {
      console.log("ERROR: ", error);
      const model = {
        dbError: true,
        theError: error,
        hobby: {},
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("modifyhobby.handlebars", model);
    } else {
      const model = {
        dbError: false,
        theError: "",
        hobby: theHobby,
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
        helpers: {
          typeOther(value) {
            return value == "other";
          },
          typeD(value) {
            return value == "drawing";
          },
        },
      };
      res.render("modifyhobby.handlebars", model);
    }
  });
});

// Handles the POST request to modify an existing hobby.
app.post("/hobbies/update/:id", (req, res) => {
  const id = req.params.id;
  const mh = [
    req.body.hobbyname,
    req.body.hobbydesc,
    req.body.hobbytype,
    req.body.hobbyimg,
    id,
  ];
  if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
    db.run(
      "UPDATE hobbies SET hname=?, hdesc=?, htype=?, himgURL=? WHERE hid=?",
      mh,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("You modified the hobby");
        }
        res.redirect("/hobbies");
      }
    );
  } else {
    // Redirect to the login page if the user is not logged in as an admin.
    res.redirect("/login");
  }
});

//Defines a route for "/hobbies"
app.get("/hobbies", function (req, response) {
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
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      //will render the page with the model
      response.render("hobby.handlebars", model);
    }
  });
});

// Define a route for "/hobbies/:id" to display details of a specific hobby
app.get("/hobbies/:id", function (request, response) {
  const id = request.params.id;
  // Query the database to retrieve the specific hobby with the given "id"
  db.get("SELECT * FROM hobbies WHERE hid = ?", [id], function (error, hobby) {
    if (!hobby) {
      // Send 404 if no hobby found
      return response.status(404).send("Hobby not found");
    }
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: "Hobby not found",
      };
      response.render("each-hobby.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        hname: hobby.hname,
        hdesc: hobby.hdesc,
        htype: hobby.htype,
        himgURL: hobby.himgURL,
        isLoggedIn: request.session.isLoggedIn,
        name: request.session.name,
        isAdmin: request.session.isAdmin,
      };
      response.render("each-hobby.handlebars", model);
    }
  });
});

// Define a route for deleting a hobby with a specific ID
app.get("/hobbies/delete/:id", (req, res) => {
  const id = req.params.id;
  if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
    // If the user is an admin, execute a database query to delete the hobby with the specified "id"
    db.run(
      "DELETE FROM hobbies WHERE hid=?",
      [id],
      function (error, theHobbies) {
        if (error) {
          const model = {
            dbError: true,
            theError: error,
            isLoggedIn: req.session.isLoggedIn,
            name: req.session.name,
            isAdmin: req.session.isAdmin,
          };
          res.render("home.handlebars", model);
        } else {
          const model = {
            dbError: false,
            theError: "",
            isLoggedIn: req.session.isLoggedIn,
            name: req.session.name,
            isAdmin: req.session.isAdmin,
          };
          res.render("home.handlebars", model);
        }
      }
    );
  } else {
    res.redirect("/login");
  }
});

// Define a catch-all middleware for handling 404 errors
app.use(function (req, res) {
  res.status(404).render("404.handlebars");
});

// runs the app and listens to the port
app.listen(port, () => {
  console.log(`Server running and listening on port ${port}...`);
});
