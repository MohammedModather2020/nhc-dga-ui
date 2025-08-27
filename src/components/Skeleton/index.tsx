import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../lib/helpers";
import useTheme from "../../lib/useTheme";
import SkeletonCircle from "./Circle";
import SkeletonLine from "./Line";
import SkeletonSquare from "./Square";
import SkeletonRectangle from "./Rectangle";

interface DGA_SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  type?:
    | "imageButtonAndText"
    | "iconAndList"
    | "imageContentAndButton"
    | "chartAndContent"
    | "imageProfileContentAndButton";
}

const Result: React.FC<any> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <StyledComponent
      $theme={theme}
      {...props}
      className={mergeStrings("dgaui dgaui_skeleton", props.className)}
    >
      {children}
    </StyledComponent>
  );
};

const Skeleton: React.FC<DGA_SkeletonProps> = ({
  type = "chartAndContent",
  ...props
}) => {
  if (type === "chartAndContent") {
    return (
      <Result {...props}>
        <SkeletonCircle style={{ marginBottom: 24 }} size="240px" />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
      </Result>
    );
  }

  if (type === "imageContentAndButton") {
    return (
      <Result {...props}>
        <SkeletonSquare style={{ marginBottom: 24 }} size="240px" />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonRectangle size="small" style={{ width: 59, marginTop: 24 }} />
      </Result>
    );
  }

  if (type === "imageProfileContentAndButton") {
    return (
      <Result {...props}>
        <SkeletonSquare style={{ marginBottom: 24 }} size="240px" />
        <div className="circleAndLine">
          <SkeletonCircle size="24px" />
          <SkeletonLine size="small" />
        </div>
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonRectangle size="small" style={{ width: 59, marginTop: 24 }} />
      </Result>
    );
  }

  if (type === "imageButtonAndText") {
    return (
      <Result {...props} style={{ minWidth: 200 }}>
        <div className="imageButtonAndText">
          <SkeletonCircle size="48px" />
          <div className="rightSection">
            <SkeletonLine size="small" />
            <SkeletonRectangle size="small" style={{ width: 59 }} />
          </div>
        </div>
      </Result>
    );
  }

  // else iconAndList
  return (
    <Result {...props} style={{ minWidth: 200 }}>
      <div className="iconAndList">
        <SkeletonSquare size="48px" />
        <div className="rightSection">
          <SkeletonLine size="small" />
          <SkeletonLine size="small" />
          <SkeletonLine size="small" />
        </div>
      </div>
    </Result>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
}>`
  direction: ${(p) => p.$theme.direction};

  div {
    margin-bottom: 12px;
  }

  .circleAndLine {
    display: flex;
    align-items: center;
    .dgaui_skeletonLine {
      width: 67px;
      margin-inline-start: 8px;
    }
  }

  .imageButtonAndText {
    div {
      margin: 0;
    }
    display: flex;
    min-width: 200px;
    align-items: center;

    .rightSection {
      flex: 1;
      margin-inline-start: 8px;
      .dgaui_skeletonLine {
        margin-bottom: 8px;
      }
    }
  }

  .iconAndList {
    display: flex;
    .dgaui_skeletonSquare {
    }

    .rightSection {
      flex: 1;
      margin-inline-start: 24px;
    }
  }
`;

export default Skeleton;
