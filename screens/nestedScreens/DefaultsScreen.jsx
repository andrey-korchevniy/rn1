import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Button, Text } from 'react-native';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const data = [];
    const querySnapshot = await getDocs(collection(db, 'posts'));
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setPosts(data);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default DefaultScreen;
