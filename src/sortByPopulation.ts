import { Country } from "../scripts/data";

function sortByPopulation(arr: Country[], property: string): void {}

export function partition(arr: Country[], left: number, right: number): number {
  const pivot = right;
  right--;

  while (true) {
    while (arr[left].population < arr[pivot].population) {
      left++;
    }

    while (arr[right].population > arr[pivot].population) {
      right--;
    }

    if (left > right) {
      break;
    } else {
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
    }
  }
  const temp = arr[left];
  arr[left] = arr[pivot];
  arr[pivot] = temp;
  return left;
}

export default sortByPopulation;
