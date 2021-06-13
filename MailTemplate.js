class MailTemplateWriter {
    constructor(pathToFile=null) {

    }

    WriteFromStach(mainBody, needle=[], replacer=[]) {
        let _bd = ''
        const input = mainBody+""
        let counter = 0;
        if(mainBody != null && replacer.length > 0) {
            for(let current of replacer) {
                _bd += input.replace(needle[counter], current)
                counter += 1
            }

            return _bd;
        }

        return false;
    }


    RenderHeader(htmlData, style={}) {

    }
}

module.exports ={MailTemplateWriter}