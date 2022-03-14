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
{
    // 99. 恢复二叉搜索树
    // 给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树 。
    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {void} Do not return anything, modify root in-place instead.
     */
    var recoverTree = function(root) {
        var nodelist = []
        var record = []
        function dfs(root){
            if(!root) return
            dfs(root.left)
            nodelist.push(root)
            dfs(root.right)
        }
        dfs(root)
        for(let i = 0; i < nodelist.length-1; i ++){
            if(nodelist[i].val>nodelist[i+1].val)
                record.push(i)
        }
        if(record.length==1){
            let temp = nodelist[record[0]].val
            nodelist[record[0]].val = nodelist[record[0]+1].val 
            nodelist[record[0]+1].val = temp
        }else{
            let temp = nodelist[record[0]].val
            nodelist[record[0]].val = nodelist[record[1]+1].val 
            nodelist[record[1]+1].val = temp
        }
    };
    //优化
    var recoverTree = function(root) {
        var last = null
        var record = []
        function dfs(root){
            if(!root) return
            dfs(root.left)
            if(last){
                if(root.val < last.val){
                    record.push([last, root])
                }
            }
            last = root
            dfs(root.right)
        }
        dfs(root)
        if(record.length == 1){
            temp = record[0][0].val
            record[0][0].val = record[0][1].val
            record[0][1].val = temp
        }else{
            temp = record[0][0].val
            record[0][0].val = record[1][1].val
            record[1][1].val = temp
        }
    };
}
{
    // 100. 相同的树
    // 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。

    // 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */
    /**
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {boolean}
     */
    var isSameTree = function(p, q) {
        var ret = true
        function dfs(root1, root2){
            if(!ret || !root1 && !root2) return
            if(!root1 && root2 || !root2 && root1){
                ret = false
                return
            }
            dfs(root1.left, root2.left)
            if(root1.val != root2.val){
                ret = false
                return
            }
            dfs(root1.right, root2.right)
        }
        dfs(p, q)
        return ret
    };
}
{
    // 101. 对称二叉树
    // 给你一个二叉树的根节点 root ， 检查它是否轴对称。
    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    // 递归
    // 执行用时：68 ms, 在所有 JavaScript 提交中击败了81.60%的用户
    // 内存消耗：43.7 MB, 在所有 JavaScript 提交中击败了21.54%的用户
    var isSymmetric = function(root) {
        function dfs(rootl, rootr){
            if(!rootl && !rootr) return true
            if(!rootl && rootr || rootl && !rootr || rootl.val != rootr.val) return false
            return dfs(rootl.left, rootr.right) && dfs(rootl.right, rootr.left)
        }
        return dfs(root.left, root.right)
    };
    //迭代
    var isSymmetric = function(root) {
        function check(u, v){
            var q = []
            q.push(u),q.push(v);
    
        while (q.length) {
            u = q.shift();
            v = q.shift();
    
            if (!u && !v) continue;
            if ((!u || !v) || (u.val !== v.val)) return false;
    
            q.push(u.left); 
            q.push(v.right);
    
            q.push(u.right); 
            q.push(v.left);
        }
        return true;
        }
        return check(root.left, root.right)
    };
}
{
    // 104. 二叉树的最大深度
    //     给定一个二叉树，找出其最大深度。
    // 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
    // 说明: 叶子节点是指没有子节点的节点。
    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    var maxDepth = function(root) {
        function dfs(root){
            if(!root){
                return 0
            }
            return Math.max(dfs(root.left)+1, dfs(root.right)+1)
        }
        return dfs(root)
    };
}
{
    // 110. 平衡二叉树
    // 给定一个二叉树，判断它是否是高度平衡的二叉树。
    // 本题中，一棵高度平衡二叉树定义为：
    // 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。
    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    var isBalanced = function(root) {
        var check = true
        function dfs(root){
            if(!root) return 0
            var highl = dfs(root.left)
            var highr= dfs(root.right)
            if(highl - highr > 1 || highr - highl > 1) check = false
            return Math.max(highl+1, highr+1)
        }
        dfs(root)
        return check
    };
}
{
    // 111. 二叉树的最小深度
    // 给定一个二叉树，找出其最小深度。
    // 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
    // 说明：叶子节点是指没有子节点的节点。
    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    var minDepth = function(root) {
        if(!root) return 0
        function dfs(root){
            if(!root.left && !root.right) return 1
            let hl = Number.MAX_SAFE_INTEGER
            let hr = Number.MAX_SAFE_INTEGER
            if(root.left) hl = dfs(root.left)
            if(root.right) hr = dfs(root.right)
            return Math.min(hl+1, hr+1)
        }
        return dfs(root)
    };
}