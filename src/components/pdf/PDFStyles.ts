import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 35,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#222",
    lineHeight: 1.5,
    backgroundColor: "#ffffff",
  },

  section: {
    marginTop: 15,
  },

  heading: {
    fontSize: 15,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    paddingBottom: 4,
    marginBottom: 8,
  },

  subHeading: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },

  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  column: {
    flexDirection: "column",
  },

  badge: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 10,
  },

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  bullet: {
    flexDirection: "row",
    marginBottom: 4,
  },

  bulletPoint: {
    width: 10,
    fontWeight: "bold",
  },

  bulletText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.5,
  },

  smallText: {
    fontSize: 10,
    color: "#666",
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 8,
  },
});

export default styles;