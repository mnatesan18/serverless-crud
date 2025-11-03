import { useEffect, useState } from "react";
import { getItems, createItem, deleteItem, updateItem } from "./api";
import ItemForm from "./components/ItemForm";
import ItemCard from "./components/ItemCard";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching items:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

const handleAdd = async (item) => {
  
  try {
    const res = await createItem(item);
    console.log("API response from createItem:", res);

    const newItem = res.item || res; // FIX: unwrap item from { message, item }
    setItems((prev) => [...prev, newItem]);
  } catch (err) {
    console.error("Error adding item:", err);
  }
};


  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await updateItem(id, updatedData);
      const updated = res.item || res;
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...updated } : i))
      );
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  const clearEdit = () => setEditingItem(null);

  useEffect(() => {
    loadItems();
  }, []);

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-700 to-red-600 flex flex-col items-center">
    
    {/* NAVBAR */}
    <nav className="w-full bg-white/20 backdrop-blur-md shadow-lg py-4 sticky top-0 z-50">
      <h1 className="text-3xl font-extrabold text-center text-white tracking-wide drop-shadow-lg">
        🧠 Items Dashboard
      </h1>
      <div className="mx-auto w-40 h-1 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full mt-2"></div>
    </nav>

    {/* MAIN CONTAINER */}
    <div className="w-full max-w-3xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mt-10 border border-white/40">
      <ItemForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingItem={editingItem}
        clearEdit={clearEdit}
      />

      {loading ? (
        <p className="text-center text-gray-100 mt-6 animate-pulse">
          Loading items...
        </p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-100 mt-6 italic">
          No items yet! Add something creative ✨
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onEdit={setEditingItem}
            />
          ))}
        </div>
      )}
    </div>

    {/* FOOTER */}
    <footer className="mt-12 text-sm text-white/80">
      Built with 💙 Serverless + React
    </footer>
  </div>
);

}
