import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, dummyData, SIZES } from "../../constants";
import { HorizontalGroupCard, HorizontalProjectCard } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
const GroupDetail = (props) => {
  const [projects, setProjects] = useState(dummyData.allTask);
  const [modalVisible, setModalVisible] = useState(false);

  const groupId = props.route.params.groupId;
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <KeyboardAvoidingView>
              <TextInput placeholder="Name..." />
            </KeyboardAvoidingView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Create project</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View>
        <View style={{ marginHorizontal: 10, paddingVertical: 10 }}>
          <TouchableOpacity
            style={{
              borderRadius: 50,
              width: 40,
              height: 40,
              backgroundColor: COLORS.COMPLETED1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                fontSize: 30,
                color: "white",
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              +
            </Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: COLORS.COMPLETED,
              borderRadius: 50,
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ fontSize: SIZES.h2, fontWeight: "bold" }}>
              Group: {projects[0].nameGroup}
            </Text>
            <Text>Creator: {projects[0].nameUserCreateGroup}</Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
        <FlatList
          // style={{ flex: 1 }}
          vertical
          data={projects}
          keyExtractor={(item) => item.idTask}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <HorizontalProjectCard
                containerStyle={{
                  height: 150,
                  justifyContent: "center",
                  marginHorizontal: SIZES.padding,
                  marginBottom:
                    index == projects.length - 1 ? 200 : SIZES.radius,
                }}
                item={item}
              />
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginBottom: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default GroupDetail;
