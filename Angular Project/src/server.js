var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'); 
    


app.use(express.static('dist'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/angular2Test');

// Middleware for CORS
app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}));

// register schema
var userSchema = new Schema({
    username: {type:String, required:true },
    email: {type:String, required:true },
    password: {type:String, required:true }
   });

var user = mongoose.model('users', userSchema);


// register
app.post('/register', function (req, res) {
    console.log("register",req.body);
        let user1 = new user({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        user1.save((err, resp) => {
            console.log("hey!! inside save");
            if(err) {
                console.log("error",err);
                res.send({sucess: false, message: 'could not save user!', err});
            } else {
                console.log("response: ", resp);
                res.send({sucess: true, message: 'User saved!'});
            }
        });
    }   
);

// login 
app.post('/authenticate', function (req, res) {
    console.log("auth ", req.body);
    if (req.body.email && req.body.password) {
        var query = user.findOne({  
                                    'email':req.body.email,
                                    'password':req.body.password });
        query.exec((err, result) => {
            if(result !== null) {
                console.log('User record found', result);
                var token = jwt.sign({
                    email: req.body.email
                },  
                'project-secret-key', //secret key for encryption
                { expiresIn: '1h' }
            );
            res.send({ 
                isLoggedIn: true, 
                msg: 'Login success!', 
                token: token,
                userInfo: result._id,
                name: result.username
            });
        }   else {
            console.log('No record exists!');
                res.send({
                    isLoggedIn: false,  
                    msg: 'No record found!!!'
                });
            }
    });
    }   else {
    console.log('No email and password received');
        res.send ({
            isLoggedIn: false,  
            msg: 'Login failed'
        });
}
});

app.use(function(req,res,next) {
    // console.log('check cookie in header set or not', req.headers.token);
    console.log("token ",req.body.token);
    var token = req.body.token || req.query.token || req.headers.token;
    if(token ){
        jwt.verify(token, 'project-secret-key', function(err,decoded) {
            if(!err){
                // console.log('Hey checking!!',decoded);
                req.decoded=decoded;
                next();//point next task here it is 
            } else {
                console.log('error in cookie ',err);
                res.send({
                    msg:'No cookie found',
                    isLoggedIn:false
                });
            }
        });
    } else {
        res.send({
            msg:'Invalid Request No cookie found',
            isLoggedIn:false
        });
    }
});



// new post schema
var postSchema = new Schema({
    user_id: {type:String, required:true},
    username: {type:String, required:true },
    title: {type:String, required:true},
    description: {type:String, required:true}
});

var post = mongoose.model('posts', postSchema);

app.post('/createPost', function (req, res) {
    console.log(req.body);
        let post1 = new post({
            user_id: req.body.user_id,
            username:req.body.username,
            title: req.body.title,
            description: req.body.description
        });
        post1.save((err, resp) => {
            console.log('Response:', resp);
            if(err) {
                console.log("error",err);
                res.send({sucess: false, message: 'could not save post!', err});
            } else {
                console.log("Response: ", resp);
                res.send({sucess: true, message: 'Post saved!'});
            }
        });
    }); 


// to list all posts
app.get('/listPosts', function(req, res) {
    var query = post.find();
    query.exec((err, result) => {
        if(result != null) {
        console.log('Posts found');
        console.log(result);
            res.send(result);
        } else {
            res.send('Record not found!!!');
        console.log('No Posts');
        }                           
    }); 
});

app.post('/editPost', function(req, res) {
    console.log("Editdata", req.body);
    post.findByIdAndUpdate({'_id': req.body._id}, {'title': req.body.title, 'description': req.body.description}, (err, result) => {
        console.log("err", err); 
        if(true) { 
            console.log('updated!');
            res.send(result);
        } else {
            res.send({msg: 'Failed attempt'});
            console.log('Failed attempt!');
        }
    });
   
});

app.post('/deletePosts', function(req, res) {
    console.log("delete post", req.body);
    post.remove({'_id': req.body.post_id}, (err) => {
        console.log("err", err);
        if(true) {
            console.log('Post deleted!');
            res.send({msg: 'Post deleted'});
        } else {
            res.send({msg: 'Failed attempt'});
            console.log('Failed attempt!');
        }
    });
});


var commentsSchema = new Schema({
    cmt_post_id: {type:String, required:true },
    cmt_user_id: {type:String, required:true },
    cmt_comment: {type:String, required:true }
});

var comments = mongoose.model('comments', commentsSchema);

app.post('/addComment', function (req, res) { 
    console.log(req.body);
    let comment1 = new comments({
            cmt_post_id:req.body.post_id,
            cmt_user_id: req.body.user_id,
            cmt_comment: req.body.commentbody    
    });
    comment1.save((err, resp) => {
        if(err) {
            console.log("Error",err);
            res.send({sucess: false, message: 'could not save comment!'});
        } else {
            console.log("Response: ", resp);
            res.send({sucess: true, message: 'Comment saved!'});
        }
    });
});


app.post('/listComments', function(req, res) {
    var query = comments.find({
        'cmt_post_id': req.body.post_id
    });
    query.exec((err, result) => {
        if(result != null) {            
            console.log('Comment found: ', result);
             res.send(result);
            } else {
                res.send('Record not found!!!');
                console.log('No Comments to show'); 
            }                           
    }); 
});

app.post('/deleteComments', function(req, res) {
    comments.remove({'_id': req.body.comment_id}, (err) => {
        if(true) {
            console.log('Comment deleted!');
            res.send({msg: 'Comment deleted'});
        } else {
            res.send({msg: 'Failed attempt'});
            console.log('Failed attempt!');
        }
    });
});
    
var likeSchema = new Schema({
    like_post_id: {type:String, required:true },
    like_user_id: {type:String, required:true },
    like_username: {type:String, required:true }
});
var like = mongoose.model('likes', likeSchema);



app.post('/likes', function(req, res) {
    console.log("likes",req.body);
    like.find({'like_user_id': req.body.user_id, 'like_post_id': req.body.post_id}).then((docs,err)=>{
        if(docs.length==0){
            let like1 = new like({
                like_post_id:req.body.post_id, 
                like_user_id: req.body.user_id,  
                like_username: req.body.username
            });    
            like1.save((err, resp) => {
            if(err) {
                console.log("Error to like: ",err);
                res.send({sucess: false, message: 'could not like !!!'});
            } else {
                console.log("Successfully liked: ", resp);
                res.send({sucess: true, message: 'Like done !'});
            }
        })
    }else{
         console.log(err);   
    }
    
});
});


app.post('/listLikes', function(req, res) {
    console.log("likelist",req.body);
    var query = like.find({'post_id': req.body.postId });
    query.exec((err, result) => { 
        if(result != null) {
        console.log('LikeList', result); 
            res.send(result);
        } else {
            res.send('No List of likes!!!');
        console.log('No List');
        }                           
    }); 
});





app.listen(3000, function () {
    console.log('Server running @ localhost:3000');
});
