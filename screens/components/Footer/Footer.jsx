import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import ContactUs from "../../Pages/ContactUs";

export default function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={styles.contentContainer}>
          <Image
            source={require("../../../assets/zamedia_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.text}>© 2024, za:media GmbH.</Text>
          <Text style={styles.ptImgText}>Made with ♥ in Mannheim.</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Germany</Text>
          <Text style={styles.address}>za:media® GmbH</Text>
          <Text style={styles.address}>
            Goethestraße 16a{"\n"}
            D-68161 Mannheim{"\n"}
            Germany
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Work inquiries</Text>
          <View style={styles.contactContainer}>
            <TouchableOpacity style={styles.iconContainer}>
              <Text style={styles.icon}>☎️</Text>
            </TouchableOpacity>
            <Text style={styles.contactText}>+49621 38072677</Text>
          </View>
          <View style={styles.contactContainer}>
            <TouchableOpacity style={styles.iconContainer}>
              <Text style={styles.icon}>✉️</Text>
            </TouchableOpacity>
            <Text style={styles.contactText}>info@zamedia.de</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.linksContainer}>
            <TouchableOpacity>
              <Text style={[styles.link, styles.txtThemeOrange]}>Imprint</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>/</Text>
            <TouchableOpacity>
              <Text style={[styles.link, styles.txtThemeOrange]}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Raabta / Need Help?</Text>
          <Text style={styles.contact}>
            If you want to give us feedback or have discovered a bug, please{" "}
            <Text style={[styles.link, styles.txtThemeOrange]} onPress={() => setShowPopup(true)}>
              contact us here.
            </Text>
          </Text>
        </View>
        {/* {showPopup && <ContactUs onClose={() => setShowPopup(false)} />} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    backgroundColor: "#ECECED",
    minHeight: "30%", // Minimum height of 30% of screen height
    paddingVertical: 20,
    paddingHorizontal: 13,
  },
  contentContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 170,
    paddingTop: 5,
  },
  text: {
    margin: 0,
    padding: 0,
  },
  ptImgText: {
    paddingTop: 25,
  },
  header: {
    fontWeight: "bold",
  },
  address: {
    marginVertical: 0,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    fontSize: 20,
  },
  contactText: {
    flex: 1,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#DBDBDB",
    marginVertical: 8,
  },
  linksContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  link: {
    color: "#007bff",
    marginRight: 5,
  },
  txtThemeOrange: {
    color: "orange",
  },
  separator: {
    marginHorizontal: 5,
  },
  contact: {
    marginTop: 12,
  },
});
