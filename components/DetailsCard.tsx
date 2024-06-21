import { Dimensions, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Card, Text, useTheme } from "react-native-paper";

type Props = {
  title: string;
  image_url: string;
  content: string;
  description: string;
  country: string;
  pubDate: string;
  creator: string;
};

const DetailsCard = (props: Props) => {
  const theme = useTheme();
  return (
    <ScrollView>
      <Card
        style={{ backgroundColor: theme.colors.background }}
        contentStyle={{ width: Dimensions.get("window").width }}
      >
        {props.image_url && <Card.Cover source={{ uri: props.image_url }}/>}
        <Text
          style={{ color: "green", marginVertical: 10 }}
          variant="headlineMedium"
        >
          {props.title}
        </Text>
        <Text>{props.country}</Text>
        <Text>{props.pubDate}</Text>
        <Card.Content>
        <Text>{props.creator}</Text>
          <Text
            textBreakStrategy="highQuality"
            variant="headlineSmall"
            style={{ textAlign: "left", marginVertical: 10 }}
          >
            {props.content}
          </Text>
          <Text variant='bodyMedium'>{props.description}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({});
