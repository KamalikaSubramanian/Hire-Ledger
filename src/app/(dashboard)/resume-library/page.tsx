import ResumeClient from "@/components/resume/ResumeClient";
import { getUserResumes } from "@/actions/resume.actions";

export default async function ResumePage() {
  const response = await getUserResumes();

  return (
    <ResumeClient
      initialResumes={
        response.success ? response.data ?? [] : []
      }
    />
  );
}