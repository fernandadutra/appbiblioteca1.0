import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class Firstscreen extends Component {
constructor(props){
  super(props);
  this.state={
  domState:"normal",
  hasCameraPermissions:null,
  scanned:false,
  scannedData:""
 }
}
GetCameraPermission=async domState=>{
  const { status } = await Permissions.askAsync(Permissions.CAMERA); 
  this.setState({ 
/*status === "granted" é verdadeiro se o usuário concedeu permissão status === "granted" é falso se o usuário não concedeu permissão */
 hasCameraPermissions: status === "granted", 
 domState: domState, 
 scanned: false });
}
BarCodeScanner=async({type,data})=>{
this.setState({
scannedData:data,
domState:"normal",
scanned:true
});
}
render() {
  const {domState, hasCameraPermissions, scanned, scannedData} = this.state;
  if(domState==="scanned"){
  return(<BarCodeScanner onBarCodeScanned={scanned?undefined:this.BarCodeScanner}></BarCodeScanner>)
  }
return (
<View style={styles.container}>
<Text>{hasCameraPermissions?scannedData:"Solicitar permissão para a câmera"}</Text>
<TouchableOpacity onPress={()=>this.GetCameraPermission("scanner")}>
<Text style={styles.text}>Digitalizar o qr code</Text>
</TouchableOpacity>
</View>
);}


}







const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#5653D4"
},
text: {
color: "#ffff",
fontSize: 30
}});

