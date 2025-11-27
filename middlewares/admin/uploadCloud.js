const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Configure Cloudinary using environment variables for security
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports.uploadCloud = async (req, res, next) => {
  if (!req.file) return next();

  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: process.env.CLOUDINARY_FOLDER || "webtest/products",
          resource_type: "auto",
        },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  try {
    const result = await streamUpload(req);
    // store uploaded url on body so controllers can use it
    req.body[req.file.fieldname] = result.secure_url;
    // also attach public id for possible future deletion
    req.file.cloudinaryPublicId = result.public_id;
    next();
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    next(err);
  }
};

