"use client";

import { Fragment, useState } from "react";
import { Dialog, Listbox, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import {
  BellIcon,
  XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const navigation = [{ name: "Corporate Tax Calculator", href: "/" }];

const activity = [
  {
    id: 1,
    type: "created",
    person: { name: "Chelsea Hagon" },
    date: "7d ago",
    dateTime: "2023-01-23T10:32",
  },
  {
    id: 2,
    type: "edited",
    person: { name: "Chelsea Hagon" },
    date: "6d ago",
    dateTime: "2023-01-23T11:03",
  },
  {
    id: 3,
    type: "sent",
    person: { name: "Chelsea Hagon" },
    date: "6d ago",
    dateTime: "2023-01-23T11:24",
  },
  {
    id: 4,
    type: "commented",
    person: {
      name: "Chelsea Hagon",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 5,
    type: "viewed",
    person: { name: "Alex Curren" },
    date: "2d ago",
    dateTime: "2023-01-24T09:12",
  },
  {
    id: 6,
    type: "paid",
    person: { name: "Alex Curren" },
    date: "1d ago",
    dateTime: "2023-01-24T09:20",
  },
];
const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIconMini,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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

export default function Details() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selected, setSelected] = useState(moods[5]);

  const [corporate_tax, setCorporateTax] = useState<CorporateTaxCalculatorType>(
    {
      revenue: 0.0,
      ebitda: 0.0,
      interest_expense: 0.0,
      interest_income: 0.0,
      depreciation: 0.0,
      amortization: 0.0,
      carry_forward_interest: 0.0,
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
    <form>
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-x-6">
            <button
              type="button"
              className="-m-3 p-3 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
          <nav className="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">
            {navigation.map((item, itemIdx) => (
              <a key={itemIdx} href={item.href}>
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="-ml-0.5 flex h-16 items-center gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIconOutline className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="-ml-0.5">
                <a href="#" className="-m-1.5 block p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main>
        <header className="relative isolate pt-16">
          <div
            className="absolute inset-0 -z-10 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
              <div
                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                style={{
                  clipPath:
                    "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
                }}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-x-6">
                <img
                  src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                  alt=""
                  className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
                />
                <h1>
                  <div className="text-sm leading-6 text-gray-500">
                    Open<span className="text-gray-700">Fisca</span>
                  </div>
                  <div className="mt-1 text-base font-semibold leading-6 text-gray-900">
                    Corporate Tax Calculator
                  </div>
                </h1>
              </div>
              <div className="flex items-center gap-x-4 sm:gap-x-6">
                <Menu as="div" className="relative sm:hidden">
                  <Menu.Button className="-m-3 block p-3">
                    <span className="sr-only">More</span>
                    <EllipsisVerticalIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900"
                            )}
                          >
                            Copy URL
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Invoice summary */}
            <div className="lg:col-start-3 lg:row-end-1">
              <h2 className="sr-only">Summary</h2>
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">
                      Corporate Tax Payable
                    </dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                      {formatNumberWithCommas(answer)} AED
                    </dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Status</dt>
                    <dd className="rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-600/20">
                      Due
                    </dd>
                  </div>
                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Client</span>
                      <UserCircleIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-gray-900">
                      Company Name
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Due date</span>
                      <CalendarDaysIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-gray-500">
                      <time dateTime="2023-01-31">Tax Period 2024</time>
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Corporate Tax Guide <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Invoice */}
            <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
              <h2 className="text-base font-semibold leading-6 text-gray-900">
                Corporate Tax Calculator
              </h2>
              {UpperDetails()}
              <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                <colgroup>
                  <col className="w-full" />
                  <col />
                </colgroup>
                <thead className="border-b border-gray-200 text-gray-900">
                  <tr>
                    <th scope="col" className="px-0 py-3 font-semibold">
                      Items
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                    ></th>
                    <th
                      scope="col"
                      className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                    ></th>
                    <th
                      scope="col"
                      className="py-3 pl-8 pr-0 text-right font-semibold"
                    >
                      Amount (AED)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-gray-900">
                        Revenue
                      </div>
                      <div className="truncate text-gray-500">
                        The gross amount of income
                      </div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                      <input
                        type="number"
                        className="py-5 pl-8 pr-2 text-right align-top border rounded-lg tabular-nums text-gray-700"
                        defaultValue={0.0}
                        step={10000000}
                        value={corporate_tax.revenue}
                        onChange={handleRevenueChange}
                      />
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-gray-900">
                        EBIDTA
                      </div>
                      <div className="truncate text-gray-500"></div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                      <input
                        type="number"
                        className="py-5 pl-8 pr-2 text-right align-top border rounded-lg tabular-nums text-gray-700"
                        defaultValue={0.0}
                        placeholder="0.00"
                        value={corporate_tax.ebitda}
                        onChange={handleEbitdaChange}
                      />
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-gray-900">
                        Interest Expense
                      </div>
                      <div className="truncate text-gray-500"></div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                      <input
                        type="number"
                        className="py-5 pl-8 pr-2 text-right align-top border rounded-lg tabular-nums text-gray-700"
                        defaultValue={0.0}
                        placeholder="0.00"
                        value={corporate_tax.interest_expense}
                        onChange={handleInterestExpenseChange}
                      />
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-gray-900">
                        Carry Forward Interest
                      </div>
                      <div className="truncate text-gray-500">
                        Interest from previous year
                      </div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                      <input
                        type="number"
                        className="py-5 pl-8 pr-2 text-right align-top border rounded-lg tabular-nums text-gray-700"
                        defaultValue={0.0}
                        placeholder="0.00"
                        value={corporate_tax.carry_forward_interest}
                        onChange={handleCarryForwardChange}
                      />
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-gray-900">
                        Interest Income
                      </div>
                      <div className="truncate text-gray-500"></div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                      <input
                        type="number"
                        className="py-5 pl-8 pr-2 text-right align-top border rounded-lg tabular-nums text-gray-700"
                        defaultValue={0.0}
                        placeholder="0.00"
                        value={corporate_tax.interest_income}
                        onChange={handleInterestIncomeChange}
                      />
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-gray-900">
                        Depreciation
                      </div>
                      <div className="truncate text-gray-500"></div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                      <input
                        type="number"
                        className="py-5 pl-8 pr-2 text-right align-top border rounded-lg tabular-nums text-gray-700"
                        defaultValue={0.0}
                        placeholder="0.00"
                        value={corporate_tax.depreciation}
                        onChange={handleDepreciationChange}
                      />
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-gray-900">
                        Amortization
                      </div>
                      <div className="truncate text-gray-500"></div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"></td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                      <input
                        type="number"
                        className="py-5 pl-8  text-right align-top border rounded-lg tabular-nums text-gray-700 pr-2"
                        defaultValue={0.0}
                        placeholder="0.00"
                        value={corporate_tax.amortization}
                        onChange={handleAmmotizationChange}
                      />
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      scope="row"
                      className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden"
                    >
                      Subtotal
                    </th>
                    <th
                      scope="row"
                      colSpan={4}
                      className=" px-0 text-right pb-0 pt-6 font-normal  sm:table-cell  rounded-lg text-white "
                    >
                      <button
                        type="submit"
                        onClick={handleCalculate}
                        className="bg-gray-900 p-1 rounded font-bold hover:bg-gray-500"
                      >
                        Calculate
                      </button>
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden"
                    >
                      Taxable Income
                    </th>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                    >
                      Taxable Income
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">
                      {formatNumberWithCommas(taxable_income)} AED
                    </td>
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      className="pt-4 font-semibold text-gray-900 sm:hidden"
                    >
                      Corporate Tax
                    </th>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                    >
                      Corporate Tax
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                      {formatNumberWithCommas(answer)} AED
                    </td>
                  </tr>
                </tfoot>
              </table>
              <p className="text-gray-500  mt-20 text-xs text-justify break-word whitespace-normal ">
                * Disclaimer: The results generated by this application are
                based on the UAE Corporate Tax Law and are intended for
                informational purposes only. They should not be considered as
                definitive tax calculations or relied upon for tax preparation
                and filing. This application does not replace professional tax
                advisory services. The developer of this application bears no
                legal liability for any decisions or actions taken based on the
                information provided. Users are advised to consult with a
                qualified tax professional for accurate tax calculations and
                advice.
              </p>
            </div>

            <div className="lg:col-start-3">
              {/* Activity feed */}
              <h2 className="text-sm font-semibold leading-6 text-gray-900 mb-4">
                Background
              </h2>

              <p className=" text-sm text-gray-500">
                This is a corporate tax calculator designed on the Corporate Tax
                Law in the United Arab Emirates. The Federal Decree-Law No. 47
                of 2022 on the Taxation of Corporations and Businesses was
                signed on the 3rd of October 2022, thereby providing the
                legislative foundation for implementing a federal tax on
                corporations and business profits, known as Corporate Tax.
              </p>

              <p className="text-sm text-gray-500 mt-4">
                The provisions of the new Corporate Tax Law are applicable
                starting from tax periods commencing on or after the 1st of June
                2023, this is poised to offer robust guidance on the
                principlesand practices of Corporate Tax in the UAE.
              </p>

              <p className="text-sm text-gray-500 mt-4">
                The aim is to simplify the comprehension of the provisions of
                the Corporate Tax Law, by offering a simple calculator that
                estimates the amount of tax payable for a corporation in the UAE
                in a given tax period.
              </p>
            </div>
          </div>
        </div>
      </main>
    </form>
  );

  function UpperDetails() {
    return (
      <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
        <div className="sm:pr-4">
          <dt className="inline text-gray-500">Based on</dt>{" "}
          <dd className="inline text-gray-700">
            <time dateTime="2023-23-01">Corporate Tax Guide</time>
          </dd>
        </div>
        <div className="mt-2 sm:mt-0 sm:pl-4">
          <dt className="inline text-gray-500">Version</dt>{" "}
          <dd className="inline text-gray-700">
            <time dateTime="2023-31-01">CTGGCT1</time>
          </dd>
        </div>
        <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
          <dt className="font-semibold text-gray-900">Backend</dt>
          <dd className="mt-2 text-gray-500">
            <span className="font-medium text-gray-900">OpenFisca</span>
            <br />
            Checksum version 4a8383f
          </dd>
        </div>
        <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
          <dt className="font-semibold text-gray-900">Front End</dt>
          <dd className="mt-2 text-gray-500">
            <span className="font-medium text-gray-900">Next.JS</span>
            <br />
            Hosted at code.gov.ae
          </dd>
        </div>
      </dl>
    );
  }
}

function formatNumberWithCommas(num: number) {
  return new Intl.NumberFormat().format(num);
}
