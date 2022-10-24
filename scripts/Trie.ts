type TrieNode = {
  [letter: string]: TrieNode;
};

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = {};
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

  findAllWords(prefix: string) {
    let currentNode = this.root;

    for (let char of prefix) {
      if (currentNode[char]) {
        currentNode = currentNode[char];
      }
    }
    const words: string[] = [];
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
