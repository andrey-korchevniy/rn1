import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {
  Camera,
  requestCameraPermissionsAsync,
  getCameraPermissionsAsync,
} from 'expo-camera';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/config';
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';

const CreateScreen = ({ navigation }) => {
  const [pictureUri, setPictureUri] = useState(''); // ссылка на фото
  const [picUrl, setPicUrl] = useState(null);
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState(null);
  const [requestPermission, setRequestPermission] =
    Camera.useCameraPermissions();
  const cameraRef = useRef(); // ссылка на камеру
  const { userId, nickname } = useSelector(state => state.auth);

  //* получаем геолокацию
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  //* камера
  const permissionCamera = async () => {
    const camPermission = await requestCameraPermissionsAsync();
    await setRequestPermission(camPermission.status === 'granted');
    if (camPermission.status !== 'granted') {
      return alert(
        'Permissions Required',
        'You need to permit to provide the permissions to access the camera',
        [{ text: 'Got it' }]
      );
    }
  };

  useEffect(() => {
    permissionCamera();
  }, []);

  //* снимаем фото
  const takePicture = async () => {
    await getCameraPermissionsAsync();
    const { uri, width, height } = await cameraRef?.current.takePictureAsync();
    setPictureUri(uri);
  };

  //* обрабатываем кнопку "отправить фото"
  const sendPhoto = () => {
    upLoadPostToServer();
    navigation.navigate('DefaultScreen');
  };

  //* загружаем данные на бекэенд
  async function upLoadPostToServer() {
    await upLoadPhotoToServer();
    const { latitude, longitude } = location.coords;

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        photo: picUrl,
        comment,
        location: { latitude, longitude },
        userId,
        nickname,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  //* загружаем фото на сервер
  const upLoadPhotoToServer = async () => {
    const res = await fetch(pictureUri);
    const file = await res.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `pics/${uniquePostId}`);

    //* загрузка фото на сервер
    await uploadBytes(storageRef, file)
      .then(snapshot => {
        console.log('Uploaded file!');
      })
      .catch(err => console.log(err.message));

    //* получаем прямую ссылку на фото
    await getDownloadURL(ref(storage, `pics/${uniquePostId}`))
      .then(url => {
        setPicUrl(url);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        {pictureUri && (
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: pictureUri }}
              style={{
                height: 200,
                width: 200,
              }}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.btn}
          onPress={takePicture}></TouchableOpacity>
      </Camera>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder={'Опишите фоточку'}
            onChangeText={setComment}
          />
          <TouchableOpacity
            style={styles.btnSend}
            activeOpacity={0.7}
            onPress={sendPhoto}>
            <Text style={styles.btnSendText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    width: 50,
    height: 50,
    backgroundColor: '#01556a',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#85c8de',
    marginBottom: 30,
  },
  photoContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    borderColor: '#85c8de',
    borderRadius: 10,
    borderWidth: 1,
  },
  btnSend: {
    backgroundColor: '#01556a',
    height: 55,
    width: '25%',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#85c8de',
  },
  btnSendText: {
    fontSize: 20,
    color: '#dae5ea',
    fontFamily: 'Allerta',
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    alignItems: 'center',
    height: '50%',
  },
  input: {
    height: '100%',
    width: '65%',
    borderColor: '#0195ae',
    borderWidth: 2,
    borderRadius: 5,
    textAlignVertical: 'top',
    fontSize: 20,
    padding: 5,
    backgroundColor: '#dae5ea',
  },
});

export default CreateScreen;
