const trainingProgramService = require("../services/training_program_service");

// Create a new training program
exports.createProgram = async (req, res) => {
  try {
    const program = await trainingProgramService.createTrainingProgram(req.body);
    res.status(201).json({
      success: true,
      data: program
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all training programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await trainingProgramService.getAllTrainingPrograms(req.query);
    res.status(200).json({
      success: true,
      data: programs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get a single training program by ID
exports.getProgramById = async (req, res) => {
  try {
    const program = await trainingProgramService.getTrainingProgramById(req.params.id);
    res.status(200).json({
      success: true,
      data: program
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Update a training program
exports.updateProgram = async (req, res) => {
  try {
    const program = await trainingProgramService.updateTrainingProgram(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: program
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a training program
exports.deleteProgram = async (req, res) => {
  try {
    await trainingProgramService.deleteTrainingProgram(req.params.id);
    res.status(200).json({
      success: true,
      data: null,
      message: 'Training program deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Get programs for a specific athlete
exports.getAthletePrograms = async (req, res) => {
  try {
    const programs = await trainingProgramService.getProgramsByAthlete(req.params.athleteId);
    res.status(200).json({
      success: true,
      data: programs
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get programs created by a specific coach/admin
exports.getCreatorPrograms = async (req, res) => {
  try {
    const programs = await trainingProgramService.getProgramsByCreator(req.params.creatorId);
    res.status(200).json({
      success: true,
      data: programs
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update program status
exports.updateStatus = async (req, res) => {
  try {
    const program = await trainingProgramService.updateProgramStatus(
      req.params.id,
      req.body.status
    );
    res.status(200).json({
      success: true,
      data: program
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Add athlete to program
exports.addAthlete = async (req, res) => {
  try {
    const program = await trainingProgramService.addAthleteToProgram(
      req.params.programId,
      req.body.athleteId
    );
    res.status(200).json({
      success: true,
      data: program
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Remove athlete from program
exports.removeAthlete = async (req, res) => {
  try {
    const program = await trainingProgramService.removeAthleteFromProgram(
      req.params.programId,
      req.params.athleteId
    );
    res.status(200).json({
      success: true,
      data: program
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};