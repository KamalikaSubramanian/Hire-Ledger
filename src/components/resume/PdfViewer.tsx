"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { Resume } from "@/types/resume";

import { Button } from "@/components/ui/button";

import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  url: string;
  resume: Resume;
}

export default function PdfViewer({ url, resume }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.1);
  const [downloading, setDownloading] = useState(false);

  /* =====================================================
     DOWNLOAD PDF
  ===================================================== */

  async function handleDownload() {
    if (downloading) return;

    try {
      setDownloading(true);

      // Same logic as ResumeHistoryCard
      const response = await fetch(resume.url);

      if (!response.ok) {
        throw new Error("Failed to download resume");
      }

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = downloadUrl;

      link.download = resume.fileName || "Resume.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to download resume:", error);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="pdf-viewer">
      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="pdf-viewer-toolbar">
        {/* ACTIONS */}

        <div className="pdf-viewer-actions">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="pdf-viewer-button"
            onClick={handleDownload}
            disabled={downloading}
          >
            <Download size={18} />

            <span>{downloading ? "Downloading..." : "Download"}</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="pdf-viewer-button"
            onClick={() => window.print()}
          >
            <Printer size={18} />

            <span>Print</span>
          </Button>
        </div>

        {/* =====================================================
            ZOOM
        ===================================================== */}

        <div className="pdf-viewer-control-group">
          <button
            type="button"
            onClick={() =>
              setScale((s) => Math.max(0.5, Number((s - 0.1).toFixed(1))))
            }
            className="pdf-viewer-icon-button"
            disabled={scale <= 0.5}
            title="Zoom out"
          >
            <ZoomOut size={18} />
          </button>

          <span className="pdf-viewer-zoom">{(scale * 100).toFixed(0)}%</span>

          <button
            type="button"
            onClick={() => setScale((s) => Number((s + 0.1).toFixed(1)))}
            className="pdf-viewer-icon-button"
            title="Zoom in"
          >
            <ZoomIn size={18} />
          </button>
        </div>

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div className="pdf-viewer-pagination">
          <button
            type="button"
            disabled={pageNumber === 1}
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            className="pdf-viewer-icon-button"
            title="Previous page"
          >
            <ChevronLeft size={19} />
          </button>

          <span className="pdf-viewer-page-number">
            <strong>{pageNumber}</strong>

            <span>/</span>

            <span>{numPages || "-"}</span>
          </span>

          <button
            type="button"
            disabled={numPages === 0 || pageNumber === numPages}
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            className="pdf-viewer-icon-button"
            title="Next page"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>

      {/* =====================================================
          PDF
      ===================================================== */}

      <div className="pdf-viewer-stage">
        <div className="pdf-viewer-document">
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setPageNumber(1);
            }}
            onLoadError={(error) => {
              console.error("PDF loading error:", error);
            }}
            loading={<div className="pdf-viewer-loading">Loading PDF...</div>}
            error={
              <div className="pdf-viewer-error">Unable to load this PDF.</div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
