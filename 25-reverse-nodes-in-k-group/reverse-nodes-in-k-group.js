/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    // 1. Check if there are k nodes left.
    let count = 0;
    let curr = head;
    while (curr && count < k) {
        curr = curr.next;
        count++;
    }
    
    // If fewer than k nodes remain, return the current head (no change).
    if (count < k) {
        return head;
    }

    // 2. Identify and Reverse the Group (Standard Iterative Reversal)
    let prev = null;
    let current = head;
    let nextNode = null;
    let nodesToReverse = k;

    // 'newHead' will be the start of the reversed group (the original k-th node)
    // 'newTail' is the original 'head', which will become the tail of the reversed group
    const newTail = head; 

    while (nodesToReverse > 0) {
        nextNode = current.next; // Save the next node
        current.next = prev;     // Reverse the current node's pointer
        prev = current;          // Move 'prev' one step forward
        current = nextNode;      // Move 'current' one step forward
        nodesToReverse--;
    }

    // 3. Recursive Call and Reconnection
    // 'prev' is now the new head of the reversed group (e.g., '2' in [1,2,3,4,5] k=2)
    const newHead = prev;
    
    // 'current' is the head of the *next* k-group (e.g., '3' in [1,2,3,4,5] k=2)
    // Recursively call the function for the rest of the list and connect it
    newTail.next = reverseKGroup(current, k);

    // Return the new head of the now-reversed group
    return newHead;
};