const {MailClient} = require("./MailClient")
const path = require("path")
const {MailClient:mail} =  require("./main")


//const m = mail.instance()
var fk = new MailClient()

// fk.SendSample(['raimialiu428@gmail.com'], (er, res)=>{
//     if(!er) {
//         console.log(er)
//     }

//     console.log(res)
// })

const msg = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="background-color: yellowgreen;">
    Welcome</div>
</body>
</html>`

const placeholder = [`{FirstName}`, `{password}`]
const replacer = ['Olatunde', '56767887hjjh']
const ht = path.join(__dirname, "hi.html")
fk.BuildFromTemplateFile("Reset-Password.html").then(res=>{
    fk.From('no_reply@glovaro.com')
    .To('raimialiu428@gmail.com')
    .Subject('Testing template')
    .MessageBody(res)
    .Send(true).then(result=>console.log(result))
    .catch(er=>console.log(er));
    fk.on("SendError", (er)=>console.log(er))
}).catch(er=>console.log("read error", er))



// let content = 'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\n...';
// // fk.sendMail('no_reply@glovaro.com', 'Building Mail Sending LIB in Nodejs', 
// // 'This is largely inspired by NodeMailer, using nodemailer api to provide  common functionalities that is reusable and fluent in nature',
// // ['raimi@glovaro.com', 'segun@glovaro.com'], ['tunde@glovaro.com'])
// fk.Build.Subject('Building From Scratch').MessageBody("testing build")
// .From('no_reply@glovaro.com').To('raimi@glovaro.com').AddAttachment('hello', path.join(__dirname, 'app.js'))
// .AttachCalender('request',content, 'content' )
// .Send(false, '')
// .then(res=>console.log(res)).catch(er=>console.log(er))

// // fk.MailMessage('Testing Email With Attachment', 'This is SampleTest')
// // .A.ddAttachment('attchone', path.join(__dirname, 'package.json'))
// // .From('no_reply@glovaro.com')
// // .To('raimi@glovaro.com')
// // .cc('tunde@glovaro.com')
// // .Send(false, '').then(res=>console.log(res)).catch(er=>console.log(er))

// fk.on("SendError", (er)=>{
//     console.log("err", er)
// })

// fk.on("SendSuccess", (data)=>{
//     console.log(data)
// })