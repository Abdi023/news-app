import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewsData } from "../utils/Types";
import { Button, Card, useTheme } from "react-native-paper";
import { NavigationProp, Route } from "@react-navigation/native";

type Props = {
  title: string;
  image_url: string;
  description: string;
  content: string;
  video_url: string;
  country: string;
  pubDate: string;
  creator: string;
  navigation: NavigationProp<Route>;
  handleDelete?:(val: string)=> void;
};

const CardItem = (props: Props) => {
  const theme = useTheme();
  const handlPress = () => {
    props.navigation.navigate("NewsOverview", {
      title: props.title,
      description: props.description,
      image_url: props.image_url,
      content: props.content,
      country: props.country,
      pubDate: props.pubDate,
      creator: props.creator,
    });
  };

  return (
    <Pressable onPress={handlPress}>
      <Card
        mode="elevated"
        style={{
          marginVertical: 20,
          backgroundColor: theme.colors.primaryContainer,
        }}
      >
        <Card.Cover borderRadius={10} source={{ uri: props.image_url }} />
        <Card.Title
          title={props.title}
          subtitle={props.description.split("\n")[0]}
          titleNumberOfLines={1}
        ></Card.Title>
        {props.handleDelete && (
        <Card.Actions>
          <Button onPress={() => props.handleDelete && props.handleDelete(props.title)}>Delete</Button>
        </Card.Actions>
        )}
      </Card>
    </Pressable>
  );
};

export default CardItem;

const styles = StyleSheet.create({});
