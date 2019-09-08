var express = require('express');
var app = express();

//set view pages in views
//set public floder as root
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'))

//setting
//body-paser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-qkovx.mongodb.net/buoi02?retryWrites=true&w=majority', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log("connect err", err)
    } else {
        console.log("connect success")
    }
}
);

//port 
app.listen(3000)

//variable
// var sinhvienSchema = new mongoose.Schema({
//     HoTen: String,
//     NamSinh: Number
// });

// create model
// var SinhVien = mongoose.model("SinhVien",sinhvienSchema)
var SinhVien = require('./models/sinhvien');
var SanPham = require('./models/sanpham');

//save to mongoDB
// app.get("/save",function(req,res){
//     var teo = new SinhVien({
//         HoTen: "Nguyen Hung",
//         NamSinh: 1985
//     })
//     console.log("teo: ", teo);
//     teo.save(function(err){
//         if (err) {
//             console.log("save err",err);
//             res.json({"kq":0})
//         } else {
//             console.log("save success");
//             res.json({"kq":1})
//         }      
//     })

// })

// //
// app.get("/sv/:id",function(req,res){
//     SinhVien.find({NamSinh:req.params.id},function(err,ds){
//         if (err){
//             console.log("find sv",err);
//             res.json({"kq":0})
//         } else {
//             console.log("find sv success");
//             res.json(ds)
//         }
//     })
// })


app.get('/', function (req, res) {
    // res.send('hello')
    SinhVien.find(function (err, ds) {
        if (err) {
            console.log("find sv", err);
        } else {
            console.log("find sv success", ds);
            res.render('home', { ds })
        }
    })
})

//BT them danh sach sinh vien

//them sinh vien
app.get('/them', function (req, res) {
    res.render('them')
})

//xuly, save to DB
app.post('/xuly', (req, res) => {
    console.log(req.body);
    var sv = new SinhVien({
        HoTen: req.body.hoten,
        NamSinh: req.body.namsinh
    })
    console.log("sinh vien moi nhap", sv);

    sv.save(function (err) {
        if (err) {
            console.log("save err", err);
        } else {
            console.log("save success");
            res.redirect("/")
        }
    });

})

//demo sanpham
app.get('/demo', (req, res) => {
    for (i = 1; i <= 23; i++) {
        var keo = SanPham({
            Ten: "keo" + i,
            Gia: 100,
            ThuTu: i
        })
        keo.save((err) => {
            if (err) {
                console.log("save sanpham err", err);
            } else {
                console.log("save sanpham success");

            }
        })
    }
    res.send('save sanpham' + i)
})

app.get('/sanpham', (req, res) => {
    // SanPham.find((err,items)=>{
    //     if (err){
    //         console.log("find sp err",err);
    //         res.json({kq:0})
    //     } else {
    //         console.log("find sp success",items);
    //         res.send(items)

    //     }
    // }).sort({ThuTu:1})
    SanPham.find().countDocuments(function (err, count) {
        if (err) {
            console.log("find and count sp err", err);
            res.json({ kq: 0 })
        } else {
            console.log("find sp and count success", count);
            res.json({ kq: count })
        }
    })
})

app.get('/sp/:trang', function (req, res) {
    //sosp1trang
    var sosp1trang = 8
    //tong san pham tren DB
    SanPham.find().countDocuments(function (err, count) {
        if (err) {
            console.log("find and count sp err", err);
            res.json({ kq: 0 })
        } else {
            console.log("find sp and count success", count);

            //tong so trang (nho lam tron len)
            var tongsotrang = Math.ceil(count / sosp1trang);
            // res.send("tongsotrang:" + tongsotrang)

            //get :trang --> biet KH xem trang may
            var trang = req.params.trang

            //skip
            var skip = (trang - 1) * sosp1trang

            res.json({trang:trang, tongsotrang: tongsotrang, skip: skip })
        }
    })




})