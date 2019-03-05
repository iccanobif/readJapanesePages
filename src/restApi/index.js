const express = require("express")
const app = express()
const http = require("http").Server(app)
const edict = require("./edict.js")
const substrings = require("./substrings.js")
const ut = require("./utils.js")

// console.log(substrings.getSubstrings("この人", 1))

app.get("/", (req, res) =>
{
    res.type("text/plain; charset=utf-8")
    res.end("hello")
})

app.get("/definitions/:word", (req, res) => 
{
    res.type("text/plain; charset=utf-8")
    res.end(JSON.stringify(edict.getDefinitions(req.params.word)))
})

app.get("/findWordSubstrings", (req, res) =>
{
    ut.log(req.query.string)
    ut.log(req.query.startingPosition)
    const output = substrings
        .getSubstrings(req.query.string, req.query.startingPosition)
        .filter(substring => edict.isJapaneseWord(substring)) // Only keeps substrings that are actual words
        .sort((a, b) => // Sort, longest words first
            b.length == a.length
                ? a.localeCompare(b) // localeCompare() is just to make the sorting deterministic
                : b.length - a.length)
        .map(word =>
        {
            return {
                word: word,
                definitions: edict.getDefinitions(word)
            }
        })

    console.log(output)
    res.type("text/plain; charset=utf-8")
    res.end(JSON.stringify(output))
})



http.listen(8082, "0.0.0.0")
ut.log("Server running")
