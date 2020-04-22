import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    studio: String,
    releaseDate: Date,
    rating: Number,
  },
  {
    timestamps: true,
  }
)

// eslint-disable-next-line import/prefer-default-export
export const Game = mongoose.model('Game', gameSchema)
