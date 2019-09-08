var mongoose = require('mongoose')

var sanphamSchema = new mongoose.Schema({
    TenSanPham: String,
    Gia: Number,
    ThuTu: Number
});

module.exports = mongoose.model("SanPham",sanphamSchema)