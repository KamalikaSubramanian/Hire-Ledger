"use client";

import {
  Globe,
  Link,
  Code,
  Trophy,
  ExternalLink,
} from "lucide-react";

import { Profiles } from "@/types/newResume";

import EditableInput from "../editable/EditableInput";
import EditableBadgeList from "../editable/EditableBadgeList";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  profiles: Profiles;
  editing: boolean;
  onChange: (profiles: Profiles) => void;
}

export default function ProfilesSection({
  profiles,
  editing,
  onChange,
}: Props) {
  if (!profiles) return null;

  function updateField(
    field: keyof Profiles,
    value: any
  ) {
    onChange({
      ...profiles,
      [field]: value,
    });
  }

  const profileFields = [
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: Link,
    },
    {
      key: "github",
      label: "GitHub",
      icon: Code,
    },
    {
      key: "portfolio",
      label: "Portfolio",
      icon: Globe,
    },
    {
      key: "website",
      label: "Website",
      icon: Globe,
    },
    {
      key: "leetcode",
      label: "LeetCode",
      icon: Code,
    },
    {
      key: "hackerrank",
      label: "HackerRank",
      icon: Trophy,
    },
    {
      key: "codechef",
      label: "CodeChef",
      icon: Code,
    },
    {
      key: "stackoverflow",
      label: "Stack Overflow",
      icon: Code,
    },
  ] as const;

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Professional Profiles" />

      <div className="grid gap-8 md:grid-cols-2">
        {profileFields.map((field) => {
          const Icon = field.icon;

          const value =
            profiles[field.key] ?? "";

          return (
            <div
              key={field.key}
              className="rounded-lg border p-8"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Icon className="text-primary h-5 w-5" />
                </div>

                <p className="font-medium">
                  {field.label}
                </p>
              </div>

              <EditableInput
                editing={editing}
                value={value}
                placeholder={`${field.label} URL`}
                onChange={(value) =>
                  updateField(field.key, value)
                }
              />

              {!editing && value && (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Other Profiles */}

      <div className="space-y-3">
        <h3 className="font-semibold">
          Other Profiles
        </h3>

        <EditableBadgeList
          editing={editing}
          values={profiles.other ?? []}
          onChange={(values) =>
            updateField("other", values)
          }
        />
      </div>
    </section>
  );
}