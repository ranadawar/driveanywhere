import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AppScreen from "../components/AppScreen";
import { FONTS } from "../constants/index";
import colors from "../config/colors";
import AppHeader from "../components/AppHeader";
import { TripsContext } from "../context/tripsContext";
import { FlatList } from "react-native";
import { UserContext } from "../context/userContext";
import { ScrollView } from "react-native";
import Ccard from "../components/Ccard";
import AppTextInput from "../components/AppTextInput";
import { useNavigation } from "@react-navigation/native";

const AdminCompletedRides = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const { trips, setTrips } = React.useContext(TripsContext);

  const { user, setUser } = React.useContext(UserContext);

  const [ridesData, setRidesData] = React.useState([]);

  //get all completed trips where driverId is equal to the current user id
  const completedTrips = trips.filter(
    (trip) => trip.requestStatus === "completed"
  );

  useEffect(() => {
    console.log("completedTrips", completedTrips);
    setRidesData(completedTrips);
  }, []);

  const handleSearch = (value) => {
    if (!value.length) return setRidesData(ridesData);

    const filteredData = ridesData.filter((item) =>
      item.tripId.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredData.length) {
      setRidesData(filteredData);
    } else {
      setRidesData(ridesData);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {ridesData.length >= 1 && (
        <View style={styles.mainContainer}>
          <View>
            <AppTextInput
              icon="magnify"
              placeholder="Search by Ride#"
              onChangeText={(text) => handleSearch(text)}
            />
          </View>
          <ScrollView>
            <Text style={styles.text}>Completed Rides</Text>
            <FlatList
              data={ridesData}
              keyExtractor={(item) => item.docID.toString()}
              renderItem={({ item }) => (
                <Ccard
                  rideNumber={item.tripId}
                  onPress={() =>
                    navigation.navigate("completedDetailsAdmin", item)
                  }
                />
              )}
            />
          </ScrollView>
        </View>
      )}
      {ridesData.length === 0 && (
        <View style={styles.mainContainer}>
          <Text style={styles.text}>No Completed Rides</Text>
        </View>
      )}
    </View>
  );
};

export default AdminCompletedRides;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    alignSelf: "center",
    marginVertical: 15,
    color: colors.gray,
  },
});