const fs = require('fs')

const ceemde = JSON.parse(fs.readFileSync('./lib/secret/diasOnline.json'))

const diasADD = () => {
	ceemde[0].Dias += 1
	fs.writeFileSync('./lib/secret/diasOnline.json', JSON.stringify(ceemde))
}

module.exports = { diasADD }