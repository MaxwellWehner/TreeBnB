const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");

const router = express.Router();

const validateSpot = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Please provide a name with at least 5 characters."),
  check("address")
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Please provide a address with at least 5 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// make a new spot
router.post(
  "/",
  validateSpot,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { address, city, state, country, price, name } = req.body;
    const spot = await Spot.create({
      address,
      city,
      state,
      country,
      price,
      name,
    });

    return res.json({
      spot,
    });
  })
);

//get all spots
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll();

    return res.json(spots);
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findByPk(id);

    res.json(spot);
  })
);

module.exports = router;
