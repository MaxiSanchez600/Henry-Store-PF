const modelExtractor = arr => { // arr = [[{model}, true], [{model}, false], [{model}, false]]
    let result = [];
    if(arr.length === 0) return result;
    for(let i = 0; i < arr.length; i++) {
        if(!(arr[i][0] instanceof Boolean)) {   //este condicional no haria falta ya que se que el modelo esta siempre en la posicion 0
            result.push(arr[i][0]);
        }
    }
    return result;
};

module.exports = modelExtractor;