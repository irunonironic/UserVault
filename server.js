const express = require('express');
const app = express();
const users = [];
const sessions = [];
app.use(express.json());
app.use(express.static('public'));

function authenticate(req,res,next){
    const authHeader = req.get('authorization');
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error: 'Invalid token format'});
    }
     const token = authHeader.split(' ')[1];
    const session = sessions.find(s=> s.token === token);
    if(!session){
        return res.status(401).json({error:'Invalid token'});
    }
    req.user = session.username;
    req.token = token;
    next();
}

app.get('/',(req,res)=>{
    res.json({msg: 'UserVault is up'});
});

app.post('/register',(req,res)=>{
    const {username , password} = req.body;
    if(!username || !password){
        return res.status(400).json({error: 'Missing Fileds'});
    }
    if(password.length < 4){
        return res.status(400).json({error:' Password too short'});
    }
    if(users.find(u => u.username === username)){
        return res.status(409).json({error: 'Username taken'});
    }
    users.push({username , password});
    res.status(201).json({username});
});

app.post('/login',(req,res)=>{

    const{username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({error:'Unauthorised'});
    }
    const user = users.find(u =>u.username === username && u.password === password);
    if(!user){
        return res.status(401).json({error: 'Invalid credentials'});
    }

    const token = Date.now().toString();
    sessions.push({token ,username});

    res.status(200).json({token});
});

app.get('/profile',authenticate,(req,res)=>{
    res.json({msg: `Welcome, ${req.user}`});
});

app.post('/logout',(req,res,authenticate)=>{
    const {token} = req;
    const index = sessions.findIndex(s => s.token === token);
    if(index !== -1){
        sessions.splice(index,1);
    }
    res.status(204).end();
});

app.listen(3000);