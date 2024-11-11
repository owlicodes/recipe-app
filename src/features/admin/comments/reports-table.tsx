import { AlertTriangle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Report } from "./comments-list";

export const ReportsTable = ({
  reports,
  deleteComment,
  warnUser,
}: {
  reports: Report[];
  deleteComment: (id: string) => void;
  warnUser: (user: string) => void;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reporter</TableHead>
          <TableHead>Reported User</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.reporter}</TableCell>
            <TableCell>{report.reported}</TableCell>
            <TableCell>{report.reason}</TableCell>
            <TableCell>{report.date}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteComment(report.id)}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => warnUser(report.reported)}
                >
                  <AlertTriangle className="mr-1 h-4 w-4" />
                  Warn
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
