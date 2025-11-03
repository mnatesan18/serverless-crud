export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="p-5 rounded-2xl bg-white/40 backdrop-blur-md shadow-md hover:shadow-2xl hover:scale-[1.02] transition-transform border border-white/30">
      <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
      <p className="text-gray-700 text-sm mt-1 mb-3">{item.description}</p>

      <div className="flex gap-4">
        <button
          onClick={() => onEdit(item)}
          className="px-3 py-1 text-sm rounded-md bg-blue-500/90 hover:bg-blue-600 text-white shadow-md transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="px-3 py-1 text-sm rounded-md bg-rose-500/90 hover:bg-rose-600 text-white shadow-md transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
