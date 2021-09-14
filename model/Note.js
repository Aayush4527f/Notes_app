const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema(
	{
		Note: { type: String , required:true}
	},
	{ collection: 'notes' }
)

const model = mongoose.model('NoteSchema', NoteSchema)

module.exports = model