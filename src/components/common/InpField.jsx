import React from "react";

const InpField = ({ label, children, htmlFor, error }) => {
  const id = htmlFor || getInpId(children);
  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={id} className="block mb-2">
          {label}
        </label>
      )}
      {children}
      {error && (
        <i className="block text-red-500 text-sm mt-2">{error.message}</i>
      )}
    </div>
  );
};

const getInpId = (children) => {
  const child = React.Children.only(children);

  if ("id" in child.props) {
    return child.props.id;
  }
};

export default InpField;
