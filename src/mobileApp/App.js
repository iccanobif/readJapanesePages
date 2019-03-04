import React, { Component } from "react"
import
{
  StyleSheet,
  View,
  Text,
  Alert
} from "react-native"
import { WebView } from "react-native-webview"
import fs from "react-native-fs"
const edict = require("./edict.js")

const url = "http://www6.plala.or.jp/private-hp/samuraidamasii/tamasiitop/robotyuugoku/robotyuugoku.htm"

const javascriptToInject = () =>
{
  document.addEventListener("selectionchange", (event) =>
  {
    const selection = window.getSelection()
    if (!selection.isCollapsed)
      return
    window.ReactNativeWebView.postMessage(JSON.stringify(
      {
        text: selection.anchorNode.textContent,
        offset: selection.anchorOffset
      }))
  })
}
export default class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = { stuffToWrite: "CLICK SOMEWHERE" }
    this.handleNewSelection = this.handleNewSelection.bind(this)
  }

  handleNewSelection = async (selection) =>
  {
    try
    {
      // selection.offset indicates which part of the text was clicked
      const definitions = await edict.getDefinitions(selection.text)
      this.setState({ stuffToWrite: definitions.join() })
    }
    catch (exc)
    {
      Alert.alert("errore: " + exc.message)
    }
  }

  render()
  {
    return (
      <View style={styles.container}>
        <WebView
          ref={r => (this.webview = r)}
          source={{ uri: url }}
          onError={(err) => { Alert.alert(err) }}
          style={styles.webView}

          onLoad={() =>
          {
            this.webview.injectJavaScript(javascriptToInject.toString() + ";javascriptToInject();true")
          }}
          onMessage={(event) =>
          {
            this.handleNewSelection(JSON.parse(event.nativeEvent.data))
          }}
        />
        <View style={styles.dictionaryView}>
          <Text style={styles.dictionaryText}>
            {this.state.stuffToWrite}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView:
  {
    flex: 2
  },
  dictionaryView:
  {
    flex: 1,
    backgroundColor: "black"
  },
  dictionaryText: {
    color: "green",
    fontSize: 20
  }
})
