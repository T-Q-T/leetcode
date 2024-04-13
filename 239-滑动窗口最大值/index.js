/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    const ans=[]
    nums.forEach((item,index)=>{
        if(index>nums.length -k)return
        const slideWindow=nums.slice(index,index+k)
        ans.push(Math.max(...slideWindow))
    })
    return ans
};
let res=maxSlidingWindow([1,3,-1,-3,5,3,6,7],3)
debugger