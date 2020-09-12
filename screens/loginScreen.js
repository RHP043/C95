import React from 'react';
import {Text,View, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ToastAndroid, Alert, TextInput} from  'react-native';
import * as firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId:'',
            password:'',

        }
    }
    userSignUp=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((response)=>{
            return alert("User Added Successfully")
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
        })
    }
    login = async(email,password)=>{
        if(email && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password);
                if(response){
                    this.props.navigation.navigate('Timetable')
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        alert("user does not exist");
                        break ;
                        case 'auth/invalid-email':
                            alert("incorrect email or password");
                        break;
                }
            }
        }
        else{
            alert("enter email and password")
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style = {{alignItems:'center',marginTop:20}}>
                
                <View style = {{justifyContent:"center",alignItems:'center'}}>
                    <Text style = {{fontSize:65,fontWeight:'300',paddingBottom:30,color:'#ff3d00'}}>Timetable App</Text>
                    <TextInput
                    style = {styles.loginBox}
                    placeHolder = "abc@example.com"
                    keyboardType = 'email-address'
                    onChangeText = {(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}/>

                    <TextInput
                    style = {styles.loginBox}
                    placeHolder = "enter password"
                    onChangeText = {(text)=>{
                        this.setState({
                            password:text
                        })
                    }}/>
                </View>
                <View>
                    <TouchableOpacity style = {{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
                    onPress = {()=>{this.login(this.state.emailId,this.state.password)}}>
                        <Text style = {{textAlign:'center'}}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
                    onPress = {()=>{this.userSignUp(this.state.emailId,this.state.password)}}>
                        <Text style = {{textAlign:'center'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
    }
})