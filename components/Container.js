import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";

import { color } from "../constants/Theme";
import { Icon } from "./Icon";

export function Container({ children }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {children}
    </SafeAreaView>
  );
}

export function Footer({ disabled, onPress, color }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
      }}
    >
      <TouchableOpacity
        disabled={disabled}
        style={{
          borderWidth: 3,
          borderColor: color,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
        onPress={onPress}
      >
        <Icon
          name="keyboard-voice"
          type="MaterialIcons"
          size={25}
          color={color}
        />
      </TouchableOpacity>
    </View>
  );
}

export function FooterSound({onPress}) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Icon name="sound" type="Foundation" size={35} color={"red"} />
      </TouchableOpacity>
    </View>
  );
}
