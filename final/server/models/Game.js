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
    gameState: { // pending, active, complete 
        type: String,
        required: true
    },
    gameBoard: {
        type: Array,
        required: true

    },
    players: {
        type: Array,
        required: true
    },
    numOfMoves: {
        type: Number,
        required: true
    },
    gameEnded: {
        type: Boolean,
        required: true,
        default: false
    }



});

const Game = mongoose.model('Game', GameSchema);

export default Game;