const { mongoose } = require('./db');
const cors = require('cors');
const express = require('express');

// app
const app = express();

// middlewares
app.use(cors({ origin: 'http://localhost:4200' })); // angular server
app.use(express.json({limit:'20mb'}));

//routes
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/comments', require('./routes/comment.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/emails', require('./routes/email.routes'));
//config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
app.set('port', process.env.PORT || 3000);

//listen
app.listen(app.get('port'), () => {
    console.log('Server is running on port 3000');
})