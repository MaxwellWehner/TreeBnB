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
  check("city")
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Please provide a city with at least 5 characters."),
  check("state")
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Please provide a state with at least 5 characters."),
  check("country")
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Please provide a country with at least 5 characters."),
  check("price")
    .exists({ checkFalsy: true })
    .isInt({ gt: 0 })
    .withMessage("Please provide a price greater than 0"),
  handleValidationErrors,
];

// make a new spot
router.post(
  "/",
  requireAuth,
  validateSpot,
  asyncHandler(async (req, res) => {
    const { address, city, state, country, price, name } = req.body;
    const spot = await Spot.create({
      userId: req.user.id,
      address,
      city,
      state,
      country,
      price,
      name,
    });

    return res.json(spot);
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

router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findByPk(id);
    await spot.destroy();
  })
);

router.put(
  "/:id(\\d+)",
  requireAuth,
  validateSpot,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { address, city, state, country, price, name } = req.body;
    const spot = await Spot.findByPk(id);

    const newSpot = await spot.update({
      userId: req.user.id,
      address,
      city,
      state,
      country,
      price,
      name,
    });

    res.json(newSpot);
  })
);

module.exports = router;
