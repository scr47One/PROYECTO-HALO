export function quickSort(arr, value) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];

    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i][value] < pivot[value]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left, value), pivot, ...quickSort(right, value)];
}