import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-rapi-ui";
import { supabase } from "../initSupabase";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Button
        status="danger"
        text="Logout"
        onPress={async () => {
          const { error } = await supabase.auth.signOut();
          if (!error) {
            alert("Signed out!");
          }
          if (error) {
            alert(error.message);
          }
        }}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
});

export default HomeScreen;
