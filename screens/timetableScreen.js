import React from 'react';
import {Text,View,FlatList,StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import db from '../config'

export default class TimetableScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            classList:[]
        }
        this.requestRef = null
    }
    getClassList = ()=>{

        this.requestRef = db.collection("details")
        .onSnapshot((snapshot)=>{
            var classList = snapshot.docs.map(document=>document.data());
            this.setState({
                classList:classList
            })
        })
    }
    componentDidMount(){
        this.getClassList()
    }
    componentWillUnmount(){
        this.requestRef
    }
    keyExtractor = (item,index)=>index.toString()
    renderItem = ({item,i})=>{
        return(
            <ListItem
            key = {i}
            title = {item.title}
            subtitle = {item.duration}
            titleStyle = {{color:'black',fontWeight:'bold'}}
            rightElement = {item.date}
            bottomDivider/>
        )
    }
    render(){
        return(
            <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                {
                    this.state.classList.length===0
                    ?(
                        <View style = 
                        {{flex:1,fontSize:20,justifyContent:'center',alignItems:'center'}}>
                            <Text style = {{fontSize:20}}>List Of All Classes</Text>
                            </View>
                    ):(
                        <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.classList}
                        renderItem = {this.renderItem}/>
                    )
                }
            </View>
        )
    }
}