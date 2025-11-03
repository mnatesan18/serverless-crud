import { useState, useEffect } from "react";

export default function ItemForm({ onAdd, onUpdate, editingItem, clearEdit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // only run this if editingItem actually exists
    if (editingItem) {
      setName(editingItem.name || "");
      setDescription(editingItem.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const itemData = { name, description };

    if (editingItem) {
      onUpdate(editingItem.id, itemData);
      clearEdit();
    } else {
      onAdd(itemData);
    }

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="flex-1 p-2 border rounded"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="flex-1 p-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {editingItem ? "Update" : "Add"}
      </button>
    </form>
  );
}
