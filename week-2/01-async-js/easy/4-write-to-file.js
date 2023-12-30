// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs=require("fs");

console.log("Hi there 1");
try{
    fs.writeFileSync("a.txt","My Name is Kiran");
    console.log("File updated successfully");
}catch(err){
    console.log("Error occur: ",err);
    console.log("Hi there 2");
}

console.log("Hi there 2");

var sum=0;
for(let i=0;i<10000000000;i++){
    sum+=i;
}
console.log(sum);

