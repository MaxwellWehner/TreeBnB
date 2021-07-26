const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Booking } = require("../../db/models");

const router = express.Router();

const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage("Please provide a valid date")
    .custom((value) => {
      const date = new Date();
      if (value.getTime() < date.getTime()) {
        throw new Error(`Start date must be later than today`);
      }
      return true;
    }),
  check("endDate")
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage("Please provide a valid date")
    .custom((value) => {
      const date = new Date();
      if (value.getTime() < date.getTime()) {
        throw new Error(`End date must be later than today`);
      }
      return true;
    }),
  handleValidationErrors,
];

// make a new booking
router.post(
  "/",
  requireAuth,
  validateBooking,
  asyncHandler(async (req, res) => {
    const { startDate, endDate, spotId } = req.body;
    const booking = await Booking.create({
      userId: req.user.id,
      spotId,
      startDate,
      endDate,
    });

    return res.json(booking);
  })
);

//get all bookings
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll();
    return res.json(bookings);
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    res.json(booking);
  })
);

router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    await booking.destroy();

    res.json({});
  })
);

router.put(
  "/:id(\\d+)",
  requireAuth,
  validateBooking,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate, spotId } = req.body;
    const booking = await Booking.findByPk(id);

    const newBooking = await booking.update({
      userId: req.user.id,
      spotId,
      startDate,
      endDate,
    });

    res.json(newBooking);
  })
);

module.exports = router;
