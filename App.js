import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPosts(res);
      });
  }, []);

  return (
    <>
      {posts && posts.map((post) => (
        <View key={post.id}>
          <Text>{post.title}</Text>
        </View>
      ))}
    </>
  );
};

export default App;
