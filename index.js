const url = "https://api.openai.com/v1/images/generations";
const key = "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";

// const prompt = "Isto é tudo pessoal!";

const header = {
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
};
const sendButton = document.getElementById("send-button");
const responseContainer = document.querySelector(".response-container");

sendButton.addEventListener("click", (event) => {
  const inputText = document.getElementById("input-text");
  const value = inputText.value;
  const body_image = { prompt: `${value}`, n: 4, size: "1024x1024" };
  const body = JSON.stringify(body_image);

  console.log(body);
  event.preventDefault();
  const text = inputText.value;
  inputText.value = "";

  fetch(url, {
    method: "POST",
    headers: header,
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      const dataItems = data.data;

      const div = document.createElement("div");
      const div_img = document.createElement("div");
      const div_btn = document.createElement("div");
      const buttons_url = [];

      div.setAttribute(
        "style",
        "display: flex; flex-direction: column; align-items: center; justify-content: flex-start;"
      );

      dataItems.forEach((item) => {
        const img = document.createElement("img");
        img.src = item.url;
        buttons_url.push(item.url);
        div_img.appendChild(img);

        div_btn.setAttribute(
          "style",
          "display: flex; flex-direction: column; align-items: center; justify-content: flex-start;"
        );
        let html =
          '<a href="' +
          buttons_url[0] +
          '" target="_blank"><button>1</button></a>' +
          '<a href="' +
          buttons_url[1] +
          '" target="_blank"><button>2</button></a>' +
          '<a href="' +
          buttons_url[2] +
          '" target="_blank"><button>3</button></a>' +
          '<a href="' +
          buttons_url[3] +
          '" target="_blank"><button>4</button></a>';

        div_btn.innerHTML = html;
        div_btn.setAttribute(
          "style",
          "display: flex; flex-direction: row; align-items: center; justify-content: flex-start;"
        );
        div_btn.classList.add("buttons_links");

        div.appendChild(div_img);
        div.appendChild(div_btn);
        responseContainer.appendChild(div);
      });
    })
    .catch(
      (error) => console.error(error),
      window.alert("Acontecu um erro", error)
    );
});
