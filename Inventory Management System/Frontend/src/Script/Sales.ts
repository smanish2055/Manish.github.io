import createPostRequest from "../Repositries/PostRequest";
import createGetRequest from "../Repositries/GetRequest";
import { HttpStatusCode } from "axios";

const addSalesButton = document.getElementById(
  "addSalesButton"
) as HTMLButtonElement;
const salesForm = document.getElementById("salesForm") as HTMLFormElement;
const mainpage = document.getElementById("mainpage") as HTMLElement;

const closeFormButton = document.getElementById(
  "closeFormButton"
) as HTMLButtonElement;

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

salesForm.style.display = "none";

addSalesButton.addEventListener("click", function () {
  mainpage.style.display = "none";
  salesForm.style.display = "block";
});

closeFormButton.addEventListener("click", function () {
  salesForm.style.display = "none";
  mainpage.style.display = "block";
});

submitSales.addEventListener("click", async (event) => {
  event.preventDefault();
  const productNameInput = productName.value.trim();
  const quantitySoldInput = parseInt(quantitySold.value.trim());
  const pricePerItemInput = parseInt(pricePerItem.value.trim());
  const saleDateInput = saleDate.value.trim();

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
  return true;
};

//  message display
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
    renderSalesData();
    return response;
  } catch (err: any) {
    displayErrorMessage(err.response.data.message);
    throw err;
  }
};

let salesAllData: any[] = [];
// rendering data
export const renderSalesData = async () => {
  try {
    const response = await createGetRequest("/sales/");
    salesAllData = response;
    console.log("Response:", response);
    displaySalesData(response);
  } catch (error: any) {
    console.error("Error fetching sales data:", error.message);
  }
};
renderSalesData();

const displaySalesData = (salesData: any[]) => {
  const salesTableBody = document.getElementById("salesTableBody");
  // Clear existing content
  salesTableBody!.innerHTML = "";

  // Loop through the sales data and create table rows
  salesData.forEach((sale) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${sale.sales_id}</td>
      <td>${sale.product_name}</td>
      <td>${sale.quantity_sold}</td>
      <td>${sale.price_per_item}</td>
      <td>${sale.total_sales_price}</td>
      <td>${sale.sales_profit}</td>
      <td>${new Date(sale.sale_date).toLocaleDateString()}</td>
      <td>
        <button class="btn btn-danger btn-sm delete-button" data-sales-id="${
          sale.sales_id
        }">Delete</button>
      </td>
    `;
    salesTableBody!.appendChild(row);
  });
};

// search
// const searchButton = document.getElementById(
//   "searchButton"
// ) as HTMLButtonElement;
const salesSearchInput = document.getElementById(
  "salesSearchInput"
) as HTMLInputElement;

const filterSalesData = (searchTerm: string) => {
  const filteredData = salesAllData.filter((sale) =>
    sale.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displaySalesData(filteredData);
};

salesSearchInput.addEventListener("input", () => {
  const searchTerm = salesSearchInput.value.trim();
  filterSalesData(searchTerm);
});

// delete btton
import createDeleteRequest from "../Repositries/DeleteRequest";
const table = document.querySelector("table");

table?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const deleteButton = target.closest(".delete-button");
  const salesId = deleteButton!.getAttribute("data-sales-id");

  if (salesId !== null) {
    const salesIdNumber = parseInt(salesId);
    console.log(salesIdNumber);
    handleDeleteSales(salesIdNumber);
  }
});

const handleDeleteSales = async (id: number) => {
  try {
    await createDeleteRequest(`/sales/${id}`);
    console.log(`Sale with ID ${id} deleted successfully.`);
    renderSalesData();
  } catch (error: any) {
    console.log(error);
  }
};
