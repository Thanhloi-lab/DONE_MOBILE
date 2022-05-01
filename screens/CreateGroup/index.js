import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import CheckBox from "expo-checkbox";

import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";

const CreateGroup = () => {
  const data = [
    {
      id: 1,
      name: "khang",
      email: "dokhang@gmail.com",
    },
    {
      id: 2,
      name: "loi",
      email: "loicao@gmail.com",
    },
    {
      id: 3,
      name: "hien",
      email: "hienthanh@gmail.com",
    },
    {
      id: 4,
      name: "duy",
      email: "duythanh@gmail.com",
    },
  ];

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const image =
    "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
  const handlesSelect = (id, value) => {
    value
      ? setSelectedItems((prev) => [...prev, id])
      : setSelectedItems((prev) => prev.filter((item) => item !== id));
  };

  const renderItem = (item) => {
    const isChosen =
      selectedItems.find((selected) => selected === item.item.id) !== undefined;

    return (
      <View
        style={{
          flexDirection: "column",
          alignSelf: "stretch",
        }}
      >
        <View style={styles.itemCell}>
          <CheckBox
            value={isChosen}
            onValueChange={(value) => handlesSelect(item.item.id, value)}
          />
        </View>
        <View style={styles.itemCell}>
          <Text>{item.item.name}</Text>
        </View>
        <View style={styles.itemCell}>
          <Text>{item.item.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, color: "#333333", fontWeight: "bold" }}>
          CREATE GROUP
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Group's name: </Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(value) => {
            setName(value);
          }}
          placeholder="Enter your group's name..."
        />
      </View>
      {nameError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Name is required</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Members: </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {selectedItems.map((item) => (
          <View
            key={item}
            style={{ margin: 5, borderWidth: 1, borderRadius: 50 }}
          >
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={{ uri: image }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 0,
                backgroundColor: "red",
                borderRadius: 50,
                width: 15,
                height: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => handlesSelect(item, false)}
            >
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={{ color: "white", fontSize: 15 }}>CREATE GROUP</Text>
      </TouchableOpacity>

      <View
        style={{
          alignItems: "center",
          borderRadius: 25,
          borderColor: "black",
          borderWidth: 1,
          height: 300,
          marginTop: 10,
          paddingTop: 5,
        }}
      >
        <TouchableOpacity
          style={{
            marginLeft: 5,
            height: 50,
            backgroundColor: "#e6e6e6",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            paddingHorizontal: 10,
          }}
        >
          <Text>Reload</Text>
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(value) => {
              setName(value);
            }}
            placeholder="Enter name or email."
          />
          <TouchableOpacity
            style={{
              marginLeft: 5,
              width: 50,
              height: 50,
              backgroundColor: "#e6e6e6",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text>icon</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{
            alignSelf: "stretch",
          }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "90%",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    paddingHorizontal: 25,
    borderRadius: 25,
    color: "#666666",
    backgroundColor: "#e6e6e6",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    paddingVertical: 4,
    paddingLeft: 20,
    marginBottom: 10,
  },
  errorText: {
    color: "#c80000",
  },
  button: {
    fontSize: 15,
    backgroundColor: "#57b846",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    height: 50,
    marginTop: 20,
  },
  itemCell: {
    alignItems: "center",
    borderColor: "rgba(204, 204, 204, 0.452)",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
});

export default CreateGroup;
