const invert = (obj) => {
    let newobj = {};
    if (obj instanceof Object) {
        Object.entries(obj).forEach(([key, value]) => {
            newobj[value] = key;
        });
    }
    console.log(newobj);

}

invert({ firstName: 'John', lastName: 'Doe', age: 32 , eco: true})