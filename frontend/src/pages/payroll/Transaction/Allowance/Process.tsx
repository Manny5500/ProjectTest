import { useState } from "react";
import { Employee } from "../../../../types/Employee";
import ComponentCard from "../../../../components/common/ComponentCard";
import Label from "../../../../components/form/Label";
import Select from "../../../../components/form/Select";
import TextArea from "../../../../components/form/input/TextArea";
import Checkbox from "../../../../components/form/input/Checkbox";
import Input from "../../../../components/form/input/InputField";
import EmployeeAutoComplete from "../../../../components/ui/autocomplete/EmployeeAutoComplete";
import Button from "../../../../components/ui/button/Button";
import { AllowanceProcess } from "../Allowance";

export function Process(
    {
      onSave,
      onCancel,
      allowanceOptions,
      monthOptions,
      cuttOffOptions,
      divisionSelection,
      departmentSelection,
      stationSelection,
      process, 
      modeId
    }: {
      onSave: (process : AllowanceProcess) => void;
      onCancel : () => void;
      allowanceOptions: any[];
      monthOptions: any[];
      cuttOffOptions: any[];
      divisionSelection : any[];
      departmentSelection : any[];
      stationSelection : any[];
      process : AllowanceProcess;
      modeId : number

    }
  ) {
    const [employee, setEmployee] = useState<Employee>(process.allowance.employee);
    const [month, setMonth] = useState<string>(String(process.allowance.salaryPeriodMonth));
    const [salaryPeriodYear, setSalaryPeriodYear] = useState<number>(process.allowance.salaryPeriodYear);
    const [cutoff, setCutOff] = useState<string>(String(process.allowance.salaryPeriodSetting.salaryPeriodSettingId));
    const [earningTypeId, setEarningTypeId] = useState<string>(String(process.allowance.earningType.earningTypeId));

    const [untilSalaryPeriodMonth, setUntilSalaryPeriodMonth] = useState<string>(String(process.allowance.untilSalaryPeriodMonth));
    const [untilSalaryPeriodYear, setUntilSalaryPeriodYear] = useState<number>(process.allowance.untilSalaryPeriodYear);
    const [untilSalaryPeriodSettingId, setUntilSalaryPeriodSettingId] = useState<string>(String(process.allowance.untilSalaryPeriodSetting.salaryPeriodSettingId));

    
    const [amount, setAmount] = useState<number>(process.allowance.amount);
    const [amountPerDay, setAmountPerDay] = useState<number>(process.allowance.amountPerDay);
    const [ratePerBasic, setRatePerBasic] = useState<number>(process.allowance.ratePerBasic);

    const [isLateFiling, setIsLateFilling] = useState<boolean>(process.allowance.isLateFiling)
    const [reason, setReason] = useState<string>(process.allowance.reason)

    const [selectionType, setSelectionType] = useState<string>(String(process.selectionType))
    const [stationId, setStationId] = useState<string>(String(process.station.stationId))
    const [departmentId, setDepartmentId] = useState<string>(String(process.department.departmentId))

    const [isAllEmployee, setIsAllEmployee] = useState<boolean>(process.isAllEmployee)
    
    const allowanceId = process.allowance.allowanceId

    return (
      <ComponentCard title="Process Allowance">
           <div className="flex items-center gap-6">
                <Label htmlFor="input" className="w-32">Selection</Label>
                  <div className="flex items-center gap-4">
                    <Select
                    options={divisionSelection}
                    placeholder="Select Type"
                    onChange={setSelectionType}
                    className="dark:bg-dark-900"
                    defaultValue={selectionType}
                    />
                </div>
            </div>
            {selectionType === "1" && (
              <div className="flex items-center gap-6">
                  <Label htmlFor="input" className="w-32">Station</Label>
                    <div className="flex items-center gap-4">
                      <Select
                      options={stationSelection}
                      placeholder="Select Station Type"
                      onChange={setStationId}
                      className="dark:bg-dark-900"
                      defaultValue={stationId}
                      />
                  </div>
              </div>
            )}

            {selectionType === "2" && (
              <div className="flex items-center gap-6">
                  <Label htmlFor="input" className="w-32">Department</Label>
                    <div className="flex items-center gap-4">
                      <Select
                      options={departmentSelection}
                      placeholder="Select Department Type"
                      onChange={setDepartmentId}
                      className="dark:bg-dark-900"
                      defaultValue={departmentId}
                      />
                  </div>
              </div>
            )}

            {selectionType === "3" && (
                <div className="flex items-center gap-6">
                <Label htmlFor="input" className="w-32">Employee</Label>
                <div className="flex items-center gap-4">
                    <EmployeeAutoComplete name="employee.employeeId"onSelect={setEmployee} value={employee.fullname} />
                </div>
                <Checkbox checked={isAllEmployee} onChange={setIsAllEmployee} />
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    All
                </span>
                </div>
            )}

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
            <Label htmlFor="input" className="w-32">Effective Until</Label>
                <div className="flex items-center gap-4">
                    <Select
                        options={monthOptions}
                        placeholder="Select Month"
                        onChange={setUntilSalaryPeriodMonth}
                        className="dark:bg-dark-900"
                        defaultValue={untilSalaryPeriodMonth}
                    />
                    <Select
                        options={cuttOffOptions}
                        placeholder="Select CutOff"
                        onChange={setUntilSalaryPeriodSettingId}
                        className="dark:bg-dark-900"
                        defaultValue={untilSalaryPeriodSettingId}
                    />
                      <Input type="text" id="input" onChange={(e) => setUntilSalaryPeriodYear(Number(e.target.value))}  value={untilSalaryPeriodYear}/>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <Label htmlFor="input" className="w-32">Allowance Type</Label>
                  <div className="flex items-center gap-4">
                    <Select
                    options={allowanceOptions}
                    placeholder="Select Allowance Type"
                    onChange={setEarningTypeId}
                    className="dark:bg-dark-900"
                    defaultValue={earningTypeId}
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
              <Label htmlFor="input" className="w-32">
                Amount <br />
                <span className="text-xs text-muted-foreground">(Per Salary Period)</span>
              </Label>
              <Input type="number" id="input" onChange={(e) => setAmount(Number(e.target.value))}  value={amount} />
            </div>
            
            <div className="flex items-center gap-6">
              <Label htmlFor="amount" className="w-32">
                Amount Per Day <br />
                <span className="text-xs text-muted-foreground">(Daily)</span>
              </Label>
              <Input type="number" id="allowance.amountPerDay" onChange={(e) => setAmountPerDay(Number(e.target.value))}  value={amountPerDay} />
            </div>
            <div className="flex items-center gap-6">
              <Label htmlFor="amount" className="w-32">
                Percentage of Basic Salary
              </Label>
              <Input type="number" id="allowance.ratePerBasic" onChange={(e) => setRatePerBasic(Number(e.target.value))}  value={ratePerBasic} />
              <Label className="w-10 text-sm text-muted-foreground">(%)</Label>
              <Checkbox checked={isLateFiling} onChange={setIsLateFilling} />
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Late in Filling
              </span>
            </div>
           <div className="flex items-center gap-6 w-full">
            <Label htmlFor="input" className="w-32">
              Reason 
            </Label>
            <div className="w-1/2">
              <TextArea className="w-full" onChange={setReason} value={reason} />
            </div>
           </div>
            <div className="flex items-center gap-6">
                <Button 
                    size="sm" 
                    variant="primary" 
                    onClick={() => {
                        const process: AllowanceProcess = {
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
                                    earningTypeId: parseInt(earningTypeId) || 0
                                },
                                untilSalaryPeriodMonth: parseInt(untilSalaryPeriodMonth) || 0,
                                untilSalaryPeriodYear: untilSalaryPeriodYear,
                                untilSalaryPeriodSetting: {
                                    salaryPeriodSettingId: parseInt(untilSalaryPeriodSettingId) || 0
                                },
                                amount: amount,
                                amountPerDay: amountPerDay,
                                ratePerBasic: ratePerBasic,
                                isLateFiling: isLateFiling,
                                reason: reason,
                                allowanceId : allowanceId
                            },
                            isAllEmployee: isAllEmployee,
                            station: {
                                stationId : parseInt(stationId)
                            },
                            department: {
                                departmentId : parseInt(departmentId)
                            },
                            selectionType: parseInt(selectionType),
                            mode : {
                                id : modeId
                            }
                        };
                     onSave(process);
                }}>
                    Save
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onCancel}>
                        Cancel
                </Button>
            </div>
        </ComponentCard>
    )
  }