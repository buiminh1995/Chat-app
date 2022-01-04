
/*            
            // int a = 1
            // String s = "Hello"
            //var b = 2; ko dung
            const c = 10;
            let a = 1;
            let s = "Hello";
            console.log(sum(c, a))
            print(10)
            print(0)
            print(-10)
            switchCaseDemo(1)
            switchCaseDemo(2)
            switchCaseDemo("abc")
            let number = 1
            let string = "string"
            //Object
            let obj = {
                attr1: 12345,
                attr2: "Hello World",
                attr3: `Hello World`,
                method1: function() {
                    console.log("Hello")
                }
            }
            console.log(obj)
            let arr = [1, 87777, 8888, 9999]
            console.log(arr[0])
            console.log(arr[1])
            //console.log(typeof number)
            //console.log(typeof string)
            function print(number){
                if(number >0){
                    console.log("number greater than 0")
                } else if(number == 0) {
                    console.log("number = 0")
                }else{
                    // number is not number
                    console.log("number less than 0")
                }
            }
            function switchCaseDemo(value){
                switch(value) {
                    case 1: {
                        console.log("value = 1")
                        break;
                    }
                    case 2: {
                        console.log("value = 2")
                        break;
                    }
                    default: {
                        console.log("Unknown value")
                    }
                }
            }
            function loopDemo(){
                for(let i = 0; i<3; i ++) {
                    console.log("i" + i)
                }
            }
            function sum(a, b){
                return a + b;
            }
*/
/*
window.onload = init
window.onclick = init
function init() {
    let form = document.getElementById("form-register")
    console.log(form)
}
*/
window.onload = init 
//Khoi tao app
function init () {
    controller.initApp()
    //hien thi man hinh dang nhap
    // view.showComponents('logIn')
    // console.log(firebase.auth())
}