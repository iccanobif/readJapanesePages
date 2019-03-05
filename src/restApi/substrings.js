module.exports.getSubstrings = (string, positionToInclude) =>
{
    positionToInclude = parseInt(positionToInclude)
    console.log("module: " + string)
    console.log("module: " + positionToInclude)
    const maxLength = 6
    const slices = []
    for (let a = positionToInclude; a >= 0 && a > positionToInclude - maxLength; a--)
    {
        console.log("a: " + a)
        console.log("positionToInclude + 1: " + positionToInclude + 1)
        console.log("maxLength + 1: " + maxLength + 1)
        console.log("string.length: " + string.length)
        for (let b = positionToInclude + 1; b - a < maxLength + 1 && b <= string.length; b++)
        {
            console.log("b: " + b)
            slices.push(string.slice(a, b))
        }

    }
    console.log(slices)
    return slices
}

// const stringa = "abcdefg"
// console.log("stringa: " + stringa)
// for (let i = 0; i < stringa.length; i++)
//     console.log(stringa[i] + ": " + module.exports.getSubstrings(stringa, i))

console.log(module.exports.getSubstrings("この人", 1))