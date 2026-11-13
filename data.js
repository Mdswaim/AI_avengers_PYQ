/**
 * PYQ Bank - The National Institute of Engineering, Mysuru (NIE - VTU)
 * Official Previous Year Examination Papers Dataset
 * Covers: 3rd Semester, 4th Semester, and 5th Semester
 * Examination Cycles: Jan/Feb 2025 and August/September 2025
 */

const SAMPLE_QUESTIONS = [
  // =========================================================================
  // 3RD SEMESTER: 21CS3C01 - DATA STRUCTURES (Jan / Feb 2025)
  // =========================================================================
  {
    id: "nie-3sem-ds-01",
    paperId: "paper-nie-3sem-ds-2025",
    subject: "Data Structures",
    subjectCode: "21CS3C01",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 1",
    qNo: "1.a",
    marks: 8,
    difficulty: "Medium",
    topic: "Pointers & Arrays",
    frequency: "Core Foundation",
    question: "Write a C program to find the maximum and minimum element in an array of integers using functions and pointers.",
    codeSnippet: `void findMaxMin(int *arr, int n, int *max, int *min) {
    *max = *min = arr[0];
    for (int i = 1; i < n; i++) {
        if (*(arr + i) > *max) *max = *(arr + i);
        if (*(arr + i) < *min) *min = *(arr + i);
    }
}`,
    hint: "Pass the addresses of the max and min variables from main() to the function so that updates via pointers reflect in the caller's scope.",
    solution: "1. Allocate array and input n elements.\\n2. Pass base address of array along with pointers &max and &min to findMaxMin().\\n3. Traverse using pointer arithmetic *(arr + i) comparing against current *max and *min.\\n4. Time Complexity: O(n), Space Complexity: O(1).",
    tags: ["Pointers", "Arrays", "Functions", "C Programming"]
  },
  {
    id: "nie-3sem-ds-02",
    paperId: "paper-nie-3sem-ds-2025",
    subject: "Data Structures",
    subjectCode: "21CS3C01",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 1",
    qNo: "1.b",
    marks: 12,
    difficulty: "Medium",
    topic: "Structures & Parameter Passing",
    frequency: "Exam Classic",
    question: "Illustrate with examples, how structures are passed to functions using pass by value and pass by reference.",
    codeSnippet: `struct Student { int id; float marks; };
// Pass by Value:
void displayVal(struct Student s) { printf("%d %.2f", s.id, s.marks); }
// Pass by Reference:
void updateRef(struct Student *s) { s->marks += 5.0; }`,
    hint: "Pass by value creates a full copy of the struct on the call stack. Pass by reference passes the 4/8-byte pointer address, enabling in-place modifications.",
    solution: "1. Pass by Value: Copies all struct fields into the function stack frame. Changes inside the function do NOT affect original caller struct.\\n2. Pass by Reference: Uses pointer (struct Student *s). Accessed via arrow operator (s->field). Reduces memory copying overhead and permits in-place modifications.",
    tags: ["Structures", "Pass By Value", "Pass By Reference", "Pointers"]
  },
  {
    id: "nie-3sem-ds-03",
    paperId: "paper-nie-3sem-ds-2025",
    subject: "Data Structures",
    subjectCode: "21CS3C01",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 2",
    qNo: "2.a",
    marks: 12,
    difficulty: "Medium",
    topic: "Singly Linked List",
    frequency: "🔥 Very High Frequency",
    question: "Write C functions to perform the following operations on a singly linked list:\\ni) Insert a new element at the end of the list.\\nii) Search for a given value in the list.",
    codeSnippet: `struct Node* insertEnd(struct Node* head, int data) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->data = data; temp->next = NULL;
    if (!head) return temp;
    struct Node* curr = head;
    while (curr->next) curr = curr->next;
    curr->next = temp;
    return head;
}`,
    hint: "For insert at end, handle the special case where head is NULL. For search, traverse node by node until curr is NULL or curr->data == key.",
    solution: "1. Insert End: Allocate memory, set data and next=NULL. Traverse from head to the last node (curr->next == NULL), link curr->next = newNode. Return head.\\n2. Search: Iterate curr from head; compare curr->data == key. Return node position or 1 if found, 0 if not found. Time Complexity: O(n).",
    tags: ["Linked List", "Dynamic Allocation", "Search", "Insertion"]
  },
  {
    id: "nie-3sem-ds-04",
    paperId: "paper-nie-3sem-ds-2025",
    subject: "Data Structures",
    subjectCode: "21CS3C01",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 3",
    qNo: "3.b",
    marks: 12,
    difficulty: "Hard",
    topic: "Stack & Infix to Postfix",
    frequency: "Exam Favorite (Guaranteed)",
    question: "Convert the following infix expression to postfix using a stack and show the contents of the stack and the output array at each step:\\n(A + B - (C * D) / (E + F))",
    codeSnippet: `Input: ( A + B - ( C * D ) / ( E + F ) )
// Operators precedence: ( < +,- < *,/`,
    hint: "Parentheses have highest precedence outside stack, but lowest once pushed on stack. Operators of equal or lower precedence must pop higher precedence operators.",
    solution: "Step-by-step conversion:\\n1. Push '(' to stack.\\n2. Scanned symbols: A -> output A\\n3. '+' -> pushed to stack\\n4. B -> output B\\n5. '-' -> pops '+' to output, '-' pushed\\n6. '(' -> pushed; C -> output; '*' -> pushed; D -> output; ')' -> pops '*' to output\\n7. '/' -> pushed (higher precedence than '-')\\n8. '(' pushed; E -> output; '+' pushed; F -> output; ')' pops '+'\\n9. Pop '/' and '-' to output\\nFinal Postfix Expression: A B + C D * E F + / -",
    tags: ["Stack", "Infix to Postfix", "Expression Evaluation"]
  },
  {
    id: "nie-3sem-ds-05",
    paperId: "paper-nie-3sem-ds-2025",
    subject: "Data Structures",
    subjectCode: "21CS3C01",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 4",
    qNo: "4.c",
    marks: 9,
    difficulty: "Medium",
    topic: "Binary Search Tree (BST) Deletion",
    frequency: "High Yield",
    question: "Consider the following BST: [Root: 65 -> Left: 39, Right: 56 with descendants 52, 78, 55, 80]. Demonstrate step-by-step how deletion of node 56 is handled with diagrams.",
    codeSnippet: null,
    hint: "When deleting a node with two children, replace it with its In-order Successor (minimum node in its right subtree) or In-order Predecessor.",
    solution: "1. Locate target node 56.\\n2. Since node 56 has two child subtrees, identify its in-order successor (the smallest value in the right subtree).\\n3. Replace 56's value with its successor and recursively delete the successor from the subtree.\\n4. Show intermediate and final balanced BST state.",
    tags: ["BST", "Trees", "Node Deletion", "Inorder Successor"]
  },
  {
    id: "nie-3sem-ds-06",
    paperId: "paper-nie-3sem-ds-2025",
    subject: "Data Structures",
    subjectCode: "21CS3C01",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 5",
    qNo: "5.a",
    marks: 9,
    difficulty: "Medium",
    topic: "Radix Sort Algorithm",
    frequency: "Numerical Standard",
    question: "Apply radix sort and sort the following integers in ascending order. Show the contents of the table/buckets in each pass:\\n125, 101, 945, 746, 453, 344, 999, 648",
    codeSnippet: null,
    hint: "Maximum number of digits is 3 (999). Perform 3 passes: Pass 1 on Units digit (LSD), Pass 2 on Tens digit, Pass 3 on Hundreds digit (MSD).",
    solution: "1. Pass 1 (Units digit): 101, 453, 344, 125, 945, 746, 648, 999.\\n2. Pass 2 (Tens digit): 101, 125, 344, 945, 453, 746, 648, 999.\\n3. Pass 3 (Hundreds digit): 101, 125, 344, 453, 648, 746, 945, 999.\\nSorted Result: 101, 125, 344, 453, 648, 746, 945, 999.",
    tags: ["Radix Sort", "Sorting", "Linear Time Sorting"]
  },

  // =========================================================================
  // 3RD SEMESTER: 21CS3C03 - COMPUTER ORGANIZATION & ARCHITECTURE (Jan/Feb 2025)
  // =========================================================================
  {
    id: "nie-3sem-coa-01",
    paperId: "paper-nie-3sem-coa-2025",
    subject: "Computer Organization and Architecture",
    subjectCode: "21CS3C03",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 1",
    qNo: "1.b",
    marks: 6,
    difficulty: "Easy",
    topic: "Endianness & Memory Alignment",
    frequency: "Core Foundation",
    question: "Discuss briefly Big Endian and Little Endian assignment. Give its general formats and illustrate how the 32-bit hex word 0x12345678 is stored starting at byte address 1000.",
    codeSnippet: null,
    hint: "Big Endian stores the Most Significant Byte (MSB) at the lowest memory address. Little Endian stores the Least Significant Byte (LSB) at the lowest memory address.",
    solution: "1. Big Endian (MSB first): Addr 1000: 12, Addr 1001: 34, Addr 1002: 56, Addr 1003: 78.\\n2. Little Endian (LSB first): Addr 1000: 78, Addr 1001: 56, Addr 1002: 34, Addr 1003: 12.\\n3. Used by ARM/x86 (Little Endian) and IBM/Network protocols (Big Endian).",
    tags: ["Big Endian", "Little Endian", "Memory Organization"]
  },
  {
    id: "nie-3sem-coa-02",
    paperId: "paper-nie-3sem-coa-2025",
    subject: "Computer Organization and Architecture",
    subjectCode: "21CS3C03",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 2",
    qNo: "2.b",
    marks: 10,
    difficulty: "Hard",
    topic: "Sequential Binary Multiplication",
    frequency: "Exam Numerical",
    question: "Explain with a neat circuit diagram for sequential circuit binary multiplier. Also perform multiplication of 12 x 12 (1100_2 x 1100_2) using the above algorithm.",
    codeSnippet: null,
    hint: "Multiplicand M = 1100, Multiplier Q = 1100. Initialize Accumulator A = 0000. At each cycle, if Q0=1 add M to A, then shift right [A, Q].",
    solution: "1. Circuit Components: Multiplicand register (M), Multiplier register (Q), Accumulator (A), n-bit Adder, and Control Sequencer.\\n2. Multiplication Steps: 4 cycles of Add and Shift.\\n3. Final register AQ holds 0000 1001 0000_2 = 144 in decimal.",
    tags: ["Binary Multiplier", "ALU", "Sequential Circuits", "Computer Arithmetic"]
  },

  // =========================================================================
  // 3RD SEMESTER: CS3C05 - UNIX AND SHELL PROGRAMMING (Jan/Feb 2025)
  // =========================================================================
  {
    id: "nie-3sem-unix-01",
    paperId: "paper-nie-3sem-unix-2025",
    subject: "UNIX and Shell Programming",
    subjectCode: "CS3C05",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 1",
    qNo: "1.b",
    marks: 8,
    difficulty: "Medium",
    topic: "File System & Links",
    frequency: "Standard Core Question",
    question: "Explain Hard link & Symbolic link with suitable examples. Highlight three critical differences in terms of inode numbers and directory spanning.",
    codeSnippet: `# Creating Hard link:
ln file1.txt hardlink.txt
# Creating Symbolic link:
ln -s file1.txt symlink.txt`,
    hint: "Hard links share the exact same inode number and cannot cross filesystem boundaries. Soft/symbolic links have distinct inodes containing the pathname of the target.",
    solution: "1. Hard Link: Direct pointer to the inode. Both filenames reference the same inode. Deleting original file preserves data until link count drops to 0. Cannot link directories or cross filesystems.\\n2. Symbolic Link: Special file containing text pathname to target. Has its own unique inode. Becomes a broken/dangling link if target is moved or deleted.",
    tags: ["UNIX", "Inodes", "Hard Links", "Symbolic Links"]
  },
  {
    id: "nie-3sem-unix-02",
    paperId: "paper-nie-3sem-unix-2025",
    subject: "UNIX and Shell Programming",
    subjectCode: "CS3C05",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 3",
    qNo: "3.c",
    marks: 10,
    difficulty: "Medium",
    topic: "Grep Filter & Regular Expressions",
    frequency: "Exam Classic",
    question: "Explain grep command with its options (-i, -v, -c, -n, -l). Write grep commands to match lines starting with vowels and lines ending with digits.",
    codeSnippet: `grep -i "^[aeiou]" filename.txt
grep "[0-9]$" filename.txt`,
    hint: "^ denotes anchor at start of line; $ denotes anchor at end of line. -i ignores case, -v inverts match, -c prints count.",
    solution: "1. Options: -i (ignore case), -v (invert match/non-matching lines), -c (count of matching lines), -n (show line numbers), -l (list file names only).\\n2. Lines starting with vowels: grep -E -i '^[aeiou]' file.txt.\\n3. Lines ending with digits: grep '[0-9]$' file.txt.",
    tags: ["UNIX", "Grep", "Regex", "Shell Scripting"]
  },

  // =========================================================================
  // 4TH SEMESTER: BCS401 - ANALYSIS & DESIGN OF ALGORITHMS (Aug/Sept 2025)
  // =========================================================================
  {
    id: "nie-4sem-ada-01",
    paperId: "paper-nie-4sem-ada-2025",
    subject: "Analysis and Design of Algorithms",
    subjectCode: "BCS401",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Examination (Aug/Sept 2025)",
    section: "Unit 1",
    qNo: "1.b",
    marks: 10,
    difficulty: "Medium",
    topic: "Divide and Conquer (Tower of Hanoi)",
    frequency: "🔥 Very High Frequency",
    question: "Write the pseudo code for the Tower of Hanoi problem and derive the recursive recurrence relation and efficiency analysis for the same.",
    codeSnippet: `void towerOfHanoi(int n, char src, char dest, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\\n", src, dest);
        return;
    }
    towerOfHanoi(n - 1, src, aux, dest);
    printf("Move disk %d from %c to %c\\n", n, src, dest);
    towerOfHanoi(n - 1, aux, dest, src);
}`,
    hint: "Recurrence relation is M(n) = 2*M(n-1) + 1 with base case M(1) = 1. Use repeated backward substitution.",
    solution: "1. Recurrence: M(n) = 2*M(n-1) + 1.\\n2. Backward substitution: M(n) = 2[2*M(n-2) + 1] + 1 = 4*M(n-2) + 2 + 1 = ... = 2^k * M(n-k) + (2^k - 1).\\n3. For k = n-1: M(n) = 2^(n-1)*1 + 2^(n-1) - 1 = 2^n - 1.\\n4. Time Complexity: Theta(2^n).",
    tags: ["Tower of Hanoi", "Recurrence", "Complexity", "Algorithms"]
  },
  {
    id: "nie-4sem-ada-02",
    paperId: "paper-nie-4sem-ada-2025",
    subject: "Analysis and Design of Algorithms",
    subjectCode: "BCS401",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Examination (Aug/Sept 2025)",
    section: "Unit 2",
    qNo: "2.b",
    marks: 10,
    difficulty: "Medium",
    topic: "Sorting & QuickSort Partition",
    frequency: "Exam Standard",
    question: "Write the pseudo code for the Quick Sort algorithm, and trace the algorithm for the following input: 54, 26, 93, 17, 77, 31, 44, 55, 20.",
    codeSnippet: `ALGORITHM QuickSort(A[l..r])
if l < r:
    s = Partition(A[l..r])
    QuickSort(A[l..s-1])
    QuickSort(A[s+1..r])`,
    hint: "Pick 54 as pivot. Scan i from left until A[i] >= pivot, and j from right until A[j] <= pivot. Swap A[i] and A[j] until i >= j, then swap pivot with A[j].",
    solution: "1. Initial Pivot = 54. Left pointer i moves until 93 (> 54), right pointer j moves until 20 (< 54). Swap 93 and 20.\\n2. Continue until pointers cross; swap pivot with partition point A[j].\\n3. Recursively sort left sub-array and right sub-array. Best/Average Case: O(n log n). Worst Case: O(n^2).",
    tags: ["QuickSort", "Sorting", "Divide and Conquer", "Partition"]
  },
  {
    id: "nie-4sem-ada-03",
    paperId: "paper-nie-4sem-ada-2025",
    subject: "Analysis and Design of Algorithms",
    subjectCode: "BCS401",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Examination (Aug/Sept 2025)",
    section: "Unit 3",
    qNo: "3.a",
    marks: 10,
    difficulty: "Hard",
    topic: "AVL Trees & Balanced BST",
    frequency: "🔥 Exam Classic",
    question: "Construct an AVL tree by inserting the following set of values one by one: 21, 26, 30, 9, 4, 14, 28, 18, 15, 10, 2. Specify each rotation (LL, RR, LR, RL) applied to restore balance.",
    codeSnippet: null,
    hint: "Inserting 30 after 21, 26 creates RR imbalance at 21 -> Left Rotate on 21. Inserting 4 after 9 creates LL imbalance -> Right Rotate.",
    solution: "1. Insert 21, 26, 30 -> RR rotation at 21, new root 26 with children 21 and 30.\\n2. Insert 9, 4 -> LL rotation at 21, 9 becomes parent of 4 and 21.\\n3. Insert 14 -> LR rotation.\\n4. Step-by-step balanced AVL tree maintains Balance Factor within {-1, 0, 1}.",
    tags: ["AVL Tree", "Rotations", "Self-Balancing BST"]
  },
  {
    id: "nie-4sem-ada-04",
    paperId: "paper-nie-4sem-ada-2025",
    subject: "Analysis and Design of Algorithms",
    subjectCode: "BCS401",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Examination (Aug/Sept 2025)",
    section: "Unit 4",
    qNo: "4.b",
    marks: 10,
    difficulty: "Hard",
    topic: "Dynamic Programming (0/1 Knapsack)",
    frequency: "⭐ High Yield Numerical",
    question: "Solve the following 0/1 Knapsack problem to find the maximum profit using dynamic programming technique. Capacity W = 6.\\nItem 1: Wt 2, Val $10\\nItem 2: Wt 3, Val $5\\nItem 3: Wt 1, Val $6\\nItem 4: Wt 4, Val $18\\nItem 5: Wt 1, Val $3.",
    codeSnippet: `// Recurrence:
// V[i, w] = max(V[i-1, w], v_i + V[i-1, w - w_i])`,
    hint: "Construct a 6x7 table (rows 0 to 5, columns 0 to 6). Fill row by row using the DP formula and trace back to identify chosen items.",
    solution: "1. DP Table Computation (Rows 0 to 5, Cols 0 to 6):\\nItem 1 (wt 2, v 10): at w=2..6 val is 10.\\nItem 3 (wt 1, v 6): combined with item 1 gives val 16 at w=3.\\nItem 4 (wt 4, v 18): combined with item 1 gives 28 at w=6!\\nItem 5 (wt 1, v 3): combined with item 4 & 1 gives optimal subset.\\n2. Max Profit: $28 (Items 1 and 4 give wt 2+4=6, profit 10+18=$28; or Items 3, 4, 1 give optimal combinations).",
    tags: ["Dynamic Programming", "0/1 Knapsack", "Optimization"]
  },
  {
    id: "nie-4sem-ada-05",
    paperId: "paper-nie-4sem-ada-2025",
    subject: "Analysis and Design of Algorithms",
    subjectCode: "BCS401",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Examination (Aug/Sept 2025)",
    section: "Unit 5",
    qNo: "5.a",
    marks: 10,
    difficulty: "Medium",
    topic: "Backtracking (Sum of Subsets)",
    frequency: "Exam Classic",
    question: "What do you mean by Backtracking? How is it different from Branch-and-Bound? Construct the state space tree for the Sum of Subset problem for the given data: Set = {1, 3, 4, 5} and d = 11.",
    codeSnippet: null,
    hint: "Backtracking traverses state space trees using Depth-First Search (DFS) for decision problems. Branch-and-Bound uses Breadth-First/Best-First Search with bounding functions for optimization problems.",
    solution: "1. Contrast: Backtracking uses DFS with bounding to prune dead-ends; Branch-and-Bound uses BFS/Priority Queue with cost lower/upper bounds.\\n2. Sum of Subsets: Set S = {1, 3, 4, 5}, target d = 11. Total sum = 1+3+4+5 = 13.\\n3. Subset generating d=11: {3, 4, 5} (sum = 12 != 11), {1, 5,...} -> Check combinations. Notice 1+3+4+5=13. Exclude 1, sum=12. Exclude 2? Since 13 - 11 = 2, and no element 2 exists, no exact subset sums to 11. State space tree shows all paths pruned.",
    tags: ["Backtracking", "Branch and Bound", "Sum of Subsets"]
  },

  // =========================================================================
  // 4TH SEMESTER: BCS403 - DATABASE MANAGEMENT SYSTEMS (Aug/Sept 2025)
  // =========================================================================
  {
    id: "nie-4sem-dbms-01",
    paperId: "paper-nie-4sem-dbms-2025",
    subject: "Database Management Systems",
    subjectCode: "BCS403",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Examination (Aug/Sept 2025)",
    section: "Module 1",
    qNo: "1.a & 1.b",
    marks: 10,
    difficulty: "Easy",
    topic: "3-Schema Architecture & Data Independence",
    frequency: "Core Foundation",
    question: "Explain the Three-Schema Architecture with a neat diagram. Distinguish clearly between Logical Data Independence and Physical Data Independence.",
    codeSnippet: null,
    hint: "Three levels: Internal (physical storage), Conceptual (entities, constraints, relationships), and External (user views). Independence means modifying one level without altering the level above.",
    solution: "1. 3 Levels: External View level -> Conceptual level -> Internal/Physical level.\\n2. Logical Data Independence: Ability to change conceptual schema (e.g. adding attributes) without altering existing external schemas or application programs.\\n3. Physical Data Independence: Ability to change physical schema (e.g. indexing, disk reorganization) without modifying conceptual schema.",
    tags: ["DBMS", "3-Schema Architecture", "Data Independence"]
  },
  {
    id: "nie-4sem-dbms-02",
    paperId: "paper-nie-4sem-dbms-2025",
    subject: "Database Management Systems",
    subjectCode: "BCS403",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Examination (Aug/Sept 2025)",
    section: "Module 4",
    qNo: "4.b",
    marks: 10,
    difficulty: "Medium",
    topic: "Concurrency Control Anomalies",
    frequency: "🔥 Very High Frequency",
    question: "Discuss the different types of problems/anomalies that encounter if two database transactions run concurrently without isolation (Dirty Read, Lost Update, Unrepeatable Read, Phantom Read).",
    codeSnippet: `// Lost Update Example:
// T1 reads X (100), T2 reads X (100)
// T1 writes X = 150, T2 writes X = 80 (T1 update lost!)`,
    hint: "Dirty read happens when T2 reads uncommitted modifications made by T1. Lost update occurs when concurrent writes overwrite each other without reading intermediate changes.",
    solution: "1. Lost Update: Two transactions update same data concurrently, one overwrite completely erases the other.\\n2. Dirty Read (Temporary Update): T1 updates record, T2 reads it, T1 aborts/rolls back, leaving T2 with invalid phantom data.\\n3. Unrepeatable Read: T1 reads value, T2 modifies and commits value, T1 reads again and gets different value.\\n4. Phantom Read: T1 executes range query, T2 inserts new row satisfying query, T1 repeats query and sees extra row.",
    tags: ["Transactions", "ACID", "Concurrency Problems", "Dirty Read"]
  },

  // =========================================================================
  // 4TH SEMESTER: BIS402 - ADVANCED JAVA (Aug/Sept 2025)
  // =========================================================================
  {
    id: "nie-4sem-java-01",
    paperId: "paper-nie-4sem-java-2025",
    subject: "Advanced Java",
    subjectCode: "BIS402",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Examination (Aug/Sept 2025)",
    section: "Module 1",
    qNo: "1.a",
    marks: 10,
    difficulty: "Medium",
    topic: "StringBuffer Capacity & Memory",
    frequency: "Exam Standard",
    question: "What will be the output of this program? Explain the actual capacity of the StringBuffer object and how the minimum capacity is ensured:\\n\\npublic class EnsureCapacityCheck {\\n  public static void main(String[] args) {\\n    StringBuffer sb = new StringBuffer(10);\\n    sb.ensureCapacity(20);\\n    System.out.println(sb.capacity());\\n  }\\n}",
    codeSnippet: `StringBuffer sb = new StringBuffer(10);
sb.ensureCapacity(20);
System.out.println(sb.capacity()); // What is printed?`,
    hint: "When requested capacity > current capacity, StringBuffer expands via formula: newCapacity = (currentCapacity * 2) + 2.",
    solution: "1. Initial capacity set to 10.\\n2. ensureCapacity(20) requests at least 20 chars. Since 20 > 10, Java calculates expanded capacity = (10 * 2) + 2 = 22.\\n3. Output printed is: 22.\\n4. If requested capacity had been greater than 22, it would take the requested size directly.",
    tags: ["Java", "StringBuffer", "Capacity", "JVM Memory"]
  },
  {
    id: "nie-4sem-java-02",
    paperId: "paper-nie-4sem-java-2025",
    subject: "Advanced Java",
    subjectCode: "BIS402",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Examination (Aug/Sept 2025)",
    section: "Module 2",
    qNo: "2.a",
    marks: 10,
    difficulty: "Medium",
    topic: "Java Collections (List vs Set)",
    frequency: "Core Foundation",
    question: "For the following code, explain the output and highlight the key differences between the two collections (List vs Set):\\n\\nList<String> list = new ArrayList<>();\\nCollections.addAll(list, \"Bengaluru\", \"Mysuru\", \"Bengaluru\", \"Hubballi\");\\nSystem.out.println(\"List: \" + list);\\n\\nSet<String> set = new HashSet<>();\\nCollections.addAll(set, \"Bengaluru\", \"Mysuru\", \"Bengaluru\", \"Hubballi\");\\nSystem.out.println(\"Set: \" + set);",
    codeSnippet: null,
    hint: "ArrayList preserves insertion order and permits duplicates. HashSet prohibits duplicates and does not guarantee insertion order.",
    solution: "1. List Output: [Bengaluru, Mysuru, Bengaluru, Hubballi] (contains 4 elements with duplicate Bengaluru).\\n2. Set Output: [Bengaluru, Mysuru, Hubballi] (or unordered permutation of 3 unique elements; duplicate discarded via hashCode()/equals()).\\n3. Key differences: Duplicates allowed (List: Yes, Set: No); Indexing/order (List: Ordered by index, Set: Unordered hash buckets).",
    tags: ["Collections", "ArrayList", "HashSet", "Java"]
  },

  // =========================================================================
  // 5TH SEMESTER: 21CS5C01 - OPERATING SYSTEMS (Jan / Feb 2025)
  // =========================================================================
  {
    id: "nie-5sem-os-01",
    paperId: "paper-nie-5sem-os-2025",
    subject: "Operating Systems",
    subjectCode: "21CS5C01",
    semester: 5,
    year: 2025,
    examType: "Fifth Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 2",
    qNo: "2.b",
    marks: 10,
    difficulty: "Hard",
    topic: "Synchronization & Dining Philosophers",
    frequency: "🔥 Exam Classic (Guaranteed)",
    question: "Explain the Dining Philosophers Problem in detail and propose a deadlock-free and starvation-free solution using semaphores with suitable pseudocode.",
    codeSnippet: `// Semaphore solution:
semaphore chopstick[5] = {1, 1, 1, 1, 1};
semaphore room = 4; // At most 4 philosophers seated

void philosopher(int i) {
    while (1) {
        think();
        wait(room);
        wait(chopstick[i]);
        wait(chopstick[(i + 1) % 5]);
        eat();
        signal(chopstick[i]);
        signal(chopstick[(i + 1) % 5]);
        signal(room);
    }
}`,
    hint: "Deadlock occurs when all 5 philosophers pick their left fork simultaneously. Using a room semaphore initialized to 4 limits diners, preventing circular wait.",
    solution: "1. Formulation: 5 philosophers alternate thinking and eating; sharing 5 chopsticks placed between adjacent seats. Eating requires acquiring both left and right chopstick.\\n2. Deadlock Condition: Circular wait if all acquire left fork simultaneously.\\n3. Remedies: Limit table occupancy to 4 using counting semaphore 'room'; or odd-even asymmetric pickup rule.\\n4. Pseudocode guarantees mutual exclusion and eliminates deadlock.",
    tags: ["Operating Systems", "Semaphores", "Dining Philosophers", "Deadlock"]
  },
  {
    id: "nie-5sem-os-02",
    paperId: "paper-nie-5sem-os-2025",
    subject: "Operating Systems",
    subjectCode: "21CS5C01",
    semester: 5,
    year: 2025,
    examType: "Fifth Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 3",
    qNo: "3.a",
    marks: 10,
    difficulty: "Medium",
    topic: "Contiguous Memory Allocation",
    frequency: "Standard Exam Numerical",
    question: "Given memory partition blocks: 200 KB, 400 KB, 600 KB, 500 KB, 300 KB, 250 KB in order. Use First Fit, Best Fit, and Worst Fit algorithms to place processes of size 357 KB, 210 KB, 468 KB, 491 KB. Determine internal and external fragmentation for each.",
    codeSnippet: null,
    hint: "First Fit places in first sufficiently large block. Best Fit places in smallest block >= process size. Worst Fit places in largest available block.",
    solution: "1. First Fit: 357K -> 400K; 210K -> 600K; 468K -> 500K; 491K cannot be placed (wait/external fragmentation).\\n2. Best Fit: 357K -> 400K; 210K -> 250K; 468K -> 500K; 491K -> 600K! All 4 processes placed successfully!\\n3. Worst Fit: 357K -> 600K; 210K -> 500K; 468K cannot be placed.\\n4. Conclusion: Best Fit makes the most efficient use of memory for this workload.",
    tags: ["Memory Management", "First Fit", "Best Fit", "Worst Fit", "Fragmentation"]
  },
  {
    id: "nie-5sem-os-03",
    paperId: "paper-nie-5sem-os-2025",
    subject: "Operating Systems",
    subjectCode: "21CS5C01",
    semester: 5,
    year: 2025,
    examType: "Fifth Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 4",
    qNo: "4.a",
    marks: 12,
    difficulty: "Hard",
    topic: "Optimal Page Replacement",
    frequency: "⭐ High Yield Numerical",
    question: "Discuss the working of Optimal page replacement algorithm and trace the page fault behavior for reference string: 5, 0, 1, 0, 2, 3, 0, 2, 4, 3, 3, 2, 0, 2, 1, 2, 7, 0, 1, 1, 0 with 4 physical frames. Calculate number of page faults, hit ratio, and miss ratio.",
    codeSnippet: null,
    hint: "Optimal replacement replaces the page that will not be referenced for the longest period of time in the future.",
    solution: "1. Allocate 4 frames initialized empty.\\n2. Trace reference string step-by-step; when full, scan forward in reference string to identify page needed furthest in the future.\\n3. Total references = 21. Total page faults = 7. Hits = 14.\\n4. Hit Ratio = 14 / 21 = 66.67%. Miss Ratio = 7 / 21 = 33.33%.",
    tags: ["Virtual Memory", "Optimal Page Replacement", "Page Faults", "Hit Ratio"]
  },

  // =========================================================================
  // 5TH SEMESTER: 21CS5O13 - PYTHON PROGRAMMING (Jan / Feb 2025)
  // =========================================================================
  {
    id: "nie-5sem-py-01",
    paperId: "paper-nie-5sem-py-2025",
    subject: "Python Programming",
    subjectCode: "21CS5O13",
    semester: 5,
    year: 2025,
    examType: "Fifth Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 2",
    qNo: "2.a",
    marks: 8,
    difficulty: "Easy",
    topic: "List Slicing & Strides",
    frequency: "Exam Classic",
    question: "Write the exact output of the following Python code snippets:\\nlist = [\"apple\", \"banana\", \"cherry\", \"date\", \"elderberry\"]\\nprint(list[:])\\nprint(list[::-1])\\nprint(list[::2])\\nprint(list[::-2])\\nprint(list[1:4:2])\\nprint(list[-4:-1])\\nprint(list * 2)",
    codeSnippet: `list = ["apple", "banana", "cherry", "date", "elderberry"]
print(list[:])       # 1
print(list[::-1])    # 2
print(list[::2])     # 3
print(list[::-2])    # 4
print(list[1:4:2])   # 5
print(list[-4:-1])   # 6
print(list * 2)      # 7`,
    hint: "Slicing syntax is list[start:stop:step]. Step -1 reverses the list. Step 2 skips every second element.",
    solution: "1. ['apple', 'banana', 'cherry', 'date', 'elderberry']\\n2. ['elderberry', 'date', 'cherry', 'banana', 'apple'] (Reversed)\\n3. ['apple', 'cherry', 'elderberry']\\n4. ['elderberry', 'cherry', 'apple']\\n5. ['banana', 'date']\\n6. ['banana', 'cherry', 'date']\\n7. ['apple', 'banana', 'cherry', 'date', 'elderberry', 'apple', 'banana', 'cherry', 'date', 'elderberry']",
    tags: ["Python", "Slicing", "Lists", "String Manipulation"]
  },
  {
    id: "nie-5sem-py-02",
    paperId: "paper-nie-5sem-py-2025",
    subject: "Python Programming",
    subjectCode: "21CS5O13",
    semester: 5,
    year: 2025,
    examType: "Fifth Semester B.E. Examination (Jan/Feb 2025)",
    section: "Module 2",
    qNo: "2.e",
    marks: 8,
    difficulty: "Medium",
    topic: "Dictionary Frequency Counter",
    frequency: "Core Foundation",
    question: "Write a Python program to count how many times each character appears in a given string using a dictionary. Also handle case-insensitivity.",
    codeSnippet: `def char_frequency(text):
    freq = {}
    for char in text.lower():
        if char.isalnum():
            freq[char] = freq.get(char, 0) + 1
    return freq`,
    hint: "Use dict.get(char, 0) + 1 or collections.defaultdict(int) to accumulate frequency for each character.",
    solution: "1. Traverse each character in string.lower().\\n2. If character already in dictionary, increment count; otherwise initialize to 1 using freq[char] = freq.get(char, 0) + 1.\\n3. Print key-value pairs formatted nicely.\\n4. Time Complexity: O(n), Auxiliary Space: O(k) where k is alphabet size.",
    tags: ["Python", "Dictionary", "Frequency Counter", "Algorithms"]
  },

  // =========================================================================
  // 6TH SEMESTER: 21CS6C01 - COMPUTER NETWORKS (End-Sem 2025)
  // =========================================================================
  {
    id: "nie-6sem-cn-01",
    paperId: "paper-nie-6sem-cn-2025",
    subject: "Computer Networks",
    subjectCode: "21CS6C01",
    semester: 6,
    year: 2025,
    examType: "Sixth Semester B.E. Degree Examination",
    section: "Module 3",
    qNo: "3.a",
    marks: 10,
    difficulty: "Medium",
    topic: "TCP Congestion Control",
    frequency: "🔥 Very High Frequency",
    question: "Explain TCP Reno congestion control mechanism involving Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery. Draw the congestion window (cwnd) trajectory graph when a 3-duplicate ACK event occurs versus a Timeout event.",
    codeSnippet: `// On 3-duplicate ACKs:
ssthresh = cwnd / 2;
cwnd = ssthresh + 3; // Fast Recovery
// On Timeout:
ssthresh = cwnd / 2;
cwnd = 1; // Slow Start`,
    hint: "3-duplicate ACKs indicate mild congestion where segments are still reaching the receiver. Timeout indicates severe congestion.",
    solution: "1. Slow Start: cwnd starts at 1 MSS and doubles every RTT until cwnd >= ssthresh.\\n2. Congestion Avoidance: cwnd grows linearly (+1 MSS per RTT).\\n3. Fast Retransmit & Recovery: On receiving 3 dup ACKs, retransmits missing segment without waiting for retransmission timer, sets ssthresh = cwnd / 2, and recovers cwnd linearly.\\n4. Timeout: Resets cwnd = 1 MSS and re-enters Slow Start.",
    tags: ["Computer Networks", "TCP", "Congestion Control", "Slow Start"]
  },
  {
    id: "nie-6sem-cn-02",
    paperId: "paper-nie-6sem-cn-2025",
    subject: "Computer Networks",
    subjectCode: "21CS6C01",
    semester: 6,
    year: 2025,
    examType: "Sixth Semester B.E. Degree Examination",
    section: "Module 2",
    qNo: "2.b",
    marks: 10,
    difficulty: "Easy",
    topic: "IPv4 Subnetting & CIDR",
    frequency: "Standard Exam Numerical",
    question: "An ISP assigns the CIDR block 192.168.16.0/20. An organization requires 4 equal subnets. Determine:\\na) The new subnet mask.\\nb) The number of usable host IP addresses per subnet.\\nc) The first and last usable host IP in the first subnet.",
    codeSnippet: null,
    hint: "To divide into 4 equal subnets, borrow 2 bits (2^2 = 4) from host bits. Prefix changes from /20 to /22.",
    solution: "1. New Prefix: /20 + 2 = /22. Subnet Mask = 255.255.252.0.\\n2. Host bits remaining = 32 - 22 = 10 bits. Usable hosts per subnet = 2^10 - 2 = 1022 hosts.\\n3. First subnet range: Network ID = 192.168.16.0/22. First usable host = 192.168.16.1. Last usable host = 192.168.19.254. Broadcast address = 192.168.19.255.",
    tags: ["Networking", "Subnetting", "CIDR", "IP Addressing"]
  },

  // =========================================================================
  // 7TH SEMESTER: 21CS7C01 - CLOUD COMPUTING & BIG DATA (End-Sem 2025)
  // =========================================================================
  {
    id: "nie-7sem-cloud-01",
    paperId: "paper-nie-7sem-cloud-2025",
    subject: "Cloud Computing and Big Data",
    subjectCode: "21CS7C01",
    semester: 7,
    year: 2025,
    examType: "Seventh Semester B.E. Degree Examination",
    section: "Module 2",
    qNo: "2.a",
    marks: 10,
    difficulty: "Medium",
    topic: "MapReduce & Distributed Computing",
    frequency: "Exam Classic",
    question: "Explain the architecture of MapReduce and Hadoop Distributed File System (HDFS). Trace the WordCount problem with mapper, shuffle/sort, and reducer stages.",
    codeSnippet: `// Map stage: (docID, text) -> list(word, 1)
// Shuffle & Sort: groups by key -> (word, list(1, 1, ...))
// Reduce stage: (word, list(counts)) -> (word, sum(counts))`,
    hint: "Map phase processes data locally in parallel; Shuffle sorts intermediate keys; Reducer aggregates values by key.",
    solution: "1. HDFS Architecture: NameNode (master managing metadata) and DataNodes (slaves storing 128MB data blocks with 3x replication).\\n2. MapReduce Workflow: Input Splitting -> Map Function emits (key, value) pairs -> Shuffle & Sort phase partitions keys -> Reduce Function produces final output.\\n3. WordCount trace: Emits ('word', 1), shuffles into grouped lists ('word', [1,1,1]), and reducer outputs ('word', 3).",
    tags: ["Cloud Computing", "Big Data", "MapReduce", "Hadoop", "HDFS"]
  },
  {
    id: "nie-7sem-cloud-02",
    paperId: "paper-nie-7sem-cloud-2025",
    subject: "Cloud Computing and Big Data",
    subjectCode: "21CS7C01",
    semester: 7,
    year: 2025,
    examType: "Seventh Semester B.E. Degree Examination",
    section: "Module 3",
    qNo: "3.c",
    marks: 10,
    difficulty: "Hard",
    topic: "CAP Theorem & Distributed Databases",
    frequency: "Core Foundation",
    question: "State Eric Brewer's CAP Theorem. Differentiate between CP (Consistency + Partition Tolerance), AP (Availability + Partition Tolerance), and CA systems with real-world database examples.",
    codeSnippet: null,
    hint: "In a network partition, you must choose either Consistency (return error if replica cannot be updated) or Availability (return stale data).",
    solution: "1. CAP Theorem: A distributed system cannot simultaneously provide more than two of Consistency, Availability, and Partition Tolerance.\\n2. CP Systems (e.g., MongoDB, HBase, Redis): Guarantees latest data across all nodes; denies requests if network partition occurs.\\n3. AP Systems (e.g., Apache Cassandra, DynamoDB, CouchDB): Highly available; accepts writes during partition and relies on Eventual Consistency.\\n4. CA Systems: Traditional RDBMS in single-datacenter without network partitions.",
    tags: ["CAP Theorem", "Distributed Systems", "NoSQL", "Cloud Databases"]
  },

  // =========================================================================
  // 8TH SEMESTER: 21CS8C01 - CYBER SECURITY & CRYPTOGRAPHY (End-Sem 2025)
  // =========================================================================
  {
    id: "nie-8sem-sec-01",
    paperId: "paper-nie-8sem-sec-2025",
    subject: "Cyber Security and Cryptography",
    subjectCode: "21CS8C01",
    semester: 8,
    year: 2025,
    examType: "Eighth Semester B.E. Degree Examination",
    section: "Module 2",
    qNo: "2.a",
    marks: 10,
    difficulty: "Hard",
    topic: "RSA Asymmetric Cryptosystem",
    frequency: "🔥 Very High Frequency",
    question: "Demonstrate the RSA public-key cryptographic algorithm. Given prime numbers p = 11, q = 13, and public encryption key e = 7, compute the private key d and encrypt message M = 9.",
    codeSnippet: `n = p * q
phi(n) = (p - 1) * (q - 1)
// Compute d such that (d * e) % phi(n) == 1
// Ciphertext: C = (M^e) mod n`,
    hint: "n = 11 * 13 = 143. phi(n) = 10 * 12 = 120. Find d using extended Euclidean algorithm such that (7 * d) mod 120 = 1.",
    solution: "1. Modulus: n = 11 * 13 = 143.\\n2. Euler Totient: phi(n) = (11 - 1) * (13 - 1) = 10 * 12 = 120.\\n3. Private Key d: (7 * d) mod 120 = 1. Since 7 * 103 = 721 = 6 * 120 + 1, d = 103.\\n4. Encryption: C = M^e mod n = 9^7 mod 143 = 4,782,969 mod 143 = 48.\\n5. Decryption verification: 48^103 mod 143 = 9 (Original message recovered).",
    tags: ["Cryptography", "RSA", "Public Key", "Security"]
  },
  {
    id: "nie-8sem-sec-02",
    paperId: "paper-nie-8sem-sec-2025",
    subject: "Cyber Security and Cryptography",
    subjectCode: "21CS8C01",
    semester: 8,
    year: 2025,
    examType: "Eighth Semester B.E. Degree Examination",
    section: "Module 4",
    qNo: "4.b",
    marks: 10,
    difficulty: "Medium",
    topic: "Firewalls & Network Defense",
    frequency: "Exam Standard",
    question: "Differentiate between Packet Filtering Firewalls, Stateful Inspection Firewalls, and Application Gateway (Proxy) Firewalls with respect to OSI layer inspection, latency, and security strength.",
    codeSnippet: null,
    hint: "Packet filters inspect headers at layer 3/4. Stateful inspection tracks TCP connection state. Application gateways terminate connections and inspect payloads at layer 7.",
    solution: "1. Packet Filtering (Layers 3 & 4): Inspects source/dest IP and port numbers. Ultra-fast with lowest latency, but vulnerable to IP spoofing and cannot inspect payload.\\n2. Stateful Inspection (Layers 3 & 4): Maintains state connection tables (e.g. TCP SYN/ACK handshake). Prevents unauthorized incoming packets unless responding to legitimate outbound session.\\n3. Application Gateway (Layer 7): Intercepts traffic at application level (HTTP, FTP, SMTP). Decrypts and examines payload for malware/SQL injection. High security but highest latency.",
    tags: ["Cyber Security", "Firewalls", "Network Security", "Defense in Depth"]
  }
];

// =========================================================================
// OFFICIAL EXAM PAPERS COMPILATION (NIE Mysuru - VTU)
// =========================================================================
const SAMPLE_PAPERS = [
  {
    id: "paper-nie-3sem-ds-2025",
    title: "21CS3C01: Data Structures - Jan/Feb 2025",
    subject: "Data Structures",
    subjectCode: "21CS3C01",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-3sem-ds-01", "nie-3sem-ds-02", "nie-3sem-ds-03", "nie-3sem-ds-04", "nie-3sem-ds-05", "nie-3sem-ds-06"]
  },
  {
    id: "paper-nie-3sem-coa-2025",
    title: "21CS3C03: Computer Organization & Architecture - Jan/Feb 2025",
    subject: "Computer Organization and Architecture",
    subjectCode: "21CS3C03",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-3sem-coa-01", "nie-3sem-coa-02"]
  },
  {
    id: "paper-nie-3sem-unix-2025",
    title: "CS3C05: UNIX and Shell Programming - Jan/Feb 2025",
    subject: "UNIX and Shell Programming",
    subjectCode: "CS3C05",
    semester: 3,
    year: 2025,
    examType: "Third Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-3sem-unix-01", "nie-3sem-unix-02"]
  },
  {
    id: "paper-nie-4sem-ada-2025",
    title: "BCS401: Analysis and Design of Algorithms - Aug/Sept 2025",
    subject: "Analysis and Design of Algorithms",
    subjectCode: "BCS401",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-4sem-ada-01", "nie-4sem-ada-02", "nie-4sem-ada-03", "nie-4sem-ada-04", "nie-4sem-ada-05"]
  },
  {
    id: "paper-nie-4sem-dbms-2025",
    title: "BCS403: Database Management Systems - Aug/Sept 2025",
    subject: "Database Management Systems",
    subjectCode: "BCS403",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-4sem-dbms-01", "nie-4sem-dbms-02"]
  },
  {
    id: "paper-nie-4sem-java-2025",
    title: "BIS402: Advanced Java - Aug/Sept 2025",
    subject: "Advanced Java",
    subjectCode: "BIS402",
    semester: 4,
    year: 2025,
    examType: "Fourth Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-4sem-java-01", "nie-4sem-java-02"]
  },
  {
    id: "paper-nie-5sem-os-2025",
    title: "21CS5C01: Operating Systems - Jan/Feb 2025",
    subject: "Operating Systems",
    subjectCode: "21CS5C01",
    semester: 5,
    year: 2025,
    examType: "Fifth Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-5sem-os-01", "nie-5sem-os-02", "nie-5sem-os-03"]
  },
  {
    id: "paper-nie-5sem-py-2025",
    title: "21CS5O13: Python Programming - Jan/Feb 2025",
    subject: "Python Programming",
    subjectCode: "21CS5O13",
    semester: 5,
    year: 2025,
    examType: "Fifth Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-5sem-py-01", "nie-5sem-py-02"]
  },
  {
    id: "paper-nie-6sem-cn-2025",
    title: "21CS6C01: Computer Networks - End-Sem 2025",
    subject: "Computer Networks",
    subjectCode: "21CS6C01",
    semester: 6,
    year: 2025,
    examType: "Sixth Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-6sem-cn-01", "nie-6sem-cn-02"]
  },
  {
    id: "paper-nie-7sem-cloud-2025",
    title: "21CS7C01: Cloud Computing & Big Data - End-Sem 2025",
    subject: "Cloud Computing and Big Data",
    subjectCode: "21CS7C01",
    semester: 7,
    year: 2025,
    examType: "Seventh Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-7sem-cloud-01", "nie-7sem-cloud-02"]
  },
  {
    id: "paper-nie-8sem-sec-2025",
    title: "21CS8C01: Cyber Security & Cryptography - End-Sem 2025",
    subject: "Cyber Security and Cryptography",
    subjectCode: "21CS8C01",
    semester: 8,
    year: 2025,
    examType: "Eighth Semester B.E. Degree Examination",
    duration: "3 Hours",
    totalMarks: 100,
    instructions: "The National Institute of Engineering, Mysuru. Answer all questions.",
    questionIds: ["nie-8sem-sec-01", "nie-8sem-sec-02"]
  }
];

// Subject Colors & Metadata for Dashboard
const SUBJECT_METADATA = {
  "Data Structures": {
    code: "21CS3C01",
    semester: 3,
    color: "#2563eb"
  },
  "Computer Organization and Architecture": {
    code: "21CS3C03",
    semester: 3,
    color: "#0891b2"
  },
  "UNIX and Shell Programming": {
    code: "CS3C05",
    semester: 3,
    color: "#7c3aed"
  },
  "Analysis and Design of Algorithms": {
    code: "BCS401",
    semester: 4,
    color: "#2563eb"
  },
  "Database Management Systems": {
    code: "BCS403",
    semester: 4,
    color: "#059669"
  },
  "Advanced Java": {
    code: "BIS402",
    semester: 4,
    color: "#ea580c"
  },
  "Operating Systems": {
    code: "21CS5C01",
    semester: 5,
    color: "#16a34a"
  },
  "Python Programming": {
    code: "21CS5O13",
    semester: 5,
    color: "#3b82f6"
  },
  "Computer Networks": {
    code: "21CS6C01",
    semester: 6,
    color: "#0284c7"
  },
  "Cloud Computing and Big Data": {
    code: "21CS7C01",
    semester: 7,
    color: "#8b5cf6"
  },
  "Cyber Security and Cryptography": {
    code: "21CS8C01",
    semester: 8,
    color: "#dc2626"
  }
};
