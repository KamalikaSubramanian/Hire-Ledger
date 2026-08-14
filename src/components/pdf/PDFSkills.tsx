import { View, Text } from "@react-pdf/renderer";

import { Skills } from "@/types/newResume";
import styles from "./PDFStyles";

interface Props {
  skills: Skills;
}

export default function PDFSkills({
  skills,
}: Props) {
  const categories = [
    {
      title: "Technical Skills",
      values: skills.technical,
    },
    {
      title: "Professional Skills",
      values: skills.professional,
    },
    {
      title: "Applications",
      values: skills.applications,
    },
    {
      title: "Tools",
      values: skills.tools,
    },
    {
      title: "Languages",
      values: skills.languages,
    },
    {
      title: "Other Skills",
      values: skills.other,
    },
  ];

  const availableCategories = categories.filter(
    (category) =>
      category.values &&
      category.values.length > 0
  );

  if (availableCategories.length === 0) return null;

  return (
    <View style={styles.section}>

      <Text style={styles.heading}>
        Skills
      </Text>

      {availableCategories.map((category) => (
        <View
          key={category.title}
          style={{ marginBottom: 10 }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "bold",
              marginBottom: 5,
              color: "#555",
            }}
          >
            {category.title}
          </Text>

          <View style={styles.badgeContainer}>
            {category.values.map((skill, index) => (
              <Text
                key={`${skill}-${index}`}
                style={styles.badge}
              >
                {skill}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}