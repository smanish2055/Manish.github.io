import createGetRequest from "../../Repositries/GetRequest";
// import { renderProductList } from "../../Script/addproduct";
// const displayList = await createGetRequest("/product-list/");

const opensidebar = document.getElementById("opensidebar") as HTMLElement;
const closesidebar = document.getElementById("closesidebar") as HTMLElement;
const logout = document.getElementById("logout") as HTMLElement;
const sidebar = document.getElementById("sidebar") as HTMLElement;
const username = document.querySelector(".username") as HTMLElement;
// const sideAddProduct = document.getElementById("sideAddProduct") as HTMLElement;

opensidebar.addEventListener("click", () => {
  sidebar.classList.add("sidebar-responsive");
});

closesidebar.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-responsive");
});

logout.addEventListener("click", () => {
  const userConfirmed = confirm("Are you sure you want to log out?");
  if (userConfirmed) {
    localStorage.removeItem("jwt");
    window.location.href = "../Login/login.html";
  }
});

const data = await createGetRequest("/dashboard/");
console.log(data);

const loadData = async (data: any) => {
  try {
    if (data) {
      username.innerHTML = data.username;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
loadData(data);

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

// function logout() {
//   localStorage.removeItem("jwt");
//   window.location.href = "../Login/login.html";
// }

// Initial load of the default page (e.g., dashboard)
loadPageContent("Dashboard", "dashboard");

// Example: Change content when clicking on "Add Products" in the sidebar
document
  .querySelector<HTMLDivElement>(".sidebar-list-item1")!
  .addEventListener("click", function () {
    location.reload();
    loadPageContent("Dashboard", "dashboard");
  });

const item2=document.querySelector(".sidebar-list-item2") as HTMLElement;

  item2!.addEventListener("click", function () {
    loadPageContent("AddProducts", "addProduct");
    // renderProductList();
  });

document
  .querySelector<HTMLDivElement>(".sidebar-list-item3")!
  .addEventListener("click", function () {
    loadPageContent("Sales", "sales");
  });

// export default loadPageContent;

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
