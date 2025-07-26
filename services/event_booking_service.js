const EventBooking = require("../models/event_booking_model"); // adjust the path if needed

const createBooking = async (data) => {
  const booking = new EventBooking(data);
  return await booking.save();
};

const getAllBookings = async () => {
  return await EventBooking.find();
};

const getBookingById = async (id) => {
  return await EventBooking.findById(id);
};

const updateBooking = async (id, data) => {
  return await EventBooking.findByIdAndUpdate(id, data, { new: true });
};

const deleteBooking = async (id) => {
  return await EventBooking.findByIdAndDelete(id);
};

const getBookingsByStatus = async (status) => {
  return await EventBooking.find({ bookingStatus: status });
};

const searchBookings = async (query) => {
  return await EventBooking.find({
    $or: [
      { organizerName: { $regex: query, $options: "i" } },
      { eventName: { $regex: query, $options: "i" } },
    ],
  });
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingsByStatus,
  searchBookings,
};
