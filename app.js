const {MailClient} = require("./MailClient")
const path = require("path")
const {MailClient:mail} =  require("./main")

//const m = mail.instance()
var fk = new MailClient()

fk.SendSample(['raimialiu428@gmail.com'], (er, res)=>{
    if(!er) {
        console.log(er)
    }

    console.log(res)
})
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