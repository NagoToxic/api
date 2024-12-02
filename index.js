// ------ BASE DE APIS FEITA PELO MANO GIULIAN ------ \\
// ------ REDES SOCIAIS E CANAIS ------ \\

//YOUTUBE 
// https://www.youtube.com/@giulianbandeira

//WHATSAPP 
// https://whatsapp.com/channel/0029VaZGpDmLCoX80H33T50h

//WHATSAPP PRA CONTATO
// https://wa.me/5517997285572

//WHATSAPP COMUNIDADE 
// https://chat.whatsapp.com/HUHSfDIr6VwKpVUUm24fdH

//INSTAGRAM 
// https://instagram.com/giulian.bandeira


bla = process.cwd() // NÃO MEXA AQUI

// ------ MÓDULOS ------ \\

const express = require('express');
const cors = require('cors')
const morgan = require ('morgan')
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs')
var fetch = require('node-fetch');
var cron = require('node-cron');
const cfonts = require("cfonts")
var router = express.Router()
// Criar uma instância do Express
const app = express();
const PORT = process.env.PORT || 20000 // Porta em que a API vai rodar


// ------ SCRAPPERS ------ \\

const { payment } = require('./PixAPI-MercadoPago-Js/index.js');
const { igstalk } = require('./lib/instagram')
var { color } = require('./lib/color.js')
const { mediafireDl } = require('./scrapers/mediafire.js');
var { pinterest, getBuffer , fetchJson , ping } = require('./lib/funcoes.js') 
var { styletext } = require('./scrapers/scraper.js')
const { RequestsAdd } = require(bla + '/scrapers/totalreq.js');   
const { chatGpt } = require('./scrapers/chatgpt')
const wallpaper = JSON.parse(fs.readFileSync("./scrapers/wallpaper.json"));
var { YTNomeSearch } = require('./scrapers/youtoba.js')
const {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./scrapers/youtube");


// ------ INFO ------ \\

var msgerro = 'Erro Ocorrido Contate O suporte!'
var criador = "@Giulian - WHATSAPP: +55 (17) 99728-55725" 


// ------ SISTEMA DE KEYS ------ \\

var key = JSON.parse(fs.readFileSync("./lib/secret/keys.json"));
const users = JSON.parse(fs.readFileSync("./lib/secret/usuarios.json"));
const pendingPayments = {}; // Armazena chaves temporárias para pagamentos pendentes


async function listkeys(apitoken, req) {
var i4 = key.map(i => i?.apitoken)?.indexOf(apitoken)
if(i4 >= 0) {
key[i4].request -= 2;
fs.writeFileSync("./lib/secret/keys.json", JSON.stringify(key, null, 2));
await RequestsAdd(); 
var IP = req.headers['x-real-ip'] || req.connection.remoteAddress || 0;
var i3 = users.map(i => i.key).indexOf(apitoken);
if(i3 < 0 && !users.map(i => i.IP).includes(IP?.split(":")[3])){
users.push({key: apitoken, IP: [IP?.split(":")[3]]})
fs.writeFileSync("./lib/secret/usuarios.json", JSON.stringify(users, null, 2));
} else if(i3 >= 0 && !users[i3]?.IP.includes(IP?.split(":")[3])) {
users[i3].IP.push(IP?.split(":")[3])
fs.writeFileSync("./lib/secret/usuarios.json", JSON.stringify(users, null, 2));
}}} 


// ------ SISTEMA DAS PÁGINAS ------ \\

app.get('/docs',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public','index.html'))})
app.get('/',(req, res) => {
res.sendFile(path.join(__dirname, "./public/", "docs.html"))});
app.get('/panel',(req, res) => {
res.sendFile(path.join(__dirname, "./public/", "admin.html"))});
app.get('/planos',(req, res) => {
res.sendFile(path.join(__dirname, "./public/", "planos.html"))});
app.get('/pack',(req, res) => {
res.sendFile(path.join(__dirname, "./public/", "cases.html"))});
    app.use(cors())
    app.set("json spaces",2)
    app.use(express.static("public"))
    app.use(express.json())
    app.use(router)

// ------ SISTEMA DAS APIS ------ \\

app.get('/api/keyerrada',(req, res) => {
var apitoken = req.query.apitoken;
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
if(ITC < 0) {
return res.json({key:' ❌ Sua apitoken é invalida!! ❌'})
} else {return res.json({key:`🔑 Sua Apitoken está 100% ✅ • Requisições Restantes: ${key[ITC]?.request}`})}})

app.get('/api/status/key',(req, res) => {
var apitoken = req.query.apitoken;
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
if(ITC < 0) {
return res.json({key:' ❌ Sua apitoken é invalida!! ❌'})
} else {return res.json({key:`${key[ITC]?.request}`})}
})

app.get('/api/status/apitoken',(req, res) => {
var apitoken = req.query.apitoken;
if(key.map(i => i.apitoken).includes(apitoken)) {
return res.json({resultado: "Essa key já está inclusa dentro do sistema.."})
} else {
return res.json({resultado: `Não está inclusa`})
}
})
 
app.get('/api/add-key',(req, res) => {
a = req.query.a
if(!a.includes("&")) return res.json({resultado: "Faltando o &"})
var [apitoken, senha, rq] = a.split("&")
var senhaofc = "K23"
if(senha != senhaofc) return res.json({resultado: "Senha invalida.."})
if(!apitoken) return res.json({resultado: "Kd a key.."})
if(key.map(i => i.apitoken).includes(apitoken)) {
return res.json({resultado: "Essa key já está inclusa dentro do sistema.."})
} else {
key.push({apitoken: apitoken, request: rq})
fs.writeFileSync("./lib/secret/keys.json", JSON.stringify(key))
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
return res.json({resultado: `🔑 Apitoken: ${apitoken} Foi Adicionada ao Sistema com Exito!\n🚀 Numero de Requisições Disponiveis: ${key[ITC]?.request}`})
}
})
 
app.get('/api/del-key',(req, res) => {
a = req.query.a
if(!a.includes("&")) return res.json({resultado: "Faltando o &"})
var [apitoken, senha] = a.split("&")
var senhaofc = "K23"
if(senha != senhaofc) return res.json({resultado: "Senha invalida.."})
if(!apitoken) return res.json({resultado: "Kd a key.."})
if(!key.map(i => i.apitoken).includes(apitoken)) {
return res.json({resultado: "Essa key não está inclusa.."})
} else {
var i2 = key.map(i => i.apitoken).indexOf(apitoken)
key.splice(i2, 1)
fs.writeFileSync("./lib/secret/keys.json", JSON.stringify(key))
return res.json({resultado: `🔑 Apitoken ${apitoken} deletada com sucesso..`})
}
})

app.post('/create_payment', async (req, res) => {
  const { value, apiKey } = req.body;
  const accessToken = 'APP_USR-3827115893832662-010119-3408324b6649ba71f3ec2090cd839b88-533004323';

  try {
    const paymentInstance = new payment(accessToken);
    const paymentInfo = await paymentInstance.create_payment(value);

    // Armazena a chave temporariamente, associada ao ID do pagamento
    pendingPayments[paymentInfo.id] = apiKey;

    res.json(paymentInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/check_payment/:payment_id', async (req, res) => {
  const { payment_id } = req.params;
  const apiKey = pendingPayments[payment_id];
  const accessToken = 'APP_USR-3827115893832662-010119-3408324b6649ba71f3ec2090cd839b88-533004323';

  if (!apiKey) {
    return res.json({ resultado: "Chave não encontrada para esse pagamento." });
  }

  try {
    const paymentInstance = new payment(accessToken);
    paymentInstance.payment_id = payment_id;
    const paymentStatus = await paymentInstance.check_payment();

    if (paymentStatus.status === 'approved') {
      if (keys.some(key => key.apitoken === apiKey)) {
        return res.json({ resultado: "Essa chave já está registrada no sistema." });
      } else {
        // Adiciona a chave ao sistema e salva no arquivo JSON
        keys.push({ apitoken: apiKey, request: paymentStatus.request });
        fs.writeFileSync('./lib/secret/keys.json', JSON.stringify(keys, null, 2));

        delete pendingPayments[payment_id]; // Remove o pagamento da lista temporária

        return res.json({ resultado: "Pagamento aprovado e chave adicionada!" });
      }
    } else if (paymentStatus.status === 'rejected') {
      delete pendingPayments[payment_id]; // Remove o pagamento rejeitado
      return res.json({ resultado: "Pagamento rejeitado." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/insta-stalk', async(req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
query = req.query.query
if (!query) return res.json({ status : false, criador : `${criador}`, resultado : "Coloque o parametro: query"})
    try {
        const { igstalk } = require('./lib/instagram.js') 
        const api = await igstalk(username)
        const anu = api.data
        res.json({
        status: true,
        código: 200,
        criador: `${criador}`, 
        resultado: {
        id: anu.id,
        nomeCompleto: anu.fullname,
        privado: anu.private,
        verificado: anu.verified,
        bio: anu.bio,
        seguidores: anu.follower,
        seguindo: anu.following,
        connectFacebook: anu.conneted_fb,
        videoTimLine: anu.videotimeline,
        timeLine: anu.timeline,
        savedMedia: anu.savedmedia,
        coleção: anu.collections,
        photoProfile: api.profile
        }
        })
        } catch (err) {
        res.json({resultado: `${err}`})
        };
});

app.get('/api/mediafire', async (req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
url = req.query.url
if (!url) return res.json({ status : false, creator : `${criador}`, resultado : "Cade o parametro url?"})
mediafireDl(url)
.then(data => {
var resultado = data;
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado:{
resultado
}
})
}).catch(e => {
res.json({resultado: `${msgerro}`})
})
})

app.get("/ias/bing", async(req, res) => {
try {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
var pesquisa = req.query.pesquisa
if (!pesquisa) return res.json({resultado: "Cade, quer pesquisar o que?"})
const url = `https://www.bing.com/search?q=${pesquisa}&setmkt=pt-BR&PC=EMMX01&form=LWS002&scope=web`;
axios(url).then(response => {
const $ = cheerio.load(response.data);
const Rst = [];
$("div > p").each(function(){
const TTL = $(this).text();
if(TTL.length > 10)
Rst.push({ 
TTL
});
});
let bla = ''
for (let i of Rst) {
bla += `${i.TTL.replace(new RegExp("Web", "gi"), "")}\n\n`
}
res.json({
criador: `${criador}`,
resultado: bla
})
}).catch(e => {
return res.json({resultado: "Error, digite algo que queira pesquisar.."})
})
} catch (e) {
return res.json({resultado: `${msgerro}`})
}
})

app.get('/ias/gpt', async (req, res) => {
query = req.query.query
if(!query)return res.json({status:false, resultado: 'Cade o parametro query??'})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
anu = await chatGpt(`${query}`)
res.json({
status: true,
criador: `${criador}`,
resultado: `${anu.result}`,
})
})

app.get('/sticker/aleatorio', async (req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
var rnd = Math.floor(Math.random() * 8051)
    hasil = `https://raw.githubusercontent.com/badDevelopper/Testfigu/main/fig (${rnd}).webp`
	  popoc = await getBuffer(hasil)
         res.type('jpg')
res.send(popoc)
         } catch(err) {
  res.json({resultado: `${msgerro}`})

}
})

app.get('/api/pinterest', (req, res) => {
(async() => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
text = req.query.text
if (!text) return res.json({ status : false, creator : `${criador}`, resultado : "Cade o parametro text?"})
pin = await pinterest(text)
ac = pin[Math.floor(Math.random() * pin.length)]
res.type('jpg')
res.send(await getBuffer(ac))
})()
})

router.get('/download/play-mp4', async(req, res, next) => {
 nome = req.query.nome
if(!nome)return res.json({status:false, resultado:'Cade o parametro nome??'  }) 
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
api = await YTNomeSearch(nome)
/*res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: {
thumb: api.thumb,
titulo: api.title,
canal: api.channel,
duração: api.duration,
visualizações: api.views,
publicado: api.publishedDate,
audio: api.audiourl,
link: api.url,
linkOriginal: api.urlOriginal,
}
})*/
res.set('Content-Type', 'audio/mp3');
    
    // Redireciona diretamente o áudio para que o navegador abra o player automaticamente
    res.send(await getBuffer(api.audiourl));
}catch(e) {
console.log(e)
res.json({resultado: `${err}`})
}})

router.get('/download/play-mp3', async(req, res, next) => {
 nome = req.query.nome
if(!nome)return res.json({status:false, resultado:'Cade o parametro nome??'  }) 
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
 ytPlayMp3(nome).then((akk) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: akk
})}).catch(e => {
res.json({resultado: `${err}`})})})

app.get('/geradores/fazernick', async (req, res) => {
  var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
let nome = req.query.nome || res.json({resultado: 'insira o parâmetro: ?nome='})
await styletext(nome)
.then(nicks => {
res.send(nicks) 
}).catch(e => {
res.json({resultado: `${msgerro}`})
})
})

app.get('/geradores/criar-email', async(req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
var resS = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10')
var data = await resS.data;
res.json({
status: true,
criador: `${criador}`,
resultado: data
})
} catch (err) {
res.json({resultado: `${msgerro}`})
};
})

app.get('/geradores/ler-email', async(req, res, next) => {
var apitoken = req.query.apitoken
var login = req.query.login;
var domain = req.query.domain;
var id = req.query.id;
if(!login)return res.json({status:false,resultado: 'Cadê o parâmetro login?'})
if(!domain)return res.json({status:false,resultado:'- Cadê o parâmetro domain?'})
if(!id)return res.json({status:false,resultado:'- Cadê o parâmetro id?'})
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
var url = `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`
console.log(login , domain, id)
var ress = await axios.get(url)
var data = await ress.data
res.json({
status: true,
criador: `${criador}`,
resultado: data
})
} catch (err) {
res.json({resultado: `${msgerro}`})
};
})

app.get('/api/wallpaper', async(req,res) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))

r = Math.floor(Math.random() * wallpaper.length)
res.type('jpg')
res.send(await getBuffer(wallpaper[r].url))
})


app.get('*', function(req, res) { res.sendFile(path.join(__dirname, "./public/", "notfound.html"))})

cron.schedule('0 0 * * *', () => {
const ceemde = JSON.parse(fs.readFileSync('./lib/secret/requests.json'))
ceemde[0].totalreqday = 0
fs.writeFileSync('./lib/secret/requests.json', JSON.stringify(ceemde))
}, {
  scheduled: true,
  timezone: 'America/Sao_Paulo' 
}); 


app.listen(PORT, () => {})
const banner = cfonts.render(("BASE|APIS"), {
font: "block",
align: "center",
gradient: ["magenta","red"]
}) 

console.log(banner.string)

let kuma = require.resolve(__filename)
fs.watchFile(kuma, () => {
fs.unwatchFile(kuma)
console.log(`ATUALIZANDO INDEX DA API`)
process.exit()
})


module.exports = router;