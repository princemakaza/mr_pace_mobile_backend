const TrainingProgram = require("../models/training_program_model");
const User = require("../models/user_model");

// Create a new training program
const createTrainingProgram = async (programData) => {
  try {
    // Validate assignedBy is a coach/admin
    const assignedByUser = await User.findById(programData.assignedBy);
    if (!assignedByUser || !['coach', 'admin'].includes(assignedByUser.role)) {
      throw new Error('Only coaches or admins can assign training programs');
    }

    // Validate all athletes exist and are athletes
    const athletes = await User.find({ _id: { $in: programData.athletes }, role: 'athlete' });
    if (athletes.length !== programData.athletes.length) {
      throw new Error('One or more athletes are invalid or not found');
    }

    const newProgram = new TrainingProgram(programData);
    return await newProgram.save();
  } catch (error) {
    throw error;
  }
};

// Get all training programs
const getAllTrainingPrograms = async (filter = {}) => {
  try {
    return await TrainingProgram.find(filter)
      .populate('assignedBy')
      .populate('athletes');
  } catch (error) {
    throw error;
  }
};

// Get training program by ID
const getTrainingProgramById = async (id) => {
  try {
    const program = await TrainingProgram.findById(id)
      .populate('assignedBy')
      .populate('athletes');
    if (!program) {
      throw new Error('Training program not found');
    }
    return program;
  } catch (error) {
    throw error;
  }
};

// Update training program
const updateTrainingProgram = async (id, updateData) => {
  try {
    if (updateData.assignedBy) {
      const assignedByUser = await User.findById(updateData.assignedBy);
      if (!assignedByUser || !['coach', 'admin'].includes(assignedByUser.role)) {
        throw new Error('Only coaches or admins can be assigned as program creators');
      }
    }

    if (updateData.athletes) {
      const athletes = await User.find({ _id: { $in: updateData.athletes }, role: 'athlete' });
      if (athletes.length !== updateData.athletes.length) {
        throw new Error('One or more athletes are invalid or not found');
      }
    }

    const updatedProgram = await TrainingProgram.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedBy', 'name email role')
     .populate('athletes', 'name email');

    if (!updatedProgram) {
      throw new Error('Training program not found');
    }
    return updatedProgram;
  } catch (error) {
    throw error;
  }
};

// Delete training program
const deleteTrainingProgram = async (id) => {
  try {
    const deletedProgram = await TrainingProgram.findByIdAndDelete(id);
    if (!deletedProgram) {
      throw new Error('Training program not found');
    }
    return deletedProgram;
  } catch (error) {
    throw error;
  }
};

// Get programs assigned to a specific athlete
const getProgramsByAthlete = async (athleteId) => {
  try {
    const athlete = await User.findById(athleteId);
    if (!athlete || athlete.role !== 'athlete') {
      throw new Error('Invalid athlete ID');
    }
    
    return await TrainingProgram.find({ athletes: athleteId })
      .populate('assignedBy', 'name email role')
      .sort({ startDate: -1 });
  } catch (error) {
    throw error;
  }
};

// Get programs created by a specific coach/admin
const getProgramsByCreator = async (creatorId) => {
  try {
    const creator = await User.findById(creatorId);
    if (!creator || !['coach', 'admin'].includes(creator.role)) {
      throw new Error('Invalid creator ID');
    }
    
    return await TrainingProgram.find({ assignedBy: creatorId })
      .populate('athletes', 'name email')
      .sort({ startDate: -1 });
  } catch (error) {
    throw error;
  }
};

// Update program status
const updateProgramStatus = async (id, status) => {
  try {
    if (!['active', 'completed', 'cancelled'].includes(status)) {
      throw new Error('Invalid status value');
    }
    
    const updatedProgram = await TrainingProgram.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('assignedBy', 'name email role')
     .populate('athletes', 'name email');

    if (!updatedProgram) {
      throw new Error('Training program not found');
    }
    return updatedProgram;
  } catch (error) {
    throw error;
  }
};

// Add athlete to program
const addAthleteToProgram = async (programId, athleteId) => {
  try {
    const athlete = await User.findById(athleteId);
    if (!athlete || athlete.role !== 'athlete') {
      throw new Error('Invalid athlete ID');
    }
    
    const updatedProgram = await TrainingProgram.findByIdAndUpdate(
      programId,
      { $addToSet: { athletes: athleteId } },
      { new: true, runValidators: true }
    ).populate('assignedBy')
     .populate('athletes');

    if (!updatedProgram) {
      throw new Error('Training program not found');
    }
    return updatedProgram;
  } catch (error) {
    throw error;
  }
};

// Remove athlete from program
const removeAthleteFromProgram = async (programId, athleteId) => {
  try {
    const updatedProgram = await TrainingProgram.findByIdAndUpdate(
      programId,
      { $pull: { athletes: athleteId } },
      { new: true, runValidators: true }
    ).populate('assignedBy')
     .populate('athletes');

    if (!updatedProgram) {
      throw new Error('Training program not found');
    }
    return updatedProgram;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTrainingProgram,
  getAllTrainingPrograms,
  getTrainingProgramById,
  updateTrainingProgram,
  deleteTrainingProgram,
  getProgramsByAthlete,
  getProgramsByCreator,
  updateProgramStatus,
  addAthleteToProgram,
  removeAthleteFromProgram
};