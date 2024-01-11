// Function to load content for different pages
const sidebar = document.getElementById("sidebar") as HTMLElement;
function openSidebar() {
  sidebar.classList.add("sidebar-responsive");
}

function closeSidebar() {
  sidebar.classList.remove("sidebar-responsive");
}


function loadPageContent(dir: string, page: string) {
   
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


// Initial load of the default page (e.g., dashboard)
loadPageContent("Dashboard", "dashboard");





// Example: Change content when clicking on "Add Products" in the sidebar
document
  .querySelector<HTMLDivElement>(".sidebar-list-item1")!
  .addEventListener("click", function () {
    location.reload();
    loadPageContent("Dashboard", "dashboard");
  });

document
  .querySelector<HTMLDivElement>(".sidebar-list-item2")!
  .addEventListener("click", function () {
    loadPageContent("AddProducts", "addProduct");
  });

  document
    .querySelector<HTMLDivElement>(".sidebar-list-item3")!
    .addEventListener("click", function () {
    
      loadPageContent("Sales", "sales");
    });




function nodeScriptReplace(node:any) {
        if ( nodeScriptIs(node) === true ) {
                node.parentNode.replaceChild( nodeScriptClone(node) , node );
        }
        else {
                var i = -1, children = node.childNodes;
                while ( ++i < children.length ) {
                      nodeScriptReplace( children[i] );
                }
        }

        return node;
}
function nodeScriptClone(node:any){
        var script  = document.createElement("script");
        script.text = node.innerHTML;

        var i = -1, attrs = node.attributes, attr;
        while ( ++i < attrs.length ) {                                    
              script.setAttribute( (attr = attrs[i]).name, attr.value );
        }
        return script;
}

function nodeScriptIs(node:any) {
        return node.tagName === 'SCRIPT';
}
