// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```


const fs=require("fs");
let str="";

fs.readFile("b.txt","utf-8",function(err,data){
    console.log(data);
    const arr=data.split(" ");
    for(let i=0;i<arr.length;i++){
        if(arr[i]===""){
            delete arr[i];
        }else{
            str+=arr[i]+" ";
        }
    }
    console.log(str);
    try{
        fs.writeFileSync("b.txt",str);
        console.log("File sucessfully updated");
    }catch(err){
        console.log("Error occur: ",err);
    }
})



