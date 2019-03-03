import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview'

const url = "http://www6.plala.or.jp/private-hp/samuraidamasii/tamasiitop/robotyuugoku/robotyuugoku.htm"

const javascriptToInject = () =>
{
  document.addEventListener("click", () =>
  {
    alert("this is a test")
  })
}

const stringa = javascriptToInject.toString() + ";javascriptToInject();true"


export default class App extends Component
{
  render()
  {
    // Alert.alert(stringa)
    return (
      <View style={styles.container}>
        <WebView
          ref={r => (this.webview = r)}
          source={{ uri: url }}
          onError={(err) => { Alert.alert(err) }}
          style={styles.webView}
          onLoad={() =>
          {
            this.webview.injectJavaScript(stringa)
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
