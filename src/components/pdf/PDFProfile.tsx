import {
  View,
  Text,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import { Profiles } from "@/types/newResume";

interface Props {
  profiles: Profiles;
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
  },

  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2563eb",
    borderBottomWidth: 1,
    borderBottomColor: "#2563eb",
    paddingBottom: 3,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },

  card: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },

  label: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
  },

  link: {
    fontSize: 9,
    color: "#2563eb",
    textDecoration: "underline",
    wordBreak: "break-all",
  },

  otherHeading: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 11,
    fontWeight: "bold",
  },

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  badge: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 9,
    marginBottom: 4,
  },
});

export default function ProfilesPDF({
  profiles,
}: Props) {
  if (!profiles) return null;

  const profileFields = [
    {
      key: "linkedin",
      label: "LinkedIn",
    },
    {
      key: "github",
      label: "GitHub",
    },
    {
      key: "portfolio",
      label: "Portfolio",
    },
    {
      key: "website",
      label: "Website",
    },
    {
      key: "leetcode",
      label: "LeetCode",
    },
    {
      key: "hackerrank",
      label: "HackerRank",
    },
    {
      key: "codechef",
      label: "CodeChef",
    },
    {
      key: "stackoverflow",
      label: "Stack Overflow",
    },
  ] as const;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Professional Profiles
      </Text>

      <View style={styles.grid}>
        {profileFields.map((field) => {
          const value = profiles[field.key];

          if (!value) return null;

          return (
            <View
              key={field.key}
              style={styles.card}
            >
              <Text style={styles.label}>
                {field.label}
              </Text>

              <Link
                src={value}
                style={styles.link}
              >
                {value}
              </Link>
            </View>
          );
        })}
      </View>

      {profiles.other &&
        profiles.other.length > 0 && (
          <>
            <Text style={styles.otherHeading}>
              Other Profiles
            </Text>

            <View style={styles.badgeContainer}>
              {profiles.other.map((item, index) => (
                <Text
                  key={index}
                  style={styles.badge}
                >
                  {item}
                </Text>
              ))}
            </View>
          </>
        )}
    </View>
  );
}