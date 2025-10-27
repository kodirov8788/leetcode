/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // Create a dummy node to handle edge cases (like removing the head)
    let dummy = new ListNode(0, head);
    let fast = dummy;
    let slow = dummy;

    // Move fast pointer n+1 steps ahead to maintain a gap of n between fast and slow
    for (let i = 0; i < n + 1; i++) {
        fast = fast.next;
    }

    // Move both pointers until fast reaches the end
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // Now, slow is before the node to remove
    slow.next = slow.next.next;

    return dummy.next;
};