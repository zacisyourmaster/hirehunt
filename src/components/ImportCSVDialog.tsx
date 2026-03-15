"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Import,
  Upload,
  X,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "./ui/file-upload";
import { bulkAddApplications } from "@/actions/actions";

// Matches Prisma schema fields
const EXPECTED_COLUMNS = [
  { key: "appliedAt", label: "Applied At", required: true },
  { key: "company", label: "Company", required: true },
  { key: "position", label: "Position", required: true },
  { key: "status", label: "Status", required: true },
  { key: "notes", label: "Notes", required: false },
  { key: "salary", label: "Salary", required: false },
  { key: "location", label: "Location", required: false },
  { key: "jobType", label: "Job Type", required: false },
] as const;

type ExpectedKey = (typeof EXPECTED_COLUMNS)[number]["key"];

type ParsedCSV = {
  headers: string[];
  rows: string[][];
};

type ColumnMapping = Partial<Record<ExpectedKey, string>>;

const SKIP_VALUE = "__skip__";

export function ImportCSVDialog() {
  const [files, setFiles] = useState<File[]>([]);
  const [parsedCSV, setParsedCSV] = useState<ParsedCSV | null>(null);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({});
  const [step, setStep] = useState<"upload" | "map" | "confirm">("upload");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const parseCSV = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim() !== "");
        if (lines.length < 2) {
          setParseError("CSV file appears to be empty or has no data rows.");
          return;
        }

        const parseRow = (line: string): string[] =>
          line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, ""));

        const headers = parseRow(lines[0]);
        const rows = lines.slice(1, 6).map(parseRow); // preview first 5 rows

        setParsedCSV({ headers, rows });

        // Auto-map columns with matching names (case-insensitive)
        const autoMapping: ColumnMapping = {};
        for (const expected of EXPECTED_COLUMNS) {
          const match = headers.find(
            (h) =>
              h.toLowerCase() === expected.key.toLowerCase() ||
              h.toLowerCase() === expected.label.toLowerCase(),
          );
          if (match) {
            autoMapping[expected.key] = match;
          }
        }
        setColumnMapping(autoMapping);
        setStep("map");
        setParseError(null);
      } catch {
        setParseError("Failed to parse CSV file.");
      }
    };
    reader.onerror = () => setParseError("Failed to read file.");
    reader.readAsText(file);
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    setParsedCSV(null);
    setColumnMapping({});
    setStep("upload");
    setParseError(null);
    if (newFiles.length) parseCSV(newFiles[0]);
  };

  const handleMappingChange = (expectedKey: ExpectedKey, csvHeader: string) => {
    setColumnMapping((prev) => ({
      ...prev,
      [expectedKey]: csvHeader === SKIP_VALUE ? undefined : csvHeader,
    }));
  };

  const requiredMapped = EXPECTED_COLUMNS.filter((c) => c.required).every(
    (c) => columnMapping[c.key],
  );

  const handleSubmit = () => {
    if (!files.length || !parsedCSV) return;

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("columnMapping", JSON.stringify(columnMapping));

    startTransition(async () => {
      await bulkAddApplications(formData);
      setOpen(false);
      setStep("upload");
      setFiles([]);
      setParsedCSV(null);
      setColumnMapping({});
    });
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) {
      setStep("upload");
      setFiles([]);
      setParsedCSV(null);
      setColumnMapping({});
      setParseError(null);
    }
  };

  const mappedCount = Object.values(columnMapping).filter(Boolean).length;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Import className="mr-2 size-4" />
          Import CSV
        </Button>
      </DialogTrigger>

      <DialogContent className="border-2 min-w-fit">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5">
            <Import className="size-5" />
            Import Applications from CSV
          </DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span
            className={step === "upload" ? "text-foreground font-medium" : ""}
          >
            1. Upload
          </span>
          <ArrowRight className="size-3" />
          <span className={step === "map" ? "text-foreground font-medium" : ""}>
            2. Map Columns
          </span>
        </div>

        {/* STEP 1: Upload */}
        {step === "upload" && (
          <FileUpload
            maxFiles={1}
            className="w-full max-w-md"
            accept=".csv"
            value={files}
            onValueChange={handleFileChange}
          >
            <FileUploadDropzone>
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <Upload className="size-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-sm">Drag & drop file here</p>
              <p className="text-muted-foreground text-xs">CSV files only</p>
              <FileUploadTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2 w-fit">
                  Browse files
                </Button>
              </FileUploadTrigger>
            </FileUploadDropzone>
            <FileUploadList>
              {files.map((file, index) => (
                <FileUploadItem key={index} value={file}>
                  <FileUploadItemPreview />
                  <FileUploadItemMetadata />
                  <FileUploadItemDelete asChild>
                    <Button variant="ghost" size="icon" className="size-7">
                      <X />
                    </Button>
                  </FileUploadItemDelete>
                </FileUploadItem>
              ))}
            </FileUploadList>
          </FileUpload>
        )}

        {parseError && (
          <div className="flex items-center gap-2 text-sm text-destructive mt-2">
            <AlertCircle className="size-4" />
            {parseError}
          </div>
        )}

        {/* STEP 2: Map columns */}
        {step === "map" && parsedCSV && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Match your CSV columns to the expected fields. Required fields are
              marked with <span className="text-destructive">*</span>.
            </p>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-3 gap-y-2 items-center">
              {/* Header row */}
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Expected Field
              </span>
              <span />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Your CSV Column
              </span>

              {EXPECTED_COLUMNS.map((expected) => {
                const mapped = columnMapping[expected.key];
                return (
                  <>
                    {/* Expected field label */}
                    <div
                      key={`label-${expected.key}`}
                      className="flex items-center gap-1.5"
                    >
                      {mapped ? (
                        <CheckCircle2 className="size-3.5 text-green-500 shrink-0" />
                      ) : (
                        <div className="size-3.5 rounded-full border border-muted-foreground/30 shrink-0" />
                      )}
                      <span className="text-sm font-medium">
                        {expected.label}
                        {expected.required && (
                          <span className="text-destructive ml-0.5">*</span>
                        )}
                      </span>
                    </div>

                    <ArrowRight className="size-3.5 text-muted-foreground mx-auto" />

                    {/* CSV column selector */}
                    <Select
                      value={columnMapping[expected.key] ?? SKIP_VALUE}
                      onValueChange={(val) =>
                        handleMappingChange(expected.key, val)
                      }
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Skip this field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={SKIP_VALUE}>
                          <span className="text-muted-foreground">
                            — Skip —
                          </span>
                        </SelectItem>
                        {parsedCSV.headers.map((header) => (
                          <SelectItem key={header} value={header}>
                            {header}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                );
              })}
            </div>

            {/* Preview table */}
            {parsedCSV.rows.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                  Preview (first {parsedCSV.rows.length} rows)
                </p>
                <div className="overflow-x-auto rounded-md border text-xs">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        {parsedCSV.headers.map((h) => (
                          <th
                            key={h}
                            className="px-2 py-1.5 text-left font-medium text-muted-foreground whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {parsedCSV.rows.map((row, i) => (
                        <tr key={i} className="border-t">
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              className="px-2 py-1.5 text-muted-foreground whitespace-nowrap max-w-40 truncate"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">
                {mappedCount} of {EXPECTED_COLUMNS.length} fields mapped
                {!requiredMapped && (
                  <span className="text-destructive ml-2">
                    · Required fields missing
                  </span>
                )}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep("upload")}
                >
                  Back
                </Button>
                <Button
                  size="sm"
                  disabled={!requiredMapped || isPending}
                  onClick={handleSubmit}
                >
                  {isPending ? "Importing..." : "Import"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
