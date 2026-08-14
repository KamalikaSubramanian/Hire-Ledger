interface Props {
  contact: any;
}

export default function ContactSection({ contact }: Props) {
  return (
    <div className="border-b pb-8">
      <h1 className="text-4xl font-bold">{contact.name}</h1>

      <div className="mt-4 flex flex-wrap gap-8 text-sm text-gray-600">
        <span>{contact.email}</span>

        <span>{contact.phone}</span>

        <span>{contact.location}</span>

        <span>{contact.linkedin}</span>

        <span>{contact.github}</span>

        <span>{contact.portfolio}</span>
      </div>
    </div>
  );
}
