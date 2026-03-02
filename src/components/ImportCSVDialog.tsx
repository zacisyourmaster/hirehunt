"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Import, Upload, X } from "lucide-react";
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
export function ImportCSVDialog() {
  const [files, setFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const handleSubmit = (formData: FormData) => {
    if (!files.length) return;
    formData.append("file", files[0]);
    startTransition(async () => {
      await bulkAddApplications(formData);
      setOpen?.(false);
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Import />
          Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="border-2">
        <DialogHeader>
          <DialogTitle className=" flex items-center gap-2.5">
            <Import />
            Import Applications from CSV
          </DialogTitle>
        </DialogHeader>
        <form action={handleSubmit}>
          <FileUpload
            maxFiles={1}
            className="w-fill max-w-md"
            accept=".csv, .xlsx"
            value={files}
            onValueChange={setFiles}
          >
            <FileUploadDropzone>
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <Upload className="size-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-sm">Drag & drop file here</p>
              <p className="text-muted-foreground text-xs">
                Or click to browse
              </p>
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
          {files.length > 0 && (
            <Button type="submit" disabled={isPending} className="max-w-32 mt-4">
              {isPending ? "Uploading..." : "Submit"}
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
