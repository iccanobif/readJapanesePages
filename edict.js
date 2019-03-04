import { Alert } from 'react-native'
// import sqlite from "react-native-sqlite-storage"
import fs from "react-native-fs"
import sqlite from 'react-native-sqlite-2';

let db = null

async function init()
{
    const dbPath = fs.DocumentDirectoryPath + "/edictasset.db"

    await fs.copyFileAssets("edictasset.db", dbPath)

    if (await fs.exists(dbPath))
        Alert.alert("si, " + dbPath  + " esiste")
    else
        Alert.alert("no, non esiste")

    db = sqlite.openDatabase(
        {
            name: "edictasset",
            readOnly: true,
            createFromLocation: dbPath
        },
        () =>
        {
            // Alert.alert("ok")
        },
        () =>
        {
            Alert.alert("ko")
        })
}

init()

module.exports.isJapaneseWord = async (word) =>
{
    return true
}

module.exports.getDefinitions = (word) =>
{
    return new Promise((resolve, reject) => 
    {
        try
        {
            // Alert.alert("STRONZO")
            db.transaction(function (txn)
            {
                // Alert.alert("VAFFANCULO")
                // txn.executeSql('DROP TABLE IF EXISTS Users', []);
                // txn.executeSql('CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))', []);
                // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['nora']);
                // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['takuya']);
                // txn.executeSql('SELECT * FROM `users`', [], function (tx, res)
                // txn.executeSql('select * from sqlite_master', [], function (tx, res)
                txn.executeSql('select * from android_metadata', [], function (tx, res)
                {
                    Alert.alert("bastardo")
                    let output = ["diocan"]
                    for (let i = 0; i < res.rows.length; ++i)
                    {
                        const val = res.rows.item(i)
                        // Alert.alert(Object.keys(val).toString()) 
                        output.push(val.locale)
                    }
                    resolve(output)
                },
                    (tx, err) =>
                    {
                        // Alert.alert("errore qua dentro")
                        reject(err)
                    });
            });
        }
        catch (exc)
        {
            // Alert.alert("MERDACCIA")
            reject(exc)
        }
    })
}