// https://stackoverflow.com/questions/742013/how-to-code-a-url-shortener

const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const base = alpha.length

// encode base 10 id into base 62 string
module.exports.encode = (num) => {
    let output = [];

    while (num > 0) {
        const remainder = num % base;
        output.push(remainder);
        num = Math.floor(num / base);
    }
    output = output.reverse();

    return output.map(i => alpha[i]).join('');
}

// decode base 62 string into base 10 id
module.exports.decode = (str) => {
    const arr = str.split('').map((char) => {
        return alpha.indexOf(char);
    })

    return arr.reverse().reduce((accum, curr, i) => {
        return accum + curr * Math.pow(base, i);
    }, 0);
}

