import createPostRequest from "../Repositries/PostRequest";
import { HttpStatusCode } from "axios";

// add product
const addProduct = document.getElementById("addproducts") as HTMLElement;
const container = document.querySelector(
  ".addproduct-container"
) as HTMLElement;
let productName = document.getElementById("productName") as HTMLInputElement;
let quantity = document.getElementById("quantity") as HTMLInputElement;
let quantityPrice = document.getElementById(
  "perProductPrice"
) as HTMLInputElement;
let description = document.getElementById(
  "productDescription"
) as HTMLInputElement;
const submitProduct = document.getElementById("product-submit") as HTMLElement;
const messageContainer1 = document.getElementById("message-container1");
const messageContainer2 = document.getElementById("message-container2");
const table = document.querySelector("table") as HTMLTableElement;
const closeAddProductForm = document.getElementById("closeAddProductForm");

// add products
submitProduct.addEventListener("click", (event) => {
  event.preventDefault();
  const trimmedProductName = productName.value.trim();
  const trimmedQuantity = quantity.value.trim();
  const trimmedQuantityPrice = quantityPrice.value.trim();
  const trimmedDescription = description.value.trim();
  // Validate input
  if (
    validateProductInput(
      trimmedProductName,
      trimmedQuantity,
      trimmedQuantityPrice,
      trimmedDescription
    )
  ) {
    addProductToDb(
      trimmedProductName,
      parseInt(trimmedQuantity),
      parseInt(trimmedQuantityPrice),
      trimmedDescription
    );
  }
});

const validateProductInput = (
  productName: string,
  quantity: string,
  quantityPrice: string,
  description: string
): boolean => {
  // Check if required fields are not empty
  if (!productName || !quantity || !quantityPrice || !description) {
    messageContainer2!.innerHTML =
      '<div class="alert alert-warning text-center" role="alert">Please fill in all required fields.</div>';
    return false;
  }

  // Validate quantity and quantityPrice are positive numbers
  if (isNaN(parseInt(quantity)) || parseInt(quantity) < 0) {
    messageContainer2!.innerHTML =
      '<div class="alert alert-warning text-center" role="alert">Quantity must be a positive number.</div>';
    return false;
  }

  if (isNaN(parseInt(quantityPrice)) || parseInt(quantityPrice) < 0) {
    messageContainer2!.innerHTML =
      '<div class="alert alert-warning text-center" role="alert">Quantity price must be a positive number.</div>';
    return false;
  }

  // Validation successful
  messageContainer2!.innerHTML = "";
  return true;
};

const addProductToDb = async (
  product_name: string,
  product_quantity: number,
  per_product_price: number,
  product_desc: string
) => {
  const addedProduct = {
    product_name,
    product_desc,
    product_quantity,
    per_product_price,
  };

  try {
    const response = await createPostRequest("/add-product", addedProduct);

    if (response) {
      productName.value = "";
      quantityPrice.value = "";
      quantity.value = "";
      description.value = "";
      renderProductList();
      messageContainer2!.innerHTML = `<div class="alert alert-success alert-sm col-sm-6 offset-sm-3 text-center" role="alert">${response.data.message}!</div>`;
      setTimeout(() => {
        messageContainer2!.innerHTML = "";
      }, 1000);
    } else {
      messageContainer2!.innerHTML =
        '<div class="alert alert-danger text-center" role="alert">Unexpected error. Please try again later.</div>';
      setTimeout(() => {
        messageContainer2!.innerHTML = "";
      }, 1000);
    }
  } catch (error: any) {
    if (
      error.response.status == HttpStatusCode.BadRequest ||
      error.response.status == HttpStatusCode.NotFound ||
      error.response.status == HttpStatusCode.Forbidden
    ) {
      messageContainer2!.innerHTML = `<div class="alert alert-danger text-center" role="alert">${error.response.data.message}</div>`;
      setTimeout(() => {
        messageContainer2!.innerHTML = "";
      }, 1000);
    }
  }
};

let ProductAllData: any[] = [];
// Reading data from the server
import createGetRequest from "../Repositries/GetRequest";

export const renderProductList = async () => {
  try {
    const productList = await createGetRequest("/product-list/");
    ProductAllData = productList;
    displayProductList(productList);
  } catch (error: any) {
    console.error("Error fetching sales data:", error.message);
  }
};
renderProductList();

const displayProductList = (productList: any[]) => {
  const productListElement = document.getElementById(
    "productList"
  ) as HTMLDivElement;
  productListElement!.innerHTML = "";

  productList.forEach((product: any) => {
    const tr = document.createElement("tr");
    if (product.product_quantity < 5) {
      tr.style.backgroundColor = "#ed565e";
    } else if (product.product_quantity >= 5 && product.product_quantity < 15) {
      tr.style.backgroundColor = "rgb(229, 229, 97)";
    }
    tr.innerHTML = `
          <td>${product.product_id}</td>
          <td>${product.product_name}</td>
          <td>${product.product_desc}</td>
          <td>${product.product_quantity}</td>
          <td>${product.per_product_price}</td>
          <td>${product.total_Cost}</td>
          <td>${new Date(product.createdAt).toLocaleDateString()}</td>
          <td>${new Date(product.updatedAt).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-button" data-product-id="${
              product.product_id
            }">Edit</button>
            <button class="btn btn-danger btn-sm delete-button" data-product-id="${
              product.product_id
            }">Delete</button>
          </td>
        `;
    productListElement.appendChild(tr);
  });
};

// search for products
const productSearchInput = document.getElementById(
  "productSearch"
) as HTMLInputElement;

const filterProductsData = (searchTerm: string) => {
  const filteredData = ProductAllData.filter((products) =>
    products.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayProductList(filteredData);
};

productSearchInput.addEventListener("input", () => {
  const searchTerm = productSearchInput.value.trim();
  filterProductsData(searchTerm);
});

// update
import updateRequest from "../Repositries/UpdateRequest";
const editSubmit = document.getElementById("editSubmit") as HTMLElement;
// Retrieve values from the form
const editProductName = document.getElementById(
  "editProductName"
) as HTMLInputElement;
const editQuantity = document.getElementById(
  "editQuantity"
) as HTMLInputElement;
const perProductPrice = document.getElementById(
  "editPerProductPrice"
) as HTMLInputElement;
const productDescription = document.getElementById(
  "editProductDescription"
) as HTMLInputElement;
const editProductSection = document.querySelector(
  ".editproduct-container"
) as HTMLElement;
const messageContainer3 = document.getElementById("messageContainer3");
const mainpage = document.getElementById("mainpage") as HTMLElement;
const closeEditForm = document.getElementById("closeEditForm");

// display menupulation
editProductSection.style.display = "none";
container.style.display = "none";
addProduct.addEventListener("click", () => {
  if (container) {
    container.style.display = "block";
    mainpage.style.display = "none";
  }
});

closeAddProductForm!.addEventListener("click", function () {
  mainpage.style.display = "block";
  container!.style.display = "none";
});

closeEditForm?.addEventListener("click", () => {
  editProductSection.style.display = "none";
  mainpage.style.display = "block";
});

// edit and delete
table.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  console.log(target);
  const editButton = target.closest(".edit-button");
  const deleteButton = target.closest(".delete-button");

  if (editButton) {
    editProductSection.style.display = "block";
    mainpage.style.display = "none";
    const productId = parseInt(
      editButton.getAttribute("data-product-id") || "null"
    );
    editProduct(productId);
  } else if (deleteButton) {
    const productId = parseInt(
      deleteButton.getAttribute("data-product-id") || "null"
    );
    // console.log(productId);
    deleteProduct(productId);
  }
});

const editProduct = async (productId: number) => {
  const existingProductData = await createGetRequest(
    `/product-list/${productId}`
  );
  // Populate the form with existing data
  editProductName.value = existingProductData.product_name;
  productDescription.value = existingProductData.product_desc;
  editQuantity.value = existingProductData.product_quantity.toString();
  perProductPrice.value = existingProductData.per_product_price.toString();

  editSubmit.addEventListener("click", async function (event) {
    event.preventDefault();

    // Retrieve values from the form
    const updatedData = {
      product_name: editProductName.value.trim(),
      product_desc: productDescription.value.trim(),
      product_quantity: parseInt(editQuantity.value),
      per_product_price: parseInt(perProductPrice.value),
    };

    // Validate input
    if (validateEditProductInput(updatedData)) {
      try {
        const response = await updateRequest(
          `/product-list/${productId}`,
          updatedData
        );
        renderProductList();
        messageContainer3!.innerHTML = `<div class="alert alert-success alert-sm col-sm-6 offset-sm-3 text-center" role="alert">${response.data.message}!</div>`;
        setTimeout(() => {
          messageContainer3!.innerHTML = "";
        }, 1000);
      } catch (error) {
        console.log(error);
        messageContainer3!.innerHTML =
          '<div class="alert alert-danger text-center" role="alert">Unexpected error. Please try again later.</div>';
        setTimeout(() => {
          messageContainer3!.innerHTML = "";
        }, 1000);
      }
    }
  });

  const validateEditProductInput = (updatedData: any): boolean => {
    // Check if required fields are not empty
    if (
      !updatedData.product_name ||
      !updatedData.product_quantity ||
      !updatedData.per_product_price
    ) {
      messageContainer3!.innerHTML =
        '<div class="alert alert-warning text-center" role="alert">Please fill in all required fields.</div>';
      return false;
    }

    // Validate product_quantity and per_product_price are positive numbers
    if (
      isNaN(updatedData.product_quantity) ||
      updatedData.product_quantity < 0
    ) {
      messageContainer3!.innerHTML =
        '<div class="alert alert-warning text-center" role="alert">Product quantity must be a positive number.</div>';
      return false;
    }

    if (
      isNaN(updatedData.per_product_price) ||
      updatedData.per_product_price < 0
    ) {
      messageContainer3!.innerHTML =
        '<div class="alert alert-warning text-center" role="alert">Per product price must be a positive number.</div>';
      return false;
    }

    // Validation successful
    messageContainer3!.innerHTML = "";
    return true;
  };
};

// delete product
import createDeleteRequest from "../Repositries/DeleteRequest";

const deleteProduct = async (id: number) => {
  try {
    await createDeleteRequest(`/product-list/${id}`);
    renderProductList();
  } catch (error) {
    messageContainer1!.innerHTML =
      '<div class="alert alert-danger text-center" role="alert">Unexpected error. Please try again later.</div>';
    setTimeout(() => {
      messageContainer1!.innerHTML = "";
    }, 1000);
  }
};
