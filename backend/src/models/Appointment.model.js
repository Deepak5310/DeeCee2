import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firebaseUid: {
      type: String,
      required: true,
      index: true,
    },
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    serviceType: {
      type: String,
      required: true,
      enum: [
        'Hair Extension Consultation',
        'Color Matching Session',
        'Installation Service',
        'Maintenance Service',
        'Removal Service',
        'Styling Consultation',
        'Custom Order Consultation',
      ],
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    scheduledTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      default: 60,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
      default: 'pending',
    },
    notes: String,
    location: {
      type: String,
      enum: ['in-store', 'home-service', 'virtual'],
      default: 'in-store',
    },
    address: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
    statusHistory: [
      {
        status: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
appointmentSchema.index({ appointmentId: 1 });
appointmentSchema.index({ userId: 1 });
appointmentSchema.index({ firebaseUid: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ scheduledDate: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
