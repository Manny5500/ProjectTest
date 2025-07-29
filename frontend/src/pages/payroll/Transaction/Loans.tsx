import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Checkbox from "../../../components/form/input/Checkbox";
import { useState, useEffect } from "react";
import Button from "../../../components/ui/button/Button";
import { BoxIcon, PlusIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
import Select from "../../../components/form/Select";

export default function Loans() {
    
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Loans" />
      <div className="space-y-6">
        <div className="space-y-6">
                <ComponentCard title="Search Loans">
                <div className="flex items-center gap-6">
                        <Label htmlFor="input" className="w-32">Employee</Label>
                        <Input type="text" id="input" />
                        <Checkbox checked={isChecked} onChange={setIsChecked} />
                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            All
                        </span>
                    </div>
                    <div className="flex items-center gap-5">
                        <Button size="sm" variant="primary">
                            Search
                        </Button>
                        <Button
                            size="sm"
                            variant="primary"
                            endIcon={<BoxIcon className="size-5" />}
                            >
                                New 
                        </Button>
                    </div>
                </ComponentCard>
            </div>

            <div className="space-y-6">
                <ComponentCard title="List of Loans">
                <ListofLoansTable /> 
                </ComponentCard>
            </div>
      </div>
    </>
  );
}

interface Employee {
  employeeId: number
  no?: string
  bsdNo?: number
  lastname?: string
  firstname?: string
  middlename?: string
  nameExtension?: string
  dateHire?: string
  birthDate?: string
  isSeparated?: boolean
  dateSeparated?: string
  isUser?: boolean
  isSuperUser?: boolean
  bankAccountNo?: string
  isDtrUsingPassword?: boolean
  isWithPicture?: boolean
  applicationDate?: string
  isSpectator?: boolean
  isReemployed?: boolean
}


 function ListofLoansTable() {

  const [employees, setEmployees] = useState<Employee[]>([])

  /*
  useEffect(() => {
    fetch('http://localhost:8081/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('Failed to fetch employees:', err))
  }, [])
  */

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
         {/* Table Header */} 
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Employee
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Loan Type
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Amount 
              </TableCell>
                <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                To Pay
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Paid
              </TableCell>
               <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Salary Period
              </TableCell>
               <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Options
              </TableCell>
              

            </TableRow>
          </TableHeader>
          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {employees.map((emp) => (
              <TableRow key={emp.employeeId}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                {`${emp.lastname}, ${emp.firstname}${emp.middlename}`}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {emp.firstname}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {emp.middlename}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {emp.birthDate}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {emp.applicationDate}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    endIcon={<PencilIcon className="size-5" />}
                    className="!border-success-600 !text-success-600 hover:!bg-success-50 dark:hover:!bg-success-900/10"
                    >
                    Update
                    </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    endIcon={<TrashBinIcon className="size-5" />}
                    className="!border-error-600 !text-error-600 hover:!bg-red-50 dark:hover:!bg-error-900/10"
                    >
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
  );
}
