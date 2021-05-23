const {MailClient} = require("./MailClient")


var fk = new MailClient({
    host:'mail.privateemail.com',
    port: 465,
    secure:true,
    auth:{
        user: 'no_reply@glovaro.com',
        pass:'GLOVARO2021$'
    }
})

fk.sendMail('no_reply@glovaro.com', 'Building Mail Sending LIB in Nodejs', 
'This is largely inspired by NodeMailer, using nodemailer api to provide  common functionalities that is reusable and fluent in nature',
['raimi@glovaro.com', 'segun@glovaro.com'], ['tunde@glovaro.com'])
// fk.MailMessage('Sample', 'This is SampleTest')
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