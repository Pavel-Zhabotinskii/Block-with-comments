import {Form} from './Form.js';
import { LocalStorage } from './LocalStorage.js';

const form = document.forms[0]
const btnFavorites = document.querySelector('.switch__favorites')
const btnComment = document.querySelector('.switch__comment')

const optionsForm = {
    form: document.forms[0],
    inputName: form.elements[0],
    inputDate: form.elements[1],
    inputScore: document.querySelector('.input__score'),
    textarea: form.elements[2],
    btnSend: form.elements[3],
}

const optionsLocal = {
    inputName: form.elements[0],
    textarea: form.elements[2],
    containerForComment: document.querySelector('.page__comment'),
    commentNumber: document.querySelector('.switch__comment_number'),
}

const clForm = new Form(optionsForm)
const local = new LocalStorage(optionsLocal)


document.addEventListener('DOMContentLoaded',() => {
    local.insertComments()
    local.commentNumber.innerHTML = `(${local.getCommetsFromLocalStorage().length})`
})

document.addEventListener('click', (ev) => {
    if(ev.target.classList.contains('input__btn')){
        ev.preventDefault()
        if(ev.target.dataset.send == 1) {
            sendForm() 
            scrollComment()
        }
        clForm.textarea.style.cssText = 'height:61px;';
    }

    if(ev.target.dataset.delete == '1' ){
        if(btnFavorites.querySelector('button').classList.contains('active__switch')) return

        const comment = ev.target.closest(".box")
        comment.remove()   
        local.replacingCommentInLocalStorage()
        local.commentNumber.innerHTML = `(${local.getCommetsFromLocalStorage().length})`
    }

    if(ev.target.dataset.like==='1'){
        if(btnFavorites.querySelector('button').classList.contains('active__switch')) return

        if(ev.target.classList.contains('active__like')) return favoritesState(ev ,'remove', "./img/main/Mask group-like.svg")

        favoritesState(ev, 'add', "./img/main/Mask group-like copy.svg")
    }

    if(ev.target.classList.contains('switch__btn')){

        if(ev.target.closest(".switch__favorites")){
            deletingAddingActiveForSwitchButton(ev, btnComment)

            const arrComment = local.getFavoritesFromLocalStorage()

            if(Array.isArray(arrComment)) return arrComment.forEach(el => local.containerForComment.insertAdjacentHTML('beforeend', el))
            local.containerForComment.insertAdjacentHTML('beforeend', arrComment)
        }

        if(ev.target.closest(".switch__comment")){
            if(document.querySelector('.p')) document.querySelector('.p').remove()

            deletingAddingActiveForSwitchButton(ev, btnFavorites)
            local.insertComments()
            scrollComment()
        }
    }
})

clForm.textarea.addEventListener('input', (ev) => clForm.resizeTextarea(ev));
clForm.inputName.addEventListener('input' , (ev) => ev.target.classList.remove('error'))

clForm.form.addEventListener( 'keyup', ev => {
    if( ev.code === 'Enter' && clForm.btnSend.dataset.send == 1){
        if(clForm.inputName.value){
            sendForm()
            scrollComment()
            return
        }
        sendForm()
        return
    }
});

function scrollComment(){
    const el = local.containerForComment.lastChild
    el.scrollIntoView(false)
}

function sendForm(){
    if(clForm.inputName.value){
        local.addComment(clForm.inputDate.value)
        clForm.clearForm()
        return
    }
    clForm.inputName.focus()
    clForm.inputName.classList.add('error')
}

function favoritesState (ev,state, src){
    state === 'remove'? ev.target.classList.remove('active__like') : ev.target.classList.add('active__like')
    ev.target.src = src
    local.replacingCommentInLocalStorage()
}

function deletingAddingActiveForSwitchButton(ev, btn){
    const arr = document.querySelectorAll('.box')
    arr.forEach(el => el.remove())
    btn.querySelector('button').classList.remove('active__switch')
    ev.target.classList.add('active__switch')
}



