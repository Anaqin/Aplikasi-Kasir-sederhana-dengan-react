import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [baris, setBaris] = useState([
    { productName: "", productPrice: 0, qty: 1, total: 0 },
  ]);
  const [grandTotal, setGrandTotal] = useState(0);

  const tambahBaris = () => {
    setBaris([
      ...baris,
      { productName: "", productPrice: 0, qty: 1, total: 0 },
    ]);
  };

  const buttonhapus = (index) => {
    const updatedBaris = baris.filter((_, i) => i !== index);
    setBaris(updatedBaris);
    calculateGrandTotal(updatedBaris);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBaris = [...baris];
    updatedBaris[index][name] =
      name === "productPrice" || name === "qty" ? parseInt(value) || 0 : value;

    if (name === "productPrice" || name === "qty") {
      const price = updatedBaris[index].productPrice || 0;
      const qty = updatedBaris[index].qty || 1;
      updatedBaris[index].total = price * qty;
    }

    setBaris(updatedBaris);
    calculateGrandTotal(updatedBaris);
  };

  const calculateGrandTotal = (updatedBaris) => {
    const total = updatedBaris.reduce((acc, row) => acc + row.total, 0);
    setGrandTotal(total);
  };

  return (
    <div className="App">
      <button
        type="button"
        className="btn btn-secondary fw-semibold ms-custom mt-3"
        onClick={tambahBaris}
      >
        New
      </button>

      {baris.map((row, index) => (
        <div className="container mt-4" key={index}>
          <div className="row me-2 d-flex">
            <div className="col-md-3">
              <label htmlFor="productName" className="fw-semibold mb-2">
                Product name
              </label>
              <input
                type="text"
                id="productName"
                className="form-control"
                name="productName"
                value={row.productName}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="productPrice" className="fw-semibold mb-2">
                Product price
              </label>
              <input
                type="number"
                id="productPrice"
                className="form-control"
                name="productPrice"
                value={row.productPrice}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>

            <div className="col-md-2">
              <label htmlFor="qty" className="fw-semibold mb-2">
                Qty
              </label>
              <input
                type="number"
                id="qty"
                className="form-control"
                name="qty"
                value={row.qty}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>

            <div className="col-md-4 d-flex justify-content-between align-items-center">
              <div>
                <label htmlFor="total" className="fw-semibold mb-2">
                  Total
                </label>
                <input
                  type="number"
                  id="total"
                  className="form-control"
                  name="total"
                  value={row.total}
                  readOnly
                />
              </div>
              <div className="ms-1">
                {baris.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger fw-semibold ms-custom mt-3"
                    onClick={() => buttonhapus(index)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="container mt-4">
        <h4>Grand Total: {grandTotal}</h4>
      </div>
    </div>
  );
};

export default App;
