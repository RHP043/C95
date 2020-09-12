import React from 'react';
import {Text,View,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity} from 'react-native';
import db from '../config';
import firebase from 'firebase'
import DatePicker from "react-datepicker";

export default class AddClassScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            userId:firebase.auth().currentUser.email,
            title:'',
            duration:'',
            date:''
        }
    }
    MyComponent() {
        const [date, setDate] = useState(new Date());
        const handleChange = date => setDate(date);
      
        const today = new Date();
        let in3Days = new Date();
        in3Days.setDate(in3Days.getDate() + 3);
      
        return (
          <DatePicker
            selected={date}
            onChange={handleChange}
            minDate={today}
            maxDate={in3Days}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        );
      }
    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }
    addClassDetails=(duration,title,date) => {
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId();
        db.collection('details').add({
            "user_id":userId,
            "duration":duration,
            "title":title,
            "date":date
        })
        this.setState({
            duration:'',
            title:'',
            date:''
        })
        return alert('Details added successfully')
    }

    render(){
        return(
            <View style = {{flex:1}}>
                <KeyboardAvoidingView style = {styles.keyboardStyle}>
                    <TextInput
                    style = {styles.formTextInput}
                    placeholder = {"Enter the class name"}
                    onChangeText = {(text)=>{
                        this.setState({
                            title:text
                        })
                    }}
                    value = {this.state.title}/>
                    <TextInput
                    style = {styles.formTextInput}
                    placeholder = {"Enter the duration of class"}
                    onChangeText = {(text)=>{
                        this.setState({
                            duration:text
                        })
                    }}
                    value = {this.state.duration}/>
                    <TextInput
                    type = "date"
                    style = {styles.formTextInput}
                    placeholder = {"Enter the date yyyy-mm-dd"}
                    onChangeText = {(text)=>{
                        this.myComponent()
                        this.setState({
                            date:text
                        })
                    }}
                    value = {this.state.date}/>
                    <TouchableOpacity style = {styles.button}
                    onPress = {()=>{this.addClassDetails(this.state.duration,this.state.title,this.state.date)}}
                    >
                        <Text>Add details</Text>
                        </TouchableOpacity>
                </KeyboardAvoidingView>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    keyboardStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"ff5722",
        shadowColor:"#0000",
        shadowOffset:{
            width:0,
            height:8,
        },
        shadowOpacity:0.44,
        shadowRadius:10.22,
        elevation:16,
        marginTop:20
    }
})