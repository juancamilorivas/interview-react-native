import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

//https://randomuser.me/api/?page=${currentPage}&results=10
//https://randomuser.me/api/?page=3&results=10

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = () => {
    setIsLoading(true);
    axios.get(`https://randomuser.me/api/?page=${currentpage}&results=10`).then((res) => {
      setUsers([...users, ...res.data.results]);
      setIsLoading(false);
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Image style={styles.imagen} source={{ uri: item.picture.large }} />
        <View style={styles.containerTxt}>
          <Text
            style={styles.completeName}
          >{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
          <Text style={styles.emailStyles}>{item.email}</Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      isLoading ? (
        <View style={styles.renderStyles}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : null
    )
  };

  const loadMoreItem = () => {
    setCurrentPage(currentpage + 1)
  };

  useEffect(() => {
    getUsers();
  }, [currentpage]);

  return (
    <>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.email}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  imagen: {
    height: 50,
    width: 50,
    marginRight: 16,
  },
  containerTxt: {
    justifyContent: "space-around",
  },
  completeName: {
    fontSize: 16,
  },
  emailStyles: {
    color: "#777",
  },
  renderStyles: {
    alignItems: "center",
    marginVertical: 16,
  },
});
export default App;
