/* eslint-disable  func-names */
// /* eslint quote-props: ["error", "consistent"]*/
var API = "2KE3YV-L8L7EQ62RE";
// var wolfram = require('wolfram-alpha').createClient(API);
var client = require('node-wolfram');
var wolfram = new client(API);

module.exports = {
    POLYNOMIAL_EN_US: {
        'derivative of x squared': 'The derivative of x squared is two x.',
        'integral of two x': 'The indefinite integral of two x is x squared plus c.',
        'x squared plus two x': 'x squared plus two x is x squared plus two x,',
        'two x minus five': 'two x minus five is two x minus five,',
        'min value of x squared': 'the minimumconvergence value of x squared is zero and occurs when x equals zero.',
        //'five plus five': 'five plus five is ten.'
    }
};

module.exports = (operation, equation, lowerBound, UpperBound, callback) => {
    // var Sync = require("sync");
    // Sync(function() {
    var mystr = operation + " " + equation;
    if(lowerBound.length > 0){
        mystr += " from " + lowerBound + " to " + UpperBound;
    }else if (UpperBound.length > 0){
        mystr += " as it approaches " + UpperBound;
    }
    while(mystr.indexOf("open") > -1){
        mystr = mystr.replace("open", "(");
    }
    while(mystr.indexOf("close") > -1){
        mystr = mystr.replace("close", ")");
    }
    while(mystr.indexOf("open i close") > -1){
        mystr = mystr.replace("open i close", "open e close");
    }
    while (mystr.indexOf("pie") > -1) {
        mystr = mystr.replace("pie", "Pi");
    }
    while (mystr.indexOf("high") > -1) {
        mystr = mystr.replace("high", "Pi");
    }
    while(mystr.indexOf("sign") > -1){
        mystr = mystr.replace("sign", "sine");
    }
    var fs = require('fs');
    var temp = mystr + "\n"
    fs.appendFile("past_problems.txt", temp, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
    // console.log(mystr);
    // return;
    // console.log(mystr);
    wolfram.query(mystr, function(err, result){
        // console.log("Operation: " + operation);
        // console.log("Equation: " + equation);
        if (err) throw err;
        // console.log(result);
        // lol = result[0].subpods[0].text.split("=")[1];
        console.log("Operation: "+operation);
        console.log("Expression: "+equation);
        // console.log(result.queryresult.pod);
        // return
        var first = result.queryresult.pod[0].subpod[0].plaintext[0].toString();
        var second = "";
        if(result.queryresult.pod.length > 1){
            second = result.queryresult.pod[1].subpod[0].plaintext[0].toString();
        }
        // console.log(first);
        // var first = "";
        if (operation.length == 0) {
            second = first;
            // console.log(first);
            // console.log(second);
            for(var i = 0; i < result.queryresult.pod.length; i++){
                // console.log(result.queryresult.pod[i].$.title);
                if (result.queryresult.pod[i].$.title == 'Result') {
                    second = result.queryresult.pod[i].subpod[0].plaintext[0].toString();
                    break;
                }
            }
        }
        // var second = first;
        // console.log(result.queryresult.pod[0].subpod[0].plaintext[0].toString());
        while (first.indexOf("sqrt") > -1) {
            first = first.replace('sqrt', "square root of");
        }
        while (second.indexOf("sqrt") > -1) {
            second = second.replace('sqrt', "square root of");
        }
        if(first.substring(0,3) == "d/d" || first.substring(1,9) == "integral" || first.substring(0,3) == "lim"){
            if (first.substring(0,3) == "d/d") {
                first = first.replace(first.substring(0,4), "Derivative of ");
            }
            while(first.indexOf("/") > 0){
                first = first.replace("/", " over ");
            }
            callback(first);
        }else{
            // console.log(second);
            callback(second);
        }
        // console.log(result.queryresult.pod[0].subpod[0].plaintext);
        // callback("2 x");
    })
    // })
}
//
// var exec = require('child_process').execSync;
// var cmd = 'python wolfram.py ' + operation + " " + equation;
//
// // console.log(operation);
// // console.log(equation);
// // myans = ""
// var lol = exec(cmd, function(error, stdout, stderr) {
//     // command output is in st
//     if (stderr) {
//         console.log(stderr);
//     }
//     // console.log(stdout);
//     return stdout
//
// });
// // const buf1 = Buffer.allocUnsafe(lol.length)
// // console.log(buf1.toString(lol));
// // console.log(lol.toString());
// return lol.toString();
// // console.log("hello");
// // console.log(myans);
// // return {
// // return myans
// //     lol: () => "hello"
// // }
// // console.log("hello");
