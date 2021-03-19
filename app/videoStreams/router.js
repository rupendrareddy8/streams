const express = require('express')
const router = express.Router();
const fs = require('fs')
//const pug = require('pug')

router.get('/video', async function(req, res) {
	try {
		const path = 'add path directory of file'
		const stat = fs.statSync(path)
		const fileSize = stat.size
		const range = req.headers.range
		if (range) {
			const parts = range.replace(/bytes=/, "").split("-")
			const start = parseInt(parts[0], 10)
			const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
			const chunksize = (end-start)+1
			const file = fs.createReadStream(path, {start, end})
			const head = {
				'Content-Range': `bytes ${start}-${end}/${fileSize}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': chunksize,
				'Content-Type': 'video/mkv',
			}
			res.writeHead(206, head);
			file.pipe(res);
		} else {
			const head = {
				'Content-Length': fileSize,
				'Content-Type': 'video/mkv',
			}
			res.writeHead(200, head)
			fs.createReadStream(path).pipe(res)
		}
	} catch(e) {
		return res.status(400).send({error: "Error occured please try again later"})
	}
})

router.get('/', function(req, res) {
	res.sendFile(__dirname + "/index.html");
})
module.exports = router;