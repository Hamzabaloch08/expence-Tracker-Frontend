import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white pb-10">
      {/* Top Section - Character with circles */}
      <View className="flex-1 justify-center items-center relative mt-10">
        {/* Left circle - on left hand */}
        <Image
          source={require("../../../assets/images/left.png")}
          className="absolute left-[24%] top-[26%] w-16 h-16 z-10"
          resizeMode="contain"
        />

        {/* Right circle - on right hand */}
        <Image
          source={require("../../../assets/images/right.png")}
          className="absolute right-[24%] top-[29%] w-16 h-16 z-10"
          resizeMode="contain"
        />

        {/* Man character */}
        <Image
          source={require("../../../assets/images/man.png")}
          style={{ width: width * 0.7, height: width * 0.85 }}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Section - Text and Buttons */}
      <View className="items-center pb-10 px-8">
        {/* Title */}
        <Text className="text-4xl font-bold text-[#438883] text-center leading-10 mb-8">
          Spend Smarter{"\n"}Save More
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          className="bg-[#4EAAA1] w-full py-4 rounded-full items-center mb-4"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </TouchableOpacity>

        {/* Already Have Account */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.7}
        >
          <Text className="text-gray-400 text-sm">
            Already Have Account?{" "}
            <Text className="text-[#4EAAA1] font-semibold">Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
