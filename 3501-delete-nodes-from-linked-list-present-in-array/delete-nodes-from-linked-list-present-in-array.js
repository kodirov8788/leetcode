/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function(nums, head) {
    // ---- 1. Build a Set for O(1) look-ups ----
    const deleteSet = new Set(nums);
    
    // ---- 2. Dummy node to simplify head removal ----
    const dummy = new ListNode(0, head);
    let cur = dummy;
    
    // ---- 3. Traverse and delete ----
    while (cur.next !== null) {
        if (deleteSet.has(cur.next.val)) {
            // skip this node
            cur.next = cur.next.next;
        } else {
            // move forward
            cur = cur.next;
        }
    }
    
    return dummy.next;
};