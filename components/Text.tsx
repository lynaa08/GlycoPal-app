import { Text as RNText, TextProps } from "react-native";

export function Text({ style, ...props }: TextProps) {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: "PixelifySans_400Regular" }, style]}
    />
  );
}
