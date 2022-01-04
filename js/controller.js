const controller = {}

controller.register = async function (registerInfo) {
    document.getElementById('register-btn').setAttribute('disabled', true)
    try {
        let result = await firebase.auth().createUserWithEmailAndPassword(registerInfo.email, registerInfo.password)
        await firebase.auth().currentUser.updateProfile({
            displayName: registerInfo.firstname + ' ' + registerInfo.lastname
        })
        await firebase.auth().currentUser.sendEmailVerification()
        view.setText('register-error', '')
        view.setText('register-success', 'A confirmation link has been sent to your email')
    } catch (error) {
        view.setText('register-success', '')
        view.setText('register-error', error.message)
    }
    // createUserWithEmailAndPassword is async >> must wait
    document.getElementById('register-btn').removeAttribute('disabled')
}


controller.logIn = async function (logInInfo) {
    document.getElementById('log-in-btn').setAttribute('disabled', true)
    try {
        let result = await firebase.auth().signInWithEmailAndPassword(logInInfo.email, logInInfo.password)
        //1. if not yet verify email >> tell user to verify
        //2. if already verify >> go to chat screen
        //signIn >> authStateChanged >> authStateChangedHandler >> load

        // if (result.user.emailVerified) {
        //     model.authen(result.user)
        //     view.showComponents('chat')
        //     controller.loadConversations(result.user.email) // result là một object
        // } else {
        //     throw new Error('Email not verified!')
        // }
        if(!result.user.emailVerified){
            throw new Error("Email not verified")
        }
    } catch (error) {
        view.setText('log-in-error', error.message)
        document.getElementById('log-in-btn').removeAttrirubte('disabled')
    }
}

controller.initApp = function () {
    //1. if the user already signed in >> display chat screen
    //2. else >> display log in screen
    view.showComponents('loading')
    firebase.auth().onAuthStateChanged(authStateChangedHandler)

    async function authStateChangedHandler(user) {
        if (user && user.emailVerified) {
            model.authen(user)
            view.showComponents('chat')
            controller.loadConversations(user.email)
            // let result = await firebase.firestore().collection('conversation').get()
            // console.log(result)
        } else {
            view.showComponents('logIn')
        }
    }
}
controller.loadConversations = function (email) {
    firebase.firestore().collection("conversations") // get conversations from firebase
        .where("users", "array-contains", email)
        .onSnapshot(snapshotHandler)
    function snapshotHandler(snapshot) {
        //1. First loading
        // if (model.conversations == null) {
        //     for (let doc of snapshot.docs) {
        //         let conversation = doc.data()
        //         conversation.id = doc.id
        //         conversations.push(conversation)
        //     }
        // let conversations = []
        let conversations = snapshot.docs.map(function(doc){
            let conversation = doc.data()
            conversation.id = doc.id
            return conversation
        })
            model.saveConversations(conversations)
            if (conversations.length) {
                model.saveActiveConversation(conversations[0].id)
            }
            else {
            //2. database change >> update
            for (let docChange of snapshot.docChanges()) {
                //docChangetype = "added"
                if (docChange.type == "modified" || docChange.type == "added") {
                    let conversation = docChange.doc.data()
                    conversation.id = docChange.doc.id

                    model.updateConversationChange(conversation)
                }
                // docChange.type = "removed"
            }
        }
    }
}

controller.sendMessage = async function (messageContent) { //send conversation to firebase
    if (model.activeConversation) {
        messageContent = messageContent.trim()
        if(messageContent) { // if message content is not empty
        let message = {
            content: messageContent,
            owner: model.authUser.email,
            createdAt: new Date().toISOString()
        }
        await firebase.firestore().collection('conversations')
            .doc(model.activeConversation.id)
            .update({
                'messages': firebase.firestore.FieldValue.arrayUnion(message)// arrayUnion: ep them phan tu vao array va phai ko trung lap
            })
        }
    }
}
