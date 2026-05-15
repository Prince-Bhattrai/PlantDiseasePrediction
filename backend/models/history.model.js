import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },

    disease: {
      type: String,
      required: true,
    },
    plant:{
      type:String,
      required:true
    },

    image: {
      url: {
        type: String,
        required: true,
      },

      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const History = mongoose.model("History", historySchema);