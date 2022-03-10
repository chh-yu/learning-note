{
    // 589. N 叉树的前序遍历
    /**
     * // Definition for a Node.
     * function Node(val, children) {
     *    this.val = val;
     *    this.children = children;
     * };
     */
    /**
     * @param {Node|null} root
     * @return {number[]}
     */
    var preorder = function(root) {
        var ret = []
        function dfa(root){
            if(root == null){
                return
            }
            ret.push(root.val)
            // if(root.children.length == 0){
            //     return
            // }
            for(let i = 0; i < root.children.length; i++){
                dfa(root.children[i])
            }
        }
        dfa(root)
        return ret
    };
}