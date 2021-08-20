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
        if(flag == "-s" || flag =="-n"){  //add numbering to each line in increasing order
            let arr = fileData.split("\n")
            for(let i=0;i<arr.length;i++){
                arr[i] = "     "+(i+1) +"  " + arr[i] 
            }
            fileData = arr.join("\n")
        }
        if(flag == "-sn" ||flag == "-b"){      ////add numbering to each non-empty line in increasing order
            let count =1;
            let arr = fileData.split("\n")
            for(let i=0;i<arr.length;i++){
                if(arr[i]!=""){
                    arr[i] = "     "+count +"  " + arr[i] 
                    count++
                }
                
            }
            fileData = arr.join("\n")
        }
        if(flag == "-rel"){   // remove extra empty lines when there are more than 1 empty lines keep only one empty line
            let arr = fileData.split("\n")
            let data = []
            for(let i=0;i<arr.length;i++){
                if(arr[i]=="" &&i!=0 && arr[i-1]==""){
                    continue
                }
                else{
                    data.push(arr[i])
                }
            }
            fileData = data.join("\n")
        }
        if(flag == "-A" || flag == "-e" || flag == "-E"){  //add $ to end of every  line same as cat -A command
            let arr = fileData.split("\n")
            for(let i=0;i<arr.length;i++){
                    arr[i] = arr[i]+"$"
            }
            fileData = arr.join("\n")
        }
    }
    console.log(fileData)
}