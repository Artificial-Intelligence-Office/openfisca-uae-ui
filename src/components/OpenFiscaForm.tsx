"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Container } from "@/components/Container";
import { SectionHeading } from "./SectionHeading";
import { useState } from "react";

interface CorporateTaxCalculatorType {
  revenue: number;
  ebitda: number;
  is_government?: boolean;
  is_pension_fund?: boolean;
  interest_expense?: number;
  interest_income?: number;
  depreciation?: number;
  amortization?: number;
  carry_forward_interest?: number;
}

export default function OpenFiscaForm() {
  const [corporate_tax, setCorporateTax] = useState<CorporateTaxCalculatorType>(
    {
      revenue: 0,
      ebitda: 0,
      interest_expense: 0,
      interest_income: 0,
      depreciation: 0,
      amortization: 0,
      carry_forward_interest: 0,
    }
  );
  const [answer, setAnswer] = useState(0);
  const [taxable_income, setTaxableIncome] = useState(0);

  const handleRevenueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorporateTax({
      ...corporate_tax,
      revenue: Number(event.target.value),
    });
  };

  const handleInterestExpenseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorporateTax({
      ...corporate_tax,
      interest_expense: Number(event.target.value),
    });
  };

  const handleCarryForwardChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorporateTax({
      ...corporate_tax,
      carry_forward_interest: Number(event.target.value),
    });
  };

  const handleDepreciationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorporateTax({
      ...corporate_tax,
      depreciation: Number(event.target.value),
    });
  };

  const handleAmmotizationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorporateTax({
      ...corporate_tax,
      amortization: Number(event.target.value),
    });
  };

  const handleInterestIncomeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorporateTax({
      ...corporate_tax,
      interest_income: Number(event.target.value),
    });
  };

  const handleEbitdaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorporateTax({
      ...corporate_tax,
      ebitda: Number(event.target.value),
    });
  };

  const handleCalculate = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        persons: {
          John: {
            EBITDA: { "2024": corporate_tax.ebitda },
            revenue: { "2024": corporate_tax.revenue },
            interest_expense: { "2024": corporate_tax.interest_expense },
            interest_income: { "2024": corporate_tax.interest_income },
            depreciation: { "2024": corporate_tax.depreciation },
            amortization: { "2024": corporate_tax.amortization },
            carry_forward_interest: {
              "2024": corporate_tax.carry_forward_interest,
            },
            corporate_tax: { "2024": null },
            taxable_income: { "2024": null },
          },
        },
      }),
    });

    const result = await response.json();
    console.log(result.persons.John.corporate_tax[2024]);
    setAnswer(result.persons.John.corporate_tax[2024]);
    setTaxableIncome(result.persons.John.taxable_income[2024]);
  };

  return (
    <section id="introduction" aria-label="Introduction">
      <Container className="text-lg tracking-tight text-slate-700 mb-10">
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          This is a corporate tax calculator designed on the Corporate Tax Law
          in the United Arab Emirates. The Federal Decree-Law No. 47 of 2022 on
          the Taxation of Corporations and Businesses was signed on the 3rd of
          October 2022, thereby providing the legislative foundation for
          implementing a federal tax on corporations and business profits, known
          as Corporate Tax.
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          The provisions of the new Corporate Tax Law are applicable starting
          from tax periods commencing on or after the 1st of June 2023, this is
          poised to offer robust guidance on the principlesand practices of
          Corporate Tax in the UAE.
        </p>

        <p className="mt-4 text-lg tracking-tight text-slate-700">
          The aim is to simplify the comprehension of the provisions of the
          Corporate Tax Law, by offering a simple calculator that estimates the
          amount of tax payable for a corporation in the UAE in a given tax
          period.
        </p>
        <form className="mt-4 ">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="revenue"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Revenue
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        AED
                      </span>
                      <input
                        type="number"
                        name="revenue"
                        id="revenue"
                        step={10000000}
                        value={corporate_tax.revenue}
                        onChange={handleRevenueChange}
                        autoComplete="revenue"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="12000000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="EBITDA"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    EBITDA
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        AED
                      </span>
                      <input
                        type="number"
                        step={10000000}
                        name="EBITDA"
                        id="EBITDA"
                        autoComplete="EBITDA"
                        value={corporate_tax.ebitda}
                        onChange={handleEbitdaChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="3000000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="InterestExpense"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Interest Expense
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        AED
                      </span>
                      <input
                        type="number"
                        step={10000000}
                        name="InterestExpense"
                        id="InterestExpense"
                        autoComplete="InterestExpense"
                        value={corporate_tax.interest_expense}
                        onChange={handleInterestExpenseChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="3000000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="InterestExpense"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Carry Forward Interest
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        AED
                      </span>
                      <input
                        type="number"
                        step={10000000}
                        name="InterestExpense"
                        id="InterestExpense"
                        autoComplete="InterestExpense"
                        value={corporate_tax.carry_forward_interest}
                        onChange={handleCarryForwardChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="3000000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="InterestExpense"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Interest Income
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        AED
                      </span>
                      <input
                        type="number"
                        step={10000000}
                        name="InterestExpense"
                        id="InterestExpense"
                        autoComplete="InterestExpense"
                        value={corporate_tax.interest_income}
                        onChange={handleInterestIncomeChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="3000000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="InterestExpense"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Depreciation
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        AED
                      </span>
                      <input
                        type="number"
                        step={10000000}
                        name="InterestExpense"
                        id="InterestExpense"
                        autoComplete="InterestExpense"
                        value={corporate_tax.depreciation}
                        onChange={handleDepreciationChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="3000000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="InterestExpense"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Amortization
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        AED
                      </span>
                      <input
                        type="number"
                        step={10000000}
                        name="InterestExpense"
                        id="InterestExpense"
                        autoComplete="InterestExpense"
                        value={corporate_tax.amortization}
                        onChange={handleAmmotizationChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="3000000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="corporate_tax"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Taxable Income
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        AED
                      </span>
                      <p className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                        {taxable_income}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="corporate_tax"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Corporate Tax
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        AED
                      </span>
                      <p className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              onClick={handleCalculate}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Calculate
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
}