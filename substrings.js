module.exports.getSubstrings = (string, positionToInclude) =>
{
    const maxLength = 6
    const slices = []
    for (let a = positionToInclude; a >= 0 && a > positionToInclude - maxLength; a--)
    {
        // console.log("a: " + a)
        for (let b = positionToInclude + 1; b - a < maxLength + 1 && b <= string.length; b++)
        {
            // console.log("b: " + b)
            slices.push(string.slice(a, b))
        }

    }
    return slices
}

const stringa = "abcdefg"
console.log("stringa: " + stringa)
for (let i = 0; i < stringa.length; i++)
    console.log(stringa[i] + ": " + module.exports.getSubstrings(stringa, i))
