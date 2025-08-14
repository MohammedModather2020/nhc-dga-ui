import { Meta } from "@storybook/react";
import DatePicker from ".";
import React from "react";
import { DateObject } from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import Modal from "../Modal";
import Button from "../Button";
import withRtl from "../../../lib/RTL";

const meta = {
  title: "DGAUI/V2/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  argTypes: {
    hijri: {
      control: { type: "boolean" },
    },
    range: {
      control: { type: "boolean" },
    },
    minYear: {
      control: { type: "number" },
    },
    maxYear: {
      control: { type: "number" },
    },
  },
  args: {
    hijri: false,
    range: false,
    closeOnSelect: false,
    withTextInput: true,
    textInputProps: { label: "Date", placeholder: "DD/MM/YYYY" },
    value: new DateObject(),
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

export const Default = (args: any) => {
  return (
    <DatePicker {...args} onChange={(dateObject) => console.log(dateObject)} />
  );
};

export const Rtl = withRtl(Default);

export const GregoreanTOHijri = () => {
  const [date, setDate] = React.useState<DateObject>();
  const [dateText, setdateText] = React.useState("");
  const [hijriDateText, setHijriDateText] = React.useState("");

  const onDatechangedHandler = (date: DateObject) => {
    setDate(date);
    const result = `${date.year}/${date.month.number}/${date.day}`;
    setdateText(result);

    const hijriDate = date.convert(arabic, arabic_ar);
    const hijriResult = `${hijriDate.year}/${hijriDate.month.number}/${hijriDate.day}`;
    setHijriDateText(hijriResult);
  };

  return (
    <div>
      {date && (
        <div style={{ textAlign: "right", fontSize: 20, color: "#666" }}>
          التاريخ الواقع في <b>{dateText}</b> الموافق ل <b>{hijriDateText}</b>
        </div>
      )}
      <div></div>
      <DatePicker
        withTextInput={false}
        value={date}
        onChange={onDatechangedHandler}
      />
    </div>
  );
};

export const MinMaxDates = () => {
  return (
    <DatePicker
      onChange={(dateObject) => console.log(dateObject)}
      minDate={new DateObject({ year: 2010, month: 1, day: 5 })}
      maxDate={new DateObject({ year: 2030, month: 12, day: 25 })}
      textInputProps={{ label: "Date", placeholder: "from 2010 to 2030" }}
    />
  );
};

export const InModal = () => {
  const [date, setDate] = React.useState<DateObject>();
  const [open, setOpen] = React.useState(false);

  const onChangeHandler = (date: DateObject) => {
    setDate(date);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        {date ? `month: ${date.month} - day: ${date.day}` : "Open date picker"}
      </Button>
      <Modal
        title="Pcik a date"
        size="auto"
        open={open}
        onClose={() => setOpen(false)}
        body={
          <DatePicker
            value={date}
            withTextInput={false}
            onChange={onChangeHandler}
          />
        }
      />
    </div>
  );
};
