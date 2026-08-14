import { getImprovedResume } from "@/actions/improvedResume.actions";

import ResumePreview from "@/components/resume-preview/ResumePreview";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ImprovedResumePage({
  params,
}: Props) {
  const { id } = await params;

  const response =
    await getImprovedResume(id);

  if (!response.success) {
    return (
      <div className="p-10">
        Resume not found.
      </div>
    );
  }

  return (
    <ResumePreview
      resume={response.data.resume}
      improvedResumeId={response.data._id}
    />
  );
}