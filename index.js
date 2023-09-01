// FETCHING CATEGORY FUNCTION
const fetchCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const categoryData = await response.json();
  displayCategoryButton(categoryData);
};

const categoryContainer = document.getElementById("category-container");
// DISPLAY CATEGORY BUTTON FUNCTION
const displayCategoryButton = async (categoryData) => {
  categoryData.data.forEach((category) => {
    const categoryID = category.category_id;
    const categoryName = category.category;

    const categoryButton = document.createElement("button");
    categoryButton.classList =
      "btn normal-case font-medium text-lg bg-btnbg text-black hover:bg-btnbg";
    categoryButton.innerText = categoryName;
    categoryButton.setAttribute("onclick", `updateVideoSection(${categoryID})`);
    categoryButton.setAttribute("id", `${categoryID}`);
    categoryContainer.appendChild(categoryButton);
  });
  // SELECTING 'ALL' CATEGORY BY DEFAULT
  updateVideoSection(1000);
};

// UPDATE VIDEOS BASED ON CATEGORY ID FUNCTION
const updateVideoSection = async (category_id) => {
  // UPDATING BUTTON COLOR
  categoryContainer.childNodes.forEach((button) => {
    if (button.getAttribute("id") === `${category_id}`) {
      button.classList.remove("hover:bg-btnbg");
      button.classList.remove("bg-btnbg");
      button.classList.remove("text-black");
      button.classList.add("hover:bg-primarycolor");
      button.classList.add("bg-primarycolor");
      button.classList.add("text-white");
    } else {
      button.classList.add("hover:bg-btnbg");
      button.classList.add("bg-btnbg");
      button.classList.add("text-black");
      button.classList.remove("hover:bg-primarycolor");
      button.classList.remove("bg-primarycolor");
      button.classList.remove("text-white");
    }
  });
  storeVideoInCache(category_id);
};

// DISPLAY VIDEOS FUNCTION
const videoContainer = document.getElementById("video-container");
const noVideoElement = document.getElementById("no-video-element");
let videoCache = [];
const storeVideoInCache = async (category_id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${category_id}`
  );
  const allVideoData = await response.json();

  videoContainer.innerHTML = "";
  videoContainer.classList.remove("hidden");
  videoContainer.classList.add("flex");
  videoCache = [];
  if (allVideoData.status) {
    // REMOVING THE 'NO VIDEO FOUND' ELEMENT IF IT EXISTS
    noVideoElement.classList.remove("flex");
    noVideoElement.classList.add("hidden");

    // LOOPING THROUGH EACH VIDEO DATA
    allVideoData.data.forEach((videoData) => {
      videoCache.push(videoData);
      displayVideo(videoData);
    });

    // SHOWING VIDEOS
  } else {
    // DISPLAYING THE 'NO VIDEO ELEMENT' ELEMENT
    noVideoElement.classList.add("flex");
    noVideoElement.classList.remove("hidden");
    // HIDING VIDEO CONTAINER
    videoContainer.classList.add("hidden");
    videoContainer.classList.remove("flex");
  }
};

// DISPLAY A SINGLE VIDEO DATA.
const displayVideo = (videoData) => {
  videoContainer.innerHTML += `<a href="#">
        <div class="w-full space-y-5">
          <!-- THUMBNAIL -->
          <div class="w-full relative">
            <!-- IMAGE -->
            <img
              src="${videoData?.thumbnail}"
              alt="thumb"
              class="rounded-xl w-full aspect-video object-cover"
            />
            <!-- TAG -->
            <span
              class="bg-[#171717] text-white text-[10px] p-1 rounded-md absolute right-1 bottom-1 ${
                !videoData?.others?.posted_date ? "hidden" : ""
              }"
              >${
                videoData?.others?.posted_date
                  ? secondsToTime(videoData?.others?.posted_date)
                  : ""
              }</span
            >
          </div>
          <!-- DETAILS CONTAINER -->
          <div class="flex gap-3">
            <!-- PROFILE PICTURE -->
            <img
              src="${videoData?.authors[0]?.profile_picture}"
              alt="profile"
              class="w-10 h-10 rounded-full object-cover"
            />
            <!-- DETAILS -->
            <div
              class="flex flex-col items-start justify-center gap-y-1"
            >
              <!-- TITLE -->
              <h1 class="font-bold">
                ${videoData?.title}
              </h1>
              <!-- CREATOR AND VERIFIED -->
              <div class="flex gap-x-[9px]">
                <p class="text-sm text-[#5d5d5d]">${
                  videoData?.authors[0]?.profile_name
                }</p>
                <div class="flex justify-center items-center">
                <img alt="" src="${
                  videoData?.authors[0]?.verified
                    ? "images/icons8-verified-50.png"
                    : ""
                }" class="w-4 h-4 ${
    !videoData?.authors[0]?.verified ? "hidden" : ""
  }" />
                </div>
              </div>
              <!-- VIEWS -->
              <p class="text-sm text-[#5d5d5d] mt-[3px]">${
                videoData?.others?.views
              } views</p>
            </div>
          </div>
        </div>
      </a>`;
};

// SECOND TO TIME FORMAT FUNCTION

const secondsToTime = (seconds) => {
  seconds = parseInt(seconds);
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} hrs ${minutes} min ago`;
};

// SORT BY VIEWS FUNCTION
const sortByViews = () => {
  if (videoCache.length > 0) {
    // CLEARING CONTAINER
    videoContainer.innerHTML = "";
    videoContainer.classList.remove("hidden");
    videoContainer.classList.add("flex");
    videoCache.sort(
      (a, b) => parseInt(b.others.views) - parseInt(a.others.views)
    );
    videoCache.forEach((videoData) => {
      displayVideo(videoData);
    });
  }
};

// ADDING SORT BY VIEW FUNCTION TO BUTTON
const sortButtons = document.getElementsByClassName("btn-sort");
sortButtons[0].addEventListener("click", sortByViews);
sortButtons[1].addEventListener("click", sortByViews);

fetchCategory();
