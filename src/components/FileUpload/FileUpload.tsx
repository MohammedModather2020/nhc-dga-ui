import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import Button from "../Button";
import FileCard, { FileCardStatus } from "./FileCard";
import { generateUniqueId } from "../../lib/helpers";

export type FilesListItem = {
  file: File;
  id: string;
  status?: FileCardStatus;
  helperText?: React.ReactNode;
};

export interface DGA_FileUploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onDrop" | "title"
  > {
  title?: React.ReactNode;
  helperText?: React.ReactNode;
  uploadText?: React.ReactNode;
  onDrop: (fileList: FilesListItem[]) => void;
  filesList?: FilesListItem[];
  onFileListItemDeleted?: (file: FilesListItem) => void;
  submitButton?: React.ReactElement<typeof Button>;
}

const FileUpload: React.FC<DGA_FileUploadProps> = ({
  title,
  helperText,
  uploadText,
  onDrop,
  filesList,
  onFileListItemDeleted,
  submitButton,
  ...porps
}) => {
  const theme = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onDrophandler = (fileList?: FileList) => {
    if (fileList) {
      const result: FilesListItem[] = [];
      for (const file of fileList) {
        result.push({
          id: generateUniqueId(),
          file,
        });
      }
      onDrop(result);
    }
  };

  return (
    <div className={"dgaui dgaui_fileUploadSingle"}>
      <StyledComponent $theme={theme} onClick={() => inputRef.current?.click()}>
        <span className="title">{title}</span>
        <span className="helperText">{helperText}</span>
        {submitButton && submitButton}
        {!submitButton && (
          <Button
            color="neutral"
            variant="contained"
            disabled={porps.disabled}
            type="button"
          >
            {uploadText}
          </Button>
        )}
        <input
          ref={inputRef}
          onChange={(e) => onDrophandler(e.target.files || undefined)}
          type="file"
          {...porps}
          multiple={porps.multiple ? porps.multiple : false}
        />
      </StyledComponent>

      {filesList?.map((el) => (
        <FileCard
          theme={theme}
          key={el.id}
          status={el.status}
          filename={el.file.name}
          helperText={el.helperText}
          onDelete={() => onFileListItemDeleted && onFileListItemDeleted(el)}
        />
      ))}
    </div>
  );
};

const StyledComponent = styled.div<{ $theme: Theme }>`
  direction: ${(props) => props.$theme.direction};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input {
    flex: 0;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .helperText {
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    margin-bottom: 16px;
    color: #64748b;
  }

  &:has(input:disabled) {
    pointer-events: none;
    color: ${(p) => p.$theme.palette.neutral[400]};
  }
`;

export default FileUpload;
