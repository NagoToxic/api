const cheerio = require("cheerio")
const axios = require("axios")
const qs = require("qs")
var fs = require('fs')
var request = require('request'); 
var fetch = require('node-fetch')
var cron = require('node-cron');
const { diasADD } = require(bla + '/scrapers/DiasAdd.js');
const Dias = JSON.parse(fs.readFileSync('./lib/secret/diasOnline.json'))[0].Dias;
var { color } = require(bla + '/lib/color.js')

cron.schedule('0 0 * * *', () => {
(async() => {
await diasADD(); 
})()
}, {
  scheduled: true,
  timezone: 'America/Sao_Paulo' 
}); 

function pinterest(querry){

	return new Promise(async(resolve,reject) => {

		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {

			headers: {

			"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"

		}

			}).then(({ data }) => {

		const $ = cheerio.load(data)

		const result = [];

		const hasil = [];

   		 $('div > a').get().map(b => {

        const link = $(b).find('img').attr('src')

            result.push(link)

		});

   		result.forEach(v => {

		 if(v == undefined) return

		 hasil.push(v.replace(/236/g,'736'))

			})

			hasil.shift();

		resolve(hasil)

		})

	})

}

var fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})


async function getBuffer(url) {
he = await fetch(url)
.then(c => c.buffer())
return he
}

function muptime(seconds){
function pad(s){
return (s < 10 ? '0' : '') + s;
}
var days = Math.floor(seconds / (3600 * 24))
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);
return 'Dias: ' + `${Dias}` + ' • ' + 'Horas: ' + pad(hours) + ' • ' + 'Minutos: ' + pad(minutes) + ' • ' + 'Segundos: ' +  pad(seconds)
}

function ping() {
  const speed = require('performance-now');
  const timestampm = speed();
  const latency = speed() - timestampm;
  const ms = latency.toFixed(4);
    return ms
}


module.exports = { pinterest , getBuffer , fetchJson , ping , muptime} 