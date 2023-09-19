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
    const { name, description, price, available_qty } = req.body;
    await productsServices.createNewProductSRVC(
      name,
      description,
      price,
      available_qty
    );
    res.status(201).send();
  } catch (err) {
    next(err);
  }
};

const updateProductImageCTRL = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await products.findOne({
      where: { id },
    });

    if (!product) {
      throw {
        status: 400,
        name: "Invalid product",
        message: "Product doesn't exist",
      };
    }

    upload.single("product_image")(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const product_image = req.file ? req.file.filename : undefined;

      const message = await productsServices.updateProductImageSRVC(
        id,
        product_image
      );

      res.status(200).send(message);
    });
  } catch (err) {
    next(err);
  }
};

const updateProductInfoCTRL = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, available_qty, status } = req.body;

    const message = await productsServices.updateProductInfoSRVC(
      id,
      name,
      description,
      price,
      available_qty,
      status
    );

    res.status(200).send(message);
  } catch (err) {
    next(err);
  }
};

const getAllProductsCTRL = async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const resultPerPage = 10;

    const allProducts = await productsServices.getAllProductsSRVC(
      currentPage,
      resultPerPage
    );
    res.json(allProducts);
  } catch (err) {
    next(err);
  }
};

const getProductByIdCTRL = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getProductByIdSRVC(id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProductCTRL = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsServices.deleteProductSRVC(id);
    res.status(200).send("Product deleted");
  } catch (err) {
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
