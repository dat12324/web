// Load environment variables as early as possible
require('dotenv').config();

const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const multer = require('multer');
const moment = require('moment');

const path = require('path');
const route = require('./routes/client/index.route');
const adminRoute = require('./routes/admin/index.route');
const methodOverride = require('method-override');
var bodyParser = require('body-parser')
const app = express()
app.use(methodOverride('_method'));
const dotenv = require('dotenv');
dotenv.config();
const { connectDB } = require('./config/data');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tinymce',
   express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Flash middleware
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

const PORT = process.env.PORT || 3000;
const systemCongig = require('./config/system');

app.set("views",`${__dirname}/view`);
app.set("view engine","pug"); 
app.use(express.static(`${__dirname}/public`));
app.locals.preFixAdmin = systemCongig.preFixAdmin;
app.locals.moment = moment


const startServer = async () => {
  try {
    await connectDB(); // ✅ Chờ DB kết nối xong
    console.log('✅ Database connected successfully');

    // Đăng ký routes sau khi DB sẵn sàng
    route(app);
    adminRoute(app);

    app.listen(PORT, () =>  {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Cannot start server:', error.message);
  }
};

startServer();