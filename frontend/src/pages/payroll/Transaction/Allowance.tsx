import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import { useState, useEffect } from "react";
import { MONTH_MAP } from "../../../types/Month";
import { BASE_URL } from "../../../config";
import { Employee } from "../../../types/Employee";
import { Allowance, defaultAllowance } from "../../../types/Allowance";
import { SalaryPeriodSetting } from "../../../types/SalaryPeriodSetting";
import { EarningType } from "../../../types/EarningType";
import { defaultStation, Station } from "../../../types/Station";
import { defaultDepartment, Department } from "../../../types/Department";
import { Process } from "./Allowance/Process";
import { Result } from "./Allowance/Result";
import { Search } from "./Allowance/Search";

export interface AllowanceSearch {
  allowance: {
    employee: Employee;
    salaryPeriodMonth: number;
    salaryPeriodYear: number;
    salaryPeriodSetting: SalaryPeriodSetting;
    earningType: EarningType;
  };
  isAllEmployee: boolean;
}

export interface AllowanceProcess {
  allowance: {
    allowanceId: number;
    employee: Employee;
    salaryPeriodMonth: number;
    salaryPeriodYear: number;
    salaryPeriodSetting: SalaryPeriodSetting;
    untilSalaryPeriodMonth: number;
    untilSalaryPeriodYear: number;
    untilSalaryPeriodSetting: SalaryPeriodSetting;
    earningType: EarningType;
    amount : number;
    amountPerDay : number;
    ratePerBasic : number;
    isLateFiling : boolean;
    reason : string;
  },
  station : Station;
  department : Department;
  isAllEmployee : boolean;
  selectionType : number;
  mode : {
    id : number
  }
}

export default function AllowanceComponent(){ 
  const [mode, setMode] = useState<number>(0);
  const [allowances, setAllowances] = useState<any[]>([])
  const [allowanceOptions, setAllowanceOptions] = useState<{ value: string; label: string }[]>([])
  const [monthOptions, setMonthOptions] = useState<{ value: string; label: string }[]>([])
  const [cuttOffOptions, setCuttOffOptions] = useState<{ value: string; label: string }[]>([])
  const [divisionSelection , setDivisionSelection] = useState<{ value: string; label: string }[]>([])
  const [departmentSelection , setDepartmentSelection] = useState<{ value: string; label: string }[]>([])
  const [stationSelection , setStationSelection] = useState<{ value: string; label: string }[]>([])
  const [search, setSearch] = useState<AllowanceSearch>({
    allowance: defaultAllowance,
    isAllEmployee: false
  })

  const defaultAllowanceProcess : AllowanceProcess = {
    allowance : defaultAllowance,
    department : defaultDepartment,
    station : defaultStation,
    isAllEmployee : false,
    selectionType : 0,
    mode : {
      id : 0
    }
  }
  const [process, setProcess] = useState<AllowanceProcess>(defaultAllowanceProcess)
  useEffect(() => {
    fetch(`${BASE_URL}/allowanceJSON.action`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
         const transformed = [
          {value : "0", label : ""},
          ...data.earningtypeselection.map((item: any) => ({
              value: String(item.earningTypeId),
              label: item.name,
          }))];
        setAllowanceOptions(transformed);
        const monthTransformed = Object.entries(MONTH_MAP).map(([key, value]) => ({
          value: key,
          label: value,
        }));
        setMonthOptions(monthTransformed)
        const periodTransformed = [
          { value: "0", label: "" },
          ...data.periodsettingselection.map((item: any) => ({
            value: String(item.salaryPeriodSettingId),
            label: item.description,
          }))
        ];
        setCuttOffOptions(periodTransformed);
        const divisionTransformed = [
          { value: "0", label: "" },
          ...data.divisionselection.map((item: any) => ({
            value: String(item.value),
            label: item.label,
          }))
        ];
        setDivisionSelection(divisionTransformed);
        const departmentTransformed = [
          { value: "0", label: "All" },
          ...data.departmentselection.map((item: any) => ({
            value: String(item.departmentId),
            label: item.name,
          }))
        ];
        setDepartmentSelection(departmentTransformed);
        const stationTransformed = [
          { value: "0", label: "All" },
          ...data.stationselection.map((item: any) => ({
            value: String(item.stationId),
            label: item.stationName,
          }))
        ];
        setStationSelection(stationTransformed);
        setMode(data.mode?.id ?? 0);
      })
      .catch((err) => console.error('Failed to fetch allowances:', err))
  }, [])

  const handleSearch = (search: AllowanceSearch) => {
    const url = `${BASE_URL}/searchallowanceJSON.action`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(search)
    })
      .then((res) => res.json())
      .then((data) => {
        setMode(data.mode?.id ?? 0);
        setAllowances(data.allowanceList);
        setSearch(search)
      })
      .catch((err) => console.error('Failed to search allowances:', err));
  };

  const handleAdd = () => {
    fetch(`${BASE_URL}/addallowanceJSON.action`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setProcess(defaultAllowanceProcess)
        setMode(data.mode?.id ?? 0);
      })
      .catch((err) => console.error('Failed to switch to add mode:', err));
  };

  const handleSave = (process : AllowanceProcess) => {
    console.log("While saving the mode is ", process.mode.id)
    console.log("The allowance id saving " , process.allowance)
    fetch(`${BASE_URL}/saveallowanceJSON.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(process)

    })
      .then((res) => res.json())
      .then((data) => {
        setAllowances(data.allowanceList);
        setMode(data.mode?.id ?? 0);
      })
      .catch((err) => console.error('Failed to save:', err));
  };

  const handleCancel = () => {
    fetch(`${BASE_URL}/discardallowanceJSON.action`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setMode(data.mode?.id ?? 0);
      })
      .catch((err) => console.error('Failed to cancel:', err));
  };

   const handleUpdate = (allowanceId: number) => {
    fetch(`${BASE_URL}/editallowanceJSON.action?allowanceId=${allowanceId}`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedProcess = {
          ...process,
          allowance: data.allowance,
          mode : {
            id : 2
          },
          selectionType : 3
        };
        setProcess(updatedProcess);
        setMode(data.mode?.id ?? 0);
      })
      .catch((err) => console.error('Failed to cancel:', err));
  };

    const handleDelete = (allowanceId: number) => {
      const confirmed = window.confirm("Are you sure you want to delete this?");
      if (confirmed) {
        fetch(`${BASE_URL}/deleteallowanceJSON.action?id=${allowanceId}`, {
          credentials: 'include'
        })
          .then(res => res.json())
          .then((data) => {
            setAllowances(data.allowanceList);
            // perform additional logic if needed
          })
          .catch(err => console.error("Delete failed", err));
      }
    };

  return (
    <>
      <PageMeta
        title="Allowance Page"
        description="Allowance management dashboard"
      />
      <PageBreadcrumb pageTitle="Allowance" />
      <div className="space-y-6">
        {(mode === 0 || mode === 9) && (
          <Search
            onSearch={handleSearch}
            onAdd={handleAdd}
            allowanceOptions={allowanceOptions}
            monthOptions={monthOptions}
            cuttOffOptions={cuttOffOptions}
            search={search}
          />
        )}
  {/** 
        {mode === 6 && (
          <ComponentCard title="Allowance Details">
            <Detail allowance={selectedAllowance} />
          </ComponentCard>
        )}
  */}  
        {(mode === 1 || mode === 2) && (
          <Process
              onSave={handleSave}
              onCancel={handleCancel}
              allowanceOptions={allowanceOptions}
              monthOptions={monthOptions}
              cuttOffOptions={cuttOffOptions}
              process={process}
              divisionSelection={divisionSelection}
              departmentSelection={departmentSelection}
              stationSelection={stationSelection}
              modeId={mode}
          />
        )}
        {mode === 7 && (
          <>
            <Search
              onSearch={handleSearch}
              onAdd={handleAdd}
              allowanceOptions={allowanceOptions}
              monthOptions={monthOptions}
              cuttOffOptions={cuttOffOptions}
              search={search}
            />
            <ComponentCard title="Search Results">
              <Result allowances={allowances} onUpdateClicked={handleUpdate} onDeleteClicked={handleDelete} />
            </ComponentCard>
          </>
        )}
      </div>
    </>
  );
}