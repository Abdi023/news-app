import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";
import { ComponentsNavigationProps, NewsData } from "../utils/Types";
import DetailsCard from "../components/DetailsCard";
import { Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@NewsData');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
    alert("Something Went Wrong")
    return;
  }
};

const storeData = async (value: NewsData) => {
  const data: NewsData[] = (await getData()) || [];
  // const parseValue = JSON.parse(value);
  !data.find((d)=>d.title===value.title) ? data.push(value) :  data;


  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@NewsData', jsonValue);
  } catch (e) {
    alert("Something Went Wrong with storing the data");
  }
};


const NewsOverview = (props: ComponentsNavigationProps) => {
  const { title, description, content, image_url, country, pubDate, creator,} = props?.route?.params as NewsData;
  
  props.navigation.setOptions({headerRight:() => <Button onPress={() => storeData({title, description, content, image_url, country, pubDate, creator,})}>Save</Button> })

  return (<DetailsCard content={content} image_url={image_url} title={title} description={description} country={country} pubDate={pubDate} creator={creator}/>);

};

export default NewsOverview;

const styles = StyleSheet.create({});
