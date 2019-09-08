# MEAN_Buoi08_SocketIO_DB
Demo chat with Socket.io, MongoDB

* install dependencies

$ npm install body-parser ejs express multer socket.io mongoose

* model sanpham

* save phanpham to mongoDB

* find sanpham (ThuTu)

* Sort sanpham 

* Count sanpham: SanPham.find().countDocuments()

* SanPham.find().skip(5).limit(3): 
- tong so trang = tong sp/ (sosp1trang)
- skip=(page-1)*soSp1trang: bo qua bao nhieu dong, 
- limit=soSp/trang: lay bao nhieu dong
