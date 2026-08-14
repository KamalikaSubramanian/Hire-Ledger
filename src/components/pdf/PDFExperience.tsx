import { View, Text } from "@react-pdf/renderer";

import { Experience } from "@/types/newResume";
import styles from "./PDFStyles";

interface Props {
  experience: Experience[];
}

export default function PDFExperience({
  experience,
}: Props) {
  if (!experience || experience.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Professional Experience
      </Text>

      {experience.map((job, index) => (
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
          {/* Job Title */}

          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {job.jobTitle}
          </Text>

          {/* Organization */}

          {job.organization && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Organization:
              </Text>{" "}
              {job.organization}
            </Text>
          )}

          {/* Location */}

          {job.location && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Location:
              </Text>{" "}
              {job.location}
            </Text>
          )}

          {/* Duration */}

          {job.duration && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Duration:
              </Text>{" "}
              {job.duration}
            </Text>
          )}

          {/* Employment Type */}

          {job.employmentType && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Employment Type:
              </Text>{" "}
              {job.employmentType}
            </Text>
          )}

          {/* Responsibilities */}

          {job.responsibilities?.length > 0 && (
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 4,
                }}
              >
                Responsibilities
              </Text>

              {job.responsibilities.map((item, i) => (
                <Text
                  key={i}
                  style={styles.bullet}
                >
                  • {item}
                </Text>
              ))}
            </View>
          )}

          {/* Achievements */}

          {job.achievements?.length > 0 && (
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 4,
                }}
              >
                Key Achievements
              </Text>

              {job.achievements.map((item, i) => (
                <Text
                  key={i}
                  style={styles.bullet}
                >
                  • {item}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}