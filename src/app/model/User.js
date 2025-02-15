import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
    transactionHistory: [
      {
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
        category: { type: String, required: true }, 
      },
    ],
    paymentBehavior: {
      onTimePayments: { type: Number, default: 0 },
      latePayments: { type: Number, default: 0 },
      missedPayments: { type: Number, default: 0 },
    },
    creditBureauData: {
      score: { type: Number, default: 0 },
      history: [
        {
          bureau: { type: String }, 
          score: { type: Number },
          lastUpdated: { type: Date },
        },
      ],
    },
    currentCreditScore: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);


userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});


const User = model('User', userSchema);

export default User;
