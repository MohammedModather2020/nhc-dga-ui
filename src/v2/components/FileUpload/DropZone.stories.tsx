import { Meta } from "@storybook/react";
import FileUpload from "./DropZone";
import withRtl from "../../../lib/RTL";
import React from "react";
import { FilesListItem } from "./FileUpload";
import Button from "../Button";

const meta = {
  title: "DGAUI/V2/FileUpload/DropZone",
  component: FileUpload,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    multiple: {
      control: { type: "boolean" },
    },
  },
  args: {
    disabled: false,
    multiple: true,
    accept: "image/*,application/pdf",
    title: "Drag and drop files here to upload",
    helperText:
      "Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.",
    uploadText: "Browse Files",
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

// Stories
// type Story = StoryObj<typeof FileUpload>;

export const Default = (args: any) => {
  const [files, setFiles] = React.useState<FilesListItem[]>([
    {
      id: "1",
      status: "loading",
      file: new File([], "fileName.png", { type: "image/png" }),
    },
    {
      id: "2",
      status: "success",
      file: new File([], "fileName uploaded successfully.png", {
        type: "image/png",
      }),
    },
    {
      id: "3",
      status: "error",
      helperText: "Error while uploading",
      file: new File([], "fileName not uploaded.png", { type: "image/png" }),
    },
  ]);

  const onDrophandler = (fileList: FilesListItem[]) => {
    setFiles((prevState) => prevState.concat(fileList));
  };

  const onDeleteHandler = (file: FilesListItem) => {
    setFiles((prevState) =>
      prevState.filter((currentFile) => currentFile.id !== file.id)
    );
  };

  return (
    <FileUpload
      onDrop={onDrophandler}
      onFileListItemDeleted={onDeleteHandler}
      filesList={files}
      {...args}
    />
  );
};

export const CustomSubmitButton = (args: any) => {
  return (
    <FileUpload
      {...args}
      submitButton={<Button color="secondary">Custom submit button</Button>}
    />
  );
};

export const Rtl = withRtl((args: any) => {
  const [files, setFiles] = React.useState<FilesListItem[]>([
    {
      id: "1",
      status: "loading",
      file: new File([], "ملف.png", { type: "image/png" }),
    },
    {
      id: "2",
      status: "success",
      file: new File([], "ملف تم رفعه بنجاح.png", {
        type: "image/png",
      }),
    },
    {
      id: "3",
      status: "error",
      helperText: "حدث خطأ اثناء رفع الملف",
      file: new File([], "ملف لم يتم رفعه.png", { type: "image/png" }),
    },
  ]);

  const onDrophandler = (fileList: FilesListItem[]) => {
    setFiles((prevState) => prevState.concat(fileList));
  };

  const onDeleteHandler = (file: FilesListItem) => {
    setFiles((prevState) =>
      prevState.filter((currentFile) => currentFile.id !== file.id)
    );
  };

  return (
    <FileUpload
      title="اسحب و أفلت الملفات هنا للرفع"
      helperText="الحد الأقصى لحجم الملف المسموح به هو 2 ميجا بايت، وتشمل تنسيقات الملفات المدعومة .jpg، و.png، و.pdf."
      uploadText="تصفح الملفات"
      onDrop={onDrophandler}
      onFileListItemDeleted={onDeleteHandler}
      filesList={files}
      {...args}
    />
  );
});
