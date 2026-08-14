import {
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

import { Language } from "@/types/newResume";

interface Props {
  languages: Language[];
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
  },

  title: {
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
    gap: 10,
  },

  card: {
    width: "48%",
    border: "1 solid #dcdcdc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  language: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    fontSize: 10,
    color: "#ffffff",
  },
});

function getBadgeStyle(level: string) {
  switch (level.toLowerCase()) {
    case "native":
      return {
        backgroundColor: "#16a34a",
      };

    case "professional":
      return {
        backgroundColor: "#2563eb",
      };

    case "advanced":
      return {
        backgroundColor: "#7c3aed",
      };

    case "intermediate":
      return {
        backgroundColor: "#ca8a04",
      };

    default:
      return {
        backgroundColor: "#6b7280",
      };
  }
}

export default function PDFLanguages({
  languages,
}: Props) {
  if (!languages?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>
        Languages
      </Text>

      <View style={styles.grid}>
        {languages.map((language, index) => (
          <View
            key={index}
            style={styles.card}
            wrap={false}
          >
            <Text style={styles.language}>
              {language.language}
            </Text>

            <Text
              style={[
                styles.badge,
                getBadgeStyle(
                  language.proficiency
                ),
              ]}
            >
              {language.proficiency}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}