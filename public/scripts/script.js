const plus_icon = "assets/images/icon-plus.svg"
const minus_icon = "assets/images/icon-minus.svg"

function toggle_show(paragraph) {
  const allOtherParagraph = Array.from(document.querySelectorAll("p"))
    .filter((p) => p !== paragraph)
  for (const paragraph of allOtherParagraph) {
    paragraph.classList.remove("show")
    const associed_btn = paragraph.parentNode.childNodes[0].childNodes[1]
    associed_btn.src = plus_icon;
  }
  paragraph.classList.toggle("show")
}

function toggle_src(btn) {
  btn.src = btn.src.includes(plus_icon) ? minus_icon : plus_icon;
}

async function feedWithDatas() {
  const list = document.querySelector("ul");

  const basePath = window.location.pathname;
  fetch(`${basePath}data.json`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      for (const item of data) {
        const title_container = document.createElement("div")
        title_container.classList.add("item-title")

        const title_button = document.createElement("img")
        title_button.src = plus_icon;
        title_button.alt = "expand/collapse";
        title_button.tabIndex = 0;

        const title = document.createElement("h2")
        title.innerText = item.title;

        title_container.appendChild(title)
        title_container.appendChild(title_button)

        const paragraph = document.createElement("p")
        paragraph.innerText = item.paragraph;

        const listItem = document.createElement("li");
        listItem.appendChild(title_container)
        listItem.appendChild(paragraph)

        list.appendChild(listItem)

        title_button.addEventListener("click", (_event) => {
          toggle_show(paragraph)
          toggle_src(title_button)
        })

        title_button.addEventListener("keypress", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            toggle_show(paragraph)
            toggle_src(title_button)
          }
        })
      }
    })
}

document.addEventListener("DOMContentLoaded", async (_event) => {
  await feedWithDatas();
})
