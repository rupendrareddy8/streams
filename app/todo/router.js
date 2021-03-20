const express = require('express');
const router = express.Router();
const collection = require('./model.js')

router.post('/save-todo', function(req, res) {
	try {
		if(!req.body.name) return res.status(400).send({message: "Please provide Todo name"})

		let dataObj = {
			name: req.body.name
		}


		collection.create(dataObj, function(err, response) {
			if(err) return res.status(400).send({message: "Error occured while saving Todo"})

			return res.status(201).send({message: "Saved successfully"})
		})
	} catch(e) {
		return res.status(400).send({message: "Something went wrong"})
	} 
})


router.get('/get-todos', function(req, res) {
	try {
		let query = {}
		collection.find(query, function(err, response) {
			if(err) return res.status(400).send({message: "Error occured while fetching data"})

			if(!response.length) return res.status(200).send({message: "No data found"})
			if(response.length) return res.status(200).send(response)
		})
	} catch(e) {
		return res.status(400).send({message: "Something went wrong"})
	} 
})


router.put('/update-todo', async function(req, res) {
	try {
		if(!req.body.update_id) return res.status(400).send({message: "Please provide Document id to update"})

		let query = {
			_id: req.body.update_id
		}

		let updateData = {$set: {}}

		if(req.body.completed || req.body.completed == false) {
			updateData["$set"]["completed"] = req.body.completed
		}

		if(req.body.name) updateData["$set"]["name"] = req.body.name

		try {
			let response = await collection.findOneAndUpdate(query, updateData, {new: true})
			console.log(response)
			if(!response) return res.status(400).send({message: "No data found"})
			return res.status(200).send({message: "Updated successfully"})
		} catch(e) {
			return res.status(400).send({message: "Error occured while updating"})
		}
		// 	if(err) return res.status(400).send({message: "Error occured while updating Todo"})

		// 	if(!response) return res.status(400).send({message: "No data found"})

		// 	return res.status(200).send({message: "Updated successfully"})
		// })

	} catch(e) {
		return res.status(400).send({message: "Something went wrong"})
	}
})


router.delete('/delete-todo', function(req, res) {
	try {
		if(!req.body.id) return res.status(400).send({message: "Please provide Document id to Delete"})

		let query = {
			_id: req.body.id
		}

		collection.remove(query, function(err, response) {
			if(err) return res.status(400).send({message: "Error occured while deleting Todo"})

			if(!response) return res.status(400).send({message: "No data found"})

			return res.status(200).send({message: "Deleted successfully"})
		})
	} catch(e) {
		console.log(e)
		return res.status(400).send({message: "Something went wrong"})
	}
})


module.exports = router;


