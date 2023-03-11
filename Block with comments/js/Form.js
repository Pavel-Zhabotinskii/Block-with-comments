export class Form{
    constructor(options){
        this.form = options.form
        this.inputName = options.inputName
        this.inputDate = options.inputDate
        this.inputScore = options.inputScore
        this.textarea = options.textarea
        this.btnSend = options.btnSend        
    }

    clearTexterea(str){
        this.inputScore.innerHTML = str
        this.btnSend.style.cssText = 'background: #A2A2A2; opacity: 0.4;'
        this.btnSend.removeAttribute('data-send')
    }

    resizeTextarea(ev) {
        const textareaLength = ev.target.value.length
        const el = ev.target;
        setTimeout(function() {
            el.style.cssText = 'height:61px;';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 1);
        if(textareaLength > 0 && textareaLength < 1000){
            this.btnSend.style.cssText = 'background: #ABD873; opacity: 1;'
            this.btnSend.setAttribute('data-send', '1');
            this.inputScore.style.cssText = 'color: #000;'
            this.inputScore.innerHTML = `${textareaLength}/1000`
        } if (textareaLength > 1000){
            this.inputScore.style.cssText = 'color: #FF0000; opacity:1;'
            this.clearTexterea(`${textareaLength}/1000  Слишком длинное сообщение`)
        } if(textareaLength == 0){
            this.clearTexterea(`Макс. 1000 символов`)
            this.textarea.style.cssText = 'height:61px;';
        }
    }

    clearForm(){
        this.textarea.value = this.inputName.value =  this.inputDate.value = ''
        this.clearTexterea('Макс. 1000 символов')
        this.inputName.classList.remove('error')
    }
}