import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItem } from "./redtool/slices/crudSlice";

const CrudTable = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.crud.items);

  const [newItemName, setNewItemName] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Qidiruv uchun holat
  const [deletingItemId, setDeletingItemId] = useState(null); // O'chirilayotgan elementni kuzatish
  const [isLoading, setIsLoading] = useState(false); // Yuklanish holatini boshqarish

  useEffect(() => {
    // Simulating initial data load (you can replace this with actual API call or Redux action)
    setIsLoading(true);
    setTimeout(() => {
    }, 2000);
    setIsLoading(false); // 2 soniyadan so'ng yuklash tugadi
  }, []);

  const handleAddItem = () => {
    if (newItemName) {
      setIsLoading(true); 
      setTimeout(() => {
        dispatch(addItem({ id: Date.now(), name: newItemName }));
        setNewItemName("");
        setIsLoading(false); 
      }, 500);
    }
  };

  const handleUpdateItem = (id) => {
    if (editingItemName) {
      setIsLoading(true); // Yuklanish holatini qo'shish
      setTimeout(() => {
        dispatch(updateItem({ id, name: editingItemName }));
        setEditingItemId(null);
        setEditingItemName("");
        setIsLoading(false); // CRUD tugagach yuklash tugaydi
      }, 500); // 0.5 soniya kechiktirish
    }
  };

  // Function to handle deleting an item
  const handleDeleteItem = (id) => {
    setDeletingItemId(id); // Avval qatorni o'chirilayotganini belgilash
    setIsLoading(true); // Yuklanish holatini qo'shish
    setTimeout(() => {
      dispatch(removeItem(id)); // Redux'dan o'chirish
      setDeletingItemId(null); // O'chirilgandan so'ng qayta tiklash
      setIsLoading(false); // CRUD tugagach yuklash tugaydi
    }, 500); // 0.5 soniyadan keyin
  };

  // Qidiruvni amalga oshirish uchun filtrlangan elementlar
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2>CRUD Table</h2>

      {/* Search input */}
      <input
        type="search"
        placeholder="Search items"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Yuklanish animatsiyasi */}
      {isLoading && <div className="loader"></div>}

      {!isLoading && (
        <>
          {/* Add Item Section */}
          <div>
            <input
              type="text"
              placeholder="Enter item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <button onClick={handleAddItem}>Add Item</button>
          </div>

          {/* Table for CRUD Operations */}
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className={deletingItemId === item.id ? "fading-out" : ""}
                >
                  <td>{item.id}</td>
                  <td>
                    {editingItemId === item.id ? (
                      <input
                        type="text"
                        value={editingItemName}
                        onChange={(e) => setEditingItemName(e.target.value)}
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>
                    {editingItemId === item.id ? (
                      <>
                        <button onClick={() => handleUpdateItem(item.id)}>
                          Save
                        </button>
                        <button onClick={() => setEditingItemId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingItemId(item.id);
                            setEditingItemName(item.name);
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => handleDeleteItem(item.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CrudTable;
