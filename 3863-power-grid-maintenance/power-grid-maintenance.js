/**
 * @param {number} c
 * @param {number[][]} connections
 * @param {number[][]} queries
 * @return {number[]}
 */
/**
 * @param {number} c
 * @param {number[][]} connections
 * @param {number[][]} queries
 * @return {number[]}
 */
var processQueries = function(c, connections, queries) {
    class Node {
        constructor(val) {
            this.val = val;
            this.prev = null;
            this.next = null;
        }
    }

    class UnionFind {
        constructor(size) {
            this.parent = new Array(size + 1);
            this.rank = new Array(size + 1).fill(0);
            for (let i = 1; i <= size; i++) {
                this.parent[i] = i;
            }
        }

        find(x) {
            if (this.parent[x] !== x) {
                this.parent[x] = this.find(this.parent[x]);
            }
            return this.parent[x];
        }

        union(x, y) {
            let px = this.find(x);
            let py = this.find(y);
            if (px === py) return;
            if (this.rank[px] < this.rank[py]) {
                this.parent[px] = py;
            } else {
                this.parent[py] = px;
                if (this.rank[px] === this.rank[py]) {
                    this.rank[px]++;
                }
            }
        }
    }

    let uf = new UnionFind(c);
    for (let [u, v] of connections) {
        uf.union(u, v);
    }

    let componentToNodes = new Map();
    for (let i = 1; i <= c; i++) {
        let root = uf.find(i);
        if (!componentToNodes.has(root)) {
            componentToNodes.set(root, []);
        }
        componentToNodes.get(root).push(i);
    }

    let head = new Map(); // root => head node
    let idToNode = new Map(); // root => Map(id => node)

    for (let [root, nodes] of componentToNodes) {
        nodes.sort((a, b) => a - b);
        let h = null;
        let t = null;
        let nodeMap = new Map();
        for (let id of nodes) {
            let node = new Node(id);
            nodeMap.set(id, node);
            if (!h) {
                h = node;
            } else {
                t.next = node;
                node.prev = t;
            }
            t = node;
        }
        head.set(root, h);
        idToNode.set(root, nodeMap);
    }

    let online = new Array(c + 1).fill(false);
    for (let i = 1; i <= c; i++) {
        online[i] = true;
    }

    let componentOf = new Array(c + 1);
    for (let i = 1; i <= c; i++) {
        componentOf[i] = uf.find(i);
    }

    let results = [];
    for (let query of queries) {
        let type = query[0];
        let x = query[1];
        if (type === 2) {
            if (!online[x]) continue;
            online[x] = false;
            let root = componentOf[x];
            let nodeMap = idToNode.get(root);
            let node = nodeMap.get(x);
            if (node) {
                if (node.prev) {
                    node.prev.next = node.next;
                }
                if (node.next) {
                    node.next.prev = node.prev;
                }
                if (head.get(root) === node) {
                    head.set(root, node.next);
                }
                nodeMap.delete(x);
            }
        } else { // type 1
            let root = componentOf[x];
            if (online[x]) {
                results.push(x);
            } else {
                let h = head.get(root);
                if (h) {
                    results.push(h.val);
                } else {
                    results.push(-1);
                }
            }
        }
    }
    return results;
};