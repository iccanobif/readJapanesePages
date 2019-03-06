import React, { Component } from "react"
import
{
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView
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
    this.state = {
      dictionaryResults: null
    }
    // dictionaryResults is a list of objects with this shape:
    // kanjiElements
    // readingElements
    // partOfSpeech
    // glosses

    this.handleNewSelection = this.handleNewSelection.bind(this)
  }

  handleNewSelection = async (selection) =>
  {
    // WARNING: selection.text is untrusted data. Could this be a problem?
    const apiResponse = await fetch("http://www.iccan.us:8082/findWordSubstrings?string="
      + encodeURIComponent(selection.text) +
      "&startingPosition=" + selection.offset)
    if (apiResponse.ok)
      this.setState({ dictionaryResults: await apiResponse.json() })
    else
      this.setState({ stuffToWrite: "error " + apiResponse.status + " " + await apiResponse.text() })
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
        <ScrollView style={styles.dictionaryView}>
          {this.state.dictionaryResults == null
            ? <Text style={styles.dictionaryText}>
              "CLICK SOMEWHERE"
              </Text>
            : this.state.dictionaryResults.map(d =>
              <View key={d.word}>
                <Text style={styles.dictionaryText}>
                  {d.word + "\n"}
                  {d.definitions.map((definition, definitionIndex) =>
                    <Text key={definitionIndex}>
                      {
                        definition.kanjiElements.length == 0
                          ? ""
                          : "Kanji:" + definition.kanjiElements.join() + "\n"
                      }
                      Readings: {definition.readingElements.join()} {"\n"}
                      Glosses: {definition.glosses.join()}
                    </Text>
                  )}
                </Text>
              </View>)
            // : JSON.stringify(this.state.dictionaryResults)
          }
        </ScrollView>
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
