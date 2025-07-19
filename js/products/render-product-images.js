export function renderProductImgs(images = []) {
  const carouselInner = document.getElementById("carousel-inner");
  if (!carouselInner) return;

  carouselInner.innerHTML =
    images.length > 0
      ? ""
      : `<div class="carousel-item active d-flex align-items-center justify-content-center" style="height: 350px">
         <p class="text-muted">لا توجد صور متاحة</p>
       </div>`;

  images.forEach((img, index) => {
    const div = document.createElement("div");
    div.className = `carousel-item ${index === 0 ? "active" : ""}`;
    div.style.height = "350px";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";

    const imgElement = new Image();
    imgElement.src = img;
    imgElement.className = "d-block";
    imgElement.style.maxHeight = "100%";
    imgElement.style.maxWidth = "100%";
    imgElement.alt = "صورة المنتج";

    imgElement.onload = () => imgElement.classList.add("loaded");
    imgElement.onerror = () => {
      imgElement.alt = "فشل تحميل الصورة";
      console.error(`فشل تحميل الصورة: ${img}`);
    };

    div.appendChild(imgElement);
    carouselInner.appendChild(div);
  });
}
