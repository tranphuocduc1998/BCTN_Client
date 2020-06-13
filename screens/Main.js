import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Voice from "@react-native-community/voice";
import * as Speech from "expo-speech";
import Geolocation from "@react-native-community/geolocation";

import { sendHttpRequest, localHost } from "../constants/Fetch";
import { Container, Footer, FooterSound } from "../components/Container";
import { color } from "../constants/Theme";
import { AdviceCard, BMICard, CareCard, FoodCard } from "../components/Card";
import { GoogleMap } from "../components/GoogleMap";




const Main = () => {
  var contextRN;
  var healthCareRN = {
    increaseKg: 0,
    dropKg: 0,
    height: 0,
    weight: 0,
  }

  var ListHealthFoodsRN = [
  ];

  const [valueText, setValueText] = useState("");
  const [speech, setSpeech] = useState(false);
  const [valueTextString, setValueTextString] = useState("");
  const [valueBasicCard, setValueBasicCard] = useState([]);
  const [valueBMICard, setValueBMICard] = useState();
  const [valueNutrition, setValueNutrition] = useState([]);
  const [valueHealthFoods, setValueHealthFoods] = useState();
  const [valueGeolocation, setValueGeolocation] = useState();
  const [foodStore, setFoodStore] = useState();

  let queryAI = "";
  let httpResquest = (method, url, data) => {
    sendHttpRequest(method, url, data).then((resJson) => {
      setValueBasicCard([]);
      setValueBMICard();
      setValueNutrition([]);
      setValueHealthFoods();
      setValueGeolocation();
      setFoodStore();
      const { type, voice, Data, foodStore, context, healthCare, ListHealthFoods } = resJson;
      contextRN = context;
      healthCareRN = healthCare;
      ListHealthFoodsRN = ListHealthFoods;
      switch (type) {
        case "basicCard":
          setValueTextString(voice);
          setValueBasicCard(Data);
          break;
        case "textString":
          setValueTextString(voice);
          break;
        case "BMI":
          setValueTextString(voice);
          setValueBMICard(Data);
          break;
        case "Nutrition":
          setValueTextString(voice);
          setValueNutrition(Data);
          break;
        case "HealthFoods":
          setValueTextString(voice);
          setValueHealthFoods(Data);
          break;
        case "GoogleMap":
          setValueTextString(voice);
          setFoodStore(foodStore);
          Geolocation.getCurrentPosition((info) =>
            setValueGeolocation({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            })
          );
          break;
        default:
          break;
      }
      Speech.speak(voice);
    });
  };

  const onSpeechStart = (Voice.onSpeechStart = (e) => { });

  const onSpeechRecognized = (Voice.onSpeechRecognized = (e) => { });

  const onSpeechError = (Voice.onSpeechError = (e) => { });

  const onSpeechResults = (Voice.onSpeechResults = (e) => { });

  const onSpeechVolumeChanged = (Voice.onSpeechVolumeChanged = (e) => { });

  const onSpeechPartialResults = (Voice.onSpeechPartialResults = (e) => {
    setValueText(e.value[0]);
    queryAI = e.value[0];
  });

  const onSpeechEnd = (Voice.onSpeechEnd = (e) => {
    setSpeech(false);
    console.log(queryAI);
    httpResquest("POST", `${localHost}/ai/request`, {
      query: queryAI,
      context: contextRN,
      ListHealthFoods: ListHealthFoodsRN,
      healthCare: healthCareRN
    });
  });

  const _startRecognizing = async () => {
    setSpeech(true);
    try {
      await Voice.start("vi-VN");
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  // let contentSpeech = <Footer onPress={_startRecognizing} color={color.accent} />

  // if (speech) {
  //     contentSpeech = <FooterSound />
  // }

  return (
    <Container>
      <View
        style={{
          justifyContent: "center",
          shadowRadius: 6,
          shadowOpacity: 0.5,
          elevation: 50,
          padding: 15,
          backgroundColor: color.white,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            paddingHorizontal: 10,
            borderBottomWidth: valueText ? 1 : 0,
            borderColor: color.primary,
          }}
        >
          {valueText}
        </Text>
      </View>
      <ScrollView style={{ marginVertical: 10 }}>
        {valueTextString ? (
          <View
            style={{
              marginVertical: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                width: "90%",
                fontWeight: "600",
                borderRadius: 20,
                backgroundColor: "#fff",
                padding: 10,
                shadowRadius: 10,
                shadowOpacity: 0.7,
                elevation: 4,
              }}
            >
              {valueTextString}
            </Text>
          </View>
        ) : (
            <View></View>
          )}
        {valueBasicCard.map((result) => {
          return (
            <AdviceCard
              key={result._id}
              onPress={(query) => {
                httpResquest("POST", `${localHost}/ai/request`, {
                  query: query,
                  context: contextRN,
                  ListHealthFoods: ListHealthFoodsRN,
                  healthCare: healthCareRN
                });
              }}
              data={result}
            />
          );
        })}
        {valueBMICard && <BMICard data={valueBMICard} />}
        {valueNutrition && <CareCard Data={valueNutrition} />}
        {valueHealthFoods && <FoodCard data={valueHealthFoods} />}
      </ScrollView>
      {valueGeolocation && (
        <GoogleMap geolocation={valueGeolocation} foodStore={foodStore} />
      )}
      {speech ? (
        <FooterSound />
      ) : (
          <Footer onPress={_startRecognizing} color={color.accent} />
        )}
    </Container>
  );
};

export default Main;
