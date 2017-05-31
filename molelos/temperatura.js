var mongoose = require('mongoose');
var schema = mongoose.Schema;

const TemperaturaSchema = schema({

	estado: Number,
	fecha: Date
});

module.exports = mongoose.model('Temperatura', TemperaturaSchema);