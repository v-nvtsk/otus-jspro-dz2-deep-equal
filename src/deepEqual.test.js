/* eslint-disable no-console */
import { deepEqual } from "./deepEqual";

describe("deepEqual", () => {
  jest.spyOn(console, "log").mockImplementation(() => {});

  it("should return true for same objects", () => {
    const obj1 = {
      a: {
        b: 1,
      },
    };
    expect(deepEqual(obj1, obj1)).toBe(true);
  });

  it("should return false for objects with different root keys", () => {
    const obj1 = {
      a: {
        b: 1,
      },
    };
    const obj2 = {
      a: {
        b: 1,
      },
      c: {
        d: 1,
      },
    };
    expect(deepEqual(obj1, obj2)).toBe(false);
    expect(console.log).toHaveBeenLastCalledWith("Error: $.c");
  });

  it("should return false for deeply not equal objects", () => {
    const testData = [
      [
        {
          a: { b: 1 },
          c: { d: 1 },
        },
        {
          a: { b: 2 },
          c: { d: 1 },
        },
        "Error: $.a.b",
      ],
      [
        {
          a: { b: 1 },
          c: { d: 1 },
        },
        {
          a: { b: 1 },
          c: { d: 1, e: 1 },
        },
        "Error: $.c.e",
      ],
      [
        {
          key1: "value1",
          key2: {
            key3: "value3",
            key4: {
              key5: "value5",
              key6: "not-value6",
            },
          },
          key7: "value7",
          key8: {
            key9: "value9",
            key10: {
              key11: "value11",
              key12: "value12",
            },
          },
        },
        {
          key1: "value1",
          key2: {
            key3: "value3",
            key4: {
              key5: "value5",
              key6: "value6",
            },
          },
          key7: "value7",
          key8: {
            key9: "value9",
            key10: {
              key11: "value11",
              key12: "value12",
            },
          },
        },
        "Error: $.key2.key4.key6",
      ],
    ];
    testData.forEach(([obj1, obj2, expectedResult]) => {
      expect(deepEqual(obj1, obj2)).toBe(false);
      expect(console.log).toHaveBeenLastCalledWith(expectedResult);
    });
  });
  it("should return true for deeply equal objects", () => {
    const testData = [
      [1, 1],
      [{}, {}],
      [
        {
          key1: "value1",
          key2: {
            key3: "value3",
            key4: {
              key5: "value5",
              key6: "value6",
            },
          },
          key7: "value7",
          key8: {
            key9: "value9",
            key10: {
              key11: "value11",
              key12: "value12",
            },
          },
        },
        {
          key1: "value1",
          key2: {
            key3: "value3",
            key4: {
              key5: "value5",
              key6: "value6",
            },
          },
          key7: "value7",
          key8: {
            key9: "value9",
            key10: {
              key11: "value11",
              key12: "value12",
            },
          },
        },
      ],
    ];
    testData.forEach(([obj1, obj2]) => {
      expect(deepEqual(obj1, obj2)).toBe(true);
    });
  });
});
