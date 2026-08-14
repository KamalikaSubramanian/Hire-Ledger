import {
  Dispatch,
  SetStateAction,
} from "react";

import { Resume } from "@/types/resume";

import ResumeHistoryCard
  from "./ResumeHistoryCard";

import { deleteResume }
  from "@/actions/resume.actions";

interface Props {
  resumes: Resume[];

  setResumes:
    Dispatch<
      SetStateAction<Resume[]>
    >;
}

export default function ResumeHistory({
  resumes,
  setResumes,
}: Props) {

  async function handleDelete(
    id: string
  ) {
    const response =
      await deleteResume(id);

    if (!response.success) {
      return;
    }

    setResumes((prev) =>
      prev.filter(
        (resume) =>
          resume._id !== id
      )
    );
  }

  return (
    <section className="resume-history">

      <div className="resume-history-header">
        <h2 className="resume-history-title">
          Resume History
        </h2>
      </div>

      {resumes.length === 0 ? (
        <div className="resume-history-empty">

          <h3 className="resume-history-empty-title">
            No Resumes Uploaded
          </h3>

          <p className="resume-history-empty-description">
            Upload your first resume above
            to start analyzing and improving
            it.
          </p>

        </div>
      ) : (
        <div className="resume-history-list">
          {resumes.map((resume) => (
            <ResumeHistoryCard
              key={resume._id}
              resume={resume}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

    </section>
  );
}