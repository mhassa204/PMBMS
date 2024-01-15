import React from "react";
import ReactDOM from "react-dom";

export const createIconFromData = (editableData) => {
  const {
    type,
    key,
    ref,
    props: { xmlns, fill, viewBox, strokeWidth, stroke, className, children },
  } = editableData;

  const pathProps = children.props;

  const DynamicIcon = React.createElement(
    type,
    { key, ref, xmlns, fill, viewBox, strokeWidth, stroke, className },
    React.cloneElement(pathProps)
  );

  return DynamicIcon;
};

export const areJSXEqual = (jsx1, jsx2) => {
  // Convert JSX elements to strings for comparison
  const str1 = jsxToString(jsx1);
  const str2 = jsxToString(jsx2);

  return str1 === str2;
};

const jsxToString = (jsxElement) => {
  const div = document.createElement("div");
  const root = ReactDOM.createRoot(div);
  root.render(jsxElement);
  return div.innerHTML;
};
