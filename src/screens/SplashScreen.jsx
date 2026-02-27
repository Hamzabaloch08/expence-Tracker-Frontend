import { Text } from "react-native";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { checkToken } from "../redux/authThunks/authThunks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const result = await dispatch(checkToken(token)).unwrap();
          if (result) {
            navigation.replace("Main");
            return;
          }
        }
      } catch (error) {
        await AsyncStorage.removeItem("token");
      }

      navigation.replace("Onboarding");
    };

    setTimeout(verifyToken, 2000);
  }, []);

  return (
    <LinearGradient
      colors={["#1B5C58", "#2F7E79"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text className="text-white text-3xl font-bold tracking-wider">
        Expense Tracker
      </Text>
    </LinearGradient>
  );
};

export default SplashScreen;
