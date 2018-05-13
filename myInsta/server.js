const express = require('express');
const app = express();
const ig = require('instagram-node').instagram();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/',function(req, res){

    ig.user_self_media_recent(function(err,medias,pagination,remaining, limit){
        res.render('pages/index', {grams: medias});
    });
});

ig.use({
    access_token: '574588059.1677ed0.230a47291c30426da0107ef301c264f7',
});





app.listen(3000);

console.log('Server has started!')