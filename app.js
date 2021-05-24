const {MailClient} = require("./MailClient")
const path = require("path")

var fk = new MailClient({
    host:'mail.privateemail.com',
    port: 465,
    secure:true,
    auth:{
        user: 'no_reply@glovaro.com',
        pass:'GLOVARO2021$'
    }
})
let content = 'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\n...';
// fk.sendMail('no_reply@glovaro.com', 'Building Mail Sending LIB in Nodejs', 
// 'This is largely inspired by NodeMailer, using nodemailer api to provide  common functionalities that is reusable and fluent in nature',
// ['raimi@glovaro.com', 'segun@glovaro.com'], ['tunde@glovaro.com'])
fk.Build.Subject('Building From Scratch').MessageBody("testing build")
.From('no_reply@glovaro.com').To('raimi@glovaro.com').AddAttachment('hello', path.join(__dirname, 'app.js'))
.AttachCalender('request',content, 'content' )
.Send(false, '')
.then(res=>console.log(res)).catch(er=>console.log(er))

// fk.MailMessage('Testing Email With Attachment', 'This is SampleTest')
// .AddAttachment('attchone', path.join(__dirname, 'package.json'))
// .From('no_reply@glovaro.com')
// .To('raimi@glovaro.com')
// .cc('tunde@glovaro.com')
// .Send(false, '').then(res=>console.log(res)).catch(er=>console.log(er))

fk.on("SendError", (er)=>{
    console.log("err", er)
})

fk.on("SendSuccess", (data)=>{
    console.log(data)
})