import Button from "../../../../components/ui/button/Button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../components/ui/table";
import { PencilIcon, TrashBinIcon } from "../../../../icons";
import { Allowance } from "../../../../types/Allowance";
import { MONTH_MAP } from "../../../../types/Month";

export function Result({ 
  allowances ,
  onUpdateClicked,
  onDeleteClicked
} : 
  {
     allowances: any[];
     onUpdateClicked : (allowanceId : number)=>void;
     onDeleteClicked : (allowanceId : number)=>void;
     }
  ){
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Employee
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Salary Period
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Type
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Amount
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Daily Allowance
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Options
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {allowances.map((a, idx) => (
              <TableRow key={idx}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {a.employee.fullname}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {MONTH_MAP[a.salaryPeriodMonth]}&nbsp;
                    {a.salaryPeriodSetting.description}&nbsp;
                    {a.salaryPeriodYear}
                  {a.salaryPeriod}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {a.earningType.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {a.amount}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {a.amountPerDay}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={
                      () => onUpdateClicked(a.allowanceId)
                      }  endIcon={<PencilIcon className="size-5" />} className="!border-success-600 !text-success-600 hover:!bg-success-50 dark:hover:!bg-success-900/10">
                      Update
                    </Button>
                    <Button size="sm" variant="outline" onClick={
                      () => onDeleteClicked(a.allowanceId)
                      }endIcon={<TrashBinIcon className="size-5" />} className="!border-error-600 !text-error-600 hover:!bg-red-50 dark:hover:!bg-error-900/10">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}