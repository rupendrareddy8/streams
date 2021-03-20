const { Transform } = require('stream');

let array = []
const myTransform = new Transform({
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    let obj = {key: chunk.toString(), value: 1}
	if(array.length) {
		let search = array.find(i => (i.key == chunk.toString()))
		if(!search) {
			array.push(obj)
		} else {
			search.value  = search.value +1
		}
	} else {
		array.push(obj)
	}
    callback(null, Buffer.from(JSON.stringify(array)));
  }
});

myTransform.write(5);
myTransform.write(2);
myTransform.write(2);
myTransform.write(8);

myTransform.on('data', (data) => console.log(data.toString()));

myTransform.end();
