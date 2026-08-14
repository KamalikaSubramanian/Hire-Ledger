import {
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

import { ProfessionalHighlight } from "@/types/newResume";

interface Props {
  highlights: ProfessionalHighlight[];
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottom: 1,
    borderColor: "#ddd",
    paddingBottom: 4,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    border: "1 solid #dcdcdc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f8fafc",
  },

  title: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#111827",
  },

  description: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#4b5563",
    textAlign: "justify",
  },
});

export default function PDFProfessionalHighlights({
  highlights,
}: Props) {
  if (!highlights?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Professional Highlights
      </Text>

      <View style={styles.grid}>
        {highlights.map((highlight, index) => (
          <View
            key={index}
            style={styles.card}
            wrap={false}
          >
            <Text style={styles.title}>
              {highlight.title}
            </Text>

            <Text style={styles.description}>
              • {highlight.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}