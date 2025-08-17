import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import Icon from "./Icon";
import Button from "../Button";
import FileCard from "./FileCard";
import { generateUniqueId } from "../../lib/helpers";
import { FilesListItem } from "./FileUpload";

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

const DropZone: React.FC<DGA_FileUploadProps> = ({
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
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
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

  React.useEffect(() => {
    if (ref.current) {
      const dragOverhandler = (e: DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(true);
      };
      const dragLeavhandler = () => {
        setIsDraggingOver(false);
      };
      const dropHandler = (e: DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);
        onDrophandler(e.dataTransfer?.files);
      };

      ref.current.addEventListener("dragover", dragOverhandler);
      ref.current.addEventListener("dragleave", dragLeavhandler);
      ref.current.addEventListener("drop", dropHandler);

      return () => {
        ref.current?.removeEventListener("dragover", dragOverhandler);
        ref.current?.removeEventListener("dragend", dragLeavhandler);
        ref.current?.removeEventListener("drop", dropHandler);
      };
    }
  }, [ref]);

  return (
    <div className={"dgaui dgaui_fileUploadDropZone"}>
      <StyledComponent
        $theme={theme}
        ref={ref}
        className={isDraggingOver ? "hovered" : ""}
        onClick={() => inputRef.current?.click()}
      >
        <Icon />
        <span className="title">
          {title ?? "Drag and drop files here to upload"}
        </span>
        <span className="helperText">{helperText}</span>
        {submitButton && submitButton}
        {!submitButton && (
          <Button color="neutral" style="neutral" disabled={porps.disabled}>
            {uploadText ?? "Browse Files"}
          </Button>
        )}
        <input
          ref={inputRef}
          onChange={(e) => onDrophandler(e.target.files || undefined)}
          type="file"
          {...porps}
          multiple={porps.multiple ? porps.multiple : true}
        />
      </StyledComponent>

      {filesList?.map((el) => (
        <FileCard
          theme={theme}
          key={el.id}
          status={el.status}
          filename={el.file?.name}
          helperText={el.helperText}
          onDelete={() => onFileListItemDeleted && onFileListItemDeleted(el)}
        />
      ))}
    </div>
  );
};

const StyledComponent = styled.div<{ $theme: Theme }>`
  direction: ${(props) => props.$theme.direction};
  height: 220px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 24px;
  background-color: ${(p) => p.$theme.palette.neutral[100]};
  /* https://kovart.github.io/dashed-border-generator */
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%' height='100%' fill='none' rx='4' ry='4' stroke='rgb(210,214,219)' stroke-width='2' stroke-dasharray='10%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;

  input {
    flex: 0;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .elementsImage {
    width: 24px;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
  }
  .helperText {
    font-size: 12px;
    text-align: center;
    line-height: 20px;
  }
  .uploadText {
    color: ${(p) => p.$theme.palette.neutral[800]};
  }

  &:hover,
  &.hovered {
    background-color: ${(props) => props.$theme.palette.success[25]};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%' height='100%' fill='none' rx='4' ry='4' stroke='rgb(6,118,71)' stroke-width='2' stroke-dasharray='10%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    color: ${(p) => p.$theme.palette.success[700]};

    .elementsIcon path {
      fill: ${(p) => p.$theme.palette.success[700]};
    }
  }

  &:has(input:disabled) {
    pointer-events: none;
    color: ${(p) => p.$theme.palette.neutral[400]};
    .elementsIcon path {
      fill: ${(p) => p.$theme.palette.neutral[400]};
    }
  }
`;

export default DropZone;
