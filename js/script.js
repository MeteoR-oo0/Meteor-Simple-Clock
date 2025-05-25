const isKraken = window.location.search.includes("kraken=1");
  document.body.classList.add(isKraken ? "kraken" : "config");

  function applyCustomizations({ textColor, bgColor, bgImage, bgOpacity, bgBlur, font }) {
    const fontFamily = font !== undefined ? font : localStorage.getItem("fontFamily") || "'Press Start 2P', monospace";
    const fontName = fontFamily.replace(/['"]/g, "").split(",")[0].trim();
    document.body.classList.remove("lowercase");

    // テキストカラー
    if (textColor) {
      // テキストとコロン・線の色
      document.body.style.color = textColor;
      document.querySelectorAll('.dot').forEach(dot => dot.style.backgroundColor = textColor);
      document.querySelectorAll('.divider').forEach(div => {
        // ✅ dividerの背景を透明色で
        div.style.backgroundColor = hexToRgba(textColor, 30); 
      });
      document.querySelectorAll('.second-bar').forEach(bar => {
        // ✅ 秒針バーは完全な文字色
        bar.style.backgroundColor = textColor;
      });
    }


    // 背景画像
    const image = bgImage !== undefined ? bgImage : localStorage.getItem("bgImage");
    if (image) {
      document.getElementById('background-image').style.backgroundImage = `url('${image}')`;
    }

    // ボタンの表示制御
    const clearBtn = document.getElementById("clearBgImage");
    if (image) {
      clearBtn.style.display = "inline-block";
    } else {
      clearBtn.style.display = "none";
    }

    // 背景色・透明度
    if (bgColor && bgOpacity !== undefined) {
      const rgba = hexToRgba(bgColor, bgOpacity);
      document.getElementById('background-overlay').style.backgroundColor = rgba;
    }

    const blur = bgBlur !== undefined ? bgBlur : localStorage.getItem("bgBlur") || 0;
    const clock = document.getElementById('clock');
    const date = document.getElementById('date');
    const temps = document.querySelectorAll('.temp');
    const labels = document.querySelectorAll('.label');

    // フォント切替
    if (fontFamily.includes("Press Start")) {
      document.body.style.fontWeight = "normal";
      if (clock) clock.style.fontSize = "120px";
      if (date) {
        date.style.fontSize = "40px";
        date.style.top = "20%";
      }
      temps.forEach(el => el.style.fontSize = "34px");
      labels.forEach(el => el.style.fontSize = "16px");

    } else if (fontFamily.includes("Montserrat")) {
      document.body.style.fontWeight = "normal";
      if (clock) clock.style.fontSize = "160px";
      if (date) {
        date.style.fontSize = "60px";
        date.style.top = "17%";
      }
      temps.forEach(el => el.style.fontSize = "48px");
      labels.forEach(el => el.style.fontSize = "20px");

    } else if (fontFamily.includes("Doto")) {
      document.body.style.fontWeight = "900";
      if (clock) clock.style.fontSize = "160px";
      if (date) {
        date.style.fontSize = "55px";
        date.style.top = "19%";
      }
      temps.forEach(el => el.style.fontSize = "42px");
      labels.forEach(el => el.style.fontSize = "22px");

    } else if (fontName === "Major Mono Display") {
      document.body.style.fontWeight = "400";
      if (clock) clock.style.fontSize = "138px";
      if (date) {
        date.style.fontSize = "48px";
        date.style.top = "19%";
      }
      temps.forEach(el => el.style.fontSize = "40px");
      labels.forEach(el => el.style.fontSize = "20px");
      document.body.classList.add("lowercase");

    } else if (fontFamily.includes("Orbitron")) {
      document.body.style.fontWeight = "700";
      if (clock) clock.style.fontSize = "150px";
      if (date) {
        date.style.fontSize = "52px";
        date.style.top = "18%";
      }
      temps.forEach(el => el.style.fontSize = "40px");
      labels.forEach(el => el.style.fontSize = "18px");

    } else if (fontFamily.includes("Roboto")) {
      document.body.style.fontWeight = "700";
      if (clock) clock.style.fontSize = "160px";
      if (date) {
        date.style.fontSize = "50px";
        date.style.top = "18%";
      }
      temps.forEach(el => el.style.fontSize = "42px");
      labels.forEach(el => el.style.fontSize = "20px");

    } else if (fontFamily.includes("Comfortaa")) {
      document.body.style.fontWeight = "700";
      if (clock) clock.style.fontSize = "150px";
      if (date) {
        date.style.fontSize = "50px";
        date.style.top = "18%";
      }
      temps.forEach(el => el.style.fontSize = "42px");
      labels.forEach(el => el.style.fontSize = "20px");

    } else if (fontFamily.includes("Racing Sans One")) {
      document.body.style.fontWeight = "400";
      if (clock) clock.style.fontSize = "160px";
      if (date) {
        date.style.fontSize = "52px";
        date.style.top = "18%";
      }
      temps.forEach(el => el.style.fontSize = "44px");
      labels.forEach(el => el.style.fontSize = "20px");

    } else if (fontFamily.includes("Abril Fatface")) {
      document.body.style.fontWeight = "400";
      if (clock) clock.style.fontSize = "155px";
      if (date) {
        date.style.fontSize = "54px";
        date.style.top = "18%";
      }
      temps.forEach(el => el.style.fontSize = "42px");
      labels.forEach(el => el.style.fontSize = "20px");
    } else {
      document.body.style.fontWeight = "normal";
      if (clock) clock.style.fontSize = "140px";
      if (date) {
        date.style.fontSize = "50px";
        date.style.top = "20%";
      }
      temps.forEach(el => el.style.fontSize = "40px");
      labels.forEach(el => el.style.fontSize = "18px");
    }

      const shadowEnabled = localStorage.getItem("textShadow") === "true";

      // テキスト影用
      [
        '#date', '#clock', '#cpuTemp', '#gpuTemp', '#liqTemp', '.label'
      ].forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.classList.toggle('text-shadow', shadowEnabled);
        });
      });

      // ボックス影用
      document.querySelectorAll('.dot').forEach(el => {
        el.classList.toggle('shadow-dot', shadowEnabled);
      });
      document.querySelectorAll('.divider').forEach(el => {
        el.classList.toggle('shadow-divider', shadowEnabled);
      });

    document.body.style.fontFamily = fontFamily;
    document.getElementById('background-image').style.filter = `blur(${blur}px)`;

    if (window.nzxt?.v1) {
      window.nzxt.v1.onResolutionUpdate = null;
    }
  }

  function applyScale(scale) {
    const wrapper = document.getElementById("app-wrapper");
    if (wrapper) {
      wrapper.style.transform = `scale(${scale})`;
    }
  }


  function hexToRgba(hex, opacity) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const a = (opacity / 100).toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function toggleColon() {
    const colon = document.getElementById("colon");
    colon.style.opacity = colon.style.opacity === "0" ? "1" : "0";
  }

  window.nzxt = window.nzxt || {};
  window.nzxt.v1 = window.nzxt.v1 || {};
  window.nzxt.v1.onMonitoringDataUpdate = (data) => {
    document.getElementById("cpuTemp").textContent = `${data?.cpus?.[0]?.temperature?.toFixed(0) ?? "--"}°`;
    document.getElementById("gpuTemp").textContent = `${data?.gpus?.[0]?.temperature?.toFixed(0) ?? "--"}°`;
    document.getElementById("liqTemp").textContent = `${data?.kraken?.liquidTemperature?.toFixed(0) ?? "--"}°`;
  };


    // ✅ コロンの点滅は0.5秒ごと（そのままでOK）
    setInterval(toggleColon, 500);

    // ✅ 時計とバー更新は1秒ごと
    setInterval(() => {
      const now = new Date();
      const sec = now.getSeconds();

      document.getElementById("hour").textContent = now.getHours().toString().padStart(2, "0");
      document.getElementById("minute").textContent = now.getMinutes().toString().padStart(2, "0");
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][now.getDay()];
      document.getElementById("date").textContent = `${month}/${day} ${weekday}`;

      // ✅ 秒針バーの幅を更新
      const percent = (sec / 60) * 100;
      const bar = document.getElementById("secondBar");
      if (bar) {
        bar.style.width = `${percent}%`;
      }
    }, 1000);


  if (!isKraken) {
    document.getElementById("config-ui").style.display = "block";

    applyCustomizations({
      textColor: localStorage.getItem("textColor") || "#ffffff",
      bgColor: localStorage.getItem("bgColor") || "#000000",
      bgImage: localStorage.getItem("bgImage") || "",
      bgOpacity: localStorage.getItem("bgOpacity") || 100,
      bgBlur: localStorage.getItem("bgBlur") || 0,
      font: localStorage.getItem("fontFamily") || "'Press Start 2P', monospace"
    });

    document.getElementById("colorPicker").value = localStorage.getItem("textColor") || "#ffffff";
    document.getElementById("bgColorPicker").value = localStorage.getItem("bgColor") || "#000000";
    document.getElementById("bgImageInput").value = localStorage.getItem("bgImage") || "";
    document.getElementById("bgOpacity").value = localStorage.getItem("bgOpacity") || "100";
    document.getElementById("bgBlur").value = localStorage.getItem("bgBlur") || "0";
    document.getElementById("fontSelector").value = localStorage.getItem("fontFamily") || "'Press Start 2P', monospace";
    document.getElementById("scaleSelector").value = localStorage.getItem("scale") || "1";
    applyScale(document.getElementById("scaleSelector").value);

    document.getElementById("textShadowToggle").checked = localStorage.getItem("textShadow") === "true";

    document.getElementById("colorPicker").addEventListener("input", e => {
      const v = e.target.value;
      localStorage.setItem("textColor", v);
      applyCustomizations({ textColor: v });
    });

    // フォントセレクターの初期値を設定
    document.getElementById("fontSelector").value = localStorage.getItem("fontFamily") || "'Press Start 2P', monospace";

    // フォント変更時のイベント処理
    document.getElementById("fontSelector").addEventListener("change", (e) => {
      const font = e.target.value;
      localStorage.setItem("fontFamily", font);

      applyCustomizations({ font });

      // Kraken側に即時反映させるために通知
      localStorage.setItem("__refresh__", Date.now().toString());
    });

    document.getElementById("bgColorPicker").addEventListener("input", e => {
      const v = e.target.value;
      localStorage.setItem("bgColor", v);
      applyCustomizations({ bgColor: v, bgOpacity: localStorage.getItem("bgOpacity") || 100 });
    });

    document.querySelectorAll('input[name="bgMode"]').forEach(radio => {
      radio.addEventListener('change', e => {
        const mode = e.target.value;
        document.getElementById("bgImageURLBox").style.display = mode === "url" ? "block" : "none";
        document.getElementById("bgImageFileBox").style.display = mode === "file" ? "block" : "none";

        if (mode === "url") {
          const input = document.getElementById("bgImageInput");
          if (input.value.startsWith("data:image/")) {
            input.value = "";
          }
        }
      });
    });

    document.getElementById("bgImageInput").addEventListener("input", e => {
      const v = e.target.value;
      localStorage.setItem("bgImage", v);

      const currentOpacity = localStorage.getItem("bgOpacity") || "100";
      if (parseInt(currentOpacity) === 100) {
        localStorage.setItem("bgOpacity", "0");
        document.getElementById("bgOpacity").value = "0";
      }

      applyCustomizations({
        textColor: localStorage.getItem("textColor"),
        bgColor: localStorage.getItem("bgColor"),
        bgImage: v,
        bgOpacity: localStorage.getItem("bgOpacity"),
        bgBlur: localStorage.getItem("bgBlur"),
        font: localStorage.getItem("fontFamily")
      });

      localStorage.setItem("__refresh__", Date.now().toString());
    });




    document.getElementById("bgImageFile").addEventListener("change", e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const url = event.target.result;
          localStorage.setItem("bgImage", url);

          // ✅ 現在の透明度が100%（= 1.0）なら、0% に変更
          const currentOpacity = localStorage.getItem("bgOpacity") || "100";
          if (parseInt(currentOpacity) === 100) {
            localStorage.setItem("bgOpacity", "0");
            document.getElementById("bgOpacity").value = "0";
          }

          applyCustomizations({
            textColor: localStorage.getItem("textColor"),
            bgColor: localStorage.getItem("bgColor"),
            bgImage: url,
            bgOpacity: localStorage.getItem("bgOpacity"),
            bgBlur: localStorage.getItem("bgBlur"),
            font: localStorage.getItem("fontFamily")
          });

          localStorage.setItem("__refresh__", Date.now().toString());
        };
        reader.readAsDataURL(file);
      }
    });

    document.getElementById("clearBgImage").addEventListener("click", () => {
      // 背景画像を削除
      localStorage.removeItem("bgImage");
      document.getElementById("bgImageInput").value = "";
      document.getElementById("bgImageFile").value = "";

      // 背景透明度を常に100%に戻す
      localStorage.setItem("bgOpacity", "100");
      document.getElementById("bgOpacity").value = "100";

      applyCustomizations({
        textColor: localStorage.getItem("textColor"),
        bgColor: localStorage.getItem("bgColor"),
        bgImage: "", // 画像は空に戻す
        bgOpacity: "100", // 常に100%
        bgBlur: localStorage.getItem("bgBlur"),
        font: localStorage.getItem("fontFamily")
      });

      localStorage.setItem("__refresh__", Date.now().toString());
    });

    document.getElementById("bgOpacity").addEventListener("input", e => {
      const v = e.target.value;
      localStorage.setItem("bgOpacity", v);
      applyCustomizations({ bgColor: localStorage.getItem("bgColor"), bgOpacity: v });
    });

    document.getElementById("bgBlur").addEventListener("input", e => {
      const v = e.target.value;
      localStorage.setItem("bgBlur", v);
      applyCustomizations({ bgBlur: v });
    });

    document.getElementById("scaleSelector").addEventListener("change", (e) => {
      const scale = e.target.value;
      localStorage.setItem("scale", scale);
      applyScale(scale);

      localStorage.setItem("__refresh__", Date.now().toString());
    });


    document.getElementById("textShadowToggle").addEventListener("change", (e) => {
      const enabled = e.target.checked;
      localStorage.setItem("textShadow", enabled.toString());
      applyCustomizations({ 
        textColor: localStorage.getItem("textColor"),
        bgColor: localStorage.getItem("bgColor"),
        bgImage: localStorage.getItem("bgImage"),
        bgOpacity: localStorage.getItem("bgOpacity"),
        bgBlur: localStorage.getItem("bgBlur"),
        font: localStorage.getItem("fontFamily")
      });
    });

    document.getElementById("resetSettings").addEventListener("click", () => {
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
      localStorage.setItem("__refresh__", Date.now().toString());
      location.reload();
    });
  }

  if (isKraken) {
    applyCustomizations({
      textColor: localStorage.getItem("textColor"),
      bgColor: localStorage.getItem("bgColor"),
      bgImage: localStorage.getItem("bgImage"),
      bgOpacity: localStorage.getItem("bgOpacity") || 100,
      bgBlur: localStorage.getItem("bgBlur") || 0,
      font: localStorage.getItem("fontFamily")
    });

    applyScale(localStorage.getItem("scale") || "1");

    window.addEventListener("storage", (event) => {
      if (event.key === "__refresh__") {
        applyCustomizations({
          textColor: localStorage.getItem("textColor"),
          bgColor: localStorage.getItem("bgColor"),
          bgImage: localStorage.getItem("bgImage"),
          bgOpacity: localStorage.getItem("bgOpacity") || 100,
          bgBlur: localStorage.getItem("bgBlur") || 0,
          font: localStorage.getItem("fontFamily")
        });

        applyScale(localStorage.getItem("scale") || "1");

      } else {
        applyCustomizations({
          textColor: localStorage.getItem("textColor"),
          bgColor: localStorage.getItem("bgColor"),
          bgImage: localStorage.getItem("bgImage"),
          bgOpacity: localStorage.getItem("bgOpacity") || 100,
          bgBlur: localStorage.getItem("bgBlur") || 0,
          font: localStorage.getItem("fontFamily")
        });
      }
    });
  }