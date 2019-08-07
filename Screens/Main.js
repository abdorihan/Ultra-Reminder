import * as React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';
import { BottomNavigation, Text } from 'react-native-paper';
import Map from './Map';
import Alarms from './ِAlarms';

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

export default class Main extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'alarms', title: 'Alarms', icon: 'alarm', color: '#1565c0' },
      { key: 'map', title: 'Map', icon: 'map', color: '#2e7d32' },
      { key: 'recents', title: 'Recents', icon: 'history', color: '#6a1b9a' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    alarms: Alarms,
    map: Map,
    recents: RecentsRoute,
  });

  render() {
    return (
        <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }} >
            <BottomNavigation
                shifting
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
            />
        </View>
    );
  }
}