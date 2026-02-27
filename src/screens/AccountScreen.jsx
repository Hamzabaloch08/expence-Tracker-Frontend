import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../redux/authSlice/authSlice";

const AccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(logout());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      })
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-[#4EAAA1] pt-14 pb-10 px-5 items-center rounded-b-3xl">
        {/* Avatar */}
        <View className="w-20 h-20 bg-white/20 rounded-full justify-center items-center mb-3">
          <Ionicons name="person" size={40} color="white" />
        </View>
        <Text className="text-white text-xl font-bold">{user?.fullName}</Text>
        <Text className="text-white/70 text-sm mt-1">{user?.email}</Text>
      </View>

      {/* Menu Items */}
      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {/* Logout */}
        <TouchableOpacity
          className="bg-white rounded-2xl p-4 mb-8 flex-row items-center shadow-sm"
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <View className="w-11 h-11 bg-red-500/10 rounded-full justify-center items-center mr-3">
            <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          </View>
          <Text className="flex-1 text-red-500 text-base font-medium">Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;
