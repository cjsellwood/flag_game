import { Trie } from "./Trie";
import * as countryTrie from "../src/countryTrie.json";

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
    expect(result.findAllWords("cat")).toEqual(["cat", "cattle", "category"]);
    expect(result.findAllWords("ca")).toEqual(["cat", "cattle", "category"]);
    expect(result.findAllWords("c")).toEqual([
      "cat",
      "cattle",
      "category",
      "chicken",
    ]);
    expect(result.findAllWords("")).toEqual([
      "cat",
      "cattle",
      "category",
      "chicken",
      "dog",
      "ball",
    ]);
  });
});

describe("Test country trie", () => {
  test("Finds with single letter prefix", () => {
    const result = new Trie(countryTrie.root);

    expect(result.findAllWords("a")).toEqual([
      "andorra",
      "anguilla",
      "angola",
      "antarctica",
      "antigua and barbuda",
      "american samoa",
      "aland islands",
      "albania",
      "algeria",
      "aruba",
      "argentina",
      "armenia",
      "austria",
      "australia",
      "afghanistan",
      "azerbaijan",
    ]);
  });

  test("Finds result with two letter prefix", () => {
    const result = new Trie(countryTrie.root);

    expect(result.findAllWords("ar")).toEqual([
      "aruba",
      "argentina",
      "armenia",
    ]);
  });

  test("Finds no results if no matches", () => {
    const result = new Trie(countryTrie.root);

    expect(result.findAllWords("arc")).toEqual([]);
  });
});
