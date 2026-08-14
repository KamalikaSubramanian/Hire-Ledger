export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";

import PdfViewer from "@/components/resume/PdfViewer";

import Resume from "@/models/Resume";
import { connectDB } from "@/lib/mongodb";
import { syncUser } from "@/actions/user.actions";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResumeViewer({ params }: Props) {
  await connectDB();

  const user = await syncUser();

  if (!user.success || !user.data) {
    notFound();
  }

  const { id } = await params;

  const resume = await Resume.findOne({
    _id: id,
    userId: user.data._id,
  }).lean();

  if (!resume) {
    notFound();
  }

  return <PdfViewer url={resume.url} resume={resume} />
}
