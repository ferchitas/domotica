'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

const LuminosidadSchema = schema({

	estado: Number,
	fecha: Date
});

module.exports = mongoose.model('Luminosidad', LuminosidadSchema);