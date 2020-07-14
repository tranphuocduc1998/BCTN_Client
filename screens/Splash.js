import React from "react";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Speech from "expo-speech";

const Splash = () => {
  Speech.speak("Chào mừng đến với");
  Speech.speak("Nutrition manager", {
    language: "hi",
  });
  return (
    <LinearGradient
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      colors={["#FFFF00", "#35C7DB"]}
    >
      <View
        style={{
          marginTop: 20,
          width: 200,
          height: 200,
        }}
      >
        <Image
          source={require("../assets/ic_launcher_round.png")}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Chào mừng đến với
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 25, color: "#FFFF00" }}>
          Nutrition manager
        </Text>
      </View>
    </LinearGradient>
  );
};

export default Splash;
