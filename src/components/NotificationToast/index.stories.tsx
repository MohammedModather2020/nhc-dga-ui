import { Meta } from "@storybook/react";
import InlineAlert from ".";
import Button from "../Button";
import toast from ".";
import "./index.css";

const meta = {
  title: "DGAUI/toast",
  argTypes: {
    position: {
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      control: { type: "select" },
    },
    duration: {
      control: { type: "text" },
    },
  },
  args: {
    duration: "3000",
  },
} satisfies Meta<typeof InlineAlert>;

export default meta;

export const Default = (args: any) => {
  return (
    <div className="margin">
      <div>
        <Button
          onClick={() =>
            toast({
              rtl: true,
              duration: args.duration,
              position: "top-left",
              title: "Test title",
              description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              actionButtons: <Button variant="outlined">ok</Button>,
              color: "error",
            })
          }
        >
          top-left
        </Button>
        <Button
          onClick={() =>
            toast({
              duration: args.duration,
              position: "top-center",
              title: "Test title",
            })
          }
        >
          top-center
        </Button>
        <Button
          onClick={() =>
            toast({
              duration: args.duration,
              position: "top-right",
              title: "Test title",
            })
          }
        >
          top-right
        </Button>
      </div>

      <div>
        <Button
          onClick={() =>
            toast({
              duration: args.duration,
              position: "bottom-left",
              title: "Test title",
            })
          }
        >
          bottom-left
        </Button>
        <Button
          onClick={() =>
            toast({
              duration: args.duration,
              position: "bottom-center",
              title: "Test title",
            })
          }
        >
          bottom-center
        </Button>
        <Button
          onClick={() =>
            toast({
              duration: args.duration,
              position: "bottom-right",
              title: "Test title",
            })
          }
        >
          bottom-right
        </Button>
      </div>
      <div>
        <Button
          onClick={() =>
            toast({
              rtl: true,
              duration: args.duration,
              position: "bottom-right",
              color: "error",
              background: "color",
              title: "عنوان النص",
            })
          }
        >
          Rtl bottom-right
        </Button>
      </div>
    </div>
  );
};
