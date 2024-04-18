import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// Stack
export type AppStackParamList = {
  Splash: undefined;
  Home: undefined;
  Demo: undefined;
  Login: undefined;
  QrCode: undefined;
  Plan: undefined;
  Bright: undefined;
  AdminTools: undefined;
  VideoPreview: undefined;
  Setting: undefined;
  User: undefined;
  AddPage:undefined;
  Update:undefined;
  Log:undefined;
  UpdateApp:undefined;
  
  
};
type AppStackProps<Screen extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, Screen>;

// Drawer
export type HomeDrawerParamList = {
  Personal: undefined;
  Department: undefined;
  Search: undefined;
};