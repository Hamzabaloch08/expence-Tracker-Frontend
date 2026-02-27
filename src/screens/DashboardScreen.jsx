import { View, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { getAllIncome } from "../redux/incomeThunks/incomeThunks";
import { getAllExpense } from "../redux/expenseThunks/expenseThunks";

export default function DashboardScreen() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { expenses } = useSelector((state) => state.expense);
    const { incomes } = useSelector((state) => state.income);

    useEffect(() => {
      dispatch(getAllIncome());
      dispatch(getAllExpense());
    }, []);

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalBalance = totalIncome - totalExpense;


  return (
    <View className="flex-1">
      {/* Green Top Section */}
      <LinearGradient
        colors={["#5DBDAB", "#4EAAA1", "#438F87"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingBottom: 60, paddingTop: 10 }}
      >
        {/* Header */}
        <View className="px-5 pt-14 pb-4">
          <Text className="text-white/70 text-lg">Good afternoon,</Text>
          <Text className="text-white text-3xl font-bold">
            {user?.fullName}
          </Text>
        </View>

      </LinearGradient>

      {/* Balance Card - outside gradient, overlapping on top */}
      <View className="mx-5 rounded-3xl p-6" style={{ marginTop: -60, backgroundColor: '#3D8B83' }}>
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            <Text className="text-white text-base opacity-80">
              Total Balance
            </Text>
            <Ionicons
              name="chevron-up"
              size={14}
              color="white"
              style={{ marginLeft: 4 }}
            />
          </View>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-white text-4xl font-medium mb-6">
          $ {totalBalance.toFixed(2)}
        </Text>

        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-white/20 rounded-full justify-center items-center mr-2">
              <Ionicons name="arrow-down" size={16} color="white" />
            </View>
            <View>
              <Text className="text-white/70 text-sm">Income</Text>
              <Text className="text-white text-lg font-semibold">
                ${totalIncome.toFixed(2)}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-white/20 rounded-full justify-center items-center mr-2">
              <Ionicons name="arrow-up" size={16} color="white" />
            </View>
            <View>
              <Text className="text-white/70 text-sm">Expenses</Text>
              <Text className="text-white text-lg font-semibold">
                ${totalExpense.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom spacer for tab bar */}
      <View className="h-20" />
    </View>
  );
}
