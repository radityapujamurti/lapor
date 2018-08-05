import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ListView, TouchableHighlight, Button, ScrollView, TextInput, Container, Header } from 'react-native'
import firebase from 'react-native-firebase'

export default class Main extends React.Component {
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = {
            itemDataSource: ds
        }

        this.itemsRef = firebase.database().ref().child('items');

        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('Login');
        } catch (e) {
            console.log(e);
        }
    }

    componentWillMount(itemsRef){
        this.getItems(this.itemsRef);
    }

    componentDidMount(){
        this.getItems(this.itemsRef);
    }

    getItems(itemsRef){
        // let items = [{title:"one"},{title:"two"}];
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key 
                });
            });
            this.setState({
                itemDataSource: this.state.itemDataSource.cloneWithRows(items)
            }); 
        })
        // this.setState({
        //     itemDataSource: this.state.itemDataSource.cloneWithRows(items)
        // });
    }
    state = { currentUser: null }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({currentUser})
    }

    pressRow(item){

    }

    renderRow(item){
    return(
        <TouchableHighlight onPress={() => {
            this.pressRow(item);
        }}>
            <View style={styles.li}>
                <Text style={styles.liText}>{item.title}</Text>
            </View>
        </TouchableHighlight>
        )
    }

    render() {
        const { currentUser } = this.state
        return (
        <ScrollView>
        <View style={styles.container}>
        <Button
          title="Logout"
          onPress={this.signOutUser}
        />
        <Text>
        Hi {currentUser && currentUser.email}!
        </Text>
        <ListView 
            dataSource={this.state.itemDataSource}
            renderRow={this.renderRow}
        />
        </View>
        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textEdit:{
    bottom:0,
    flex:1,
    width:300,
  },
  floatButton:{
    flex:1,
    top:48,
    left:50,
    alignSelf:'center',
    backgroundColor:'#34A34F'
  },
  footer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  }
})