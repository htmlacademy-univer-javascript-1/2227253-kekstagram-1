const getRandonIntegerInterval = (start, end) => {
    if (start < 0 || end < 0) { return NaN; }
    if (start > end) {[start, end] = [end, start]}
    return Math.floor(Math.random() * (end - start + 1) ) + start;
}
// console.log(getRandonIntegerInterval(1, 1.5))

const checkMaxStringLength = (str, maxLength) => {
    return typeof(str) == 'string' && str.length >= maxLength;
}

// console.log(checkMaxStringLength(123, 5))