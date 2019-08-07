import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions  } from 'react-native';
import  MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as  Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';


const { width, height  } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const initCoordinates = {
    latitude: 32.882932,
    longitude: 13.223355,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };


export default class App extends React.Component {
  state = {
    satellite: false,
    location: undefined,
    disable: false
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
    if (location && location.coords) {
      let tempCoords = {
        latitude: Number(location.coords.latitude),
        longitude: Number(location.coords.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      this._map.animateToRegion(tempCoords, 1000);
    }
  };

  shouldComponentUpdate (){
    return false;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
            ref={component => this._map = component}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            toolbarEnabled={false}
            showsTraffic={true}
            showsUserLocation={true}
            initialRegion={initCoordinates}
            showsMyLocationButton={false}
            mapType={this.state.satellite ? 'hybrid' : 'standard'}
             >
              <Circle center={{latitude: 37.78825, longitude: -122.4324}} radius={1000} />              
        </MapView>
        <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TouchableOpacity onPress={this.getLocationAsync} style={styles.fab}>
            <Ionicons name="md-locate" size={30} color="#eee" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.setState({ satellite: !this.state.satellite }, this.forceUpdate);
          }} style={{ ...styles.fab, backgroundColor: this.state.satellite ? '#a5d6a7' : '#2e7d32' }}>
            <Ionicons name="md-switch" size={30} color="#eee" />
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
App.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  fab: {
    marginBottom: 10,
    marginStart: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2e7d32',
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 40,
    color: 'white'
  }
});
