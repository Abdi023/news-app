import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Appbar, Button, Chip, MD3Colors, ProgressBar } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { ComponentsNavigationProps, NewsData } from "../utils/Types";
import CardItem from "../components/CardItem";

const categories = ["Technology", "Sports", "Politics", "Health", "Business"];

// https://newsdata.io/api/1/news?apikey=pub_380791811f72b1fb92dda957be8b74489c0a9&country=nl&language=nl&category=business,health,politics,sports,technology 
const API_KEY = "pub_380791811f72b1fb92dda957be8b74489c0a9";
const Home = (props: ComponentsNavigationProps) => {
  const theme = useTheme();
  const [newsData, setnewsData] = useState<NewsData[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [nextPage, setnextPage] = useState("");
  const handleSelect = (val: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.find((p) => p === val)
        ? prev.filter((cat) => cat !== val)
        : [...prev, val]
    );
  };
  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=nl&language=nl${
    selectedCategories.length > 0
      ? `&category=${selectedCategories.join()}`
      : ""
  }${nextPage?.length > 0 ? `&page=${nextPage}` : ""}`;
    try {
      setisLoading(true);
      await fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setnewsData((prev) => [...prev, ...data.results]);
        setnextPage(data.nextPage);
    });
    setisLoading(false);
  } catch (error) {
      console.log(error)
  }
    
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home"></Appbar.Content>
      </Appbar.Header>
      <View style={styles.filterContainer}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{ fontWeight: "400", color: "white", padding: 1 }}
            showSelectedOverlay
            selected={selectedCategories.find((c) => cat === c) ? true : false}
            onPress={() => handleSelect(cat)}
          >
            {cat}
          </Chip>
        ))}
        <Button
          style={styles.button}
          mode="elevated"
          labelStyle={{
            fontSize: 14,
            margin: "auto",
            color: theme.colors.onSurface,
          }}
          icon={"sync"}
          onPress={handlePress}
        >
          Refresh
        </Button>
      </View>
      <ProgressBar visible={isLoading} indeterminate color={MD3Colors.error50} />
      <FlatList
      keyExtractor={(item)=>item.title}
        onEndReached={()=>handlePress()}
        style={styles.flatList} 
        data={newsData} 
        renderItem={({item})=> (
        <CardItem
          navigation={props.navigation}
          country={item.country}
          category={item.category} 
          content={item.content}
          title={item.title}
          link={item.link}
          keywords={item.keywords}
          creator={item.creator}
          video_url={item.video_url}
          description={item.description}
          pubDate={item.pubDate}
          image_url={item.image_url}
          source_id={item.source_id}
          source_url={item.source_url}
          source_priority={item.source_priority}
          language={item.language}
          ai_tag={item.ai_tag}
          sentiment={item.sentiment}
          sentiment_stats={item.sentiment_stats}
          ai_region={item.ai_region}
          
      />)}/>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
  },
  flatList: {
    flex: 1,
    height: "auto"
  }
});
