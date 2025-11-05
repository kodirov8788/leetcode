/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function(nums, k, x) {
    const n = nums.length;
    const ans = new Array(n - k + 1);
    const cnt = new Map();
    const topHeap = [];
    const remainingHeap = [];
    const topIndex = new Map();
    const remainingIndex = new Map();
    const location = new Map();
    let current_sum = 0n;

    const priLess = (a, b) => {
        if (a.freq !== b.freq) return a.freq < b.freq;
        return a.val < b.val;
    };
    const topLess = priLess;
    const remLess = (a, b) => priLess(b, a);

    const swap = (heap, i, j, indexMap) => {
        [heap[i], heap[j]] = [heap[j], heap[i]];
        indexMap.set(heap[i].val, i);
        indexMap.set(heap[j].val, j);
    };

    const siftUp = (heap, i, lessFn, indexMap) => {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (lessFn(heap[i], heap[p])) {
                swap(heap, i, p, indexMap);
                i = p;
            } else {
                break;
            }
        }
    };

    const siftDown = (heap, i, lessFn, indexMap) => {
        const m = heap.length;
        while (true) {
            const l = 2 * i + 1;
            const r = 2 * i + 2;
            let best = i;
            if (l < m && lessFn(heap[l], heap[best])) best = l;
            if (r < m && lessFn(heap[r], heap[best])) best = r;
            if (best === i) break;
            swap(heap, i, best, indexMap);
            i = best;
        }
    };

    const heapPush = (heap, node, lessFn, indexMap) => {
        heap.push(node);
        indexMap.set(node.val, heap.length - 1);
        siftUp(heap, heap.length - 1, lessFn, indexMap);
    };

    const heapPop = (heap, lessFn, indexMap) => {
        if (heap.length === 0) return null;
        const res = heap[0];
        indexMap.delete(res.val);
        if (heap.length > 1) {
            const last = heap.pop();
            heap[0] = last;
            indexMap.set(last.val, 0);
            siftDown(heap, 0, lessFn, indexMap);
        } else {
            heap.pop();
        }
        return res;
    };

    const heapRemove = (heap, idx, lessFn, indexMap) => {
        const m = heap.length;
        if (idx === m - 1) {
            heap.pop();
            return;
        }
        const last = heap.pop();
        heap[idx] = last;
        indexMap.set(last.val, idx);
        siftDown(heap, idx, lessFn, indexMap);
        siftUp(heap, idx, lessFn, indexMap);
    };

    const remove = (val) => {
        if (!cnt.has(val) || cnt.get(val) === 0) return;
        const freq = cnt.get(val);
        const loc = location.get(val);
        if (loc === undefined) return;
        let heap, indexMap, lessFn;
        let isTop = loc === 'top';
        if (isTop) {
            current_sum -= BigInt(freq) * BigInt(val);
            heap = topHeap;
            indexMap = topIndex;
            lessFn = topLess;
        } else {
            heap = remainingHeap;
            indexMap = remainingIndex;
            lessFn = remLess;
        }
        const idx = indexMap.get(val);
        if (idx !== undefined) {
            heapRemove(heap, idx, lessFn, indexMap);
            indexMap.delete(val);
            location.delete(val);
        }
    };

    const add = (val) => {
        if (!cnt.has(val) || cnt.get(val) === 0) return;
        const freq = cnt.get(val);
        const node = {freq, val};
        let minTopNode = topHeap.length > 0 ? topHeap[0] : null;
        if (minTopNode === null || priLess(minTopNode, node)) {
            current_sum += BigInt(freq) * BigInt(val);
            heapPush(topHeap, node, topLess, topIndex);
            location.set(val, 'top');
        } else {
            heapPush(remainingHeap, node, remLess, remainingIndex);
            location.set(val, 'remaining');
        }
    };

    const balance = () => {
        while (remainingHeap.length > 0 && topHeap.length < x) {
            const cand = heapPop(remainingHeap, remLess, remainingIndex);
            if (cand === null) continue;
            location.set(cand.val, 'top');
            current_sum += BigInt(cand.freq) * BigInt(cand.val);
            heapPush(topHeap, cand, topLess, topIndex);
        }
        while (topHeap.length > x) {
            const weakest = heapPop(topHeap, topLess, topIndex);
            if (weakest === null) continue;
            location.set(weakest.val, 'remaining');
            current_sum -= BigInt(weakest.freq) * BigInt(weakest.val);
            heapPush(remainingHeap, weakest, remLess, remainingIndex);
        }
        while (topHeap.length > 0 && remainingHeap.length > 0 && priLess(topHeap[0], remainingHeap[0])) {
            const weak = heapPop(topHeap, topLess, topIndex);
            const strong = heapPop(remainingHeap, remLess, remainingIndex);
            current_sum -= BigInt(weak.freq) * BigInt(weak.val);
            heapPush(topHeap, strong, topLess, topIndex);
            location.set(strong.val, 'top');
            current_sum += BigInt(strong.freq) * BigInt(strong.val);
            heapPush(remainingHeap, weak, remLess, remainingIndex);
            location.set(weak.val, 'remaining');
        }
    };

    // Build first window
    for (let i = 0; i < k; i++) {
        const val = nums[i];
        remove(val);
        const newFreq = (cnt.get(val) || 0) + 1;
        cnt.set(val, newFreq);
        add(val);
    }
    balance();
    ans[0] = Number(current_sum);

    // Slide window
    for (let i = k; i < n; i++) {
        const left = nums[i - k];
        remove(left);
        const leftFreq = cnt.get(left) - 1;
        cnt.set(left, leftFreq);
        if (leftFreq > 0) {
            add(left);
        } else {
            cnt.delete(left);
        }

        const right = nums[i];
        remove(right);
        const rightFreq = (cnt.get(right) || 0) + 1;
        cnt.set(right, rightFreq);
        add(right);

        balance();
        ans[i - k + 1] = Number(current_sum);
    }

    return ans;
};