//bien
// let, var (gan nhu giong het nhau)
// let, var: khai bao cac bien binh thuong
//const = khai bao cac hang
// let a = 1
// a = 2

// const b = 1
// b = 2

// const b = {}
// b.attr1 = 1
// b.attr2 = 2

// function doSomething() {
//     console.log("doSomething")
// }

// doSomething()

// var otherFunction = doSomething
// otherFunction()
var a = 1

if(a != 0 ){
    console.log('a has value')
}

// if (a) {// a != 0 && a != null && a != ''
//     console.log("a has value")
// } // a != 0 && a != null && a != ''

// null, undefined, 0, NaN, false ~ false
//ham
//async function, async - await
function loadImage(url){
    var img = new Image()
    img.src = url
    img.onload = function() {
        console.log('loaded')
    }
}
function sayHelloToUser() {
    console
}
loadImage()// cho url vao
sayHelloToUser()

//object
const message = {
    content: "Hello",
    owner: "minh",
    sayHello: function() {
        console.log("Hello!")
    },
    number: 0123,
    array: [1,2,3],
    childObject: {
        a: 1,
        b: 2
    }
}

console.log(message.content)
console.log(message['content'])

Object 
//array
let arr = [1,2,3,4] // nen dung let
let firstEvenNumber = arr.find(function(value) {
    return value %2
})

let evenNumbers = arr.filter(function(value) {
    return value %2
})

let doubleNumbers = arr.map(function(value) {
    return value*2
})
console.log(doubleNumbers)
console.log(doubleNumbers)
console.log(doubleNumbers)

//number
let num = parseInt("2")
let num2 = parseFloat("2.2222")
//string

let str = 'a'
let str2 = "b"

//dac biet
let str3 = `c`
//
let name = "Linh"
let name2 = "Mai"
let sayHello = `Hello ${name}` //Hello Linh
let sayHello2 = `Hello ${name2}`

name.toLowerCase()
name.toUpperCase()
name.trim()
//13/7 Firebase - Authentication