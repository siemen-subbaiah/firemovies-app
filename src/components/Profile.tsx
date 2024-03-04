import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthState';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Profile = () => {
  const auth = getAuth();
  const { currentUser, logout } = useContext(AuthContext) as AuthContextType;

  const handleLogout = () => {
    logout();
  };

  const handleResetPassword = async () => {
    await sendPasswordResetEmail(auth, currentUser?.email as string);
    Alert.alert(
      'Email sent successfully',
      'follow the mail for further instructions'
    );
  };

  return (
    <View>
      <Text style={[styles.text, { fontSize: 18, marginBottom: 20 }]}>
        Hello {currentUser?.displayName}, hope you're doing good!
      </Text>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={[styles.text, { fontSize: 18 }]}>Username :</Text>
          <Text style={[styles.text, { fontSize: 18 }]}>
            {currentUser?.displayName}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <Text style={[styles.text, { fontSize: 18 }]}>Email :</Text>
          <Text style={[styles.text, { fontSize: 18 }]}>
            {currentUser?.email}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <Pressable onPress={handleResetPassword} style={styles.reset}>
          <Text style={styles.text}>Reset Password</Text>
        </Pressable>
        <Pressable onPress={handleLogout} style={[styles.logout, { gap: 5 }]}>
          <Text style={styles.text}>Logout</Text>
          <MaterialIcons name='logout' size={14} color='white' />
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  logout: {
    backgroundColor: '#F66902',
    padding: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reset: {
    borderColor: '#F66902',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#252525',
    borderRadius: 4,
    padding: 8,
    marginBottom: 20,
  },
});
