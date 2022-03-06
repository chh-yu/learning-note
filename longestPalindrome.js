// 最大回文子串， 中心扩散法
var longestPalindrome = function(s) {
    function expandAroundCenter(s, start, end){
        while(start >= 0 && end < s.length && s.charAt(start) == s.charAt(end)){
            start--
            end++
        }
        return end-start-1
    }
    let start = 0;
    let end = 0;
    let max_len = 0
    for(let i = 0; i < s.length; i++){
        let len1 = expandAroundCenter(s, i, i)
        let len2 = expandAroundCenter(s, i, i+1)
        let len = Math.max(len1, len2)
        if(len > max_len){
            max_len = len
            start = i - Math.floor((len-1)/2)
            end = i + Math.floor(len/2)
        }
    }
    return s.slice(start, end+1)
};