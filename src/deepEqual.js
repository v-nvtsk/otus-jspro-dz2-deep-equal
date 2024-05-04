function isObject(obj) {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
}

export function deepEqual(a, b, path = []) {
  if (Object.is(a, b)) return true;

  try {
    const areBothObjects = isObject(a) && isObject(b);
    if (!areBothObjects) throw new Error(`$.${path.join(".")}`);

    const [obj1, obj2] = Object.keys(a).length > Object.keys(b).length ? [a, b] : [b, a];
    let faultFlag = false;
    Object.keys(obj1).forEach((key) => {
      if (faultFlag) return;

      path.push(key);
      if (!deepEqual(obj1[key], obj2[key], path)) faultFlag = true;
      path.pop();
    });
    return !faultFlag;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error: ${e.message}`);
  }

  return false;
}
