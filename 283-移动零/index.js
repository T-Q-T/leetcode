var moveZeroes = function(nums) {
    for(let i=0;i<nums.length;i++){
        const isAfterAllZero=nums.slice(i).every(item=>item===0)
        if(isAfterAllZero)break
        if(nums[i]===0){
            nums.splice(i,1)
            nums.push(0)
            i--
        }
    }
    return nums
};

let res=moveZeroes([0,1,0,3,12])
debugger