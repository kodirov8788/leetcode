class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  // Min-heap (priority queue) using array and sort
  const heap = [];

  // Push all list heads into heap
  for (let node of lists) {
    if (node) heap.push(node);
  }

  // Sort heap by node value
  heap.sort((a, b) => a.val - b.val);

  const dummy = new ListNode(0);
  let tail = dummy;

  while (heap.length > 0) {
    // Take smallest node
    const smallest = heap.shift();
    tail.next = smallest;
    tail = tail.next;

    // If there is a next node, insert it into heap
    if (smallest.next) {
      heap.push(smallest.next);
      heap.sort((a, b) => a.val - b.val); // maintain min-heap order
    }
  }

  return dummy.next;
};