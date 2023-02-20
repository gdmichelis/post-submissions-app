"use strict";
const input = document.querySelector("input[type = file]");
const imageInfo = document.querySelector(".file-info");
input.style.opacity = 0;
input.addEventListener("change", imageDisplayUpdate);

// Custom Structure & Styling to Image Input
function imageDisplayUpdate() {
  while (imageInfo.firstChild) {
    imageInfo.removeChild(imageInfo.firstChild);
  }

  const cfiles = input.files;
  if (cfiles.length === 0) {
    const sp = document.createElement("span");
    sp.textContent = "Δεν έχει επιλεγεί εικόνα για ανέβασμα";
    imageInfo.appendChild(sp);
  } else {
    const list = document.createElement("ul");
    imageInfo.appendChild(list);
    for (const file of cfiles) {
      const listItem = document.createElement("li");
      const sp = document.createElement("span");
      if (validTypeFile(file)) {
        sp.textContent = `'Ονομα αρχείου: ${
          file.name
        }, Μέγεθος αρχείου: ${returnFileSize(file.size)}.`;
        const image = document.createElement("img");
        image.classList.add("uploaded-img");
        image.src = URL.createObjectURL(file);
        listItem.appendChild(image);
        listItem.appendChild(sp);
      } else {
        sp.textContent = `Το αρχείο με όνομα  ${file.name}, δεν επιτρέπεται για ανέβασμα.`;
        listItem.appendChild(sp);
      }
      list.appendChild(listItem);
    }
  }
}

function returnFileSize(num) {
  if (num < 1024) {
    return `${num} bytes`;
  } else if (num >= 1024 && num < 1048576) {
    return `${(num / 1024).toFixed(1)} KB`;
  } else if (num > 1048576) {
    return `${(num / 1048576).toFixed(1)} MB`;
  }
}

const validFiles = ["image/jpeg", "image/png", "image/tiff"];
function validTypeFile(file) {
  return validFiles.includes(file.type);
}