const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
const fs = require("fs")
const axios = require('axios')
const speed = require("performance-now")
const util = require('util')
const crypto = require('crypto')
const request = require('request')
const { exec, spawn } = require('child_process')
const fetch = require('node-fetch')
const ms = require('parse-ms')
const moment = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')
const { lirikLagu } = require('./lib/lirik.js')
const { fetchJosn, kyun, fetchText, createExif } = require('./lib/fetcher')
const { color, bgcolor } = require('./lib/color')
const premium = require("./lib/premium")
const _sewa = require("./lib/sewa")
const { msgFilter } = require('./lib/antispam')
const Exif = require('./lib/exif')
const exif = new Exif()
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { removeBackgroundFromImageFile } = require('remove.bg')

//━━━━━━━━━━━━━━━[ DATABASE ]━━━━━━━━━━━━━━━━━//

let _antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
let _antivirtex = JSON.parse(fs.readFileSync('./database/antivirtex.json'))
let setting = JSON.parse(fs.readFileSync('./setting.json'))
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let tictactoe = JSON.parse(fs.readFileSync("./database/tictactoe.json"))
let sewa = JSON.parse(fs.readFileSync('./database/group/sewa.json'))
let _premium = JSON.parse(fs.readFileSync('./database/user/premium.json'))
let mute = JSON.parse(fs.readFileSync('./database/group/mute.json'))

ky_ttt = []
tttawal= ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
cmhit= []

//━━━━━━━━━━━━━━━[ SETTING ]━━━━━━━━━━━━━━━━━//

owner = setting.OwnerNumber
botname = setting.BotName
lolkey = setting.Apikey
zerkey = setting.ZerKey
fadlykey = setting.FadKey
ownername = setting.OwnerName
publik = true

//━━━━━━━━━━━━━━━[ MODUL EXPORTS ]━━━━━━━━━━━━━━━━━//

module.exports = fadly = async (fadly, mek, _welkom) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		global.blocked
        	mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
		const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
		let d = new Date
		let locale = 'id'
		let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
	    const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
		const week = d.toLocaleDateString(locale, { weekday: 'long' })
		const calender = d.toLocaleDateString(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	    })
        const type = Object.keys(mek.message)[0]        
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        const prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : '#'
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()		
		const args = body.trim().split(/ +/).slice(1)
		const arg = body.substring(body.indexOf(' ') + 1)
		const isCmd = body.startsWith(prefix)
		const q = args.join(' ')
		const Verived = "0@s.whatsapp.net"
		const txt = mek.message.conversation
		const botNumber = fadly.user.jid
		const ownerNumber = [`${owner}@s.whatsapp.net`, `6289523883972@s.whatsapp.net`]
		const isGroup = from.endsWith('@g.us')
		const sender = mek.key.fromMe ? fadly.user.jid : isGroup ? mek.participant : mek.key.remoteJid
		const senderNumber = sender.split("@")[0]
		const totalchat = await fadly.chats.all()
		const groupMetadata = isGroup ? await fadly.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
		const conts = mek.key.fromMe ? fadly.user.jid : fadly.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? fadly.user.name : conts.notify || conts.vname || conts.name || '-'
        
		const isAntiLink = isGroup ? _antilink.includes(from) : false
		const isWelkom = isGroup ? _welkom.includes(from) : false
		const isAntiVirtex = isGroup ? _antivirtex.includes(from) : false
		const isMuted = isGroup ? mute.includes(from) : false
		const isOwner = ownerNumber.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isMybot = isOwner || mek.key.fromMe
		const isPremium = premium.checkPremiumUser(sender, _premium)
		const isSewa = _sewa.checkSewaGroup(from, sewa)
		
//━━━━━━━━━━━━━━━[ CONNECTION 1 ]━━━━━━━━━━━━━━━━━//

		mess = {
			wait: 'Sabar Lagi Proses Tod...!',
			success: 'Success',
			wrongFormat: 'Format salah, coba liat lagi di menu',
			error: {
				stick: 'Gagal Convert...Coba Lagi !',
				Iv: 'Linknya Error Tod !'
			},
			only: {
				admin: 'Kusus Admin Tod !',
				group: 'Khusus Group Tod !',
				owner: 'Khusus Owner Tod !',
				prem: 'Khusus Member Premium Tod !'
			}
		}
        const listmsg = (from, title, desc, list) => { // ngeread nya pake rowsId, jadi command nya ga keliatan
            let po = fadly.prepareMessageFromContent(from, {"listMessage": {"title": title,"description": desc,"buttonText": "Pilih Disini","listType": "SINGLE_SELECT","sections": list}}, {})
            return fadly.relayWAMessage(po, {waitForAck: true})
        }
const fakevo = {
  key: {
    fromMe: false,
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  },
  message: {
    imageMessage: {
      mimetype: 'image/jpeg',
      caption: 'CacaChan',
      jpegThumbnail: fs.readFileSync('./media/caca.jpg'),
      viewOnce: true
    }
  }
}
		faketeks = '*CacaBot © Fadly ID*'
		const isUrl = (url) => {
        return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
        }
        const reply = (teks) => {
            fadly.sendMessage(from, teks, text, {quoted:mek})
        }
        const sendMess = (hehe, teks) => {
            fadly.sendMessage(hehe, teks, text)
        }
        const mentions = (teks, memberr, id) => {
            (id == null || id == undefined || id == false) ? fadly.sendMessage(from, teks.trim(), extendedTextMessage, { contextInfo: { "mentionedJid": memberr } }) : fadly.sendMessage(from, teks.trim(), extendedTextMessage, { quoted: fakevo, contextInfo: { "mentionedJid": memberr } })
        }
        const caca = fs.readFileSync ('./media/thumb.jpg')
        const costum = (pesan, tipe, target, target2) => {
			fadly.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
		}
		
const hour_now = moment().format('HH')
var ucapanWaktu = 'Selamat Pagi🌄'
if (hour_now >= '03' && hour_now <= '10') {
ucapanWaktu = 'Selamat Pagi🌄'
} else if (hour_now >= '10' && hour_now <= '14') {
ucapanWaktu = 'Selamat Siang☀️'
} else if (hour_now >= '14' && hour_now <= '17') {
ucapanWaktu = 'Selamat Sore🌇'
} else if (hour_now >= '17' && hour_now <= '18') {
ucapanWaktu = 'Selamat Sore🌇'
} else if (hour_now >= '18' && hour_now <= '23') {
ucapanWaktu = 'Selamat Malam🌃'
} else {
ucapanWaktu = 'Selamat Malam🌃'
}

		const runtime = function (seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " Hari, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " Jam, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " Menit, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " Detik") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
var ase = new Date();
                        var jamss = ase.getHours();
                         switch(jamss){
                case 0: jamss = "Jangan gadang kak"; break;
                case 1: jamss = "Jangan gadang kak"; break;
                case 2: jamss = "Jangan gadang kak"; break;
                case 3: jamss = "Jangan gadang kak"; break;
                case 4: jamss = "Jangan lupa sholat Subuh kak"; break;
                case 5: jamss = "Selamat pagi"; break;
                case 6: jamss = "Selamat pagi"; break;
                case 7: jamss = "Selamat pagi"; break;
                case 8: jamss = "Selamat pagi"; break;
                case 9: jamss = "Selamat pagi"; break;
                case 10: jamss = "Selamat pagi"; break;
                case 11: jamss = "Selamat siang"; break;
                case 12: jamss = "Jangan lupa sholat Dzuhur kak"; break;
                case 13: jamss = "Selamat siang"; break;
                case 14: jamss = "Selamat sore"; break;
                case 15: jamss = "Jangan lupa sholat Ashar kak"; break;
                case 16: jamss = "Selamat sore"; break;
                case 17: jamss = "Selamat sore"; break;
                case 18: jamss = "Selamat malam"; break;
                case 19: jamss = "Jangan lupa sholat Isya kak"; break;
                case 20: jamss = "Selamat malam"; break;
                case 21: jamss = "Selamat malam"; break;
                case 22: jamss = "Selamat malam"; break;
                case 23: jamss = "Selamat malam"; break;
            }
            var tampilUcapan = "" + jamss;
            const sotoy = ['🍊 : 🍒 : 🍐','🍒 : 🔔 : 🍊','🍇 : 🍇 : 🍇','🍊 : 🍋 : 🔔','🔔 : 🍒 : 🍐','🔔 : 🍒 : 🍊','🍊 : 🍋 : 🔔',		'🍐 : 🍒 : 🍋','🍐 : 🍐 : 🍐','🍊 : 🍒 : 🍒','🔔 : 🔔 : 🍇','🍌 : 🍒 : 🔔','🍐 : 🔔 : 🔔','🍊 : 🍋 : 🍒','🍋 : 🍋 : 🍌','🔔 : 🔔 : 🍇','🔔 : 🍐 : 🍇','🔔 : 🔔 : 🔔','🍒 : 🍒 : 🍒','🍌 : 🍌 : 🍌']
            const sotoy2 = ['🍊 : 🍒 : 🍐','🍒 : 🔔 : 🍊','🍊 : 🍋 : 🔔','🔔 : 🍒 : 🍐','🔔 : 🍒 : 🍊','🍊 : 🍋 : 🔔',		'🍐 : 🍒 : 🍋','🍊 : 🍒 : 🍒','🔔 : 🔔 : 🍇','🍌 : 🍒 : 🔔','🍐 : 🔔 : 🔔','🍊 : 🍋 : 🍒','🍋 : 🍋 : 🍌','🔔 : 🔔 : 🍇','🔔 : 🍐 : 🍇']
            const sotoy1 = ['🍊 : 🍒 : 🍐','🍒 : 🔔 : 🍊','🍊 : 🍋 : 🔔','🔔 : 🍒 : 🍐','🔔 : 🍒 : 🍊','🍊 : 🍋 : 🔔',		'🍐 : 🍒 : 🍋','🍊 : 🍒 : 🍒','?? : 🔔 : 🍇','🍌 : 🍒 : 🔔','🍐 : 🔔 : 🔔','🍊 : 🍋 : 🍒','🍋 : 🍋 : 🍌','🔔 : 🔔 : 🍇','🔔 : 🍐 : 🍇']
            const sotoy3 = ['🔔 : 🔔 : 🔔','🍒 : 🍒 : 🍒','🍌 : 🍌 : 🍌']
            const buruh1 = ['🐳','🦈','🐬','🐋','🐟','🐠','🦐','🦑','🦀','🐚']
            const buruh2 = ['🐔','🦃','🐿','🐐','🐏','🐖','🐑','🐎','🐺','🦩']
            const buruh3 = ['🦋','🕷','🐝','🐉','🦆','🦅','🕊','🐧','🐦','🦇']
            const buruh11 = buruh1[Math.floor(Math.random() * (buruh1.length))]
		    const buruh22 = buruh2[Math.floor(Math.random() * (buruh2.length))]
		    const buruh33 = buruh3[Math.floor(Math.random() * (buruh3.length))]
        const sticOk = (hehe) => {
			ano = fs.readFileSync('./media/ok.webp')
			fadly.sendMessage(hehe, ano, sticker, { quoted: fakevo})
		}
		idttt = []
	    ers1 = []
	    ers2 = []
	    gilir = []
	    for (let t of ky_ttt){
	    idttt.push(t.id)
	    ers1.push(t.er1)
	    ers2.push(t.er2)
	    gilir.push(t.gilir)
	    }
	    const isTTT = isGroup ? idttt.includes(from) : false
	    iser1 = isGroup ? ers1.includes(sender) : false
        iser2 = isGroup ? ers2.includes(sender) : false
		
//━━━━━━━━━━━━━━━[ BUTTON ]━━━━━━━━━━━━━━━━━//

        const sendButton = async (from, context, fortext, but, mek) => {
            buttonMessages = {
                contentText: context,
                footerText: fortext,
                buttons: but,
                headerType: 1
            }
            fadly.sendMessage(from, buttonMessages, buttonsMessage, {
                quoted: fakevo
            })
        }
        const sendButImage = async (from, context, fortext, img, but, mek) => {
            jadinya = await fadly.prepareMessage(from, img, image)
            buttonMessagesI = {
                imageMessage: jadinya.message.imageMessage,
                contentText: context,
                footerText: fortext,
                buttons: but,
                headerType: 4
            }
            fadly.sendMessage(from, buttonMessagesI, buttonsMessage, {
                quoted: ftrol,
            })
        }
        async function sendButLocation(id, text1, desc1, gam1, but = [], options = {}) {
            const buttonMessages = { locationMessage: { jpegThumbnail: gam1 }, contentText: text1, footerText: desc1, buttons: but, headerType: 6 }
            return fadly.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }

//━━━━━━━━━━━━━━━[ FAKE FAKEAN ]━━━━━━━━━━━━━━━━━//
        const fakestatus = (teks) => {
            fadly.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": faketeks,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./media/caca.jpg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }
        fadly.chatRead(from, "read")
        const fakegroup = (teks) => {
            fadly.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289523258649-1604595598@g.us" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": faketeks,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./media/caca.jpg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }
        const ftrol = {
	key : {
                          participant : '0@s.whatsapp.net'
                        },
       message: {
                    orderMessage: {
                            itemCount : 123,
                            status: 1,
                            surface : 1,
                            message: `SUBSCRIBE FADLY ID`, 
                            orderTitle: `SUBSCRIBE FADLY ID`,
                            thumbnail: caca, //Gambarnye
                            sellerJid: '0@s.whatsapp.net' 
                          }
                        }
                      }
        
//━━━━━━━━━━━━━━━[ CONNECTION 2 ]━━━━━━━━━━━━━━━━━//

const sendWebp = async(to, url) => {
var names = Date.now() / 10000;
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, './sticker' + names + '.png', async function () {
console.log('selesai');
let filess = './sticker' + names + '.png'
let asw = './sticker' + names + '.webp'
exec(`ffmpeg -i ${filess} -vf "scale=512:512:force_original_aspect_ratio=increase,fps=40, crop=512:512" ${asw}`, (err) => {
fs.unlinkSync(filess)
if (err) return reply(`${err}`)
exec(`webpmux -set exif ./stik/data.exif ${asw} -o ${asw}`, async (error) => {
if (error) return reply(`${error}`)
fadly.sendMessage(from, fs.readFileSync(asw), sticker, {sendEphemeral:true, quoted:mek})
fs.unlinkSync(asw)
});
});
});
}
const sendStickerUrl = async(to, url) => {
console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Downloading sticker...'))
var names = getRandom('.webp')
var namea = getRandom('.png')
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, namea, async function () {
let filess = namea
let asw = names
require('./lib/exif.js')
exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
exec(`webpmux -set exif ./stik/data.exif ${asw} -o ${asw}`, async (error) => {
let media = fs.readFileSync(asw)
fadly.sendMessage(to, media, sticker)
console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Succes send sticker...'))
});
});
});
}
        const sendMediaURL = async(to, url, text="", mids=[]) =>{
                if(mids.length > 0){
                    text = normalizeMention(to, text, mids)
                }
                const fn = Date.now() / 10000;
                const filename = fn.toString()
                let mime = ""
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        mime = res.headers['content-type']
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, filename, async function () {
                    console.log('done');
                    let media = fs.readFileSync(filename)
                    let type = mime.split("/")[0]+"Message"
                    if(mime === "image/gif"){
                        type = MessageType.video
                        mime = Mimetype.gif
                    }
                    if(mime.split("/")[0] === "audio"){
                        mime = Mimetype.mp4Audio
                    }
                    fadly.sendMessage(to, media, type, { quoted: fakevo, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
                    fs.unlinkSync(filename)
                });
            }   
            if (budy.includes("https://chat.whatsapp.com/")) {
if (!isGroup) return
if (!isAntiLink) return
if (isGroupAdmins) return
var kic = `${sender.split("@")[0]}@s.whatsapp.net`
reply(` *「 GROUP LINK DETECTOR 」*\nKamu mengirimkan link grup chat, maaf kamu di kick dari grup :(`)
setTimeout(() => {
fadly.groupRemove(from, [kic]).catch((e) => { reply(`BOT HARUS JADI ADMIN`) })
}, 0)
}

		if (budy.length > 3500) {
if (!isGroup) return
if (!isAntiVirtex) return
if (isGroupAdmins) return
reply('Tandai telah dibaca\n'.repeat(300))
reply(`「 *VIRTEX DETECTOR* 」\n\nKamu mengirimkan virtex, maaf kamu di kick dari group :(`)
console.log(color('[KICK]', 'red'), color('Received a virus text!', 'yellow'))
fadly.groupRemove(from, [sender])
}
if (isCmd && !isUser){
          pendaftar.push(sender)
          fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
        }
let authorname = fadly.contacts[from] != undefined ? fadly.contacts[from].vname || fadly.contacts[from].notify : undefined	
if (authorname != undefined) { } else { authorname = groupName }	
function addMetadata(packname, author) {	
if (!packname) packname = 'WABot'; if (!author) author = 'Bot';author = author.replace(/[^a-zA-Z0-9]/g, '');	
let name = `${author}_${packname}`
if (fs.existsSync(`./stik/${name}.exif`)) return `./stik/${name}.exif`
const json = {	
"sticker-pack-name": packname,
"sticker-pack-publisher": author,
}
const buf2 = Buffer.from(last, "hex")	
const buf3 = Buffer.from(bytes)	
const buf4 = Buffer.from(JSON.stringify(json))	
const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])
fs.writeFile(`./stik/${name}.exif`, buffer, (err) => {	
return `./stik/${name}.exif`	
})	
}
const add = function(from, orangnya){
fadly.groupAdd(from, orangnya)
}

//━━━━━━━━━━━━━━━[ CONNECTION 3 ]━━━━━━━━━━━━━━━━━//

		colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
      	if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
      	//if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mTEXT\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
     	if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
      	//if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mTEXT\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
        if (!publik) {
		if (!isOwner && !mek.key.fromMe) return
		}
		// Sewa
		_sewa.expiredCheck(fadly, sewa)
// Mute
if (isMuted){
if (!isGroupAdmins && !isPremium) return
 }
const getWin = (userId) => {
let position = false
Object.keys(_win).forEach((i) => {
if (_win[i].jid === userId) {
position = i
}
})
if (position !== false) {
return _win[position].win
}
}
		
//━━━━━━━━━━━━━━━[ MENU ]━━━━━━━━━━━━━━━━━//

switch (command) {
case 'menu':
case 'help':
menu =
`*Hai Kak ${pushname}*

*Support Fadly ID*
• *Instagram :*
> https://instagram.com/xdlyy444
• *YouTube :*
> https://youtube.com/c/XDLYY
• *Github :*
> https://github.com/xdlyy404
• *Rest Api :*
> https://api-fadly.herokuapp.com
• Sawer Saya🗿 :
> https://saweria.co/xdlyy`
fadly.sendMessage(from, { contentText: `${menu}`, footerText: `*Jika Button Tidak Muncul, Ketik #allmenu*\n_*Regards : Fadly ID*_`, buttons: [{ buttonId: `${prefix}allmenu`, buttonText: { displayText: 'Menu Bot' }, type: 1 }, { buttonId: `${prefix}sewabot`, buttonText: { displayText: 'Sewa Bot' }, type: 1 }, { buttonId: `${prefix}infobot`, buttonText: { displayText: 'Syarat & Ketentuan' }, type: 1 } ], headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: caca, contextInfo: {mentionedJid: [sender, owner]}}}, 'buttonsMessage')
break
case 'allmenu':
case 'menuall':
mot = 'ℜ⃟🐣'
teks =
`*${ucapanWaktu} ${pushname}*`

teks2 =
`「 *Bot Info* 」
🤖Nama Bot : ${botname}
🌍Language : JavaScript
🗄️Library : Baileys
👥Pengguna : ${pendaftar.length}
🎲Prefix : *「 ${prefix} 」*
⌛Runtime : ${runtime(process.uptime())}

「 *Owner Info* 」
👑Nama Owner : ${ownername}
🪀WhatsApp : wa.me/${owner}
💌Email : cacachan970@gmail.com

「 *User Info* 」
🎅Nama User : ${pushname}
🔥Api : wa.me/${sender.split("@")[0]}
🌪️Status : ${isOwner ? 'Owner' : 'User'}
💰Premium : ${isPremium ? 'Ya' : 'No'}

「 *To Day* 」
${tampilUcapan}
⏰Jam : ${time}
💮Hari : ${week} ${weton}
📅Tanggal : ${calender}

❒  ⌜ *Group Menu* ⌟ ❒
${mot} ${prefix}antilink
${mot} ${prefix}welcome
${mot} ${prefix}antivirtex
${mot} ${prefix}group
${mot} ${prefix}linkgrup
${mot} ${prefix}promote
${mot} ${prefix}demote
${mot} ${prefix}add
${mot} ${prefix}kick
${mot} ${prefix}ceksewa
${mot} ${prefix}listsewa
${mot} ${prefix}cekpremium
${mot} ${prefix}listpremium
${mot} ${prefix}listonline
${mot} ${prefix}setpp
${mot} ${prefix}setdesc
${mot} ${prefix}setname
${mot} ${prefix}hidetag
${mot} ${prefix}culik
${mot} ${prefix}infogrup

❒ ⌜ *Jb Menu* ⌟ ❒
${mot} ${prefix}store

❒ ⌜ *Random Meme* ⌟ ❒
${mot} ${prefix}meme
${mot} ${prefix}darkjoke
${mot} ${prefix}memeindo

❒ ⌜ *Sticker Menu* ⌟ ❒
${mot} ${prefix}attp
${mot} ${prefix}ttp
${mot} ${prefix}take
${mot} ${prefix}swm
${mot} ${prefix}sticker
${mot} ${prefix}tomp3
${mot} ${prefix}tovideo
${mot} ${prefix}triggered
${mot} ${prefix}wasted
${mot} ${prefix}smoji
${mot} ${prefix}smoji2

❒ ⌜ *Owner Menu* ⌟ ❒
${mot} ${prefix}mode
${mot} ${prefix}owner
${mot} ${prefix}bc
${mot} ${prefix}exif
${mot} ${prefix}premium add/del
${mot} ${prefix}sewa add/del
${mot} ${prefix}join
${mot} ${prefix}eval
${mot} ${prefix}getquoted

❒ ⌜ *Download Menu* ⌟ ❒
${mot} ${prefix}play
${mot} ${prefix}ytsearch
${mot} ${prefix}ytmp4
${mot} ${prefix}telesticker
${mot} ${prefix}tiktok
${mot} ${prefix}tiktokmusic
${mot} ${prefix}pinterest
${mot} ${prefix}igdl
${mot} ${prefix}spotify
${mot} ${prefix}spotifysearch
${mot} ${prefix}jooxplay
${mot} ${prefix}twtdl
${mot} ${prefix}fbdl
${mot} ${prefix}zippyshare

❒ ⌜ *Movie & Story* ⌟ ❒
${mot} ${prefix}lk21
${mot} ${prefix}drakorongoing
${mot} ${prefix}wattpad
${mot} ${prefix}wattpadsearch
${mot} ${prefix}cerpen
${mot} ${prefix}ceritahoror

❒ ⌜ *Anime Menu* ⌟ ❒
${mot} ${prefix}character
${mot} ${prefix}manga
${mot} ${prefix}anime
${mot} ${prefix}kusonimesearch
${mot} ${prefix}otakudesusearch
${mot} ${prefix}nhentaisearch
${mot} ${prefix}nekopoisearch

❒ ⌜ *Info Menu* ⌟ ❒
${mot} ${prefix}kbbi
${mot} ${prefix}jarak
${mot} ${prefix}wikipedia
${mot} ${prefix}translate
${mot} ${prefix}jadwaltv
${mot} ${prefix}infogempa
${mot} ${prefix}cuaca
${mot} ${prefix}covidindo
${mot} ${prefix}covidglobal

❒ ⌜ *Random Text Menu* ⌟ ❒
${mot} ${prefix}quotes
${mot} ${prefix}quotesanime
${mot} ${prefix}quotesdilan
${mot} ${prefix}quotesimage
${mot} ${prefix}katabijak
${mot} ${prefix}randomnama

❒ ⌜ *Search Menu* ⌟ ❒
${mot} ${prefix}gimage
${mot} ${prefix}wallpapersearch
${mot} ${prefix}playstore
${mot} ${prefix}shopee
${mot} ${prefix}google
${mot} ${prefix}lirik

❒ ⌜ *Primbon Menu* ⌟ ❒
${mot} ${prefix}artinama
${mot} ${prefix}jodoh
${mot} ${prefix}jadian
${mot} ${prefix}tebakumur
${mot} ${prefix}wangy
${mot} ${prefix}cekmati
${mot} ${prefix}toxic
${mot} ${prefix}citacita
${mot} ${prefix}rate
${mot} ${prefix}cekganteng
${mot} ${prefix}cekcantik
${mot} ${prefix}cekwatak
${mot} ${prefix}hobby
${mot} ${prefix}apakah
${mot} ${prefix}bisakah
${mot} ${prefix}kapankah

❒ ⌜ *Stalk Menu* ⌟ ❒
${mot} ${prefix}stalkig
${mot} ${prefix}stalktiktok
${mot} ${prefix}stalkgithub

❒ ⌜ *Maker Menu* ⌟ ❒
${mot} ${prefix}sertiff
${mot} ${prefix}pemandangan
${mot} ${prefix}pemandangan3d

❒ ⌜ *Wallpaper Menu* ⌟ ❒
${mot} ${prefix}wallpaperteknologi
${mot} ${prefix}wallpaperprograming
${mot} ${prefix}wallpapercyberspace
${mot} ${prefix}wallpapermuslim
${mot} ${prefix}wallpapermountainview

❒ ⌜ *Random Image Menu* ⌟ ❒
${mot} ${prefix}art
${mot} ${prefix}bts
${mot} ${prefix}exo
${mot} ${prefix}elf
${mot} ${prefix}loli
${mot} ${prefix}neko
${mot} ${prefix}waifu
${mot} ${prefix}shota
${mot} ${prefix}husbu
${mot} ${prefix}sagiri
${mot} ${prefix}shinobu
${mot} ${prefix}megumin
${mot} ${prefix}wallnime
${mot} ${prefix}chiisaihentai
${mot} ${prefix}trap
${mot} ${prefix}blowjob
${mot} ${prefix}yaoi
${mot} ${prefix}ecchi
${mot} ${prefix}hentai
${mot} ${prefix}ahegao
${mot} ${prefix}hololewd
${mot} ${prefix}sideoppai
${mot} ${prefix}animefeets
${mot} ${prefix}animebooty
${mot} ${prefix}animethighss
${mot} ${prefix}animearmpits
${mot} ${prefix}hentaifemdom
${mot} ${prefix}lewdanimegirls
${mot} ${prefix}biganimetiddies
${mot} ${prefix}hentai4everyone

❒ ⌜ *TextProMe Menu* ⌟ ❒
${mot} ${prefix}blackpink
${mot} ${prefix}neon
${mot} ${prefix}greenneon
${mot} ${prefix}advanceglow
${mot} ${prefix}futureneon
${mot} ${prefix}sandwriting
${mot} ${prefix}sandsummer
${mot} ${prefix}sandengraved
${mot} ${prefix}metaldark
${mot} ${prefix}neonlight
${mot} ${prefix}holographic
${mot} ${prefix}text1917
${mot} ${prefix}minion
${mot} ${prefix}deluxesilver
${mot} ${prefix}newyearcard
${mot} ${prefix}bloodfrosted
${mot} ${prefix}halloween
${mot} ${prefix}jokerlogo
${mot} ${prefix}fireworksparkle
${mot} ${prefix}natureleaves
${mot} ${prefix}bokeh
${mot} ${prefix}toxic
${mot} ${prefix}strawberry
${mot} ${prefix}box3d
${mot} ${prefix}roadwarning
${mot} ${prefix}breakwall
${mot} ${prefix}luxury
${mot} ${prefix}cloud
${mot} ${prefix}horrorblood
${mot} ${prefix}thunder
${mot} ${prefix}pornhub
${mot} ${prefix}avenger
${mot} ${prefix}space
${mot} ${prefix}ninjalogo

❒ ⌜ *PhotoOxy Menu* ⌟ ❒
${mot} ${prefix}shadow
${mot} ${prefix}cup
${mot} ${prefix}cup1
${mot} ${prefix}romance
${mot} ${prefix}smoke
${mot} ${prefix}burnpaper
${mot} ${prefix}lovemessage
${mot} ${prefix}undergrass
${mot} ${prefix}love
${mot} ${prefix}coffe
${mot} ${prefix}woodheart
${mot} ${prefix}woodenboard
${mot} ${prefix}summer3d
${mot} ${prefix}wolfmetal
${mot} ${prefix}nature3d
${mot} ${prefix}underwater
${mot} ${prefix}golderrose
${mot} ${prefix}summernature
${mot} ${prefix}letterleaves
${mot} ${prefix}glowingneon
${mot} ${prefix}fallleaves
${mot} ${prefix}flamming
${mot} ${prefix}harrypotter
${mot} ${prefix}carvedwood
${mot} ${prefix}tiktok
${mot} ${prefix}arcade8bit
${mot} ${prefix}battlefield4
${mot} ${prefix}pubg

❒ ⌜ *Ephoto 360 Menu* ⌟ ❒
${mot} ${prefix}wetglass
${mot} ${prefix}multicolor3d
${mot} ${prefix}watercolor
${mot} ${prefix}luxurygold
${mot} ${prefix}galaxywallpaper
${mot} ${prefix}lighttext
${mot} ${prefix}beautifulflower
${mot} ${prefix}puppycute
${mot} ${prefix}royaltext
${mot} ${prefix}heartshaped
${mot} ${prefix}birthdaycake
${mot} ${prefix}galaxystyle
${mot} ${prefix}hologram3d
${mot} ${prefix}greenneon
${mot} ${prefix}glossychrome
${mot} ${prefix}greenbush
${mot} ${prefix}metallogo
${mot} ${prefix}noeltext
${mot} ${prefix}glittergold
${mot} ${prefix}textcake
${mot} ${prefix}starsnight
${mot} ${prefix}wooden3d
${mot} ${prefix}textbyname
${mot} ${prefix}writegalacy
${mot} ${prefix}galaxybat
${mot} ${prefix}snow3d
${mot} ${prefix}birthdayday
${mot} ${prefix}goldplaybutton
${mot} ${prefix}silverplaybutton
${mot} ${prefix}freefire

❒ ⌜ *Asupan Menu* ⌟ ❒
${mot} ${prefix}asupan
${mot} ${prefix}asupancecan
${mot} ${prefix}asupanhijaber
${mot} ${prefix}asupansantuy
${mot} ${prefix}asupanukhti
${mot} ${prefix}asupanbocil
${mot} ${prefix}asupanghea
${mot} ${prefix}asupanrika

❒ ⌜ *Cecan Menu* ⌟ ❒
${mot} ${prefix}cecanvietnam
${mot} ${prefix}cecanmalaysia
${mot} ${prefix}cecankorea
${mot} ${prefix}cecanindonesia
${mot} ${prefix}cecanjapan
${mot} ${prefix}cecanthailand

❒ ⌜ *Game Menu* ⌟ ❒
${mot} ${prefix}tictactoe
${mot} ${prefix}delttt
${mot} ${prefix}tebakgambar
${mot} ${prefix}slot
${mot} ${prefix}tebakkimia
${mot} ${prefix}tebaklirik
${mot} ${prefix}tebakjenaka
${mot} ${prefix}truth
${mot} ${prefix}dare
${mot} ${prefix}tebaktebakan
${mot} ${prefix}tebakkalimat
${mot} ${prefix}tembak

❒ ⌜ *Info Bot Menu* ⌟ ❒
${mot} ${prefix}info
${mot} ${prefix}sewabot
${mot} ${prefix}donasi
${mot} ${prefix}runtime
${mot} ${prefix}ping
${mot} ${prefix}report

❒ ⌜ *Islami Menu* ⌟ ❒
${mot} ${prefix}listsurah
${mot} ${prefix}alquran
${mot} ${prefix}alquranaudio
${mot} ${prefix}asmaulhusna
${mot} ${prefix}kisahnabi
${mot} ${prefix}jadwalsholat

❒ ⌜ *Tools Menu* ⌟ ❒
${mot} ${prefix}nuliskiri
${mot} ${prefix}nuliskanan
${mot} ${prefix}foliokiri
${mot} ${prefix}foliokanan

❒ ⌜ *Other Menu* ⌟ ❒
${mot} ${prefix}ssweb
${mot} ${prefix}ssweb2
${mot} ${prefix}shortlink
${mot} ${prefix}spamsms

❒ ⌜ *Sound Menu* ⌟ ❒
${mot} ${prefix}sound1
${mot} ${prefix}sound2
${mot} ${prefix}sound3
${mot} ${prefix}sound4
${mot} ${prefix}sound5
${mot} ${prefix}sound6
${mot} ${prefix}sound7
${mot} ${prefix}sound8
${mot} ${prefix}sound9
${mot} ${prefix}sound10
${mot} ${prefix}sound11
${mot} ${prefix}sound12
${mot} ${prefix}sound13
${mot} ${prefix}sound14
${mot} ${prefix}sound15

❒ ⌜ *18+ Menu* ⌟ ❒
${mot} ${prefix}bokep1
${mot} ${prefix}bokep2
${mot} ${prefix}bokep3
${mot} ${prefix}bokep4
${mot} ${prefix}bokep5
${mot} ${prefix}bokep6
${mot} ${prefix}bokep7
${mot} ${prefix}bokep8
${mot} ${prefix}bokep9
${mot} ${prefix}bokep10
${mot} ${prefix}bokep11
${mot} ${prefix}bokep12
${mot} ${prefix}bokep13
${mot} ${prefix}bokep14
${mot} ${prefix}bokep15

「 *Special Thanks To* 」
• Allah SWT
• Orang Tua
• Fadly ID
• Ramlan ID
• ZeroYT7
• Ndyie Botz
• Penyedia Module
• Adiwajshing/Baileys

_*Regards : Fadly ID*_
`
fadly.sendMessage(from, { contentText: `${teks}`, footerText: `${teks2}`, buttons: [{ buttonId: `${prefix}donasi`, buttonText: { displayText: 'Donasi' }, type: 1 }, { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner' }, type: 1 } ], headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: caca, contextInfo: {mentionedJid: [sender, owner]}}}, 'buttonsMessage')
break

//━━━━━━━━━━━━━━━[ FITUR SHOP ]━━━━━━━━━━━━━━━━━//

case 'store':
case 'shop':
case 'jbmenu':
rows:
rows1 = [

    {
        
        title: 'Voucher Game',
        description: "Layanan Top Up Game Online",
        rowId: `${prefix}shop1`

    },
     {
        title: 'Pulsa Reguler',
        description: "Layanan Pulsa All Operator",
        rowId: `${prefix}shop2`
     },
     {
        title: 'Paket Internet',
        description: "Layanan Paket Internet",
        rowId: `${prefix}shop3`
  
     },
     {
  
        title: 'Token PLN',
        description: "Layanan Token Listrik",
        rowId: `${prefix}shop4`
     },
     {
        title: 'Saldo E-Money',
        description: "Layanan Saldo E-Money",
        rowId: `${prefix}shop5`
     },
     {
        title: 'Social Media',
        description: "Layanan Social Media Booster",
        rowId: `${prefix}shop6`
     },
     {
        title: 'Produk Digital Lainnya',
        description: "Layanan Produk Digital Lainnya",
        rowId: `${prefix}shop7`
     }
]
rows2 = [

    {
        title: 'PROMO',
        description: "Info Produk Yang Lagi Promo",
        rowId: `${prefix}promo1`
     }
]
rows3 = [

    {
        title: 'ALL PAYMENT',
        description: "",
        rowId: `${prefix}payment`
     }
]
rows4 = [

    {
        title: 'LINK GROUP',
        description: "ORDER DISINI YA",
        rowId: `${prefix}gcstore`
     }
]
sections = [
{ title: "FADLY ID STORE", rows: rows1 },
{ title: "PROMO", rows: rows2 },
{ title: "ALL PAYMENT", rows: rows3 },
{ title: "GROUP STORE", rows: rows4 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Hallo ${pushname}\nPilih Store Menu Disini Ya\n\n${tampilUcapan}\nJam : ${time} WIB\nHari : ${week} ${weton}\nTanggal : ${calender}`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break

case 'promo1':
teks =
`*PROMO DM FF*

140 💎 Rp 17.000 ( 1 slot )
70 💎 Rp 8.750 ( 4 slot )

Format order :
ID :
JUMLAH :

Syarat Follow Instagram
https://instagram.com/ramlanstore.id/
https://instagram.com/xdlyy444/`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'payment':
teks =`Mau Bayar Lewat Apa?`
but = [
          { buttonId: `${prefix}gopay`, buttonText: { displayText: 'GOPAY' }, type: 1 },
          { buttonId: `${prefix}dana`, buttonText: { displayText: 'DANA' }, type: 1 },
          { buttonId: `${prefix}ovo`, buttonText: { displayText: 'OVO' }, type: 1 }
        ]
        sendButton(from, teks, faketeks, but, fakevo)
break               
case 'gcstore':
teks =
`*ORDER DI GROUP BAPACK RAMLAN ID*

https://chat.whatsapp.com/LFyx2LEVnBF1ZwkXKg1fNO`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

//━━━━━━━━━━━━━━━[ FITUR SHOP1 ]━━━━━━━━━━━━━━━━━//

case 'shop1':
rows:
rows1 = [

    {
        
        title: 'FREE FIRE',
        description: "Layanan Top Up Free Fire",
        rowId: `${prefix}jb1`

    },
     {
        title: 'MOBILE LEGENDS A',
        description: "Layanan Top Up Mobile Legends",
        rowId: `${prefix}jb2`
     },
     {
        title: 'MOBILE LEGENDS B',
        description: "Layanan Top Up Mobile Legends",
        rowId: `${prefix}jb11`
     },
     {
        title: 'PUBG MOBILE',
        description: "Layanan Top Up Pubg Mobile",
        rowId: `${prefix}jb3`
  
     },
     {
  
        title: 'CALL OF DUTY',
        description: "Layanan Top Up Call Of Duty",
        rowId: `${prefix}jb4`
     },
     {
        title: 'HIGGS DOMINO A',
        description: "Layanan Top Up Higgs Domino",
        rowId: `${prefix}jb5`
     },
     {
        title: 'HIGGS DOMINO B',
        description: "Layanan Top Up Higgs Domino",
        rowId: `${prefix}jb12`
     },
     {
        title: 'POINT BLANK',
        description: "Layanan Top Up Point Blank",
        rowId: `${prefix}jb6`
     },
     {
        title: 'SAUSAGE MAN',
        description: "Layanan Top Up Sausage Man",
        rowId: `${prefix}jb7`
     },
     {
        title: 'VALORANT',
        description: "Layanan Top Up Valorant",
        rowId: `${prefix}jb8`
     },
     {
        title: 'ARENA OF VALOR',
        description: "Layanan Top Up Arena Of Valor",
        rowId: `${prefix}jb9`
     },
     {
        title: 'GENSHIN IMPACT',
        description: "Layanan Top Up Genshin Impact",
        rowId: `${prefix}jb10`
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Gamenya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break

case 'jb1':
teks =
`*DROP DATA DIAMOND FF*
• VIA ID
• LEGAL 100%
• PROSES 1-3 MENIT

*50 💎 Rp 6.588*
*70 💎 Rp 9.059*
*100 💎 Rp 13.176*
*140 💎 Rp 18.117*
*210 💎 Rp 27.176*
*355 💎 Rp 45.293*
*500 💎 Rp 64.233*
*720 💎 Rp 90.585*
*1000 💎 Rp 126.819*
*2000 💎 Rp 247.050*
*4000 💎 Rp 494.100*

*Member Mingguan Rp 27.450*
*Member Bulanan Rp 137.250*

Note : 
• Harga sewaktu waktu berubah
• Pastikan ID Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb2':
teks =
`*DROP DATA DIAMOND ML A*
• VIA ID & SERVER
• LEGAL 100%
• PROSES 1-5 MENIT

*86 💎 Rp 19.435*
*172 💎 Rp 38.870*
*257 💎 Rp 58.305*
*344 💎 Rp 77.740*
*429 💎 Rp 97.175*
*514 💎 Rp 116.610*
*600 💎 Rp 136.045*
*706 💎 Rp 155.480*
*878 💎 Rp 194.350*
*963 💎 Rp 213.785*
*1412 💎 Rp 310.960*
*2195 💎 Rp 462.254*
*3688 💎 Rp 768.430*
*4394 💎 Rp 913.952*
*5532 💎 Rp 1.154.140*
*9288 💎 Rp 1.922.570*

*Starlight Membership Bonus 12 💎 Rp 95.000*
*Twilight Pass [PROMO]  Rp 95.000*
*Starlight Membership  Rp 128.271*
*Twilight  Rp 128.271*
*Starlight Membership Plus [PROMO] Rp 250.000*
*Mobile Legend Member Plus Rp 290.000*

Note : 
• Harga sewaktu waktu berubah
• Pastikan ID & Server Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb11':
teks =
`*DROP DATA DIAMOND ML B*
• VIA ID & SERVER
• LEGAL 100%
• PROSES 1-5 MENIT

*39 💎 Rp 8.580*
*65 💎 Rp 14.300*
*92 💎 Rp 19.780*
*133 💎 Rp 28.595*
*266 💎 Rp 57.190*
*305 💎 Rp 65.575*
*400 💎 Rp 86.000*
*534 💎 Rp 114.810*
*670 💎 Rp 144.050*
*1342 💎 Rp 288.530*
*2700 💎 Rp 580.500*
*4150 💎 Rp 892.250*
*7050 💎 Rp 1.515.750*

Note : 
• Harga sewaktu waktu berubah
• Pastikan ID & Server Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb3':
teks =
`*DROP DATA UC PUBG*
• VIA ID
• LEGAL 100%
• PROSES 1-5 MENIT
• STOK UNLIMITED

*50 💸	Rp 9.820*
*100 💸	Rp 18.995*
*125 💸	Rp 23.170*
*150 💸	Rp 28.635*
*250 💸	Rp 46.380*
*500 💸	Rp 91.935*
*600 💸	Rp 100.760*
*700 💸	Rp 131.860*
*800 💸	Rp 150.110*
*1250 💸	Rp 230.660*
*1350 💸	Rp 260.610*
*1500 💸	Rp 275.635*
*2500 💸	Rp 455.635*
*3000 💸	Rp 541.110*
*3500 💸	Rp 625.610*
*4000 💸	Rp 719.610*
*5000 💸	Rp 920.610*
*7000 💸	Rp 1.330.410*

Note : 
• Harga sewaktu waktu berubah
• Pastikan ID Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb5':
teks =
`*DROP DATA CHIP HD A*
• VIA ID + NICK
• LEGAL 100%
• PROSES 1-5 MENIT
• STOK UNLIMITED

*1M Koin Emas-D Rp 305*
*10M Koin Emas-D Rp 2.130*
*15M Koin Emas-D Rp 2.280*
*30M Koin Emas-D Rp 4.680*
*60M Koin Emas-D Rp 5.780*
*100M Koin Emas-D Rp 12.680*
*200M Koin Emas-D Rp 17.474*
*400M Koin Emas-D Rp 34.579*
*600M Koin Emas-D Rp 53.180*
*1B Koin Emas-D Rp 66.080*
*2B Koin Emas-D Rp 134.080*
*3B Koin Emas-D Rp 201.030*
*4B Koin Emas-D Rp 267.980*
*5B Koin Emas-D Rp 335.205*
*6B Koin Emas-D Rp 401.880*
*7B Koin Emas-D Rp 468.830*

Note : 
• Harga sewaktu waktu berubah
• Pastikan ID Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb12':
teks =
`*DROP DATA CHIP HD B*
• VIA ID + NICK
• LEGAL 100%
• PROSES 1-10 MENIT

*100M 🪙 Rp 8.000*
*200M 🪙 Rp 15.000*
*300M 🪙 Rp 21.500*
*400M 🪙 Rp 28.500*
*500M 🪙 Rp 35.000*
*600M 🪙 Rp 40.000*
*700M 🪙 Rp 47.000*
*800M 🪙 Rp 54.000*
*900M 🪙 Rp 59.500*
*1B      🪙 Rp 64.500*
*5B      🪙 Rp 320.000*
*10B    🪙  Rp 640.000*

Note : 
• Harga sewaktu waktu berubah
• Pastikan ID Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb4':
teks =
`*DROP DATA CP CODM*
• VIA OPEN ID / BIND FB
• LEGAL 100%
• PROSES 1-5 MENIT
• STOK UNLIMITED

*26 🪙 Rp 5.410*
*53 🪙 Rp 10.210*
*106 🪙 Rp 19.710*
*264 🪙 Rp 48.210*
*528 🪙 Rp 95.710*
*1056 🪙 Rp 190.910*
*1584 🪙 Rp 285.985*
*2640 🪙 Rp 476.010*
*5280 🪙 Rp 952.110*
*10560 🪙 Rp 1.935.610*
*26400 🪙 Rp 4.840.610*
*52800 🪙 Rp 9.675.610*

Note : 
• Harga sewaktu waktu berubah
• Pastikan ID Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb6':
teks =
`*DROP DATA CASH PB*
• VIA ID
• LEGAL 100%
• PROSES 1-5 MENIT
• STOK UNLIMITED

*1200 PB Cash Rp 10.310*
*2400 PB Cash Rp 19.260*
*6000 PB Cash Rp 47.960*
*12000 PB Cash Rp 94.060*
*36000 PB Cash Rp 291.610*
*60000 PB Cash Rp 485.610*

Note : 
• Harga sewaktu waktu berubah
• Pastikan ID Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb7':
teks =
`*DROP DATA CANDY SM*
• VIA ID
• LEGAL 100%
• PROSES 1-5 MENIT
• STOK UNLIMITED

*60 Candy Rp 14.110*
*180 Candy Rp 39.610*
*300 Candy Rp 68.610*
*680 Candy Rp 135.610*
*1280 Candy Rp 244.635*
*1980 Candy Rp 404.610*
*3280 Candy Rp 699.610*
*6480 Candy Rp 1.350.610*

Note : 
• Harga sewaktu waktu berubah
• Pastikan ID Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb8':
teks =
`*DROP DATA POINTS VALORANT*
• VIA ID
• LEGAL 100%
• PROSES 1-5 MENIT
• STOK UNLIMITED

*420 Points Rp 51.610*
*700 Points Rp 81.610*
*1375 Points Rp 151.610*
*2400 Points Rp 251.610*
*4000 Points Rp 402.610*
*8150 Points Rp 805.610*

Note : 
• Harga sewaktu waktu berubah
• Pastikan ID Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb9':
teks =
`*DROP DATA VOUCHERS AOV*
• VIA ID
• LEGAL 100%
• PROSES 1-5 MENIT
• STOK UNLIMITED

*7 Vouchers Rp 2.510*
*18 Vouchers Rp 5.360*
*40 Vouchers Rp 10.110*
*90 Vouchers Rp 19.595*
*230 Vouchers Rp 46.610*
*470 Vouchers Rp 91.355*
*950 Vouchers Rp 188.235*
*1430 Vouchers Rp 275.960*
*2390 Vouchers Rp 470.910*
*4800 Vouchers Rp 911.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan ID Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'jb10':
teks =
`*DROP DATA CRYSTALS GI*
• VIA ID
• LEGAL 100%
• PROSES 1-5 MENIT
• STOK UNLIMITED

*60 Genesis Crystals Rp 14.610*
*300+30 Genesis Crystals Rp 70.610*
*980+110 Genesis Crystals Rp 210.610*
*1980+260 Genesis Crystals Rp 454.610*
*3280+600 Genesis Crystals Rp 730.610*
*6480+1600 Genesis Crystals Rp 1.450.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan ID Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

//━━━━━━━━━━━━━━━[ FITUR SHOP2 ]━━━━━━━━━━━━━━━━━//

case 'shop2':
rows:
rows1 = [

    {
        
        title: 'TELKOMSEL',
        description: "Layanan Pulsa Telkomsel",
        rowId: `${prefix}pulsa1`

    },
     {
        title: 'INDOSAT',
        description: "Layanan Pulsa Indosat",
        rowId: `${prefix}pulsa2`
     },
     {
        title: 'XL',
        description: "Layanan Pulsa XL",
        rowId: `${prefix}pulsa3`
  
     },
     {
  
        title: 'AXIS',
        description: "Layanan Pulsa Axis",
        rowId: `${prefix}pulsa4`
     },
     {
        title: 'THREE',
        description: "Layanan Pulsa Three",
        rowId: `${prefix}pulsa5`
     },
     {
        title: 'SMARTFREN',
        description: "Layanan Pulsa Smartfren",
        rowId: `${prefix}pulsa6`
     },
     {
        title: 'BY.U',
        description: "Layanan Pulsa By.U",
        rowId: `${prefix}pulsa7`
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Kartunya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break

case 'pulsa1':
teks =
`*DROP DATA PULSA TELKOMSEL*
• LEGAL 100%
• PROSES 1-5 MENIT

*Telkomsel 5.000 Rp 5.870*
*Telkomsel 10.000 Rp 10.785*
*Telkomsel 15.000 Rp 15.350*
*Telkomsel 20.000 Rp 20.480*
*Telkomsel 25.000 Rp 25.460*
*Telkomsel 30.000 Rp 30.120*
*Telkomsel 35.000 Rp 35.510*
*Telkomsel 40.000 Rp 39.685*
*Telkomsel 45.000 Rp 45.435*
*Telkomsel 50.000 Rp 50.285*
*Telkomsel 55.000 Rp 55.815*
*Telkomsel 60.000 Rp 60.480*
*Telkomsel 65.000 Rp 65.355*
*Telkomsel 70.000 Rp 71.160*
*Telkomsel 75.000 Rp 73.435*
*Telkomsel 80.000 Rp 80.155*
*Telkomsel 85.000 Rp 85.310*
*Telkomsel 90.000 Rp 90.080*
*Telkomsel 95.000 Rp 95.130*
*Telkomsel 100.000 Rp 97.255*
*Telkomsel 150.000 Rp 147.610*
*Telkomsel 200.000 Rp 198.135*
*Telkomsel 300.000 Rp 291.810*
*Telkomsel 500.000 Rp 489.635*
*Telkomsel 1.000.000 Rp 978.635*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'pulsa2':
teks =
`*DROP DATA PULSA INDOSAT*
• LEGAL 100%
• PROSES 1-5 MENIT

*Indosat 5.000 Rp 6.680*
*Indosat 10.000 Rp 11.280*
*Indosat 12.000 Rp 12.545*
*Indosat 15.000 Rp 15.545*
*Indosat 20.000 Rp 20.450*
*Indosat 25.000 Rp 25.505*
*Indosat 30.000 Rp 30.035*
*Indosat 50.000 Rp 49.585*
*Indosat 60.000 Rp 59.520*
*Indosat 80.000 Rp 78.820*
*Indosat 90.000 Rp 87.535*
*Indosat 100.000 Rp 97.410*
*Indosat 125.000 Rp 121.335*
*Indosat 150.000 Rp 143.935*
*Indosat 175.000 Rp 167.110*
*Indosat 200.000 Rp 186.660*
*Indosat 250.000 Rp 234.445*
*Indosat 500.000 Rp 468.155*
*Indosat 1.000.000 Rp 925.935*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'pulsa3':
teks =
`*DROP DATA PULSA XL*
• LEGAL 100%
• PROSES 1-5 MENIT

*XL 5.000 Rp 6.407*
*XL 10.000 Rp 11.275*
*XL 15.000 Rp 15.393*
*XL 25.000 Rp 25.220*
*XL 30.000 Rp 30.164*
*XL 50.000 Rp 49.810*
*XL 100.000 Rp 98.785*
*XL 150.000 Rp 149.560*
*XL 200.000 Rp 197.460*
*XL 300.000 Rp 295.885*
*XL 500.000 Rp 493.160*
*XL 1.000.000 Rp 994.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'pulsa4':
teks =
`*DROP DATA PULSA AXIS*
• LEGAL 100%
• PROSES 1-5 MENIT

*Axis 5.000 Rp 6.390*
*Axis 10.000 Rp 11.310*
*Axis 15.000 Rp 15.539*
*Axis 25.000 Rp 25.245*
*Axis 30.000 Rp 30.190*
*Axis 50.000 Rp 50.109*
*Axis 100.000 Rp 99.030*
*Axis 200.000 Rp 197.635*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'pulsa5':
teks =
`*DROP DATA PULSA THREE*
• LEGAL 100%
• PROSES 1-5 MENIT

*Three 1.000 Rp 1.770*
*Three 2.000 Rp 2.737*
*Three 3.000 Rp 3.704*
*Three 5.000 Rp 5.821*
*Three 10.000 Rp 10.580*
*Three 15.000 Rp 15.085*
*Three 20.000 Rp 19.910*
*Three 25.000 Rp 24.735*
*Three 30.000 Rp 29.560*
*Three 50.000 Rp 48.960*
*Three 100.000 Rp 96.110*
*Three 150.000 Rp 147.135*
*Three 200.000 Rp 195.935*
*Three 300.000 Rp 293.140*
*Three 500.000 Rp 487.160*
*Three 1.000.000 Rp 994.410*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'pulsa6':
teks =
`*DROP DATA PULSA SMARTFREN*
• LEGAL 100%
• PROSES 1-5 MENIT

*Smart 5.000 Rp 5.535*
*Smart 10.000 Rp 10.440*
*Smart 20.000 Rp 20.370*
*Smart 25.000 Rp 24.970*
*Smart 30.000 Rp 30.185*
*Smart 50.000 Rp 49.135*
*Smart 60.000 Rp 59.110*
*Smart 100.000 Rp 96.710*
*Smart 150.000 Rp 147.935*
*Smart 200.000 Rp 197.935*
*Smart 300.000 Rp 295.235*
*Smart 500.000 Rp 490.810*
*Smart 1.000.000 Rp 992.135*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'pulsa7':
teks =
`*DROP DATA PULSA BY.U*
• LEGAL 100%
• PROSES 1-5 MENIT

*By.U 1.000 Rp 1.765*
*By.U 2.000 Rp 2.765*
*By.U 3.000 Rp 3.765*
*By.U 4.000 Rp 4.765*
*By.U 5.000 Rp 5.955*
*By.U 6.000 Rp 6.935*
*By.U 7.000 Rp 7.935*
*By.U 8.000 Rp 8.935*
*By.U 9.000 Rp 9.935*
*By.U 10.000 Rp 10.865*
*By.U 20.000 Rp 20.660*
*By.U 25.000 Rp 25.585*
*By.U 50.000 Rp 50.435*
*By.U 100.000 Rp 98.535*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

//━━━━━━━━━━━━━━━[ FITUR SHOP3 ]━━━━━━━━━━━━━━━━━//

case 'shop3':
rows:
rows1 = [

    {
        
        title: 'TELKOMSEL',
        description: "Layanan Paket Telkomsel",
        rowId: `${prefix}paket1`

    },
     {
        title: 'INDOSAT',
        description: "Layanan Paket Indosat",
        rowId: `${prefix}paket2`
     },
     {
        title: 'XL',
        description: "Layanan Paket XL",
        rowId: `${prefix}paket3`
  
     },
     {
  
        title: 'AXIS',
        description: "Layanan Paket Axis",
        rowId: `${prefix}paket4`
     },
     {
        title: 'THREE',
        description: "Layanan Paket Three",
        rowId: `${prefix}paket5`
     },
     {
        title: 'SMARTFREN',
        description: "Layanan Paket Smartfren",
        rowId: `${prefix}paket6`
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Kartunya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break

case 'paket1':
rows:
rows1 = [

    {
        
        title: 'Telkomsel Data Flash',
        description: "",
        rowId: `${prefix}tsel1`

    },
     {
        title: 'Telkomsel Semua Jaringan',
        description: "",
        rowId: `${prefix}tsel2`
     },
     {
        title: 'Telkomsel Ketengan Instagram',
        description: "",
        rowId: `${prefix}tsel3`
  
     },
     {
  
        title: 'Telkomsel Ketengan YouTube',
        description: "",
        rowId: `${prefix}tsel4`
     },
     {
        title: 'Telkomsel Ketengan Facebook',
        description: "",
        rowId: `${prefix}tsel5`
     },
     {
        title: 'Telkomsel Data Malam',
        description: "",
        rowId: `${prefix}tsel6`
     },
     {
        title: 'Telkomsel Ketengan Tiktok',
        description: "",
        rowId: `${prefix}tsel7`
     },
     {
        title: 'Telkomsel Ketengan WhatsApp',
        description: "",
        rowId: `${prefix}tsel8`
     },
     {
        title: 'Telkomsel Data',
        description: "",
        rowId: `${prefix}tsel9`
     },
     {
        title: 'Telkomsel Data Mini',
        description: "",
        rowId: `${prefix}tsel10`
     },
     {
        title: 'Telkomsel Combo Sakti',
        description: "",
        rowId: `${prefix}tsel11`
     },
     {
        title: 'Telkomsel MaxStream',
        description: "",
        rowId: `${prefix}tsel12`
     },
     {
        title: 'Telkomsel Disney Hotstar',
        description: "",
        rowId: `${prefix}tsel13`
     },
     {
        title: 'Telkomsel Data Bulk',
        description: "",
        rowId: `${prefix}tsel14`
     },
     {
        title: 'Telkomsel GamesMax',
        description: "",
        rowId: `${prefix}tsel15`
     },
     {
        title: 'Telkomsel Data Dan Videomax',
        description: "",
        rowId: `${prefix}tsel16`
     },
     {
        title: 'Telkomsel Data OMG',
        description: "",
        rowId: `${prefix}tsel17`
     },
     {
        title: 'Telkomsel Data Vaganza',
        description: "",
        rowId: `${prefix}tsel18`
     },
     {
        title: 'Telkomsel Paket Combo',
        description: "",
        rowId: `${prefix}tsel20`
     },
     {
        title: 'Telkomsel Data Umroh',
        description: "",
        rowId: `${prefix}tsel21`
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Paketnya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break
case 'paket2':
rows:
rows1 = [

    {
        
        title: 'GIFT DATA',
        description: "",
        rowId: `${prefix}isat1`

    },
     {
        title: 'Indosat Data',
        description: "",
        rowId: `${prefix}isat2`
     },
     {
        title: 'Indosat Yellow',
        description: "",
        rowId: `${prefix}isat3`
  
     },
     {
  
        title: 'Indosat Yellow NON UNREG',
        description: "",
        rowId: `${prefix}isat4`
     },
     {
        title: 'Indosat Internet Unlimited',
        description: "",
        rowId: `${prefix}isat5`
     },
     {
        title: 'Indosat Freedom Internet',
        description: "",
        rowId: `${prefix}isat6`
     },
     {
        title: 'Indosat Freedom Combo',
        description: "",
        rowId: `${prefix}isat7`
     },
     {
        title: 'Indosat Apps Kuota',
        description: "",
        rowId: `${prefix}isat8`
     },
     {
        title: 'Indosat Paket Ekstra',
        description: "",
        rowId: `${prefix}isat9`
     },
     {
        title: 'Indosat Freedom',
        description: "",
        rowId: `${prefix}isat10`
     },
     {
        title: 'Indosat Paket Haji Voice',
        description: "",
        rowId: `${prefix}isat11`
     },
     {
        title: 'Indosat Haji Data Unlimited',
        description: "",
        rowId: `${prefix}isat12`
     },
     {
        title: 'Indosat Haji Komplit Unlimited',
        description: "",
        rowId: `${prefix}isat13`
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Paketnya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break
case 'paket3':
rows:
rows1 = [

    {
        
        title: 'XL Hotrod',
        description: "",
        rowId: `${prefix}xl1`

    },
     {
        title: 'XL Combo Lite',
        description: "",
        rowId: `${prefix}xl2`
     },
     {
        title: 'XL Xtra Combo',
        description: "",
        rowId: `${prefix}xl3`
  
     },
     {
  
        title: 'XL Xtra Combo VIP',
        description: "",
        rowId: `${prefix}xl4`
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Paketnya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break
case 'paket4':
rows:
rows1 = [

    {
        
        title: 'Axis Bronet',
        description: "",
        rowId: `${prefix}axis1`

    },
     {
        title: 'Axis Owsem',
        description: "",
        rowId: `${prefix}axis2`
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Paketnya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break
case 'paket5':
rows:
rows1 = [

    {
        
        title: 'Three Mix Small',
        description: "",
        rowId: `${prefix}tri1`

    },
     {
        title: 'Three Data',
        description: "",
        rowId: `${prefix}tri2`
     },
     {
        title: 'Three Mini',
        description: "",
        rowId: `${prefix}tri3`
  
     },
     {
  
        title: 'Three Always On',
        description: "",
        rowId: `${prefix}tri4`
     },
     {
        title: 'Three Mix Combo',
        description: "",
        rowId: `${prefix}tri5`
     },
     {
        title: 'Three Mix Super',
        description: "",
        rowId: `${prefix}tri6`
     },
     {
        title: 'Three AlwaysOn Unlimited',
        description: "",
        rowId: `${prefix}tri7`
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Paketnya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break
case 'paket6':
rows:
rows1 = [

    {
        
        title: 'Smart Data Unlimited',
        description: "",
        rowId: `${prefix}smart1`

    },
     {
        title: 'Smart Internet',
        description: "",
        rowId: `${prefix}smart2`
     },
     {
        title: 'Smart Data',
        description: "",
        rowId: `${prefix}smart3`
  
     },
     {
  
        title: 'Smart Data Connex Evo',
        description: "",
        rowId: `${prefix}smart4`
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Paketnya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break

//━━━━━━━━━━━━━━━[ FITUR PAKET INTERNET ]━━━━━━━━━━━━━━━━━//

// TELKOMSEL
case 'tsel1':
teks =
`*TELKOMSEL KUOTA DATA FLASH*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Data Flash:
*Telkomsel Data Flash 5 MB / 1 Hari Rp 1.110*
*Telkomsel Data Flash 10 MB / 1 Hari Rp 1.560*
*Telkomsel Data Flash 20 MB / 1 Hari Rp 1.860*
*Telkomsel Data Flash 50 MB / 7 Hari Rp 2.085*
*Telkomsel Data Flash 100 MB / 7 Hari Rp 2.585*
*Telkomsel Data Flash 110 MB / 7 Hari Rp 4.135*
*Telkomsel Data Flash 5.000 Rp 4.610*
*Telkomsel Data Flash 250 MB / 7 Hari Rp 4.860*
*Telkomsel Data Flash 500 MB / 30 Hari Rp 6.180*
*Telkomsel Data Flash 10.000 Rp 10.815*
*Telkomsel Data Flash 1 GB / 30 Hari Rp 11.410*
*Telkomsel Data Flash 750 MB / 30 Hari Rp 12.095*
*Telkomsel Data Flash 20.000 Rp 13.610*
*Telkomsel Data Flash 25.000 Rp 20.610*
*Telkomsel Data Flash 2 GB / 30 Hari Rp 22.090*
*Telkomsel Data Flash 3 GB / 30 Hari Rp 33.000*
*Telkomsel Data Flash 30.000 Rp 35.510*
*Telkomsel Data Flash 50.000 Rp 38.585*
*Telkomsel Data Flash 4 GB / 30 Hari Rp 49.110*
*Telkomsel Data Flash 5 GB / 30 Hari Rp 54.155*
*Telkomsel Data Flash 6 GB / 30 Hari Rp 65.710*
*Telkomsel Data Flash 68.000 Rp 68.335*
*Telkomsel Data Flash 75.000 Rp 79.510*
*Telkomsel Data Flash 7 GB / 30 Hari Rp 80.235*
*Telkomsel Data Flash 8 GB / 30 Hari Rp 85.180*
*Telkomsel Data Flash 85.000 Rp 85.285*
*Telkomsel Data Flash 100.000 Rp 90.610*
*Telkomsel Data Flash 12 GB / 30 Hari Rp 102.580*
*Telkomsel Data Flash 9 GB / 30 Hari Rp 106.360*
*Telkomsel Data Flash 11 GB / 30 Hari Rp 112.195*
*Telkomsel Data Flash 10 GB / 30 Hari Rp 113.110*
*Telkomsel Data Flash 16 GB / 30 Hari Rp 133.810*
*Telkomsel Data Flash 150.000 Rp 153.510*
*Telkomsel Data Flash 14 GB / 30 Hari Rp 165.110*
*Telkomsel Data Flash 15 GB / 30 Hari Rp 188.110*
*Telkomsel Data Flash 50 GB / 30 Hari Rp 199.335*
*Telkomsel Data Flash 200.000 Rp 231.609*
*Telkomsel Data Flash 35 GB / 30 Hari Rp 263.310*
*Telkomsel Data Flash 25 GB / 30 Hari Rp 294.360*
*Telkomsel Data Flash 45 GB / 30 Hari Rp 529.360*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel2':
teks =
`*TELKOMSEL KUOTA SEMUA JARINGAN*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Semua Jaringan:
*Telkomsel Data Flash 100 MB / 30 Hari Rp 1.995*
*Telkomsel Data Flash 50 MB / 30 Hari Rp 2.815*
*Telkomsel Data Flash 250 MB / 30 Hari Rp 3.490*
*Telkomsel Data Flash 420 MB / 30 Hari Rp 11.135*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel3':
teks =
`*TELKOMSEL KUOTA KETENGAN INSTAGRAM*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Ketengan Instagram:
*Telkomsel Paket Internet Instagram 1 GB / 1 Hari Rp 4.560*
*Telkomsel Paket Internet Instagram 1 GB / 3 Hari Rp 6.615*
*Telkomsel Paket Internet Instagram 2 GB / 3 Hari Rp 8.615*
*Telkomsel Paket Internet Instagram 1 GB / 7 Hari Rp 10.110*
*Telkomsel Paket Internet Instagram 2 GB / 7 Hari Rp 11.615*
*Telkomsel Paket Internet Instagram 3 GB / 7 Hari Rp 14.110*
*Telkomsel Paket Internet Instagram 5 GB / 30 Hari Rp 33.385*
*Telkomsel Paket Internet Instagram 10 GB / 30 Hari Rp 51.385*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel4':
teks =
`*TELKOMSEL KUOTA KETENGAN YOUTUBE*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Ketengan Youtube:
*Telkomsel Paket Internet Youtube 1 GB / 1 Hari Rp 4.610*
*Telkomsel Paket Internet Youtube 1 GB / 3 Hari Rp 7.110*
*Telkomsel Paket Internet Youtube 2 GB / 3 Hari Rp 9.110*
*Telkomsel Paket Internet Youtube 1 GB / 7 Hari Rp 10.110*
*Telkomsel Paket Internet Youtube 2 GB / 7 Hari Rp 11.720*
*Telkomsel Paket Internet Youtube 3 GB / 7 Hari Rp 13.720*
*Telkomsel Paket Internet Youtube 5 GB / 30 Hari Rp 33.385*
*Telkomsel Paket Internet Youtube 10 GB / 30 Hari Rp 51.385*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel5':
teks =
`*TELKOMSEL KUOTA KETENGAN FACEBOOK*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Ketengan Facebook:
*Telkomsel Ketengan Facebook 1 GB / 1 Hari Rp 4.615*
*Telkomsel Ketengan Facebook 1 GB / 3 Hari Rp 7.815*
*Telkomsel Ketengan Facebook 2 GB / 3 Hari Rp 8.615*
*Telkomsel Ketengan Facebook 1 GB / 7 Hari Rp 9.615*
*Telkomsel Ketengan Facebook 2 GB / 7 Hari Rp 13.120*
*Telkomsel Ketengan Facebook 3 GB / 7 Hari Rp 13.615*
*Telkomsel Ketengan Facebook 5 GB / 30 Hari Rp 33.385*
*Telkomsel Ketengan Facebook 10 GB / 30 Hari Rp 51.485*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel6':
teks =
`*TELKOMSEL KUOTA DATA MALAM*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Data Malam:
*Telkomsel Data Malam 1 GB / 1 Hari Rp 4.710*
*Telkomsel Data Malam 5 GB / 1 Hari Rp 7.710*
*Telkomsel Data Malam 10 Gb 7 Hari Rp 15.610*
*Telkomsel Data Malam 5 GB / 30 Hari Rp 19.885*
*Telkomsel Data Malam 15 GB / 30 Hari Rp 23.510*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel7':
teks =
`*TELKOMSEL KUOTA KETENGAN TIKTOK*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Ketengan TikTok:
*Telkomsel Ketengan TikTok 1 GB / 1 Hari Rp 5.305*
*Telkomsel Ketengan TikTok 1 GB / 3 Hari Rp 7.815*
*Telkomsel Ketengan TikTok 1 GB / 7 Hari Rp 9.615*
*Telkomsel Ketengan TikTok 2 GB / 3 Hari Rp 10.365*
*Telkomsel Ketengan TikTok 2 GB / 7 Hari Rp 11.615*
*Telkomsel Ketengan TikTok 3 GB / 7 Hari Rp 13.615*
*Telkomsel Ketengan TikTok 5 GB / 30 Hari Rp 33.385*
*Telkomsel Ketengan TikTok 10 GB / 30 Hari Rp 60.835*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel8':
teks =
`*TELKOMSEL KUOTA KETENGAN WHATSAPP*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Ketengan WhatsApp:
*Telkomsel Paket Internet Whatsapp 1 GB / 1 Hari Rp 5.310*
*Telkomsel Paket Internet Whatsapp 1 GB / 3 Hari Rp 8.610*
*Telkomsel Paket Internet Whatsapp 2 GB / 3 Hari Rp 10.610*
*Telkomsel Paket Internet Whatsapp 1 GB / 7 Hari Rp 11.115*
*Telkomsel Paket Internet Whatsapp 2 GB / 7 Hari Rp 15.610*
*Telkomsel Paket Internet Whatsapp 3 GB / 7 Hari Rp 20.610*
*Telkomsel Paket Internet Whatsapp 5 GB / 30 Hari Rp 34.135*
*Telkomsel Paket Internet Whatsapp 10 GB / 30 Hari Rp 52.810*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel9':
teks =
`*TELKOMSEL KUOTA DATA*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Data:
*Telkomsel Data 500 MB / 1 Hari Rp 5.710*
*Telkomsel Data 5 GB / 1 Hari Rp 18.735*
*Telkomsel Data 1 GB + 1 GB CHAT / 30 Hari Rp 20.635*
*Telkomsel Data 500 MB / 7 Hari Rp 24.735*
*Telkomsel Data 1 GB + 500 MB Youtube / 30 Hari Rp 24.809*
*Telkomsel Data 1 GB + 5 GB Ruang Guru / 30 Hari Rp 28.609*
*Telkomsel Data 1 GB + 10 GB Ilmu Pedia / 30 Hari Rp 28.609*
*Telkomsel Data 2 GB + 10 GB Ruang Guru / 30 Hari Rp 43.609*
*Telkomsel Data 2 GB + 20 GB Ilmu Pedia / 30 Hari Rp 43.609*
*Telkomsel Data 2 GB + 1.5 GB Youtube / 30 Hari Rp 50.609*
*Telkomsel Data 20 GB / 3 Hari Rp 55.835*
*Telkomsel Data 4 GB + 2 GB Youtube / 30 Hari Rp 76.609*
*Telkomsel Data 30 GB / 7 Hari Rp 76.835*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel10':
teks =
`*TELKOMSEL KUOTA DATA MINI*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Data Mini:
*Telkomsel Data Mini 1 GB / 1 Hari Rp 11.410*
*Telkomsel Data Mini 1 GB / 3 Hari Rp 13.040*
*Telkomsel Data Mini 2 GB / 3 Hari Rp 16.410*
*Telkomsel Data Mini 1 GB / 7 Hari Rp 18.610*
*Telkomsel GamesMax 25.000 Rp 25.610*
*Telkomsel Data Mini 5 GB / 3 Hari Rp 29.910*
*Telkomsel Data Mini 1.5 GB / 14 Hari Rp 30.610*
*Telkomsel Data Mini 2 GB / 14 Hari Rp 31.110*
*Telkomsel Data Mini 5 GB / 7 Hari Rp 41.335*
*Telkomsel Data Mini 10 GB / 3 Hari Rp 49.510*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel11':
teks =
`*TELKOMSEL KUOTA COMBO SAKTI*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Combo Sakti:
*Telkomsel Data Combo Sakti 1.5 GB Rp 13.110*
*Telkomsel Data Combo Sakti 2.5 GB Rp 22.620*
*Telkomsel Data Combo Sakti 3 GB Rp 27.620*
*Telkomsel Data Combo Sakti 13 GB Rp 61.609*
*Telkomsel Data Combo Sakti 11 GB Rp 65.635*
*Telkomsel Data Combo Sakti 17 GB Rp 81.609*
*Telkomsel Data Combo Sakti 19 GB Rp 85.635*
*Telkomsel Data Combo Sakti 15 GB Rp 90.610*
*Telkomsel Data Combo Sakti 22 GB Rp 101.110*
*Telkomsel Data Combo Sakti 25 GB Rp 108.609*
*Telkomsel Data Combo Sakti 28 GB Rp 119.609*
*Telkomsel Data Combo Sakti 35 GB Rp 125.635*
*Telkomsel Data Combo Sakti 32 GB Rp 131.609*
*Telkomsel Data Combo Sakti 45 GB Rp 167.635*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel12':
teks =
`*TELKOMSEL KUOTA MAXSTREAM*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel MaxStream:
*Telkomsel Data Maxstream 6 GB / 7 Hari Rp 15.910*
*Telkomsel Data Maxstream 4 GB / 30 Hari Rp 20.110*
*Telkomsel Data Maxstream 5 GB / 30 Hari Rp 20.460*
*Telkomsel Data Maxstream 10 GB / 30 Hari Rp 29.910*
*Telkomsel Data Maxstream 12 GB / 30 Hari Rp 50.160*
*Telkomsel Data Maxstream 30 GB / 30 Hari Rp 59.360*
*Telkomsel Data MAXstream GALA 9 GB / 30 Hari Rp 67.560*
*Telkomsel Data Maxstream 50 GB / 30 Hari Rp 87.860*
*Telkomsel Data MAXstream GALA 24 GB / 30 Hari Rp 95.860*
*Telkomsel Data MAXstream GALA 100.000 Rp 97.110*
*Telkomsel Data MAXstream GALA 40 GB / 30 Hari Rp 145.360*
*Telkomsel Data MAXstream GALA 150.000 Rp 145.635*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel13':
teks =
`*TELKOMSEL KUOTA DISNEY HOTSTAR*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Disney Hotstar:
*Telkomsel Data Disney+ Hotstar + 3 GB Maxstream / 1 Bulan Rp 19.220*
*Telkomsel Data Disney+ Hotstar + 3 GB Maxstream / 3 Bulan Rp 48.235*
*Telkomsel Data Disney+ Hotstar + 3 GB Maxstream / 6 Bulan Rp 76.235*
*Telkomsel Data Disney+ Hotstar + 3 GB Maxstream / 12 Bulan Rp 136.235*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel14':
teks =
`*TELKOMSEL KUOTA DATA BULK*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Data Bulk:
*Telkomsel Data Bulk 1 GB / 30 Hari Rp 20.610*
*Telkomsel Data Bulk 3 GB / 30 Hari Rp 40.360*
*Telkomsel Data Bulk 4.5 GB / 30 Hari Rp 60.960*
*Telkomsel Data Bulk 5 GB / 30 Hari Rp 66.135*
*Telkomsel Data Bulk 8 GB / 30 Hari Rp 86.115*
*Telkomsel Data Bulk 12 GB / 30 Hari Rp 105.135*
*Telkomsel Data Bulk 17 GB / 30 Hari Rp 114.960*
*Telkomsel Data Bulk 25 GB / 30 Hari Rp 150.930*
*Telkomsel Data Bulk 28 GB / 30 Hari Rp 155.960*
*Telkomsel Data Bulk 50 GB / 30 Hari Rp 195.460*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel15':
teks =
`*TELKOMSEL KUOTA GAMESMAX*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel GamesMax:
*Telkomsel Data 1 GB + 2 GB Game / 30 Hari Rp 24.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel16':
teks =
`*TELKOMSEL KUOTA DATA & VIDEOMAX*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Data dan Videomax:
*Telkomsel Data 1 GB + 5 GB Videomax / 30 Hari Rp 24.620*
*Telkomsel Data 3 GB + 12 GB Videomax / 30 Hari Rp 49.360*
*Telkomsel Data 15 GB + 40 GB Videomax / 30 Hari Rp 148.110*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel17':
teks =
`*TELKOMSEL KUOTA DATA OMG*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Data OMG:
*Telkomsel Data OMG 30.000 Rp 30.510*
*Telkomsel Data OMG 50.000 Rp 50.360*
*Telkomsel Data OMG 75.000 Rp 73.735*
*Telkomsel Data OMG 100.000 Rp 97.335*
*Telkomsel Data OMG 150.000 Rp 147.110*
*Telkomsel Data OMG 200.000 Rp 195.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel18':
teks =
`*TELKOMSEL KUOTA DATA VAGANZA*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Data Vaganza:
*Telkomsel Data Vaganza 3 GB / 30 Hari Rp 32.110*
*Telkomsel Data Vaganza 6 GB / 30 Hari Rp 52.610*
*Telkomsel Data Vaganza 9 GB / 30 Hari Rp 72.610*
*Telkomsel Data Vaganza 15 GB / 30 Hari Rp 90.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel19':
teks =
`*TELKOMSEL KUOTA PAKET COMBO*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Paket Combo:
*Telkomsel COMBO 10 GB / 30 Hari Rp 98.135*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tsel20':
teks =
`*TELKOMSEL KUOTA DATA UMROH*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Telkomsel Data Umroh:
*Internet Umroh 5 GB / 9 Hari Rp 266.610*
*Combo Umroh 5 GB / 9 Hari Rp 331.610*
*Internet Umroh 10 GB / 14 Hari Rp 365.610*
*Combo Umroh 10 GB / 14 Hari Rp 530.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

// INDOSAT
case 'isat1':
teks =
`*INDOSAT KUOTA GIFT DATA*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan GIFT DATA:
*GIFT DATA 50 MB Rp 1.320*
*GIFT DATA 100 MB Rp 1.360*
*GIFT DATA 200 MB Rp 2.110*
*GIFT DATA 150 MB Rp 2.424*
*GIFT DATA 250 MB Rp 2.510*
*GIFT DATA 300 MB Rp 2.890*
*GIFT DATA 400 MB Rp 3.610*
*GIFT DATA 500 MB Rp 4.360*
*GIFT DATA 350 MB Rp 4.536*
*GIFT DATA 450 MB Rp 5.541*
*GIFT DATA 600 MB Rp 5.610*
*GIFT DATA 700 MB Rp 5.860*
*GIFT DATA 750 MB Rp 6.235*
*GIFT DATA 550 MB Rp 6.595*
*GIFT DATA 650 MB Rp 7.598*
*GIFT DATA 1 GB Rp 8.130*
*GIFT DATA 800 MB Rp 9.115*
*GIFT DATA 850 MB Rp 9.620*
*GIFT DATA 900 MB Rp 10.120*
*GIFT DATA 950 MB Rp 10.625*
*,GIFT DATA 1.5 GB Rp 12.890*
*GIFT DATA 2 GB Rp 15.110*
*GIFT DATA 2.5 GB Rp 19.420*
*GIFT DATA 3 GB Rp 23.110*
*GIFT DATA 4 GB Rp 25.635*
*GIFT DATA 3.5 GB Rp 27.235*
*GIFT DATA 4.5 GB Rp 34.235*
*GIFT DATA 5 GB Rp 38.110*
*GIFT DATA 5.5 GB Rp 42.235*
*GIFT DATA 6 GB Rp 45.670*
*GIFT DATA 7 GB Rp 48.335*
*GIFT DATA 6.5 GB Rp 49.235*
*GIFT DATA 8 GB Rp 49.335*
*GIFT DATA 7.5 GB Rp 58.235*
*GIFT DATA 8.5 GB Rp 64.235*
*GIFT DATA 9 GB Rp 71.735*
*GIFT DATA 9.5 GB Rp 73.235*
*GIFT DATA 10 GB Rp 81.635*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat2':
teks =
`*INDOSAT KUOTA DATA*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Data:
*Indosat 300 MB / 30 Hari Rp 3.110*
*Indosat 500 MB / 30 Hari Rp 4.360*
*Indosat 1 GB / 30 Hari Rp 8.110*
*Indosat 2 GB / 30 Hari Rp 14.635*
*Indosat 3 GB / 30 Hari Rp 23.430*
*Indosat 4 GB / 30 Hari Rp 25.635*
*Indosat 5 GB / 30 Hari Rp 38.110*
*Indosat 6 GB / 30 Hari Rp 45.610*
*Indosat 7 GB / 30 Hari Rp 48.345*
*Indosat 8 GB / 30 Hari Rp 49.390*
*Indosat 9 GB / 30 Hari Rp 50.340*
*Indosat 10 GB / 30 Hari Rp 51.140*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat3':
teks =
`*INDOSAT KUOTA YELLOW*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Yellow:
*Indosat Yellow 1 GB / 1 Hari Rp 3.050*
*Indosat Yellow 1 GB / 3 Hari Rp 5.025*
*Indosat Yellow 2 GB / 3 Hari Rp 5.105*
*Indosat Yellow 1 GB / 7 Hari Rp 9.650*
*Indosat Yellow 1 GB / 15 Hari Rp 13.500*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat4':
teks =
`*INDOSAT KUOTA YELLOW NON UNREG*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Yellow NON UNREG:
*Indosat Yellow 1 GB / 1 Hari Rp 3.380*
*Indosat Yellow 1 GB / 3 Hari Rp 5.230*
*Indosat Yellow 1 GB / 7 Hari Rp 9.965*
*Indosat Yellow 1 GB / 15 Hari Rp 13.540*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat5':
teks =
`*INDOSAT KUOTA INTERNET UNLIMITED*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Internet Unlimited:
*Indosat Freedom U 500 MB + 1 GB Apps / 2 Hari Rp 5.685*
*Indosat Freedom U 1 GB + 2 GB Apps / 7 Hari Rp 15.445*
*Indosat Freedom U 1 GB + 4.5 GB Apps / 30 Hari Rp 24.920*
*Indosat Freedom U 2 GB + 7.5 GB Apps / 30 Hari Rp 36.810*
*Indosat Freedom U 3 GB + 15 GB Apps / 30 Hari Rp 55.935*
*Indosat Freedom U 5 GB / 30 Hari Rp 65.660*
*Indosat Freedom U 7 GB + 20 GB Apps / 30 Hari Rp 73.835*
*Indosat Freedom U 10 GB + 25 GB Apps / 30 Hari Rp 83.610*
*Indosat Freedom U 15 GB + 25 GB Apps / 30 Hari Rp 123.835*
*Indosat Freedom U JUMBO / 30 Hari Rp 140.985*
*Indosat Unlimited JUMBO / 30 Hari Rp 141.410*
*Indosat Internet Unlimited + 36GB, 12 Bulan Rp 441.628*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat6':
teks =
`*INDOSAT KUOTA FREEDOM INTERNET*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Freedom Internet:
*Indosat Freedom 1.5 GB / 5 Hari Rp 9.510*
*Indosat Freedom 2 GB / 15 Hari Rp 14.960*
*Indosat Freedom 2 GB / 30 Hari Rp 15.000*
*Indosat Freedom 4 GB / 5 Hari Rp 15.210*
*Indosat Freedom 3 GB / 30 Hari Rp 19.620*
*Indosat Freedom 4 GB / 30 Hari Rp 24.435*
*Indosat Freedom 8 GB / 30 Hari Rp 35.910*
*Indosat Freedom 10 GB / 30 Hari Rp 39.110*
*Indosat Freedom 18 GB / 30 Hari Rp 69.085*
*Indosat Freedom 30 GB / 30 Hari Rp 94.110*
*Indosat Freedom 25 GB / 30 Hari Rp 94.910*
*Indosat Freedom 50 GB / 30 Hari Rp 101.110*
*Indosat Freedom 60 GB / 30 Hari Rp 121.110*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat7':
teks =
`*INDOSAT KUOTA FREEDOM COMBO*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Freedom Combo:
*Indosat Freedom Combo 4 GB / 30 Hari Rp 24.595*
*Indosat Freedom Combo 8 GB / 30 Hari Rp 31.985*
*Indosat Freedom Combo 14 GB / 30 Hari Rp 46.260*
*Indosat Freedom Combo 20 GB / 30 Hari Rp 64.260*
*Indosat Freedom Combo 30 GB / 30 Hari Rp 93.160*
*Indosat Freedom Combo 50 GB / 30 Hari Rp 133.610*
*Indosat Freedom Combo 50 GB / 90 Hari Rp 155.635*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat8':
teks =
`*INDOSAT KUOTA APPS*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Apps Kuota:
*Apps Kuota 5GB 30hr Rp 24.985*
*Apps Kuota 10GB 30hr Rp 37.060*
*Apps Kuota 15GB 30hr Rp 50.610*
*Apps Kuota 20GB 30hr Rp 64.510*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat9':
teks =
`*INDOSAT KUOTA EKSTRA*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Paket Ekstra:
*Indosat Paket Ekstra 2GB Rp 36.835*
*Indosat Paket Ekstra 4GB Rp 53.135*
*Indosat Paket Ekstra 6GB Rp 71.010*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat10':
teks =
`*INDOSAT KUOTA FREEDOM*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Freedom:
*Indosat Freedom M Rp 64.505*
*Indosat Freedom L Rp 99.335*
*Indosat Freedom XL Rp 149.035*
*Indosat Freedom XXL Rp 199.135*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat11':
teks =
`*INDOSAT KUOTA HAJI VOICE*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Paket Haji Voice:
*Indosat Haji Voice 60 Min SMS 60 Rp 195.780*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat12':
teks =
`*INDOSAT KUOTA HAJI DATA UNLIMITED*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Haji Data Unlimited:
*Indosat Haji Data Unlimited 20 Hari. Rp 333.710*
*Indosat Haji Data Unlimited 40 Hari. Rp 540.180*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'isat13':
teks =
`*INDOSAT KUOTA HAJI KOMPLIT UNLIMITED*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Indosat Haji Komplit Unlimited:
*Indosat Haji Komplit Unlimited 20 Hari Rp 423.574*
*Indosat Haji Komplit Unlimited 40 Hari Rp 629.680*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

// XL
case 'xl1':
teks =
`*XL KUOTA HOTROD*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan XL Hotrod:
*XL HOTROD 800 MB / 30 Hari Rp 12.710*
*XL HOTROD 1.5 GB / 30 Hari Rp 46.785*
*XL HOTROD 3 GB / 30 Hari Rp 55.995*
*XL HOTROD 6 GB / 30 Hari Rp 92.610*
*XL HOTROD 8 GB / 30 Hari Rp 113.485*
*XL HOTROD 12 GB / 30 Hari Rp 161.015*
*XL HOTROD 16 GB / 30 Hari Rp 200.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'xl2':
teks =
`*XL KUOTA COMBO LITE*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan XL Combo LITE:
*XL Combo Lite S Rp 22.320*
*XL Combo Lite M Rp 27.470*
*XL Combo Lite L Rp 38.310*
*XL Combo Lite XL Rp 61.535*
*XL Combo Lite XXL Rp 96.110*
*XL Combo Lite XXXL Rp 119.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'xl3':
teks =
`*XL KUOTA XTRA COMBO*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan XL Xtra Combo:
*XL Xtra Combo 5 GB + 10 GB / 30 Hari Rp 55.185*
*XL Xtra Combo 10 GB + 20 GB / 30 Hari Rp 82.230*
*XL Xtra Combo 15 GB + 30 GB / 30 Hari Rp 113.915*
*XL Xtra Combo 20 GB + 40 GB / 30 Hari Rp 160.445*
*XL Xtra Combo 35 GB + 70 GB / 30 Hari Rp 215.780*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'xl4':
teks =
`*XL KUOTA COMBO VIP*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan XL Xtra Combo VIP:
*XL Xtra Combo VIP 5 GB + 10 GB / 30 Hari Rp 62.585*
*XL Xtra Combo VIP 10 GB + 20 GB / 30 Hari Rp 89.635*
*XL Xtra Combo VIP 15 GB + 30 GB / 30 Hari Rp 119.385*
*XL Xtra Combo VIP 20 GB + 40 GB / 30 Hari Rp 165.135*
*XL Xtra Combo VIP 35 GB + 70 GB / 30 Hari Rp 219.135*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

// AXIS
case 'axis1':
teks =
`*AXIS KUOTA BRONET*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Axis Bronet:
*BRONET 500 MB / 1 Hari Rp 8.610*
*BRONET 300 MB / 7 Hari Rp 10.295*
*BRONET 300 MB / 30 Hari Rp 10.310*
*BRONET 1 GB / 30 Hari Rp 13.110*
*BRONET 1.5 GB / 7 Hari Rp 15.385*
*BRONET 2 GB / 7 Hari Rp 15.510*
*BRONET 3 GB / 30 Hari Rp 22.610*
*BRONET 2 GB / 60 Hari Rp 25.819*
*BRONET 5 GB / 30 Hari Rp 28.935*
*BRONET 3 GB / 60 Hari Rp 32.132*
*BRONET 8 GB / 30 Hari Rp 42.310*
*BRONET 5 GB / 60 Hari Rp 47.892*
*BRONET 12 GB / 30 Hari Rp 56.510*
*BRONET 8 GB / 60 Hari Rp 60.610*
*BRONET 16 GB / 30 Hari Rp 68.235*
*BRONET 10 GB / 60 Hari Rp 77.442*
*BRONET 15 GB / 30 Hari Rp 77.885*
*BRONET 12 GB / 60 Hari Rp 80.635*
*BRONET 25 GB / 30 Hari Rp 86.560*
*BRONET 10 GB / 30 Hari Rp 87.530*
*BRONET 16 GB / 60 Hari Rp 108.962*
*BRONET 50 GB / 30 Hari Rp 134.585*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'axis2':
teks =
`*AXIS KUOTA OWSEM*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Axis Owsem:
*OWSEM 1 GB + 1 GB 4G / 30 Hari Rp 17.190*
*OWSEM 1 GB + 3 GB 4G / 30 Hari Rp 28.710*
*Axis OWSEM 16 GB + Unlimited Games / 30 Hari Rp 39.885*
*Axis OWSEM 24 GB + Unlimited Games / 30 Hari Rp 41.205*
*OWSEM 2 GB + 6 GB 4G / 30 Hari Rp 45.410*
*Axis OWSEM 32 GB + Unlimited Games / 30 Hari Rp 47.930*
*OWSEM 3 GB + 9 GB 4G / 30 Hari Rp 59.910*
*Axis OWSEM 48 GB + Unlimited Games / 30 Hari Rp 60.435*
*Axis OWSEM 80 GB + Unlimited Games / 30 Hari Rp 94.022*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

// THREE
case 'tri1':
teks =
`*THREE KUOTA MIX SMALL*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Three Mix Small:
*Tri Mix Small 5 GB 1 Hari Rp 5.495*
*Tri Mix Small 2.75 GB 3 Hari Rp 10.405*
*Tri Mix Small 3 GB 3 Hari Rp 20.085*
*Tri Mix Small 3.75 GB 14 Hari Rp 25.185*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tri2':
teks =
`*THREE KUOTA DATA*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Three Data:
*1GB Nasional + 4GB (01.00 - 09.00) 1 Hari Rp 5.585*
*Tri Data 2.75 GB / 7 Hari Rp 15.385*
*Tri Data AON 1 GB + Bonus 1 GB Rp 15.610*
*Tri Data 2 GB + 20 Menit Telepon / 30 Hari Rp 35.360*
*Tri Data AON 2 GB + Bonus 4 GB Rp 38.410*
*Tri Mix Kuota++ 2.25GB Rp 49.503*
*Tri Data AON 4 GB + Bonus 6 GB Rp 50.610*
*Tri Data AON 3 GB + Bonus 6 GB Rp 69.635*
*Tri Data AON 6 GB + Bonus 12 GB Rp 73.135*
*Tri Data AON 8 GB + Bonus 16 GB Rp 90.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tri3':
teks =
`*THREE KUOTA MINI*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Three Mini:
*Tri Data Mini 1 GB / 5 Hari Rp 8.670*
*Tri Data Mini 1.5 GB / 5 Hari Rp 11.575*
*Tri Data Mini 5 GB / 7 Hari Rp 15.585*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tri4':
teks =
`*THREE KUOTA ALWAYS ON*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Three Always On:
*AlwaysOn 1.5 GB Rp 13.070*
*AlwaysOn 2 GB Rp 17.320*
*AlwaysOn 3 GB Rp 25.360*
*AlwaysOn 6 GB Rp 32.235*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tri5':
teks =
`*THREE KUOTA MIX COMBO*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Three Mix Combo:
*Tri Mix Combo 2 GB + 20 Menit Rp 34.835*
*Tri Mix Combo 32 GB + 30 Menit Rp 59.322*
*Tri Mix Combo 38 GB + 30 Menit Rp 100.610*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tri6':
teks =
`*THREE KUOTA MIX SUPER*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Three Mix Super:
*Tri Mix Super 10 GB 30 Hari Rp 49.260*
*Tri Mix Super 24 GB 30 Hari Rp 88.110*
*Tri Mix Super 30 GB 30 Hari Rp 97.985*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'tri7':
teks =
`*THREE KUOTA ALWAYS ON UNLIMITED*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Three AlwaysOn Unlimited:
*AlwaysOn 6 GB + Unlimited Rp 58.925*
*AlwaysOn 10 GB + Unlimited Rp 79.285*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

// SMARTFREN
case 'smart1':
teks =
`*SMART KUOTA DATA UNLIMITED*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Smart Data Unlimited:
*Smartfren Unlimited Booster 2.000 Rp 2.680*
*Smartfren Unlimited Booster 5.000 Rp 5.560*
*Smartfren Unlimited Booster 10.000 Rp 10.460*
*Smartfren Unlimited 20.000 Rp 20.620*
*Smartfren Kuota Nonstop 30.000 Rp 28.260*
*Smartfren Unlimited 40.000 Rp 37.985*
*Smartfren Kuota Nonstop 45.000 Rp 42.530*
*Smartfren Unlimited 60.000 Rp 57.535*
*Smartfren Kuota Nonstop 65.000 Rp 60.460*
*Smartfren Unlimited 80.000 Rp 76.135*
*Smartfren Kuota Nonstop 100.000 Rp 94.285*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'smart2':
teks =
`*SMART KUOTA INTERNET*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Smart Internet:
*Smart Internet 10.000 Rp 10.260*
*Smart Internet 20.000 Rp 18.835*
*Smart Internet 30.000 Rp 27.335*
*Smart Internet 60.000 Rp 54.810*
*Smart Internet 100.000 Rp 92.295*
*Smart Internet 150.000 Rp 133.610*
*Smart Internet 200.000 Rp 177.365*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'smart3':
teks =
`*SMART KUOTA DATA*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Smart Data:
*Smart 3 GB / 7 Hari Rp 10.285*
*Smart 4 GB / 14 Hari Rp 19.310*
*Smart 8 GB / 14 Hari Rp 28.335*
*Smart 16 GB / 30 Hari Rp 48.910*
*Smart 30 GB / 30 Hari Rp 65.660*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'smart4':
teks =
`*SMART KUOTA DATA CONNEX EVO*
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Smart Data Connex Evo:
*Smart Data Connex Evo 10.000 Rp 10.645*
*Smart Data Connex Evo 20.000 Rp 20.460*
*Smart Data Connex Evo 30.000 Rp 30.760*
*Smart Data Connex Evo 60.000 Rp 60.260*
*Smart Data Connex Evo 100.000 Rp 99.610*
*Smart Data Connex Evo 150.000 Rp 148.960*
*Smart Data Connex Evo 200.000 Rp 197.985*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

//━━━━━━━━━━━━━━━[ FITUR SHOP4 ]━━━━━━━━━━━━━━━━━//

case 'shop4':
rows:
rows1 = [

    {
        
        title: 'Token PLN',
        description: "Layanan Token Listrik",
        rowId: `${prefix}token1`

    },
     {
        title: 'Token PLN HIGH',
        description: "Layanan Token Listrik High",
        rowId: `${prefix}token2`
     },
     {
        title: 'Token PLN Promo',
        description: "Layanan Token Listrik Promo",
        rowId: `${prefix}token3`
  
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Token Nya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break

case 'token1':
teks =
`*TOKEN LISTRIK PLN*
• VIA NO METER / ID
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Token PLN:
*PLN 20.000 Rp 20.690*
*PLN 50.000 Rp 50.685*
*PLN 100.000 Rp 100.635*
*PLN 200.000 Rp 200.615*
*PLN 500.000 Rp 500.645*
*PLN 1.000.000 Rp 1.000.638*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Meter Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'token2':
teks =
`*TOKEN LISTRIK PLN HIGH*
• VIA NO METER / ID
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Token PLN HIGH:
*PLN 20.000 Rp 20.510*
*PLN 50.000 Rp 50.510*
*PLN 100.000 Rp 100.510*
*PLN 200.000 Rp 200.510*
*PLN 500.000 Rp 500.510*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Meter Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'token3':
teks =
`*TOKEN LISTRIK PLN PROMO*
• VIA NO METER / ID
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Token PLN PROMO:
*PLN 20.000 Rp 20.620*
*PLN 50.000 Rp 50.635*
*PLN 100.000 Rp 100.615*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Meter Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

//━━━━━━━━━━━━━━━[ FITUR SHOP5 ]━━━━━━━━━━━━━━━━━//

case 'shop5':
rows:
rows1 = [

    {
        
        title: 'GoPay',
        description: "Layanan TopUp GoPay",
        rowId: `${prefix}money1`

    },
     {
        title: 'DANA',
        description: "Layanan TopUp Dana",
        rowId: `${prefix}money2`
     },
     {
        title: 'OVO',
        description: "Layanan TopUp Ovo",
        rowId: `${prefix}money3`
  
     },
     {
  
        title: 'LinkAja',
        description: "Layanan TopUp LinkAja",
        rowId: `${prefix}money4`
     },
     {
        title: 'ShopeePay',
        description: "Layanan TopUp ShopeePay",
        rowId: `${prefix}money5`
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category E-Money Nya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break

case 'money1':
teks =
`*SALDO E-MONEY GOPAY*
• VIA NO
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan GoPay:
*Go Pay 5.000 Rp 6.365*
*Go Pay 10.000 Rp 11.120*
*Go Pay 15.000 Rp 16.210*
*Go Pay 20.000 Rp 21.560*
*Go Pay 25.000 Rp 26.110*
*Go Pay 30.000 Rp 31.110*
*Go Pay 35.000 Rp 36.210*
*Go Pay 40.000 Rp 41.110*
*Go Pay 45.000 Rp 46.210*
*Go Pay 50.000 Rp 51.140*
*Go Pay 55.000 Rp 56.210*
*Go Pay 60.000 Rp 61.210*
*Go Pay 65.000 Rp 66.210*
*Go Pay 70.000 Rp 71.210*
*Go Pay 75.000 Rp 76.110*
*Go Pay 80.000 Rp 81.210*
*Go Pay 85.000 Rp 86.210*
*Go Pay 90.000 Rp 91.210*
*Go Pay 95.000 Rp 96.210*
*Go Pay 100.000 Rp 101.180*
*Go Pay 150.000 Rp 151.110*
*Go Pay 200.000 Rp 201.110*
*Go Pay 250.000 Rp 251.110*
*Go Pay 300.000 Rp 301.180*
*Go Pay 350.000 Rp 351.180*
*Go Pay 400.000 Rp 401.180*
*Go Pay 450.000 Rp 451.260*
*Go Pay 500.000 Rp 501.180*
*Go Pay 600.000 Rp 601.180*
*Go Pay 700.000 Rp 701.110*
*Go Pay 800.000 Rp 801.110*
*Go Pay 900.000 Rp 901.110*
*Go Pay 1.000.000 Rp 1.001.180*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'money2':
teks =
`*SALDO E-MONEY DANA*
• VIA NO
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan DANA:
*DANA 10.000 Rp 10.650*
*DANA 11.000 Rp 11.720*
*DANA 12.000 Rp 12.720*
*DANA 15.000 Rp 15.785*
*DANA 20.000 Rp 20.650*
*DANA 25.000 Rp 25.670*
*DANA 30.000 Rp 30.785*
*DANA 35.000 Rp 35.685*
*DANA 40.000 Rp 40.675*
*DANA 45.000 Rp 45.685*
*DANA 50.000 Rp 50.675*
*DANA 55.000 Rp 55.875*
*DANA 60.000 Rp 60.650*
*DANA 65.000 Rp 65.785*
*DANA 70.000 Rp 70.785*
*DANA 75.000 Rp 75.675*
*DANA 80.000 Rp 80.785*
*DANA 85.000 Rp 85.785*
*DANA 90.000 Rp 90.785*
*DANA 95.000 Rp 95.785*
*DANA 100.000 Rp 100.785*
*DANA 125.000 Rp 125.875*
*DANA 150.000 Rp 150.675*
*DANA 200.000 Rp 200.675*
*DANA 250.000 Rp 250.675*
*DANA 300.000 Rp 300.675*
*DANA 400.000 Rp 400.680*
*DANA 500.000 Rp 500.675*
*DANA 600.000 Rp 600.875*
*DANA 700.000 Rp 700.700*
*DANA 800.000 Rp 800.700*
*DANA 900.000 Rp 900.700*
*DANA 1.000.000 Rp 1.000.675*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'money3':
teks =
`*SALDO E-MONEY OVO*
• VIA NO
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan OVO:
*OVO 10.000 Rp 9.865*
*OVO 15.000 Rp 16.020*
*OVO 20.000 Rp 20.960*
*OVO 25.000 Rp 24.870*
*OVO 30.000 Rp 29.885*
*OVO 35.000 Rp 36.160*
*OVO 40.000 Rp 39.885*
*OVO 45.000 Rp 46.160*
*OVO 50.000 Rp 49.885*
*OVO 55.000 Rp 56.160*
*OVO 60.000 Rp 59.885*
*OVO 65.000 Rp 66.385*
*OVO 70.000 Rp 69.885*
*OVO 75.000  Rp 74.885*
*OVO 80.000  Rp 79.885*
*OVO 85.000 Rp 85.560*
*OVO 90.000 Rp 90.960*
*OVO 95.000 Rp 96.160*
*OVO 100.000 Rp 99.885*
*OVO 125.000 Rp 126.385*
*OVO 150.000 Rp 149.885*
*OVO 175.000 Rp 175.635*
*OVO 200.000 Rp 199.885*
*OVO 250.000 Rp 249.885*
*OVO 300.000 Rp 299.885*
*OVO 350.000 Rp 351.385*
*OVO 400.000 Rp 399.985*
*OVO 450.000 Rp 450.435*
*OVO 500.000 Rp 499.985*
*OVO 600.000 Rp 600.085*
*OVO 700.000 Rp 700.085*
*OVO 800.000 Rp 800.085*
*OVO 900.000 Rp 900.085*
*OVO 1.000.000 Rp 1.000.085*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'money4':
teks =
`*SALDO E-MONEY LINKAJA*
• VIA NO
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan LinkAja:
*LinkAja Rp 10.000 Rp 10.640*
*LinkAja Rp 15.000 Rp 15.665*
*LinkAja Rp 20.000 Rp 20.760*
*LinkAja Rp 25.000 Rp 25.760*
*LinkAja Rp 30.000 Rp 30.785*
*LinkAja Rp 35.000 Rp 35.785*
*LinkAja Rp 40.000 Rp 40.785*
*LinkAja Rp 45.000 Rp 45.785*
*LinkAja Rp 50.000 Rp 50.785*
*LinkAja Rp 55.000 Rp 55.785*
*LinkAja Rp 60.000 Rp 60.785*
*LinkAja Rp 65.000 Rp 65.785*
*LinkAja Rp 70.000 Rp 70.785*
*LinkAja Rp 75.000 Rp 75.665*
*LinkAja Rp 80.000 Rp 80.810*
*LinkAja Rp 85.000 Rp 85.785*
*LinkAja Rp 90.000 Rp 90.810*
*LinkAja Rp 95.000 Rp 95.785*
*LinkAja Rp 100.000 Rp 100.810*
*LinkAja Rp 125.000 Rp 125.715*
*LinkAja Rp 150.000 Rp 150.660*
*LinkAja Rp 175.000 Rp 175.885*
*LinkAja Rp 200.000 Rp 200.810*
*LinkAja Rp 250.000 Rp 250.835*
*LinkAja Rp 300.000 Rp 300.660*
*LinkAja Rp 350.000 Rp 350.885*
*LinkAja Rp 400.000 Rp 400.640*
*LinkAja Rp 450.000 Rp 450.885*
*LinkAja Rp 500.000 Rp 500.640*
*LinkAja Rp 600.000 Rp 600.640*
*LinkAja Rp 700.000 Rp 700.660*
*LinkAja Rp 800.000 Rp 800.660*
*LinkAja Rp 900.000 Rp 900.660*
*LinkAja Rp 1.000.000 Rp 1.000.660*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'money5':
teks =
`*SALDO E-MONEY SHOPEE PAY*
• VIA NO
• LEGAL 100%
• PROSES 1-5 MENIT

Berikut List Layanan Shopee Pay:
*SHOPEE PAY 10.000  Rp 10.810*
*SHOPEE PAY 20.000 Rp 20.770*
*SHOPEE PAY 25.000 Rp 26.335*
*SHOPEE PAY 30.000 Rp 30.785*
*SHOPEE PAY 40.000 Rp 40.785*
*SHOPEE PAY 50.000 Rp 50.785*
*SHOPEE PAY 60.000 Rp 61.335*
*SHOPEE PAY 70.000 Rp 71.335*
*SHOPEE PAY 75.000 Rp 76.335*
*SHOPEE PAY 80.000 Rp 81.335*
*SHOPEE PAY 90.000 Rp 90.760*
*SHOPEE PAY 100.000 Rp 100.760*
*SHOPEE PAY 150.000 Rp 150.910*
*SHOPEE PAY 200.000 Rp 200.805*
*SHOPEE PAY 250.000 Rp 250.910*
*SHOPEE PAY 300.000 Rp 300.910*
*SHOPEE PAY 400.000 Rp 400.880*
*SHOPEE PAY 500.000 Rp 500.910*
*SHOPEE PAY 600.000 Rp 600.910*
*SHOPEE PAY 700.000 Rp 700.910*
*SHOPEE PAY 800.000 Rp 800.960*
*SHOPEE PAY 900.000 Rp 900.960*
*SHOPEE PAY 1.000.000 Rp 1.000.910*

Note :
• Harga sewaktu waktu berubah
• Pastikan No Sudah benar
• Pemesanan lebih tinggal x kan saja
• Kesalahan Pengirim data tidak ada reff`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

//━━━━━━━━━━━━━━━[ FITUR SHOP6 ]━━━━━━━━━━━━━━━━━//

case 'shop6':
rows:
rows1 = [

    {
        
        title: 'Comingsoon',
        description: "",
        rowId: `${prefix}comingsoon`

    }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Sosmednya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break
case 'comingsoon':
teks =
`COMINGSOON >//<`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

//━━━━━━━━━━━━━━━[ FITUR SHOP7 ]━━━━━━━━━━━━━━━━━//

case 'shop7':
rows:
rows1 = [

    {
        
        title: 'VPS ALIBABA CLOUD',
        description: "Layanan VPS Alibaba Cloud",
        rowId: `${prefix}digital1`

    },
     {
        title: 'VPS DIGITAL OCEAN',
        description: "Layanan VPS Digital Ocean",
        rowId: `${prefix}digital2`
     },
     {
        title: 'RDP BY AZURE',
        description: "Layanan RDP By Azure",
        rowId: `${prefix}digital3`
  
     }
]
sections = [
{ title: "Category", rows: rows1 }
]
button = {
     buttonText: 'Pilih Disini',
     description: `Pilih Category Nya Kak`,
     sections: sections,
     listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage, {contextInfo: { mentionedJid: owner}})
break

case 'digital1':
teks =
`*🖥️ VPS ALIBABA CLOUD 🖥️*
FULL GARANSI !!!
SPEK :
• RAM 1 GB CORE 1GB
• SSD 25 GB
• SPEED UP TO 1GBPS+
Harga Bulanan Rp 50.000
Harga Perpanjang Rp 35.000
Harga Tahunan Rp 250.000

Note :
• Harga sewatu waktu berubah
• Garansi jika tidak melanggar TOS`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'digital2':
teks =
`*🖥️ VPS DIGITAL OCEAN 🖥️*
FULL GARANSI !!!
SPEK :
• RAM 1 GB CORE 1 GB
• SSD 25 GB
• SPEED UP TO 7GBPS+
• EXPIRED 30 DAYS
Rp 60.000

Note :
• Harga sewatu waktu berubah
• Garansi jika tidak melanggar TOS`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'digital3':
teks =
`*🖥️ RDP BY AZURE 🖥️*
FULL GARANSI !!!
SPEK :
• RAM 8GB
• VCPU 2GB
• STORAGE 128GB
• SPEED UP TO 7GBPS+
• EXPIRED 30 DAYS
Rp 80.000

Note :
• Harga sewatu waktu berubah
• Garansi jika tidak melanggar TOS`
fadly.sendMessage(from, teks, text, {quoted:mek})
break

//━━━━━━━━━━━━━━━[ FITUR GROUP ]━━━━━━━━━━━━━━━━━//

case 'welcome':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
but = [
{ buttonId: '!welcomeon', buttonText: { displayText: 'ON' }, type: 1 },
{ buttonId: '!welcomeoff', buttonText: { displayText: 'OFF' }, type: 1 }
]
sendButton(from, "Silahkan pilih untuk welcome group", faketeks, but, mek)
break
case 'welcomeon':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (isWelkom) return reply('welcome sudah aktif')
_welkom.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(_welkom))
reply(`Sukses mengaktifkan fitur welcome di group *${groupMetadata.subject}*`)
break
case 'welcomeoff':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (!isWelkom) return reply('welcome sudah off sebelumnya')
_welkom.splice(from, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(_welkom))
reply(`Sukses menonaktifkan fitur welcome di group *${groupMetadata.subject}*`)
break
case 'antilink' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
but = [
{ buttonId: '!antilinkon', buttonText: { displayText: 'ON' }, type: 1 },
{ buttonId: '!antilinkoff', buttonText: { displayText: 'OFF' }, type: 1 }
]
sendButton(from, "Silahkan pilih untuk antilink group", faketeks, but, mek)
break
case 'antilinkon' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (isAntiLink) return reply('anti link sudah on')
_antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(_antilink))
reply(`Sukses mengaktifkan fitur anti link di group *${groupMetadata.subject}*`)
break
case 'antilinkoff' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (!isAntiLink) return reply('anti link sudah off sebelumnya')
_antilink.splice(from, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(_antilink))
reply(`Sukses menonaktifkan fitur anti link di group *${groupMetadata.subject}*`)
break
case 'antivirtex' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
but = [
{ buttonId: '!antivirtexon', buttonText: { displayText: 'ON' }, type: 1 },
{ buttonId: '!antivirtexoff', buttonText: { displayText: 'OFF' }, type: 1 }
]
sendButton(from, "Silahkan pilih untuk antivirtex group", faketeks, but, mek)
break
case 'antivirtexon' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (isAntiVirtex) return reply('anti virtex group sudah aktif sebelumnya')
_antivirtex.push(from)
fs.writeFileSync('./database/antivirtex.json', JSON.stringify(_antivirtex))
reply(`Sukses mengaktifkan mode anti virtex di group *${groupMetadata.subject}*`)
break
case 'antivirtexoff' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (!isAntiVirtex) return reply('Mode anti virtex sudah nonaktif sebelumnya')
_antivirtex.splice(from, 1)
fs.writeFileSync('./database/antivirtex.json', JSON.stringify(_antivirtex))
reply(`Sukes menonaktifkan mode anti virtex di group *${groupMetadata.subject}*`)
break
case 'group' :
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isGroup) return reply(mess.only.group)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
but = [
{ buttonId: '!groupbuka', buttonText: { displayText: 'Open' }, type: 1 },
{ buttonId: '!grouptutup', buttonText: { displayText: 'Close' }, type: 1 }
]
sendButton(from, "Silahkan pilih untuk buka/tutup group", faketeks, but, mek)
break
case 'groupbuka' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
reply(`Sukses Membuka Group *${groupMetadata.subject}*`)
fadly.groupSettingChange(from, GroupSettingChange.messageSend, false)
break
case 'grouptutup' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
reply(`Sukses Menutup Group *${groupMetadata.subject}*`)
fadly.groupSettingChange(from, GroupSettingChange.messageSend, true)
break
case 'linkgrup' :
case 'linkgc' :
if (!isGroup) return reply(mess.only.group)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
linkgc = await fadly.groupInviteCode(from)
yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
fadly.sendMessage(from, yeh, text, { quoted: fakevo })
break
case 'promote' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi admin!')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Perintah di terima, anda menjdi admin :\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
fadly.groupMakeAdmin(from, mentioned)
} else {
mentions(`Perintah di terima, @${mentioned[0].split('@')[0]} Kamu Menjadi Admin Di Group *${groupMetadata.subject}*`, mentioned, true)
fadly.groupMakeAdmin(from, mentioned)
}
break
case 'demote' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tidak jadi admin!')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Perintah di terima, anda tidak menjadi admin :\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
fadly.groupDemoteAdmin(from, mentioned)
} else {
mentions(`Perintah di terima, Menurunkan : @${mentioned[0].split('@')[0]} Menjadi Member`, mentioned, true)
fadly.groupDemoteAdmin(from, mentioned)
}
break
case 'add' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (args.length < 1) return reply('Yang mau di add siapa??')
if (args[0].startsWith('08')) return reply('Gunakan kode negara Gan')
try {
num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
fadly.groupAdd(from, [num])
} catch (e) {
console.log('Error :', e)
reply('Gagal menambahkan target, mungkin karena di private')
}
break
case 'kick' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Perintah di terima, mengeluarkan :\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
fadly.groupRemove(from, mentioned)
} else {
mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
fadly.groupRemove(from, mentioned)
}
break
case 'tagall':
if (!isOwner) return reply(mess.only.owner)
if (!isGroup) return reply(mess.only.group)
// if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
members_id = []
teks = (args.length > 1) ? args.join(' ').trim() : ''
teks += '\n\n'
for (let mem of groupMembers) {
teks += `• @${mem.jid.split('@')[0]}\n`
members_id.push(mem.jid)
}
mentions(teks, members_id, true)
break
case 'setname':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
fadly.groupUpdateSubject(from, `${body.slice(9)}`)
fadly.sendMessage(from, `Sukses Mengganti Nama Group Menjadi *${body.slice(9)}*`, text, { quoted: fakevo })
break
case 'setdesc':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
fadly.groupUpdateDescription(from, `${body.slice(9)}`)
fadly.sendMessage(from, `Sukses Mengganti Deskripsi Group *${groupMetadata.subject}* Menjadi: *${body.slice(9)}*`, text, { quoted: fakevo })
break
case 'setpp':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
media = await fadly.downloadAndSaveMediaMessage(mek, './database/media_user')
await fadly.updateProfilePicture(from, media)
reply(mess.wait)
reply(`Sukses Mengganti Profil Group *${groupMetadata.subject}*`)
break
case 'hidetag':
if (!isOwner) return (mess.only.owner)
if (!isGroup) return reply(mess.only.group)
// if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
var value = body.slice(9)
var group = await fadly.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
text: value,
contextInfo: { mentionedJid: mem },
quoted: fakevo
}
fadly.sendMessage(from, options, text)
break
      case 'listonline':
             if (!isGroup) return reply(`*Only group*`)
             try {
             let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
             let online = [...Object.keys(fadly.chats.get(ido).presences), fadly.user.jid]
             fadly.sendMessage(from, '*List Online:*\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, text, { quoted: mek, contextInfo: { mentionedJid: online }})
             } catch (e) {
             reply(`${e}`)
}
       case 'infogrup':
       case 'infogroup':
       case 'grupinfo':
       case 'groupinfo':
              if (!isGroup) return reply(mess.only.group)
              try {
              var pic = await fadly.getProfilePicture(from)
              } catch {
              var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
}
              let ingfo = `*G R O U P I N F O*\n\n*Name :* ${groupMetadata.subject}\n*ID Grup :* ${from}\n*Dibuat :* ${moment(`${groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Owner Grup :* @${groupMetadata.owner.split('@')[0]}\n*Jumlah Admin :* ${groupAdmins.length}\n*Jumlah Peserta :* ${groupMembers.length}\n*Welcome :* ${isWelkom ? 'On' : 'Off'}\n*AntiLink :* ${isAntiLink ? 'On' : 'Off'}\n*Desc :* \n${groupMetadata.desc}`
              fadly.sendMessage(from, await getBuffer(pic), image, {quoted: fakevo, caption: ingfo, contextInfo: {"mentionedJid": [groupMetadata.owner.replace('@c.us', '@s.whatsapp.net')]}})
              break

//------------------< Sewa >-------------------
       case 'sewa':
              if (!isGroup)return reply(mess.only.group)
              if (!isOwner) return reply(mess.only.owner)
              if (args.length < 1) return reply(`Penggunaan :\n*${prefix}sewa* add/del waktu`)
              if (args[0].toLowerCase() === 'add'){
            _sewa.addSewaGroup(from, args[1], sewa)
              reply(`Success`)
              } else if (args[0].toLowerCase() === 'del'){
              sewa.splice(_sewa.getSewaPosition(from, sewa), 1)
              fs.writeFileSync('./database/group/sewa.json', JSON.stringify(sewa))
              reply(mess.success)
              } else {
              reply(`Penggunaan :\n*${prefix}sewa* add/del waktu`)
}
              break
       case 'sewalist': 
       case 'listsewa':
              let txtnyee = `List Sewa\nJumlah : ${sewa.length}\n\n`
              for (let i of sewa){
              let cekvipp = ms(i.expired - Date.now())
              txtnyee += `*ID :* ${i.id} \n*Expire :* ${cekvipp.days} day(s) ${cekvipp.hours} hour(s) ${cekvipp.minutes} minute(s) ${cekvipp.seconds} second(s)\n\n`
}
              reply(txtnyee)
              break
       case 'sewacheck':
       case 'ceksewa': 
              if (!isGroup) return reply(mess.only.group)
              if (!isSewa) return reply(`Group ini tidak terdaftar dalam list sewabot. Ketik ${prefix}sewabot untuk info lebih lanjut`)
              let cekvip = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
              let premiumnya = `*「 SEWA EXPIRE 」*\n\n➸ *ID*: ${from}\n➸ *Expired :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
              reply(premiumnya)
              break

//━━━━━━━━━━━━━━━[ FITUR STICKER ]━━━━━━━━━━━━━━━━━//

case 'attp':
if (args.length == 0) return reply(`Example: ${prefix + command} Hai`)
buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(q)}`)
fadly.sendMessage(from, buffer, sticker, { quoted: fakevo })
break
case 'gifstiker':
case 's':
case 'stickergif':  
case 'sticker':
case 'stiker':
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await fadly.downloadAndSaveMediaMessage(encmedia)
ran = '666.webp'
await ffmpeg(`./${media}`)
.input(media)
.on('start', function (cmd) {
     console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
 console.log(`Error : ${err}`)
fs.unlinkSync(media)
reply('error')
})
.on('end', function () {
console.log('Finish')
fadly.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
 fs.unlinkSync(media)
fs.unlinkSync(ran)
})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await fadly.downloadAndSaveMediaMessage(encmedia)
            ran = '999.webp'
            reply(mess.wait)
            await ffmpeg(`./${media}`)
            .inputFormat(media.split('.')[1])
            .on('start', function (cmd) {
            console.log(`Started : ${cmd}`)
            })
            .on('error', function (err) {
            console.log(`Error : ${err}`)
            fs.unlinkSync(media)
            tipe = media.endsWith('.mp4') ? 'video' : 'gif'
            reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
            })
            .on('end', function () {
            console.log('Finish')
            fadly.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
            fs.unlinkSync(media)
            fs.unlinkSync(ran)
})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
            } else {
reply(`Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`)
            }
            break
case 'toimg':
if (!isQuotedSticker) return reply(' reply stickernya gan')
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
media = await fadly.downloadAndSaveMediaMessage(encmedia, './database/media_user')
ran = getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return reply(' Gagal, pada saat mengkonversi sticker ke gambar ')
buffer = fs.readFileSync(ran)
costum(buffer, image, Verived, `Jangan Lupa Subscribe Fadly ID`)
fs.unlinkSync(ran)
})
break
case 'tomp3':
fadly.updatePresence(from, Presence.recording)
if (!isQuotedVideo) return reply('Reply Video nya Tod')
reply(mess.wait)
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
media = await fadly.downloadAndSaveMediaMessage(encmedia, './database/media_user')
ran = getRandom('.mp4')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return reply('Gagal, pada saat mengkonversi video ke mp3')
bufferlkj = fs.readFileSync(ran)
fadly.sendMessage(from, bufferlkj, audio, { mimetype: 'audio/mp4', quoted: fakevo })
fs.unlinkSync(ran)
})
break
case 'tovideo':
if (!isQuotedSticker) return reply('Reply stikernya')
reply(mess.wait)
anumedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
anum = await fadly.downloadAndSaveMediaMessage(anumedia, './database/media_user')
ran = getRandom('.webp')
exec(`ffmpeg -i ${anum} ${ran}`, (err) => {
fs.unlinkSync(anum)
buffer = fs.readFileSync(ran)
fadly.sendMessage(from, buffer, video, { quoted: fakevo, caption: 'Done... Jangan Lupa Subscribe Fadly ID' })
fs.unlinkSync(ran)
})
break
      case 'take':
      case 'takestick':
      case 'colong':
        if (!isQuotedSticker) return reply("Stiker aja om");
        encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
          .message.extendedTextMessage.contextInfo;
        media = await fadly.downloadAndSaveMediaMessage(encmedia);
        anu = args.join(" ").split("|");
        satu = anu[0] !== "" ? anu[0] : `CacaChan`;
        dua = typeof anu[1] !== "undefined" ? anu[1] : `By Fadly ID`;
        require("./lib/fetcher.js").createExif(satu, dua);
        require("./lib/fetcher.js").modStick(media, fadly, mek, from);
        break;
      case 'stikerwm':
      case 'stickerwm':
      case 'swm':
        pe = args.join("");
        var a = pe.split("|")[0];
        var b = pe.split("|")[1];
        if ((isMedia && !mek.message.videoMessage) || isQuotedImage) {
          const encmedia = isQuotedImage
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          media = await fadly.downloadAndSaveMediaMessage(encmedia);
          await createExif(a, b);
          out = getRandom(".webp");
          ffmpeg(media)
            .on("error", (e) => {
              console.log(e);
              fadly.sendMessage(from, "Terjadi kesalahan", "conversation", {
                quoted: mek,
              });
              fs.unlinkSync(media);
            })
            .on("end", () => {
              _out = getRandom(".webp");
              spawn("webpmux", [
                "-set",
                "exif",
                "./stik/data.exif",
                out,
                "-o",
                _out,
              ]).on("exit", () => {
                fadly.sendMessage(
                  from,
                  fs.readFileSync(_out),
                  "stickerMessage",
                  { quoted: mek }
                );
                fs.unlinkSync(out);
                fs.unlinkSync(_out);
                fs.unlinkSync(media);
              });
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(out);
        } else if (
          ((isMedia && mek.message.videoMessage.seconds < 11) ||
            (isQuotedVideo &&
              mek.message.extendedTextMessage.contextInfo.quotedMessage
                .videoMessage.seconds < 11)) &&
          args.length == 0
        ) {
          const encmedia = isQuotedVideo
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await fadly.downloadAndSaveMediaMessage(encmedia);
          pe = args.join("");
          var a = pe.split("|")[0];
          var b = pe.split("|")[1];
          await createExif(a, b);
          out = getRandom(".webp");
          ffmpeg(media)
            .on("error", (e) => {
              console.log(e);
              fadly.sendMessage(from, "Terjadi kesalahan", "conversation", {
                quoted: mek,
              });
              fs.unlinkSync(media);
            })
            .on("end", () => {
              _out = getRandom(".webp");
              spawn("webpmux", [
                "-set",
                "exif",
                "./stik/data.exif",
                out,
                "-o",
                _out,
              ]).on("exit", () => {
                fadly.sendMessage(
                  from,
                  fs.readFileSync(_out),
                  "stickerMessage",
                  { quoted: mek }
                );
                fs.unlinkSync(out);
                fs.unlinkSync(_out);
                fs.unlinkSync(media);
              });
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(out);
        } else {
          reply(
            `Kirim gambar dengan caption ${prefix}swm teks|teks atau tag gambar yang sudah dikirim`
          );
        }
        break
                case 'ttp':
                case 'ttp2':
                case 'ttp3':
                case 'ttp4':
                case 'attp':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Fadly ID`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/${command}?apikey=${lolkey}&text=${ini_txt}`)
                    fadly.sendMessage(from, ini_buffer, sticker, { quoted: mek })
                    break
                case 'triggered':
                    ini_url = args[0]
                    ranp = getRandom('.gif')
                    rano = getRandom('.webp')
                    ini_buffer = `https://api.lolhuman.xyz/api/editor/triggered?apikey=${lolkey}&img=${ini_url}`
                    exec(`wget "${ini_buffer}" -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                        fs.unlinkSync(ranp)
                        buff = fs.readFileSync(rano)
                        fadly.sendMessage(from, buff, sticker, { quoted: mek }).then(() => {
                            fs.unlinkSync(rano)
                        })
                    })
                    break
                case 'wasted':
                    ini_url = args[0]
                    ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/editor/wasted?apikey=${lolkey}&img=${ini_url}`)
                    fadly.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'smoji':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 😭`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/smoji/${emoji}?apikey=${lolkey}`)
                    fadly.sendMessage(from, ini_buffer, sticker, { quoted: mek })
                    break
                case 'smoji2':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 😭`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await fetchJson(`https://api.lolhuman.xyz/api/smoji3/${emoji}?apikey=${lolkey}`)
                    ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/convert/towebp?apikey=${lolkey}&img=` + ini_buffer.result.emoji.whatsapp)
                    fadly.sendMessage(from, ini_buffer, sticker, { quoted: mek })
                    break


//━━━━━━━━━━━━━━━[ FITUR OWNER ]━━━━━━━━━━━━━━━━━//

case 'culik':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
if (args.length < 1) return reply('_*Masukin id grupnya tolol*_')
let pantek = []
for (let i of groupMembers) {
pantek.push(i.jid)
}
fadly.groupAdd(args[0], pantek)
break
case 'owner':
case 'creator':
case 'author':
case 'pemilik':
case 'developer':
let inilist = []
for (let i of owner) {
const vname = owner[i] != undefined ? owner[i].vname || owner[i].notify : undefined
inilist.push({
"displayName": `${ownername}`,
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Fadly ID;;;\nFN:${ownername}\nitem1.TEL;waid=${owner}:${owner}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
})
}
hehe = await fadly.sendMessage(from, {
"displayName": `${inilist.length} kontak`,
"contacts": inilist 
}, 'contactsArrayMessage', { quoted: fakevo })
button = [
  {buttonId: `${prefix}infoig`, buttonText: {displayText: 'Instagram'}, type: 1},
  {buttonId: `${prefix}infoyt`, buttonText: {displayText: 'YouTube'}, type: 1}
]
 buttons = {
    contentText: 'Nih Kak Owner ku><',
    footerText: `Kalo Mau di save Chat aja kak`,
    buttons: button,
    headerType: 1
}
fadly.sendMessage(from, buttons, MessageType.buttonsMessage, {quoted: fakevo})
break
case 'infoig':
reply('Ciee mau follow Instagram owner\nhttps://instagram.com/xdlyy444')
break
case 'infoyt':
reply('Ciee mau subscribe channel owner\nhttps://youtube.com/c/XDLYY')
break
case 'bc':
if (!isOwner) return reply(mess.only.owner)
if (args.length < 1) return reply('.......')
anu = await fadly.chats.all()
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
bc = await fadly.downloadMediaMessage(encmedia)
for (let _ of anu) {
fadly.sendMessage(_.jid, bc, image, { caption: `[ CacaChan Broadcast ]\n\n${body.slice(4)}` })
}
reply('Suksess broadcast')
} else {
for (let _ of anu) {
sendMess(_.jid, `[ *CacaChan<3 Broadcast* ]\n\n${body.slice(4)}`)
}
reply('Suksess broadcast')
}
break
case 'report':
const pesan = body.slice(8)
if (pesan.length > 300) return fadly.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', text, { quoted: fakevo })
var nomor = mek.participant
const teks1 = `*[REPORT]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${pesan}`
var options = {
text: teks1,
contextInfo: { mentionedJid: [nomor] },
}
fadly.sendMessage(`62895379169488@s.whatsapp.net`, options, text, { quoted: fakevo })
reply('Masalah Telah Di Laporkan Ke Owner Bot, Mohon Tunggu Untuk Proses Perbaikan')
break
case 'mode':
buttonss = [{buttonId: `${prefix}public`, buttonText: {displayText: 'PUBLIC👥'}, type: 1},{buttonId: `${prefix}self`, buttonText: {displayText: 'SELF👤'}, type: 1}]
const buMess = {
    contentText: "SELF/PUBLIC",
    footerText: 'Silahkan Pilih Saah Satu',
    buttons: buttonss,
    headerType: 1
}
await fadly.sendMessage(from, buMess, MessageType.buttonsMessage, {quoted: fakevo})
break
				case 'public':
				if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
			publik = true
				reply('Sukses mengubah mode self ke public')
			break
			case 'self':
			if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
				publik = false
				reply('Sukses mengubah mode public ke self')
			break
      case 'exif':
             if (!isOwner) return  reply(mess.only.owner)
             if (!q) return reply(mess.wrongFormat)
             if (!arg.split('|')) return reply(`Penggunaan ${prefix}exif nama|author`)
             exif.create(arg.split('|')[0], arg.split('|')[1])
             reply('sukses')
             break	
      case 'join': 
             if (!q) return reply('Linknya?')
             if (!isOwner) return reply(mess.only.owner)
             if (!isUrl(args[0]) && !args[0].includes('https://chat.whatsapp.com/')) return reply('Linknya Invalid Tod')
             link = args[0].replace('https://chat.whatsapp.com/','')
             fak = fadly.query({ json: ['action', 'invite', link],
             expect200: true })
             reply('Berhasil Masuk Grup')
             break
      case 'eval':
             try {
             if (!isOwner) return
             sy = args.join(' ')
             return eval(sy)
             } catch(e) {
             reply(`${e}`)
}
             break
      case 'getquoted':
             reply(JSON.stringify(mek.message.extendedTextMessage.contextInfo, null, 3))
             break

//------------------< Premium >-------------------
       case 'premium': 
              if (!isOwner || !mek.key.fromMe) return reply(mess.only.owner)
              if (args[0] === 'add') {
              if (fadly.message.extendedTextMessage != undefined) {
              mentioned = fadly.message.extendedTextMessage.contextInfo.mentionedJid

              premium.addPremiumUser(mentioned[0], args[2], _premium)
              reply(`*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${mentioned[0]}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`)
        
              } else {
            
              premium.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], _premium)
              reply(`*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${args[1]}@s.whatsapp.net\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`)
}
              } else if (args[0] === 'del') {
              if (fadly.message.extendedTextMessage != undefined) {
              mentioned = fadly.message.extendedTextMessage.contextInfo.mentionedJid
            _premium.splice(premium.getPremiumPosition(mentioned[0], _premium), 1)
              fs.writeFileSync('./database/user/premium.json', JSON.stringify(_premium))
              reply(mess.success)
              } else {
            _premium.splice(premium.getPremiumPosition(args[1] + '@s.whatsapp.net', _premium), 1)
              fs.writeFileSync('./database/user/premium.json', JSON.stringify(_premium))
              reply(mess.success)
}
              } else {
              reply(mess.wrongFormat)
}
              break
       case 'premiumcheck':
       case 'cekpremium': 
              if (!isPremium) return reply(mess.only.prem)
              const cekExp = ms(await premium.getPremiumExpired(sender, _premium) - Date.now())
              reply(`*「 PREMIUM EXPIRE 」*\n\n➸ *ID*: ${sender}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`)
              break
       case 'listprem':
       case 'listpremium':          
              let txt = `「 *PREMIUM USER LIST* 」\n\n`
              let men = [];
              for (let i of _premium){
              men.push(i.id)
              const checkExp = ms(i.expired - Date.now())
              txt += `➸ *ID :* @${i.id.split("@")[0]}\n➸ *Expired*: ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`
}
              mentions(txt, men, true)
              break

//━━━━━━━━━━━━━━━[ FITUR DOWNLOAD ]━━━━━━━━━━━━━━━━━//

case 'play':
gambar = fs.readFileSync('./media/caca.jpg')
teks =
`Silahkan Pilih Media Yg Ingin Download`
but = [
          { buttonId: `${prefix}playmp3 ${q}`, buttonText: { displayText: '🎵MUSIC' }, type: 1 },
          { buttonId: `${prefix}playmp4 ${q}`, buttonText: { displayText: '🎥VIDEO' }, type: 1 }
        ]
        sendButLocation(from, teks, faketeks, gambar, but)
break
case 'playmp3':
if (args.length == 0) return await reply(`Judul Lagunya Mana Tod\nContoh : ${prefix + command} melukis senja`)
reply(mess.wait)
await fetchJson(`https://api.lolhuman.xyz/api/ytsearch?apikey=${lolkey}&query=${args.join(" ")}`)
.then(async(result) => {
await fetchJson(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkey}&url=https://www.youtube.com/watch?v=${result.result[0].videoId}`)
.then(async(result) => {
result = result.result
caption = `❖ Title    : *${result.title}*\n`
caption += `❖ Size     : *${result.size}*`
ini_buffer = await getBuffer(result.thumbnail)
await fadly.sendMessage(from, ini_buffer, image, { quoted: mek, caption: caption })
get_audio = await getBuffer(result.link)
await fadly.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${result.title}.mp3`, quoted: mek})
})
})
break
case "playvideo":
if (args.length === 0)
return reply(`Kirim perintah *${prefix}video* _Judul lagu yang akan dicari_`)
reply(mess.wait)
var srch = args.join("")
aramas = await yts(srch)
aramat = aramas.all;
var mulaikah = aramat[0].url;
try {
ytv(mulaikah).then((res) => {
const { dl_link, thumb, title, filesizeF, filesize } = res;
axios
.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
.then(async (a) => {
if (Number(filesize) >= 100000)
return sendMediaURL(from,thumb,`*PLAY VIDEO*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
const captions = `*PLAY VIDEO*\n\n*Title* : ${title}\n*Ext* : MP4\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
sendMediaURL(from, thumb, captions)
await sendMediaURL(from, dl_link).catch(() => reply("error"))
})
})
} catch (err) {
reply(mess.error.lv)
}
break
case 'ytsearch':
case 'yts':
if (args.length == 0) return reply(`Judul Video Yg Mau Di Cari Tod\nContoh : ${prefix + command} Melukis Senja`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/ytsearch?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = ""
for (var x of get_result) {
ini_txt += `Title : ${x.title}\n`
ini_txt += `Views : ${x.views}\n`
ini_txt += `Published : ${x.published}\n`
ini_txt += `Thumbnail : ${x.thumbnail}\n`
ini_txt += `Link : https://www.youtube.com/watch?v=${x.videoId}\n\n`
}
reply(ini_txt)
break
case 'ytmp4':
if (args.length == 0) return reply(`Link Nya Mana Tod\nContoh: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
ini_link = args[0]
get_result = await fetchJson(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkey}&url=${ini_link}`)
get_result = get_result.result
ini_txt = `${get_result.title} - ${get_result.size}`
ini_buffer = await getBuffer(get_result.thumbnail)
fadly.sendMessage(from, ini_buffer, image, { quoted: fakevo, caption: ini_txt })
get_audio = await getBuffer(get_result.link)
fadly.sendMessage(from, get_audio, video, { mimetype: 'video/mp4', filename: `${get_result.title}.mp4`, quoted: fakevo, caption: 'Neh'})
break

case 'telesticker':
if (args.length == 0) return reply(`Example: ${prefix + command} https://t.me/addstickers/LINE_Menhera_chan_ENG`)
ini_url = args[0]
ini_url = await fetchJson(`https://api.lolhuman.xyz/api/telestick?apikey=${lolkey}&url=${ini_url}`)
ini_sticker = ini_url.result.sticker
for (sticker_ in ini_sticker) {
ini_buffer = await getBuffer(ini_sticker[sticker_])
fadly.sendMessage(from, ini_buffer, sticker)
}
break
case 'tiktok':
if (args.length == 0) return reply(`Link Nya Mana Tod\nContoh: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
ini_url = args[0]
ini_url = `https://api.lolhuman.xyz/api/tiktok?apikey=${lolkey}&url=${ini_url}`
get_result = await fetchJson(ini_url)
ini_buffer = await getBuffer(get_result.result.link)
fadly.sendMessage(from, ini_buffer, video, { quoted: fakevo, caption: 'Neh'})
break
case 'tiktokmusic':
case 'tiktokmp3':
if (args.length == 0) return reply(`Link Nya Mana Tod\nContoh: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
ini_link = args[0]
get_audio = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=${lolkey}&url=${ini_link}`)
fadly.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, quoted: mek})
break
case 'pinterest':
if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
query = args.join(" ")
ini_url = await fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=${lolkey}&query=${query}`)
ini_url = ini_url.result
ini_buffer = await getBuffer(ini_url)
fadly.sendMessage(from, ini_buffer, image, { quoted: mek, caption: 'Neh'})
break
case 'igdl':
if (args.length == 0) return reply(`Example: ${prefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
ini_url = args[0]
ini_url = await fetchJson(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkey}&url=${ini_url}`)
ini_url = ini_url.result
ini_type = image
if (ini_url.includes(".mp4")) ini_type = video
ini_buffer = await getBuffer(ini_url)
fadly.sendMessage(from, ini_buffer, ini_type, { quoted: fakevo, caption: 'Neh'})
break
case 'spotify':
if (args.length == 0) return reply(`Example: ${prefix + command} https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA`)
url = args[0]
get_result = await fetchJson(`https://api.lolhuman.xyz/api/spotify?apikey=${lolkey}&url=${url}`)
get_result = get_result.result
ini_txt = `Title : ${get_result.title}\n`
ini_txt += `Artists : ${get_result.artists}\n`
ini_txt += `Duration : ${get_result.duration}\n`
ini_txt += `Popularity : ${get_result.popularity}\n`
ini_txt += `Preview : ${get_result.preview_url}\n`
thumbnail = await getBuffer(get_result.thumbnail)
fadly.sendMessage(from, thumbnail, image, { quoted: fakevo, caption: ini_txt })
get_audio = await getBuffer(get_result.link)
fadly.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.title}.mp3`, quoted: fakevo })
break
case 'spotifysearch':
if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = ""
for (var x of get_result) {
    ini_txt += `Title : ${x.title}\n`
    ini_txt += `Artists : ${x.artists}\n`
    ini_txt += `Duration : ${x.duration}\n`
    ini_txt += `Link : ${x.link}\n`
    ini_txt += `Preview : ${x.preview_url}\n\n\n`
}
reply(ini_txt)
break
case 'jooxplay':
if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/jooxplay?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = `Title : ${get_result.info.song}\n`
ini_txt += `Artists : ${get_result.info.singer}\n`
ini_txt += `Duration : ${get_result.info.duration}\n`
ini_txt += `Album : ${get_result.info.album}\n`
ini_txt += `Uploaded : ${get_result.info.date}\n`
ini_txt += `Lirik :\n ${get_result.lirik}\n`
thumbnail = await getBuffer(get_result.image)
fadly.sendMessage(from, thumbnail, image, { quoted: fakevo, caption: 'Neh' })
get_audio = await getBuffer(get_result.audio[0].link)
fadly.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.info.song}.mp3`, quoted: fakevo })
break
case 'twtdl':
if (args.length == 0) return reply(`Example: ${prefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`)
ini_url = args[0]
ini_url = await fetchJson(`https://api.lolhuman.xyz/api/twitter?apikey=${lolkey}&url=${ini_url}`)
ini_url = ini_url.result
ini_url = ini_url[ini_url.length - 1].link
ini_buffer = await getBuffer(ini_url)
fadly.sendMessage(from, ini_buffer, video, { quoted: fakevo, caption: 'Neh' })
break
case 'fbdl':
if (args.length == 0) return reply(`Example: ${prefix + command} https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
ini_url = args[0]
ini_url = await fetchJson(`https://api.lolhuman.xyz/api/facebook?apikey=${lolkey}&url=${ini_url}`)
ini_url = ini_url.result[0].link
ini_buffer = await getBuffer(ini_url)
fadly.sendMessage(from, ini_buffer, video, { quoted: fakevo, caption: 'Neh' })
break
case 'zippyshare':
if (args.length == 0) return reply(`Example: ${prefix + command} https://www51.zippyshare.com/v/5W0TOBz1/file.html`)
ini_url = args[0]
ini_url = await fetchJson(`https://api.lolhuman.xyz/api/zippyshare?apikey=${lolkey}&url=${ini_url}`)
ini_url = ini_url.result
ini_txt = `File Name : ${ini_url.name_file}\n`
ini_txt += `Size : ${ini_url.size}\n`
ini_txt += `Date Upload : ${ini_url.date_upload}\n`
ini_txt += `Download Url : ${ini_url.download_url}`
reply(ini_txt)
break

//━━━━━━━━━━━━━━━[ Movie & Story ]━━━━━━━━━━━━━━━━━//

                case 'lk21':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Transformer`)
                    query = args.join(" ")
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/lk21?apikey=${lolkey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Link : ${get_result.link}\n`
                    ini_txt += `Genre : ${get_result.genre}\n`
                    ini_txt += `Views : ${get_result.views}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Tahun : ${get_result.tahun}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    ini_txt += `Actors : ${get_result.actors.join(", ")}\n`
                    ini_txt += `Location : ${get_result.location}\n`
                    ini_txt += `Date Release : ${get_result.date_release}\n`
                    ini_txt += `Language : ${get_result.language}\n`
                    ini_txt += `Link Download : ${get_result.link_dl}`
                    thumbnail = await getBuffer(get_result.thumbnail)
                    fadly.sendMessage(from, thumbnail, image, { quoted: fakevo, caption: 'Neh' })
                    break
                case 'drakorongoing':
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/drakorongoing?apikey=${lolkey}`)
                    get_result = get_result.result
                    ini_txt = "Ongoing Drakor\n\n"
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Thumbnail : ${x.thumbnail}\n`
                        ini_txt += `Year : ${x.category}\n`
                        ini_txt += `Total Episode : ${x.total_episode}\n`
                        ini_txt += `Genre : ${x.genre.join(", ")}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'wattpad':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://www.wattpad.com/707367860-kumpulan-quote-tere-liye-tere-liye-quote-quote`)
                    ini_url = args[0]
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/wattpad?apikey=${lolkey}&url=${ini_url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Motify date : ${get_result.modifyDate}\n`
                    ini_txt += `Create date: ${get_result.createDate}\n`
                    ini_txt += `Word : ${get_result.word}\n`
                    ini_txt += `Comment : ${get_result.comment}\n`
                    ini_txt += `Vote : ${get_result.vote}\n`
                    ini_txt += `Reader : ${get_result.reader}\n`
                    ini_txt += `Pages : ${get_result.pages}\n`
                    ini_txt += `Description : ${get_result.desc}\n\n`
                    ini_txt += `Story : \n${get_result.story}`
                    thumbnail = await getBuffer(get_result.photo)
                    fadly.sendMessage(from, thumbnail, image, { quoted: fakevo, caption: 'Neh' })
                    break
                case 'wattpadsearch':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Tere Liye`)
                    query = args.join(" ")
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/wattpadsearch?apikey=${lolkey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = "Wattpad Seach : \n"
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Url : ${x.url}\n`
                        ini_txt += `Part : ${x.parts}\n`
                        ini_txt += `Motify date : ${x.modifyDate}\n`
                        ini_txt += `Create date: ${x.createDate}\n`
                        ini_txt += `Coment count: ${x.commentCount}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'cerpen':
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/cerpen?apikey=${lolkey}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Creator : ${get_result.creator}\n`
                    ini_txt += `Story :\n${get_result.cerpen}`
                    reply(ini_txt)
                    break
                case 'ceritahoror':
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/ceritahoror?apikey=${lolkey}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    ini_txt += `Story :\n${get_result.story}\n`
                    thumbnail = await getBuffer(get_result.thumbnail)
                    fadly.sendMessage(from, thumbnail, image, { quoted: fakevo, caption: 'Neh' })
                    break


//━━━━━━━━━━━━━━━[ FITUR ISLAMI ]━━━━━━━━━━━━━━━━━//

case 'listsurah':
get_result = await fetchJson(`https://api.lolhuman.xyz/api/quran?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = 'List Surah:\n'
for (var x in get_result) {
    ini_txt += `${x}. ${get_result[x]}\n`
}
reply(ini_txt)
break
case 'alquran':
if (args.length < 1) return reply(`Example: ${prefix + command} 18 or ${prefix + command} 18/10 or ${prefix + command} 18/1-10`)
urls = `https://api.lolhuman.xyz/api/quran/${args[0]}?apikey=${lolkey}`
quran = await fetchJson(urls)
result = quran.result
ayat = result.ayat
ini_txt = `QS. ${result.surah} : 1-${ayat.length}\n\n`
for (var x of ayat) {
    arab = x.arab
    nomor = x.ayat
    latin = x.latin
    indo = x.indonesia
    ini_txt += `${arab}\n${nomor}. ${latin}\n${indo}\n\n`
}
ini_txt = ini_txt.replace(/<u>/g, "").replace(/<\/u>/g, "")
ini_txt = ini_txt.replace(/<strong>/g, "").replace(/<\/strong>/g, "")
ini_txt = ini_txt.replace(/<u>/g, "").replace(/<\/u>/g, "")
reply(ini_txt)
break
case 'alquranaudio':
if (args.length == 0) return reply(`Example: ${prefix + command} 18 or ${prefix + command} 18/10`)
surah = args[0]
ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/quran/audio/${surah}?apikey=${lolkey}`)
fadly.sendMessage(from, ini_buffer, audio, { quoted: fakevo, mimetype: Mimetype.mp4Audio })
break
case 'asmaulhusna':
get_result = await fetchJson(`https://api.lolhuman.xyz/api/asmaulhusna?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = `No : ${get_result.index}\n`
ini_txt += `Latin: ${get_result.latin}\n`
ini_txt += `Arab : ${get_result.ar}\n`
ini_txt += `Indonesia : ${get_result.id}\n`
ini_txt += `English : ${get_result.en}`
reply(ini_txt)
break
case 'kisahnabi':
if (args.length == 0) return reply(`Example: ${prefix + command} Muhammad`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/kisahnabi/${query}?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = `Name : ${get_result.name}\n`
ini_txt += `Lahir : ${get_result.thn_kelahiran}\n`
ini_txt += `Umur : ${get_result.age}\n`
ini_txt += `Tempat : ${get_result.place}\n`
ini_txt += `Story : \n${get_result.story}`
reply(ini_txt)
break
case 'jadwalsholat':
if (args.length == 0) return reply(`Example: ${prefix + command} Yogyakarta`)
daerah = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/sholat/${daerah}?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = `Wilayah : ${get_result.wilayah}\n`
ini_txt += `Tanggal : ${get_result.tanggal}\n`
ini_txt += `Sahur : ${get_result.sahur}\n`
ini_txt += `Imsak : ${get_result.imsak}\n`
ini_txt += `Subuh : ${get_result.subuh}\n`
ini_txt += `Terbit : ${get_result.terbit}\n`
ini_txt += `Dhuha : ${get_result.dhuha}\n`
ini_txt += `Dzuhur : ${get_result.dzuhur}\n`
ini_txt += `Ashar : ${get_result.ashar}\n`
ini_txt += `Maghrib : ${get_result.imsak}\n`
ini_txt += `Isya : ${get_result.isya}`
reply(ini_txt)
break

//━━━━━━━━━━━━━━━[ FITUR ANIME ]━━━━━━━━━━━━━━━━━//

case 'character':
if (args.length == 0) return reply(`Nama Anime Nya Mana\n Contoh: ${prefix + command} Naruto`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/character?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = `Id : ${get_result.id}\n`
ini_txt += `Name : ${get_result.name.full}\n`
ini_txt += `Native : ${get_result.name.native}\n`
ini_txt += `Favorites : ${get_result.favourites}\n`
ini_txt += `Media : \n`
ini_media = get_result.media.nodes
for (var x of ini_media) {
ini_txt += `- ${x.title.romaji} (${x.title.native})\n`
}
ini_txt += `\nDescription : \n${get_result.description.replace(/__/g, "_")}`
thumbnail = await getBuffer(get_result.image.large)
await fadly.sendMessage(from, thumbnail, image, { quoted: fakevo, caption: 'Neh' })
break
case 'manga':
if (args.length == 0) return reply(`Nama Anime Nya Mana\n Contoh: ${prefix + command} Naruto`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/manga?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = `Id : ${get_result.id}\n`
ini_txt += `Id MAL : ${get_result.idMal}\n`
ini_txt += `Title : ${get_result.title.romaji}\n`
ini_txt += `English : ${get_result.title.english}\n`
ini_txt += `Native : ${get_result.title.native}\n`
ini_txt += `Format : ${get_result.format}\n`
ini_txt += `Chapters : ${get_result.chapters}\n`
ini_txt += `Volume : ${get_result.volumes}\n`
ini_txt += `Status : ${get_result.status}\n`
ini_txt += `Source : ${get_result.source}\n`
ini_txt += `Start Date : ${get_result.startDate.day} - ${get_result.startDate.month} - ${get_result.startDate.year}\n`
ini_txt += `End Date : ${get_result.endDate.day} - ${get_result.endDate.month} - ${get_result.endDate.year}\n`
ini_txt += `Genre : ${get_result.genres.join(", ")}\n`
ini_txt += `Synonyms : ${get_result.synonyms.join(", ")}\n`
ini_txt += `Score : ${get_result.averageScore}%\n`
ini_txt += `Characters : \n`
ini_character = get_result.characters.nodes
for (var x of ini_character) {
ini_txt += `- ${x.name.full} (${x.name.native})\n`
}
ini_txt += `\nDescription : ${get_result.description}`
thumbnail = await getBuffer(get_result.coverImage.large)
await fadly.sendMessage(from, thumbnail, image, { quoted: fakevo, caption: 'Cintai Manga mu' })
break
case 'anime':
if (args.length == 0) return reply(`Nama Anime Nya Mana\n Contoh: ${prefix + command} Naruto`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/anime?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = `Id : ${get_result.id}\n`
ini_txt += `Id MAL : ${get_result.idMal}\n`
ini_txt += `Title : ${get_result.title.romaji}\n`
ini_txt += `English : ${get_result.title.english}\n`
ini_txt += `Native : ${get_result.title.native}\n`
ini_txt += `Format : ${get_result.format}\n`
ini_txt += `Episodes : ${get_result.episodes}\n`
ini_txt += `Duration : ${get_result.duration} mins.\n`
ini_txt += `Status : ${get_result.status}\n`
ini_txt += `Season : ${get_result.season}\n`
ini_txt += `Season Year : ${get_result.seasonYear}\n`
ini_txt += `Source : ${get_result.source}\n`
ini_txt += `Start Date : ${get_result.startDate.day} - ${get_result.startDate.month} - ${get_result.startDate.year}\n`
ini_txt += `End Date : ${get_result.endDate.day} - ${get_result.endDate.month} - ${get_result.endDate.year}\n`
ini_txt += `Genre : ${get_result.genres.join(", ")}\n`
ini_txt += `Synonyms : ${get_result.synonyms.join(", ")}\n`
ini_txt += `Score : ${get_result.averageScore}%\n`
ini_txt += `Characters : \n`
ini_character = get_result.characters.nodes
for (var x of ini_character) {
ini_txt += `- ${x.name.full} (${x.name.native})\n`
}
ini_txt += `\nDescription : ${get_result.description}`
thumbnail = await getBuffer(get_result.coverImage.large)
await fadly.sendMessage(from, thumbnail, image, { quoted: fakevo, caption: 'Neh Wibu' })
break
case 'kusonimesearch':
if (args.length == 0) return reply(`Nama Anime Nya Mana\n Contoh: ${prefix + command} Naruto`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/kusonimesearch?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = `Title : ${get_result.title}\n`
ini_txt += `Japanese : ${get_result.japanese}\n`
ini_txt += `Genre : ${get_result.genre}\n`
ini_txt += `Seasons : ${get_result.seasons}\n`
ini_txt += `Producers : ${get_result.producers}\n`
ini_txt += `Type : ${get_result.type}\n`
ini_txt += `Status : ${get_result.status}\n`
ini_txt += `Total Episode : ${get_result.total_episode}\n`
ini_txt += `Score : ${get_result.score}\n`
ini_txt += `Duration : ${get_result.duration}\n`
ini_txt += `Released On : ${get_result.released_on}\n`
ini_txt += `Desc : ${get_result.desc}\n`
link_dl = get_result.link_dl
for (var x in link_dl) {
ini_txt += `\n${x}\n`
for (var y in link_dl[x]) {
ini_txt += `${y} - ${link_dl[x][y]}\n`
}
}
ini_buffer = await getBuffer(get_result.thumbnail)
await fadly.sendMessage(from, ini_buffer, image, { quoted: fakevo, caption: ini_txt })
break
case 'otakudesusearch':
if (args.length == 0) return reply(`Nama Anime Nya Mana\n Contoh: ${prefix + command} Naruto`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/otakudesusearch?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = `Title : ${get_result.title}\n`
ini_txt += `Japanese : ${get_result.japanese}\n`
ini_txt += `Judul : ${get_result.judul}\n`
ini_txt += `Type : ${get_result.type}\n`
ini_txt += `Episode : ${get_result.episodes}\n`
ini_txt += `Aired : ${get_result.aired}\n`
ini_txt += `Producers : ${get_result.producers}\n`
ini_txt += `Genre : ${get_result.genres}\n`
ini_txt += `Duration : ${get_result.duration}\n`
ini_txt += `Studios : ${get_result.status}\n`
ini_txt += `Rating : ${get_result.rating}\n`
ini_txt += `Credit : ${get_result.credit}\n`
get_link = get_result.link_dl
for (var x in get_link) {
ini_txt += `\n\n*${get_link[x].title}*\n`
for (var y in get_link[x].link_dl) {
ini_info = get_link[x].link_dl[y]
ini_txt += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
ini_txt += `\`\`\`Size : \`\`\`${ini_info.size}\n`
ini_txt += `\`\`\`Link : \`\`\`\n`
down_link = ini_info.link_dl
for (var z in down_link) {
ini_txt += `${z} - ${down_link[z]}\n`
}
}
}
reply(ini_txt)
break
case 'nhentaisearch':
if (!isPremium && !isOwner) return reply(mess.only.prem)
if (args.length == 0) return reply(`Nama Anime Nya Mana\n Contoh: ${prefix + command} Naruto`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/nhentaisearch?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = "Result : \n"
for (var x of get_result) {
ini_txt += `Id : ${x.id}\n`
ini_txt += `Title English : ${x.title_english}\n`
ini_txt += `Title Japanese : ${x.title_japanese}\n`
ini_txt += `Native : ${x.title_native}\n`
ini_txt += `Upload : ${x.date_upload}\n`
ini_txt += `Page : ${x.page}\n`
ini_txt += `Favourite : ${x.favourite}\n\n`
}
reply(ini_txt)
break
case 'nekopoisearch':
if (args.length == 0) return reply(`Nama Anime Nya Mana\n Contoh: ${prefix + command} Naruto`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/nekopoisearch?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = ""
for (var x of get_result) {
ini_txt += `Title : ${x.title}\n`
ini_txt += `Link : ${x.link}\n`
ini_txt += `Thumbnail : ${x.thumbnail}\n\n`
}
reply(ini_txt)
break

//━━━━━━━━━━━━━━━[ FITUR INFORMATION ]━━━━━━━━━━━━━━━━━//

case 'kbbi':
if (args.length == 0) return reply(`Nama Yg Mau Dicari Mana Tod\nContoh: ${prefix + command} kursi`)
get_result = await fetchJson(`https://api.lolhuman.xyz/api/kbbi?apikey=${lolkey}&query=${args.join(" ")}`)
lila = get_result.result
ini_txt = `\`\`\`Kata : ${lila[0].nama}\`\`\`\n`
ini_txt += `\`\`\`Kata Dasar : ${lila[0].kata_dasar}\`\`\`\n`
ini_txt += `\`\`\`Pelafalan : ${lila[0].pelafalan}\`\`\`\n`
ini_txt += `\`\`\`Bentuk Tidak Baku : ${lila[0].bentuk_tidak_baku}\`\`\`\n\n`
for (var x of lila) {
ini_txt += `\`\`\`Kode : ${x.makna[0].kelas[0].kode}\`\`\`\n`
ini_txt += `\`\`\`Kelas : ${x.makna[0].kelas[0].nama}\`\`\`\n`
ini_txt += `\`\`\`Artinya : \n${x.makna[0].kelas[0].deskripsi}\`\`\`\n\n`
ini_txt += `\`\`\`Makna Lain : \n${x.makna[0].submakna}\`\`\`\n `
ini_txt += `\`\`\`Contoh Kalimat : \n${x.makna[0].contoh}\`\`\`\n`
}
reply(ini_txt)
break
case 'jarak':
if (args.length == 0) return reply(`Nama Kotanya Mana Tod\nContoh: ${prefix + command} jakarta - yogyakarta`)
pauls = args.join(" ")
teks1 = pauls.split("-")[0].trim()
teks2 = pauls.split("-")[1].trim()
get_result = await fetchJson(`https://api.lolhuman.xyz/api/jaraktempuh?apikey=${lolkey}&kota1=${teks1}&kota2=${teks2}`)
x = get_result.result
ini_txt = `Informasi Jarak dari ${teks1} ke ${teks2} :\n\n`
ini_txt += `\`\`\`◪ Asal :\`\`\` ${x.from.name}\n`
ini_txt += `\`\`\`◪ Garis Lintang :\`\`\` ${x.from.latitude}\n`
ini_txt += `\`\`\`◪ Garis Bujur :\`\`\` ${x.from.longitude}\n\n`
ini_txt += `\`\`\`◪ Tujuan :\`\`\` ${x.to.name}\n`
ini_txt += `\`\`\`◪ Garis Lintang :\`\`\` ${x.to.latitude}\n`
ini_txt += `\`\`\`◪ Garis Bujur :\`\`\` ${x.to.longitude}\n\n`
ini_txt += `\`\`\`◪ Jarak Tempuh :\`\`\` ${x.jarak}\n`
ini_txt += `\`\`\`◪ Waktu Tempuh :\`\`\`\n`
ini_txt += `   ╭───────────────❏\n`
ini_txt += `❍┤ Kereta Api : ${x.kereta_api}\n`
ini_txt += `❍┤ Pesawat : ${x.pesawat}\n`
ini_txt += `❍┤ Mobil : ${x.mobil}\n`
ini_txt += `❍┤ Motor : ${x.motor}\n`
ini_txt += `❍┤ Jalan Kaki : ${x.jalan_kaki}\n`
ini_txt += `   ╰───────────────❏\n`
reply(ini_txt)
break
case 'wikipedia':
if (args.length == 0) return reply(`Nama Yg Mau Di Cari Mana Tod\nContoh: ${prefix + command} Tahu`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/wiki?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
reply(get_result)
break
case 'translate':
if (args.length == 0) return reply(`Teks Yg Mau Di Translate Mana Tod\nContoh: ${prefix + command} en Tahu Bacem`)
kode_negara = args[0]
args.shift()
ini_txt = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/translate/auto/${kode_negara}?apikey=${lolkey}&text=${ini_txt}`)
get_result = get_result.result
init_txt = `From : ${get_result.from}\n`
init_txt += `To : ${get_result.to}\n`
init_txt += `Original : ${get_result.original}\n`
init_txt += `Translated : ${get_result.translated}\n`
init_txt += `Pronunciation : ${get_result.pronunciation}\n`
reply(init_txt)
break
case 'jadwaltv':
if (args.length == 0) return reply(`Nama Channel Nya Mana Tod\nContoh: ${prefix + command} SCTV`)
channel = args[0]
get_result = await fetchJson(`https://api.lolhuman.xyz/api/jadwaltv/${channel}?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = `Jadwal TV ${channel.toUpperCase()}\n`
for (var x in get_result) {
ini_txt += `${x} - ${get_result[x]}\n`
}
reply(ini_txt)
break
case 'infogempa':
get_result = await fetchJson(`https://api.lolhuman.xyz/api/infogempa?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = `Lokasi : ${get_result.lokasi}\n`
ini_txt += `Waktu : ${get_result.waktu}\n`
ini_txt += `Potensi : ${get_result.potensi}\n`
ini_txt += `Magnitude : ${get_result.magnitude}\n`
ini_txt += `Kedalaman : ${get_result.kedalaman}\n`
ini_txt += `Koordinat : ${get_result.koordinat}`
get_buffer = await getBuffer(get_result.map)
await fadly.sendMessage(from, get_buffer, image, { quoted: fakevo, caption: ini_txt })
break
case 'cuaca':
if (args.length == 0) return reply(`Nama Kotanya Mana Tod\nContoh: ${prefix + command} Temanggung`)
daerah = args[0]
get_result = await fetchJson(`https://api.lolhuman.xyz/api/cuaca/${daerah}?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = `Tempat : ${get_result.tempat}\n`
ini_txt += `Cuaca : ${get_result.cuaca}\n`
ini_txt += `Angin : ${get_result.angin}\n`
ini_txt += `Description : ${get_result.description}\n`
ini_txt += `Kelembapan : ${get_result.kelembapan}\n`
ini_txt += `Suhu : ${get_result.suhu}\n`
ini_txt += `Udara : ${get_result.udara}\n`
ini_txt += `Permukaan laut : ${get_result.permukaan_laut}\n`
await fadly.sendMessage(from, { degreesLatitude: get_result.latitude, degreesLongitude: get_result.longitude }, location, { quoted: fakevo })
reply(ini_txt)
break
case 'covidindo':
get_result = await fetchJson(`https://api.lolhuman.xyz/api/corona/indonesia?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = `Positif : ${get_result.positif}\n`
ini_txt += `Sembuh : ${get_result.sembuh}\n`
ini_txt += `Dirawat : ${get_result.dirawat}\n`
ini_txt += `Meninggal : ${get_result.meninggal}`
reply(ini_txt)
break
case 'covidglobal':
get_result = await fetchJson(`https://api.lolhuman.xyz/api/corona/global?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = `Positif : ${get_result.positif}\n`
ini_txt += `Sembuh : ${get_result.sembuh}\n`
ini_txt += `Dirawat : ${get_result.dirawat}\n`
ini_txt += `Meninggal : ${get_result.meninggal}`
reply(ini_txt)
break

//━━━━━━━━━━━━━━━[ FITUR RANDOM TEXT ]━━━━━━━━━━━━━━━━━//

case 'quotes':
quotes = await fetchJson(`https://api.lolhuman.xyz/api/random/quotes?apikey=${lolkey}`)
quotes = quotes.result
author = quotes.by
quotes = quotes.quote
reply(`_${quotes}_\n\n*― ${author}*`)
break
case 'quotesanime':
quotes = await fetchJson(`https://api.lolhuman.xyz/api/random/quotesnime?apikey=${lolkey}`)
quotes = quotes.result
quote = quotes.quote
char = quotes.character
anime = quotes.anime
episode = quotes.episode
reply(`_${quote}_\n\n*― ${char}*\n*― ${anime} ${episode}*`)
break
case 'quotesdilan':
quotedilan = await fetchJson(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=${lolkey}`)
reply(quotedilan.result)
break
case 'quotesimage':
get_result = await getBuffer(`https://api.lolhuman.xyz/api/random/${command}?apikey=${lolkey}`)
await fadly.sendMessage(from, get_result, image, { quotes: ftrol })
break
case 'katabijak':
get_result = await fetchJson(`https://api.lolhuman.xyz/api/random/${command}?apikey=${lolkey}`)
reply(get_result.result)
break
case 'randomnama':
anu = await fetchJson(`https://api.lolhuman.xyz/api/random/nama?apikey=${lolkey}`)
reply(anu.result)
break

//━━━━━━━━━━━━━━━[ FITUR SEARCH ]━━━━━━━━━━━━━━━━━//

case 'gimage':
case 'gimg':
if (args.length == 0) return reply(`Nama Yg Mau Dicari Mana Tod\nContoh: ${prefix + command} Sandrinna`)
query = args.join(" ")
ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/gimage?apikey=${lolkey}&query=${query}`)
await fadly.sendMessage(from, ini_buffer, image, { quoted: fakevo })
break
case 'wallpapersearch':
case 'ws':
if (args.length == 0) return reply(`Nama Yg Mau Dicari Mana Tod\nContoh: ${prefix + command} Sandrinna`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/wallpaper?apikey=${lolkey}&query=${query}`)
ini_buffer = await getBuffer(get_result.result)
await fadly.sendMessage(from, ini_buffer, image, { quoted: fakevo })
break
case 'playstore':
if (args.length == 0) return reply(`Nama Aplikasinya Mana Tod\nContoh: ${prefix + command} tiktok`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/playstore?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = 'Play Store Search : \n'
for (var x of get_result) {
ini_txt += `Name : ${x.title}\n`
ini_txt += `ID : ${x.appId}\n`
ini_txt += `Developer : ${x.developer}\n`
ini_txt += `Link : ${x.url}\n`
ini_txt += `Price : ${x.priceText}\n`
ini_txt += `Price : ${x.price}\n\n`
}
reply(ini_txt)
break
case 'shopee':
if (args.length == 0) return reply(`Nama Barang Yg Mau Di Cari Mana Tod\nContoh: ${prefix + command} sepatu`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/shopee?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = 'Shopee Search : \n'
for (var x of get_result) {
ini_txt += `Name : ${x.name}\n`
ini_txt += `Terjual : ${x.sold}\n`
ini_txt += `Stock : ${x.stock}\n`
ini_txt += `Lokasi : ${x.shop_loc}\n`
ini_txt += `Link : ${x.link_produk}\n\n`
}
reply(ini_txt)
break
case 'google':
if (args.length == 0) return reply(`Nama Yg Mau Cari Mana Tod\nContoh: ${prefix + command} sandrinna`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/gsearch?apikey=${lolkey}&query=${query}`)
get_result = get_result.result
ini_txt = 'Google Search : \n'
for (var x of get_result) {
ini_txt += `Title : ${x.title}\n`
ini_txt += `Link : ${x.link}\n`
ini_txt += `Desc : ${x.desc}\n\n`
}
reply(ini_txt)
break
case 'lirik':
if (args.length < 1) return reply('Judulnya?')
reply(mess.wait)
teks = body.slice(7)
lirikLagu(teks).then((res) => {
let lirik = `*Hasil Pencarian Dari : ${q}*
\n${res[0].result}`
	reply(lirik)
})
break

//━━━━━━━━━━━━━━━[ FITUR PRIMBON ]━━━━━━━━━━━━━━━━━//

case 'artinama':
if (args.length == 0) return reply(`Namamya Mana Tod\nContoh: ${prefix + command} Caca`)
ini_nama = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/artinama?apikey=${lolkey}&nama=${ini_nama}`)
reply(get_result.result)
break
case 'jodoh':
if (args.length == 0) return reply(`Namanya Mana Tod\nContoh: ${prefix + command} Fadly ID`)
ini_nama = args.join(" ").split("&")
nama1 = ini_nama[0].trim()
nama2 = ini_nama[1].trim()
get_result = await fetchJson(`https://api.lolhuman.xyz/api/jodoh/${nama1}/${nama2}?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = `Positif : ${get_result.positif}\n`
ini_txt += `Negative : ${get_result.negatif}\n`
ini_txt += `Deskripsi : ${get_result.deskripsi}`
reply(ini_txt)
break
case 'jadian':
if (args.length == 0) return reply(`Tanggal Jadiannya Mana Tod\nContoh: ${prefix + command} 12 12 2020`)
tanggal = args[0]
bulan = args[1]
tahun = args[2]
get_result = await fetchJson(`https://api.lolhuman.xyz/api/jadian/${tanggal}/${bulan}/${tahun}?apikey=${lolkey}`)
get_result = get_result.result
ini_txt = `Karakteristik : ${get_result.karakteristik}\n`
ini_txt += `Deskripsi : ${get_result.deskripsi}`
reply(ini_txt)
break
case 'tebakumur':
if (args.length == 0) return reply(`Namanya Mana Tod\nContoh: ${prefix + command} Caca`)
ini_name = args.join(" ")
if (args.length == 0) return reply(`Example: ${prefix + command} Fadly ID`)
get_result = await fetchJson(`https://api.lolhuman.xyz/api/tebakumur?apikey=${lolkey}&name=${ini_name}`)
get_result = get_result.result
ini_txt = `Nama : ${get_result.name}\n`
ini_txt += `Umur : ${get_result.age}`
reply(ini_txt)
break
case 'wangy':
if (!q) return
qq = q.toUpperCase()
awikwok = `${qq} ${qq} ${qq} ❤️ ❤️ ❤️ WANGY WANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya rambut ${qq} wangyy aku mau nyiumin aroma wangynya ${qq} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~ AAAAAH ${qq} keluar pertama kali di anime juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${qq} AAAAA LUCCUUUUUUUUUUUUUUU............ ${qq} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${qq} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${qq} gw ... ${qq} di laptop ngeliatin gw, ${qq} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${q} aku gak mau merelakan ${qq} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${qq} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH`
reply(awikwok)
break
       case 'cekmati':
              if (!q) return reply(mess.wrongFormat)
              predea = await axios.get(`https://api.agify.io/?name=${q}`)
              reply(`Nama : ${predea.data.name}\n*Mati Pada Umur :* ${predea.data.age} Tahun.\n\n_Cepet Cepet Tobat Bro Soalnya Mati ga ada yang tau_`)
              break
       case 'toxic':
              Toxic().then(toxic => {
              reply (toxic)
})
              break
        case 'citacita':
              const cita =['http://piyobot.000webhostapp.com/citacita1.mp3','http://piyobot.000webhostapp.com/citacita2.mp3','http://piyobot.000webhostapp.com/citacita3.mp3','http://piyobot.000webhostapp.com/citacita4.mp3','http://piyobot.000webhostapp.com/citacita5.mp3','http://piyobot.000webhostapp.com/citacita6.mp3','http://piyobot.000webhostapp.com/citacita7.mp3','http://piyobot.000webhostapp.com/citacita8.mp3','http://piyobot.000webhostapp.com/citacita9.mp3','http://piyobot.000webhostapp.com/citacita10.mp3','http://piyobot.000webhostapp.com/citacita11.mp3','http://piyobot.000webhostapp.com/citacita12.mp3','http://piyobot.000webhostapp.com/citacita13.mp3','http://piyobot.000webhostapp.com/citacita14.mp3','http://piyobot.000webhostapp.com/citacita15.mp3','http://piyobot.000webhostapp.com/citacita16.mp3','http://piyobot.000webhostapp.com/citacita17.mp3','http://piyobot.000webhostapp.com/citacita18.mp3','http://piyobot.000webhostapp.com/citacita19.mp3','http://piyobot.000webhostapp.com/citacita20.mp3','http://piyobot.000webhostapp.com/citacita21.mp3','http://piyobot.000webhostapp.com/citacita22.mp3','http://piyobot.000webhostapp.com/citacita23.mp3','http://piyobot.000webhostapp.com/citacita24.mp3','http://piyobot.000webhostapp.com/citacita25.mp3','http://piyobot.000webhostapp.com/citacita26.mp3','http://piyobot.000webhostapp.com/citacita27.mp3','http://piyobot.000webhostapp.com/citacita28.mp3','http://piyobot.000webhostapp.com/citacita29.mp3','http://piyobot.000webhostapp.com/citacita30.mp3','http://piyobot.000webhostapp.com/citacita31.mp3','http://piyobot.000webhostapp.com/citacita32.mp3','http://piyobot.000webhostapp.com/citacita33.mp3','http://piyobot.000webhostapp.com/citacita34.mp3','http://piyobot.000webhostapp.com/citacita35.mp3']
              const cita3 = cita[Math.floor(Math.random() * cita.length)]
              cita2 = await getBuffer(cita3)
              fadly.sendMessage(from, cita2, audio,{mimetype: 'audio/mp4', ptt:true, quoted: mek})
              break
       case 'apakah':
              apakah = body.slice(1)
              const apa =['Iya','Tidak','Bisa Jadi','Coba Ulangi']
              const kah = apa[Math.floor(Math.random() * apa.length)]
              fadly.sendMessage(from, '*Pertanyaan :* '+apakah+'\n*Jawaban :* '+ kah, text, { quoted: mek })
              break
       case 'rate':
       case 'nilai':
              rate = body.slice(1)
              const ra =['0','4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
              const te = ra[Math.floor(Math.random() * ra.length)]
              fadly.sendMessage(from, '*Pertanyaan :* '+rate+'\n*Jawaban :* '+ te+'%', text, { quoted: mek })
              break
       case 'gantengcek':
       case 'cekganteng':
              ganteng = body.slice(1)
              const gan =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
              const teng = gan[Math.floor(Math.random() * gan.length)]
              fadly.sendMessage(from, '*Pertanyaan :* '+ganteng+'\n*Jawaban :* '+ teng+'%', text, { quoted: mek })
              break
       case 'cantikcek':
       case 'cekcantik':
              cantik = body.slice(1)
              const can =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
              const tik = can[Math.floor(Math.random() * can.length)]
              fadly.sendMessage(from, '*Pertanyaan :* '+cantik+'\n*Jawaban :* '+ tik+'%', text, { quoted: mek })
              break
       case 'cekwatak':
              var namao = pushname
              var prfx = await fadly.getProfilePicture(sender)
              const watak = ['top deh pokoknya','penyayang','pemurah','Pemarah','Pemaaf','Penurut','Baik','baperan','Baik-Hati','penyabar','UwU','Suka Membantu']
              const wtk = watak[Math.floor(Math.random() * (watak.length))]
              const ratenyaasu = ['100%','95%','90%','85%','80%','75%','70%','65%','60%','55%','50%','45%','40%','35%','30%','25%','20%','15%','10%','5%']
              const akhlak = ratenyaasu[Math.floor(Math.random() * (ratenyaasu.length))]
              const sifat = ['Penolong','Suka Membantu','Saling Menolong','Perhatian','Ngak Cuek','Romantis','Dermawan','Cool','Peduli Kepada Sesama','Suka Berkata Kasar']
              const sft = sifat[Math.floor(Math.random() * (sifat.length))]
              const hobby = ['Memasak','Membantu Atok','Mabar','Nobar','Coli','Colmek','Sosmedtan','Membantu Orang lain','Nonton Anime','Nonton Drakor','Naik Motor','Nyanyi','Menari','Bertumbuk','Menggambar','Foto fotoan Ga jelas','Maen Game','Berbicara Sendiri']
              const hby = hobby[Math.floor(Math.random() * (hobby.length))]
              const kelebihan = ['Soleh dan Soleha','Pintar','Rajin','Teladan']
              const klbh = kelebihan[Math.floor(Math.random() * (kelebihan.length))]
              const tipe = ['cool','idaman','Alami','Keren','Ideal','Dia Bamget','normal','elite','epic','Legend']
              const typo = tipe[Math.floor(Math.random() * (tipe.length))]
              await reply(`[ INTROGASI SUKSES ]\n\n[Nama]:${namao}\n\n[Watak]:${wtk}\n\n[Akhlak✨]:${akhlak}\n\n[Sifat]:${sft}\n\n[Hobby]:${hby}\n\n[Tipe]:${typo}\n\n[Kelebihan]:${klbh}\n\nNote\n\n_ini hanya main main_`)
              break
       case 'hobby':
              hobby = body.slice(1)
              const by = hobby[Math.floor(Math.random() * hobby.length)]
              fadly.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nJawaban : '+ by, text, { quoted: mek })
              break
       case 'bisakah':
              bisakah = body.slice(1)
              const bisa =['Bisa','Tidak Bisa','Coba Ulangi','MANA GW TAU']
              const keh = bisa[Math.floor(Math.random() * bisa.length)]
              fadly.sendMessage(from, '*Pertanyaan :* '+bisakah+'\n*Jawaban :* '+ keh, text, { quoted: mek })
              break
       case 'kapankah':
              kapankah = body.slice(1)
              const kapan =['Besok','Lusa','Tadi','4 Hari Lagi','5 Hari Lagi','6 Hari Lagi','1 Minggu Lagi','2 Minggu Lagi','3 Minggu Lagi','1 Bulan Lagi','2 Bulan Lagi','3 Bulan Lagi','4 Bulan Lagi','5 Bulan Lagi','6 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','6 Tahun Lagi','1 Abad lagi','3 Hari Lagi']
              const koh = kapan[Math.floor(Math.random() * kapan.length)]
              fadly.sendMessage(from, '*Pertanyaan :* '+kapankah+'\n*Jawaban :* '+ koh, text, { quoted: mek })
              break

//━━━━━━━━━━━━━━━[ FITUR STALK ]━━━━━━━━━━━━━━━━━//

case 'stalkig':
case 'igstalk':
if (args.length == 0) return reply(`Usernamenya Mana Tod\nContoh: ${prefix + command} Sandrinna_11`)
username = args[0]
ini_result = await fetchJson(`https://api.lolhuman.xyz/api/stalkig/${username}?apikey=${lolkey}`)
ini_result = ini_result.result
ini_buffer = await getBuffer(ini_result.photo_profile)
ini_txt = `Username : ${ini_result.username}\n`
ini_txt += `Full Name : ${ini_result.fullname}\n`
ini_txt += `Posts : ${ini_result.posts}\n`
ini_txt += `Followers : ${ini_result.followers}\n`
ini_txt += `Following : ${ini_result.following}\n`
ini_txt += `Bio : ${ini_result.bio}`
fadly.sendMessage(from, ini_buffer, image, { caption: ini_txt })
break
case 'stalktiktok':
case 'tiktokstalk':
case 'ttstalk':
case 'stalktt':
if (args.length == 0) return reply(`Usernamenya Mana Tod\nContoh: ${prefix + command} Sandrinna`)
stalk_toktok = args[0]
get_result = await fetchJson(`https://api.lolhuman.xyz/api/stalktiktok/${stalk_toktok}?apikey=fadly`)
get_result = get_result.result
ini_txt = `Username : ${get_result.username}\n`
ini_txt += `Nickname : ${get_result.nickname}\n`
ini_txt += `Bio : ${get_result.nickname}\n`
ini_txt += `Followers : ${get_result.followers}\n`
ini_txt += `Followings : ${get_result.followings}\n`
ini_txt += `Likes : ${get_result.likes}\n`
ini_txt += `Video : ${get_result.video}\n`
pp_tt = await getBuffer(get_result.user_picture)
fadly.sendMessage(from, pp_tt, image, { quoted: fakevo, caption: ini_txt })
break
case 'stalkgithub':
case 'githubstalk':
case 'ghstalk':
if (args.length == 0) return reply(`Usernamenya Mana Tod\nContoh: ${prefix + command} Caca`)
username = args[0]
ini_result = await fetchJson(`https://api.lolhuman.xyz/api/github/${username}?apikey=${lolkey}`)
ini_result = ini_result.result
ini_buffer = await getBuffer(ini_result.avatar)
ini_txt = `Name : ${ini_result.name}\n`
ini_txt += `Link : ${ini_result.url}\n`
ini_txt += `Public Repo : ${ini_result.public_repos}\n`
ini_txt += `Public Gists : ${ini_result.public_gists}\n`
ini_txt += `Followers : ${ini_result.followers}\n`
ini_txt += `Following : ${ini_result.following}\n`
ini_txt += `Bio : ${ini_result.bio}`
fadly.sendMessage(from, ini_buffer, image, { caption: ini_txt })
break

//━━━━━━━━━━━━━━━[ FITUR RANDOM IMAGE ]━━━━━━━━━━━━━━━━━//

case 'art':
case 'bts':
case 'exo':
case 'elf':
case 'loli':
case 'neko':
case 'waifu':
case 'shota':
case 'husbu':
case 'sagiri':
case 'shinobu':
case 'megumin':
case 'wallnime':
getBuffer(`https://api.lolhuman.xyz/api/random/${command}?apikey=${lolkey}`).then((gambar) => {
reply(mess.wait)
fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh'})
})
break
case 'chiisaihentai':
case 'trap':
case 'blowjob':
case 'yaoi':
case 'ecchi':
case 'hentai':
case 'ahegao':
case 'hololewd':
case 'sideoppai':
case 'animefeets':
case 'animebooty':
case 'animethighss':
case 'animearmpits':
case 'hentaifemdom':
case 'lewdanimegirls':
case 'biganimetiddies':
case 'hentai4everyone':
if (!isPremium && !isOwner) return reply(mess.only.prem)
await getBuffer(`https://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=${lolkey}`).then((gambar) => {
reply(mess.wait)
fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh'})
})
break

//━━━━━━━━━━━━━━━[ FITUR MAKER ]━━━━━━━━━━━━━━━━━//

case 'sertiepep':
case 'sertiff':
case 'sertifreefire':
if (args.length == 0) return reply(`Example: ${prefix + command} Fadly ID`)
                    ini_txt = args.join(" ")
                    getBuffer(`https://sertiojanganzapi.nasihosting.com/serti/serti1/img.php?nama=${ini_txt}`).then((gambar) => {
                        fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh' })
                    })
                    break
case 'pemandangan':
if (args.length == 0) return reply(`Example: ${prefix + command} Fadly ID`)
                    ini_txt = args.join(" ")
                    getBuffer(`https://api-fadly.herokuapp.com/api/maker?text=${ini_txt}&apikey=${fadlykey}`).then((gambar) => {
                        fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh' })
                    })
                    break
case 'pemandangan3d':
if (args.length == 0) return reply(`Example: ${prefix + command} Fadly ID`)
                    ini_txt = args.join(" ")
                    getBuffer(`https://api-fadly.herokuapp.com/api/maker3d?text=${ini_txt}&apikey=${fadlykey}`).then((gambar) => {
                        fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh' })
                    })
                    break
                    
//━━━━━━━━━━━━━━━[ FITUR WALLPAPER ]━━━━━━━━━━━━━━━━━//
                    
case 'wallpaperteknologi':
await getBuffer(`https://api-fadly.herokuapp.com/api/wallpaper/teknologi?apikey=${fadlykey}`).then((gambar) => {
reply(mess.wait)
fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh'})
})
break
case 'wallpaperprograming':
await getBuffer(`https://api-fadly.herokuapp.com/api/wallpaper/programming?apikey=${fadlykey}`).then((gambar) => {
reply(mess.wait)
fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh'})
})
break
case 'wallpapercyberspace':
await getBuffer(`https://api-fadly.herokuapp.com/api/wallpaper/cyberspace?apikey=${fadlykey}`).then((gambar) => {
reply(mess.wait)
fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh'})
})
break
case 'wallpapermuslim':
await getBuffer(`https://api-fadly.herokuapp.com/api/wallpaper/muslim?apikey=${fadlykey}`).then((gambar) => {
reply(mess.wait)
fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh'})
})
break
case 'wallpapermountainview':
await getBuffer(`https://api-fadly.herokuapp.com/api/wallpaper/mountainview?apikey=${fadlykey}`).then((gambar) => {
reply(mess.wait)
fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh'})
})
break

//━━━━━━━━━━━━━━━[ FITUR TEXT PRO ]━━━━━━━━━━━━━━━━━//

                case 'blackpink':
                case 'neon':
                case 'greenneon':
                case 'advanceglow':
                case 'futureneon':
                case 'sandwriting':
                case 'sandsummer':
                case 'sandengraved':
                case 'metaldark':
                case 'neonlight':
                case 'holographic':
                case 'text1917':
                case 'minion':
                case 'deluxesilver':
                case 'newyearcard':
                case 'bloodfrosted':
                case 'halloween':
                case 'jokerlogo':
                case 'fireworksparkle':
                case 'natureleaves':
                case 'bokeh':
                case 'toxic':
                case 'strawberry':
                case 'box3d':
                case 'roadwarning':
                case 'breakwall':
                case 'Masih':
                case 'luxury':
                case 'cloud':
                case 'summersand':
                case 'horrorblood':
                case 'thunder':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Fadly ID`)
                    ini_txt = args.join(" ")
                    getBuffer(`https://api.lolhuman.xyz/api/textprome/${command}?apikey=${lolkey}&text=${ini_txt}`).then((gambar) => {
                        fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh' })
                    })
                    break
                case 'pornhub':
                case 'glitch':
                case 'avenger':
                case 'space':
                case 'ninjalogo':
                case 'marvelstudio':
                case 'lionlogo':
                case 'wolflogo':
                case 'steel3d':
                case 'wallgravity':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Fadly ID`)
                    txt1 = args[0]
                    txt2 = args[1]
                    getBuffer(`https://api.lolhuman.xyz/api/textprome2/${command}?apikey=${lolkey}&text1=${txt1}&text2=${txt2}`).then((gambar) => {
                        fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh' })
                    })
                    break
                   
//━━━━━━━━━━━━━━━[ FITUR PHOTOOXY ]━━━━━━━━━━━━━━━━━//
                    
                case 'shadow':
                case 'cup':
                case 'cup1':
                case 'romance':
                case 'smoke':
                case 'burnpaper':
                case 'lovemessage':
                case 'undergrass':
                case 'love':
                case 'coffe':
                case 'woodheart':
                case 'woodenboard':
                case 'summer3d':
                case 'wolfmetal':
                case 'nature3d':
                case 'underwater':
                case 'golderrose':
                case 'summernature':
                case 'letterleaves':
                case 'glowingneon':
                case 'fallleaves':
                case 'flamming':
                case 'harrypotter':
                case 'carvedwood':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Fadly ID`)
                    ini_txt = args.join(" ")
                    getBuffer(`https://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${lolkey}&text=${ini_txt}`).then((gambar) => {
                        fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh' })
                    })
                    break
                case 'tiktok':
                case 'arcade8bit':
                case 'battlefield4':
                case 'pubg':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Fadly ID`)
                    txt1 = args[0]
                    txt2 = args[1]
                    getBuffer(`https://api.lolhuman.xyz/api/photooxy2/${command}?apikey=${lolkey}&text1=${txt1}&text2=${txt2}`).then((gambar) => {
                        fadly.sendMessage(from, gambar, image, { quoted: fakevo, caption: 'Neh' })
                    })
                    break
                    
//━━━━━━━━━━━━━━━[ FITUR EPHOTO 360 Menu ]━━━━━━━━━━━━━━━━━//

                case 'wetglass':
                case 'multicolor3d':
                case 'watercolor':
                case 'luxurygold':
                case 'galaxywallpaper':
                case 'lighttext':
                case 'beautifulflower':
                case 'puppycute':
                case 'royaltext':
                case 'heartshaped':
                case 'birthdaycake':
                case 'galaxystyle':
                case 'hologram3d':
                case 'greenneon':
                case 'glossychrome':
                case 'greenbush':
                case 'metallogo':
                case 'noeltext':
                case 'glittergold':
                case 'textcake':
                case 'starsnight':
                case 'wooden3d':
                case 'textbyname':
                case 'writegalacy':
                case 'galaxybat':
                case 'snow3d':
                case 'birthdayday':
                case 'goldplaybutton':
                case 'silverplaybutton':
                case 'freefire':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Fadly ID`)
                    ini_txt = args.join(" ")
                    getBuffer(`https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${lolkey}&text=${ini_txt}`).then((gambar) => {
                        fadly.sendMessage(from, gambar, image, { quoted: mek, caption: 'Neh' })
                    })
                    break

//━━━━━━━━━━━━━━━[ FITUR ASUPAN ]━━━━━━━━━━━━━━━━━//

case 'asupan':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.result)
fadly.sendMessage(from, buffer, video, {quoted: fakevo, caption: 'Neh'})
break
case 'asupancecan':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/cecan?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
fadly.sendMessage(from, buffer, image, {quoted: fakevo, caption: 'Neh'})
break
case 'asupanhijaber':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/hijaber?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
fadly.sendMessage(from, buffer, image, {quoted: fakevo, caption: 'Neh'})
break
case 'asupansantuy':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/santuy?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
fadly.sendMessage(from, buffer, video, {quoted: fakevo, caption: 'Neh'})
break
case 'asupanukhti':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/ukty?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
fadly.sendMessage(from, buffer, video, {quoted: fakevo, caption: 'Neh'})
break
case 'asupanbocil':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/bocil?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
fadly.sendMessage(from, buffer, video, {quoted: fakevo, caption: 'Neh'})
break
case 'asupanghea':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/ghea?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
fadly.sendMessage(from, buffer, video, {quoted: fakevo, caption: 'Neh'})
break
case 'asupanrika':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/rikagusriani?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
fadly.sendMessage(from, buffer, video, {quoted: fakevo, caption: 'Neh'})
break

//━━━━━━━━━━━━━━━[ FITUR CECAN ]━━━━━━━━━━━━━━━━━//

case 'cecanvietnam':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/vietnam?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
fadly.sendMessage(from, goo, image, {quoted: fakevo, caption: 'Neh'})
break
case 'cecanmalaysia':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/malaysia?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
fadly.sendMessage(from, goo, image, {quoted: fakevo, caption: 'Neh'})
break
case 'cecankorea':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/korea?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
fadly.sendMessage(from, goo, image, {quoted: fakevo, caption: 'Neh'})
break
case 'cecanindonesia':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/indonesia?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
fadly.sendMessage(from, goo, image, {quoted: fakevo, caption: 'Neh'})
break
case 'cecanjapan':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/japan?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
fadly.sendMessage(from, goo, image, {quoted: fakevo, caption: 'Neh'})
break
case 'cecanthailand':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/thailand?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
fadly.sendMessage(from, goo, image, {quoted: fakevo, caption: 'Neh'})
break

//━━━━━━━━━━━━━━━[ FITUR RANDOM MEME ]━━━━━━━━━━━━━━━━━//

case 'meme':
await getBuffer(`https://api.lolhuman.xyz/api/random/meme?apikey=${lolkey}`).then((gambar) => {
reply(mess.wait)
fadly.sendMessage(from, gambar, image, {quoted: fakevo, caption: 'Neh'})
})
break
case 'darkjoke':
await getBuffer(`https://api.lolhuman.xyz/api/meme/darkjoke?apikey=${lolkey}`).then((gambar) => {
reply(mess.wait)
fadly.sendMessage(from, gambar, image, {quoted: fakevo, caption: 'Neh'})
})
break
case 'memeindo':
await getBuffer(`https://api.lolhuman.xyz/api/meme/memeindo?apikey=${lolkey}`).then((gambar) => {
reply(mess.wait)
fadly.sendMessage(from, gambar, image, {quoted: fakevo, caption: 'Neh'})
})
break

//━━━━━━━━━━━━━━━[ FITUR INFO ]━━━━━━━━━━━━━━━━━//

case 'info':
teks =
`┏━➤ 「 INFO BOT 」
┃┃✯ Nama Owner : Fadly ID
┃┃✯ Nama Bot : ${botname}
┃┃✯ Prefix : Multi
┃┃✯ Platform : Ubuntu Linux
┃┃✯ Runtime : ${runtime(process.uptime())}
┗━━━━━━━`
gam = fs.readFileSync('./media/caca.jpg')
but = [
          { buttonId: `${prefix}menu`, buttonText: { displayText: 'BACK TO MENU' }, type: 1 }
        ]
        sendButImage(from, teks, faketeks, gam, but)
break
case 'infobot':
case 'botinfo':
anu =
`Syarat & Ketentuan *CacaBot*

• Nomor CacaBot resmi hanya *https://wa.me/6289523883972*
• CacaBot *hanya menyimpan nomor anda* di dalam database sebagai nomor user
• CacaBot *tidak pernah meminta informasi pribadi* anda seperti alamat rumah, asal daerah dan lain lain.
• Dilarang melakukan spam terhadap bot
• Dilarang menelpon bot
• Harap menggunakan fitur bot dengan bijak
• CacaBot tidak menyimpan foto, video, atau media apapun yang anda kirimkan
• CacaBot *tidak bertanggung jawab atas fitur apapun yang anda gunakan*
• Apabila menemukan bug, error, ataupun request fitur harap hubungi devloper
• CacaBot *berhak untuk memblokir* atau melakukan ban terhadap user dengan alasan maupun tanpa alasan
• Group CacaBot Hanya 2
  Group 1 :
  https://chat.whatsapp.com/GMZirJJzjI87bDlRkxx8OI
  Group 2 :
  https://chat.whatsapp.com/DxrmJzsXON0DrqYnZgIe2D
  
_*Regards : Fadly ID*_`
fadly.sendMessage(from, anu, text, {quoted:mek})
break
case 'sewabot':
teks =
`╭─❒ LIST JASAWA BOT
├ Seminggu : 5.000
├ Sebulan : 10.000
└❏
╭─❒ FITUR BANYAK
├ ANTILINK
├ ANTIVIRTEX
├ WELCOME
├ STICKER
├ DLL
└❏
╭─❒ NOTE
├ TIDAK MENERIMA PERMANEN
├ BOT *TIDAK* ON 24 JAM, KARENA GA PAKAI WIFI/RDP
└❏
Jika Ingin Sewa Bot
Silahkan Hubungi Owner
https://wa.me/62895379169488?text=Sewa+bot+dly`
fadly.sendMessage(from, teks, text, {quoted:mek})
break
case 'gopay':
but = [
{ buttonId: `${prefix}done`, buttonText: { displayText: 'DONE' }, type: 1 }
]
sendButton(from, "GOPAY : 0895379169488 (XDLYY STORE)", faketeks, but, mek)
break
case 'dana':
but = [
{ buttonId: `${prefix}done`, buttonText: { displayText: 'DONE' }, type: 1 }
]
sendButton(from, "DANA : 0895379169488 (KHUNAENI)", faketeks, but, mek)
break
case 'ovo':
but = [
{ buttonId: `${prefix}done`, buttonText: { displayText: 'DONE' }, type: 1 }
]
sendButton(from, "OVO : 0895379169488 (KHUNAENI)", faketeks, but, mek)
break
case "runtime":
case "test":
run = process.uptime();
teks = `${kyun(run)}`;
reply(teks);
break;
case "speed":
case "ping":
const timestamp = speed();
const latensi = speed() - timestamp;
exec(`neofetch --stdout`, (error, stdout, stderr) => {
const child = stdout.toString("utf-8");
const ssd = child.replace(/Memory:/, "Ram:");
const pingnya = `*${ssd}「 Merespon Dalam 」*\n\n${latensi.toFixed(4)} Second`;
reply(pingnya);
});
break;
case 'donasi':
teks = `Mau Donasi Apa Liat Doank ?
Klo Mau Donasi Pilih Aja Di Bawah

Makasih Kalo Mau Donasi Beneran
Semoga Rejekinya Tambah Lancar Amin

    ╭───────────────❏
 ❍┤ Gopay : SCAN DIATAS
 ❍┤ Dana : 0895379169488
 ❍┤ Ovo : 0895379169488
 ❍┤ Pulsa : 0895379169488
 ❍┤ Saweria : https://saweria.co/xdlyy
    ╰───────────────❏`
gam = fs.readFileSync('./media/qris.jpg')
but = [
          { buttonId: `${prefix}menu`, buttonText: { displayText: 'BACK TO MENU' }, type: 1 }
        ]
        sendButImage(from, teks, faketeks, gam, but)
break

//━━━━━━━━━━━━━━━[ FITUR GAME ]━━━━━━━━━━━━━━━━━//

case 'truth':
const trut = ['Pernah suka sama siapa aja? berapa lama?', 'Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)', 'apa ketakutan terbesar kamu?', 'pernah suka sama orang dan merasa orang itu suka sama kamu juga?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'pernah gak nyuri uang nyokap atau bokap? Alesanya?', 'hal yang bikin seneng pas lu lagi sedih apa', 'pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?', 'pernah jadi selingkuhan orang?', 'hal yang paling ditakutin', 'siapa orang yang paling berpengaruh kepada kehidupanmu', 'hal membanggakan apa yang kamu dapatkan di tahun ini', 'siapa orang yang bisa membuatmu sange', 'siapa orang yang pernah buatmu sange', '(bgi yg muslim) pernah ga solat seharian?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'suka mabar(main bareng)sama siapa?', 'pernah nolak orang? alasannya kenapa?', 'Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget', 'pencapaian yang udah didapet apa aja ditahun ini?', 'kebiasaan terburuk lo pas di sekolah apa?']
var ttrth = (await fetchJson(`https://pencarikode.xyz/api/truthid?apikey=APIKEY`)).message
var bff = Buffer.alloc(0)
sendButLocation(from, `_*Truth*_\n\n${ttrth}`, `${tampilUcapan}`, fs.readFileSync("./media/trorda.jpeg"), [ { buttonId: `${prefix}truth`, buttonText: { displayText: "➡️ NEXT" }, type: 1 } ], { contextInfo: { mentionedJid: [sender] }})                 
break
case 'dare':
const dare = ['Prank mak bilang "aku hamil" (bagi cewe) atau "Aku hamilin anak orang" (bagi cowo)\nrecord terus kirim kesini', 'Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot 🤥 setiap ngetik di gc/pc selama 1 hari', 'kirim voice note bilang can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you', 'prank chat mantan dan bilang " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
var der = (await fetchJson(`https://pencarikode.xyz/api/dareid?apikey=APIKEY`)).message
var bff = Buffer.alloc(0)
sendButLocation(from, `_*Dare*_\n\n${der}`, `${tampilUcapan}`, fs.readFileSync("./media/trorda.jpeg"), [ { buttonId: `${prefix}truth`, buttonText: { displayText: "Truth" }, type: 1 }, { buttonId: `${prefix}dare`, buttonText: { displayText: "Dare" }, type: 1} ], { contextInfo: { mentionedJid: [sender] }})
break
case 'tebakkalimat':
anu = await fetchJson(`https://velgrynd.herokuapp.com/api/tebak/kalimat`, {method: 'get'})
get = `*${anu.result.soal}*`
setTimeout( () => {
fadly.sendMessage(from, 'Jawaban: '
+anu.result.jawaban, text, {quoted: fakevo})
}, 60000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_10 Detik lagi..._', text)
}, 50000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_20 Detik lagi..._', text)
}, 40000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_30 Detik lagi..._', text)
}, 30000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_40 Detik lagi..._', text)
}, 20000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_50 Detik lagi..._', text)
}, 10000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_60 Detik lagi..._', text)
}, 2500) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, get, text, {quoted: fakevo})
}, 0) // 1000 = 1s,
break
case 'tebaktebakan':
anu = await fetchJson(`https://velgrynd.herokuapp.com/api/tebak/tebakan`, {method: 'get'})
get = `*${anu.result.soal}*`
setTimeout( () => {
fadly.sendMessage(from, 'Jawaban: '
+anu.result.jawaban, text, {quoted: fakevo}) 
}, 60000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_10 Detik lagi..._', text) 
}, 50000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_20 Detik lagi..._', text) 
}, 40000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_30 Detik lagi..._', text)
}, 30000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_40 Detik lagi..._', text) 
}, 20000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_50 Detik lagi..._', text) 
}, 10000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_60 Detik lagi..._', text)
}, 2500) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, get, text, {quoted: fakevo})
}, 0) // 1000 = 1s,
break
case 'tebaklirik':
anu = await fetchJson(`https://velgrynd.herokuapp.com/api/tebak/lirik`, {method: 'get'})
get = `*${anu.result.question}*`
setTimeout( () => {
fadly.sendMessage(from, 'Jawaban: '
+anu.result.answer, text, {quoted: fakevo}) 
}, 60000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_10 Detik lagi..._', text) 
}, 50000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_20 Detik lagi..._', text) 
}, 40000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_30 Detik lagi..._', text) 
}, 30000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_40 Detik lagi..._', text) 
}, 20000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_50 Detik lagi..._', text) 
}, 10000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_60 Detik lagi..._', text) 
}, 2500) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, get, text, {quoted: fakevo})
}, 0) // 1000 = 1s,
break
case 'tebakkimia':
anu = await fetchJson(`https://velgrynd.herokuapp.com/api/tebak/kimia`, {method: 'get'})
get = `*${anu.result.nama}*`
setTimeout( () => {
fadly.sendMessage(from, 'Jawaban: '
+anu.result.lambang, text, {quoted: fakevo}) 
}, 60000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_10 Detik lagi..._', text) 
}, 50000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_20 Detik lagi..._', text)
}, 40000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_30 Detik lagi..._', text)
}, 30000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_40 Detik lagi..._', text)
}, 20000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_50 Detik lagi..._', text) 
}, 10000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_60 Detik lagi..._', text) 
}, 2500) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, get, text, {quoted: fakevo}) 
}, 0) // 1000 = 1s,
break
case 'tebakjenaka':
anu = await fetchJson(`https://velgrynd.herokuapp.com/api/tebak/jenaka`, {method: 'get'})
tebakjenaka = `*${anu.result.pertanyaan}*`
setTimeout( () => {
fadly.sendMessage(from, 'Jawaban: '
+anu.result.jawaban, text, {quoted: fakevo}) 
}, 60000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_10 Detik lagi..._', text) 
}, 50000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_20 Detik lagi..._', text) 
}, 40000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_30 Detik lagi..._', text) 
}, 30000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_40 Detik lagi..._', text) 
}, 20000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_50 Detik lagi..._', text) 
}, 10000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_60 Detik lagi..._', text) 
}, 2500) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, tebakjenaka, text, {quoted: fakevo}) 
}, 0) // 1000 = 1s,
break
case 'tebakgambar':
anu = await fetchJson(`https://api-fadly.herokuapp.com/api/kuis/tebakgambar?apikey=${fadlykey}`, {method: 'get'})
ngebuff = await getBuffer(anu.img)
tebak = `Jawaban : *${anu.jawaban}*`
setTimeout( () => {
fadly.sendMessage(from, tebak, text, {quoted: fakevo})
}, 60000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_10 Detik lagi..._', text) 
}, 50000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_20 Detik lagi..._', text)
}, 40000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_30 Detik lagi..._', text) 
}, 30000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_40 Detik lagi..._', text) 
}, 20000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_50 Detik lagi..._', text) 
}, 10000) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, '_60 Detik lagi..._', text) 
}, 2500) // 1000 = 1s,
setTimeout( () => {
fadly.sendMessage(from, ngebuff, image, { caption: '_Tebak bro!!! gak bisa jawab wajib subrek Fadly ID :v_', quoted: fakevo }) 
}, 0) // 1000 = 1s,
break
case 'tembak':
if (args.length == 0) return reply(`Teksnya Mana ?\nContoh: ${prefix + command} udara / darat / laut`)
if (args[0] == 'udara') {
setTimeout( () => {
reply(`[ *PERINTAH DILAKSANAKAN* ]`)
}, 1000)
setTimeout( () => {
reply(`[ *SEDANG BERBURU* ]`)
}, 5000)
setTimeout( () => {
reply(`[ *SUKSES !! DAN ANDA MENDAPATKAN* ]`)
}, 8000)
setTimeout( () => {
reply(`[ *WOW ANDA MENDAPATKAN* ]\n[ *${buruh33}* ]`)
}, 12000)
}
if (args[0] == 'darat') {
setTimeout( () => {
reply(`[ *PERINTAH DILAKSANAKAN* ]`)
}, 1000)
setTimeout( () => {
reply(`[ *SEDANG BERBURU* ]`)
}, 5000)
setTimeout( () => {
reply(`[ *SUKSES !! DAN ANDA MENDAPATKAN* ]`)
}, 8000)
setTimeout( () => {
reply(`[ *WOW ANDA MENDAPATKAN* ]\n[ *${buruh22}* ]`)
}, 12000)
}
if (args[0] == 'laut') {
setTimeout( () => {
reply(`[ *PERINTAH DILAKSANAKAN* ]`)
}, 1000)
setTimeout( () => {
reply(`[ *SEDANG BERBURU* ]`)
}, 5000)
setTimeout( () => {
reply(`[ *SUKSES !! DAN ANDA MENDAPATKAN* ]`)
}, 8000)
setTimeout( () => {
reply(`[ *WOW ANDA MENDAPATKAN* ]\n[ *${buruh11}* ]`)
}, 12000)
}
break
case 'slot':
const somtoy = sotoy[Math.floor(Math.random() * sotoy.length)]
const somtoy2 = sotoy1[Math.floor(Math.random() * sotoy1.length)]
const somtoy3 = sotoy2[Math.floor(Math.random() * sotoy2.length)]
const somtoy4 = sotoy3[Math.floor(Math.random() * sotoy3.length)]
fadly.sendMessage(from, `
[ SLOTS ]\n-----------------
${somtoy2}
${somtoy}<=====
${somtoy3}
[ SLOTS ]
Keterangan : Jika anda Mendapatkan 3 Buah Sama Berarti Kamu Win
Contoh : ${somtoy4}<=====`, text, { quoted: fakevo })
break
case 'tictactoe':
case 'ttt':
if (!isGroup) return reply(mess.only.group)
if (args.length < 1) return reply('Tag Lawan Anda! ')
if (isTTT) return reply('Sedang Ada Permainan Di Grub Ini, Harap Tunggu')
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target Lawan!')
ment = mek.message.extendedTextMessage.contextInfo.mentionedJid
er1 = sender
er2 = ment[0]
angka = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
id = from
gilir = er2
ky_ttt.push({er1,er2,id,angka,gilir})
fadly.sendMessage(from, `*🎳 Memulai Game Tictactoe 🎲*

[@${er2.split('@')[0]}] Menantang anda untuk menjadi lawan Game🔥
Ketik Y/N untuk menerima atau menolak permainan

Ketik ${prefix}delttc , Untuk Mereset Permainan Yg Ada Di Grup!`, text, {contextInfo: {mentionedJid: [er2]}})
break
case 'delttt':
case 'delttc':
if (!isGroup) return reply(mess.only.group)
if (!isTTT) return reply('Tidak Ada Permainan Di Grub Ini')
naa = ky_ttt.filter(toek => !toek.id.includes(from)) 
ky_ttt = naa 
reply('Sukses')
break

//━━━━━━━━━━━━━━━[ FITUR 18+ ]━━━━━━━━━━━━━━━━━//

case 'bokep1':
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg')
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/h2nygxbyb6n9cyo/VID-20210107-WA1468.mp4/file' })
break
case 'bokep2':
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg')
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/pk8hozohzdc076c/VID-20210107-WA1466.mp4/file' })
break
case 'bokep3':
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg')
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/112q3u286tnvzjo/VID-20210107-WA1467.3gp/file' })
break
case 'bokep4':
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg')
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/arpphhxsv94ak0r/VID-20210107-WA1462.mp4/file' })
break
case 'bokep5':				 
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg') 
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/us3f4j62emftbrf/VID-20210107-WA1463.mp4/file' })
break
case 'bokep6':				 
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg') 
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/v4033tkl16hgf2b/VID-20210107-WA1459.mp4/file' })
break
case 'bokep7':				 
qute = fs.readFileSync('./media/caca.jpg') 
if (!isPremium && !isOwner) return reply(mess.only.prem)
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/3scnim6d1x4b8ie/VID-20210107-WA1461.mp4/file' })
break
case 'bokep8':				 
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg') 
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/dx9tklonu0eq36w/VID-20210107-WA1464.mp4/file' })
break
case 'bokep9':				 
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg') 
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/snwja297dv4zvtl/VID-20210107-WA0036.mp4/file' })
break
case 'bokep10':				 
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg') 
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/60dqek0mqhyt6rn/VID-20210107-WA1530.mp4/file' })
break
case 'bokep11':				 
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg') 
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/ni2mcdknb6zn50t/VID-20210107-WA1532.mp4/file' })
break
case 'bokep12':				 
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg') 
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/i9t96lrmd9lm71z/VID-20210107-WA1542.mp4/file' })
break
case 'bokep13':				 
if (!isPremium && !isOwner) return reply(mess.only.prem)
qute = fs.readFileSync('./media/caca.jpg') 
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/tjqdfmp8g08dt4e/VID-20210107-WA1536.mp4/file' })
break
case 'bokep14':				 
qute = fs.readFileSync('./media/caca.jpg') 
if (!isPremium && !isOwner) return reply(mess.only.prem)
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/x034q0s16u9vyhy/VID-20210107-WA1537.mp4/file' })
break
case 'bokep15':				 
qute = fs.readFileSync('./media/caca.jpg') 
if (!isPremium && !isOwner) return reply(mess.only.prem)
fadly.sendMessage(from, qute, image, { quoted: fakevo, caption: '*NIH BAHAN COLI BUAT KALIAN :v*\nLink Download \n\nhttps://www.mediafire.com/file/mgmynqghjnon2q7/VID-20210107-WA1533.mp4/file' })
break

//━━━━━━━━━━━━━━━[ FITUR TOOLS ]━━━━━━━━━━━━━━━━━//

case 'nuliskiri':
if (args.length == 0) return reply(`Teksnya Mana ?\nContoh: ${prefix + command} Caca`)
reply(mess.wait)
kon = (`https://hardianto-chan.herokuapp.com/api/nuliskiri?text=${args[0]}&apikey=hardianto`)
anu = await getBuffer(kon)
fadly.sendMessage(from, anu, image, { quoted: mek})
break
case 'nuliskanan':
if (args.length == 0) return reply(`Teksnya Mana ?\nContoh: ${prefix + command} Caca`)
reply(mess.wait)
kon = (`https://hardianto-chan.herokuapp.com/api/nuliskanan?text=${args[0]}&apikey=hardianto`)
anu = await getBuffer(kon)
fadly.sendMessage(from, anu, image, { quoted: mek})
break
case 'foliokanan':
if (args.length == 0) return reply(`Teksnya Mana ?\nContoh: ${prefix + command} Caca`)
reply(mess.wait)
kon = (`https://hardianto-chan.herokuapp.com/api/foliokanan?text=${args[0]}&apikey=hardianto`)
anu = await getBuffer(kon)
fadly.sendMessage(from, anu, image, { quoted: mek})
break
case 'foliokiri':
if (args.length == 0) return reply(`Teksnya Mana ?\nContoh: ${prefix + command} Caca`)
reply(mess.wait)
kon = (`https://hardianto-chan.herokuapp.com/api/foliokiri?text=${args[0]}&apikey=hardianto`)
anu = await getBuffer(kon)
fadly.sendMessage(from, anu, image, { quoted: mek})
break

//━━━━━━━━━━━━━━━[ FITUR OTHER ]━━━━━━━━━━━━━━━━━//

case 'gcbot':
teks =
`「 *Group Bot* 」
Group 1 :
https://chat.whatsapp.com/GMZirJJzjI87bDlRkxx8OI
Group 2 :
https://chat.whatsapp.com/DxrmJzsXON0DrqYnZgIe2D`
fadly.sendMessage(from, teks, text, { quoted: mek})
break
               case 'ssweb':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://api.lolhuman.xyz`)
                    ini_link = args[0]
                    ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/ssweb?apikey=${lolkey}&url=${ini_link}`)
                    fadly.sendMessage(from, ini_buffer, image, { quoted: fakevo })
                    break
                case 'ssweb2':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://api.lolhuman.xyz`)
                    ini_link = args[0]
                    ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/sswebfull?apikey=${lolkey}&url=${ini_link}`)
                    fadly.sendMessage(from, ini_buffer, image, { quoted: fakevo })
                    break
                case 'shortlink':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://api.lolhuman.xyz`)
                    ini_link = args[0]
                    ini_buffer = await fetchJson(`https://api.lolhuman.xyz/api/shortlink?apikey=${lolkey}&url=${ini_link}`)
                    reply(ini_buffer.result)
                    break
                case 'spamsms':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 08303030303030`)
                    nomor = args[0]
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam1?apikey=${lolkey}&nomor=${nomor}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam2?apikey=${lolkey}&nomor=${nomor}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam3?apikey=${lolkey}&nomor=${nomor}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam4?apikey=${lolkey}&nomor=${nomor}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam5?apikey=${lolkey}&nomor=${nomor}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam6?apikey=${lolkey}&nomor=${nomor}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam7?apikey=${lolkey}&nomor=${nomor}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam8?apikey=${lolkey}&nomor=${nomor}`)
                    reply("Success")
                    break
                    
//━━━━━━━━━━━━━━━[ FITUR SOUND ]━━━━━━━━━━━━━━━━━//

case 'sound1':
sound = fs.readFileSync('./media/audio/audio1.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound2':
sound = fs.readFileSync('./media/audio/audio2.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound3':
sound = fs.readFileSync('./media/audio/audio3.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound4':
sound = fs.readFileSync('./media/audio/audio4.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound5':
sound = fs.readFileSync('./media/audio/audio5.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound6':
sound = fs.readFileSync('./media/audio/audio6.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound7':
sound = fs.readFileSync('./media/audio/audio7.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound8':
sound = fs.readFileSync('./media/audio/audio8.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound9':
sound = fs.readFileSync('./media/audio/audio9.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound10':
sound = fs.readFileSync('./media/audio/audio10.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound11':
sound = fs.readFileSync('./media/audio/audio11.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound12':
sound = fs.readFileSync('./media/audio/audio12.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound13':
sound = fs.readFileSync('./media/audio/audio13.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound14':
sound = fs.readFileSync('./media/audio/audio14.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break
case 'sound15':
sound = fs.readFileSync('./media/audio/audio15.mp3')
fadly.sendMessage(from, sound, MessageType.audio, {quoted: fakevo, mimetype: 'audio/mp4', ptt:true})
break

		if (isTTT && iser2){
if (budy.startsWith('Y')){
  tto = ky_ttt.filter(ghg => ghg.id.includes(from))
  tty = tto[0]
  angka = tto[0].angka
  ucapan = `*🎳 Game Tictactoe 🎲*

er1 @${tty.er1.split('@')[0]}=❌
er2 @${tty.er2.split('@')[0]}=⭕

${angka[1]}${angka[2]}${angka[3]}
${angka[4]}${angka[5]}${angka[6]}
${angka[7]}${angka[8]}${angka[9]}

Giliran = @${tty.er1.split('@')[0]}`
  fadly.sendMessage(from, ucapan, text, {quoted: mek, contextInfo:{mentionedJid: [tty.er1,tty.er2]}})
  }
if (budy.startsWith('N')){
tto = ky_ttt.filter(ghg => ghg.id.includes(from))
tty = tto[0]
naa = ky_ttt.filter(toek => !toek.id.includes(from)) 
ky_ttt = naa
fadly.sendMessage(from, `Yahh @${tty.er2.split('@')[0]} Menolak:(`,text,{quoted:mek,contextInfo:{mentionedJid:[tty.er2]}})
}
}

if (isTTT && iser1){
nuber = parseInt(budy)
if (isNaN(nuber)) return
if (nuber < 1 || nuber > 9) return reply('Masukan Angka Dengan Benar')
main = ky_ttt.filter(hjh => hjh.id.includes(from)) 
if (!tttawal.includes(main[0].angka[nuber])) return reply('Udah Di Isi, Isi Yang Lain Gan')
if (main[0].gilir.includes(sender)) return reply('Tunggu Giliran Gan')
s = '❌'
main[0].angka[nuber] = s
main[0].gilir = main[0].er1
naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
ky_ttt = naa
pop = main[0]
ky_ttt.push(pop)
tto = ky_ttt.filter(hgh => hgh.id.includes(from))
tty = tto[0]
angka = tto[0].angka
ttt = `${angka[1]}${angka[2]}${angka[3]}\n${angka[4]}${angka[5]}${angka[6]}\n${angka[7]}${angka[8]}${angka[9]}`

ucapmenang = () => {
ucapan1 = `*🎳Result Game Tictactoe 🎲

*Yeyyy Permainan Di Menangkan Oleh *@${tty.er1.split('@')[0]}*\n`
ucapan2 = `*🎳Result Game Tictactoe 🎲*

*Hasil Akhir:*

${ttt}`
fadly.sendMessage(from, ucapan1, text, {quoted:mek, contextInfo:{mentionedJid: [tty.er1]}})
naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
return ky_ttt = naa
}

if (angka[1] == s && angka[2] == s && angka[3] == s) return ucapmenang()

if (angka[1] == s && angka[4] == s && angka[7] == s) return ucapmenang()

if (angka[1] == s && angka[5] == s && angka[9] == s) return ucapmenang()

if (angka[2] == s && angka[5] == s && angka[8] == s) return ucapmenang()

if (angka[4] == s && angka[5] == s && angka[6] == s) return ucapmenang()

if (angka[7] == s && angka[8] == s && angka[9] == s) return ucapmenang()

if (angka[3] == s && angka[5] == s && angka[7] == s) return ucapmenang()

if (angka[3] == s && angka[6] == s && angka[9] == s) return ucapmenang()

if (!ttt.includes('1️⃣') && !ttt.includes('2️⃣') && !ttt.includes('3️⃣') && ! ttt.includes('4️⃣') && !
ttt.includes('5️⃣') && !
ttt.includes('6️⃣') && ! ttt.includes('7️⃣') && ! ttt.includes('8️⃣') && ! ttt.includes('9️⃣')){
ucapan1 = `*🎳 Result Game Tictactoe 🎲*

*_Permainan Seri 🗿👌_*`
ucapan2 = `*🎳 Result Game Tictactoe 🎲*

*Hasil Akhir:*

${ttt}`
reply(ucapan1)
naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
return ky_ttt = naa
}
ucapan = `*🎳 Game Tictactoe 🎲*

er2 @${tty.er2.split('@')[0]}=⭕
er1 @${tty.er1.split('@')[0]}=❌

${ttt}

Giliran = @${tty.er2.split('@')[0]}`
 fadly.sendMessage(from, ucapan, text, {quoted: mek, contextInfo:{mentionedJid: [tty.er1,tty.er2]}})
}
if (isTTT && iser2){
nuber = parseInt(budy)
if (isNaN(nuber)) return
if (nuber < 1 || nuber > 9) return reply('Masukan Angka Dengan Benar')
main = ky_ttt.filter(hjh => hjh.id.includes(from)) 
if (!tttawal.includes(main[0].angka[nuber])) return reply('Udah Di Isi, Isi Yang Lain Gan')
if (main[0].gilir.includes(sender)) return reply('Tunggu Giliran Gan')
s = '⭕'
main[0].angka[nuber] = s
main[0].gilir = main[0].er2
naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
ky_ttt = naa
pop = main[0]
ky_ttt.push(pop)
tto = ky_ttt.filter(hgh => hgh.id.includes(from))
tty = tto[0]
angka = tto[0].angka
ttt = `${angka[1]}${angka[2]}${angka[3]}\n${angka[4]}${angka[5]}${angka[6]}\n${angka[7]}${angka[8]}${angka[9]}`

ucapmenang = () => {
ucapan1 = `*?? Result Game Tictactoe 🎲*

Yeyyy Permainan Di Menangkan Oleh *@${tty.er2.split('@')[0]}*\n`
ucapan2 = `*🎳 Game Tictactoe 🎲*

*Hasil Akhir:*

${ttt}`
fadly.sendMessage(from, ucapan1, text, {quoted:mek, contextInfo:{mentionedJid: [tty.er2]}})
naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
return ky_ttt = naa
}

if (angka[1] == s && angka[2] == s && angka[3] == s) return ucapmenang()
if (angka[1] == s && angka[4] == s && angka[7] == s) return ucapmenang()
if (angka[1] == s && angka[5] == s && angka[9] == s) return ucapmenang()
if (angka[2] == s && angka[5] == s && angka[8] == s) return ucapmenang()
if (angka[4] == s && angka[5] == s && angka[6] == s) return ucapmenang()
if (angka[7] == s && angka[8] == s && angka[9] == s) return ucapmenang()
if (angka[3] == s && angka[5] == s && angka[7] == s) return ucapmenang()
if (angka[3] == s && angka[6] == s && angka[9] == s) return ucapmenang()
if (!ttt.includes('1️⃣') && !ttt.includes('2️⃣') && !ttt.includes('3️⃣') && ! ttt.includes('4️⃣') && !
ttt.includes('5️⃣') && !
ttt.includes('6️⃣') && ! ttt.includes('7️⃣') && ! ttt.includes('8️⃣') && ! ttt.includes('9️⃣')){
ucapan1 = `*🎳Result Game Tictactoe 🎲*

*_Permainan Seri🗿👌*`
ucapan2 = `*🎳 Result Game Tictactoe 🎲*

*Hasil Akhir:*

${ttt}`
reply(ucapan1)
naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
return ky_ttt = naa
}
ucapan = `*🎳 Game Tictactoe 🎲*

er1 @${tty.er1.split('@')[0]}=⭕
er2 @${tty.er2.split('@')[0]}=❌

${ttt}
 
Giliran = @${tty.er1.split('@')[0]}`
 fadly.sendMessage(from, ucapan, text, {quoted: mek, contextInfo:{mentionedJid: [tty.er1,tty.er2]}})
 }

//━━━━━━━━━━━━━━━[ AKHIR SEMUA FITUR ]━━━━━━━━━━━━━━━━━//

default:
if (isOwner) {
			if (budy.startsWith('>')) {
				console.log(color('[EVAL1]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval return`))
				try {
					let evaled = await eval(budy.slice(2))
					if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
					reply(`${evaled}`)
				} catch (err) {
					reply(`${err}`)
				}
			} else if (budy.startsWith('x')) {
				console.log(color('[EVAL2]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval identy`))
				try {
					return fadly.sendMessage(from, JSON.stringify(eval(budy.slice(2)), null, '\t'), text, { quoted: fakevo })
				} catch (err) {
					e = String(err)
					reply(e)
				}
			}
		}
		}
	} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero") && !e.includes("jid")) {
	console.log('Error : %s', color(e, 'red'))
        }
	// console.log(e)
	}
}


	
    
