import { View, Text } from "@react-pdf/renderer";

import { Internship } from "@/types/newResume";
import styles from "./PDFStyles";

interface Props {
  internships: Internship[];
}

export default function PDFInternships({
  internships,
}: Props) {
  if (!internships || internships.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Internships
      </Text>

      {internships.map((internship, index) => (
        <View
          key={index}
          style={{
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 4,
            padding: 10,
            marginBottom: 12,
          }}
        >
          {/* Role */}

          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {internship.role}
          </Text>

          {/* Organization */}

          {internship.organization && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Organization:
              </Text>{" "}
              {internship.organization}
            </Text>
          )}

          {/* Duration */}

          {internship.duration && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Duration:
              </Text>{" "}
              {internship.duration}
            </Text>
          )}

          {/* Responsibilities */}

          {internship.responsibilities?.length > 0 && (
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                Responsibilities
              </Text>

              {internship.responsibilities.map(
                (item, i) => (
                  <Text
                    key={i}
                    style={styles.bullet}
                  >
                    • {item}
                  </Text>
                )
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}