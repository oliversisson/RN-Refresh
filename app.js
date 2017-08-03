import React, {Component} from 'react';
import {
  ListView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Hud from 'react-native-lyhud';

import TouchableComponent from './TouchableComponent';

class App extends Component {
  state = {
    hudType: null,
    refreshing: false,
  }

  closeHud = () => {
    this.refs.hud.close();
  }

  doThings = () => {
    this.setState({hudType: null});
    this.refs.hud.show('Loading...');
    setTimeout(this.setSuccess, 1000);
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(this.stopRefreshing, 2000);
  }

  setSuccess = () => {
    const hudType = this.state.hudType === 'success' ? 'error' : 'success';
    this.setState({hudType});
    this.refs.hud.show(hudType === 'success' ? 'Updated' : 'Failed\nto update');
    setTimeout(this.closeHud, 500);
  }
  
  stopRefreshing = () => {
    this.setState({refreshing: false});
    this.setSuccess();
  }

  renderRow = (rowData) => {
    const styles = {
      messageContainer: {
        borderBottomColor: '#888888',
        borderBottomWidth: 1,
        flex: 1,
        paddingBottom: 5,
      },
      messageContainerInner: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 2,
      },
      rowView: {
        flexDirection: 'row',
        padding: 2,
      },
      textContainer: {
        flex: 1,
        padding: 2,
      },
      teacher: {
        color: 'black',
        fontSize: 16,
        marginTop: 0,
      },
      title: {
        color: 'black',
        fontSize: 20,
        marginTop: 0,
        fontWeight: '400',
      },
    };

    return (
      <TouchableComponent onPress={this.doThings}>
        <View style={styles.rowView}>
          <View style={styles.messageContainer}>
            <View style={styles.messageContainerInner}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{rowData.title}</Text>
                <Text style={styles.teacher}>from {rowData.teacher}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableComponent>
    );
  }

  render() {
    const styles = StyleSheet.create({
      parent: {
        flex: 1,
        padding: 16,
      },

      hudText: {
        color: 'white',
        textAlign: 'center',
      },

      welcomeText: {
        color: '#616161',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
    });

    const msgs = [
      {teacher: 'ME', title: 'Your first lesson.'},
      {teacher: 'ME', title: 'Your 2nd lesson.'},
      {teacher: 'ME', title: 'Your 3rd lesson.'},
      {teacher: 'ME', title: 'Your 4th lesson.'},
    ];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(msgs);

    return (
      <View style={styles.parent}>
        <Text style={styles.welcomeText}>
          Welcome Anthony!
        </Text>

        <ListView
          dataSource={dataSource}
	  refreshControl={
	    <RefreshControl
	      refreshing={this.state.refreshing}
	      onRefresh={this.onRefresh}
	    />
          }
          renderRow={this.renderRow}
        />
        <Hud ref="hud" hudType={this.state.hudType} textStyle={styles.hudText}/>
      </View>
    );
  }
}

export default App;
