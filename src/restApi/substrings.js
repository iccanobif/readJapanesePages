module.exports.getSubstrings = (string, positionToInclude) =>
{
    positionToInclude = parseInt(positionToInclude)
    const maxLength = 25
    const slices = []
    for (let a = positionToInclude; a >= 0 && a > positionToInclude - maxLength; a--)
    {
        for (let b = positionToInclude + 1; b - a < maxLength + 1 && b <= string.length; b++)
        {
            console.log("b: " + b)
            slices.push(string.slice(a, b))
        }

    }
    console.log(slices)
    return slices
}