var pre_img = document.getElementById("prev");
var next_img = document.getElementById("next");
var imageWrapper = document.querySelector(".image-wrapper");



var container = document.querySelector(".container");
var initialValue = 0;
var imageIndex = 0;

//  creating dynamic image section
var footer = document.querySelector(".navigator");
let pictures = [
  {
    path: "https://source.unsplash.com/160x160/?truck",
  },
  {
    path: "https://source.unsplash.com/160x160/?car",
  },
  {
    path: "https://source.unsplash.com/160x160/?motorbike",
  },
  {
    path: "https://source.unsplash.com/160x160/?bus",
  },
  {
    path: "https://source.unsplash.com/160x160/?winter-jackets",
  },
  {
    path: "https://source.unsplash.com/160x160/?basketball",
  },
];

imageWrapper.style.width = pictures.length * 600 + "px";

// creating circular button present below carousel container
pictures.forEach((ele, i) => {
  const navigate = document.createElement("button");
  navigate.className = "dot";
  navigate.setAttribute("id", `${i + 1}`);
  footer.appendChild(navigate);

  const wrap = document.createElement("div");
  wrap.className = "img";
  const img = document.createElement("img");
  img.src = ele.path;

  wrap.appendChild(img);
  imageWrapper.appendChild(wrap);
});

// btn_navigate.addEventListener("click", () => {
//   conaole.log(btn_navigate.gettAttribute("id"));
// });

// arrow next  function
next_img.addEventListener("click", () => {
  imageIndex++;
  //  console.log(imageIndex);
  initialValue = imageIndex * -600;
  if (imageIndex < pictures.length - 1) {
    imageWrapper.style.left = initialValue + "px";
  } else {
    imageIndex = 0;
    initialValue = imageIndex * -600;
    imageWrapper.style.left = initialValue + "px";
  }
});

// arrow previous function
pre_img.addEventListener("click", () => {
  imageIndex--;

  initialValue = imageIndex * -600;
  if (imageIndex >= 0) {
    imageWrapper.style.left = initialValue + "px";
  } else {
    imageIndex = pictures.length - 1;
    initialValue = imageIndex * -600;
    imageWrapper.style.left = initialValue + "px";
  }
});

// setting .dot present container bottom

var dots = document.querySelectorAll(".dot");

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    imageIndex = index;
    updateCarousel();
  });
});

function updateCarousel() {
  initialValue = imageIndex * -600;
  imageWrapper.style.left = initialValue + "px";

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Add "active" class to the clicked dot
  dots[imageIndex].classList.add("active");
}

function nextImage() {
  imageIndex = (imageIndex + 1) % pictures.length;
  updateCarousel();
}
// Set interval for automatic looping
var intervalId = setInterval(nextImage, 3000); // Change 3000 to your desired interval in milliseconds

// container.addEventListener("mouseover", () => {
//     stopAutomaticLooping();
// })

// Stop automatic looping on button click
function stopAutomaticLooping() {
  clearInterval(intervalId);
}
