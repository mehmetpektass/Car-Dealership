const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");



const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

const db = new sqlite3.Database("./CarDealerShip.db");

function handleServerError(res, err) {
  console.error(err);
  res.status(500).send('Internal Server Error!');
}

app.get("/",  function(req,res){
  try {
    db.all('SELECT * FROM Blogs LIMIT 3', (err, blogs) => {
      if (err) {
        handleServerError(res, err);
        return;
      }

      db.all('SELECT * FROM Testimonials LIMIT 2', (err, testimonials) => {
        if (err) {
         handleServerError(res, err);
          return;
        }

        db.all('SELECT * FROM About ', (err, abouts) => {
          if (err) {
            handleServerError(res, err);
            return;
          }

          db.all('SELECT   Cars.*, carImages.firstPicture FROM Cars JOIN carImages ON Cars.id = CarImages.CarID LIMIT 6',(err,cars)=>{
            if (err) {
             handleServerError(res, err);
             return;
            }
         
        res.render('index', { blogs, testimonials, abouts, cars});
           });
        });
      });
    });
  } catch (error) {
    handleServerError(res, err);
  }
})



app.get("/cars", (req, res) => {
  db.all('SELECT   Cars.*, carImages.firstPicture FROM Cars JOIN carImages ON Cars.id = CarImages.CarID',(err,cars)=>{
   if (err) {
    handleServerError(res, err);
    return;
   }
    res.render('cars', {cars})
    
 })
});


app.get("/about",function(req,res){
  db.all('SELECT * FROM About', (err, rows) => {
    if (err) {
     handleServerError(res, err);
    } else {
      res.render('about', { abouts: rows });
    }
  });
})

app.get('/blog', (req, res) => {
  db.all('SELECT * FROM Blogs', (err, rows) => {
    if (err) {
     handleServerError(res, err);
    } else {
      res.render('blog', { blogs: rows });
    }
  });
})

app.get('/contact',function(req,res){
  db.all('SELECT * FROM Contact',(err,rows)=>{
    if(err){
      handleServerError(res, err);
    }else{
      res.render('contact',{contacts:rows});
    }

  })
})

app.get("/team",function(req,res){
 db.all('SELECT * FROM Team',(err,rows)=>{
  if(err){
    handleServerError(res,err);
  }else{
    res.render('team',{teams:rows});
  }
 })
})

app.get("/faq",function(req,res){
  db.all('SELECT * FROM Faq',(err,rows)=>{
    if(err){
      handleServerError(res,err);
    }else{
      res.render('faq',{faqs:rows});
    }
  })
})

app.get("/terms",function(req,res){
  db.all('SELECT * FROM Terms',(err,rows)=>{
    if(err){
      handleServerError(res,err);
    }else{
      res.render('terms',{terms:rows});
    }
  })
})

app.get('/blog-details', (req, res) => {
  const blogId = req.query.id;

  db.get('SELECT * FROM Blogs WHERE id = ?', [blogId], (err, row) => {
    if (err) {
      handleServerError(res, err);
    } else {
      res.render('blog-details', { blog: row });
    }
  });
});


app.get("/testimonials",function(req,res){
  db.all('SELECT * FROM Testimonials', (err, rows) => {
    if (err) {
      handleServerError(res, err);
    } else {
      res.render('testimonials', { testimonials:rows });
    }
  });
})


app.get("/car-details",function(req,res){
  const carId = req.query.id ;

  db.get('SELECT Cars.*, carImages.firstPicture, carImages.secondPicture, carImages.thirdPicture FROM Cars JOIN carImages ON Cars.id = CarImages.CarID WHERE Cars.id = ?' , [carId] , (err , cars) => {
    if(err){
      handleServerError(res , err);
      return;
    }
    db.get("SELECT * FROM Contact", (err,contacts)=>{
      if(err){
        handleServerError(res, err);
        return;
      }
      res.render('car-details', {cars, contacts});
    })
  })
})



app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});

