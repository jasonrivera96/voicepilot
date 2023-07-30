import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const CustomAlert = ({ message, onClose }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  if (message == '') return null;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      closeAlert();
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  const closeAlert = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const containerStyle = {
    opacity: fadeAnim,
    transform: [{ scale: fadeAnim }],
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={closeAlert}>
        <Text style={styles.messageText}>{message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '5%',
    right: '7%',
    left: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.ORANGE_SOFT,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    opacity: 0.33,
  },
  messageText: {
    color: COLORS.BLACK,
    fontSize: 13,
  },
});
