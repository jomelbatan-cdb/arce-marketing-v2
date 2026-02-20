import React from "react";
import { Edit, Trash2 } from "lucide-react";
import CopyButton from "@/components/Button/CopyButton";

interface ActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  textToCopy?: string;
}

const ProductActions: React.FC<ActionsProps> = ({
  onEdit,
  onDelete,
  textToCopy,
}) => {
  return (
    <div className="flex gap-2">
      {textToCopy?.trim() && <CopyButton textToCopy={textToCopy} />}
      <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
        <Edit size={18} />
      </button>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default ProductActions;
