import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { ComponentsNavigationProps, NewsData } from "../utils/Types";
import CardItem from "../components/CardItem";

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@NewsData");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
    alert("Something Went Wrong");
    return;
  }
};


const storeData = async (value: string) => {
  const data: NewsData[] = (await getData()) || [];
  const filtered = data.filter((news)=> news.title !== value);

  try {
    const jsonValue = JSON.stringify(filtered);
    await AsyncStorage.setItem('@NewsData', jsonValue);
  } catch (e) {
    alert("Something Went Wrong with storing the data");
  }
};


const deleteHandler = async(val: string) => {
  await storeData(val);
};

const Saved = (props: ComponentsNavigationProps) => {

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const focused = useIsFocused();
  const [saveNews, setsaveNews] = useState<NewsData[]>([]);
  useEffect(() => {
    getData()
      .then((data) => setsaveNews(data))
      .catch(() => alert("Error Occurred"));
  }, [focused]);
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="saved"></Appbar.Content>
      </Appbar.Header>
        
      <FlatList
        style={styles.flatList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item) => item.title}
        data={saveNews}
        renderItem={({ item }) => (
          <CardItem
            handleDelete={deleteHandler}
            content={item.content}
            description={item.description}
            image_url={item.image_url}
            pubDate={item.pubDate}
            creator={item.creator}
            navigation={props.navigation}
            title={item.title}
          />
        )}
      />
      {/* {saveNews &&
        saveNews.length > 0 &&
        saveNews.map((data: NewsData) => (
          <CardItem 
            content={data.content} 
            description={data.description}
            image_url={data.image_url}
            pubDate={data.pubDate}
            creator={data.creator}
            navigation={props.navigation}
            title={data.title}
            key={data.title}

          />
        ))} */}
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    display: 'flex',
    flex: 1,
    height: 'auto'
  }
});
