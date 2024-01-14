import createPostRequest from "../Repositries/PostRequest";
import { HttpStatusCode } from "axios";

const addSalesButton = document.getElementById(
  "addSalesButton"
) as HTMLButtonElement;
const salesForm = document.getElementById("salesForm") as HTMLFormElement;
const closeFormButton = document.getElementById(
  "closeFormButton"
) as HTMLButtonElement;

salesForm.style.display = "none";
addSalesButton.addEventListener("click", function () {
  salesForm.style.display = "block";
});

closeFormButton.addEventListener("click", function () {
  salesForm.style.display = "none";
});

const productName = document.getElementById("productName") as HTMLInputElement;
const quantitySold = document.getElementById(
  "quantitySold"
) as HTMLInputElement;
const pricePerItem = document.getElementById(
  "pricePerItem"
) as HTMLInputElement;
const saleDate = document.getElementById("saleDate") as HTMLInputElement;

const submitSales = document.getElementById("submitSales") as HTMLButtonElement;
const formFeedback = document.getElementById("fromFeedback");

submitSales.addEventListener("click", async (event) => {
  event.preventDefault();

  const productNameInput = productName.value.trim();
  const quantitySoldInput = parseInt(quantitySold.value.trim());
  const pricePerItemInput = parseInt(pricePerItem.value.trim());
  const saleDateInput = JSON.stringify(saleDate.value.trim());

  if (
    validateForm(
      productNameInput,
      quantitySoldInput,
      pricePerItemInput,
      saleDateInput
    )
  ) {
    const response = await addSales(
      productNameInput,
      quantitySoldInput,
      pricePerItemInput,
      saleDateInput
    );
    try {
      if (response.status === HttpStatusCode.Accepted) {
        displaySuccessMessage(response.data.message);
        resetForm();
      } else {
        displayErrorMessage("Error submitting sales.");
      }
    } catch (err: any) {
      displayErrorMessage("Error submitting sales.");
    }
  }
});

const validateForm = (
  productName: string,
  quantitySold: number,
  pricePerItem: number,
  saleDate: string
): boolean => {
  if (!productName || productName.trim() === "") {
    displayErrorMessage("Product name is required.");
    return false;
  }

  if (isNaN(quantitySold) || quantitySold <= 0) {
    displayErrorMessage("Quantity must be a positive number.");
    return false;
  }

  if (isNaN(pricePerItem) || pricePerItem <= 0) {
    displayErrorMessage("Price per item must be a positive number.");
    return false;
  }

  if (!saleDate) {
    displayErrorMessage("Sale date is required.");
    return false;
  }

  // You can add more specific checks for the saleDate format, if needed.

  return true;
};

const displaySuccessMessage = (message: string) => {
  formFeedback!.innerHTML = `<div class="alert alert-success" role="alert">${message}</div>`;
};

const displayErrorMessage = (error: any) => {
  formFeedback!.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
};

const resetForm = () => {
  productName.value = "";
  quantitySold.value = "";
  pricePerItem.value = "";
  saleDate.value = "2024-01-10";
};

const addSales = async (
  productNameInput: string,
  quantitySoldInput: number,
  pricePerItemInput: number,
  saleDateInput: string
) => {
  const salesInfo = {
    product_name: productNameInput,
    quantity_sold: quantitySoldInput,
    price_per_item: pricePerItemInput,
    sale_date: saleDateInput,
  };

  try {
    const response = await createPostRequest("/sales/", salesInfo);
    console.log(response.data);
    return response;
  } catch (err: any) {
    displayErrorMessage(err.response.data.message);
    throw err;
  }
};
