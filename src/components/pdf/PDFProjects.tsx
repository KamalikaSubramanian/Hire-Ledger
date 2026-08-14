import { View, Text } from "@react-pdf/renderer";

import { Project } from "@/types/newResume";
import styles from "./PDFStyles";

interface Props {
  projects: Project[];
}

export default function PDFProjects({
  projects,
}: Props) {
  if (!projects || projects.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Projects
      </Text>

      {projects.map((project, index) => (
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
          {/* Title */}

          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginBottom: 3,
            }}
          >
            {project.title}
          </Text>

          {/* Role */}

          {project.role && (
            <Text
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              {project.role}
            </Text>
          )}

          {/* Duration */}

          {project.duration && (
            <Text style={styles.smallText}>
              <Text style={{ fontWeight: "bold" }}>
                Duration:
              </Text>{" "}
              {project.duration}
            </Text>
          )}

          {/* Description */}

          {project.description && (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.paragraph}>
                {project.description}
              </Text>
            </View>
          )}

          {/* Responsibilities */}

          {project.responsibilities?.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 4,
                }}
              >
                Responsibilities
              </Text>

              {project.responsibilities.map((item, i) => (
                <Text
                  key={i}
                  style={styles.bullet}
                >
                  • {item}
                </Text>
              ))}
            </View>
          )}

          {/* Tools */}

          {project.toolsUsed?.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                Tools Used
              </Text>

              <View style={styles.badgeContainer}>
                {project.toolsUsed.map((tool, i) => (
                  <Text
                    key={`${tool}-${i}`}
                    style={styles.badge}
                  >
                    {tool}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Outcome */}

          {project.outcome && (
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 4,
                }}
              >
                Outcome
              </Text>

              <Text style={styles.paragraph}>
                {project.outcome}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}