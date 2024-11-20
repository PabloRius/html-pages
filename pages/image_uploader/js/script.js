const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

function switchStatus(status, img) {
  const outer = document.getElementById("container-outer");

  const input = document.getElementById("drop-zone");
  const loader = document.getElementById("progress-container");
  const result = document.getElementById("result-container");
  switch (status) {
    case "input":
      outer.classList.add("input");
      outer.classList.remove("loader");
      outer.classList.remove("result");

      input.classList.remove("hidden");
      input.classList.add("visible");
      loader.classList.add("hidden");
      loader.classList.remove("visible");
      result.classList.add("hidden");
      result.classList.remove("visible");
      brake;
    case "loading":
      outer.classList.remove("input");
      outer.classList.add("loader");
      outer.classList.remove("result");

      input.classList.add("hidden");
      input.classList.remove("visible");
      loader.classList.remove("hidden");
      loader.classList.add("visible");
      result.classList.add("hidden");
      result.classList.remove("visible");
      break;
    case "result":
      outer.classList.remove("input");
      outer.classList.remove("loader");
      outer.classList.add("result");

      input.classList.add("hidden");
      input.classList.remove("visible");
      loader.classList.add("hidden");
      loader.classList.remove("visible");
      result.classList.remove("hidden");
      result.classList.add("visible");

      // result.style.backgroundImage = `url(${img})`;
      result.src = img;
      break;

    default:
      console.error(`Invalid option ${status}`);
      break;
  }
}

async function uploadToCloudinary(file) {
  switchStatus("loading");
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }
    const data = await response.json();
    console.log("Uploaded successfully:", data);
    alert("Image uploaded successfully!");
    console.log(data.secure_url);
    switchStatus("result", data.secure_url);
  } catch (error) {
    console.error("Upload error:", error);
    switchStatus("input");
    alert("Image upload failed.");
  }
}

function validateFile(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSize = 2 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG, PNG, or GIF files are allowed.");
    return false;
  }

  if (file.size > maxSize) {
    alert("The file size must not exceed 2MB.");
    return false;
  }

  return true;
}

function listenFileInput() {
  const fileInput = document.getElementById("file-input");

  fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file || !validateFile(file)) {
      fileInput.value = "";
    } else {
      await uploadToCloudinary(file);
    }
  });
}

function listenDragAndDrop() {
  const dragAndDropZone = document.getElementById("drop-zone");
  const fileInput = document.getElementById("file-input");
  dragAndDropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (validateFile(file)) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        const event = new Event("change", { bubbles: true });
        fileInput.dispatchEvent(event);
      }
    }
    dragAndDropZone.classList.remove("dragover");
  });
}

function listenDragover() {
  const dragAndDropZone = document.getElementById("drop-zone");
  dragAndDropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragAndDropZone.classList.add("dragover");
  });
  dragAndDropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragAndDropZone.classList.remove("dragover");
  });
}

const startWorking = () => {
  console.log("Local scripts loaded");
  listenFileInput();
  listenDragAndDrop();
  listenDragover();
};

document.addEventListener("DOMContentLoaded", () => {
  startWorking();
});
