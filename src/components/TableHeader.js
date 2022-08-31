import * as React from "react"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

export function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Название</TableCell>
        <TableCell>Статус</TableCell>
        <TableCell>Ответственный</TableCell>
        <TableCell>Дата создания</TableCell>
        <TableCell>Бюджет</TableCell>
      </TableRow>
    </TableHead>
  )
}
