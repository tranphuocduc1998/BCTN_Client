import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { Icon } from "../components/Icon";
import { color } from "../constants/Theme";
import Carousel from "react-native-snap-carousel";
import { sendHttpRequest, localHost, getDirection } from "../constants/Fetch";
import * as Speech from "expo-speech";
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export function GoogleMap({ geolocation, foodStore }) {
  const { latitude, longitude } = geolocation;
  const [dbCarousel, setDBCarousel] = useState([]);
  const [polyline, setPolyline] = useState([]);

  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{ height: 200, width: 300, flexDirection: "row" }}
        key={index}
      >
        <View style={{ width: "35%", height: "100%" }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: item.image }}
          />
        </View>
        <View
          style={{
            height: "100%",
            width: "65%",
            paddingVertical: 15,
            paddingRight: 15,
          }}
        >
          <View
            style={{
              backgroundColor: color.white,
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Icon
              name="food"
              type="MaterialCommunityIcons"
              color="#000"
              size={30}
            />
            <Text style={{ fontWeight: "bold", color: "#000", fontSize: 25 }}>
              {item.nameFood}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="map-marker-radius"
                type="MaterialCommunityIcons"
                color={color.icon}
                style={{ margin: 3 }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "800",
                  color: "#000",
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                {item.address}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="money"
                type="FontAwesome"
                color={color.icon}
                style={{ margin: 3 }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "800",
                  color: "#000",
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                {item.money} VNĐ
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              backgroundColor: color.accent,
              height: 55,
              width: 55,
              bottom: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="infocirlce" type="AntDesign" />
            <Text>INFOS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const _onPressMarker = (key) => {
    setDBCarousel([]);
    setPolyline([]);
    sendHttpRequest(
      "GET",
      `${localHost}/menuOfStore/foodStore/` + key._id
    ).then((resJson) => {
      const { count, advices } = resJson;
      if (count <= 0) {
        const voice = `Chưa cập nhật món ăn cho ${key.name}`;
        Speech.speak(voice);
        return;
      }
      let menu = [];
      advices.forEach((element) => {
        menu.push({
          nameStore: key.name,
          nameFood: element._healthFoodsId.name,
          money: element.price,
          image: element._healthFoodsId.imageUri,
          address: key.address,
        });
      });
      setDBCarousel(menu);
      const voice = `danh sách món ăn của ${key.name} tại địa chỉ: ${key.address}`;
      Speech.speak(voice);
    });
    setTimeout(() => {
      drawLine(key);
    }, 2000);
  };

  const drawLine = (key) => {
    getDirection(latitude, longitude, key.latitude, key.longitude).then(
      (resJson) => {
        // console.log(resJson.features);
        const {
          geometry: { coordinates },
        } = resJson.features[0];
        const coor = coordinates.map((result) => {
          return {
            latitude: result[1],
            longitude: result[0],
          };
        });
        setPolyline(coor);
      }
    );
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          title="Vị trí hiện tại của bạn"
          coordinate={{ latitude: latitude, longitude: longitude }}
          onDragEnd={(e) => {
            console.log(e.nativeEvent.coordinate);
          }}
        >
          <Icon
            name="ios-disc"
            size={25}
            type="Ionicons"
            color={color.primary}
          />
        </Marker>
        {foodStore.map((result) => {
          return (
            <Marker
              key={result._id}
              onPress={() => _onPressMarker(result)}
              title={result.name}
              coordinate={{
                latitude: result.latitude,
                longitude: result.longitude,
              }}
            />
          );
        })}
        {polyline && (
          <Polyline
            coordinates={polyline}
            strokeColor="#7f0"
            strokeColors={[
              '#7F0000',
              '#00000000',
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            strokeWidth={6} />
        )}
      </MapView>
      <Carousel
        data={dbCarousel}
        renderItem={_renderItem}
        containerCustomStyle={{
          position: "absolute",
          bottom: 0,
          marginBottom: 70,
        }}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={300}
      />
    </View>
  );
}
