module.exports = (n) =>{
    if(n % 15 === 0){
        return 'fizzbuzz'
    }else if(n % 5 ===0){
        return 'buzz'
    }
    if(n % 3 === 0){
        return 'fizz'
    }
    return `${n}`
}

