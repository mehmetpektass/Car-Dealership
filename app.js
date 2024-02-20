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
        
        
        res.render('index', { blogs, testimonials,abouts });
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


 db.all('SELECT  DISTINCT type FROM Cars',function(err,data){
   if (err) {
    handleServerError(res, err);
   return;
   }
    res.render('cars', {cars , type_data : data})
    
 })
})
});



app.get('/filter_data', function(req,res,next){
  var type = req.query.type;
  var parentElementQuery = req.query.parent_value;
  var childElementQuery = req.query.child_value;

  if(type == 'load_type'){
    if(childElementQuery == 'make')
      var query = `Select DISTINCT make AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'model')
      var query = `Select DISTINCT model AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'price')
      var query = `Select DISTINCT price AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'year')
      var query = `Select DISTINCT year AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'milage')
      var query = `Select DISTINCT milage AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'body')
      var query = `Select DISTINCT body AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'fuel')
      var query = `Select DISTINCT fuel AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'engineSize')
      var query = `Select DISTINCT engineSize AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'power')
      var query = `Select DISTINCT power AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'gearBox')
      var query = `Select DISTINCT gearBox AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'color')
      var query = `Select DISTINCT color AS Data FROM Cars where type= '${parentElementQuery}' ORDER BY make ASC`;
    
  }

  if(type == 'load_make'){
    if(childElementQuery == 'type')
      var query = `Select DISTINCT type AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'model')
      var query = `Select DISTINCT model AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'price')
      var query = `Select DISTINCT price AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'year')
      var query = `Select DISTINCT year AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'milage')
      var query = `Select DISTINCT milage AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'body')
      var query = `Select DISTINCT body AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'fuel')
      var query = `Select DISTINCT fuel AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'engineSize')
      var query = `Select DISTINCT engineSize AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'power')
      var query = `Select DISTINCT power AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'gearBox')
      var query = `Select DISTINCT gearBox AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    if(childElementQuery == 'color')
      var query = `Select DISTINCT color AS Data FROM Cars where make= '${parentElementQuery}' ORDER BY make ASC`;
    
  }

  if(type == 'load_model')
      var query = `Select DISTINCT '${childElementQuery}' AS Data FROM Cars where model= '${parentElementQuery}' ORDER BY make ASC`;
  if(type == 'load_price') 
    var query = `Select DISTINCT '${childElementQuery}' AS Data FROM Cars where price= '${parentElementQuery}' ORDER BY make ASC`;
  if(type == 'load_year')
    var query = `Select DISTINCT '${childElementQuery}' AS Data FROM Cars where year= '${parentElementQuery}' ORDER BY make ASC`;
  if(type == 'load_milage')
    var query = `Select DISTINCT '${childElementQuery}' AS Data FROM Cars where milage= '${parentElementQuery}' ORDER BY make ASC`;
  if(type == 'load_body')
    var query = `Select DISTINCT '${childElementQuery}' AS Data FROM Cars where body= '${parentElementQuery}' ORDER BY make ASC`;
  if(type == 'load_fuel')
    var query = `Select DISTINCT '${childElementQuery}' AS Data FROM Cars where fuel= '${parentElementQuery}' ORDER BY make ASC`;
  if(type == 'load_engineSize')
    var query = `Select DISTINCT '${childElementQuery}' AS Data FROM Cars where engineSize= '${parentElementQuery}' ORDER BY make ASC`;
  if(type == 'load_power')
    var query = `Select DISTINCT '${childElementQuery}' AS Data FROM Cars where power= '${parentElementQuery}' ORDER BY make ASC`;
  if(type == 'load_gearBox')
    var query = `Select DISTINCT '${childElementQuery}' AS Data FROM Cars where gearBox= '${parentElementQuery}' ORDER BY make ASC`;
  if(type == 'load_color')
    var query = `Select DISTINCT '${childElementQuery}' AS Data FROM Cars where color= '${parentElementQuery}' ORDER BY make ASC`;
      

  
});


















// app.get("/cars", (req, res) => {
//   const distinctParams = ['firstPicture', 'type', 'make', 'model', 'price', 'year', 'milage', 'body', 'fuel', 'engineSize', 'power', 'gearBox', 'color'];

//   const sqlParams = distinctParams.map((param, index) => `Cars.${param} = CarImages.${param}`).join(' AND ');

//   const sqlQuery = `SELECT * FROM Cars WHERE ID IN (SELECT CarID FROM carImages WHERE ${sqlParams})`;

//   db.all(sqlQuery, (err, rows) => {
//      if (err) {
//        handleServerError(res, err);
//      } else {
//        res.render('cars', { cars: rows });
//      }
//   });
// });







// app.get("/cars",(req,res)=>{
//   db.all('SELECT DISTINCT Cars.*, carImages.firstPicture, type, make, model, price, year, milage, body, fuel, engineSize, power, gearBox, color FROM Cars JOIN carImages ON Cars.ID = CarImages.CarID',(err, rows) => {
//     if (err) {
//      handleServerError(res, err);
//     } else {
//       res.render('cars', { cars: rows });
//     }
//   });
// })



















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
  res.render("car-details");
})



app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});


















// function fetchDropdownOptions(req, res, next) {
//   const dropdownTypes = ['type', 'make', 'model', 'price', 'year', 'milage', 'body', 'fuel', 'engineSize', 'power', 'gearBox', 'color'];
//   const dropdownOptions = {};

//   const selectedFilter = req.query.type; // Seçilen filtre tipini alın
//   const selectedValue = req.query.value; // Seçilen filtre değerini alın

//   dropdownTypes.forEach(type => {
//     // Sadece seçilen filtreye bağlı olarak diğer filtre seçeneklerini getirin
//     db.all(`SELECT DISTINCT "${type}" FROM Cars WHERE "${selectedFilter}" = ?`, [selectedValue], (err, options) => {
//       if (err) {
//         console.error(`${type} seçeneklerini getirirken hata oluştu:`, err);
//         return next(err);
//       }

//       if (!options) {
//         console.warn(`"${type}" için seçenek bulunamadı`);
//         options = [];
//       }

//       dropdownOptions[type] = options.map(option => option[type]);
//       if (Object.keys(dropdownOptions).length === dropdownTypes.length) {
//         res.locals.dropdownOptions = dropdownOptions;
//         next();
//       }
//     });
//   });
// }




// app.post("/cars", (req, res) => {
//   const filters = req.body; // Seçilen filtre değerlerini alın

//   let query = `SELECT Cars.*, carImages.firstPicture FROM Cars JOIN carImages ON Cars.id = CarImages.CarID WHERE`;
//   const conditions = [];

//   // Seçilen filtrelere göre sorguyu oluşturun
//   Object.entries(filters).forEach(([key, value]) => {
//     if (value) {
//       conditions.push(`${key} = ?`);
//     }
//   });

//   query += conditions.join(' AND ');

//   db.all(query, conditions.map(_ => '?'), (err, filteredCars) => {
//     if (err) {
//       handleServerError(res, err);
//     } else {
//       res.render('cars', { cars: filteredCars, dropdownOptions }); // Seçenekleri yeniden oluşturmak için geri gönderin
//     }
//   });
// });







// function fetchDropdownOptions(req, res, next) {
//   const dropdownTypes = ['type', 'make', 'model', 'price', 'year', 'milage', 'body', 'fuel', 'engineSize', 'power', 'gearBox', 'color'];
//   const dropdownOptions = {};

//   dropdownTypes.forEach(type => {
//     db.all(`SELECT DISTINCT ${type} `, (err, options) => {
//       if (err) {
//         console.error(`${type} seçeneklerini getirirken hata oluştu:`, err);
//         return next(err);
//       }

//       if (!options) {
//         console.warn(`${type} için seçenek bulunamadı`);
//         options = []; // Tanımsız veya boşsa options'ı boş bir dizi olarak ayarlayın
//       }

//       dropdownOptions[type] = options.map(option => option[type]);
//       if (Object.keys(dropdownOptions).length === dropdownTypes.length) {
//         res.locals.dropdownOptions = dropdownOptions;
//         next();
//       }
//     });
//   });
// }



// function fetchDropdownOptions(req, res, next) {
//   const dropdownTypes = ['type', 'make', 'model', 'price', 'year', 'milage', 'body', 'fuel', 'engineSize', 'power', 'gearBox', 'color'];
//   const dropdownOptions = {};

//   dropdownTypes.forEach(type => {
//     db.all(`SELECT DISTINCT ${type} FROM Cars`, (err, options) => {
//       dropdownOptions[type] = options.map(option => option[type]);
//       if (Object.keys(dropdownOptions).length === dropdownTypes.length) {
//         res.locals.dropdownOptions = dropdownOptions;
//         next();
//       }
//     });
//   });
// }
















// app.get('/getFilterOptions', (req, res) => {
//   db.all('SELECT DISTINCT make, model, price, year, milage, body, fuel, engineSize, power, gearBox, color FROM Cars',
//    (err, filterOptions) => {
//     if (err) {
//       handleServerError(res, err);
//       return;
//     }

//     res.json(filterOptions);
//   });
// });




// app.post('/filterCars', (req, res) => {
//   const filterParams = req.body;

//   let filterQuery = 'SELECT * FROM cars WHERE 1=1';

//   if (filterParams.type) {
//     filterQuery += ` AND type = '${filterParams.type}'`;
//   }

//   if (filterParams.make) {
//     filterQuery += ` AND make = '${filterParams.make}'`;
//   }

//   if (filterParams.model) {
//     filterQuery += ` AND model = '${filterParams.model}'`;
//   }
//   if (filterParams.price) {
//     filterQuery += ` AND price <= '${filterParams.price}'`;
//   }
//   if (filterParams.year) {
//     filterQuery += ` AND year = '${filterParams.year}'`;
//   }
//   if (filterParams.milage) {
//     filterQuery += ` AND milage <= '${filterParams.milage}'`;
//   }
//   if (filterParams.body) {
//     filterQuery += ` AND body = '${filterParams.body}'`;
//   }
//   if (filterParams.fuel) {
//     filterQuery += ` AND fuel = '${filterParams.fuel}'`;
//   }
//   if (filterParams.engineSize) {
//     filterQuery += ` AND engineSize = '${filterParams.engineSize}'`;
//   }
//   if (filterParams.power) {
//     filterQuery += ` AND power <= '${filterParams.power}'`;
//   }
//   if (filterParams.gearBox) {
//     filterQuery += ` AND gearBox = '${filterParams.gearBox}'`;
//   }
//   if (filterParams.color) {
//     filterQuery += ` AND color = '${filterParams.color}'`;
//   }


//   db.all(filterQuery, [], (err, filteredCars) => {
//     if (err) {
//       handleServerError(res, err);
//       return;
//     }

//     res.json(filteredCars);
//   });
// });





// app.get("/testimonials",function(req,res){
//   db.all('SELECT * FROM Testimonials ORDER BY id', (err, rows) => {
//     if (err) {
//       handleServerError(res, err);
//     } else {
//       const testimonialsGroups = [];
//       for (let i = 0; i < rows.length; i += 2) {
//         testimonialsGroups.push(rows.slice(i, i + 2));
//       }
//       res.render('testimonials', { testimonialsGroups });
//     }
//   });
// })

