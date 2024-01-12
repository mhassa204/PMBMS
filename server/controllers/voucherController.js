const Voucher = require("../models/VoucherModel");
const verifyToken = require("../middleware/accessAuth");
const { Shop, ShopType } = require("../models/ShopModel");
const ShopHolder = require("../models/ShopHolderModel");
const IncomeCategory = require("../models/IncomeCategoryModel");

// Get all vouchers
exports.getAllVouchers = [
  verifyToken,
  async (req, res) => {
    try {
      const vouchers = await Voucher.find()
        .populate("shop", "shopID monthlyRent")
        .populate("shopHolder", "name")
        .populate("incomeCategory", "name")
        .populate("shopType", "name");
      if (!vouchers)
        return res.status(401).json({ message: "No vouchers found" });

      res
        .status(200)
        .json({ message: "retrieved all the vouchers", vouchers: vouchers });
    } catch (err) {
      res.status(500).json({ error: "Failed to get vouchers" });
    }
  },
];

// Get a single voucher by ID
exports.getVoucherByID = [
  verifyToken,
  async (req, res) => {
    try {
      const voucher = await Voucher.findById(req.params.id)
        .populate("shop", "shopID monthlyRent")
        .populate("shopHolder", "name")
        .populate("incomeCategory", "name")
        .populate("shopType", "name");
      if (!voucher)
        return res.status(401).json({ message: "No voucher found" });

      res
        .status(200)
        .json({ message: "retrieved the voucher", voucher: voucher });
    } catch (err) {
      res.status(500).json({ error: "Failed to get voucher" });
    }
  },
];

// exports.getVoucherByShopHolderID = [
//   verifyToken,
//   async (req, res) => {
//     try {
//       const voucher = await Voucher.find({ shopHolder: req.params.id })
//         .populate("shop", "shopID monthlyRent")
//         .populate("shopHolder", "name")
//         .populate("incomeCategory", "name")
//         .populate("shopType", "name");
//       if (!voucher)
//         return res.status(401).json({ message: "No voucher found" });

//       res.status(200).json({ message: "retrieved the voucher", voucher: voucher });
//     } catch (err) {
//       res.status(500).json({ error: "Failed to get voucher" });
//     }
//   },
// ];

//update a voucher
exports.updateVoucher = [
  verifyAdmin,
  async (req, res) => {
    let voucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        shopHolder: await ShopHolder.findOne({ name: req.body.shopHolder }),
        shopType: await ShopType.findOne({ name: req.body.shopType }),
        incomeCategory: await IncomeCategory.findOne({
          name: req.body.incomeCategory,
        }),
      },
      {
        new: true,
      }
    );
    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    res.json(voucher);
  },
];

//generate voucher
// exports.generateVoucher = [
//   verifyToken,
//   async (req, res) => {
//     try {
//       const data = req.body;
//       const voucher = await Voucher.findByIdAndUpdate(req.params.id, {
//         ...data,
//         dataGenerated: Date.now(),
//       });
//       res
//         .status(201)
//         .json({ message: "Voucher generated successfully", voucher });
//     } catch (err) {
//       res.status(500).json({ error: "Failed to generate voucher" });
//     }
//   },
// ];

//create a voucher
exports.createVoucher = [
  verifyAdmin,
  async (req, res) => {
    try {
      const data = req.body;
      const voucher = await new Voucher({
        ...data,
        shopHolder: await ShopHolder.findOne({ name: req.body.shopHolder }),
        shopType: await ShopType.findOne({ name: req.body.shopType }),
        incomeCategory: await IncomeCategory.findOne({
          name: req.body.incomeCategory,
        }),
      });
      await voucher.save();
      res
        .status(201)
        .json({ message: "Voucher created successfully", voucher });
    } catch (err) {
      res.status(500).json({ error: "Failed to create voucher" });
    }
  },
];

//delete a voucher
exports.deleteVoucher = [
  verifyToken,
  async (req, res) => {
    try {
      const voucher = await Voucher.findByIdAndDelete(req.params.id);
      if (!voucher) {
        return res.status(404).json({ error: "Voucher not found" });
      }
      res.json({ message: "Voucher deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete voucher" });
    }
  },
];
