var findAnagrams = function (s, p) {
  if(p.length>s.length)return []
  let sMap=new Array(26).fill(0),pMap=new Array(26).fill(0),ans=[]
  for(let i=0;i<p.length;i++){
    pMap[p[i].charCodeAt()-"a".charCodeAt()]++
    sMap[s[i].charCodeAt()-"a".charCodeAt()]++
  }
  if(pMap.toString()===sMap.toString()){
    ans.push(0)
  }
  for(let i=0; i<s.length-p.length;i++){
    sMap[s[i].charCodeAt()-"a".charCodeAt()]--
    sMap[s[p.length+i].charCodeAt()-"a".charCodeAt()]++
    let so=sMap.toString(),po=pMap.toString()
    if(sMap.toString()===pMap.toString()){
      ans.push(i+1)
    }
  }

  return ans

};
let res = findAnagrams("cbaebabacd", "abc");
debugger;
