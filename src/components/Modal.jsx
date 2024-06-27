import React from "react";

const ModalPage = (props) => {
  const { isVisible, onClose, width, height, children } = props;

  if (!isVisible) return null;

  const onBackdropClick = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      onClick={onBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className={`${width} ${height} flex flex-col bg-white`}>
        <button onClick={onClose} className="self-end">
          <img src="/x.png" alt="Close menu" />
        </button>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default ModalPage;
