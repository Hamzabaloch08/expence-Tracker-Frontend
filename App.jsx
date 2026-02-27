import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/navigation/Navigator";
import "./global.css"
import { Provider } from "react-redux";
import store from "./src/redux/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
