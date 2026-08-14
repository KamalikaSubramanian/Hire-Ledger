import {
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

import { Contact } from "@/types/newResume";

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    alignItems: "center",
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12, // Gap between name and contact
  },

  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  contactText: {
    fontSize: 10,
    color: "#666666",
    lineHeight: 1.6,
  },

  separator: {
    fontSize: 10,
    color: "#666666",
    marginHorizontal: 6,
  },
});

interface Props {
  contact: Contact;
}

export default function PDFHeader({
  contact,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Name */}
      <Text style={styles.name}>
        {contact.name}
      </Text>

      {/* Contact Details */}
      <View style={styles.contactRow}>
        <Text style={styles.contactText}>
          {contact.email}
        </Text>

        <Text style={styles.separator}>|</Text>

        <Text style={styles.contactText}>
          {contact.phone}
        </Text>

        <Text style={styles.separator}>|</Text>

        <Text style={styles.contactText}>
          {contact.location}
        </Text>
      </View>
    </View>
  );
}

