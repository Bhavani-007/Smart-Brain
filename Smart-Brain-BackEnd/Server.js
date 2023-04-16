import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors'; 
import knex from 'knex';
import { handleSignIn } from './controllers/sign_in.js';
import { handleProfile } from './controllers/profile.js';
import { handleRegister } from './controllers/register.js';
import { handleImage } from './controllers/image.js';
import { handleApiOutput } from './controllers/api_output.js';

const knexjs = knex;
const db = knexjs({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //localhost
      port : 5432,
      user : 'postgres',
      password : '',
      database : 'postgres'
    }
});

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req,res) => { res.json(db.users) })

app.post('/signin', (req, res) => {handleSignIn(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfile(req, res)})

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/handleApiOutput', (req,res) => {handleApiOutput(req, res)})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
  }) 




