import { Dimensions } from "react-native";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mainBgColor: string;
    textColor: string;
    accentColor: string;
  }
}
