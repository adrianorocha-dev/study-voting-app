import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

type Props = {
  size: number;
  color: string;
  checked?: boolean;
  onPress?: () => void;
};

const RadioButton: React.FC<Props> = ({ size, color, checked, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderWidth: size * 0.16,
        borderRadius: size,
        backgroundColor: checked ? color : undefined,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    />
  );
};

export default RadioButton;
