const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, "kitten_game.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server Running at http://localhost:${port}/`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.post('/register', async (req, res) => {
    const { username } = req.body;
      const existingUser = await db.get(`SELECT * FROM user_details WHERE username = '${username}'`);
      if (existingUser) {
        res.status(409)
        res.send({ message: 'Username already exists. Try another name' })
      }else{
        await db.run(`INSERT INTO user_details (username,played,wins) VALUES ('${username}',${0},${0})`);
        res.send({message: 'User created successfully'})
      }
  });

  app.post('/users',async (req, res) => {
    const { username } = req.body;
      const existingUser = await db.get(`SELECT * FROM user_details WHERE username = '${username}'`);
      if (existingUser) {
        res.send({ message: 'User Found' })
      }else{
        res.status(400)
        res.send({message: 'Username Not Found. If you are new to game select Yes from dropdown'})
      }
  });

  app.get('/details',async (req,res)=>{
    const {name} = req.query
    const query = `SELECT * FROM user_details WHERE username = '${name}'`
    const result = await db.get(query)
    res.send(result)
  })

  app.put('/update', async (req,res)=>{
    const {username,played,wins} = req.body
    const query = `
    UPDATE user_details SET played=${played},wins=${wins}
    where username = '${username}'
    `
    await db.run(query)
    res.send("db updated successfully")
  })

  app.get('/leardboard', async (req,res)=>{
    const query = `SELECT * FROM user_details ORDER BY wins DESC, played DESC`
    const result = await db.all(query);
    res.send(result)
  });


  app.get('/get',async (req, res) => {
      const existingUser = await db.all(`SELECT * FROM user_details`);
      res.send(existingUser); 
  });
