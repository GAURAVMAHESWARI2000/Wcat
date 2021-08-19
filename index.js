#!/usr/bin/env node 

const fs = require("fs")


let arguments = process.argv.slice(2)
// console.log(arguments)

// to store flag and filename in different variable
let flags = []
let filenames = []
let secondaryArguments = []

for(let i of arguments){
    if(i[0] == "-"){
        flags.push(i)
    }else if(i[0] == "."){
        secondaryArguments.push(i.slice(1))
    }else{
        filenames.push(i)
    }
}

/* // code to read all files
if(flags.length == 0 && filenames.length != 0 ){
    for(let file of filenames){
        console.log(fs.readFileSync(file,"utf-8"))
    }
} */


// code to remove spaces from all files  
// wcat -rs file1 file2 file3 file4 ......

/* if(flags[0] = "-rs" ){
    let ans = ""
    for(let file of filenames){
        let filedata = fs.readFileSync(file,"utf-8")
        for(let character of filedata){
            if(character != " " && character !="\n")
            ans = ans+character
        }
    }
    console.log(ans)
}  */

/* if(flags.length == 0 && filenames.length != 0 ){
    for(let file of filenames){
        console.log(fs.readFileSync(file,"utf-8"))
    }
}
else {
    for(let flag of flags){
        if(flag == "-rs"){
            for(let file of filenames){
                let fileData = fs.readFileSync(file,"utf-8")
                console.log(fileData.split(" ").join(""))
            }
        }
    }
} */

//better way to write previous code
for(let file of filenames){
    let fileData = fs.readFileSync(file,"utf-8")
    for(let flag of flags){
        if(flag == "-rs"){   //-rs = remove space
            fileData = fileData.split(" ").join("");
        }
        if(flag == "-rn"){  //-rn  =  remove new lines
            fileData = fileData.split("\n").join("");
        }
        /* if(flag == "-rsc"){  //remove special characters
            let temp = ""
            for(let character of fileData){
                if( character.charCodeAt(0)>=65 && character.charCodeAt(0)<=90 ||
                    character.charCodeAt(0)>=97 && character.charCodeAt(0)<=122){
                        temp += character
                    }
            }
            fileData = temp;

        } */
        if(flag == "-rsc"){  // remove arguments given in command line
            for(let secondaryArgument of secondaryArguments){
                fileData = fileData.split(secondaryArgument).join("")
            }
        }
    }
    console.log(fileData)
}