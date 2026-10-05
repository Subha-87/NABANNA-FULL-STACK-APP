
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <dialog
      open
      className="fixed inset-0 m-auto w-[90%] max-w-md rounded-lg p-0 shadow-xl"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Confirm Delete
        </h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to delete this?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-200 px-4 py-2"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-4 py-2 text-white"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmDialog
