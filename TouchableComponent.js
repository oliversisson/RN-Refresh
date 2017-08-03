import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

let TouchableComponent;

if (Platform.OS === 'android') {
  TouchableComponent = Platform.Version <= 20 ? TouchableOpacity : TouchableNativeFeedback;
} else {
  TouchableComponent = TouchableOpacity;
}

export default TouchableComponent;
