const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())


const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const db = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'authentication',
  host: 'localhost'
})


app.get('/usertype', (req, res) => {
  const user = 'A03'
  db.query(`CALL authentication.userlogin('${user}')`, (err, result) => {
    if (err) {
      res.json('Error fetch data').send()
    } else {
      res.send(result[0])
    }
  })
})

app.post('/register', async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    if (password === '' || password === undefined) {
      return res.status(400).json('Check Your Password is Empty').send();
    }
    const hashpassword = await bcrypt.hash(password, 5);

    db.query(`INSERT INTO authentication.usermaster(userid, password) VALUES('${name}', '${hashpassword}')`, (error, response) => {
      if (error) {
        res.json("Query is Error").send();
      } else {
        res.status(200).json('Data Insert Success ').send();
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/login', async (req, res) => {
  try {
    const userid = req.body.name;
    const password = req.body.password;

    console.log(userid, password);

    const result = await new Promise((resolve, reject) => {
      db.query(`CALL authentication.userlogin('${userid}')`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
          console.log(result[0]);
        }
      });
    });

    // Assuming the stored procedure returns multiple result sets, handle them appropriately
    const userData = result[0]; // Adjust the index based on the actual result set index

    if (!userData || userData.length === 0) {
      return res.status(400).json('No user found').send();
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (isPasswordMatch) {
      const usertoken = await jwt.sign({ role: userData.role }, 'Key');
      console.log(usertoken);
      return res.status(200).header('auth', usertoken).json({
        token: usertoken,
        role: userData.role,
        username: userData.username,
        dashboard: userData.dashboard,
        usermaster_main: userData.usermaster_main,
        usertype_sub: userData.usertype_sub,
        userregister_sub: userData.userregister_sub,
        contact: userData.contact
      }).send();
    } else {
      return res.status(400).json('Incorrect Password').send();
    }

  } catch (err) {
    console.error(err);
    res.json(err);
  }
});



const validUser = (req, res, next) => {
  var token = req.header('auth')
  req.token = token
  next()
}

app.get('/getalldata', validUser, async (req, res) => {
  jwt.verify(req.token, 'Key', async (err, result) => {
    if (err) {
      res.json('error fect data')
    } else {
      db.query('select * from authentication.usermaster', (error, resultdata) => {
        if (err) {
          res.json('error fect data')
        } else {
          res.send(resultdata)
        }
      })
    }
  })

})


app.post('/roleinsert', validUser, async (req, res) => {
  const value = req.body.roleisert
  const status = 'i'
  jwt.verify(req.token, 'Key', async (err, result) => {
    if (err) {
      res.json('error toke')
    } else {
      db.query(`INSERT INTO authentication.pageaccess (dashboard, usermaster_main, usertype_sub, userregister_sub, contact, role) 
      VALUES ('${status}', '${status}', '${status}', '${status}', '${status}', '${value}')`, (err, resultdata) => {
        if (err) {
          console.log(err);
        } else {
          res.send(resultdata);
        }
      })
    }
  })
})


app.get('/getroledata', validUser, async (req, res) => {
  jwt.verify(req.token, 'Key', async (err, result) => {
    if (err) {
      res.json("error requesting data"); // Fix typo here
    } else {
      db.query('SELECT * FROM authentication.pageaccess', (error, resultdata) => {
        if (error) {
          res.json('error fetching data'); // Fix typo here
        } else {
          res.send(resultdata); // Removed the extra send() here
        }
      });
    }
  });
});

app.get('/useraccesspage', (req, res) => {
  const role = req.query.role
  console.log(role);
  db.query(`SELECT * FROM authentication.pageaccess where role = '${role}'`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  })
})

app.put('/saveaccesspage', (req, res) => {
  const data = req.body.pagedata;
  console.log(data);
  Object.values(data).forEach((item) => {
    const {
      dashboard,
      usermaster_main,
      usertype_sub,
      userregister_sub,
      contact,
      pageid
    } = item;

    db.query(
      `UPDATE authentication.pageaccess SET dashboard = '${dashboard}', usermaster_main = '${usermaster_main}', usertype_sub = '${usertype_sub}', userregister_sub = '${userregister_sub}', contact = '${contact}' WHERE pageid = ${pageid}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
  });

  res.send('Updates in progress');
});

app.delete('/deletepageaccess', (req, res) => {
  const id = req.query.id
  db.query(`Delete FROM authentication.pageaccess WHERE pageid =${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json('Deleted user Successfuly').send()
    }
  })
})


app.post('/userregister', async (req, res) => {
  const name = req.body.name
  const password = req.body.password
  const userid = req.body.userid
  const role = req.body.role

  const hashpassword = await bcrypt.hash(password, 5);

  db.query(`insert into authentication.usermaster(username,userid,password,role) values('${name}','${userid}','${hashpassword}','${role}')`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json('Succesfully Registerd').send()
    }
  })


})

app.listen(3003, () => {
  console.log("Connection Success 3003");
})