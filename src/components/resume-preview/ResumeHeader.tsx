"use client";

import EditableInput from "../editable/EditableInput";
import { Contact } from "@/types/newResume";

interface Props {
  contact: Contact;
  editing: boolean;
  onChange: (contact: Contact) => void;
}

export default function ResumeHeader({
  contact,
  editing,
  onChange,
}: Props) {

  function updateField(
    field: keyof Contact,
    value: string
  ) {
    onChange({
      ...contact,
      [field]: value,
    });
  }

  return (
    <section className="mb-8 border-b pb-6">

      {/* Name */}

      <div className="mb-4 text-center">
        <EditableInput
          editing={editing}
          value={contact.name}
          placeholder="Full Name"
          className="text-center text-4xl font-bold"
          onChange={(value) =>
            updateField("name", value)
          }
        />
      </div>

      {/* Contact Details */}

      <div className="text-muted-foreground flex flex-wrap justify-center gap-8 text-sm">

        <EditableInput
          editing={editing}
          value={contact.email}
          placeholder="Email"
          onChange={(value) =>
            updateField("email", value)
          }
        />

        <EditableInput
          editing={editing}
          value={contact.phone}
          placeholder="Phone"
          onChange={(value) =>
            updateField("phone", value)
          }
        />

        <EditableInput
          editing={editing}
          value={contact.location}
          placeholder="Location"
          onChange={(value) =>
            updateField("location", value)
          }
        />

      </div>
    </section>
  );
}