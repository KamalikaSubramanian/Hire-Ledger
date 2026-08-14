import {
  View,
  Text,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

import { Certification } from "@/types/newResume";

interface Props {
  certifications: Certification[];
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
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  name: {
    fontSize: 14,
    fontWeight: "bold",
  },

  issuer: {
    fontSize: 11,
    color: "#555",
    marginTop: 2,
  },

  label: {
    fontSize: 10,
    color: "#777",
    marginTop: 5,
  },

  value: {
    fontSize: 11,
    color: "#111",
  },

  link: {
    color: "#2563eb",
    fontSize: 11,
    marginTop: 6,
    textDecoration: "underline",
  },
});

export default function PDFCertifications({
  certifications,
}: Props) {
  if (!certifications?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>
        Certifications
      </Text>

      {certifications.map((cert, index) => (
        <View
          key={index}
          style={styles.card}
          wrap={false}
        >
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>
                {cert.name}
              </Text>

              {cert.issuer && (
                <Text style={styles.issuer}>
                  {cert.issuer}
                </Text>
              )}
            </View>

            {cert.year && (
              <Text style={styles.value}>
                {cert.year}
              </Text>
            )}
          </View>

          {cert.validTill && (
            <>
              <Text style={styles.label}>
                Valid Till
              </Text>

              <Text style={styles.value}>
                {cert.validTill}
              </Text>
            </>
          )}

          {cert.credentialId && (
            <>
              <Text style={styles.label}>
                Credential ID
              </Text>

              <Text style={styles.value}>
                {cert.credentialId}
              </Text>
            </>
          )}

          {cert.credentialUrl && (
            <Link
              src={cert.credentialUrl}
              style={styles.link}
            >
              View Credential
            </Link>
          )}
        </View>
      ))}
    </View>
  );
}