const mongoose = require('mongoose');

const schema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	}
}, {
	strict: false
})

module.exports = mongoose.model('todo', schema)