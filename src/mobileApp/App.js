import React, { Component } from "react"
import
{
  StyleSheet,
  View,
  Text,
  Alert
} from "react-native"
import { WebView } from "react-native-webview"

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
      // WARNING: selection.text is untrusted data. Could this be a problem?
      const apiResponse = await fetch("http://www.iccan.us:8082/findWordSubstrings?string="
        + encodeURIComponent(selection.text) +
        "&startingPosition=" + selection.offset)
      if (apiResponse.ok)
        this.setState({ stuffToWrite: await apiResponse.text() })
      else
        this.setState({ stuffToWrite: "error " + apiResponse.status + " " + await apiResponse.text() })
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
            {this.state.stuffToWrite.toString()}
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
