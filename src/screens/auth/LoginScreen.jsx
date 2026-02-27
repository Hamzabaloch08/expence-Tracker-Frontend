import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/authThunks/authThunks";
import { clearError } from "../../redux/authSlice/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { loading, error, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            AsyncStorage.setItem("token", token);
            navigation.reset({ index: 0, routes: [{ name: "Main" }] });
        }
    }, [token]);

    useEffect(() => {
        if (error) {
            Alert.alert("Error", error, [
                { text: "OK", onPress: () => dispatch(clearError()) }
            ]);
        }
    }, [error]);

    const login = (email, password) => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        dispatch(loginThunk({ email, password }));
    }

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View className="pt-16 px-8 mb-8">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-10 h-10 bg-gray-100 rounded-full justify-center items-center mb-8"
                    >
                        <Ionicons name="arrow-back" size={20} color="#333" />
                    </TouchableOpacity>

                    <Text className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome Back
                    </Text>
                    <Text className="text-gray-400 text-base">
                        Sign in to continue tracking your expenses
                    </Text>
                </View>

                {/* Form */}
                <View className="px-8">
                    {/* Email */}
                    <Text className="text-gray-600 text-sm font-medium mb-2">Email</Text>
                    <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 mb-5">
                        <Ionicons name="mail-outline" size={20} color="#aaa" />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={{ flex: 1, height: 50, paddingHorizontal: 12, fontSize: 14, color: "#1f2937" }}
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    {/* Password */}
                    <Text className="text-gray-600 text-sm font-medium mb-2">Password</Text>
                    <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 mb-3">
                        <Ionicons name="lock-closed-outline" size={20} color="#aaa" />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password"
                            secureTextEntry={!showPassword}
                            style={{ flex: 1, height: 50, paddingHorizontal: 12, fontSize: 14, color: "#1f2937" }}
                            placeholderTextColor="#aaa"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                size={20}
                                color="#aaa"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity className="self-end mb-8">
                        <Text className="text-[#4EAAA1] text-sm font-medium">
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={() => login(email, password)}
                        disabled={loading}
                        className={`py-4 rounded-full items-center mb-6 ${loading ? "bg-[#4EAAA1]/60" : "bg-[#4EAAA1]"}`}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-lg font-semibold">
                            {loading ? "Logging In..." : "Log In"}
                        </Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View className="flex-row items-center mb-6">
                        <View className="flex-1 h-[1px] bg-gray-200" />
                        <Text className="text-gray-400 text-sm mx-4">Or continue with</Text>
                        <View className="flex-1 h-[1px] bg-gray-200" />
                    </View>

                    {/* Social Buttons */}
                    <View className="flex-row justify-center gap-4 mb-8">
                        <TouchableOpacity className="w-14 h-14 bg-gray-100 rounded-full justify-center items-center">
                            <Ionicons name="logo-google" size={24} color="#DB4437" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-14 h-14 bg-gray-100 rounded-full justify-center items-center">
                            <Ionicons name="logo-apple" size={24} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-14 h-14 bg-gray-100 rounded-full justify-center items-center">
                            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Sign Up Link */}
                <View className="items-center pb-10">
                    <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
                        <Text className="text-gray-400 text-sm">
                            {"Don't have an account? "}
                            <Text className="text-[#4EAAA1] font-semibold">Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
