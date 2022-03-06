计算从起点strat到终点target的最短距离

```int BFS(Node start, Node target){
    Queue<Node> q;      //核心数据结构
    Set<Node> visited;  //避免走回头路

    q.offer(start);     //将起点加入队列
    visited.add(start);
    int step = 0;       //记录扩散的步数
    
    while(q not empty){
        int sz = q.size();
        //将当前队列中的所有节点向四周扩散
        for(int i = 0; i < sz; i++){
            Node cur = q.poll();
            //划重点：这里判断是否到达终点
            if(cur is target)
                return steo;
            //将cur的相邻节点加入队列
            for(Node x : cur.adj()){
                if(x not in visited){
                    q.offer(x);
                    visited.add(x);
                }
            }
        }
        //划重点：在这里更新步数
        step++;
    }
}```