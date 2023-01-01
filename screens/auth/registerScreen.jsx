import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { authSignUpUser } from '../../redux/auth/authOperation';

const initialInputData = {
  name: '',
  email: '',
  password: '',
};

export default function RegisterScreen({ navigation }) {
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [inputState, setInputState] = useState(initialInputData);
  const [width, setWidth] = useState(Dimensions.get('window').width - 30 * 2);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const onChange = () => {
  //     setWidth(Dimensions.get('window').width - 30 * 2);
  //   };
  //   Dimensions.addEventListener('change', onChange);
  //   return () => Dimensions.removeEventListener('change', onChange);
  // }, []);

  const KeyboardHide = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
    setInputState(initialInputData);
  };

  const handleSubmit = () => {
    dispatch(authSignUpUser(inputState));
    KeyboardHide();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={KeyboardHide}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../../assets/images/backgroundImg.jpeg')}>
          {isKeyboard ? null : (
            <Text style={styles.titleText}>Please Register </Text>
          )}
          <View style={{ ...styles.form, width: width }}>
            <View style={styles.inputBox}>
              <Text style={styles.labelText}>NAME</Text>
              <TextInput
                style={styles.textInput}
                autoComplete='name'
                secureTextEntry={false}
                value={inputState.name}
                onFocus={() => setIsKeyboard(true)}
                onChangeText={value =>
                  setInputState(prev => ({ ...prev, name: value }))
                }
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.labelText}>EMAIL</Text>
              <TextInput
                style={styles.textInput}
                autoComplete='email'
                value={inputState.email}
                onFocus={() => setIsKeyboard(true)}
                onChangeText={value =>
                  setInputState(prev => ({ ...prev, email: value }))
                }
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.labelText}>PASSWORD</Text>
              <TextInput
                style={styles.textInput}
                autoComplete='password'
                secureTextEntry={true}
                value={inputState.password}
                onFocus={() => setIsKeyboard(true)}
                onChangeText={value =>
                  setInputState(prev => ({ ...prev, password: value }))
                }
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={handleSubmit}>
              <Text style={styles.labelText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  ...styles.titleText,
                  fontSize: 16,
                  marginTop: 20,
                  color: '#b1daea',
                }}>
                already with us?
              </Text>
              <Text style={{ ...styles.titleText, fontSize: 20 }}>LOGIN!</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dae5ea',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: { marginHorizontal: 30 },
  titleText: {
    color: '#dae5ea',
    fontSize: 40,
    alignSelf: 'center',
    fontFamily: 'Allerta',
  },
  inputBox: { marginTop: 25 },
  textInput: {
    borderWidth: 1,
    borderColor: '#85c8de',
    borderRadius: 5,
    backgroundColor: '#01556a',
    opacity: 0.8,
    height: 55,
    color: '#dae5ea',
    textAlign: 'center',
    fontSize: 20,
  },
  labelText: {
    fontSize: 20,
    color: '#dae5ea',
    fontFamily: 'Allerta',
  },
  btn: {
    backgroundColor: '#01556a',
    height: 55,
    marginHorizontal: 50,
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#85c8de',
  },
});
