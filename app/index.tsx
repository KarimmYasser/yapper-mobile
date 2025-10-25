import { Theme } from '@/src/constants/theme';
import { useTheme } from '@/src/context/ThemeContext';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/(profile)')}
      >
        <Text style={styles.buttonText}>Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/(profile)/2')}
      >
        <Text style={styles.buttonText}>Go to Other User Profile</Text>
      </TouchableOpacity>

            <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/(profile)/MuteAndBlock/MuteAndBlock')}
      >
        <Text style={styles.buttonText}>Go to Mute and Block Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background.primary,
    },
    text: {
      color: theme.colors.text.primary,
      fontSize: theme.typography.sizes.lg,
      marginBottom: theme.spacing.xl,
    },
    button: {
      backgroundColor: theme.colors.text.link,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      marginVertical: theme.spacing.sm,
    },
    buttonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.sizes.md,
      fontFamily: theme.typography.fonts.semiBold,
    },
  });
