import { useState } from "react";

export default function App() {
  const [products, setProducts] = useState([
    { name: "iphone 1", price: 100, quantity: 10, category: "phone" },
    { name: "iphone 2", price: 200, quantity: 15, category: "phone" },
    { name: "iphone 3", price: 205, quantity: 16, category: "phone" },
    { name: "mac pro", price: 2050, quantity: 11, category: "laptop" },
    { name: "mac mini", price: 2005, quantity: 12, category: "laptop" },
    { name: "mac air", price: 2055, quantity: 13, category: "laptop" },
  ]);

  const [categoryList, setCategoryList] = useState(["phone", "laptop"]);
  const [newCategory, setNewCategory] = useState("");
  const [product, setProduct] = useState({ name: "", price: 0, quantity: 0 });
  const [nameSearch, setNameSearch] = useState("");
  const [sortType, setSortType] = useState(null);

  function addProduct() {
    setProducts([...products, product]);
  }

  function displayList(products) {
    const list = products.filter(
      (x) => x.name.includes(nameSearch) || (x.price + "").includes(nameSearch)
    );

    if (sortType === "ASC") return list.sort((a, b) => a.price - b.price);
    if (sortType === "DESC") return list.sort((a, b) => b.price - a.price);
    return list;
  }

  function handleAddCategory() {
    const name = newCategory.trim();
    if (!name) return;
    if (categoryList.includes(name)) {
      alert(`${name} đã tồn tại!`);
      return;
    }
    setCategoryList((prev) => [...prev, name]);
    setNewCategory("");
  }

  return (
    <>
      {categoryList.map((category, index) => (
        <div key={index}>
          <h2>{index + 1}. {category}</h2>
          <button onClick={() =>
            setCategoryList(categoryList.filter((_, i) => i !== index))
          }>
            Xóa category
          </button>
          <button
            onClick={() => {
              const newName = prompt(`Sửa tên category "${category}" thành:`, category);
              if (newName && newName.trim() !== "") {
                const updated = [...categoryList];
                updated[index] = newName.trim();
                setCategoryList(updated);
                setProducts((prev) =>
                  prev.map((p) =>
                    p.category === category ? { ...p, category: newName.trim() } : p
                  )
                );
              }
            }}
            style={{ marginLeft: "10px" }}
          >
            Edit category
          </button>
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddCategory();
        }}
      >
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
        />
        <button type="submit">Thêm</button>
      </form>

      <hr />

      <input
        type="text"
        value={nameSearch}
        onChange={(e) => setNameSearch(e.target.value)}
      />
      <button onClick={() => setSortType("ASC")}>Tăng</button>
      <button onClick={() => setSortType("DESC")}>Giảm</button>
      <button onClick={() => setSortType(null)}>Reset</button>

      <hr />

      {displayList(products).map((product, index) => (
        <h3 key={index}>
          {index + 1}. {product.name}: {product.price}, {product.quantity}, {product.category}
        </h3>
      ))}

      <input
        type="text"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="text"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: +e.target.value })}
      />
      <input
        type="text"
        value={product.quantity}
        onChange={(e) => setProduct({ ...product, quantity: +e.target.value })}
      />
      <button onClick={addProduct}>Thêm</button>
    </>
  );
}
