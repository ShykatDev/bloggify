import { motion } from "framer-motion";

const DeleteConfirm = ({ onClose, onDelete }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-slate-950 bg-opacity-30 backdrop-blur flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.3 }}
        className="delete-card"
      >
        <h2>Are you sure you want to delete?</h2>
        <div className="flex justify-center items-center gap-4 mt-3">
          <button onClick={onDelete} className="text-indigo-400">
            Yes
          </button>
          <button onClick={onClose} className="text-red-500">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirm;
