export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]
    }
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      python: `def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)  # Expected: ["o","l","l","e","h"]

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)  # Expected: ["h","a","n","n","a","H"]`,
      java: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        char[] test1 = {'h','e','l','l','o'};
        reverseString(test1);
        System.out.println(Arrays.toString(test1)); // Expected: [o, l, l, e, h]
        
        char[] test2 = {'H','a','n','n','a','h'};
        reverseString(test2);
        System.out.println(Arrays.toString(test2)); // Expected: [h, a, n, n, a, H]
    }
}`,
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
      notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: "true",
        explanation:
          's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true`,
      python: `def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))  # Expected: True`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
        System.out.println(isPalindrome("race a car")); // Expected: false
        System.out.println(isPalindrome(" ")); // Expected: true
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1])); // Expected: 1
console.log(maxSubArray([5,4,-1,7,8])); // Expected: 23`,
      python: `def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))  # Expected: 1
print(maxSubArray([5,4,-1,7,8]))  # Expected: 23`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // Expected: 6
        System.out.println(maxSubArray(new int[]{1})); // Expected: 1
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8})); // Expected: 23
    }
}`,
    },
    expectedOutput: {
      javascript: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
      notes: [
        "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        "Return the maximum amount of water a container can store.",
        "Notice that you may not slant the container.",
      ],
    },
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxArea(height) {
  // Write your solution here
  
}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1])); // Expected: 1`,
      python: `def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))  # Expected: 1`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); // Expected: 49
        System.out.println(maxArea(new int[]{1,1})); // Expected: 1
    }
}`,
    },
    expectedOutput: {
      javascript: "49\n1",
      python: "49\n1",
      java: "49\n1",
    },
  },

  "valid-anagram": {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "String • Hash Table",
    description: {
      text: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
      notes: ["An anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once."],
    },
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
      },
    ],
    constraints: ["1 ≤ s.length, t.length ≤ 5 * 10⁴", "s and t consist of lowercase English letters"],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  // Write your solution here
  
}

// Test cases
console.log(isAnagram("anagram", "nagaram")); // Expected: true
console.log(isAnagram("rat", "car")); // Expected: false`,
      python: `def isAnagram(s, t):
    # Write your solution here
    pass

# Test cases
print(isAnagram("anagram", "nagaram"))  # Expected: True
print(isAnagram("rat", "car"))  # Expected: False`,
      java: `class Solution {
    public static boolean isAnagram(String s, String t) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isAnagram("anagram", "nagaram")); // Expected: true
        System.out.println(isAnagram("rat", "car")); // Expected: false
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
    },
  },

  "best-time-to-buy-and-sell-stock": {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array • Dynamic Programming",
    description: {
      text: "You are given an array prices where prices[i] is the price of a given stock on the ith day.",
      notes: [
        "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        "Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
      ],
    },
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "No transactions are done and the max profit = 0.",
      },
    ],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxProfit(prices) {
  // Write your solution here
  
}

// Test cases
console.log(maxProfit([7,1,5,3,6,4])); // Expected: 5
console.log(maxProfit([7,6,4,3,1])); // Expected: 0`,
      python: `def maxProfit(prices):
    # Write your solution here
    pass

# Test cases
print(maxProfit([7,1,5,3,6,4]))  # Expected: 5
print(maxProfit([7,6,4,3,1]))  # Expected: 0`,
      java: `class Solution {
    public static int maxProfit(int[] prices) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{7,1,5,3,6,4})); // Expected: 5
        System.out.println(maxProfit(new int[]{7,6,4,3,1})); // Expected: 0
    }
}`,
    },
    expectedOutput: {
      javascript: "5\n0",
      python: "5\n0",
      java: "5\n0",
    },
  },

  "valid-parentheses": {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "String • Stack",
    description: {
      text: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      notes: [
        "An input string is valid if:",
        "1. Open brackets must be closed by the same type of brackets.",
        "2. Open brackets must be closed in the correct order.",
        "3. Every close bracket has a corresponding open bracket of the same type.",
      ],
    },
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
      {
        input: 's = "([)]"',
        output: "false",
      },
      {
        input: 's = "{[]}"',
        output: "true",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'"],
    starterCode: {
      javascript: `function isValid(s) {
  // Write your solution here
  
}

// Test cases
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false
console.log(isValid("([)]")); // Expected: false
console.log(isValid("{[]}")); // Expected: true`,
      python: `def isValid(s):
    # Write your solution here
    pass

# Test cases
print(isValid("()"))  # Expected: True
print(isValid("()[]{}"))  # Expected: True
print(isValid("(]"))  # Expected: False
print(isValid("([)]"))  # Expected: False
print(isValid("{[]}"))  # Expected: True`,
      java: `class Solution {
    public static boolean isValid(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isValid("()")); // Expected: true
        System.out.println(isValid("()[]{}")); // Expected: true
        System.out.println(isValid("(]")); // Expected: false
        System.out.println(isValid("([)]")); // Expected: false
        System.out.println(isValid("{[]}")); // Expected: true
    }
}`,
    },
    expectedOutput: {
      javascript: "true\ntrue\nfalse\nfalse\ntrue",
      python: "True\nTrue\nFalse\nFalse\nTrue",
      java: "true\ntrue\nfalse\nfalse\ntrue",
    },
  },

  "merge-two-sorted-lists": {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List • Recursion",
    description: {
      text: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
      notes: [
        "The list should be made by splicing together the nodes of the first two lists.",
        "Return the head of the merged linked list.",
      ],
    },
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
      },
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50]", "-100 ≤ Node.val ≤ 100", "Both lists are sorted in non-decreasing order"],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
  // Write your solution here
  
}

// Test helper
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

function arrayToList(arr) {
  let dummy = new ListNode()
  let curr = dummy
  for (let v of arr) { curr.next = new ListNode(v); curr = curr.next }
  return dummy.next
}

function listToArray(head) {
  let res = []
  while (head) { res.push(head.val); head = head.next }
  return res
}

// Test cases
console.log(listToArray(mergeTwoLists(arrayToList([1,2,4]), arrayToList([1,3,4])))); // Expected: [1,1,2,3,4,4]
console.log(listToArray(mergeTwoLists(arrayToList([]), arrayToList([])))); // Expected: []
console.log(listToArray(mergeTwoLists(arrayToList([]), arrayToList([0])))); // Expected: [0]`,
      python: `def mergeTwoLists(list1, list2):
    # Write your solution here
    pass

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arrayToList(arr):
    dummy = ListNode()
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def listToArray(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return res

# Test cases
print(listToArray(mergeTwoLists(arrayToList([1,2,4]), arrayToList([1,3,4]))))  # Expected: [1,1,2,3,4,4]
print(listToArray(mergeTwoLists(arrayToList([]), arrayToList([]))))  # Expected: []
print(listToArray(mergeTwoLists(arrayToList([]), arrayToList([0]))))  # Expected: [0]`,
      java: `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        
        return null;
    }
    
    private static ListNode arrayToList(int[] arr) {
        ListNode dummy = new ListNode();
        ListNode curr = dummy;
        for (int v : arr) {
            curr.next = new ListNode(v);
            curr = curr.next;
        }
        return dummy.next;
    }
    
    private static String listToString(ListNode head) {
        List<Integer> res = new ArrayList<>();
        while (head != null) {
            res.add(head.val);
            head = head.next;
        }
        return res.toString();
    }
    
    public static void main(String[] args) {
        System.out.println(listToString(mergeTwoLists(arrayToList(new int[]{1,2,4}), arrayToList(new int[]{1,3,4})))); // Expected: [1, 1, 2, 3, 4, 4]
        System.out.println(listToString(mergeTwoLists(arrayToList(new int[]{}), arrayToList(new int[]{})))); // Expected: []
        System.out.println(listToString(mergeTwoLists(arrayToList(new int[]{}), arrayToList(new int[]{0})))); // Expected: [0]
    }
}`,
    },
    expectedOutput: {
      javascript: "[1,1,2,3,4,4]\n[]\n[0]",
      python: "[1, 1, 2, 3, 4, 4]\n[]\n[0]",
      java: "[1, 1, 2, 3, 4, 4]\n[]\n[0]",
    },
  },

  "binary-search": {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Array • Binary Search",
    description: {
      text: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
      notes: ["If target exists, return its index. Otherwise, return -1.", "You must write an algorithm with O(log n) runtime complexity."],
    },
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4.",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "-10⁴ < nums[i], target < 10⁴", "All integers in nums are unique", "nums is sorted in ascending order"],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(search([-1,0,3,5,9,12], 9)); // Expected: 4
console.log(search([-1,0,3,5,9,12], 2)); // Expected: -1`,
      python: `def search(nums, target):
    # Write your solution here
    pass

# Test cases
print(search([-1,0,3,5,9,12], 9))  # Expected: 4
print(search([-1,0,3,5,9,12], 2))  # Expected: -1`,
      java: `class Solution {
    public static int search(int[] nums, int target) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(search(new int[]{-1,0,3,5,9,12}, 9)); // Expected: 4
        System.out.println(search(new int[]{-1,0,3,5,9,12}, 2)); // Expected: -1
    }
}`,
    },
    expectedOutput: {
      javascript: "4\n-1",
      python: "4\n-1",
      java: "4\n-1",
    },
  },

  "contains-duplicate": {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true",
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false",
      },
      {
        input: "nums = [1,1,1,3,3,4,3,2,4,2]",
        output: "true",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    starterCode: {
      javascript: `function containsDuplicate(nums) {
  // Write your solution here
  
}

// Test cases
console.log(containsDuplicate([1,2,3,1])); // Expected: true
console.log(containsDuplicate([1,2,3,4])); // Expected: false
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2])); // Expected: true`,
      python: `def containsDuplicate(nums):
    # Write your solution here
    pass

# Test cases
print(containsDuplicate([1,2,3,1]))  # Expected: True
print(containsDuplicate([1,2,3,4]))  # Expected: False
print(containsDuplicate([1,1,1,3,3,4,3,2,4,2]))  # Expected: True`,
      java: `class Solution {
    public static boolean containsDuplicate(int[] nums) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(containsDuplicate(new int[]{1,2,3,1})); // Expected: true
        System.out.println(containsDuplicate(new int[]{1,2,3,4})); // Expected: false
        System.out.println(containsDuplicate(new int[]{1,1,1,3,3,4,3,2,4,2})); // Expected: true
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
    },
  },

  "longest-common-prefix": {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    category: "String • Trie",
    description: {
      text: "Write a function to find the longest common prefix string amongst an array of strings.",
      notes: ["If there is no common prefix, return an empty string ''."],
    },
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"',
      },
      {
        input: 'strs = ["dog","racecar","car"]',
        output: '""',
        explanation: "There is no common prefix among the input strings.",
      },
    ],
    constraints: ["1 ≤ strs.length ≤ 200", "0 ≤ strs[i].length ≤ 200", "strs[i] consists of only lowercase English letters"],
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {
  // Write your solution here
  
}

// Test cases
console.log(longestCommonPrefix(["flower","flow","flight"])); // Expected: "fl"
console.log(longestCommonPrefix(["dog","racecar","car"])); // Expected: ""`,
      python: `def longestCommonPrefix(strs):
    # Write your solution here
    pass

# Test cases
print(longestCommonPrefix(["flower","flow","flight"]))  # Expected: "fl"
print(longestCommonPrefix(["dog","racecar","car"]))  # Expected: ""`,
      java: `class Solution {
    public static String longestCommonPrefix(String[] strs) {
        // Write your solution here
        
        return "";
    }
    
    public static void main(String[] args) {
        System.out.println(longestCommonPrefix(new String[]{"flower","flow","flight"})); // Expected: "fl"
        System.out.println(longestCommonPrefix(new String[]{"dog","racecar","car"})); // Expected: ""
    }
}`,
    },
    expectedOutput: {
      javascript: "fl\n",
      python: "fl\n",
      java: "fl\n",
    },
  },

  "climbing-stairs": {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming • Math",
    description: {
      text: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.",
      notes: ["In how many distinct ways can you climb to the top?"],
    },
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways: 1. 1 step + 1 step, 2. 2 steps.",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways: 1. 1+1+1, 2. 1+2, 3. 2+1.",
      },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Write your solution here
  
}

// Test cases
console.log(climbStairs(2)); // Expected: 2
console.log(climbStairs(3)); // Expected: 3`,
      python: `def climbStairs(n):
    # Write your solution here
    pass

# Test cases
print(climbStairs(2))  # Expected: 2
print(climbStairs(3))  # Expected: 3`,
      java: `class Solution {
    public static int climbStairs(int n) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(climbStairs(2)); // Expected: 2
        System.out.println(climbStairs(3)); // Expected: 3
    }
}`,
    },
    expectedOutput: {
      javascript: "2\n3",
      python: "2\n3",
      java: "2\n3",
    },
  },

  "linked-list-cycle": {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "Linked List • Two Pointers",
    description: {
      text: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
      notes: ["There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.", "Return true if there is a cycle. Otherwise, return false."],
    },
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1",
        output: "true",
        explanation: "The tail connects to the 1st node (0-indexed).",
      },
      {
        input: "head = [1,2], pos = 0",
        output: "true",
        explanation: "The tail connects to the 0th node.",
      },
      {
        input: "head = [1], pos = -1",
        output: "false",
        explanation: "There is no cycle in the linked list.",
      },
    ],
    constraints: ["The number of nodes in the list is in the range [0, 10⁴]", "-10⁵ ≤ Node.val ≤ 10⁵", "pos is -1 or a valid index in the linked-list"],
    starterCode: {
      javascript: `function hasCycle(head) {
  // Write your solution here
  
}

function ListNode(val) {
  this.val = val
  this.next = null
}

function createLinkedList(arr, pos) {
  let dummy = new ListNode()
  let curr = dummy
  let cycleNode = null
  for (let i = 0; i < arr.length; i++) {
    curr.next = new ListNode(arr[i])
    curr = curr.next
    if (i === pos) cycleNode = curr
  }
  if (cycleNode) curr.next = cycleNode
  return dummy.next
}

// Test cases
console.log(hasCycle(createLinkedList([3,2,0,-4], 1))); // Expected: true
console.log(hasCycle(createLinkedList([1,2], 0))); // Expected: true
console.log(hasCycle(createLinkedList([1], -1))); // Expected: false`,
      python: `def hasCycle(head):
    # Write your solution here
    pass

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def createLinkedList(arr, pos):
    dummy = ListNode(0)
    curr = dummy
    cycleNode = None
    for i, v in enumerate(arr):
        curr.next = ListNode(v)
        curr = curr.next
        if i == pos:
            cycleNode = curr
    if cycleNode:
        curr.next = cycleNode
    return dummy.next

# Test cases
print(hasCycle(createLinkedList([3,2,0,-4], 1)))  # Expected: True
print(hasCycle(createLinkedList([1,2], 0)))  # Expected: True
print(hasCycle(createLinkedList([1], -1)))  # Expected: False`,
      java: `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}

class Solution {
    public static boolean hasCycle(ListNode head) {
        // Write your solution here
        
        return false;
    }
    
    private static ListNode createLinkedList(int[] arr, int pos) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        ListNode cycleNode = null;
        for (int i = 0; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
            if (i == pos) cycleNode = curr;
        }
        if (cycleNode != null) curr.next = cycleNode;
        return dummy.next;
    }
    
    public static void main(String[] args) {
        System.out.println(hasCycle(createLinkedList(new int[]{3,2,0,-4}, 1))); // Expected: true
        System.out.println(hasCycle(createLinkedList(new int[]{1,2}, 0))); // Expected: true
        System.out.println(hasCycle(createLinkedList(new int[]{1}, -1))); // Expected: false
    }
}`,
    },
    expectedOutput: {
      javascript: "true\ntrue\nfalse",
      python: "True\nTrue\nFalse",
      java: "true\ntrue\nfalse",
    },
  },

  "invert-binary-tree": {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Tree • Recursion",
    description: {
      text: "Given the root of a binary tree, invert the tree, and return its root.",
      notes: [],
    },
    examples: [
      {
        input: "root = [4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]",
      },
      {
        input: "root = [2,1,3]",
        output: "[2,3,1]",
      },
      {
        input: "root = []",
        output: "[]",
      },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 100]", "-100 ≤ Node.val ≤ 100"],
    starterCode: {
      javascript: `function invertTree(root) {
  // Write your solution here
  
}

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

function arrayToTree(arr) {
  if (!arr.length) return null
  let root = new TreeNode(arr[0])
  let queue = [root]
  let i = 1
  while (queue.length && i < arr.length) {
    let node = queue.shift()
    if (arr[i] !== null && arr[i] !== undefined) {
      node.left = new TreeNode(arr[i])
      queue.push(node.left)
    }
    i++
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      node.right = new TreeNode(arr[i])
      queue.push(node.right)
    }
    i++
  }
  return root
}

function treeToArray(root) {
  if (!root) return []
  let res = []
  let queue = [root]
  while (queue.length) {
    let node = queue.shift()
    if (node) {
      res.push(node.val)
      queue.push(node.left)
      queue.push(node.right)
    } else {
      res.push(null)
    }
  }
  while (res[res.length - 1] === null) res.pop()
  return res
}

// Test cases
console.log(JSON.stringify(treeToArray(invertTree(arrayToTree([4,2,7,1,3,6,9]))))); // Expected: [4,7,2,9,6,3,1]
console.log(JSON.stringify(treeToArray(invertTree(arrayToTree([2,1,3]))))); // Expected: [2,3,1]
console.log(JSON.stringify(treeToArray(invertTree(arrayToTree([]))))); // Expected: []`,
      python: `def invertTree(root):
    # Write your solution here
    pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def arrayToTree(arr):
    if not arr:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root

def treeToArray(root):
    if not root:
        return []
    res = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node:
            res.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            res.append(None)
    while res and res[-1] is None:
        res.pop()
    return res

# Test cases
print(treeToArray(invertTree(arrayToTree([4,2,7,1,3,6,9]))))  # Expected: [4,7,2,9,6,3,1]
print(treeToArray(invertTree(arrayToTree([2,1,3]))))  # Expected: [2,3,1]
print(treeToArray(invertTree(arrayToTree([]))))  # Expected: []`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public static TreeNode invertTree(TreeNode root) {
        // Write your solution here
        
        return null;
    }
    
    private static TreeNode arrayToTree(Integer[] arr) {
        if (arr.length == 0) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < arr.length) {
            TreeNode node = queue.poll();
            if (arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                queue.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }
    
    private static String treeToString(TreeNode root) {
        if (root == null) return "[]";
        List<String> res = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node != null) {
                res.add(String.valueOf(node.val));
                queue.offer(node.left);
                queue.offer(node.right);
            } else {
                res.add("null");
            }
        }
        while (res.get(res.size() - 1).equals("null")) res.remove(res.size() - 1);
        return res.toString();
    }
    
    public static void main(String[] args) {
        System.out.println(treeToString(invertTree(arrayToTree(new Integer[]{4,2,7,1,3,6,9})))); // Expected: [4, 7, 2, 9, 6, 3, 1]
        System.out.println(treeToString(invertTree(arrayToTree(new Integer[]{2,1,3})))); // Expected: [2, 3, 1]
        System.out.println(treeToString(invertTree(arrayToTree(new Integer[]{})))); // Expected: []
    }
}`,
    },
    expectedOutput: {
      javascript: '[4,7,2,9,6,3,1]\n[2,3,1]\n[]',
      python: "[4, 7, 2, 9, 6, 3, 1]\n[2, 3, 1]\n[]",
      java: "[4, 7, 2, 9, 6, 3, 1]\n[2, 3, 1]\n[]",
    },
  },

  "longest-substring-without-repeating-characters": {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String • Sliding Window",
    description: {
      text: "Given a string s, find the length of the longest substring without repeating characters.",
      notes: [],
    },
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.',
      },
    ],
    constraints: ["0 ≤ s.length ≤ 5 * 10⁴", "s consists of English letters, digits, symbols and spaces"],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}

// Test cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
console.log(lengthOfLongestSubstring("bbbbb")); // Expected: 1
console.log(lengthOfLongestSubstring("pwwkew")); // Expected: 3`,
      python: `def lengthOfLongestSubstring(s):
    # Write your solution here
    pass

# Test cases
print(lengthOfLongestSubstring("abcabcbb"))  # Expected: 3
print(lengthOfLongestSubstring("bbbbb"))  # Expected: 1
print(lengthOfLongestSubstring("pwwkew"))  # Expected: 3`,
      java: `class Solution {
    public static int lengthOfLongestSubstring(String s) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
        System.out.println(lengthOfLongestSubstring("bbbbb")); // Expected: 1
        System.out.println(lengthOfLongestSubstring("pwwkew")); // Expected: 3
    }
}`,
    },
    expectedOutput: {
      javascript: "3\n1\n3",
      python: "3\n1\n3",
      java: "3\n1\n3",
    },
  },

  "3sum": {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
      notes: ["The solution set must not contain duplicate triplets."],
    },
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
      },
      {
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]",
      },
    ],
    constraints: ["3 ≤ nums.length ≤ 3000", "-10⁵ ≤ nums[i] ≤ 10⁵"],
    starterCode: {
      javascript: `function threeSum(nums) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(threeSum([-1,0,1,2,-1,-4]))); // Expected: [[-1,-1,2],[-1,0,1]]
console.log(JSON.stringify(threeSum([0,1,1]))); // Expected: []
console.log(JSON.stringify(threeSum([0,0,0]))); // Expected: [[0,0,0]]`,
      python: `def threeSum(nums):
    # Write your solution here
    pass

# Test cases
print(threeSum([-1,0,1,2,-1,-4]))  # Expected: [[-1,-1,2],[-1,0,1]]
print(threeSum([0,1,1]))  # Expected: []
print(threeSum([0,0,0]))  # Expected: [[0,0,0]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(threeSum(new int[]{-1,0,1,2,-1,-4})); // Expected: [[-1,-1,2],[-1,0,1]]
        System.out.println(threeSum(new int[]{0,1,1})); // Expected: []
        System.out.println(threeSum(new int[]{0,0,0})); // Expected: [[0,0,0]]
    }
}`,
    },
    expectedOutput: {
      javascript: '[[-1,-1,2],[-1,0,1]]\n[]\n[[0,0,0]]',
      python: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
      java: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
    },
  },

  "group-anagrams": {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "String • Hash Table",
    description: {
      text: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
      notes: ["An anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once."],
    },
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]',
      },
    ],
    constraints: ["1 ≤ strs.length ≤ 10⁴", "0 ≤ strs[i].length ≤ 100", "strs[i] consists of lowercase English letters"],
    starterCode: {
      javascript: `function groupAnagrams(strs) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))); // Expected: [["bat"],["nat","tan"],["ate","eat","tea"]]
console.log(JSON.stringify(groupAnagrams([""]))); // Expected: [[""]]
console.log(JSON.stringify(groupAnagrams(["a"]))); // Expected: [["a"]]`,
      python: `def groupAnagrams(strs):
    # Write your solution here
    pass

# Test cases
print(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))  # Expected: [["bat"],["nat","tan"],["ate","eat","tea"]]
print(groupAnagrams([""]))  # Expected: [[""]]
print(groupAnagrams(["a"]))  # Expected: [["a"]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<String>> groupAnagrams(String[] strs) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(groupAnagrams(new String[]{"eat","tea","tan","ate","nat","bat"})); // Expected: [[bat], [nat, tan], [ate, eat, tea]]
        System.out.println(groupAnagrams(new String[]{""})); // Expected: [[]]
        System.out.println(groupAnagrams(new String[]{"a"})); // Expected: [[a]]
    }
}`,
    },
    expectedOutput: {
      javascript: '[["bat"],["nat","tan"],["ate","eat","tea"]]\n[[""]]\n[["a"]]',
      python: "[['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]\n[['']]\n[['a']]",
      java: "[[bat], [nat, tan], [ate, eat, tea]]\n[[]]\n[[a]]",
    },
  },

  "product-of-array-except-self": {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array • Prefix Sum",
    description: {
      text: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
      notes: ["You must write an algorithm that runs in O(n) time and without using the division operation."],
    },
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
      },
      {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]",
      },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁵", "-30 ≤ nums[i] ≤ 30", "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer"],
    starterCode: {
      javascript: `function productExceptSelf(nums) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(productExceptSelf([1,2,3,4]))); // Expected: [24,12,8,6]
console.log(JSON.stringify(productExceptSelf([-1,1,0,-3,3]))); // Expected: [0,0,9,0,0]`,
      python: `def productExceptSelf(nums):
    # Write your solution here
    pass

# Test cases
print(productExceptSelf([1,2,3,4]))  # Expected: [24,12,8,6]
print(productExceptSelf([-1,1,0,-3,3]))  # Expected: [0,0,9,0,0]`,
      java: `import java.util.*;

class Solution {
    public static int[] productExceptSelf(int[] nums) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(productExceptSelf(new int[]{1,2,3,4}))); // Expected: [24, 12, 8, 6]
        System.out.println(Arrays.toString(productExceptSelf(new int[]{-1,1,0,-3,3}))); // Expected: [0, 0, 9, 0, 0]
    }
}`,
    },
    expectedOutput: {
      javascript: "[24,12,8,6]\n[0,0,9,0,0]",
      python: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
      java: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
    },
  },

  "number-of-islands": {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Matrix • DFS/BFS",
    description: {
      text: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
      notes: ["An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.", "You may assume all four edges of the grid are surrounded by water."],
    },
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: "1",
      },
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: "3",
      },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 ≤ m, n ≤ 300", "grid[i][j] is '0' or '1'"],
    starterCode: {
      javascript: `function numIslands(grid) {
  // Write your solution here
  
}

// Test cases
console.log(numIslands([
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
])); // Expected: 1

console.log(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
])); // Expected: 3`,
      python: `def numIslands(grid):
    # Write your solution here
    pass

# Test cases
print(numIslands([
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]))  # Expected: 1

print(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]))  # Expected: 3`,
      java: `import java.util.*;

class Solution {
    public static int numIslands(char[][] grid) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(numIslands(new char[][]{
            {'1','1','1','1','0'},
            {'1','1','0','1','0'},
            {'1','1','0','0','0'},
            {'0','0','0','0','0'}
        })); // Expected: 1
        
        System.out.println(numIslands(new char[][]{
            {'1','1','0','0','0'},
            {'1','1','0','0','0'},
            {'0','0','1','0','0'},
            {'0','0','0','1','1'}
        })); // Expected: 3
    }
}`,
    },
    expectedOutput: {
      javascript: "1\n3",
      python: "1\n3",
      java: "1\n3",
    },
  },

  "trapping-rain-water": {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Array • Two Pointers",
    description: {
      text: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      notes: [],
    },
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
      },
    ],
    constraints: ["n == height.length", "1 ≤ n ≤ 2 * 10⁴", "0 ≤ height[i] ≤ 10⁵"],
    starterCode: {
      javascript: `function trap(height) {
  // Write your solution here
  
}

// Test cases
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // Expected: 6
console.log(trap([4,2,0,3,2,5])); // Expected: 9`,
      python: `def trap(height):
    # Write your solution here
    pass

# Test cases
print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # Expected: 6
print(trap([4,2,0,3,2,5]))  # Expected: 9`,
      java: `class Solution {
    public static int trap(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})); // Expected: 6
        System.out.println(trap(new int[]{4,2,0,3,2,5})); // Expected: 9
    }
}`,
    },
    expectedOutput: {
      javascript: "6\n9",
      python: "6\n9",
      java: "6\n9",
    },
  },

  "merge-k-sorted-lists": {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List • Divide and Conquer",
    description: {
      text: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
      notes: [],
    },
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
      },
      {
        input: "lists = []",
        output: "[]",
      },
      {
        input: "lists = [[]]",
        output: "[]",
      },
    ],
    constraints: ["k == lists.length", "0 ≤ k ≤ 10⁴", "0 ≤ lists[i].length ≤ 500", "-10⁴ ≤ lists[i][j] ≤ 10⁴"],
    starterCode: {
      javascript: `function mergeKLists(lists) {
  // Write your solution here
  
}

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

function arrayToList(arr) {
  let dummy = new ListNode()
  let curr = dummy
  for (let v of arr) { curr.next = new ListNode(v); curr = curr.next }
  return dummy.next
}

function listToArray(head) {
  let res = []
  while (head) { res.push(head.val); head = head.next }
  return res
}

// Test cases
console.log(listToArray(mergeKLists([arrayToList([1,4,5]), arrayToList([1,3,4]), arrayToList([2,6])]))); // Expected: [1,1,2,3,4,4,5,6]
console.log(listToArray(mergeKLists([]))); // Expected: []
console.log(listToArray(mergeKLists([arrayToList([])]))); // Expected: []`,
      python: `def mergeKLists(lists):
    # Write your solution here
    pass

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arrayToList(arr):
    dummy = ListNode()
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def listToArray(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return res

# Test cases
print(listToArray(mergeKLists([arrayToList([1,4,5]), arrayToList([1,3,4]), arrayToList([2,6])])))  # Expected: [1,1,2,3,4,4,5,6]
print(listToArray(mergeKLists([])))  # Expected: []
print(listToArray(mergeKLists([arrayToList([])])))  # Expected: []`,
      java: `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public static ListNode mergeKLists(ListNode[] lists) {
        // Write your solution here
        
        return null;
    }
    
    private static ListNode arrayToList(int[] arr) {
        ListNode dummy = new ListNode();
        ListNode curr = dummy;
        for (int v : arr) {
            curr.next = new ListNode(v);
            curr = curr.next;
        }
        return dummy.next;
    }
    
    private static String listToString(ListNode head) {
        List<Integer> res = new ArrayList<>();
        while (head != null) {
            res.add(head.val);
            head = head.next;
        }
        return res.toString();
    }
    
    public static void main(String[] args) {
        System.out.println(listToString(mergeKLists(new ListNode[]{
            arrayToList(new int[]{1,4,5}),
            arrayToList(new int[]{1,3,4}),
            arrayToList(new int[]{2,6})
        }))); // Expected: [1, 1, 2, 3, 4, 4, 5, 6]
        
        System.out.println(listToString(mergeKLists(new ListNode[]{}))); // Expected: []
        System.out.println(listToString(mergeKLists(new ListNode[]{arrayToList(new int[]{})}))); // Expected: []
    }
}`,
    },
    expectedOutput: {
      javascript: "[1,1,2,3,4,4,5,6]\n[]\n[]",
      python: "[1, 1, 2, 3, 4, 4, 5, 6]\n[]\n[]",
      java: "[1, 1, 2, 3, 4, 4, 5, 6]\n[]\n[]",
    },
  },

  "median-of-two-sorted-arrays": {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array • Binary Search",
    description: {
      text: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      notes: ["The overall run time complexity should be O(log (m+n))."],
    },
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.0",
        explanation: "The median is 2.0.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.5",
        explanation: "The median is (2 + 3) / 2 = 2.5.",
      },
    ],
    constraints: ["0 ≤ m, n ≤ 1000", "1 ≤ m + n ≤ 2000", "-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶"],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here
  
}

// Test cases
console.log(findMedianSortedArrays([1,3], [2])); // Expected: 2.0
console.log(findMedianSortedArrays([1,2], [3,4])); // Expected: 2.5`,
      python: `def findMedianSortedArrays(nums1, nums2):
    # Write your solution here
    pass

# Test cases
print(findMedianSortedArrays([1,3], [2]))  # Expected: 2.0
print(findMedianSortedArrays([1,2], [3,4]))  # Expected: 2.5`,
      java: `class Solution {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your solution here
        
        return 0.0;
    }
    
    public static void main(String[] args) {
        System.out.println(findMedianSortedArrays(new int[]{1,3}, new int[]{2})); // Expected: 2.0
        System.out.println(findMedianSortedArrays(new int[]{1,2}, new int[]{3,4})); // Expected: 2.5
    }
}`,
    },
    expectedOutput: {
      javascript: "2\n2.5",
      python: "2.0\n2.5",
      java: "2.0\n2.5",
    },
  },
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
};