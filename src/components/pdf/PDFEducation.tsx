import { View, Text } from "@react-pdf/renderer";

import { Education } from "@/types/newResume";
import styles from "./PDFStyles";

interface Props {
  education: Education[];
}

export default function PDFEducation({
  education,
}: Props) {
  if (!education || education.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Education
      </Text>

      {education.map((item, index) => (
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
          {/* Degree */}

          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {item.degree}
          </Text>

          {/* Institution */}

          {item.institution && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Institution:
              </Text>{" "}
              {item.institution}
            </Text>
          )}

          {/* Location */}

          {item.location && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Location:
              </Text>{" "}
              {item.location}
            </Text>
          )}

          {/* Year */}

          {item.year && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Year:
              </Text>{" "}
              {item.year}
            </Text>
          )}

          {/* Grade */}

          {item.grade && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Grade:
              </Text>{" "}
              {item.grade}
            </Text>
          )}

          {/* Specialization */}

          {item.specialization && (
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 4,
                }}
              >
                Specialization
              </Text>

              <Text style={styles.paragraph}>
                {item.specialization}
              </Text>
            </View>
          )}

          {/* Coursework */}

          {item.relevantCoursework?.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                Relevant Coursework
              </Text>

              <View style={styles.badgeContainer}>
                {item.relevantCoursework.map((course, i) => (
                  <Text
                    key={`${course}-${i}`}
                    style={styles.badge}
                  >
                    {course}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}