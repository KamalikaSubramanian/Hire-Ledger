"use client";

import {
  Award,
  CalendarDays,
  BadgeCheck,
  ExternalLink,
} from "lucide-react";

import { Certification } from "@/types/newResume";

import EditableInput from "../editable/EditableInput";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  certifications: Certification[];
  editing: boolean;
  onChange: (certifications: Certification[]) => void;
}

export default function CertificationSection({
  certifications,
  editing,
  onChange,
}: Props) {
  if (!certifications || certifications.length === 0) return null;

  function updateCertification(
    index: number,
    field: keyof Certification,
    value: any
  ) {
    const updated = [...certifications];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  }

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Certifications" />

      {certifications.map((certification, index) => (
        <div
          key={index}
          className="space-y-5 rounded-lg border p-5"
        >
          {/* Certification Name */}

          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />

            <EditableInput
              editing={editing}
              value={certification.name}
              placeholder="Certification Name"
              className="text-xl font-semibold"
              onChange={(value) =>
                updateCertification(index, "name", value)
              }
            />
          </div>

          {/* Issuer */}

          <EditableInput
            editing={editing}
            value={certification.issuer}
            placeholder="Issuer"
            className="text-muted-foreground"
            onChange={(value) =>
              updateCertification(index, "issuer", value)
            }
          />

          {/* Year */}

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={certification.year}
              placeholder="Year"
              onChange={(value) =>
                updateCertification(index, "year", value)
              }
            />
          </div>

          {/* Valid Till */}

          <EditableInput
            editing={editing}
            value={certification.validTill}
            placeholder="Valid Till"
            onChange={(value) =>
              updateCertification(index, "validTill", value)
            }
          />

          {/* Credential ID */}

          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-green-600" />

            <EditableInput
              editing={editing}
              value={certification.credentialId}
              placeholder="Credential ID"
              onChange={(value) =>
                updateCertification(index, "credentialId", value)
              }
            />
          </div>

          {/* Credential URL */}

          <div className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-primary" />

            <EditableInput
              editing={editing}
              value={certification.credentialUrl}
              placeholder="Credential URL"
              onChange={(value) =>
                updateCertification(index, "credentialUrl", value)
              }
            />
          </div>

          {/* Preview Link */}

          {!editing && certification.credentialUrl && (
            <a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              View Credential
            </a>
          )}
        </div>
      ))}
    </section>
  );
}