import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ManagementTable = ({ columns, rows, show, status, foods }) => {
  return (
    <div className="border rounded-lg bg-card overflow-hidde">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead className={col.classNameTitle || ""}>
                {col.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, key) => (
            <TableRow>
              {columns.map((col) => (
                <TableCell className={col.className || ""}>
                  {col.render
                    ? col.render(row, show, status, foods)
                    : col.key(key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagementTable;
