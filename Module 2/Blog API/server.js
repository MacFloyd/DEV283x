const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');

const app = express();
const port = process.env.port || 3000;

const posts = require('./routes/posts.js');
const comments = require('./routes/comments.js');

let store = {
  posts: [
    {
      name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
        { text: 'Cruel…..var { house, mouse} = No type optimization at all' },
        { text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.' },
        { text: '(p1,p2)=>{ … } ,i understand this ,thank you !' }
      ]
    }
  ]
};


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorHandler());

app.use((req, res, next) => {
  req.store = store;
  next();
});

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/posts', posts.getPosts);
app.post('/posts', posts.addPost);
app.put('/posts/:id', posts.updatePost);
app.delete('/posts/:id', posts.removePost);

app.get('/posts/:id/comments', comments.getComments);
app.post('/posts/:id/comments', comments.addComment);
app.put('/posts/:id/comments/:commentId', comments.updateComment);
app.delete('/posts/:id/comments/:commentId', comments.removeComment);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
