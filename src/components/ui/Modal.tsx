// components/ui/Modal.js
const Modal = ({ show, onClose, title, children, contentClass }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-xl bg-opacity-80 flex items-center justify-center text-gray-100">
      <div className="bg-gray-900/90 backdrop-blur-xl rounded p-4 w-96 border border-gray-800/90 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-amber-200 text-lg font-bold">{title}</h2>
        </div>
        <div className={contentClass}>{children}</div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-transparent border border-slate-800 hover:bg-blue-300/10 text-white px-4 py-2 rounded "
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
