const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mysql = require('mysql');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'pryce'
});
db.connect();




// ---------- LOGIN ----------

app.post('/login', (req, res) => {
    // select ke tabel user where ? (username) and ? (password)
    // db.query('SELECT id_user, username, password FROM user where ? and ?',
    db.query('SELECT * FROM user where ? and ?',
        [
            {
                username: req.body.username
            },
            {
                password: req.body.password,
            }
        ],
        (err, result) => {
            if (err) throw err;
            res.send(result);
            console.log(result)

        }
    )
})


// ---------- SIGNUP ----------

app.post("/SignUp", (req, res) => {
    var data = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,

    }
    var newUser = 'INSERT INTO user set ?'
    db.query(newUser, data, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})



// ---------- SHOW PRODUCT ----------
app.get('/product', (req, res) => {
    var sql = 'SELECT * FROM product';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});


// ---------- SHOW PRRODUCT CATS ----------
app.get('/product/category/cats', (req, res) => {
    var sql = `SELECT * FROM product WHERE category = "cats"`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// ---------- SHOW PRODUCT FONTS  ----------
app.get('/product/category/words', (req, res) => {
    var sql = `SELECT * FROM product WHERE category = "words"`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// ADMIN - ADMIN - ADMIN - ADMIN - ADMIN - ADMIN - ADMIN  - ADMIN - ADMIN - ADMIN  - ADMIN - ADMIN - ADMIN 

//---------- ADMIN LOGIN -----------
app.post('/adminlogin', function (req, res) {
    // select ke tabel user where ? (username) and ? (password)
    // db.query('SELECT id_user, username, password FROM user where ? and ?',
    db.query('SELECT * FROM dataadm where ? and ?',
        [
            {
                admUsername: req.body.admUsername
            },
            {
                admPassword: req.body.admPassword,
            }
        ],
        (err, result) => {
            if (err) throw err;
            res.send(result);
            console.log(result)

        }
    )
})



// ---------- ADD PRODUCT ----------
app.post("/addproduct", (req, res) => {
    var data = {
        productname: req.body.productname,
        category: req.body.category,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price,
        productimage: req.body.productimage

    }
    var addproduct = 'INSERT INTO product SET ?'
    db.query(addproduct, data, (err, result) => {
        if (err) throw err;
        var done = {
            status: "sukses"
        }
        res.send(done)
    })
})

// ----------- UPDATE PRODUCT ---------

app.patch('/updateproduct/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    var data = [{
        productname: req.body.productname,
        category: req.body.category,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price,
        productimage: req.body.productimage

    },
    {
        productid: req.params.id
    }]
    console.log(data)
    var update = `UPDATE product SET ? WHERE ?`
    db.query(update, data, (err, result) => {
        if (err) throw err;
        var done = {
            status: "sukses"
        }
        res.send(done)
    })
})

// ---------- DELETE PRODUCT ----------
app.post('/deleteproduct', (req, res) => {
    var data = [
        {
            productid: req.body.productid
        }
    ]
    // console.log(data) 
    var delProd = `DELETE from product where ?`
    db.query(delProd, data, (err, result) => {
        if (err) throw err;

        res.send(result);
    })
})



// ---------- ADD TO CART ----------

app.post('/addToCart', (req, res) => {
    var data = {
        productname: req.body.productname,
        productqty: req.body.productqty,
        price: req.body.price,
        userid: req.body.userid,
        status: "ok",
        productid: req.body.productid,
        productimage: req.body.productimage,
    }
    var addCart = `INSERT INTO cart set ?`
    db.query(addCart, data, (err, result) => {
        if (err) throw err;
        var done = {
            status: "sukses"
        }
        res.send(done)

    })
})


// ---------- GET CART ----------

app.get('/getItemCart/:id', (req, res) => {
    var data = [{
        userid: req.params.id
    },
    {
        status: "ok"
    }]
    var cart = 'SELECT * FROM cart WHERE ? AND ?'
    db.query(cart, data, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    })

})


// ---------- GET CART UPDATE MINUS ----------

app.post('/getCartPlus', (req, res) => {
    var data = [
        {
            productqty: req.body.productqty
        },
        {
            idcart: req.body.idcart
        }
    ]
    // console.log('data qty & id cart', data) 
    var updateMinus = `UPDATE cart SET ? where ?`
    db.query(updateMinus, data, (err, result) => {
        if (err) throw err;

        res.send(result);
    })
})


// ---------- GET CART update minus
app.post('/getCartMinus', (req, res) => {
    var data = [
        {
            productqty: req.body.productqty
        },
        {
            idcart: req.body.idcart
        }
    ]
    // console.log('data qty & id cart', data) 
    var updateMinus = `UPDATE cart SET ? where ?`
    db.query(updateMinus, data, (err, result) => {
        if (err) throw err;

        res.send(result);
    })
})





// ---------- add Cart Delete


app.post('/getCartDelete', (req, res) => {
    var data = [
        {
            status: 'nok'
        },
        {
            idcart: req.body.idcart
        }
    ]
    console.log(data) 
    var deleteCart = `UPDATE cart SET ? WHERE ?`
    db.query(deleteCart, data, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})


// ini search -----------------------------------------------------------------------------------------------

app.get("/search/:caris", (req,res)=>{
    var cari = [{status: "active"},'%'+req.params.caris+'%']
    var url = 'SELECT * FROM product where ? AND namaprod LIKE ?'
    db.query(url,cari, (err, result)=>{
        res.send(result)
    }) 
})

// bikin server dengan app.listen
app.listen(3210, () => {
    console.log('Server @port 3210')
});
