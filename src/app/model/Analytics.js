import mongoose from 'mongoose';

const { Schema, model } = mongoose;


const analyticsSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    type: { type: String, enum: ['activity', 'system', 'transaction'], required: true },
    action: { type: String, required: false }, 
    amount: { type: Number, required: false }, 
    requestCount: { type: Number, default: 0 },
    month: { type: String, required: false },
    details: { type: Object, required: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);


const Analytics = model('Analytics', analyticsSchema);

export default Analytics;
