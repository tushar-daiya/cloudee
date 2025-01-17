import { File, Folder } from "@/app/actions/fetchers";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Folder as FolderIcon, File as FileIcon } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  folders: Folder[];
  files: File[];
};

export default function DataTable({ folders, files }: Props) {
  return (
    <>
      <Table className="bg-accent rounded-sm">
        <TableHeader>
          <TableRow className="border-b border-white/20 h-14">
            <TableHead>
              <span className="ml-4">Name</span>
            </TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">
              <p className="mr-4">Created At</p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {folders?.map((folder) => (
            <TableRow className="border-b border-white/20 h-12" key={folder.id}>
              <TableCell>
                <FolderIcon size={12} className="inline ml-4 mr-1" />
                {folder.name}
              </TableCell>
              <TableCell></TableCell>
              <TableCell>Folder</TableCell>
              <TableCell className="text-right">
                <p className="mr-4">{format(folder.createdAt, "PP")}</p>
              </TableCell>
            </TableRow>
          ))}
          {files?.map((file) => (
            <TableRow className="border-b border-white/20 h-12" key={file.id}>
              <TableCell>
                <FileIcon size={12} className="inline ml-4 mr-1" />
                <Link href={file?.url}>{file.name}</Link>
              </TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell className="text-right ">
                <p className="mr-4">{format(file.createdAt, "PP")}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
