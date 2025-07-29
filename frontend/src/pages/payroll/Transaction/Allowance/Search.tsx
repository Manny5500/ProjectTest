import { useState } from "react";
import ComponentCard from "../../../../components/common/ComponentCard";
import Checkbox from "../../../../components/form/input/Checkbox";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Select from "../../../../components/form/Select";
import EmployeeAutoComplete from "../../../../components/ui/autocomplete/EmployeeAutoComplete";
import Button from "../../../../components/ui/button/Button";
import { BoxIcon } from "../../../../icons";
import { Employee } from "../../../../types/Employee";
import { AllowanceSearch } from "../Allowance";

export function Search({
  onSearch,
  onAdd,
  allowanceOptions,
  monthOptions,
  cuttOffOptions,
  search,
}: {
  onSearch: (search: AllowanceSearch) => void;
  onAdd: () => void;
  allowanceOptions: any[];
  monthOptions: any[];
  cuttOffOptions: any[];
  search: AllowanceSearch;
})
{
  const [employee, setEmployee] = useState<Employee>(search.allowance.employee);
  const [isChecked, setIsChecked] = useState<boolean>(search.isAllEmployee);
  const [month, setMonth] = useState<string>(String(search.allowance.salaryPeriodMonth));
  const [salaryPeriodYear, setSalaryPeriodYear] = useState<number>(search.allowance.salaryPeriodYear);
  const [cutoff, setCutOff] = useState<string>(String(search.allowance.salaryPeriodSetting.salaryPeriodSettingId));
  const [allowanceOptionsValue, setAllowanceOptionsValue] = useState<string>(String(search.allowance.earningType.earningTypeId));
  return (
    <ComponentCard title="Search Allowance">
         <div className="flex items-center gap-6">
              <Label htmlFor="input" className="w-32">Employee</Label>
              <div className="flex items-center gap-4">
                <EmployeeAutoComplete name="employee.employeeId"onSelect={setEmployee} value={employee.fullname} />
              </div>
              <Checkbox checked={isChecked} onChange={setIsChecked} />
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  All
              </span>
          </div>

          <div className="flex items-center gap-6">
          <Label htmlFor="input" className="w-32">Salary Period</Label>
              <div className="flex items-center gap-4">
                  <Select
                  options={monthOptions}
                  placeholder="Select Month"
                  onChange={setMonth}
                  className="dark:bg-dark-900"
                  defaultValue={month}
                  />
                  <Select
                  options={cuttOffOptions}
                  placeholder="Select CutOff"
                  onChange={setCutOff}
                  className="dark:bg-dark-900"
                  defaultValue={cutoff}
                  />
                  <Input type="text" id="input" onChange={(e) => setSalaryPeriodYear(Number(e.target.value))}  value={salaryPeriodYear}/>
              </div>
          </div>

          <div className="flex items-center gap-6">
              <Label htmlFor="input" className="w-32">Allowance Type</Label>
                <div className="flex items-center gap-4">
                  <Select
                  options={allowanceOptions}
                  placeholder="Select Allowance Type"
                  onChange={setAllowanceOptionsValue}
                  className="dark:bg-dark-900"
                  defaultValue={allowanceOptionsValue}
                  />
              </div>
          </div>

          <div className="flex items-center gap-5">
              <Button 
                size="sm" 
                variant="primary" 
                onClick={() => {
                  const search: AllowanceSearch = {
                    allowance: {
                      employee: {
                        employeeId: employee.employeeId,
                        fullname: employee.fullname
                      },
                      salaryPeriodMonth: parseInt(month) || 0,
                      salaryPeriodYear: salaryPeriodYear,
                      salaryPeriodSetting: {
                        salaryPeriodSettingId: parseInt(cutoff) || 0
                      },
                      earningType: {
                        earningTypeId: parseInt(allowanceOptionsValue) || 0
                      }
                    },
                    isAllEmployee: isChecked
                  };
                  onSearch(search);
                }}
              >
                Search
              </Button>
              <Button
                  size="sm"
                  variant="primary"
                  endIcon={<BoxIcon className="size-5" />}
                  onClick={onAdd}>
                      New 
              </Button>
          </div>
      </ComponentCard>
  )
}