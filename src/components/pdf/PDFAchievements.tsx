import {
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

import { Achievement } from "@/types/newResume";

interface Props {
  achievements: Achievement[];
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

  card: {
    border: "1 solid #dcdcdc",
    borderRadius: 5,
    padding: 12,
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  achievementTitle: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },

  year: {
    fontSize: 10,
    color: "#666",
  },

  badge: {
    marginTop: 6,
    alignSelf: "flex-start",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 9,
  },

  description: {
    marginTop: 10,
    fontSize: 11,
    lineHeight: 1.6,
    color: "#444",
    textAlign: "justify",
  },
});

export default function PDFAchievements({
  achievements,
}: Props) {
  if (!achievements?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>
        Achievements
      </Text>

      {achievements.map((achievement, index) => (
        <View
          key={index}
          style={styles.card}
          wrap={false}
        >
          <View style={styles.header}>
            <Text style={styles.achievementTitle}>
              {achievement.title}
            </Text>

            {achievement.year && (
              <Text style={styles.year}>
                {achievement.year}
              </Text>
            )}
          </View>

          {achievement.type && (
            <Text style={styles.badge}>
              {achievement.type}
            </Text>
          )}

          {achievement.description && (
            <Text style={styles.description}>
              {achievement.description}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}