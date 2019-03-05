const express = require("express")
const app = express()
const http = require("http").Server(app)
const edict = require("./edict.js")

app.get("/", (req, res) =>
{
    res.type("text/plain")
    res.end("hello")
})

function stringifyDefinition(definition)
{
    let output = ""
    output += definition.kanjiElements.join() + " / "
    output += definition.readingElements.join() + " / "
    output += definition.partOfSpeech + " / "
    output += definition.glosses.join()
    return output
}

app.get("/definitions/:word", (req, res) => 
{
    res.type("text/plain")
    let output = ""
    edict.getDefinitions(req.params.word).forEach(d => {
        output += stringifyDefinition(d) + "\n"
    })
    
    res.end(output)
})

app.get("/findWordSubstrings", (req, res) =>
{
    req.query.string
    req.query.startingPosition
})

http.listen(8082, "0.0.0.0")
console.log("Server running")
