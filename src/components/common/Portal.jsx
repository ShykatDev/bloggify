import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const mountEl = document.getElementById("portal");
  const elDiv = document.createElement("div");

  useEffect(() => {
    mountEl.appendChild(elDiv);

    return () => mountEl.removeChild(elDiv);
  }, [elDiv, mountEl]);
  return createPortal(children, mountEl);
};

export default Portal;
