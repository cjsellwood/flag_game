import { Trie } from "./Trie";

describe("Testing Trie", () => {
  test("Adds word", () => {
    const result = new Trie();
    result.insert("cat");
    expect(result.getRoot).toEqual({ c: { a: { t: { "*": {} } } } });
  });

  test("Add two separate words", () => {
    const result = new Trie();
    result.insert("cat");
    result.insert("dog");
    expect(result.getRoot).toEqual({
      c: { a: { t: { "*": {} } } },
      d: { o: { g: { "*": {} } } },
    });
  });

  test("Add two words that are partials", () => {
    const result = new Trie();
    result.insert("cattle");
    result.insert("cat");
    expect(result.getRoot).toEqual({
      c: { a: { t: { "*": {}, t: { l: { e: { "*": {} } } } } } },
    });
  });

  test("Find all words with a prefix", () => {
    const result = new Trie();
    result.insert("cat");
    result.insert("cattle");
    result.insert("dog");
    result.insert("category");
    result.insert("ball");
    result.insert("chicken");
    expect(result.findAllWords("cat")).toEqual(
      expect.arrayContaining(["cat", "cattle", "category"])
    );
    expect(result.findAllWords("ca")).toEqual(
      expect.arrayContaining(["cat", "cattle", "category"])
    );
    expect(result.findAllWords("c")).toEqual(
      expect.arrayContaining(["cat", "cattle", "category", "chicken"])
    );
    expect(result.findAllWords("")).toEqual(
      expect.arrayContaining(["cat", "cattle", "category", "chicken", "dog", "ball"])
    );
  });
});
