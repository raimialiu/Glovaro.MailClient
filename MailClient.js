const event = require("events").EventEmitter
const nodemailer = require("nodemailer")
const fs = require("fs")
class MailClient extends event {
    constructor(options) {
        super(options)
        this._options = options
        this._test = nodemailer.createTestAccount()
        const that = this;
        this._mail = nodemailer.createTransport(options)
        this._mailMessage = {}
    }

    MailMessage(subject, messabeBody) {
        const options = {text:messabeBody}
        options["from"] = "test@sample.com"
        this._mailMessage = options;
        options["subject"] = subject
        options["isSample"] = true
        return this
    }
    get Build() {
        return this
    }

    Subject(subject) {
        this._mailMessage = this.BuildOptions(this._mailMessage, "subject", subject)
       // console.log("build result")
        return this;
    }

    HtmlMessageFromTemplate(pathToTemplate) {
        fs.read(pathToTemplate, (er, buffer)=>{
            if(er) {
                this.emit("error", er)
                return false
            }
            const dt = (Buffer.from(buffer)).toString()

            this.HtmlMessage(dt)
        })
//        this.HtmlMessage()
    }

    HtmlMessage(htmlMessage) {
        this._mailMessage = this.BuildOptions(this._mailMessage, "html", htmlMessage)
        console.log("build result")
        return this;
    }
    AddHeaders(key, value) {
        const optios = {...this._mailMessage}
        options["headers"] = {}
        options["headers"][key] = value
        this._mailMessage = options
        return this;
    }
    AttachCalender(method, content, filename) {
        const opts = {...this._mailMessage}
        opts["icalEvent"] = {
            filename:filename+'.ics',
            method,
            content
        }

        this._mailMessage = opts
        return this;
    }
    MessageBody(message) {
        this._mailMessage = this.BuildOptions(this._mailMessage, "text", message)
        //console.log("build result")
        return this;
    }
    From(address) {
        this._mailMessage = this.BuildOptions(this._mailMessage, "from", address)
        console.log("build result")
        return this;
    }

    LoadEmlFile(path, from, to=[]) {
        let opts = {
            envelope: {
                from,
                to
                
            },
            raw:{
                path
            }
        }

        this._mailMessage = opts

        return this;
    }
    BuildOptions(options, NewParamKey, NewParamValue) {
        const _newOpts = {...options}
        _newOpts[NewParamKey] = NewParamValue

        return _newOpts
    }
    To(...address) {
        const options = {...this._mailMessage}
        let to = ""
        for(let k of address) {
            to += `${k},`
        }
        to = to.substr(0, to.length -1)
        options["to"] = to
        this._mailMessage = options
        return this;
    }
    Bcc(...address){
        const options = {...this._mailMessage}
        let bcc = ""
        for(let k of address) {
            bcc += `${k},`
        }
        bcc = bcc.substr(0, bcc.length -1)
        options["bcc"] = bcc
        this._mailMessage = options
        return this;
    }

    AddAttachmentFromUrl(filename, url) {
        const option = {...this._mailMessage}
        let attachment =[
            {
                filename,
                href: url
            }
        ]

        option["attachments"] = attachment

        this._mailMessage = option
        return this;

    }

    AddAttachments(files=[{filename:"", path:""}]) {
        for(let k of files) {
            this.AddAttachment(k["filename"], k["path"])
        }
    }
    AddAttachment(filename, pathToFile) {
        const option = {...this._mailMessage}
        let attachment =[
            {
                filename,
                path: pathToFile
            }
        ]

        option["attachments"] = attachment

        this._mailMessage = option
        return this;
    }

    async sendMail(from, subject, message, to=[], cc=[], bcc=[], isHtml=false) {
        this._mailMessage = {
            from,
            subject,
            text:message
        }
        let _bcc = ""
        for(let k of bcc) {
            _bcc += `${k},`
        }
        _bcc = _bcc.substr(0, _bcc.length -1)
        this._mailMessage["bcc"] = _bcc
        let _cc = ""
        for(let k of cc) {
            _cc += `${k},`
        }
        _cc = _cc.substr(0, _cc.length -1)
        this._mailMessage["cc"] = _cc

        let _to = "";
        for(let k of to) {
            _to += `${k},`
        }
        _to = _to.substr(0, _to.length - 1)
        this._mailMessage["to"] = _to

        return await this.Send()
    }

    cc(...address){
        const options = {...this._mailMessage}
        let cc = ""
        for(let k of address) {
            cc += `${k},`
        }
        cc = cc.substr(0, cc.length -1)
        options["cc"] = cc
        this._mailMessage = options
        return this;
    }

    async Send()
    {
       // console.log("msg", this._mailMessage)
       let _info =""
       try{
            _info =  await this._mail.sendMail(this._mailMessage)
            this.emit('SendSuccess',_info)
            return _info;
       }
       catch(er) {
           this.emit("SendError", er)
           return false;
       }       
    }
}

module.exports = {MailClient}