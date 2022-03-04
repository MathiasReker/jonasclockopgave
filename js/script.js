const url = "https://worldtimeapi.org/api/timezone/",
  timezoneDropdown = document.getElementById("timezone-dropdown"),
  time = document.getElementById("time"),
  city = document.getElementById("timezone-city"),
  continent = document.getElementById("timezone-continent"),
  UTC = document.getElementById("UTC");

function fillDropdown() {
  fetch(url).then(t => t.json()).then(t => t.forEach(t => {
    if (t.includes("/") && !t.includes("Etc")) {
      const e = document.createElement("option"),
        n = t.split("/");
      e.textContent = n[0] + " (" + n[1].replace("_", " ") + ")";
      e.value = t;
      timezoneDropdown.appendChild(e);
    }
  })).catch(t => console.error(t));
}

function worldTimeApiFetch() {
  fetch(url + timezoneDropdown.value).then(t => t.json()).then(t => {
    const e = t.timezone.split("/");
    time.textContent = t.datetime.substring(11, 19);
    continent.textContent = e[0];
    city.textContent = e[1].replace("_", " ");
    UTC.textContent = t.utc_offset;
  }).catch(t => console.error(t));
  setTimeout(worldTimeApiFetch, 1e3);
}

fillDropdown();
timezoneDropdown.addEventListener("change", worldTimeApiFetch);
