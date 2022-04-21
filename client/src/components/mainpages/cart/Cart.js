import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState({
    recipient_name: "",
    line1: "",
    city: "",
  });

  console.log({address})

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Bạn muốn xóa sản phẩm này?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async () => {
    const paymentID = "abc";

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("Bạn đã đặt hàng thành công.");
  };

  if (cart.length === 0)
    return (
      <h3 style={{ textAlign: "center", fontSize: "5rem" }}>Giỏ hàng rỗng</h3>
    );

  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />

          <div className="box-detail">
            <h2>{product.title}</h2>

            <h3>{product.price * product.quantity} VNĐ</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>

            <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}

      <div className="address">
        <h3>Vui lòng nhập địa chỉ</h3>
        <input
          type="text"
          name="recipient_name"
          required
          placeholder="Tên"
          value={address.recipient_name}
          onChange={onChangeInput}
        />

        <input
          type="text"
          name="line1"
          required
          placeholder="Số nhà, đường"
          value={address.line1}
          onChange={onChangeInput}
        />
        <input
          type="text"
          name="city"
          required
          placeholder="Thành phố"
          value={address.city}
          onChange={onChangeInput}
        />
      </div>

      <div className="transport">
        <h3>Vui lòng chọn đơn vị vận chuyển</h3>
        <div>
          <input type="radio" value="GHTK" checked />
          <label>Giao hàng tiết kiệm (Miễn phí giao hàng)</label>
        </div>
        <br></br>
      </div>

      <div className="total">
        <h3>Tổng: {total} VNĐ</h3>
        <button onClick={tranSuccess} type="primary">
          Thanh toán
        </button>
      </div>
    </div>
  );
}

export default Cart;
