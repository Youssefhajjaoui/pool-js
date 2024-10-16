function replica(target, ...sources) {
    // Helper function to check if a value is a plain object
    const isPlainObject = (item) =>
        item && typeof item === 'object' && item.constructor === Object;

    // Helper function for deep merge
    const deepMerge = (target, source) => {
        Object.keys(source).forEach(key => {
            if (isPlainObject(source[key])) {
                // If the target doesn't have the key or it's not an object, create a new object
                if (!isPlainObject(target[key])) {
                    target[key] = {};
                }
                // Recursively merge the objects
                deepMerge(target[key], source[key]);
            } else if (Array.isArray(source[key])) {
                // If the value is an array, copy it directly
                target[key] = source[key].map(item =>
                    isPlainObject(item) ? deepMerge({}, item) : item
                );
            } else {
                // Otherwise, assign the value directly
                target[key] = source[key];
            }
        });
        return target;
    };

    // Create a new object to avoid modifying the original target
    let result = Array.isArray(target) ? [...target] : { ...target };

    // Iterate through all source objects
    sources.forEach(source => {
        if (source != null) { // Skip null and undefined sources
            result = deepMerge(result, source);
        }
    });

    return result;
}
console.log(
    replica(
        {},
        Object.freeze({ line: 'Replicants are like any other machine' }),
        Object.freeze({ author: 'Rich' })
    )/*,
    { line: 'Replicants are like any other machine', author: 'Rich' }
*/)
// 
console.log(replica({ con: console.log }, { reg: /hello/ })/*, {
con: console.log,
reg: /hello/,
}*/)

console.log(replica({ a: 4 }, { a: { b: 1 } }).a.b/*, 1*/)
// 
console.log(
    replica({ a: { b: { c: [123, 1] } } }, { a: { b: { c: '1' } } }).a.b.c/*,
'1'
*/)

console.log(replica({ a: 2 }, { a: [4] }).a/*, [4]*/)
console.log(replica({ a: { b: [2] } }, { a: [4] }).a/*, [4]*/)

console.log(replica({ a: [1, 2, 4] }, { a: { b: [4] } }).a/*, { b: [4] }*/)

console.log(replica({ a: { b: 1, c: 2 } }, { a: { c: 23 } })/*, { a: { b: 1, c: 23 } }*/)
console.log(
    replica(
        {},
        { a: { b1: 1, c1: 2 } },
        { a: { b1: { d2: 1, e2: 2 } } },
        { a: { b1: { d2: { f3: 1, h3: 1 }, e2: { g3: 2 } } } },
        { a: { b1: { d2: { f3: { i4: 1 }, h3: 1 }, e2: { g3: 2 } } } }
    )/*,
{ a: { b1: { d2: { f3: { i4: 1 }, h3: 1 }, e2: { g3: 2 } }, c1: 2 } }
*/)
// 