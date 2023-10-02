const productsServices = require("../services/products.services");
const path = require("path");
const { products } = require("../models");
const multer = require("multer");
const types = ["image/jpeg", "image/png"];
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const absolutePath = path.resolve("./src/views/productsImages");
      cb(null, absolutePath);
    },
    filename: (req, file, cb) => {
      const date = Date.now();
      cb(null, `${date}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // 1000 KyloBytes o un mega aprox
  },
  fileFilter: (req, file, cb) => {
    // Solo aceptaremos archivos .jpeg y .png

    if (!types.includes(file.mimetype)) {
      cb(
        {
          error: "file not supported",
          message: `Only ${types.join(", ")} mimetypes are allowed`,
        },
        false
      );
    } else {
      cb(null, true);
    }
  },
});

const createNewProductCTRL = async (req, res, next) => {
  try {
    // Extract product information from the request body
    const { name, description, price, available_qty } = req.body;

    // Call the corresponding service function to create a new product
    await productsServices.createNewProductSRVC(
      name,
      description,
      price,
      available_qty
    );

    // Respond with a status code indicating successful creation
    res.status(201).send();
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

const updateProductImageCTRL = async (req, res, next) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Find the product in the database based on the provided ID
    const product = await products.findOne({
      where: { id },
    });

    // Check if the product exists
    if (!product) {
      // If the product doesn't exist, throw an error indicating that
      throw {
        status: 400,
        name: "Invalid product",
        message: "Product doesn't exist",
      };
    }

    // Use the Multer middleware to handle product image upload
    upload.single("product_image")(req, res, async (err) => {
      if (err) {
        // If there's an error during file upload, pass it to the error handling middleware
        return next(err);
      }

      // Extract the product image file name from the request, if available
      const product_image = req.file ? req.file.filename : undefined;

      // Call the corresponding service function to update the product's image
      const message = await productsServices.updateProductImageSRVC(
        id,
        product_image
      );

      // Respond with a status code and a message indicating the image update
      res.status(200).send(message);
    });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

const updateProductInfoCTRL = async (req, res, next) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Extract product information from the request body
    const { name, description, price, available_qty, status } = req.body;

    // Call the corresponding service function to update the product's information
    const message = await productsServices.updateProductInfoSRVC(
      id,
      name,
      description,
      price,
      available_qty,
      status
    );

    // Respond with a status code and a message indicating the successful update
    res.status(200).send(message);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

const getAllProductsCTRL = async (req, res, next) => {
  try {
    // Extract the current page from the query parameters or default to page 1
    const currentPage = parseInt(req.query.page) || 1;

    // Define the number of results per page
    const resultPerPage = 10;

    // Call the corresponding service function to retrieve all products with pagination
    const allProducts = await productsServices.getAllProductsSRVC(
      currentPage,
      resultPerPage
    );

    // Respond with a JSON array containing the retrieved products
    res.json(allProducts);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

const getProductByIdCTRL = async (req, res, next) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Call the corresponding service function to retrieve a product by its ID
    const product = await productsServices.getProductByIdSRVC(id);

    // Respond with a status code and the retrieved product as JSON
    res.status(200).json(product);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

const deleteProductCTRL = async (req, res, next) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Call the corresponding service function to delete a product by its ID
    await productsServices.deleteProductSRVC(id);

    // Respond with a status code and a message indicating the successful deletion
    res.status(200).send("Product deleted");
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

module.exports = {
  createNewProductCTRL,
  updateProductImageCTRL,
  updateProductInfoCTRL,
  getAllProductsCTRL,
  getProductByIdCTRL,
  deleteProductCTRL,
};
