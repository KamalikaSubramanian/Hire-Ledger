import { View, Text } from "@react-pdf/renderer";

import styles from "./PDFStyles";

interface Props {
  careerObjective: string;
}

export default function PDFCareerObjective({
  careerObjective,
}: Props) {
  if (!careerObjective) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Career Objective
      </Text>

      <Text style={styles.paragraph}>
        {careerObjective}
      </Text>
    </View>
  );
}