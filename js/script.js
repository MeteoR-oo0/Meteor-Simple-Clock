// ===== Meteor Simple Clock – JS (FULL with 12/24h) =====
document.addEventListener("DOMContentLoaded", () => {
  const isKraken = window.location.search.includes("kraken=1");
  document.body.classList.add(isKraken ? "kraken" : "config");

  // ---------- helpers ----------
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

  function hexToRgba(hex, opacity) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const a = (opacity / 100).toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function applyScale(scale) {
    const wrapper = $("#app-wrapper");
    if (wrapper) wrapper.style.transform = `scale(${scale})`;
  }

  function setTempsHidden(hidden) {
    document.body.classList.toggle("temps-hidden", !!hidden);
  }

  function toggleColon() {
    const colon = $("#colon");
    if (!colon) return;
    colon.style.opacity = colon.style.opacity === "0" ? "1" : "0";
  }

  // ---------- clock update ----------
function updateClock() {
  const now = new Date();
  const is12 = localStorage.getItem("is12Hour") === "true";

  let hour24 = now.getHours();
  let hour = hour24;
  let ampm = "";

  if (is12) {
    ampm = hour24 >= 12 ? "PM" : "AM";
    hour = hour24 % 12;
    if (hour === 0) hour = 12;
  }

  const hEl = document.getElementById("hour");
  const mEl = document.getElementById("minute");
  const dEl = document.getElementById("date");
  const amEl = document.getElementById("ampm");

  if (hEl) hEl.textContent = hour.toString().padStart(2, "0");
  if (mEl) mEl.textContent = now.getMinutes().toString().padStart(2, "0");

  // ★ AM/PM を分の右下に表示（12時間モードのときだけ）
  if (amEl) {
    if (is12) {
      amEl.textContent = ampm;
      amEl.style.display = "block";
    } else {
      amEl.textContent = "";
      amEl.style.display = "none";
    }
  }

  if (dEl) {
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][now.getDay()];
    dEl.textContent = `${month}/${day} ${weekday}`; // ★ ここには AM/PM を付けない
  }

  const sec = now.getSeconds();
  const bar = document.getElementById("secondBar");
  if (bar) bar.style.width = `${(sec / 60) * 100}%`;
}


  // ---------- visual apply ----------
  function applyCustomizations({ textColor, bgColor, bgImage, bgOpacity, bgBlur, font }) {
    const fontFamily =
      font !== undefined ? font : localStorage.getItem("fontFamily") || "'Press Start 2P', monospace";
    const fontName = fontFamily.replace(/['"]/g, "").split(",")[0].trim();
    document.body.classList.remove("lowercase");

    // text color
    if (textColor) {
      document.body.style.color = textColor;
      $$(".dot").forEach((dot) => (dot.style.backgroundColor = textColor));
      $$(".divider").forEach((div) => (div.style.backgroundColor = hexToRgba(textColor, 30)));
      $$(".second-bar").forEach((bar) => (bar.style.backgroundColor = textColor));
    }

    // background image
    const image = bgImage !== undefined ? bgImage : localStorage.getItem("bgImage");
    const bgImageEl = $("#background-image");
    if (bgImageEl) bgImageEl.style.backgroundImage = image ? `url('${image}')` : "none";

    // clear button vis
    const clearBtn = $("#clearBgImage");
    if (clearBtn) clearBtn.style.display = image ? "inline-block" : "none";

    // overlay color (recompose every time)
    const bgCol = bgColor ?? localStorage.getItem("bgColor") ?? "#000000";
    const bgOp = bgOpacity ?? localStorage.getItem("bgOpacity") ?? 100;
    const overlay = $("#background-overlay");
    if (overlay) overlay.style.backgroundColor = hexToRgba(bgCol, bgOp);

    // blur
    const blur = bgBlur !== undefined ? bgBlur : localStorage.getItem("bgBlur") || 0;
    if (bgImageEl) bgImageEl.style.filter = `blur(${blur}px)`;

    // font tuning
    const clock = $("#clock");
    const date = $("#date");
    const temps = $$(".temp");
    const labels = $$(".label");

    if (fontFamily.includes("Press Start")) {
      document.body.style.fontWeight = "normal";
      if (clock) clock.style.fontSize = "120px";
      if (date) { date.style.fontSize = "40px"; date.style.top = "20%"; }
      temps.forEach((el) => (el.style.fontSize = "34px"));
      labels.forEach((el) => (el.style.fontSize = "16px"));

    } else if (fontFamily.includes("Montserrat")) {
      document.body.style.fontWeight = "normal";
      if (clock) clock.style.fontSize = "160px";
      if (date) { date.style.fontSize = "60px"; date.style.top = "17%"; }
      temps.forEach((el) => (el.style.fontSize = "48px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else if (fontFamily.includes("Doto")) {
      document.body.style.fontWeight = "900";
      if (clock) clock.style.fontSize = "160px";
      if (date) { date.style.fontSize = "55px"; date.style.top = "19%"; }
      temps.forEach((el) => (el.style.fontSize = "42px"));
      labels.forEach((el) => (el.style.fontSize = "22px"));

    } else if (fontName === "Major Mono Display") {
      document.body.style.fontWeight = "400";
      if (clock) clock.style.fontSize = "138px";
      if (date) { date.style.fontSize = "48px"; date.style.top = "19%"; }
      temps.forEach((el) => (el.style.fontSize = "40px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));
      document.body.classList.add("lowercase");

    } else if (fontFamily.includes("Orbitron")) {
      document.body.style.fontWeight = "700";
      if (clock) clock.style.fontSize = "150px";
      if (date) { date.style.fontSize = "52px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "40px"));
      labels.forEach((el) => (el.style.fontSize = "18px"));

    } else if (fontFamily.includes("Roboto")) {
      document.body.style.fontWeight = "700";
      if (clock) clock.style.fontSize = "160px";
      if (date) { date.style.fontSize = "50px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "42px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else if (fontFamily.includes("Comfortaa")) {
      document.body.style.fontWeight = "700";
      if (clock) clock.style.fontSize = "150px";
      if (date) { date.style.fontSize = "50px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "42px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else if (fontFamily.includes("Racing Sans One")) {
      document.body.style.fontWeight = "400";
      if (clock) clock.style.fontSize = "160px";
      if (date) { date.style.fontSize = "52px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "44px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else if (fontFamily.includes("Abril Fatface")) {
      document.body.style.fontWeight = "400";
      if (clock) clock.style.fontSize = "155px";
      if (date) { date.style.fontSize = "54px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "42px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else {
      document.body.style.fontWeight = "normal";
      if (clock) clock.style.fontSize = "140px";
      if (date) { date.style.fontSize = "50px"; date.style.top = "20%"; }
      temps.forEach((el) => (el.style.fontSize = "40px"));
      labels.forEach((el) => (el.style.fontSize = "18px"));
    }

    // shadow toggle
    const shadowEnabled = localStorage.getItem("textShadow") === "true";
    ['#date', '#clock', '#cpuTemp', '#gpuTemp', '#liqTemp', '.label', '#ampm'].forEach((selector) => {
      $$(selector).forEach((el) => el.classList.toggle('text-shadow', shadowEnabled));
    });
    $$(".dot").forEach((el) => el.classList.toggle("shadow-dot", shadowEnabled));
    $$(".divider").forEach((el) => el.classList.toggle("shadow-divider", shadowEnabled));

    // temps visibility
    setTempsHidden(localStorage.getItem("tempsHidden") === "true");

    // apply font
    document.body.style.fontFamily = fontFamily;

    if (window.nzxt?.v1) {
      window.nzxt.v1.onResolutionUpdate = null;
    }
  }

  // ---------- monitoring ----------
  window.nzxt = window.nzxt || {};
  window.nzxt.v1 = window.nzxt.v1 || {};
  window.nzxt.v1.onMonitoringDataUpdate = (data) => {
    const c = $("#cpuTemp");
    const g = $("#gpuTemp");
    const l = $("#liqTemp");
    if (c) c.textContent = `${data?.cpus?.[0]?.temperature?.toFixed(0) ?? "--"}°`;
    if (g) g.textContent = `${data?.gpus?.[0]?.temperature?.toFixed(0) ?? "--"}°`;
    if (l) l.textContent = `${data?.kraken?.liquidTemperature?.toFixed(0) ?? "--"}°`;
  };

  // ---------- timers ----------
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(() => toggleColon(), 500);

  // ---------- config ui (preview only) ----------
  const configUI = $("#config-ui");

  if (!isKraken && configUI) {
    configUI.style.display = "block";

    // initial apply
    applyCustomizations({
      textColor: localStorage.getItem("textColor") || "#ffffff",
      bgColor: localStorage.getItem("bgColor") || "#000000",
      bgImage: localStorage.getItem("bgImage") || "",
      bgOpacity: localStorage.getItem("bgOpacity") || 100,
      bgBlur: localStorage.getItem("bgBlur") || 0,
      font: localStorage.getItem("fontFamily") || "'Press Start 2P', monospace",
    });

    // initial scale
    applyScale(localStorage.getItem("scale") || "1");

    // bind elements
    const colorPicker = $("#colorPicker");
    const bgColorPicker = $("#bgColorPicker");
    const bgImageInput = $("#bgImageInput");
    const bgImageFile = $("#bgImageFile");
    const clearBgImage = $("#clearBgImage");
    const bgOpacity = $("#bgOpacity");
    const bgBlur = $("#bgBlur");
    const fontSelector = $("#fontSelector");
    const scaleSelector = $("#scaleSelector");
    const textShadowToggle = $("#textShadowToggle");
    const toggleTempsEl = $("#toggleTemps");
    const twelveToggle = $("#toggle12Hour");

    // set initial values
    if (colorPicker) colorPicker.value = localStorage.getItem("textColor") || "#ffffff";
    if (bgColorPicker) bgColorPicker.value = localStorage.getItem("bgColor") || "#000000";
    if (bgImageInput) bgImageInput.value = localStorage.getItem("bgImage") || "";
    if (bgOpacity) bgOpacity.value = localStorage.getItem("bgOpacity") || "100";
    if (bgBlur) bgBlur.value = localStorage.getItem("bgBlur") || "0";
    if (fontSelector) fontSelector.value = localStorage.getItem("fontFamily") || "'Press Start 2P', monospace";
    if (scaleSelector) {
      scaleSelector.value = localStorage.getItem("scale") || "1";
      applyScale(scaleSelector.value);
    }
    if (textShadowToggle) textShadowToggle.checked = localStorage.getItem("textShadow") === "true";
    if (toggleTempsEl) toggleTempsEl.checked = localStorage.getItem("tempsHidden") === "true";
    if (twelveToggle) twelveToggle.checked = localStorage.getItem("is12Hour") === "true";

    // events
    colorPicker?.addEventListener("input", (e) => {
      const v = e.target.value;
      localStorage.setItem("textColor", v);
      applyCustomizations({ textColor: v });
    });

    fontSelector?.addEventListener("change", (e) => {
      const font = e.target.value;
      localStorage.setItem("fontFamily", font);
      applyCustomizations({ font });
      localStorage.setItem("__refresh__", Date.now().toString());
    });

    bgColorPicker?.addEventListener("input", (e) => {
      const v = e.target.value;
      localStorage.setItem("bgColor", v);
      applyCustomizations({ bgColor: v, bgOpacity: localStorage.getItem("bgOpacity") || 100 });
    });

    $$('input[name="bgMode"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const mode = e.target.value;
        $("#bgImageURLBox").style.display = mode === "url" ? "block" : "none";
        $("#bgImageFileBox").style.display = mode === "file" ? "block" : "none";
        if (mode === "url") {
          const input = $("#bgImageInput");
          if (input && input.value.startsWith("data:image/")) input.value = "";
        }
      });
    });

    bgImageInput?.addEventListener("input", (e) => {
      const v = e.target.value;
      localStorage.setItem("bgImage", v);

      const currentOpacity = localStorage.getItem("bgOpacity") || "100";
      if (parseInt(currentOpacity) === 100) {
        localStorage.setItem("bgOpacity", "0");
        if (bgOpacity) bgOpacity.value = "0";
      }

      applyCustomizations({
        textColor: localStorage.getItem("textColor"),
        bgColor: localStorage.getItem("bgColor"),
        bgImage: v,
        bgOpacity: localStorage.getItem("bgOpacity"),
        bgBlur: localStorage.getItem("bgBlur"),
        font: localStorage.getItem("fontFamily"),
      });

      localStorage.setItem("__refresh__", Date.now().toString());
    });

    bgImageFile?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (event) {
        const url = event.target.result;
        localStorage.setItem("bgImage", url);

        const currentOpacity = localStorage.getItem("bgOpacity") || "100";
        if (parseInt(currentOpacity) === 100) {
          localStorage.setItem("bgOpacity", "0");
          if (bgOpacity) bgOpacity.value = "0";
        }

        applyCustomizations({
          textColor: localStorage.getItem("textColor"),
          bgColor: localStorage.getItem("bgColor"),
          bgImage: url,
          bgOpacity: localStorage.getItem("bgOpacity"),
          bgBlur: localStorage.getItem("bgBlur"),
          font: localStorage.getItem("fontFamily"),
        });

        localStorage.setItem("__refresh__", Date.now().toString());
      };
      reader.readAsDataURL(file);
    });

    clearBgImage?.addEventListener("click", () => {
      localStorage.removeItem("bgImage");
      if (bgImageInput) bgImageInput.value = "";
      if (bgImageFile) bgImageFile.value = "";

      localStorage.setItem("bgOpacity", "100");
      if (bgOpacity) bgOpacity.value = "100";

      applyCustomizations({
        textColor: localStorage.getItem("textColor"),
        bgColor: localStorage.getItem("bgColor"),
        bgImage: "",
        bgOpacity: "100",
        bgBlur: localStorage.getItem("bgBlur"),
        font: localStorage.getItem("fontFamily"),
      });

      localStorage.setItem("__refresh__", Date.now().toString());
    });

    bgOpacity?.addEventListener("input", (e) => {
      const v = e.target.value;
      localStorage.setItem("bgOpacity", v);
      applyCustomizations({ bgColor: localStorage.getItem("bgColor"), bgOpacity: v });
    });

    bgBlur?.addEventListener("input", (e) => {
      const v = e.target.value;
      localStorage.setItem("bgBlur", v);
      applyCustomizations({ bgBlur: v });
    });

    scaleSelector?.addEventListener("change", (e) => {
      const scale = e.target.value;
      localStorage.setItem("scale", scale);
      applyScale(scale);
      localStorage.setItem("__refresh__", Date.now().toString());
    });

    textShadowToggle?.addEventListener("change", (e) => {
      const enabled = e.target.checked;
      localStorage.setItem("textShadow", enabled.toString());
      applyCustomizations({
        textColor: localStorage.getItem("textColor"),
        bgColor: localStorage.getItem("bgColor"),
        bgImage: localStorage.getItem("bgImage"),
        bgOpacity: localStorage.getItem("bgOpacity"),
        bgBlur: localStorage.getItem("bgBlur"),
        font: localStorage.getItem("fontFamily"),
      });
    });

    toggleTempsEl?.addEventListener("change", (e) => {
      const hidden = e.target.checked;
      localStorage.setItem("tempsHidden", hidden.toString());
      setTempsHidden(hidden);                  // immediate
      localStorage.setItem("__refresh__", Date.now().toString()); // sync Kraken
    });

    // 12/24h toggle
    twelveToggle?.addEventListener("change", (e) => {
      const enabled = e.target.checked;
      localStorage.setItem("is12Hour", enabled.toString());
      updateClock(); // immediate
      localStorage.setItem("__refresh__", Date.now().toString()); // sync Kraken
    });

    // reset
    $("#resetSettings")?.addEventListener("click", () => {
      const confirmed = confirm("本当にすべての設定をリセットしますか？");
      if (!confirmed) return;

      localStorage.clear();
      localStorage.setItem("textColor", "#ffffff");
      localStorage.setItem("bgColor", "#000000");
      localStorage.setItem("bgImage", "");
      localStorage.setItem("bgOpacity", "100");
      localStorage.setItem("bgBlur", "0");
      localStorage.setItem("fontFamily", "'Press Start 2P', monospace");
      localStorage.setItem("textShadow", "false");
      localStorage.setItem("scale", "1");
      localStorage.setItem("tempsHidden", "false");
      localStorage.setItem("is12Hour", "false");
      localStorage.setItem("__refresh__", Date.now().toString());
      location.reload();
    });
  }

  // ---------- Kraken ----------
  if (isKraken) {
    if ($("#config-ui")) $("#config-ui").style.display = "none"; // 保険

    applyCustomizations({
      textColor: localStorage.getItem("textColor"),
      bgColor: localStorage.getItem("bgColor"),
      bgImage: localStorage.getItem("bgImage"),
      bgOpacity: localStorage.getItem("bgOpacity") || 100,
      bgBlur: localStorage.getItem("bgBlur") || 0,
      font: localStorage.getItem("fontFamily"),
    });
    applyScale(localStorage.getItem("scale") || "1");
    updateClock(); // 初回

    // 同期
    window.addEventListener("storage", () => {
      applyCustomizations({
        textColor: localStorage.getItem("textColor"),
        bgColor: localStorage.getItem("bgColor"),
        bgImage: localStorage.getItem("bgImage"),
        bgOpacity: localStorage.getItem("bgOpacity") || 100,
        bgBlur: localStorage.getItem("bgBlur") || 0,
        font: localStorage.getItem("fontFamily"),
      });
      applyScale(localStorage.getItem("scale") || "1");
      updateClock();
    });
  }
});
