import { getSkillsDashboard } from "@/actions/skills.actions";

import SkillsClient from "@/components/skills/SkillsClient";

export default async function SkillsPage() {
  const response = await getSkillsDashboard({});

  if (!response.success) {
    return (
      <div className="p-10">
        Failed to load skills.
      </div>
    );
  }

  return (
    <SkillsClient
      initialSkills={response.data}
      initialPagination={response.pagination}
      initialStats={response.stats}
    />
  );
}