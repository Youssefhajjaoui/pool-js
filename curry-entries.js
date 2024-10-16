const { log } = require("console")

const defaultCurry = (obj) => {
    return function (obj1) {
        Object.entries(obj).forEach(([key, val]) => {
            if (!obj1.hasOwnProperty(key)) {
                obj1[key] = obj[key]
            }
        })
        return obj1
    }
}

const mapCurry = (funcs) => {
    return function (obj1) {
        let obj = {}
        Object.entries(obj1).forEach(([key, val]) => {
            log(funcs([key, val]))
            obj[funcs([key, val])[0]] = funcs([key, val])[1]
        })
        return obj
    }
}

const reduceCurry = (funcs) => {
    return function (obj, init = 0) {
        Object.entries(obj).forEach(([key, val]) => {
            init = funcs(init, [key, val])
        })
        return init
    }
}

const filterCurry = (funcs) => {
    return function (obj) {
        let res = {}
        Object.entries(obj).forEach(([key, val]) => {
            if (funcs([key, val])) res[key] = val
        })
        return res
    }
}
const reduceScore = (obj, init) => {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        // Check for the 'isForceUser' property in the object
        if (val.isForceUser === true) {
            return acc + val.pilotingScore + val.shootingScore; // Increment score if isForceUser is true
        }
        return acc;
    }, init);
};

const filterForce = (obj) => {
    return filterCurry(([key, val]) => {
        if (val.shootingScore >= 80 && val.isForceUser === true) return true
        return false
    })(obj)
}

const mapAverage = (obj) => {
    Object.entries(obj).forEach(([key, val]) => {
        const avg = (val.pilotingScore + val.shootingScore) / 2;
        obj[key].averageScore = avg; 
    });

    return obj; 
};
// prettier-ignore
const personnel = {
    lukeSkywalker: { id: 5, pilotingScore: 98, shootingScore: 56, isForceUser: true },
    sabineWren: { id: 82, pilotingScore: 73, shootingScore: 99, isForceUser: false },
    zebOrellios: { id: 22, pilotingScore: 20, shootingScore: 59, isForceUser: false },
    ezraBridger: { id: 15, pilotingScore: 43, shootingScore: 67, isForceUser: true },
    calebDume: { id: 11, pilotingScore: 71, shootingScore: 85, isForceUser: true },
}

log(mapAverage(personnel))