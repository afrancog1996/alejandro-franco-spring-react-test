/// <reference types="react-scripts" />
export interface IRequestForm {
  id?: number;
  initial_investment: string | number;
  annual_contribution: string | number;
  annual_increase: string | number;
  years_investment: string | number;
  rate_performance: string | number;
}


export interface IData {
  id: number;
  final_amount: string | number;
  return_investment: string | number;
  registers_calculation: IRequestForm[];
}
