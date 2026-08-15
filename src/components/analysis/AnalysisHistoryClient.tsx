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
    limit: 10,
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
    try {
      const response = await getUserAnalysisHistory({
        search: debouncedSearch,
        company,
        score,
        date,
        sort,
        page,
        limit: 10,
      });

      if (!response.success) {
        setAnalyses([]);
        return;
      }

      setAnalyses(response.data || []);

      if (response.pagination) {
        setPagination({
          page: response.pagination.page,
          limit: response.pagination.limit,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems,
        });
      }
    } catch (error) {
      console.error("Unable to load analysis history:", error);

      setAnalyses([]);
    }
  }


  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleCompanyChange(value: string) {
    setCompany(value);
    setPage(1);
  }

  function handleScoreChange(value: string) {
    setScore(value);
    setPage(1);
  }

  function handleDateChange(value: string) {
    setDate(value);
    setPage(1);
  }

  function handleSortChange(value: string) {
    setSort(value);
    setPage(1);
  }


  function handlePageChange(newPage: number) {
    if (newPage < 1) {
      return;
    }

    if (newPage > pagination.totalPages) {
      return;
    }

    setPage(newPage);
  }


  return (
    <div className="analysis-history-container">

      {/* PAGE HEADER */}

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
        onChange={handleSearchChange}
      />


      <AnalysisFilters
        company={company}
        score={score}
        date={date}
        sort={sort}
        onCompanyChange={handleCompanyChange}
        onScoreChange={handleScoreChange}
        onDateChange={handleDateChange}
        onSortChange={handleSortChange}
      />


      <AnalysisTable
        analyses={analyses}
        pagination={pagination}
        onPageChange={handlePageChange}
      />

    </div>
  );
}