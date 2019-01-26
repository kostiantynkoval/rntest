import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from "axios"


export default class App extends React.Component {
  
  state = {
    count: 0,
    list: [],
    next: '',
    prev: ''
  }
  
  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => {
        console.log(response.data);
        this.setState({
          count: response.data.count,
          list: response.data.results,
          next: response.data.next,
          prev: response.data.previous
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  _renderItem = ({item}) => (
    <View key={`${item.name}`} style={styles.card}>
      <Image
        style={styles.image}
        source={{uri: item.url}}
      />
      <Text>{item.name}</Text>
    </View>
  );
  
  _onPressButton = (to) => {
    axios.get(to === "Next" ? this.state.next : this.state.prev)
      .then((response) => {
        console.log(response.data);
        this.setState({
          count: response.data.count,
          list: response.data.results,
          next: response.data.next,
          prev: response.data.previous
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  render() {
    return (
      
      <View style={styles.container}>
        <View style={styles.countView}>
          <Text style={styles.countText}>Pokemon available: {this.state.count}</Text>
        </View>
        
        {
          this.state.list.length > 0 && (
            <FlatList
              data={this.state.list}
              extraData={this.state}
              renderItem={this._renderItem}
            />
          )
        }
        
        <View style={styles.buttons}>
          <Button to='Prev' onPressButton={() => this._onPressButton('Prev')} />
          <Button to='Next' onPressButton={() => this._onPressButton('Next')}/>
        </View>
      </View>
    );
  }
}

const Button = ({to, onPressButton}) => (
  <TouchableOpacity onPress={() => onPressButton(to)}>
    <Text
      style={styles.button}
    >
      {to}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  countView: {
    paddingTop: 30,
    backgroundColor: 'navy',
    marginBottom: 4
  },
  countText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  card: {
    flexDirection: 'row'
  },
  image: {
    width: 50,
    height: 50
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    fontSize: 20,
  }
});
