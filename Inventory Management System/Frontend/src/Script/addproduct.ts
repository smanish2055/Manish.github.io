import createPostRequest from "../Repositries/PostRequest";
import { HttpStatusCode } from "axios";

const addProduct = document.getElementById("addproducts") as HTMLElement;
const container = document.querySelector(
  ".addproduct-container"
) as HTMLElement | null;

const productName = document.getElementById("productName") as HTMLInputElement;
const quantity = document.getElementById("quantity") as HTMLInputElement;
const quantityPrice = document.getElementById(
  "perProductPrice"
) as HTMLInputElement;
const description = document.getElementById(
  "productDescription"
) as HTMLInputElement;
const submitProduct = document.getElementById("product-submit") as HTMLElement;
const messageContainer = document.getElementById("message-container");

addProduct.addEventListener("click", () => {
  if (container) {
    container.style.display = "block";
  }
});

submitProduct.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(
    quantity.value.trim(),
    quantityPrice.value.trim(),
    description.value.trim()
  );
  addProductToDb(
    productName.value.trim(),
    description.value.trim(),
    quantity.value.trim(),
    quantityPrice.value.trim()
  );
});
//  "product_name": "DroneV1",
//   "product_desc": "Aerial photography drone",
//   "product_quantity": 100,
//   "per_product_price": 100

const addProductToDb = async (
  product_name: string,
  product_desc: string,
  product_quantity: string,
  per_product_price: string
) => {
  const addedProduct = {
    product_name,
    product_desc,
    product_quantity,
    per_product_price,
  };

  try {
    const response = await createPostRequest("/add-product", addedProduct);

    if (response.status === HttpStatusCode.Accepted) {
      messageContainer!.innerHTML ='<div class="alert alert-success text-center" role="alert">Product added successfully!</div>';
    } else {
       messageContainer!.innerHTML =
         '<div class="alert alert-danger text-center" role="alert">Unexpected error. Please try again later.</div>';
    }
  } catch (error: any) {
    if (
      error.response.status == HttpStatusCode.BadRequest ||
      error.response.status == HttpStatusCode.NotFound ||
      error.response.status == HttpStatusCode.Forbidden
    ) {
       messageContainer!.innerHTML = `<div class="alert alert-danger text-center" role="alert">${error.response.data.message}</div>`;
    } else {
       messageContainer!.innerHTML =
         '<div class="alert alert-danger" role="alert text-center">Unexpected error. Please try again later.</div>';
    }
  }
};
