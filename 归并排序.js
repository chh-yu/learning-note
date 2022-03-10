// 归并排序
function sort(arr, l, r){
    if(r < l) return []
    if(r==l) return [arr[l]]
    if(r-l==1){
        if(arr[l]<=arr[r]) return [arr[l], arr[r]]
        else return [arr[r], arr[l]]
    }
    var mid = Math.floor((l+r)/2)
    return merge(sort(arr, l, mid), sort(arr, mid+1, r))
}
function merge(arr1, arr2){
    var len1 = arr1.length, len2 = arr2.length
    var i = 0, j = 0
    var temp = []
    while(i < len1 || j < len2){
        if(i>=len1){
            temp.push(arr2[j++])
            continue
        }
        if(j>=len2){
            temp.push(arr1[i++])
            continue
        }
        if(arr1[i]<arr2[j])
            temp.push(arr1[i++])
        else
            temp.push(arr2[j++])
    }
    return temp
}
var arr = [1, 2, 3, 5, 1000, 23, 40, 2, 88, 90, 101]
console.log(sort(arr, 0, arr1.length-1))