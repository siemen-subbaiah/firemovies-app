import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthState';
import Profile from '../components/Profile';

const Account = () => {
  const { currentUser, loading, login, signup } = useContext(
    AuthContext
  ) as AuthContextType;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const handleSignup = () => {
    signup(email, password, name);
  };

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <View style={styles.container}>
      {!currentUser ? (
        <>
          <View>
            <View style={{ marginBottom: 15 }}>
              <Image
                source={require('../../assets/logo.png')}
                height={50}
                width={10}
                style={{ marginBottom: 3 }}
              />
              <Text style={{ color: '#fff', marginTop: 5 }}>
                Login/signup to add your favourite movies to a favourites list
              </Text>
            </View>
            {showLogin ? (
              <>
                <View style={{ marginBottom: 10 }}>
                  <TextInput
                    style={styles.inputContainer}
                    placeholder='Enter email'
                    placeholderTextColor='gray'
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <TextInput
                    style={styles.inputContainer}
                    placeholder='Enter password'
                    placeholderTextColor='gray'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
                <Button
                  title='Login'
                  color='#F66902'
                  disabled={loading}
                  onPress={handleLogin}
                />
                <Text style={{ color: '#fff', marginTop: 10 }}>
                  Don't have an account?
                </Text>
                <Pressable onPress={() => setShowLogin(false)}>
                  <Text style={{ color: '#F66902' }}>Signup instead</Text>
                </Pressable>
              </>
            ) : (
              <>
                <View style={{ marginBottom: 10 }}>
                  <TextInput
                    style={styles.inputContainer}
                    placeholder='Enter username'
                    placeholderTextColor='gray'
                    value={name}
                    onChangeText={setName}
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <TextInput
                    style={styles.inputContainer}
                    placeholder='Enter email'
                    placeholderTextColor='gray'
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <TextInput
                    style={styles.inputContainer}
                    placeholder='Enter password'
                    placeholderTextColor='gray'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
                <Button
                  title='Signup'
                  color='#F66902'
                  onPress={handleSignup}
                  disabled={loading}
                />
                <Text style={{ color: '#fff', marginTop: 10 }}>
                  Have an account already?
                </Text>
                <Pressable onPress={() => setShowLogin(true)}>
                  <Text style={{ color: '#F66902' }}>Login instead</Text>
                </Pressable>
              </>
            )}
          </View>
        </>
      ) : (
        <>
          <Profile />
        </>
      )}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
    // flex: 1,
    // justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  inputContainer: {
    color: '#fff',
    height: 40,
    borderRadius: 4,
    marginBottom: 5,
    backgroundColor: '#252525',
    padding: 8,
  },
});
