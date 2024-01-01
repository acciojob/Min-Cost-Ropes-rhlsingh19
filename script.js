function mincost(arr) {
  // Creating a min-heap
  class MinHeap {
    constructor() {
      this.heap = [];
    }

    insert(value) {
      this.heap.push(value);
      this.heapifyUp();
    }

    extractMin() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();

      const min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
      return min;
    }

    heapifyUp() {
      let currentIndex = this.heap.length - 1;
      while (
        currentIndex > 0 &&
        this.heap[currentIndex] < this.heap[Math.floor((currentIndex - 1) / 2)]
      ) {
        [this.heap[currentIndex], this.heap[Math.floor((currentIndex - 1) / 2)]] = [
          this.heap[Math.floor((currentIndex - 1) / 2)],
          this.heap[currentIndex],
        ];
        currentIndex = Math.floor((currentIndex - 1) / 2);
      }
    }

    heapifyDown() {
      let currentIndex = 0;
      let leftChildIndex, rightChildIndex, smallerChildIndex;
      const length = this.heap.length;

      while (true) {
        leftChildIndex = 2 * currentIndex + 1;
        rightChildIndex = 2 * currentIndex + 2;
        smallerChildIndex = null;

        if (leftChildIndex < length && this.heap[leftChildIndex] < this.heap[currentIndex]) {
          smallerChildIndex = leftChildIndex;
        }

        if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[currentIndex]) {
          if (
            smallerChildIndex === null ||
            this.heap[rightChildIndex] < this.heap[smallerChildIndex]
          ) {
            smallerChildIndex = rightChildIndex;
          }
        }

        if (smallerChildIndex === null) break;

        [this.heap[currentIndex], this.heap[smallerChildIndex]] = [
          this.heap[smallerChildIndex],
          this.heap[currentIndex],
        ];
        currentIndex = smallerChildIndex;
      }
    }

    size() {
      return this.heap.length;
    }
  }

  // Create a min-heap and insert all the ropes' lengths
  const heap = new MinHeap();
  for (let i = 0; i < arr.length; i++) {
    heap.insert(arr[i]);
  }

  let minCost = 0;

  // Merge ropes until only one rope is left in the heap
  while (heap.size() > 1) {
    const first = heap.extractMin();
    const second = heap.extractMin();
    const sum = first + second;
    minCost += sum;
    heap.insert(sum);
  }

  return minCost;
}

// Test cases
console.log(mincost([4, 3, 2, 6])); // Output: 29
console.log(mincost([1, 2, 3, 4, 5])); // Output: 33


module.exports=mincost;
