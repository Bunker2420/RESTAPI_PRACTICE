const express = require('express');
const app = new express();
const path = require('path');
const AppError = require('./error.js');
const { escape } = require('querystring');

let posts = [{user : "apnacollege",content: "I am student of Shraddha Khapra"},
             {user : "ruthwick", content: "JavaScript is easy to learn compared to backend"}
];
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');

const wrapAsync = (func) => {
    return function (req, res, next) {
        func(req, res, next).catch(next);
    };
};


app.get('/nposts',(req,res)=>{
    res.render('addpost.ejs')
})
app.post('/nposts',wrapAsync(async(req,res,next)=>{
        let user = req.body.username;
        let content = req.body.content;
        if(user.length >= 6)
        {
            posts.push({user,content});
            res.render('submit.ejs',{user , content});
        }
        else
        {
           return next(new AppError(404,"Username must be greater than 6 character"));
        }
    }
));
app.get('/posts',(req,res)=>{
    res.render('main.ejs',{posts});
});

app.get('/view',(req,res)=>{
    const index = req.query.index;
    const post = posts[index];
    res.render('viewfull',{post});
})

app.get('/edit',(req,res)=>{
    const index = req.query.index;
    const post = posts[index];
    res.render('editpost',{post,index})
})
app.post('/edit',wrapAsync((req,res,next)=>{
    const index = req.body.index;
    user = req.body.username;
    content = req.body.content;
    if(content.length > 10)
    {
        posts[index] = {
            user: user,
            content:content
        }
        res.redirect('/posts');
    }
    else
    {
         return next(new AppError(404,"Content is too less to update"))
    }
}));

app.post('/delete', (req, res) => {
    const index = req.body.index;
    posts.splice(index, 1); 
    res.redirect('/posts');
});

app.use((err,req,res,next)=>{
    let {status = 500 , message = "Error page not working"} = err;
    console.log(err);
    res.status(status).send(message);
});

app.listen('3000',()=>{
    console.log('server working on http://localhost:3000/posts');
});