export class LocalStorage{

    constructor(options){
        this.inputName = options.inputName
        this.textarea = options.textarea
        this.containerForComment = options.containerForComment
        this.commentNumber = options.commentNumber
    }

    addComment(date){
        const comment = `<div class="comment__box box" tabindex="-1">
                <div class="box__initials">
                    <div class="box__name">${this.inputName.value}</div>
                    <div class="box__date">${this.getTimeForComment(date)}</div>
                </div>
                <p class="box__comment">
                    ${this.textarea.value}
                </p>
                <div class="box__btn">
                    <button class="box__like"><img src="./img/main/Mask group-like.svg" alt="button like" data-like='1'></button>
                    <button class="box__delete" ><img src="./img/main/seo-social-web-network-internet_262_icon-icons.com_61518.svg" alt="button delete" data-delete='1'></button>
                </div>
            </div>`
        this.addToLocalStorage(comment)
        this.containerForComment.insertAdjacentHTML('beforeend', comment)
        this.commentNumber.innerHTML = `(${this.getCommetsFromLocalStorage().length})`
    }

    replacingFavoritesInLocalStorage(){
        const arrFavorites = Array.from(document.querySelectorAll('.active__like'))
        const arrComment = arrFavorites.map(el => el.closest(".box"))
        const arrh = arrComment.map(el => el.outerHTML)
        localStorage.removeItem('Favorites')
        localStorage.setItem('Favorites', JSON.stringify(arrh))
    }
    
    replacingCommentInLocalStorage(){
        const arrComment = Array.from(document.querySelectorAll('.box'))
        const arrh = arrComment.map(el => el.outerHTML)
        localStorage.removeItem('comments')
        localStorage.setItem('comments', JSON.stringify(arrh))
        this.replacingFavoritesInLocalStorage()
    }

    addToLocalStorage(comment) {
        const all = this.getCommetsFromLocalStorage()
        all.push(comment)
        localStorage.setItem('comments', JSON.stringify(all))
    }
      
    getCommetsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('comments') || '[]')
    }

    getFavoritesFromLocalStorage(){
        const arrFavorites = JSON.parse(localStorage.getItem('Favorites') || '[]')
        if(!arrFavorites.length) return "<p class='p'>В избранном сейчас ничего нет</p>"
        return arrFavorites
    }

    insertComments(){
        const arrComment = this.getCommetsFromLocalStorage()
        arrComment.forEach(el => this.containerForComment.insertAdjacentHTML('beforeend', el))
    }

    getTimeForComment (str){
        let now = new Date()
    
        let formattedNow = [
            now.getDate(),
            now.getMonth() + 1,
            now.getFullYear(),
            now.getHours(),
            now.getMinutes()
        ].map(el => ('' + el).length < 2 ? '0' + el : el)
    
        if(str){
            const arrValue = str.split('.')
            let d = `${arrValue[2]}-${arrValue[1]}-${arrValue[0]}`
            let date = new Date(d)
            let formattedDate = [
                date.getDate(),
                date.getMonth() + 1,
                date.getFullYear(),
            ].map(el => ('' + el).length < 2 ? '0' + el : el)  
    
            if(isNaN(formattedDate[0]) || isNaN(formattedDate[1]) || isNaN(formattedDate[2])){
                return formattedNow.slice(0, 3).join('.') + ' ' + formattedNow.slice(3).join(':'); 
            }
    
            if(formattedDate[1] === formattedNow[1] && formattedDate[2] === formattedNow[2] && +formattedDate[0] === formattedNow[0]-1){
                return `вчера ${formattedNow[3]}:${formattedNow[4]}`
            }
    
            if(formattedDate[1] === formattedNow[1] && formattedDate[2] === formattedNow[2] && formattedDate[0] === formattedNow[0]) {
                return `сегодня ${formattedNow[3]}:${formattedNow[4]}`
            }
    
            if(formattedDate[2] > formattedNow[2] || formattedDate[2] > formattedNow[2] && formattedDate[1] > formattedNow[1] ||
               formattedDate[2] === formattedNow[2] && formattedDate[1] > formattedNow[1] ||  formattedDate[2] === formattedNow[2] && 
               formattedDate[1] === formattedNow[1] && formattedDate[0] > formattedNow[0]) {
                return formattedNow.slice(0, 3).join('.') + ' ' + formattedNow.slice(3).join(':')
            }
    
            return formattedDate.slice(0, 3).join('.') + ' ' + formattedNow.slice(3).join(':')
        }    
        return formattedNow.slice(0, 3).join('.') + ' ' + formattedNow.slice(3).join(':')   
    }
}