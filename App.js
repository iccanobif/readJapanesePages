import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview'

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
    this.handleNewSelection = this.handleNewSelection.bind(this)
  }

  handleNewSelection = (selection) =>
  {
    // selection.offset indicates which part of the text was clicked
    Alert.alert("message arrived: " + selection.text)
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  webView:
  {
    flex: 1
  }
});
