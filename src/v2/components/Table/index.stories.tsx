import { Meta, StoryObj } from "@storybook/react";
import Table from ".";
import withRtl from "../../../lib/RTL";
import React from "react";

const meta = {
  title: "DGAUI/V2/Table",
  component: Table,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    contained: {
      control: { type: "boolean" },
    },
    compact: {
      control: { type: "boolean" },
    },
    alternatingRows: {
      control: { type: "boolean" },
    },
    selectable: {
      control: { type: "boolean" },
    },
    columnDivider: {
      control: { type: "boolean" },
    },
    headerColumnDivider: {
      control: { type: "boolean" },
    },
    lastColumnWidthMultiply: {
      control: { type: "number" },
    },
  },
  args: {
    lastColumnWidthMultiply: 1,
    contained: false,
    compact: false,
    alternatingRows: false,
    columnDivider: false,
    headerColumnDivider: true,
    selectable: true,
  },
} satisfies Meta<typeof Table>;

export default meta;

// Stories

const data = [
  {
    list: 17,
    country: "Chile",
    company: "Sed Nunc Industries",
    address: "1594 Duis Rd.",
    city: "Canela",
    district: "district",
    selected: false,
  },
  {
    list: 17,
    country: "France",
    company: "Tempus Ltd",
    address: "105-5217 Egestas Av.",
    city: "Oslo",
    district: "district",
    selected: false,
  },
  {
    list: 15,
    country: "India",
    company: "Conubia Nostra LLC",
    address: "1793 Odio. Rd.",
    city: "Castiglione Messer Raimondo",
    district: "district",
    selected: false,
  },
  {
    list: 13,
    country: "New Zealand",
    company: "At Augue Id Industries",
    address: "2085 Nonummy Rd.",
    city: "Huesca",
    district: "district",
    selected: false,
  },
  {
    list: 11,
    country: "Vietnam",
    company: "Metus In Associates",
    address: "P.O. Box 304, 1582 Sodales. Road",
    city: "Bragança",
    district: "district",
    selected: false,
  },
];

export const Default = (args: any) => {
  const [rows, setRwos] = React.useState(data);

  return (
    <div style={{ width: 900 }}>
      <Table
        labels={{
          list: "Number",
          country: "Country",
          company: "Company",
          address: "Address",
          city: "City",
          // district: "District",
        }}
        values={rows}
        onCheck={(rows) => {
          console.log("rows", rows);
          setRwos(rows);
        }}
        onRowClick={(row) => console.log("row clicked: ", row)}
        compact={args.compact}
        alternatingRows={args.alternatingRows}
        contained={args.contained}
        selectable={args.selectable}
        columnDivider={args.columnDivider}
        headerColumnDivider={args.headerColumnDivider}
        lastColumnWidthMultiply={args.lastColumnWidthMultiply}
      />
    </div>
  );
};

export const Rtl = withRtl(Default);

export const Responsive = (args: any) => {
  const [rows, setRwos] = React.useState(data);

  return (
    <Table
      labels={{
        list: "Number",
        country: "Country",
        company: "Company",
        address: "Address",
        city: "City",
      }}
      values={rows}
      onCheck={(rows) => {
        console.log("rows", rows);
        setRwos(rows);
      }}
      onRowClick={(row) => console.log("row clicked: ", row)}
      compact={args.compact}
      alternatingRows={args.alternatingRows}
      contained={args.contained}
      selectable={args.selectable}
      responsiveThreshold={2000}
    />
  );
};

export const ResponsiveRtl = withRtl(Responsive);
