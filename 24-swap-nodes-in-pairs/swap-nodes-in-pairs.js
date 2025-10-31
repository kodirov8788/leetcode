/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function swapPairs(head) {
  const dummy = new ListNode(0, head);
  let curr = dummy;

  while (curr.next && curr.next.next) {
    let first = curr.next;
    let second = curr.next.next;

    // swap
    first.next = second.next;
    second.next = first;
    curr.next = second;

    // move to next pair
    curr = first;
  }

  return dummy.next;
}