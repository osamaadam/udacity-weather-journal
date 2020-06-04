const form = document.querySelector("#form");

const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");

const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");

const apiKey = "70d9261b8ba5b86bcfb4377799e89737";

let data = null;

window.onload = async () => {
  if (data === null) {
    data = await getData("/recent");
    date.textContent = `Date: ${new Date(data.date)}`;
    temp.textContent = `Temperature: ${data.temp}`;
    content.textContent = data.content && `Content: ${data.content}`;
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const zipCode = zip.value.trim();

  const route = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=metric`;

  const res = await getData(route);

  data = {
    date: Date.now(),
    temp: res.main.temp,
    content: feelings.value
  };

  const result = await postData("/data", data);

  if (result) {
    date.textContent = `Date: ${new Date(data.date)}`;
    temp.textContent = `Temperature: ${data.temp}`;
    content.textContent = data.content && `Content: ${data.content}`;
  }
});

const getData = async (route) => {
  const res = await fetch(route);

  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const postData = async (route, data) => {
  const res = await fetch(route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
