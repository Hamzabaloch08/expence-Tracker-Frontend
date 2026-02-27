import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-gifted-charts";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpense, addExpenseThunk, deleteExpenseThunk } from "../redux/expenseThunks/expenseThunks";
import DateTimePicker from "@react-native-community/datetimepicker";
import { File, Directory, Paths } from "expo-file-system";
import { shareAsync } from "expo-sharing";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

const ExpenceScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [date, setDate] = useState(new Date());
  const [showCalender, setShowCalender] = useState(false);

  const dispatch = useDispatch()
  const { expenses, loading } = useSelector((state) => state.expense)
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    dispatch(getAllExpense());
  }, [])


  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(a.date) - new Date(b.date)

    
  );

  const chartData = sortedExpenses.map((expense) => {
    const dateObj = new Date(expense.date);
    const day = dateObj.getDate();
    const monthName = dateObj.toLocaleString("en-US", { month: "short" });

    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    if (day === 2 || day === 22) suffix = "nd";
    if (day === 3 || day === 23) suffix = "rd";

    return {
      value: expense.amount,
      label: `${day}${suffix} ${monthName}`,
      labelTextStyle: { color: "#aaa", fontSize: 9, width: 70, textAlign: "center" },
      category: expense.category,
      title: expense.title,
    };
  });

  const openAddModal = () => {
    setTitle("");
    setAmount("");
    setSelectedCategory("Food");
    setDate(new Date());
    setModalVisible(true);
  };

  const onDateChange = (_event, selectedDate) => {
    if (Platform.OS === "android") setShowCalender(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleSave = () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    dispatch(addExpenseThunk({
      title: title.trim(),
      amount: parseFloat(amount),
      category: selectedCategory,
      date: date.toISOString(),
    }));

    setModalVisible(false);
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Expense", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => dispatch(deleteExpenseThunk(id)) },
    ]);
  };

  const handleDownload = async () => {
    try {
      const dest = new File(new Directory(Paths.cache), "expenses.xlsx");
      if (dest.exists) dest.delete();
      const file = await File.downloadFileAsync(
        "https://expence-tracker-backend-rose.vercel.app/api/expense/download",
        dest,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await shareAsync(file.uri);
    } catch (error) {
      Alert.alert("Error", "Download failed: " + error.message);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Food: "fast-food-outline",
      Transport: "car-outline",
      Shopping: "cart-outline",
      Bills: "receipt-outline",
      Entertainment: "game-controller-outline",
      Other: "ellipsis-horizontal-circle-outline",
    };
    return icons[category] || "ellipsis-horizontal-circle-outline";
  };


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-500 text-lg">Loading....</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-[#4EAAA1] pt-14 pb-8 px-5 rounded-b-3xl">
        <Text className="text-white text-xl font-bold mb-1">Expenses</Text>
        <Text className="text-white/70 text-sm">Total this month</Text>
        <Text className="text-white text-3xl font-bold mt-1">
          $ {totalExpenses.toFixed(2)}
        </Text>
      </View>

      {/* Expense Chart */}
      <View
        style={{
          backgroundColor: "white",
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: 16,
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        {/* Chart Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <View>
            <Text style={{ color: "#1f2937", fontSize: 18, fontWeight: "bold" }}>Expense Overview</Text>
            <Text style={{ color: "#9ca3af", fontSize: 12, marginTop: 2 }}>
              Track your spending trends over time
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              onPress={handleDownload}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#4EAAA1",
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Ionicons name="download-outline" size={16} color="#4EAAA1" />
              <Text style={{ color: "#4EAAA1", fontSize: 12, fontWeight: "600", marginLeft: 4 }}>Excel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openAddModal}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#7C5CFC",
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Ionicons name="add" size={16} color="#7C5CFC" />
              <Text style={{ color: "#7C5CFC", fontSize: 12, fontWeight: "600", marginLeft: 4 }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chart */}
        {chartData.length < 2 ? (
          <View style={{ alignItems: "center", paddingVertical: 40 }}>
            <Ionicons name="bar-chart-outline" size={40} color="#ddd" />
            <Text style={{ color: "#aaa", fontSize: 13, marginTop: 8 }}>Add at least 2 expenses to see the chart</Text>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
            <LineChart
              data={chartData}
              height={200}
              spacing={55}
              adjustToWidth={false}
              color="#7C5CFC"
              thickness={2.5}
              dataPointsColor="#7C5CFC"
              dataPointsRadius={4}
              curved
              areaChart
              startFillColor="rgba(124,92,252,0.2)"
              endFillColor="rgba(124,92,252,0.02)"
              startOpacity={0.25}
              endOpacity={0.02}
              yAxisColor="transparent"
              xAxisColor="#e5e7eb"
              yAxisTextStyle={{ color: "#bbb", fontSize: 10 }}
              hideRules={false}
              rulesType="solid"
              rulesColor="#f3f4f6"
              noOfSections={4}
              maxValue={1000}
              initialSpacing={15}
              endSpacing={15}
              pointerConfig={{
                pointerStripColor: "rgba(124,92,252,0.15)",
                pointerStripWidth: 1,
                pointerColor: "#7C5CFC",
                radius: 5,
                strokeWidth: 2,
                strokeColor: "white",
                pointerLabelWidth: 150,
                pointerLabelHeight: 70,
                activatePointersOnLongPress: false,
                autoAdjustPointerLabelPosition: true,
                pointerLabelComponent: (items) => {
                  const point = items[0];
                  const idx = chartData.findIndex(
                    (d) => d.value === point.value && d.label === point.label
                  );
                  const info = idx >= 0 ? chartData[idx] : null;
                  return (
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.12,
                        shadowRadius: 8,
                        elevation: 5,
                        borderWidth: 0.5,
                        borderColor: "#eee",
                      }}
                    >
                      <Text style={{ color: "#374151", fontWeight: "bold", fontSize: 13 }}>
                        {info?.category || "Expense"}
                      </Text>
                      <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 3 }}>
                        Amount: <Text style={{ color: "#7C5CFC", fontWeight: "bold" }}>${point.value.toFixed(0)}</Text>
                      </Text>
                    </View>
                  );
                },
              }}
            />
          </ScrollView>
        )}
      </View>

      {/* Expense List */}
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {expenses.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="receipt-outline" size={60} color="#ccc" />
            <Text className="text-gray-400 text-base mt-4">No expenses yet</Text>
          </View>
        ) : (
          expenses.map((item) => (
            <View
              key={item._id}
              className="bg-white rounded-2xl p-4 mb-3 flex-row items-center shadow-sm"
            >
              {/* Category Icon */}
              <View className="w-12 h-12 bg-[#4EAAA1]/10 rounded-full justify-center items-center mr-3">
                <Ionicons name={getCategoryIcon(item.category)} size={22} color="#4EAAA1" />
              </View>

              {/* Info */}
              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">{item.title}</Text>
                <Text className="text-gray-400 text-xs mt-0.5">
                  {item.category} • {formatDate(item.date)}
                </Text>
              </View>

              {/* Amount */}
              <Text className="text-red-500 text-base font-bold mr-3">
                -${item.amount.toFixed(2)}
              </Text>

              {/* Actions */}
              <TouchableOpacity onPress={() => handleDelete(item._id)} className="p-1.5">
                <Ionicons name="trash-outline" size={18} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))
        )}
        <View className="h-24" />
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10">
              {/* Modal Header */}
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold text-gray-800">
                  Add Expense
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#999" />
                </TouchableOpacity>
              </View>

              {/* Title Input */}
              <Text className="text-gray-500 text-sm mb-1.5">Title</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Grocery Shopping"
                className="bg-gray-100 rounded-xl px-4 py-3.5 text-base mb-4 text-gray-800"
                placeholderTextColor="#aaa"
              />

              {/* Amount Input */}
              <Text className="text-gray-500 text-sm mb-1.5">Amount ($)</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
                className="bg-gray-100 rounded-xl px-4 py-3.5 text-base mb-4 text-gray-800"
                placeholderTextColor="#aaa"
              />

              {/* Date Picker */}
              <Text className="text-gray-500 text-sm mb-1.5">Date</Text>
              <TouchableOpacity
                onPress={() => setShowCalender(true)}
                className="bg-gray-100 rounded-xl px-4 py-3.5 mb-4 flex-row items-center justify-between"
              >
                <Text className="text-base text-gray-800">
                  {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#4EAAA1" />
              </TouchableOpacity>

              {/* ANDROID */}
              {Platform.OS === "android" && showCalender && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  themeVariant="light"
                />
              )}

              {/* IOS */}
              {Platform.OS === "ios" && showCalender && (
                <Modal visible={showCalender} transparent animationType="fade">
                  <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-white rounded-t-3xl pt-4 pb-8 px-5">
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={onDateChange}
                        themeVariant="light"
                      />
                      <TouchableOpacity
                        onPress={() => setShowCalender(false)}
                        className="bg-[#4EAAA1] py-3 rounded-full items-center mt-4"
                      >
                        <Text className="text-white text-base font-semibold">Done</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              )}

              {/* Category Selector */}
              <Text className="text-gray-500 text-sm mb-2">Category</Text>
              <View className="flex-row flex-wrap gap-2 mb-6">
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full ${selectedCategory === cat ? "bg-[#4EAAA1]" : "bg-gray-100"
                      }`}
                  >
                    <Text
                      className={`text-sm ${selectedCategory === cat ? "text-white font-semibold" : "text-gray-600"
                        }`}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Save Button */}
              <TouchableOpacity
                onPress={handleSave}
                className="bg-[#4EAAA1] py-4 rounded-full items-center"
              >
                <Text className="text-white text-lg font-semibold">
                  Add Expense
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
};

export default ExpenceScreen;
