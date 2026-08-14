"use client";

import { useEffect, useState } from "react";

import useDebounce from "@/app/hooks/useDebounce";

import { getUserAnalysisHistory } from "@/actions/analysis.actions";

import AnalysisSearch from "../analysisHistory/AnalysisSearch";
import AnalysisFilters from "../analysisHistory/AnalysisFilters";
import AnalysisTable from "../analysisHistory/AnalysisTable";

export default function AnalysisHistoryClient() {
  const [search, setSearch] = useState("");

  const [company, setCompany] = useState("");

  const [score, setScore] = useState("");

  const [date, setDate] = useState("");

  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);

  const [analyses, setAnalyses] = useState<any[]>([]);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    loadHistory();
  }, [
    debouncedSearch,
    company,
    score,
    date,
    sort,
    page,
  ]);

  async function loadHistory() {
    const response =
      await getUserAnalysisHistory({
        search: debouncedSearch,
        company,
        score,
        date,
        sort,
        page,
      });

    if (response.success) {
  setAnalyses(response.data);

  if (response.pagination) {
    setPagination({
      page: response.pagination.page,
      totalPages: response.pagination.totalPages,
      totalItems: response.pagination.totalItems,
    });
  }
}
  }

  return (
  <div className="analysis-history-container">

    <div className="analysis-history-header">
      <h1 className="analysis-history-title">
        Analysis History
      </h1>

      <p className="analysis-history-description">
        View all resume analyses.
      </p>
    </div>

    <AnalysisSearch
      value={search}
      onChange={setSearch}
    />

    <AnalysisFilters
      company={company}
      score={score}
      date={date}
      sort={sort}
      onCompanyChange={setCompany}
      onScoreChange={setScore}
      onDateChange={setDate}
      onSortChange={setSort}
    />

    <AnalysisTable analyses={analyses} />

  </div>
);
}