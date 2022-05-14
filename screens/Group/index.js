import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React from "react";
import { useState } from "react";
import { FONTS, COLORS, SIZES, icons, dummyData } from "../../constants";
import {
  HorizontalGroupCard,
  HorizontalProjectCard,
  VerticalFoodCard,
} from "../../components";

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
            Show all
          </Text>
        </TouchableOpacity>
      </View>

      {/* content */}
      {children}
    </View>
  );
};

const Group = ({ navigation }) => {
  const [selectedStatus, setSelectedStatus] = React.useState(1);

  const [listProject, setListProject] = React.useState([]);

  React.useEffect(() => {
    handleChangeStatus(selectedStatus);
  }, []);

  function handleChangeStatus(status) {
    //retrieve recommend list
    if (status === "My Own Group") {
      let selectedProjectWithSTatus = dummyData.allTask.filter(
        (a) => a.userCreateGroup === dummyData.myProfile.id
      );
      let projects = [];
      selectedProjectWithSTatus.forEach((project) => {
        let item = {
          idGroup: project.idGroup,
          idProject: project.idProject,
          mailUserCreateGroup: project.mailUserCreateGroup,
          mailUserCreateProject: project.mailUserCreateGroup,
          nameGroup: project.nameGroup,
          nameProject: project.nameProject,
          nameUserCreateGroup: project.nameUserCreateGroup,
          nameUserCreateProject: project.nameUserCreateProject,
          phoneUserCreateGroup: project.phoneUserCreateGroup,
          phoneUserCreateProject: project.phoneUserCreateProject,
          projectCreateDate: project.projectCreateDate,
          userCreateGroup: project.userCreateGroup,
          userCreateProject: project.userCreateProject,
        };
        projects.push(item);
      });
      setListProject(projects);
    } else {
      let selectedProjectWithSTatus = dummyData.allTask.filter(
        (a) => a.userCreateProject !== dummyData.myProfile.id
      );
      let projects = [];
      selectedProjectWithSTatus.forEach((project) => {
        let item = {
          idGroup: project.idGroup,
          idProject: project.idProject,
          mailUserCreateGroup: project.mailUserCreateGroup,
          mailUserCreateProject: project.mailUserCreateGroup,
          nameGroup: project.nameGroup,
          nameProject: project.nameProject,
          nameUserCreateGroup: project.nameUserCreateGroup,
          nameUserCreateProject: project.nameUserCreateProject,
          phoneUserCreateGroup: project.phoneUserCreateGroup,
          phoneUserCreateProject: project.phoneUserCreateProject,
          projectCreateDate: project.projectCreateDate,
          userCreateGroup: project.userCreateGroup,
          userCreateProject: project.userCreateProject,
        };
        projects.push(item);
      });
      setListProject(projects);
    }
  }

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {/* Icon */}
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />

        {/* Text input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder="Search group...."
        />

        {/* Filter Button */}
        <TouchableOpacity>
          <Image
            source={icons.filter}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
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
              <TextInput placeholder="Name group..." />
            </KeyboardAvoidingView>

            <TouchableOpacity
              style={[styles.buttonModal, styles.buttonClose, { marginTop: 10 }]}
              onPress={() => setModalVisible(!modalVisible)}
            >

              <Text style={styles.textStyle}>Create group</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonModal, styles.buttonClose, { backgroundColor: "black", }]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* search */}
      {renderSearch()}

      <View>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <View>
            <Text style={FONTS.h4}>
              CREATE YOUR GROUP
            </Text>
          </View>

        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          paddingBottom: 5,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={() => {
            setSelectedStatus(dummyData.CATEGORY_DEFAULT_GROUP[0].status);
            handleChangeStatus(dummyData.CATEGORY_DEFAULT_GROUP[0].status);
          }}
        >
          <Text
            style={{
              color:
                selectedStatus === dummyData.CATEGORY_DEFAULT_GROUP[0].status
                  ? COLORS.primary
                  : COLORS.black,
              ...FONTS.h4,
            }}
          >
            {dummyData.CATEGORY_DEFAULT_GROUP[0].status}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={() => {
            setSelectedStatus(dummyData.CATEGORY_DEFAULT_GROUP[1].status);
            handleChangeStatus(dummyData.CATEGORY_DEFAULT_GROUP[1].status);
          }}
        >
          <Text
            style={{
              color:
                selectedStatus === dummyData.CATEGORY_DEFAULT_GROUP[1].status
                  ? COLORS.primary
                  : COLORS.black,
              ...FONTS.h4,
            }}
          >
            {dummyData.CATEGORY_DEFAULT_GROUP[1].status}
          </Text>
        </TouchableOpacity>
      </View>
      {/* List*/}
      <FlatList
        style={{ flex: 1 }}
        data={listProject}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={
        //     <View style={{ flex: 1}}>
        //         {/*project types */}
        //         {renderMenuTypes()}
        //     </View>
        // }
        renderItem={({ item, index }) => {
          return (
            <HorizontalGroupCard
              containerStyle={{
                height: 150,
                justifyContent: "center",
                marginHorizontal: SIZES.padding,
                marginBottom:
                  index == listProject.length - 1 ? 200 : SIZES.radius,
              }}
              item={item}
              onPress={() => {
                navigation.navigate("GroupDetail", { groupId: item.idGroup });
              }}
            />
          );
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  button: {
    fontSize: 15,
    backgroundColor: "linen",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 40,

    margin: 10,
    marginRight: "20%",
    marginLeft: "20%",

    shadowColor: "navy",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    borderWidth: 3,
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
  buttonModal: {
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


export default Group;
