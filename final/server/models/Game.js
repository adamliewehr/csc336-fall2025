import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({

    createdBy: {
        type: String,
        required: true

    },

    name: {
        type: String,
        required: true
    },

    gameSpecifications: {
        type: Object,
        required: true
    },
    gameState: {
        type: Object,
        required: false
    }



});

const Game = mongoose.model('Game', GameSchema);

export default Game;