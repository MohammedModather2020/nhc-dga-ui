import React from "react";
import { Meta } from "@storybook/react";
import Modal from ".";
import Button from "../Button";
import withRtl from "../../lib/RTL";
import circleInfoEx from "../../assets/images/circle_info_ex.svg";

const meta = {
  title: "DGAUI/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  args: {
    title: "Title goes here",
    icon: <img src={circleInfoEx} />,
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    align: "center",
  },
} satisfies Meta<typeof Modal>;

export default meta;

export const Default = (args: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const WithFooter = (args: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        {...args}
        open={open}
        icon={<img src={circleInfoEx} />}
        onClose={() => setOpen(false)}
        body={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`}
        footerStartButtons={[
          <Button>Button 1</Button>,
          <Button style="neutral">Button 2</Button>,
        ]}
        footerEndButtons={[
          <Button style="neutral" color="error" onClick={() => setOpen(false)}>
            Close
          </Button>,
        ]}
      />
    </>
  );
};

export const Rtl = withRtl(() => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        title="عنوان النص"
        icon={<img src={circleInfoEx} />}
        body={
          'لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني. انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق "ليتراسيت" (Letraset) البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل "ألدوس بايج مايكر" (Aldus PageMaker) والتي حوت أيضاً على نسخ من نص لوريم إيبسوم.'
        }
        align="start"
        open={open}
        onClose={() => setOpen(false)}
        footerStartButtons={[
          <Button>عنوان ١</Button>,
          <Button style="secondary-outline">عنوان ٢</Button>,
        ]}
        footerEndButtons={[
          <Button
            style="secondary-outline"
            color="error"
            onClick={() => setOpen(false)}
          >
            إغلاق
          </Button>,
        ]}
      />
    </>
  );
});
