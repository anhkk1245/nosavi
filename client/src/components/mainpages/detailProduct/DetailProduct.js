import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };

  return (
    <>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <h3>{detailProduct.title}</h3>
          <span>{detailProduct.price} VNĐ</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Đã bán: {detailProduct.sold}</p>
          {detailProduct.prepaymentRequired && (
            <>
              <p>Lưu ý: Sản phẩm yêu cầu đặt cọc</p>
              <p>
                Số lượng đặt mua tối thiểu: {detailProduct.minRequiredQuantity}
              </p>
            </>
          )}
          <p>Ngày thu hoạch: {detailProduct.harvestedTime}</p>
          <p>
            Số lượng thu hoạch: {detailProduct.harvestedQuantity}{" "}
            {detailProduct.unit}
          </p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(detailProduct)}
          >
            Mua ngay
          </Link>
        </div>
      </div>

      <div>
        <h2>Sản phẩm liên quan</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
