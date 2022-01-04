const model  = {
    authUser : null,
    conversations: null,
    activeConversation: null
}

model.authen = function(authUser){
    model.authUser = authUser
}
model.signOut = function() {
    model.authUser = null
    model.conversations = null
    model.activeConversation = null
}

model.saveConversations = function(conversations) {
    model.conversations = conversations
    view.showListConversations(conversations)
}

model.saveActiveConversation = function(conversationId){
    if(model.conversations instanceof Array) {
    //remove active class of previous div conversation 
        if(model.activeConversation) {
            let prevDiv = document.getElementById(model.activeConversation.id)
            prevDiv.classList.remove('active')
        }
    // add active class to current div conversation 
        let currentDiv = document.getElementById(conversationId)
        currentDiv.classList.add('active')
    //update model.activeConversation
        for(let conversation of model.conversations){
            if(conversation.id == conversationId){
                model.activeConversation = conversation
                view.showConversation(conversation)
                return
            }
        }
    }
}
model.updateConversationChange = function(conversation) {
    //1. find if(model.conversations contains conversation) 
    //->update conversation to model.conversations

    //2. if(not found)
    // push conversation to model.conversations

    //3. if(conversation is model.activeConversation)
    // update to view
    let foundIndex = model.conversations.findIndex(function(element) {
        return element.id == conversation.id //trả về cái gì?-> index of first element that passes the test
        
    })
    if(foundIndex >= 0) {
        //1.
        model.conversations[foundIndex] = conversation
    }else {
        //2.
        model.conversations.push(conversation)
    }
    if(model.activeConversation.id == conversation.id){
        //3.
        model.saveActiveConversation(conversation.id)
    }
    view.showListConversations(model.conversations)
}