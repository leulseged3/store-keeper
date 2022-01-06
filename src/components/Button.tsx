import React from 'react';
import { Text, StyleSheet, ViewStyle, TouchableOpacity, TextStyle, ActivityIndicator } from 'react-native';

interface IProps {
  /**
   * a void function that triggers when button is pressed.
   *
   * @memberof IProps
   */
  onPress(): void;

  /**
   * Title text for button.
   *
   * @type {string}
   * @memberof IProps
   */
  title: string;
  /**
   * Optional ViewStyle props that overrides the button container style.
   * It helps to customize the button
   *
   * @type {ViewStyle}
   * @memberof IProps
   */
  buttonContainerStyle?: ViewStyle;

  isDisabled?: boolean;

  isLoading?: boolean;
}

export const AppButton: React.FC<IProps> = props => {
  const { onPress, title, buttonContainerStyle, isDisabled, isLoading } = props;
  return (
    <TouchableOpacity
      style={[styles.container, buttonContainerStyle, isDisabled && { backgroundColor: '#D3D3D3' }]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={styles.title}>
        {title}
      </Text>
      {
        isLoading &&
        <ActivityIndicator animating={true} style={{ marginLeft: 20 }} color='#fff' />
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#406882',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  } as ViewStyle,
  title: {
    color: '#fff',
    fontWeight: 'bold',
  } as TextStyle
});