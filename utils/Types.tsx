import { NavigationProp, Route, RouteProp } from "@react-navigation/native";

export type NewsData = {
  title: string;
  link: string;
  keywords: string;
  creator: string;
  video_url: string;
  description: string;
  content: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  source_url: string;
  source_priority: string;
  country: string;
  category: string[];
  language: string;
  ai_tag: string;
  sentiment: string;
  sentiment_stats: string;
  ai_region: string;
};


export type ComponentsNavigationProps = {
  navigation: NavigationProp<Route>;
  route: RouteProp<Route>;
  
}
