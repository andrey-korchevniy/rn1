import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState('');
  const { nickname } = useSelector(state => state.auth);
  const [allComments, setAllComments] = useState([]);

  const createPost = async () => {
    try {
      const docRef = await addDoc(collection(db, 'posts', postId, 'comments'), {
        nickname,
        comment,
      });
      console.log('Document written with ID: ', docRef.id);
      getAllComments();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getAllComments = async () => {
    const data = [];
    const querySnapshot = await getDocs(
      collection(db, 'posts', postId, 'comments')
    );
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id });
    });
    console.log(data);
    setAllComments(data);
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <SafeAreaView style={styles.containerSafe}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View>
                <Text>{item.comment}</Text>
                <Text>{item.nickname}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
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
            onPress={createPost}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSafe: {
    flex: 1,
    marginTop: 10,
  },
  btnSend: {
    backgroundColor: '#01556a',
    height: 55,
    width: '50%',
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
    marginHorizontal: 10,
    alignItems: 'center',
    height: '50%',
  },
  input: {
    height: '70%',
    width: '100%',
    borderColor: '#0195ae',
    borderWidth: 2,
    borderRadius: 5,
    textAlignVertical: 'top',
    fontSize: 20,
    padding: 5,
    backgroundColor: '#dae5ea',
  },
});

export default CommentsScreen;
