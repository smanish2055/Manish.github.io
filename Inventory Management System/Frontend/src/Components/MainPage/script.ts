// import createGetRequest from "../../Repositries/GetRequest";
// import { renderProductList } from "../../Script/addproduct";
// const displayList = await createGetRequest("/product-list/");

const opensidebar = document.getElementById("opensidebar") as HTMLElement;
const closesidebar = document.getElementById("closesidebar") as HTMLElement;
const logout = document.getElementById("logout") as HTMLElement;
const sidebar = document.getElementById("sidebar") as HTMLElement;
const username = document.querySelector(".username") as HTMLElement;

opensidebar.addEventListener("click", () => {
  sidebar.classList.add("sidebar-responsive");
});

closesidebar.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-responsive");
});

// load page content
async function loadPageContent(dir: string, page: string) {
  const mainContent = document.getElementById("mainContent");
  fetch(`../${dir}/${page}.html`)
    .then((response) => response.text())
    .then((html) => {
      if (mainContent) {
        mainContent.innerHTML = html;
        nodeScriptReplace(mainContent);
      }
    })
    .catch((error) => {
      console.error("Error loading content:", error);
      if (mainContent) {
        mainContent.innerHTML = "<p>Error loading content</p>";
      }
    });
}

// Initial load of the default page
loadPageContent("Dashboard", "dashboard");

//  Change content when clicking on "Add Products" in the sidebar
document
  .querySelector<HTMLDivElement>(".sidebar-list-item1")!
  .addEventListener("click", function () {
    location.reload();
    loadPageContent("Dashboard", "dashboard");
  });

const AddProductPage = document.querySelector(
  ".sidebar-list-item2"
) as HTMLElement;
AddProductPage.addEventListener("click", function () {
  loadPageContent("AddProducts", "addProduct");
  // renderProductList();
});

document
  .querySelector<HTMLDivElement>(".sidebar-list-item3")!
  .addEventListener("click", function () {
    loadPageContent("Sales", "sales");
  });

// export default loadPageContent;

// logout
logout.addEventListener("click", () => {
  const userConfirmed = confirm("Are you sure you want to log out?");
  if (userConfirmed) {
    localStorage.removeItem("jwt");
    window.location.href = "../Login/login.html";
  }
});

function nodeScriptReplace(node: any) {
  if (nodeScriptIs(node) === true) {
    node.parentNode.replaceChild(nodeScriptClone(node), node);
  } else {
    var i = -1,
      children = node.childNodes;
    while (++i < children.length) {
      nodeScriptReplace(children[i]);
    }
  }

  return node;
}
function nodeScriptClone(node: any) {
  var script = document.createElement("script");
  script.text = node.innerHTML;

  var i = -1,
    attrs = node.attributes,
    attr;
  while (++i < attrs.length) {
    script.setAttribute((attr = attrs[i]).name, attr.value);
  }
  return script;
}

function nodeScriptIs(node: any) {
  return node.tagName === "SCRIPT";
}

document.addEventListener("DOMContentLoaded", function () {
  const islog = localStorage.getItem("jwt");
  if (islog) {
    history.replaceState(null, document.title, window.location.href);
  }
});
