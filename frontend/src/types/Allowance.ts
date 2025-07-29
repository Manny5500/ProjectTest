import { EarningType } from "./EarningType";
import { Employee } from "./Employee";
import { SalaryPeriodSetting } from "./SalaryPeriodSetting";

export interface Allowance {
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
  dateCreated: Date | null;
  allowanceId : number
}

export const defaultAllowance: Allowance = {
  employee: {
    employeeId: 0,
    fullname: ""
  },
  salaryPeriodMonth: 0,
  salaryPeriodYear: 0,
  salaryPeriodSetting: {
    salaryPeriodSettingId: 0,
  },
  untilSalaryPeriodMonth: 0,
  untilSalaryPeriodYear: 0,
  untilSalaryPeriodSetting: {
    salaryPeriodSettingId: 0
  },
  earningType: {
    earningTypeId: 0,
  },
  amount : 0,
  amountPerDay : 0,
  ratePerBasic : 0,
  isLateFiling : false,
  reason : "",
  dateCreated : new Date(),
  allowanceId : -1
};
