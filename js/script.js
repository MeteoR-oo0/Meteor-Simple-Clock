// ===== Meteor Simple Clock – JS (12/24h, Quicksand, fontWeight, Text Scale 30–100%, Dot Shape toggle, Kraken sync) =====
document.addEventListener("DOMContentLoaded", () => {
  const isKraken = window.location.search.includes("kraken=1");
  document.body.classList.add(isKraken ? "kraken" : "config");

  // ---------- helpers ----------
  const $  = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

  function hexToRgba(hex, opacity) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const a = (opacity / 100).toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // --- Date format helpers ---
  const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const pad2 = (n) => String(n).padStart(2, "0");

  function formatDateByPattern(now, pattern) {
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const w = WEEKDAYS[now.getDay()];
    const MMM = MONTHS_EN[now.getMonth()];

    return pattern
      .replace(/YYYY/g, String(y))
      .replace(/MMM/g, MMM)          // ★ 先に月の英語表記を処理
      .replace(/MM/g, pad2(m))
      .replace(/\bM\b/g, String(m))
      .replace(/DD/g, pad2(d))
      .replace(/\bD\b/g, String(d))
      .replace(/ddd/g, w);
  }


  // 互換：UIに残っている scale セレクタ用（実スケールは基本使わない想定）
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

  function setSecondBarHidden(hidden) {
    const bar = document.getElementById("secondBar");
    if (bar) bar.style.display = hidden ? "none" : "block";
    
    document.querySelectorAll(".divider").forEach(div => {
      div.style.display = hidden ? "none" : "block";
    });
  }

  // ---------- Text Scale (30–100%) ----------
  const textScaleState = {
    pct: clampPct(parseInt(localStorage.getItem("textScale") ?? "100", 10))
  };

  function clampPct(v) {
    const n = Number.isFinite(v) ? v : 100;
    return Math.max(30, Math.min(100, n));
  }

  // 基準サイズ（素のサイズ）を保持
  const baseSizes = {
    clock: null,  // px
    date:  null,  // px
    ampm:  null,  // px
    temps: [],    // px[]
    labels: []    // px[]
  };

  function captureBaseFontSizes() {
    const getPx = (el) => el ? parseFloat(getComputedStyle(el).fontSize) : null;
    baseSizes.clock = getPx($("#clock"));
    baseSizes.date  = getPx($("#date"));
    baseSizes.ampm  = getPx($("#ampm"));
    baseSizes.temps = $$(".temp").map(getPx);
    baseSizes.labels= $$(".label").map(getPx);
  }

  // いったん100%に戻してから採寸→縮小（ダブル縮小防止）
  function clearTextScaleInline() {
    const clock = $("#clock");
    const date  = $("#date");
    const ampm  = $("#ampm");
    const temps = $$(".temp");
    const labels= $$(".label");
    if (clock) clock.style.fontSize = "";
    if (date)  date .style.fontSize = "";
    if (ampm)  ampm .style.fontSize = "";
    temps.forEach(el  => (el.style.fontSize = ""));
    labels.forEach(el => (el.style.fontSize = ""));
  }

  function applyTextOnlyScale(pct) {
    const factor = clampPct(parseInt(pct, 10)) / 100; // 0.30〜1.00
    const px = (n) => `${Math.max(1, Math.round(n * factor))}px`;
    const clock = $("#clock");
    const date  = $("#date");
    const ampm  = $("#ampm");
    const temps = $$(".temp");
    const labels= $$(".label");

    if (Number.isFinite(baseSizes.clock) && clock) clock.style.fontSize = px(baseSizes.clock);
    if (Number.isFinite(baseSizes.date)  && date ) date .style.fontSize = px(baseSizes.date);
    if (Number.isFinite(baseSizes.ampm)  && ampm ) ampm .style.fontSize = px(baseSizes.ampm);
    temps.forEach((el, i) => {
      const b = baseSizes.temps[i];
      if (Number.isFinite(b) && el) el.style.fontSize = px(b);
    });
    labels.forEach((el, i) => {
      const b = baseSizes.labels[i];
      if (Number.isFinite(b) && el) el.style.fontSize = px(b);
    });

    // コロンのドットは em 指定でフォントサイズに自動追従（JS計算不要）
    const colon = $("#colon");
    if (colon) colon.style.opacity = "1"; // 点滅直後の見え消え対策
  }

  function recalcAndApplyTextScale() {
    // レイアウト確定後に安全にやる
    requestAnimationFrame(() => {
      clearTextScaleInline();
      captureBaseFontSizes();
      applyTextOnlyScale(textScaleState.pct);
    });
  }
  // ---------- /Text Scale ----------

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

    const hEl = $("#hour");
    const mEl = $("#minute");
    const dEl = $("#date");
    const amEl = $("#ampm");

    if (hEl) hEl.textContent = hour.toString().padStart(2, "0");
    if (mEl) mEl.textContent = now.getMinutes().toString().padStart(2, "0");

    if (amEl) {
      if (is12) {
        amEl.textContent = ampm;
        amEl.style.display = "block";
      } else {
        amEl.textContent = "";
        amEl.style.display = "none";
      }
    }

    // (REPLACE WITH)
    const fmt = localStorage.getItem("dateFormat") || "M/D ddd";
    if (dEl) {
      if (fmt === "OFF") {
        dEl.style.display = "none";
        dEl.textContent = "";
      } else {
        dEl.style.display = "block";
        dEl.textContent = formatDateByPattern(now, fmt);
      }
    }


    const sec = now.getSeconds();
    const bar = $("#secondBar");
    if (bar) bar.style.width = `${(sec / 60) * 100}%`;
  }

  // ---------- visual apply ----------
  // dotShape: "round" | "square"
  function applyCustomizations({ textColor, bgColor, bgImage, bgOpacity, bgBlur, font, fontWeight, dotShape }) {
    const fontFamily =
      font !== undefined ? font : localStorage.getItem("fontFamily") || "'Press Start 2P', monospace";
    const fontName = fontFamily.replace(/['"]/g, "").split(",")[0].trim();

    const weight = fontWeight !== undefined
      ? fontWeight
      : localStorage.getItem("fontWeight") || "normal";

    document.body.classList.remove("lowercase");

    // text color
    if (textColor) {
      document.body.style.color = textColor;
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

    // overlay color
    const bgCol = bgColor ?? localStorage.getItem("bgColor") ?? "#000000";
    const bgOp  = bgOpacity ?? localStorage.getItem("bgOpacity") ?? 100;
    const overlay = $("#background-overlay");
    if (overlay) overlay.style.backgroundColor = hexToRgba(bgCol, bgOp);

    // blur
    const blur = bgBlur !== undefined ? bgBlur : localStorage.getItem("bgBlur") || 0;
    if (bgImageEl) bgImageEl.style.filter = `blur(${blur}px)`;

    // font tuning（サイズ/位置のみ。太さはユーザー選択）
    const clock = $("#clock");
    const date  = $("#date");
    const temps = $$(".temp");
    const labels= $$(".label");

    if (fontFamily.includes("Press Start")) {
      if (clock) clock.style.fontSize = "120px";
      if (date)  { date.style.fontSize = "40px"; date.style.top = "20%"; }
      temps.forEach((el) => (el.style.fontSize = "34px"));
      labels.forEach((el) => (el.style.fontSize = "16px"));

    } else if (fontFamily.includes("Montserrat")) {
      if (clock) clock.style.fontSize = "160px";
      if (date)  { date.style.fontSize = "60px"; date.style.top = "17%"; }
      temps.forEach((el) => (el.style.fontSize = "48px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else if (fontFamily.includes("Doto")) {
      if (clock) clock.style.fontSize = "160px";
      if (date)  { date.style.fontSize = "55px"; date.style.top = "19%"; }
      temps.forEach((el) => (el.style.fontSize = "42px"));
      labels.forEach((el) => (el.style.fontSize = "22px"));

    } else if (fontName === "Major Mono Display") {
      if (clock) clock.style.fontSize = "138px";
      if (date)  { date.style.fontSize = "48px"; date.style.top = "19%"; }
      temps.forEach((el) => (el.style.fontSize = "40px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));
      document.body.classList.add("lowercase");

    } else if (fontFamily.includes("Orbitron")) {
      if (clock) clock.style.fontSize = "150px";
      if (date)  { date.style.fontSize = "52px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "40px"));
      labels.forEach((el) => (el.style.fontSize = "18px"));

    } else if (fontFamily.includes("Roboto")) {
      if (clock) clock.style.fontSize = "160px";
      if (date)  { date.style.fontSize = "50px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "42px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else if (fontFamily.includes("Comfortaa")) {
      if (clock) clock.style.fontSize = "150px";
      if (date)  { date.style.fontSize = "50px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "42px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else if (fontFamily.includes("Racing Sans One")) {
      if (clock) clock.style.fontSize = "160px";
      if (date)  { date.style.fontSize = "52px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "44px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else if (fontFamily.includes("Abril Fatface")) {
      if (clock) clock.style.fontSize = "155px";
      if (date)  { date.style.fontSize = "54px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "42px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else if (fontFamily.includes("Quicksand")) {
      if (clock) clock.style.fontSize = "155px";
      if (date)  { date.style.fontSize = "52px"; date.style.top = "18%"; }
      temps.forEach((el) => (el.style.fontSize = "42px"));
      labels.forEach((el) => (el.style.fontSize = "20px"));

    } else {
      if (clock) clock.style.fontSize = "140px";
      if (date)  { date.style.fontSize = "50px"; date.style.top = "20%"; }
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

    setSecondBarHidden(localStorage.getItem("secondBarHidden") === "true");

    document.body.classList.toggle("hide-cpu", localStorage.getItem("hideCpu") === "true");
    document.body.classList.toggle("hide-gpu", localStorage.getItem("hideGpu") === "true");
    document.body.classList.toggle("hide-liq", localStorage.getItem("hideLiq") === "true");

    // apply font family & weight
    document.body.style.fontFamily = fontFamily;
    document.body.style.fontWeight = weight;

    // === Dot shape & sizing（ドットはemで字体に追従） ===
    const isRound = dotShape !== undefined
      ? dotShape === "round"
      : (localStorage.getItem("dotShape") || "square") === "round";

    const colon = $("#colon");
    if (colon) colon.style.opacity = "1";

    $$(".dot").forEach(el => {
      el.style.backgroundColor = "currentColor";
      el.style.width  = "0.10em"; // 120px時に約12px相当
      el.style.height = "0.10em";
      el.style.margin = "0.10em 0";
      el.style.borderRadius = isRound ? "50%" : "0";
    });
  }

  function reapplyScaleAndSync() {
    if (typeof clearTextScaleInline === "function") clearTextScaleInline();
    if (typeof applyTextOnlyScale === "function") applyTextOnlyScale(textScaleState.pct);
    localStorage.setItem("textScale", String(textScaleState.pct));
    localStorage.setItem("__refresh__", Date.now().toString());
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
      bgColor:   localStorage.getItem("bgColor") || "#000000",
      bgImage:   localStorage.getItem("bgImage") || "",
      bgOpacity: localStorage.getItem("bgOpacity") || 100,
      bgBlur:    localStorage.getItem("bgBlur") || 0,
      font:      localStorage.getItem("fontFamily") || "'Press Start 2P', monospace",
      fontWeight:localStorage.getItem("fontWeight") || "normal",
      dotShape:  localStorage.getItem("dotShape") || "square",
    });

    // Text Scale 初期反映
    recalcAndApplyTextScale();

    // initial scale (互換)
    applyScale(localStorage.getItem("scale") || "1");

    // bind elements
    const colorPicker        = $("#colorPicker");
    const bgColorPicker      = $("#bgColorPicker");
    const bgImageInput       = $("#bgImageInput");
    const bgImageFile        = $("#bgImageFile");
    const clearBgImage       = $("#clearBgImage");
    const bgOpacityEl        = $("#bgOpacity");
    const bgBlurEl           = $("#bgBlur");
    const fontSelector       = $("#fontSelector");
    const scaleSelector      = $("#scaleSelector");
    const textShadowToggle   = $("#textShadowToggle");
    const toggleCpu = $("#toggleCpu");
    const toggleGpu = $("#toggleGpu");
    const toggleLiq = $("#toggleLiq");
    const twelveToggle       = $("#toggle12Hour");
    const fontWeightSelector = $("#fontWeightSelector"); // （存在時）
    const dotShapeToggle     = $("#dotShapeToggle");     // （追加UI）
    const textScaleEl        = $("#textScale");          // （追加UI: range）
    const textScaleVal       = $("#textScaleVal");       // （追加UI: 表示用）
    const dateFormatEl = $("#dateFormat"); 
    const toggleSecondBar  = $("#toggleSecondBar");
    if (toggleSecondBar) toggleSecondBar.checked = localStorage.getItem("secondBarHidden") === "true";

    // set initial values
    if (colorPicker)        colorPicker.value        = localStorage.getItem("textColor") || "#ffffff";
    if (bgColorPicker)      bgColorPicker.value      = localStorage.getItem("bgColor") || "#000000";
    if (bgImageInput)       bgImageInput.value       = localStorage.getItem("bgImage") || "";
    if (bgOpacityEl)        bgOpacityEl.value        = localStorage.getItem("bgOpacity") || "100";
    if (bgBlurEl)           bgBlurEl.value           = localStorage.getItem("bgBlur") || "0";
    if (fontSelector)       fontSelector.value       = localStorage.getItem("fontFamily") || "'Press Start 2P', monospace";
    if (scaleSelector) {
      scaleSelector.value = localStorage.getItem("scale") || "1";
      applyScale(scaleSelector.value);
    }
    if (textShadowToggle)   textShadowToggle.checked = localStorage.getItem("textShadow") === "true";
    if (toggleCpu) toggleCpu.checked = localStorage.getItem("hideCpu") === "true";
    if (toggleGpu) toggleGpu.checked = localStorage.getItem("hideGpu") === "true";
    if (toggleLiq) toggleLiq.checked = localStorage.getItem("hideLiq") === "true";
    if (twelveToggle)       twelveToggle.checked     = localStorage.getItem("is12Hour") === "true";
    if (fontWeightSelector) fontWeightSelector.value = localStorage.getItem("fontWeight") || "normal";
    if (dotShapeToggle)     dotShapeToggle.checked   = (localStorage.getItem("dotShape") || "square") === "round";
    if (textScaleEl) {
      textScaleEl.min   = "30";
      textScaleEl.max   = "100";
      textScaleEl.value = String(textScaleState.pct);
      if (textScaleVal) textScaleVal.textContent = `${textScaleState.pct}%`;
    }
    if (dateFormatEl) {
      dateFormatEl.value = localStorage.getItem("dateFormat") || "M/D ddd"; // (ADD)
    }


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
      recalcAndApplyTextScale(); // フォント変化で基準再採寸
      localStorage.setItem("__refresh__", Date.now().toString()); // Kraken同期
    });

    fontWeightSelector?.addEventListener("change", (e) => {
      const w = e.target.value; // "normal" or "700" など
      localStorage.setItem("fontWeight", w);
      applyCustomizations({ font: localStorage.getItem("fontFamily"), fontWeight: w });
      recalcAndApplyTextScale();
      localStorage.setItem("__refresh__", Date.now().toString());
    });

    dotShapeToggle?.addEventListener("change", (e) => {
      const shape = e.target.checked ? "round" : "square";
      localStorage.setItem("dotShape", shape);

      // 1) 形状だけ反映（色やem指定もここで維持）
      applyCustomizations({ dotShape: shape });

      // 2) 文字スケールを即・再適用（UI側の見た目がリセットされないように）
      //    ※ベースに戻ってから再スケール、の安全手順を踏む
      clearTextScaleInline();
      applyTextOnlyScale(textScaleState.pct);

      // 3) Kraken が確実に同じスケールを読むよう、現在値を書き戻してから通知
      localStorage.setItem("textScale", String(textScaleState.pct));
      localStorage.setItem("__refresh__", Date.now().toString());
    });

    textScaleEl?.addEventListener("input", (e) => {
      const v = parseInt(e.target.value, 10);
      const clamped = clampPct(v);
      textScaleState.pct = clamped;
      localStorage.setItem("textScale", String(clamped));
      // すぐ反映（ダブル縮小を避ける手順）
      clearTextScaleInline();
      applyTextOnlyScale(textScaleState.pct);
      if (textScaleVal) textScaleVal.textContent = `${clamped}%`;
      localStorage.setItem("__refresh__", Date.now().toString()); // Krakenへ
    });

    bgColorPicker?.addEventListener("input", (e) => {
      const v = e.target.value;
      localStorage.setItem("bgColor", v);
      applyCustomizations({ bgColor: v, bgOpacity: localStorage.getItem("bgOpacity") || 100 });

      reapplyScaleAndSync();
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
        if (bgOpacityEl) bgOpacityEl.value = "0";
      }

      applyCustomizations({
        textColor: localStorage.getItem("textColor"),
        bgColor:   localStorage.getItem("bgColor"),
        bgImage:   v,
        bgOpacity: localStorage.getItem("bgOpacity"),
        bgBlur:    localStorage.getItem("bgBlur"),
        font:      localStorage.getItem("fontFamily"),
        fontWeight:localStorage.getItem("fontWeight") || "normal",
        dotShape:  localStorage.getItem("dotShape") || "square",
      });

      localStorage.setItem("__refresh__", Date.now().toString());

      reapplyScaleAndSync();
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
          if (bgOpacityEl) bgOpacityEl.value = "0";
        }

        applyCustomizations({
          textColor: localStorage.getItem("textColor"),
          bgColor:   localStorage.getItem("bgColor"),
          bgImage:   url,
          bgOpacity: localStorage.getItem("bgOpacity"),
          bgBlur:    localStorage.getItem("bgBlur"),
          font:      localStorage.getItem("fontFamily"),
          fontWeight:localStorage.getItem("fontWeight") || "normal",
          dotShape:  localStorage.getItem("dotShape") || "square",
        });

        localStorage.setItem("__refresh__", Date.now().toString());
        reapplyScaleAndSync();
      };
      reader.readAsDataURL(file);
    });

    clearBgImage?.addEventListener("click", () => {
      localStorage.removeItem("bgImage");
      const bgImageInputEl = $("#bgImageInput");
      if (bgImageInputEl) bgImageInputEl.value = "";
      if (bgImageFile)  bgImageFile.value  = "";

      localStorage.setItem("bgOpacity", "100");
      if (bgOpacityEl) bgOpacityEl.value = "100";

      applyCustomizations({
        textColor: localStorage.getItem("textColor"),
        bgColor:   localStorage.getItem("bgColor"),
        bgImage:   "",
        bgOpacity: "100",
        bgBlur:    localStorage.getItem("bgBlur"),
        font:      localStorage.getItem("fontFamily"),
        fontWeight:localStorage.getItem("fontWeight") || "normal",
        dotShape:  localStorage.getItem("dotShape") || "square",
      });

      localStorage.setItem("__refresh__", Date.now().toString());
      reapplyScaleAndSync();
    });

    bgOpacityEl?.addEventListener("input", (e) => {
      const v = e.target.value;
      localStorage.setItem("bgOpacity", v);
      applyCustomizations({ bgColor: localStorage.getItem("bgColor"), bgOpacity: v });
      reapplyScaleAndSync();
    });

    bgBlurEl?.addEventListener("input", (e) => {
      const v = e.target.value;
      localStorage.setItem("bgBlur", v);
      applyCustomizations({ bgBlur: v });
      reapplyScaleAndSync();
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

      // 1) 影だけ反映
      applyCustomizations({
        textColor: localStorage.getItem("textColor"),
        bgColor:   localStorage.getItem("bgColor"),
        bgImage:   localStorage.getItem("bgImage"),
        bgOpacity: localStorage.getItem("bgOpacity"),
        bgBlur:    localStorage.getItem("bgBlur"),
        font:      localStorage.getItem("fontFamily"),
        fontWeight:localStorage.getItem("fontWeight") || "normal",
        dotShape:  localStorage.getItem("dotShape") || "square"
      });

      // 2) 文字スケールを即・再適用（UIもリセットされないように）
      //    ベース→スケールの順で安全適用
      if (typeof clearTextScaleInline === "function") {
        clearTextScaleInline();
      }
      if (typeof applyTextOnlyScale === "function") {
        applyTextOnlyScale(textScaleState.pct);
      }

      // 3) Krakenが正しい縮小率を読むよう、現在値を書き戻してから通知
      localStorage.setItem("textScale", String(textScaleState.pct));
      localStorage.setItem("__refresh__", Date.now().toString());
    });

    toggleCpu?.addEventListener("change", (e) => {
      const hidden = e.target.checked;
      localStorage.setItem("hideCpu", hidden.toString());
      document.body.classList.toggle("hide-cpu", hidden);
      localStorage.setItem("__refresh__", Date.now().toString()); // Kraken同期
    });

    toggleGpu?.addEventListener("change", (e) => {
      const hidden = e.target.checked;
      localStorage.setItem("hideGpu", hidden.toString());
      document.body.classList.toggle("hide-gpu", hidden);
      localStorage.setItem("__refresh__", Date.now().toString());
    });

    toggleLiq?.addEventListener("change", (e) => {
      const hidden = e.target.checked;
      localStorage.setItem("hideLiq", hidden.toString());
      document.body.classList.toggle("hide-liq", hidden);
      localStorage.setItem("__refresh__", Date.now().toString());
    });

    toggleSecondBar?.addEventListener("change", (e) => {
      const hidden = e.target.checked;
      localStorage.setItem("secondBarHidden", hidden.toString());
      setSecondBarHidden(hidden);
      localStorage.setItem("__refresh__", Date.now().toString()); // Kraken同期
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
      localStorage.setItem("bgColor",  "#000000");
      localStorage.setItem("bgImage",  "");
      localStorage.setItem("bgOpacity","100");
      localStorage.setItem("bgBlur",   "0");
      localStorage.setItem("fontFamily", "'Press Start 2P', monospace");
      localStorage.setItem("fontWeight", "normal");
      localStorage.setItem("textShadow","false");
      localStorage.setItem("scale",     "1");
      localStorage.setItem("hideCpu", "false");
      localStorage.setItem("hideGpu", "false");
      localStorage.setItem("hideLiq", "false");
      localStorage.setItem("secondBarHidden","false");
      localStorage.setItem("is12Hour",  "false");
      localStorage.setItem("dotShape",  "square");
      localStorage.setItem("textScale", "100");
      localStorage.setItem("__refresh__", Date.now().toString());
      localStorage.setItem("dateFormat", "M/D ddd");
      location.reload();
    });

    dateFormatEl?.addEventListener("change", (e) => { // (ADD)
      const v = e.target.value; // "M/D ddd" / "YYYY/M/D ddd" / "OFF" など
      localStorage.setItem("dateFormat", v);
      updateClock(); // すぐ反映
      localStorage.setItem("__refresh__", Date.now().toString()); // Kraken 同期
    });

  }

  // ---------- Kraken ----------
  if (isKraken) {
    if ($("#config-ui")) $("#config-ui").style.display = "none";

    applyCustomizations({
      textColor: localStorage.getItem("textColor"),
      bgColor:   localStorage.getItem("bgColor"),
      bgImage:   localStorage.getItem("bgImage"),
      bgOpacity: localStorage.getItem("bgOpacity") || 100,
      bgBlur:    localStorage.getItem("bgBlur") || 0,
      font:      localStorage.getItem("fontFamily"),
      fontWeight:localStorage.getItem("fontWeight") || "normal",
      dotShape:  localStorage.getItem("dotShape") || "square",
    });

    // Text Scale 初期反映
    textScaleState.pct = clampPct(parseInt(localStorage.getItem("textScale") || "100", 10));
    recalcAndApplyTextScale();

    updateClock();

    // 同期
    window.addEventListener("storage", () => {
      textScaleState.pct = clampPct(parseInt(localStorage.getItem("textScale") || "100", 10));
      applyCustomizations({
        textColor: localStorage.getItem("textColor"),
        bgColor:   localStorage.getItem("bgColor"),
        bgImage:   localStorage.getItem("bgImage"),
        bgOpacity: localStorage.getItem("bgOpacity") || 100,
        bgBlur:    localStorage.getItem("bgBlur") || 0,
        font:      localStorage.getItem("fontFamily"),
        fontWeight:localStorage.getItem("fontWeight") || "normal",
        dotShape:  localStorage.getItem("dotShape") || "square",
      });
      recalcAndApplyTextScale();
      updateClock();
    });
  }
});
