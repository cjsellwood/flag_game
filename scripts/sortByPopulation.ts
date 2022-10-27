import { Country } from "../scripts/data";

function sortByPopulation(arr: Country[], left: number, right: number): void {
  if (left >= right) {
    return;
  }
  const pivot = partition(arr, left, right);

  sortByPopulation(arr, left, pivot - 1);
  sortByPopulation(arr, pivot + 1, right);
}

export function partition(arr: Country[], left: number, right: number): number {
  const pivot = right;
  right--;

  while (true) {
    while (arr[left].population > arr[pivot].population) {
      left++;
    }

    while (arr[right].population < arr[pivot].population && right > 0) {
      right--;
    }
    if (left >= right) {
      break;
    } else {
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
    }
  }
  const temp = arr[left];
  arr[left] = arr[pivot];
  arr[pivot] = temp;
  return left;
}

export default sortByPopulation;
