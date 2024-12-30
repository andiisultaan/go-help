import { SafeAreaProvider } from "react-native-safe-area-context";
// import { ApolloProvider } from "@apollo/client";
// import { LoginProvider } from "./context/LoginContext";
// import client from "./config/apollo";
import StackHolder from "./stacks/Stacks";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function App() {
  return (
    // <ApolloProvider client={client}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaProvider>
        <StackHolder />
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
    // </ApolloProvider>
  );
}
