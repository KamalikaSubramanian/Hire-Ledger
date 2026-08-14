import { View, Text } from "@react-pdf/renderer";

import styles from "./PDFStyles";

interface Props {
  summary: string;
}

export default function PDFSummary({
  summary,
}: Props) {
  if (!summary) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>
        Professional Summary
      </Text>

      <Text style={styles.paragraph}>
        {summary}
      </Text>
    </View>
  );
}