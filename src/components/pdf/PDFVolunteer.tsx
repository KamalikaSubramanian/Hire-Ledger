import {
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

import { VolunteerExperience } from "@/types/newResume";

interface Props {
  volunteer: VolunteerExperience[];
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

  card: {
    border: "1 solid #dcdcdc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },

  role: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },

  organization: {
    fontSize: 11,
    color: "#555",
    marginBottom: 3,
  },

  duration: {
    fontSize: 10,
    color: "#777",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },

  bullet: {
    fontSize: 11,
    marginBottom: 3,
    lineHeight: 1.6,
    color: "#444",
  },
});

export default function PDFVolunteer({
  volunteer,
}: Props) {
  if (!volunteer?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Volunteer Experience
      </Text>

      {volunteer.map((item, index) => (
        <View
          key={index}
          style={styles.card}
          wrap={false}
        >
          <Text style={styles.role}>
            {item.role}
          </Text>

          {item.organization && (
            <Text style={styles.organization}>
              {item.organization}
            </Text>
          )}

          {item.duration && (
            <Text style={styles.duration}>
              {item.duration}
            </Text>
          )}

          {item.responsibilities?.length > 0 && (
            <>
              <Text style={styles.subtitle}>
                Responsibilities
              </Text>

              {item.responsibilities.map(
                (responsibility, i) => (
                  <Text
                    key={i}
                    style={styles.bullet}
                  >
                    • {responsibility}
                  </Text>
                )
              )}
            </>
          )}
        </View>
      ))}
    </View>
  );
}