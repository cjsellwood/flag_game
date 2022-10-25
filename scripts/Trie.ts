type TrieNode = {
  [letter: string]: TrieNode;
};

export class Trie {
  private root: TrieNode;

  constructor(root: TrieNode = {}) {
    this.root = root;
  }

  public get getRoot(): TrieNode {
    return this.root;
  }

  insert(word: string) {
    let currentNode = this.root;

    for (const char of word) {
      if (currentNode[char]) {
        currentNode = currentNode[char];
      } else {
        currentNode[char] = {} as TrieNode;
        currentNode = currentNode[char];
      }
    }
    currentNode["*"] = {};
  }

  findAllWords(prefix: string): string[] {
    let currentNode = this.root;
    const words: string[] = [];

    for (let char of prefix) {
      // return [JSON.stringify(currentNode["b"]["u"])];
      if (currentNode[char]) {
        currentNode = currentNode[char];
      } else {
        return words;
      }
    }
    this.wordsFromNode(currentNode, words, prefix);
    return words;
  }

  private wordsFromNode(node: TrieNode, words: string[], prefix: string) {
    for (let key in node) {
      if (key === "*") {
        words.push(prefix);
      } else {
        this.wordsFromNode(node[key], words, prefix + key);
      }
    }
  }
}
