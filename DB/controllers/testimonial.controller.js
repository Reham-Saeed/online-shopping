const Testimonial = require("../models/testimonial.model");
const AppError = require("../utils/app-error.utils");
const catchAsync = require("../utils/catch-async.utils");

exports.addTestimonial = catchAsync(async (req, res) => {
  const { user, content, rating } = req.body;
  const testimonial = await Testimonial.create({
    user,
    content,
    rating,
  });
  res.status(201).json({ message: "Testimonial added", data: testimonial });
});

exports.getApprovedTestimonials = catchAsync(async (req, res) => {
  const testimonials = await Testimonial.find({ status: "approved" }).populate(
    "user"
  );

  res.status(200).json({
    message: "Approved testimonials list",
    data: testimonials,
  });
});

exports.getPendingTestimonials = catchAsync(async (req, res) => {
  const testimonials = await Testimonial.find({ status: "pending" }).populate(
    "user"
  );

  res.status(200).json({
    message: "Pending testimonials list",
    data: testimonials,
  });
});

exports.updateTestimonialStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return next(new AppError("Invalid status value", 400));
  }

  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!testimonial) {
    return next(new AppError("Testimonial not found", 404));
  }

  res.status(200).json({
    message: `Testimonial ${status}`,
    data: testimonial,
  });
});
