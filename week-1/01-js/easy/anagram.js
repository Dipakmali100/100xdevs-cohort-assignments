/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const mySet1 = new Set();
  for(let i=0;i<str1.length;i++){
    let c=str1[i];
    mySet1.add(c.toUpperCase());
    mySet1.add(c.toLowerCase());
  }
  if(str1.length==str2.length){
    let i=0;
    for(i=0;i<str2.length;i++){
      if(!mySet1.has(str2[i])){
        return false;
      }
    }
    if(i==str2.length){
      return true;
    }
  }
  return false;
}

module.exports = isAnagram;
