import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Adjust based on the icon library you're using
import { setFilter } from "../../../../slices/todaSlice"; // Adjust the import according to your project structure

const FilterNav = ({ filter, icon, title, badgeColor, badgeCount }) => {
  const { currentFilter } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setFilter(filter));
  };

  return (
    <TouchableOpacity onPress={handleClick} style={styles.navItem}>
      <View style={styles.filterContent}>
        <Text style={styles.title}>{title}</Text>
        {badgeCount > 0 && (
          <View style={[styles.customBadge, styles[`bg${badgeColor}`]]}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#f39224",
  },
  customBadge: {
    backgroundColor: "#f39224",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: "white",
    fontSize: 14,
  },
  bgorange: {
    backgroundColor: "#f39224",
  },
  bgred: {
    backgroundColor: "#dc3545",
  },
});

export default FilterNav;
