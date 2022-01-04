const view = {}

view.showComponents = function(name){
    //name = register
    switch(name){
        case 'register': {
            let app = document.getElementById('app')
            app.innerHTML = components.register
            
            let link = document.getElementById('form-link')
            link.onclick = linkClickHandler 

            let form = document.getElementById('form-register')
            form.onsubmit = formSubmitHandler
            
            function linkClickHandler (){
                view.showComponents('logIn')
            }
            function formSubmitHandler (e){
                e.preventDefault() // de ko lag
                let registerInfo = {
                    firstname: form.firstname.value,
                    lastname: form.lastname.value,
                    email: form.email.value,
                    password: form.password.value,
                    confirmPassword: form.confirmPassword.value
                }
                if(registerInfo.firstname) {
                    view.setText('firstname-error', '')
                }
                else {
                    view.setText('firstname-error', 'Invalid firstname!')
                }

                if(registerInfo.lastname) {
                    view.setText('lastname-error', '')
                }
                else {
                    view.setText('lastname-error', 'Invalid firstname!')
                }
                if(registerInfo.email) {
                    view.setText('email-error', '')
                }
                else {
                    view.setText('email-error', 'Invalid email!')
                }
                if(registerInfo.password) {
                    view.setText('password-error', '')
                }
                else {
                    view.setText('password-error', 'Invalid password!')
                }
                if(registerInfo.confirmPassword && registerInfo.password == registerInfo.confirmPassword) {
                    view.setText('confirm-password-error', '')
                }
                else {
                    view.setText('confirm-password-error', 'Invalid confirm password!')
                }if (registerInfo.firstname
                    && registerInfo.lastname
                    && registerInfo.email
                    && registerInfo.password
                    && registerInfo.confirmPassword
                    && registerInfo.password == registerInfo.confirmPassword){
                          controller.register(registerInfo)
                    }
            }
            break
        }
        case 'logIn': {
            let app =document.getElementById('app')
            app.innerHTML = components.logIn

            let link  = document.getElementById('form-link')
            link.onclick = linkClickHandler

            let form = document.getElementById('form-log-in')
            //console.log(form)
            form.onsubmit = formSubmitHandler

            function linkClickHandler() {
                //console.log('click on link')
                //console.log(event)
                view.showComponents('register')
            }
            function formSubmitHandler(e) {
                e.preventDefault() // chan nhay trang
                //1. lay du lieu nguoi dung dien vao form
                //2. validate thong tin
                //3. Gui thong tin nguoi dung len server
                let logInInfo = {
                    email: form.email.value,
                    password: form.password.value
                }
                if(validateEmail(logInInfo.email)){
                    //document.getElementById('email-error').innerText = " "
                    //
                    view.setText('email-error', '')
                } else {
                    //hien thi loi
                    //document.getElementById('email-error').innerText = "Invalid email!"  
                    view.setText('email-error', 'Invalid email!')             
                }
                if(logInInfo.password){
                    //document.getElementById('password-error').innerText = " "
                    //
                    view.setText('password-error', '')
                } else {
                    //hien thi loi
                    //document.getElementById('password-error').innerText = "Invalid password!"
                    view.setText('password-error', 'Invalid password!')
                }
                //Gui thong tin nguoi dung
                if(logInInfo.email
                    &&logInInfo.password){
                        controller.logIn(logInInfo)
                    }
            }
            break
        }
        case 'chat': {
            let app = document.getElementById('app')
            app.innerHTML = components.navBar
            app.innerHTML += components.chat //chat o duoi navBar

            let chatForm = document.getElementById('chat-form')
            chatForm.onsubmit = chatFormSubmitHandler // tai sao ko co ()
            
            let signOutBtn  = document.getElementById('sign-out-btn')
            signOutBtn.onclick = SignOutHandler

            let formAddConversation = document.getElementById("add-conversation-form")
            formAddConversation.onsubmit = formAddSubmitHandler

            function SignOutHandler() {
                firebase.auth().signOut()
                model.signOut()
            }

            async function formAddSubmitHandler(e){
                e.preventDefault()
                let title = formAddConversation.title.value
                let friendEmail = formAddConversation.friendEmail.value
                let btnAdd = document.getElementById('add-conversation-btn')
                btnAdd.setAttribute('disabled', true)
                //kiem tra xem email co ton tai trong he thong hay khong
                //validate friendEmail != model.authUser.email
                try {
                    let resultValidate = await firebase.auth().fetchSignInMethodsForEmail(friendEmail)
                    if(!resultValidate.length){
                        throw new Error("Your friend email has not yet been registered!")
                    }
                    if(friendEmail.toLowerCase() == model.authUser.email){
                        throw new Error ('Please enter a friend email')
                    }
                    let conversation = {
                        title: title,
                        users: [friendEmail.toLowerCase(),model.authUser.email],
                        messages: [],
                        createdAt: new Date().toISOString(),
                    }
                    await firebase.firestore().collection('conversations').add(conversation)
                    formAddConversation.title.value = ""
                    formAddConversation.friendEmail.value = ""
                } catch(err){
                    view.setText('add-conversation-error', err.message)

                }
                btnAdd.removeAttribute('disabled')
                
                
            }

            function chatFormSubmitHandler(e){
                e.preventDefault()

                let messageContent = chatForm.message.value
                controller.sendMessage(messageContent)

                chatForm.message.value = ""
            }

            break
        }
        case "loading": {
            let app = document.getElementById('app')
            app.innerHTML = components.loading
        }
        break
    }
}
view.setText = function(id, text) {
    document.getElementById(id).innerText = text
}

view.showConversation = function(conversation){
    let chatMessages = document.getElementById("chat-messages")
    if(chatMessages){
        chatMessages.innerHTML = ""
        for(let message of conversation.messages){
            let className = "chat-message"
            if(message.owner == model.authUser.email){
                className += " your"
            }
            let html = `
            <div class="${className}">
                <span>${message.content}</span> 
            </div> 
            `
            chatMessages.innerHTML += html
        }
    //scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight - chatMessages.clientHeight
    // scrollHeight: tổng chiều cao có thể scroll
    // scrollTop: Chiều cao người dùng đã lăn 
    //clientHeight: chiều cao người dùng nhìn thấy 
    }
}

view.showListConversations = function(conversations){
    let divConversations = document.getElementById('conversations')
    divConversations.innerHTML = ""
    // add html
    for(let conversation of conversations){
        let html = `
        <div id="${conversation.id}" class="conversation">
            <div>${conversation.title}</div>
        </div>
        `
        divConversations.innerHTML += html
    }
    //add events
    for(let conversation of conversations){
        let div = document.getElementById(conversation.id)
        div.onclick = conversationDivClickHandler

        function conversationDivClickHandler() {
           model.saveActiveConversation(conversation.id)
        }
    }

}
// kiem tra email
function validateEmail(email) {
    let regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email && regEmail.test(email)
} // tim hieu reg (regular expression)
//3. Gui thong tin nguoi dung len server