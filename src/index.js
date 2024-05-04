import { deepEqual } from "./deepEqual";

const obj1 = {
  a: {
    b: 1,
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 1,
  },
};

process.stdout.write(deepEqual(obj1, obj1) ? "OK\n" : "");
// OK

process.stdout.write(deepEqual(obj1, obj2) ? "OK\n" : "");
// Error: a.b

process.stdout.write(deepEqual(obj1, obj3) ? "OK\n" : "");
// OK
