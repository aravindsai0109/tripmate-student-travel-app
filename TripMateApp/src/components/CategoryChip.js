import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import colors from '../theme/colors';

export default function CategoryChip({
  label,
  active,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        active && styles.activeChip,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          active && styles.activeText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 22,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  text: {
    color: colors.textSecondary,
    fontWeight: '600',
  },

  activeText: {
    color: colors.white,
  },
});