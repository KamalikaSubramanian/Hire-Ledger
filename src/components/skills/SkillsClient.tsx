"use client";

import { useEffect, useState } from "react";

import useDebounce from "@/app/hooks/useDebounce";

import { getSkillsDashboard } from "@/actions/skills.actions";

import SkillsStatsCards from "./SkillsStatsCards";
import SkillsSearch from "./SkillsSearch";
import SkillsTable from "./SkillsTable";
import SkillsPagination from "./SkillsPagination"

export default function SkillsClient({
  initialSkills,
  initialPagination,
  initialStats,
}: any) {
  const [skills, setSkills] =
    useState(initialSkills);

  const [stats, setStats] =
    useState(initialStats);

  const [pagination, setPagination] =
    useState(initialPagination);

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("highest");

  const [page, setPage] =
    useState(1);

  const debouncedSearch =
    useDebounce(search, 500);

  useEffect(() => {
    loadSkills();
  }, [debouncedSearch, sort, page]);

  async function loadSkills() {
    const response =
      await getSkillsDashboard({
        search: debouncedSearch,
        sort,
        page,
      });

    if (!response.success) return;

    setSkills(response.data);

    setStats(response.stats);

    setPagination(response.pagination);
  }

  return (
  <div className="page-container">
    <div className="skills-page">
      <div className="skills-page-container">

        <div className="skills-page-header">
          <h1 className="skills-page-title">
            Skills Intelligence
          </h1>

          <p className="skills-page-description">
            Track your strongest and weakest skills
            across all resume analyses.
          </p>
        </div>

        <SkillsStatsCards stats={stats} />

        <SkillsSearch
          search={search}
          sort={sort}
          onSearch={setSearch}
          onSort={setSort}
        />

        <SkillsTable skills={skills} />

        <SkillsPagination
          pagination={pagination}
          onPageChange={setPage}
        />

      </div>
    </div>
  </div>
);
}