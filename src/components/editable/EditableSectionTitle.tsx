interface Props {
  title: string;
}

export default function EditableSectionTitle({
  title,
}: Props) {
  return (
    <h2 className="border-b pb-2 text-2xl font-bold">
      {title}
    </h2>
  );
}