import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.auth);
  const getUserPosts = async () => {
    const q = query(collection(db, 'posts'), where('userId', '==', userId));

    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      data.push({ ...doc.data(), id: doc.id });
    });
    setPosts(data);
  };

  const sinOut = () => {
    dispatch(authSignOutUser());
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: item.photo }}
                style={{ width: 400, height: 200, marginBottom: 10 }}
              />
              <Text>{item.comment}</Text>
              <View>
                <Button
                  title='go to map'
                  onPress={() =>
                    navigation.navigate('Map', { location: item.location })
                  }
                />
                <Button
                  title='go to comments'
                  onPress={() =>
                    navigation.navigate('Comments', { postId: item.id })
                  }
                />
              </View>
            </View>
          )}
        />
      </View>
      <Button title='Sign Out' onPress={sinOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
