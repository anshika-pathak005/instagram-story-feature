var arr = [
  { dp: "./img/jk.jpeg", story: "./img/jk2.jpeg" },
  { dp: "./img/v.jpeg", story: "./img/v2.jpeg" },
  { dp: "./img/jm.jpeg", story: "./img/jiminn.png" },
  { dp: "./img/jh.jpeg", story: "./img/jh2.jpg" },
  { dp: "./img/suga.jpeg", story: "./img/suga2.png" },
  { dp: "./img/jin.jpeg", story: "./img/jin2.jpg" },
  { dp: "./img/rm.jpeg", story: "./img/rm2.jpg" },
];

var stories = document.querySelector(".stories");
var story = document.querySelector(".full_screen");

function renderStories() {
  let clutter = "";
  arr.forEach(function (elem, idx) {
    clutter += `<div class="story">
            <img id="${idx}" src="${elem.dp}" alt="">
        </div>`;
  });
  stories.innerHTML = clutter;
}

// Initial render
renderStories();

//stoty opening
stories.addEventListener("click", function (dets) {
  const clickedStory = dets.target.closest(".story");
  if (!clickedStory) return; // If clicked empty space, do nothing

  const clickedIdx = parseInt(dets.target.id);
  story.dataset.currentIdx = clickedIdx;

  // mark story as viewed immediately
  dets.target.parentElement.classList.add("viewed");

  // show story
  story.style.display = "block";
  story.style.backgroundImage = `url(${arr[dets.target.id].story})`;

  // reset progress bar
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = "0%";
  void progressBar.offsetWidth;
  progressBar.style.width = "98%";

  // ensuring any previous timeout is cleared
  clearTimeout(story.hideTimeout);
  story.hideTimeout = setTimeout(() => {
    story.style.display = "none";
    delete story.dataset.currentIdx;
  }, 3000);
});

//funxtion for the tooltip
const addStory = document.querySelector(".add-story");
const tooltip = document.querySelector(".tooltip");
const fileInput = document.getElementById("fileInput");

addStory.addEventListener("click", () => {
  tooltip.style.opacity = "1";
  setTimeout(() => {
    tooltip.style.opacity = "0";
  }, 2000); // 2 seconds
  fileInput.click();
});

//fileinput function for adding the stort
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const newStory = {
      dp: e.target.result,
      story: e.target.result,
    };

    // Add new story to the beginning
    arr.unshift(newStory);

    renderStories();
    // again rendering to show the new story
  };

  reader.readAsDataURL(file);
});

// deletw button on story
var fullDeleteBtn = document.querySelector(".full_delete_btn");
fullDeleteBtn.addEventListener("click", () => {
  if (!story.dataset.currentIdx) return; // nothing selected

  const idx = parseInt(story.dataset.currentIdx);

  // Remove from array
  arr.splice(idx, 1);

  // Hide full screen
  story.style.display = "none";

  // Re-render stories
  renderStories();
});

// if user click on the story while viewing it , then close it (like in instagram)
story.addEventListener("click", (e) => {
  // Optional: ignore clicks on the delete button
  if (e.target.classList.contains("full_delete_btn")) return;

  // Prevent it from triggering immediately after open
  if (!story.dataset.currentIdx) return;
  // Hide full screen
  story.style.display = "none";

  // Clear the current index
  delete story.dataset.currentIdx;
  clearTimeout(story.hideTimeout);
});
