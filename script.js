// ===== Meteor Simple Clock – Refactored JS =====
document.addEventListener("DOMContentLoaded", () => {
  // ---- i18n dictionary (auto-generated) ----
  const I18N = {
    "tab.layout": ["レイアウト", "Layout"],
    "tab.global": ["全体", "General"],
    "tab.bg": ["背景", "Background"],
    "tab.info": ["情報", "Info"],
    "info.desc": [
      "NZXT Kraken の LCD に表示するカスタム時計 & モニタリング UI です。NZXT CAM の Web Integration 機能で動作します。時計・日付・秒リング・センサー・天気・カスタムテキストを自由にレイアウトし、フォント・色・グラデーション・背景画像・オーバーレイ効果などで自分好みに仕上げられます。",
      "A custom clock & monitoring UI for the NZXT Kraken LCD, powered by NZXT CAM's Web Integration. Freely arrange the clock, date, second ring, sensors, weather, and custom text, then style it with fonts, colors, gradients, background images, and overlay effects."
    ],
    "info.usage": ["使い方", "How to use"],
    "info.usageBody": [
      "表示を右クリック →「Configure」でこの設定画面を開けます。「レイアウト」でブロックの並べ替え・表示切替、「全体」で共通スタイル、「背景」で背景まわりを設定できます。設定は自動保存され、⚙ タブからエクスポート/インポートやリセットが行えます。",
      "Right-click the display → \"Configure\" to open this panel. Use \"Layout\" to reorder and toggle blocks, \"General\" for shared styles, and \"Background\" for background settings. Changes are saved automatically; export/import and reset live in the ⚙ tab."
    ],
    "info.links": ["リンク", "Links"],
    "info.credit": ["クレジット", "Credits"],
    "info.creditBody": [
      "制作：MeteoR ／ ライセンス：MIT（自由に改変・再配布可）。開発には Claude (Anthropic) を活用しています。",
      "By MeteoR · License: MIT (free to modify & redistribute). Built with the help of Claude (Anthropic)."
    ],
    "hint.layout": ["≡ をドラッグで並べ替え／名前をタップで詳細設定。", "Drag ≡ to reorder / tap a name for details."],
    "hint.global": ["すべてのブロック共通の設定です。個別に変えたい場合はレイアウトの各ブロックの詳細設定から。", "Defaults for all blocks. To change one block only, use its details in the Layout tab."],
    "block.date": ["日付", "Date"],
    "label.format": ["表記", "Format"],
    "adv.sizeMargin": ["詳細設定", "Advanced"],
    "adv.margin": ["詳細設定", "Advanced"],
    "label.size": ["サイズ", "Size"],
    "label.barLength": ["長さ", "Length"],
    "label.marginTop": ["上の余白", "Top"],
    "label.marginBottom": ["下の余白", "Bottom"],
    "block.clock": ["時計", "Clock"],
    "opt.12h": ["12時間表示 (AM/PM)", "12-hour (AM/PM)"],
    "opt.showSeconds": ["秒数を表示する", "Show seconds"],
    "label.digitAnim": ["数字アニメ", "Digit animation"],
    "anim.none": ["なし", "None"],
    "anim.fade": ["フェード", "Fade"],
    "anim.blur": ["ブラー", "Blur"],
    "anim.roll": ["ロール（数取器）", "Roll (counter)"],
    "anim.drum": ["ドラム（数取器）", "Drum (counter)"],
    "anim.flap": ["パタパタ（反転フラップ）", "Flap (split-flap)"],
    "anim.crossfade": ["重なり（クロスフェード）", "Crossfade"],
    "opt.roundDot": ["コロンを丸ドットにする", "Round colon dots"],
    "opt.colonBlink": ["コロンを点滅させる", "Blink colon"],
    "block.second": ["秒バー", "Second bar"],
    "opt.secondGrow": ["秒ごとに伸ばす（オフで常に満タン）", "Grow each second (off = always full)"],
    "label.secondMotion": ["進行の動き", "Motion"],
    "motion.smooth": ["スムーズ（連続）", "Smooth (continuous)"],
    "motion.tick": ["1秒ごと（カチッ）", "Per-second (tick)"],
    "motion.ease": ["ゆっくり（イーズ）", "Slow (ease)"],
    "opt.secondColorSync": ["進行色を文字色に合わせる", "Match progress color to text"],
    "label.secondColor": ["進行の色", "Progress color"],
    "hint.secondHide": ["非表示にするには「非表示」エリアにドラッグしてください。", "Drag to the “Hidden” area to hide."],
    "block.weather": ["天気", "Weather"],
    "label.city": ["都市名 (英語)", "City (English)"],
    "label.unit": ["単位", "Unit"],
    "unit.c": ["°C (摂氏)", "°C (Celsius)"],
    "unit.f": ["°F (華氏)", "°F (Fahrenheit)"],
    "btn.fetchWeather": ["天気を取得", "Get weather"],
    "weather.lastNever": ["最終更新: まだ取得していません", "Last updated: not yet"],
    "weather.autoUpdate": ["1時間ごとに自動更新されます。", "Auto-updates every hour."],
    "block.sensors": ["センサー (CPU/GPU/LIQ)", "Sensors (CPU/GPU/LIQ)"],
    "hint.sensors": ["カードを左右にドラッグで並べ替え／「非表示」へドラッグで隠す。表示は最大3つ（埋まっているとき表示へドラッグすると、重ねたカードと入れ替わります）。値が出ない項目はお使いの環境が対応していません。", "Drag cards left/right to reorder, or to “Hidden” to hide. Up to 3 shown (when full, dropping onto a card swaps the two). Items with no value aren’t supported by your setup."],
    "sensors.visibleLabel": ["表示（最大3つ）", "Visible (max 3)"],
    "sensor.cpu": ["CPU 温度", "CPU temp"],
    "sensor.gpu": ["GPU 温度", "GPU temp"],
    "sensor.liq": ["LIQ 液温", "LIQ temp"],
    "label.hidden": ["非表示", "Hidden"],
    "sensor.cpuLoad": ["CPU 負荷", "CPU load"],
    "sensor.gpuLoad": ["GPU 負荷", "GPU load"],
    "sensor.cpuFan": ["CPU ファン", "CPU fan"],
    "sensor.gpuFan": ["GPU ファン", "GPU fan"],
    "sensor.memGB": ["メモリ使用量", "Memory used"],
    "sensor.memPct": ["メモリ使用率", "Memory usage"],
    "block.custom": ["カスタムテキスト", "Custom text"],
    "label.text": ["テキスト", "Text"],
    "block.graph": ["センサーグラフ①", "Sensor graph ①"],
    "block.graph2": ["センサーグラフ②", "Sensor graph ②"],
    "block.graph3": ["センサーグラフ③", "Sensor graph ③"],
    "label.graphSensor": ["センサー", "Sensor"],
    "label.graphSpan": ["期間", "Time span"],
    "span.m1": ["1分", "1 min"],
    "span.m3": ["3分", "3 min"],
    "span.m5": ["5分", "5 min"],
    "span.m10": ["10分", "10 min"],
    "opt.graphShowValue": ["現在値を表示", "Show current value"],
    "opt.graphFill": ["塗りつぶし", "Fill area"],
    "label.graphHeight": ["高さ", "Height"],
    "label.graphWidth": ["幅", "Width"],
    "hint.hiddenZone": ["ここにドラッグした要素は時計に表示されません", "Items dragged here won’t show on the clock"],
    "label.font": ["フォント", "Font"],
    "opt.customFont": ["カスタム（PCのフォント）", "Custom (PC font)"],
    "label.customFont": ["フォント名", "Font name"],
    "ph.customFont": ["例: Meiryo, 游ゴシック", "e.g. Arial, Georgia"],
    "hint.customFont": ["お使いのPCにインストールされたフォント名を入力します。Kraken実機では対応していない場合があります。", "Enter a font installed on your PC. It may not render on the Kraken device itself."],
    "label.weight": ["太さ", "Weight"],
    "label.textColor": ["文字色", "Text color"],
    "label.color": ["色", "Color"],
    "label.blend": ["ブレンド", "Blend"],
    "blend.inherit": ["（全体に従う）", "(Inherit)"],
    "blend.normal": ["通常", "Normal"],
    "blend.multiply": ["乗算", "Multiply"],
    "blend.screen": ["スクリーン", "Screen"],
    "blend.overlay": ["オーバーレイ", "Overlay"],
    "blend.difference": ["差の絶対値", "Difference"],
    "blend.exclusion": ["除外", "Exclusion"],
    "blend.colorDodge": ["覆い焼き", "Color dodge"],
    "blend.colorBurn": ["焼き込み", "Color burn"],
    "blend.hardLight": ["ハードライト", "Hard light"],
    "blend.softLight": ["ソフトライト", "Soft light"],
    "blend.luminosity": ["輝度", "Luminosity"],
    "opt.colorOverride": ["個別指定", "Override"],
    "label.textScale": ["文字スケール", "Text scale"],
    "opt.textShadow": ["文字に影をつける", "Text shadow"],
    "section.secondRing": ["秒リング", "Second ring"],
    "opt.secondRing": ["画面の縁に秒リングを表示", "Show ring around the screen edge"],
    "label.ringStyle": ["スタイル", "Style"],
    "label.ringWidth": ["線の太さ", "Line width"],
    "label.ringColorMode": ["色", "Color"],
    "ringColor.sync": ["文字色に合わせる", "Match text color"],
    "ringColor.solid": ["単色", "Solid"],
    "ringColor.gradient": ["グラデーション", "Gradient"],
    "label.ringColor": ["リングの色", "Ring color"],
    "label.ringPreset": ["プリセット", "Preset"],
    "ringPreset.bluePurple": ["ブルー → パープル", "Blue → Purple"],
    "ringPreset.cyanBlue": ["シアン → ブルー", "Cyan → Blue"],
    "ringPreset.pinkPurple": ["ピンク → パープル", "Pink → Purple"],
    "ringPreset.greenCyan": ["グリーン → シアン", "Green → Cyan"],
    "ringPreset.orangeRed": ["オレンジ → レッド", "Orange → Red"],
    "ringPreset.custom": ["カスタム", "Custom"],
    "label.ringGradA": ["開始色", "Start color"],
    "label.ringGradB": ["終了色", "End color"],
    "opt.ringGrow": ["秒ごとに伸ばす（オフで常に満タン）", "Grow each second (off = always full)"],
    "label.ringMotion": ["進行の動き", "Motion"],
    "ringStyle.fill": ["塗りリング", "Filled ring"],
    "ringStyle.dot": ["ドット周回", "Orbiting dot"],
    "hint.secondRing": ["画面全体の縁を回るリングです。秒バーとは独立しており、同時に表示できます。", "A ring around the whole screen edge. Independent of the second bar; both can show at once."],
    "section.overlay": ["オーバーレイ", "Overlay"],
    "label.overlay": ["効果", "Effect"],
    "label.overlayIntensity": ["強さ", "Intensity"],
    "overlay.none": ["なし", "None"],
    "overlay.scanline": ["スキャンライン", "Scanline"],
    "overlay.crt": ["CRT", "CRT"],
    "overlay.grid": ["グリッド", "Grid"],
    "overlay.dots": ["ドット", "Dots"],
    "overlay.noise": ["ノイズ", "Noise"],
    "overlay.vignette": ["ビネット", "Vignette"],
    "label.bgColor": ["背景色", "Background color"],
    "label.bgType": ["背景タイプ", "Background type"],
    "bgType.solid": ["単色", "Solid"],
    "bgType.gradient": ["グラデーション", "Gradient"],
    "label.opacity": ["透明度", "Opacity"],
    "label.blur": ["ぼかし", "Blur"],
    "section.bgImage": ["背景画像", "Background image"],
    "crop.title": ["画像を正方形に切り取り", "Crop image to square"],
    "crop.zoom": ["ズーム", "Zoom"],
    "crop.cancel": ["キャンセル", "Cancel"],
    "crop.apply": ["適用", "Apply"],
    "radio.file": ["ファイル", "File"],
    "file.choose": ["ファイルを選択...", "Choose file..."],
    "btn.clearBg": ["背景画像を削除", "Remove background image"],
    "section.previewShape": ["プレビュー形状", "Preview shape"],
    "hint.previewShape": ["お使いの Kraken に合わせてプレビューの形を切り替えます（実機の表示には影響しません）。", "Switch the preview shape to match your Kraken (does not affect the device)."],
    "label.model": ["モデル", "Model"],
    "model.square": ["無印 Kraken / Plus（1.54\" 正方形）", "Kraken / Plus (1.54\" square)"],
    "model.circle": ["Elite（2.72\" 円形相当）", "Elite (2.72\" round)"],
    "section.reset": ["リセット", "Reset"],
    "hint.reset": ["すべての設定をデフォルトに戻します。この操作は取り消せません。", "Restore all settings to defaults. This cannot be undone."],
    "btn.reset": ["設定をリセット", "Reset settings"],
    "section.language": ["言語", "Language"],
    "section.monitoring": ["モニタリング", "Monitoring"],
    "opt.tempWarn": ["高温で温度を赤く表示", "Highlight high temps in red"],
    "label.tempWarnAt": ["警告する温度", "Warn at"],
    "opt.textGlow": ["文字を光らせる（ネオン）", "Glow text (neon)"],
    "label.glowColor": ["グロー色", "Glow color"],
    "opt.bgGrad": ["背景グラデーション（画像なしのとき）", "Gradient background (when no image)"],
    "label.bgGradA": ["開始色", "Start color"],
    "label.bgGradB": ["終了色", "End color"],
    "label.bgGradAngle": ["角度", "Angle"],
    "hint.gradHandles": ["ツマミをタップして色を選択", "Tap a handle to pick its color"],
    "label.language": ["言語", "Language"],
    "ph.city": ["Tokyo", "Tokyo"],
    "ph.customText": ["メッセージを入力...", "Enter a message..."],
    "ph.bgUrl": ["https://example.com/image.jpg", "https://example.com/image.jpg"],
    "toast.sensorSwap": ["センサーを入れ替えました", "Sensors swapped"],
    "toast.sensorMax": ["センサーは最大3つまでです", "Up to 3 sensors only"],
    "weather.fetching": ["取得中...", "Fetching..."],
    "weather.done": ["✓ 取得完了", "✓ Done"],
    "weather.error": ["エラー: ", "Error: "],
    "toast.weatherFail": ["天気の取得に失敗しました", "Failed to get weather"],
    "toast.weatherOk": ["天気を取得しました: ", "Weather updated: "],
    "weather.lastPrefix": ["最終更新: ", "Last updated: "],
    "rel.justNow": ["たった今", "just now"],
    "rel.minAgo": ["分前", " min ago"],
    "rel.hourMin": ["時間", "h "],
    "rel.minSuffix": ["分前", "m ago"],
    "toast.bgSet": ["背景画像を設定しました", "Background image set"],
    "toast.bgRemoved": ["背景画像を削除しました", "Background image removed"],
    "toast.bgFail": ["画像の読み込みに失敗しました", "Failed to load image"],
    "hint.bgLocal": ["ローカルの画像ファイルから選択します（縮小して保存）。", "Pick a local image file (saved downscaled)."],
    "label.bgHistory": ["最近使った画像", "Recent images"],
    "hint.bgHistoryEmpty": ["まだ履歴がありません。", "No history yet."],
    "confirm.reset": ["本当にすべての設定をリセットしますか？", "Reset all settings?"],
    "confirm.preset": ["プリセットを適用しますか？現在の設定は上書きされます。", "Apply this preset? Your current settings will be overwritten."],
    "section.presets": ["プリセット", "Presets"],
    "section.backup": ["設定の保存・読込み", "Backup & restore"],
    "btn.export": ["設定をファイルに保存", "Export to file"],
    "btn.import": ["ファイルから読込み", "Import from file"],
    "toast.exported": ["設定を書き出しました", "Settings exported"],
    "toast.imported": ["設定を読み込みました", "Settings imported"],
    "toast.importBad": ["読み込めませんでした（形式が不正）", "Couldn’t import (invalid file)"],
    "dialog.ok": ["OK", "OK"],
    "dialog.cancel": ["キャンセル", "Cancel"],
    "weather.notFound": ["都市が見つかりません", "City not found"]
  };

  // ---- IndexedDB image store (background image + 5-slot history) ----
  // Large image data lives here (not localStorage) so it never eats the
  // ~5MB localStorage quota. localStorage only holds a small "bgRev" stamp
  // that changes whenever the image changes, so the Kraken view can detect
  // updates via the storage event and re-read the image from IndexedDB.
  const IDB_NAME = "meteorClock";
  const IDB_STORE = "images";
  let _idbPromise = null;
  function idb() {
    if (_idbPromise) return _idbPromise;
    _idbPromise = new Promise((resolve, reject) => {
      let req;
      try { req = indexedDB.open(IDB_NAME, 1); }
      catch (e) { reject(e); return; }
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return _idbPromise;
  }
  async function idbGet(key) {
    try {
      const db = await idb();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, "readonly");
        const rq = tx.objectStore(IDB_STORE).get(key);
        rq.onsuccess = () => resolve(rq.result ?? null);
        rq.onerror = () => reject(rq.error);
      });
    } catch { return null; }
  }
  async function idbSet(key, val) {
    try {
      const db = await idb();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).put(val, key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch { return false; }
  }
  async function idbDel(key) {
    try {
      const db = await idb();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).delete(key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch { return false; }
  }
  // bump the localStorage stamp so other views (Kraken) re-read the image
  function bumpBgRev() { try { localStorage.setItem("bgRev", String(Date.now())); } catch {} }

  // In-memory cache of the current background image (data URL or ""), loaded
  // from IndexedDB. applyCustomizations reads this synchronously; call
  // refreshBgImageCache() to (re)load it, which then repaints.
  let bgImageCache = "";
  async function refreshBgImageCache() {
    const cur = await idbGet("current");
    bgImageCache = (typeof cur === "string" && cur) ? cur : "";
    applyCustomizations();
  }
  // Last-applied color-layer fill {img, col, op}, used to crossfade the
  // #background-overlay when the solid/gradient fill changes.
  let lastBgFill = null;

  // ---- i18n helpers ----
  function getLang() {
    const v = localStorage.getItem("uiLang");
    if (v === "en") return "en";
    if (v === "ja") return "ja";
    // not set yet: auto-detect from the OS/browser language
    return navigator.language?.startsWith("ja") ? "ja" : "en";
  }
  // translate a key for the current (or given) language; falls back to ja, then key
  function t(key, lang) {
    const L = lang || getLang();
    const entry = I18N[key];
    if (!entry) return key;
    return (L === "en" ? entry[1] : entry[0]) ?? entry[0] ?? key;
  }
  // apply translations to every [data-i18n] / [data-i18n-ph] element in the UI
  function applyLang() {
    const L = getLang();
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = t(key, L);
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const key = el.getAttribute("data-i18n-ph");
      const val = t(key, L);
      if (val != null) el.setAttribute("placeholder", val);
    });
    document.documentElement.setAttribute("lang", L);
  }

  // Three screens, chosen explicitly via ?view= (most reliable for NZXT CAM):
  //   ?view=clock   -> production clock only        (register this for the Kraken LCD)
  //   ?view=config  -> settings panel + preview     (register this for CAM Configure)
  //   (no view)     -> auto: ?kraken=1 => clock, else preview+settings (browser use)
  const params = new URLSearchParams(window.location.search);
  const viewParam = params.get("view");

  function autoIsKraken() {
    if (params.get("kraken") === "1") return true;
    return /[?&]kraken=1(?:&|$)/.test(window.location.href);
  }

  // Resolve the final mode.
  let isKraken;            // true => production clock only (no settings UI)
  if (viewParam === "clock")       isKraken = true;
  else if (viewParam === "config") isKraken = false;
  else                              isKraken = autoIsKraken();

  document.body.classList.add(isKraken ? "kraken" : "config");
  // Non-clock screens show the preview + settings panel.
  if (!isKraken) {
    document.body.classList.add("preview");
    // preview frame shape: square (無印/Plus) or circle (Elite, default)
    const pm = localStorage.getItem("previewModel") || "circle";
    document.body.classList.toggle("preview-square", pm !== "circle");
    // pull the background layers inside the frame so they're clipped to it
    const wrap = document.getElementById("app-wrapper");
    const bgImg = document.getElementById("background-image");
    const bgOv = document.getElementById("background-overlay");
    if (wrap && bgImg && bgOv) {
      wrap.insertBefore(bgOv, wrap.firstChild);
      wrap.insertBefore(bgImg, wrap.firstChild);
    }
  }

  // ---- Helpers ----
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const LS = {
    get: (k, def = null) => localStorage.getItem(k) ?? def,
    set: (k, v) => localStorage.setItem(k, v),
    del: (k) => localStorage.removeItem(k),
  };

  // All persisted setting keys with their default values (uiLang handled
  // separately since it's a UI preference). Shared by reset / export / presets.
  const DEFAULT_SETTINGS = {
    textColor:"#ffffff",bgColor:"#000000",bgImage:"",bgOpacity:"100",bgBlur:"0",bgPosX:"50",bgPosY:"50",bgZoom:"100",bgAspect:"1",colonBlink:"true",
    fontFamily:"'Press Start 2P', monospace",fontWeight:"normal",blendMode:"normal",textShadow:"false",
    textGlow:"false",glowColor:"",glowColorUse:"false",
    tempWarnOn:"false",tempWarn:"80",
    bgGradOn:"false",bgGradA:"#3b82f6",bgGradB:"#a855f7",bgGradAngle:"135",bgGradPosA:"0",bgGradPosB:"100",
    secondRing:"false",secondGrow:"true",secondColorSync:"true",secondColor:"#ffffff",secondMotion:"smooth",ringMotion:"smooth",ringGrow:"true",barLength:"70",
    ringStyle:"fill",ringColorMode:"sync",ringColor:"#ffffff",ringGradA:"#3b82f6",ringGradB:"#a855f7",ringGradAngle:"135",ringGradPosA:"0",ringGradPosB:"100",ringBlend:"normal",ringWidth:"1.4",
    sizeDate:"100",sizeClock:"100",sizeWeather:"100",sizeSensors:"100",sizeCustom:"100",
    marginTop_date:"0",marginBottom_date:"0",marginTop_second:"10",marginBottom_second:"10",
    marginTop_clock:"0",marginBottom_clock:"0",marginTop_weather:"0",marginBottom_weather:"0",
    marginTop_sensors:"0",marginBottom_sensors:"0",marginTop_custom:"0",marginBottom_custom:"0",
    marginTop_graph:"0",marginBottom_graph:"0",marginTop_graph2:"0",marginBottom_graph2:"0",marginTop_graph3:"0",marginBottom_graph3:"0",
    graphSensor:"cpu",graphMinutes:"1",graphShowValue:"true",graphFill:"true",graphHeight:"30",graphWidth:"50",
    graph2Sensor:"gpu",graph2Minutes:"1",graph2ShowValue:"true",graph2Fill:"true",graph2Height:"30",graph2Width:"50",
    graph3Sensor:"liq",graph3Minutes:"1",graph3ShowValue:"true",graph3Fill:"true",graph3Height:"30",graph3Width:"50",
    advDate:"false",advClock:"false",advSecond:"false",advWeather:"false",advSensors:"false",advCustom:"false",
    advGraph:"false",advGraph2:"false",advGraph3:"false",
    is12Hour:"false",dotShape:"square",textScale:"100",dateFormat:"M/D ddd",
    bgOverlay:"none",overlayIntensity:"50",customText:"Custom Text",customTextPos:"top",
    layoutOrder:"date,second,clock,weather,sensors,custom,graph,graph2,graph3",
    sensorOrder:"cpu,gpu,liq,cpuLoad,gpuLoad,cpuFan,gpuFan,memGB,memPct",
    hiddenBlocks:"custom,graph,graph2,graph3",hiddenSensors:"cpuLoad,gpuLoad,cpuFan,gpuFan,memGB,memPct",previewModel:"circle",
    weatherCity:"Tokyo",weatherUnit:"metric",showSeconds:"false",digitAnim:"none",
  };
  // per-block override keys (font/weight/color/blend) for each layout block
  const BLOCK_OVERRIDE_KEYS = [];
  ["date","clock","second","weather","sensors","custom","graph","graph2","graph3"].forEach(b => {
    BLOCK_OVERRIDE_KEYS.push(`font_${b}`,`customFont_${b}`,`weight_${b}`,`color_${b}`,`colorUse_${b}`,`blend_${b}`);
  });
  // every key we export = defaults + per-block overrides
  const ALL_SETTING_KEYS = Object.keys(DEFAULT_SETTINGS).concat(BLOCK_OVERRIDE_KEYS);

  // Built-in presets. Each is a partial set of settings applied over defaults.
  const PRESETS = {
    default: {
      label: { ja: "デフォルト", en: "Default" },
      swatch: { bg: "#000000", fg: "#ffffff", accent: "#888888", font: "'Press Start 2P', monospace" },
      settings: {},
    },
    aurora: {
      label: { ja: "オーロラ", en: "Aurora" },
      swatch: { bg: "#020f12", fg: "#aaffd8", accent: "#00e5a8", font: "'Orbitron', sans-serif" },
      settings: {
        fontFamily:"'Orbitron', sans-serif", fontWeight:"700", textColor:"#c0ffe8",
        bgColor:"#020f12", bgOpacity:"100", bgOverlay:"none",
        bgGradOn:"true", bgGradA:"#020f12", bgGradB:"#0d1f3c", bgGradAngle:"160",
        secondRing:"true", ringStyle:"dot", ringColorMode:"gradient",
        ringGradA:"#00e5a8", ringGradB:"#6c3de8", ringGradAngle:"135",
        ringGradPosA:"0", ringGradPosB:"100",
        ringGrow:"true", ringMotion:"smooth", blendMode:"normal",
        textGlow:"true", glowColorUse:"true", glowColor:"#00e5a8",
        textShadow:"false",
        // show a single CPU sparkline instead of the numeric sensors
        graphSensor:"cpu",
        hiddenBlocks:"custom,sensors,graph2,graph3",
        layoutOrder:"date,second,clock,weather,sensors,graph,custom,graph2,graph3",
      },
    },
    ocean: {
      label: { ja: "オーシャン", en: "Ocean" },
      swatch: { bg: "#010d1a", fg: "#dff4ff", accent: "#0ea5e9", font: "'Comfortaa', sans-serif" },
      settings: {
        fontFamily:"'Comfortaa', sans-serif", fontWeight:"700", textColor:"#dff4ff",
        bgColor:"#010d1a", bgOpacity:"100", bgOverlay:"vignette", overlayIntensity:"40",
        bgGradOn:"true", bgGradA:"#011830", bgGradB:"#0d4060", bgGradAngle:"180",
        secondRing:"true", ringStyle:"fill", ringColorMode:"gradient",
        ringGradA:"#0ea5e9", ringGradB:"#22d3ee", ringGradAngle:"135",
        ringGradPosA:"0", ringGradPosB:"100",
        ringGrow:"true", blendMode:"normal",
        textGlow:"false", textShadow:"false",
      },
    },
    retro: {
      label: { ja: "レトロ", en: "Retro" },
      swatch: { bg: "#001100", fg: "#39ff14", accent: "#39ff14", font: "'Press Start 2P', monospace" },
      settings: {
        fontFamily:"'Press Start 2P', monospace", fontWeight:"normal", textColor:"#39ff14",
        bgColor:"#001100", bgOpacity:"100", bgOverlay:"scanline", overlayIntensity:"60",
        secondRing:"true", ringStyle:"fill", ringColorMode:"solid", ringColor:"#39ff14",
        ringBlend:"normal", textShadow:"true", textGlow:"false", bgGradOn:"false",
      },
    },
    neon: {
      label: { ja: "ネオン", en: "Neon" },
      swatch: { bg: "#0a0020", fg: "#ff4dff", accent: "#a855f7", font: "'Orbitron', sans-serif" },
      settings: {
        fontFamily:"'Orbitron', sans-serif", fontWeight:"700", textColor:"#ffffff",
        bgColor:"#0a0020", bgOpacity:"100", bgOverlay:"none",
        secondRing:"true", ringStyle:"dot", ringColorMode:"gradient", ringPreset:"pinkPurple",
        ringGrow:"true", ringMotion:"smooth", textShadow:"false", blendMode:"normal",
        textGlow:"true", glowColorUse:"true", glowColor:"#ff4dff", bgGradOn:"false",
        // show a single CPU sparkline instead of the numeric sensors
        graphSensor:"cpu",
        hiddenBlocks:"custom,sensors,graph2,graph3",
        layoutOrder:"date,second,clock,weather,sensors,graph,custom,graph2,graph3",
      },
    },
    mono: {
      label: { ja: "モノクロ", en: "Mono" },
      swatch: { bg: "#111111", fg: "#ffffff", accent: "#666666", font: "'Roboto', sans-serif" },
      settings: {
        fontFamily:"'Roboto', sans-serif", fontWeight:"900", textColor:"#ffffff",
        bgColor:"#111111", bgOpacity:"100", bgOverlay:"dots", overlayIntensity:"30",
        secondRing:"false", secondGrow:"true", blendMode:"normal", textShadow:"false",
        textGlow:"false", bgGradOn:"false",
      },
    },
    sunset: {
      label: { ja: "サンセット", en: "Sunset" },
      swatch: { bg: "#3a0d2a", fg: "#fff0e0", accent: "#ff9e2c", font: "'Quicksand', sans-serif" },
      settings: {
        fontFamily:"'Quicksand', sans-serif", fontWeight:"700", textColor:"#fff0e0",
        bgColor:"#3a0d2a", bgOpacity:"100", bgOverlay:"none",
        bgGradOn:"true", bgGradA:"#ff6b6b", bgGradB:"#7b2ff7", bgGradAngle:"160",
        secondRing:"true", ringStyle:"dot", ringColorMode:"gradient", ringPreset:"orangeRed",
        ringGrow:"true", textShadow:"true", textGlow:"false", blendMode:"normal",
      },
    },
    terminal: {
      label: { ja: "ターミナル", en: "Terminal" },
      swatch: { bg: "#020a02", fg: "#33ff66", accent: "#33ff66", font: "'Doto', sans-serif" },
      settings: {
        fontFamily:"'Doto', sans-serif", fontWeight:"700", textColor:"#33ff66",
        bgColor:"#020a02", bgOpacity:"100", bgOverlay:"grid", overlayIntensity:"40",
        secondRing:"false", secondGrow:"true", barLength:"90",
        textShadow:"false", textGlow:"true", glowColorUse:"true", glowColor:"#33ff66",
        blendMode:"normal", bgGradOn:"false", dateFormat:"ddd, MMM D",
        // monitoring dashboard: CPU + GPU sparklines instead of numeric sensors
        graphSensor:"cpu", graph2Sensor:"gpu",
        hiddenBlocks:"custom,sensors,graph3",
        layoutOrder:"date,second,clock,weather,sensors,graph,graph2,custom,graph3",
      },
    },
    sakura: {
      label: { ja: "サクラ", en: "Sakura" },
      swatch: { bg: "#2a0a18", fg: "#ffe3ef", accent: "#ff8fb8", font: "'Abril Fatface', cursive" },
      settings: {
        fontFamily:"'Abril Fatface', cursive", fontWeight:"normal", textColor:"#ffe3ef",
        bgColor:"#2a0a18", bgOpacity:"100", bgOverlay:"none",
        bgGradOn:"true", bgGradA:"#ff9ec4", bgGradB:"#6a2c5a", bgGradAngle:"135",
        secondRing:"true", ringStyle:"fill", ringColorMode:"gradient", ringPreset:"pinkPurple",
        ringGrow:"true", textShadow:"true", textGlow:"false", blendMode:"normal",
      },
    },
  };

  function hexToRgba(hex, opacity) {
    const r = parseInt(hex.substring(1,3), 16);
    const g = parseInt(hex.substring(3,5), 16);
    const b = parseInt(hex.substring(5,7), 16);
    return `rgba(${r},${g},${b},${(+opacity/100).toFixed(2)})`;
  }

  function showToast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2000);
  }

  // Custom confirm dialog (replaces window.confirm). Returns a Promise<boolean>.
  // opts.danger = true styles the confirm button as destructive.
  function confirmDialog(message, opts = {}) {
    return new Promise((resolve) => {
      const modal = $("#confirmModal");
      const dialog = modal?.querySelector(".confirm-dialog");
      const msgEl = $("#confirmMessage");
      const okBtn = $("#confirmOk");
      const cancelBtn = $("#confirmCancel");
      if (!modal || !msgEl || !okBtn || !cancelBtn) { resolve(window.confirm(message)); return; }

      msgEl.textContent = message;
      if (dialog) dialog.classList.toggle("danger", !!opts.danger);
      modal.style.display = "flex";

      const cleanup = (result) => {
        modal.style.display = "none";
        okBtn.onclick = null;
        cancelBtn.onclick = null;
        modal.onclick = null;
        document.removeEventListener("keydown", onKey);
        resolve(result);
      };
      const onKey = (e) => {
        if (e.key === "Escape") cleanup(false);
        else if (e.key === "Enter") cleanup(true);
      };
      okBtn.onclick = () => cleanup(true);
      cancelBtn.onclick = () => cleanup(false);
      // click on the dim backdrop = cancel
      modal.onclick = (e) => { if (e.target === modal) cleanup(false); };
      document.addEventListener("keydown", onKey);
    });
  }

  // ---- Date format ----
  const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const pad2 = n => String(n).padStart(2,"0");

  function formatDate(now, pattern) {
    const y=now.getFullYear(), m=now.getMonth()+1, d=now.getDate();
    const w=WEEKDAYS[now.getDay()], MMM=MONTHS_EN[now.getMonth()];
    return pattern
      .replace(/YYYY/g, y)
      .replace(/MMM/g, MMM)
      .replace(/MM/g, pad2(m))
      .replace(/\bM\b/g, m)
      .replace(/DD/g, pad2(d))
      .replace(/\bD\b/g, d)
      .replace(/ddd/g, w);
  }

  // ---- Text scale ----
  const textScaleState = { pct: clampPct(parseInt(LS.get("textScale","100"),10)) };
  function clampPct(v) { const n=Number.isFinite(+v)?+v:100; return Math.max(30,Math.min(100,n)); }

  const baseSizes = { clock:null, date:null, weather:null, custom:null, temps:[], labels:[] };

  function captureBaseFontSizes() {
    const px = el => el ? parseFloat(getComputedStyle(el).fontSize) : null;
    baseSizes.clock   = px($("#clock"));
    baseSizes.date    = px($("#date"));
    baseSizes.weather = px($("#weather-block"));
    baseSizes.custom  = px($("#custom-text"));
    baseSizes.temps   = $$(".temp").map(px);
    baseSizes.labels  = $$(".label").map(px);
  }

  function clearTextScaleInline() {
    // #ampm intentionally excluded: it stays sized in `em` so it tracks #clock.
    ["#clock","#date","#weather-block","#custom-text"].forEach(sel => { const el=$(sel); if(el) el.style.fontSize=""; });
    $$(".temp,.label").forEach(el => (el.style.fontSize=""));
  }

  function applyTextOnlyScale(pct) {
    const f = clampPct(parseInt(pct,10)) / 100;
    const px = n => `${Math.max(1,Math.round(n*f))}px`;
    if (Number.isFinite(baseSizes.clock)   && $("#clock"))         $("#clock").style.fontSize         = px(baseSizes.clock);
    if (Number.isFinite(baseSizes.date)    && $("#date"))          $("#date").style.fontSize          = px(baseSizes.date);
    if (Number.isFinite(baseSizes.weather) && $("#weather-block")) $("#weather-block").style.fontSize = px(baseSizes.weather);
    if (Number.isFinite(baseSizes.custom)  && $("#custom-text"))   $("#custom-text").style.fontSize   = px(baseSizes.custom);
    $$(".temp").forEach((el,i) => { const b=baseSizes.temps[i]; if(Number.isFinite(b)) el.style.fontSize=px(b); });
    $$(".label").forEach((el,i)=> { const b=baseSizes.labels[i]; if(Number.isFinite(b)) el.style.fontSize=px(b); });
  }

  function recalcAndApplyTextScale() {
    // applyCustomizations sets all baseline sizes (preview-scaled) then re-applies
    // the current scale, so a single call recomputes everything consistently.
    requestAnimationFrame(() => applyCustomizations());
  }

  // ---- Apply customizations ----
  function applyCustomizations(opts = {}) {
    const font       = opts.font       ?? LS.get("fontFamily","'Press Start 2P', monospace");
    const fontWeight = opts.fontWeight ?? LS.get("fontWeight","normal");
    const textColor  = opts.textColor  ?? LS.get("textColor","#ffffff");
    const bgColor    = opts.bgColor    ?? LS.get("bgColor","#000000");
    const bgOpacity  = opts.bgOpacity  ?? LS.get("bgOpacity",100);
    // background image now comes from IndexedDB via an async cache, not LS.
    const bgImage    = opts.bgImage    !== undefined ? opts.bgImage : bgImageCache;
    const bgBlur     = opts.bgBlur     ?? LS.get("bgBlur",0);
    const dotShape   = opts.dotShape   ?? LS.get("dotShape","square");
    const fontName   = font.replace(/['"]/g,"").split(",")[0].trim();

    // text color
    document.body.style.color = textColor;
    $$(".divider").forEach(el => (el.style.backgroundColor = hexToRgba(textColor,30)));
    // second-bar length: width of the divider track (the bar fills within it).
    const barLen = Math.max(20, Math.min(100, +LS.get("barLength", 70) || 70));
    $$(".divider").forEach(el => (el.style.width = `${barLen}%`));

    // second progress color: synced to text color (default), or a custom color
    const secSync = LS.get("secondColorSync") !== "false";
    const secColor = secSync ? textColor : (LS.get("secondColor") || textColor);
    $$(".second-bar").forEach(el => (el.style.backgroundColor = secColor));

    // ---- Ring color: independent mode (sync / solid / gradient) ----
    applyRingColor(textColor);

    // background
    const bgImgEl = $("#background-image");
    // priority: uploaded image > gradient (if enabled) > none
    const gradOn = LS.get("bgGradOn", "false") === "true";
    const gradA = LS.get("bgGradA", "#3b82f6");
    const gradB = LS.get("bgGradB", "#a855f7");
    const gradAngle = +LS.get("bgGradAngle", 135) || 135;
    const gradPosA = Math.max(0, Math.min(100, +LS.get("bgGradPosA", 0)));
    const gradPosB = Math.max(0, Math.min(100, +LS.get("bgGradPosB", 100)));
    const gradStr = `linear-gradient(${gradAngle}deg, ${gradA} ${gradPosA}%, ${gradB} ${gradPosB}%)`;
    // The image element holds only the uploaded image (or nothing). The color
    // layer (gradient or solid) lives on #background-overlay below.
    if (bgImgEl) {
      bgImgEl.style.backgroundImage = bgImage ? `url('${bgImage}')` : "none";
    }
    // Background framing for the uploaded image: static images are pre-cropped to
    // a square (defaults: center / cover). GIFs keep their original data and are
    // framed via position + zoom so they can be repositioned without re-encoding.
    if (bgImgEl && bgImage) {
      const bgZoom = +LS.get("bgZoom", 100) || 100;
      const bgPosX = LS.get("bgPosX", 50);
      const bgPosY = LS.get("bgPosY", 50);
      if (bgZoom <= 100) {
        bgImgEl.style.backgroundSize = "cover";
      } else {
        const ar = +LS.get("bgAspect", 1) || 1;
        bgImgEl.style.backgroundSize = ar >= 1 ? `auto ${bgZoom}%` : `${bgZoom}% auto`;
      }
      bgImgEl.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
    }
    const overlay = $("#background-overlay");
    if (overlay) {
      // The color layer sits above the image: a solid tint or a gradient wash,
      // dimmed by the opacity slider. With no image it's the full background;
      // with an image, lower opacity lets the photo show through.
      const newOp  = (Math.max(0, Math.min(100, +bgOpacity)) / 100).toString();
      const newImg = gradOn ? gradStr : "none";
      const newCol = gradOn ? "transparent" : bgColor;
      overlay.style.opacity = newOp;
      overlay.style.backgroundImage = newImg;
      overlay.style.backgroundColor = newCol;

      // Crossfade the fill change (solid<->gradient, color/gradient tweaks):
      // background-image can't be CSS-transitioned, so show the OLD fill on a
      // dedicated layer above and fade it out to reveal the new fill below.
      const fade = $("#background-overlay-fade");
      const fillChanged = lastBgFill &&
        (lastBgFill.img !== newImg || lastBgFill.col !== newCol);
      if (fade && fillChanged) {
        // Show the OLD fill on the fade layer and animate it out, revealing the
        // new fill underneath. Uses the Web Animations API (not a CSS transition
        // + reflow), which reliably plays even amid other repaints; the layer's
        // resting opacity stays 0 (CSS) so it's invisible between crossfades.
        fade.style.backgroundImage = lastBgFill.img;
        fade.style.backgroundColor = lastBgFill.col;
        fade.animate(
          [{ opacity: lastBgFill.op }, { opacity: 0 }],
          { duration: 450, easing: "ease" }
        );
      }
      lastBgFill = { img: newImg, col: newCol, op: newOp };
    }
    // blur applies only to the background image element
    if (bgImgEl) bgImgEl.style.filter = +bgBlur > 0 ? `blur(${bgBlur}px)` : "";
    const appWrapper = $("#app-wrapper");
    if (appWrapper) appWrapper.style.filter = "";

    // clear button
    const clearBtn = $("#clearBgImage");
    if (clearBtn) clearBtn.style.display = bgImage ? "inline-block" : "none";

    // font family + per-font sizing.
    // Apply to #app-wrapper (the clock area) — NOT <body> — so the settings UI,
    // which lives outside #app-wrapper, keeps its own font and weight.
    const appWrap = $("#app-wrapper");
    if (appWrap) {
      appWrap.classList.remove("lowercase");
      appWrap.style.fontFamily = font;
      appWrap.style.fontWeight = fontWeight;
      // text glow / neon effect
      const glowOn = LS.get("textGlow", "false") === "true";
      appWrap.classList.toggle("text-glow", glowOn);
      const glowColor = LS.get("glowColor", "") || textColor;
      appWrap.style.setProperty("--glow-color", glowColor);
    }
    // ---- Blend modes (text + ring mix with the background image) ----
    // mix-blend-mode only reaches the background if the element shares the
    // background's stacking context. #app-content and #second-ring normally
    // carry a z-index (own context), which would trap the blend. So when ANY
    // blend is active we drop those z-indexes (DOM order keeps the layering:
    // bg < overlay < ring < fx < content) and restore them otherwise.
    const globalBlend = LS.get("blendMode", "normal") || "normal";
    const ringBlend = LS.get("ringBlend", "") || "";
    // gather per-block blends to know if any block overrides
    const blockBlends = ["date","clock","second","weather","sensors","custom", ...GRAPH_BLOCKS]
      .map(k => LS.get(`blend_${k}`, "") || "");
    const anyBlend = globalBlend !== "normal"
      || (ringBlend && ringBlend !== "normal")
      || blockBlends.some(b => b && b !== "normal");

    const appContentEl = $("#app-content");
    const ringEl = $("#second-ring");
    if (appContentEl) {
      appContentEl.style.mixBlendMode = globalBlend;
      // toggle a class that frees the stacking context for blending
      appContentEl.classList.toggle("blend-active", !!anyBlend);
    }
    // ring blend (applied to the progress + dot)
    const rBlendProg = $("#ringProgress");
    const rBlendDot = $("#ringDot");
    const rb = (ringBlend && ringBlend !== "normal") ? ringBlend : "";
    if (rBlendProg) rBlendProg.style.mixBlendMode = rb;
    if (rBlendDot) rBlendDot.style.mixBlendMode = rb;
    if (ringEl) ringEl.classList.toggle("blend-active", !!anyBlend);

    const clock  = $("#clock");
    const date   = $("#date");
    const temps  = $$(".temp");
    const labels = $$(".label");

    const sizes = {
      "Press Start 2P": { clock:120, date:40, temp:34, label:16, top:"20%" },
      "Montserrat":     { clock:160, date:60, temp:48, label:20, top:"17%" },
      "Doto":           { clock:160, date:55, temp:42, label:22, top:"19%" },
      "Major Mono Display": { clock:138, date:48, temp:40, label:20, top:"19%", lower:true },
      "Orbitron":       { clock:150, date:52, temp:40, label:18, top:"18%" },
      "Roboto":         { clock:160, date:50, temp:42, label:20, top:"18%" },
      "Comfortaa":      { clock:150, date:50, temp:42, label:20, top:"18%" },
      "Racing Sans One":{ clock:160, date:52, temp:44, label:20, top:"18%" },
      "Abril Fatface":  { clock:155, date:54, temp:42, label:20, top:"18%" },
      "Quicksand":      { clock:155, date:52, temp:42, label:20, top:"18%" },
    };
    const s = sizes[fontName] || { clock:140, date:50, temp:40, label:18, top:"20%" };
    // The size table is authored for a 640px-square reference (the Kraken's
    // native resolution). To make the Configuration preview and the real device
    // look IDENTICAL, scale every size by (actual display edge / 640). The edge
    // is the rendered size of #app-wrapper, which is 640 on the device and the
    // circle's diameter in the preview. This is the key to 1:1 parity.
    const REF = 640;
    const wrapEl = $("#app-wrapper");
    // In the square (無印 Kraken) preview the actual screen is a small centered
    // square, not the whole round housing. Use #app-content's rendered size as
    // the edge there so text is scaled to the little square, not the big circle.
    const squarePreview = document.body.classList.contains("preview-square");
    const measureEl = squarePreview ? ($("#app-content") || wrapEl) : wrapEl;
    const edge = measureEl ? Math.min(measureEl.clientWidth, measureEl.clientHeight) || REF : REF;
    const DF = edge / REF;
    const pxv = n => `${(n * DF).toFixed(1)}px`;

    // Per-block size multiplier (50..200%, default 100). Lets each block be
    // sized independently; this stacks on top of the global text scale.
    const sizeFactor = key => {
      const v = parseInt(LS.get(`size${key}`, "100"), 10);
      const n = Number.isFinite(v) ? v : 100;
      return Math.max(50, Math.min(200, n)) / 100;
    };
    const fDate    = sizeFactor("Date");
    const fClock   = sizeFactor("Clock");
    const fWeather = sizeFactor("Weather");
    const fSensors = sizeFactor("Sensors");
    const fCustom  = sizeFactor("Custom");
    // px helper with a per-block factor baked in
    const pxf = (n, f) => `${(n * DF * f).toFixed(1)}px`;

    if (clock)  clock.style.fontSize   = pxf(s.clock, fClock);
    if (date)   { date.style.fontSize  = pxf(s.date, fDate); }
    temps.forEach(el  => (el.style.fontSize  = pxf(s.temp, fSensors)));
    labels.forEach(el => (el.style.fontSize  = pxf(s.label, fSensors)));
    if (s.lower) { const aw = $("#app-wrapper"); if (aw) aw.classList.add("lowercase"); }

    // shadow
    const shadowOn = LS.get("textShadow") === "true";
    ['#date','#clock','#cpuTemp','#gpuTemp','#liqTemp','.label','#ampm',
     '#weather-icon','#weather-temp','#weather-desc','.status-item .temp',
     '#custom-text','.graph-head'].forEach(sel => {
      $$(sel).forEach(el => el.classList.toggle('text-shadow', shadowOn));
    });
    $$(".dot").forEach(el => el.classList.toggle("shadow-dot", shadowOn));
    $$(".divider").forEach(el => el.classList.toggle("shadow-divider", shadowOn));

    // visibility flags
    document.body.classList.toggle("temps-hidden", LS.get("tempsHidden") === "true");
    document.body.classList.toggle("show-seconds", LS.get("showSeconds") === "true");

    // Second progress:
    //  - bar : the separated .second-block, always "bar" style now. Its
    //          visibility is controlled by the show/hide zones (data-block).
    //  - ring: an independent full-overlay ring toggled in the 全体 tab.
    //          Bar and ring can be shown at the same time.
    const ringOn = LS.get("secondRing") === "true";
    document.body.classList.toggle("second-ring", ringOn);
    // ring display style: "fill" (default) or "dot" (orbiting dot)
    const ringStyle = LS.get("ringStyle", "fill") || "fill";
    const dotMode = ringStyle === "dot";
    document.body.classList.toggle("ring-dot", dotMode);
    const ringDotEl = $("#ringDot");
    const ringProgEl = $("#ringProgress");
    if (ringDotEl) ringDotEl.style.display = (ringOn && dotMode) ? "block" : "none";
    // #ringProgress is the gradient arc in BOTH styles; just adjust the radius.
    if (ringProgEl) ringProgEl.setAttribute("r", dotMode ? RING_R_DOT : 48);
    // ring line thickness (applies to track + progress arc)
    const ringWidth = +LS.get("ringWidth", 1.4) || 1.4;
    const ringTrackEl = $("#ringTrack");
    if (ringTrackEl) ringTrackEl.setAttribute("stroke-width", ringWidth);
    if (ringProgEl) ringProgEl.setAttribute("stroke-width", ringWidth);
    // refresh the arc immediately so toggling style/preview updates at once
    updateSecondProgress();
    const bar = $("#secondBar");
    if (bar) bar.style.display = "block";
    $$(".divider").forEach(d => (d.style.display = "block"));

    // Per-block top/bottom margin (px on a 640 reference, scaled to the
    // display edge so preview and device match). Values clamp to 0..200.
    // Keys: marginTop_<block> / marginBottom_<block> for every layout block.
    const clampMargin = v => Math.max(0, Math.min(200, Number.isFinite(+v) ? +v : 0));
    ["date","second","clock","weather","sensors","custom", ...GRAPH_BLOCKS].forEach(key => {
      const el = document.querySelector(`#app-content [data-block="${key}"]`);
      if (!el) return;
      // second bar defaults to a 10px top/bottom margin; others default to 0
      const def = key === "second" ? 10 : 0;
      const mt = clampMargin(LS.get(`marginTop_${key}`, def));
      const mb = clampMargin(LS.get(`marginBottom_${key}`, def));
      el.style.marginTop    = pxv(mt);
      el.style.marginBottom = pxv(mb);

      // Per-block font / weight / color overrides. Empty = inherit the global
      // setting (so we clear the inline style to fall back to the body value).
      let bf = LS.get(`font_${key}`, "");
      if (bf === "__custom__") bf = LS.get(`customFont_${key}`, "") ? `'${LS.get(`customFont_${key}`)}', sans-serif` : "";
      el.style.fontFamily = bf || "";
      const bw = LS.get(`weight_${key}`, "");
      el.style.fontWeight = bw || "";
      const useColor = LS.get(`colorUse_${key}`) === "true";
      const bc = LS.get(`color_${key}`, "");
      el.style.color = (useColor && bc) ? bc : "";

      // Per-block blend mode. Empty = inherit (the global blend on #app-content
      // already covers this block, so we clear any inline value here).
      const bb = LS.get(`blend_${key}`, "");
      el.style.mixBlendMode = bb || "";
    });

    // dot shape
    const isRound = dotShape === "round";
    $$(".dot").forEach(el => {
      el.style.width = "0.10em";
      el.style.height = "0.10em";
      el.style.margin = "0.10em 0";
      el.style.backgroundColor = "currentColor";
      el.style.borderRadius = isRound ? "50%" : "0";
    });

    // background overlay FX (scanline / crt / grid / dots / noise / vignette)
    const fx = LS.get("bgOverlay", "none") || "none";
    document.body.classList.remove(
      "fx-none","fx-scanline","fx-crt","fx-grid","fx-dots","fx-noise","fx-vignette"
    );
    document.body.classList.add(`fx-${fx}`);
    // intensity 10..100 -> 0.1..1.0
    const fxAmt = Math.max(10, Math.min(100, +LS.get("overlayIntensity", 50) || 50)) / 100;
    document.body.style.setProperty("--fx-intensity", fxAmt.toFixed(2));

    // custom text
    const ctEl = $("#custom-text");
    if (ctEl) {
      const txt = LS.get("customText","Custom Text");
      const pos = LS.get("customTextPos","top");
      ctEl.textContent = txt;
      ctEl.className = txt ? `pos-${pos}` : "";
    }

    // weather/custom-text baseline sizes (CSS defaults 22px / 18px), preview-scaled
    const wbEl = $("#weather-block");
    if (wbEl) wbEl.style.fontSize = pxf(22, fWeather);
    if (ctEl) ctEl.style.fontSize = pxf(18, fCustom);

    // sensor graphs: sparkline dimensions + caption for each graph block,
    // preview-scaled like text. Value caption can be hidden (label stays).
    const sensorNames = { cpu:"CPU", gpu:"GPU", liq:"LIQ", cpuLoad:"CPU%", gpuLoad:"GPU%" };
    GRAPH_BLOCKS.forEach(key => {
      const blockEl = document.querySelector(`#app-content [data-block="${key}"]`);
      if (!blockEl) return;
      const svgEl = blockEl.querySelector(".graph-svg");
      if (svgEl) {
        const gh = Math.max(16, Math.min(80, +LS.get(`${key}Height`, 30) || 30));
        const gw = Math.max(30, Math.min(100, +LS.get(`${key}Width`, 50) || 50));
        svgEl.style.height = pxv(gh);
        svgEl.style.width = `${gw}%`;
      }
      const headEl = blockEl.querySelector(".graph-head");
      if (headEl) headEl.style.fontSize = pxv(24);
      // value caption visibility (label always stays visible)
      const valEl = blockEl.querySelector(".graph-value");
      if (valEl) valEl.style.display = LS.get(`${key}ShowValue`, "true") === "true" ? "" : "none";
      const areaEl = blockEl.querySelector(".graph-area");
      if (areaEl) areaEl.style.display = LS.get(`${key}Fill`, "true") === "true" ? "" : "none";
      const labelEl = blockEl.querySelector(".graph-label");
      if (labelEl) {
        const sensor = LS.get(`${key}Sensor`, GRAPH_DEFAULT_SENSOR[key] || "cpu");
        labelEl.textContent = sensorNames[sensor] || "CPU";
      }
    });
    renderGraph();

    // applyCustomizations just rewrote all font-sizes to the 100% baseline
    // (preview-scaled where applicable). Re-capture those baselines and re-apply
    // the current text scale, so changing any setting never resets the scale.
    captureBaseFontSizes();
    applyTextOnlyScale(textScaleState.pct);

    // reorder the stacked blocks per the saved layout order
    applyLayoutOrder();
    applySensorOrder();
    applySensorVisibility();
    applyBlockVisibility();
  }

  // ---- Layout order (drag-to-reorder) ----
  // The reorderable blocks, keyed by their data-block attribute.
  const GRAPH_BLOCKS = ["graph","graph2","graph3"];
  // default source sensor per graph (used when nothing is saved yet)
  const GRAPH_DEFAULT_SENSOR = { graph: "cpu", graph2: "gpu", graph3: "liq" };
  const LAYOUT_BLOCKS = ["date","second","clock","weather","sensors","custom", ...GRAPH_BLOCKS];
  const DEFAULT_LAYOUT = "date,second,clock,weather,sensors,custom,graph,graph2,graph3";

  // One-time migration: the graph blocks were added after users may have saved a
  // layout. Keep them hidden for existing users until they enable them.
  if (localStorage.getItem("hiddenBlocks") !== null && LS.get("graphIntroduced") !== "2") {
    const hb = (localStorage.getItem("hiddenBlocks") || "")
      .split(",").map(s => s.trim()).filter(Boolean);
    GRAPH_BLOCKS.forEach(g => { if (!hb.includes(g)) hb.push(g); });
    LS.set("hiddenBlocks", hb.join(","));
  }
  LS.set("graphIntroduced", "2");

  // All selectable sensor items, keyed by data-sensor.
  const SENSOR_ITEMS = ["cpu","gpu","liq","cpuLoad","gpuLoad","cpuFan","gpuFan","memGB","memPct"];
  // sensorOrder lists ALL items (visible first, then hidden). Visible cap = 3.
  const DEFAULT_SENSOR_ORDER = "cpu,gpu,liq,cpuLoad,gpuLoad,cpuFan,gpuFan,memGB,memPct";
  // everything except the first three is hidden by default
  const DEFAULT_HIDDEN_SENSORS = "cpuLoad,gpuLoad,cpuFan,gpuFan,memGB,memPct";
  const MAX_VISIBLE_SENSORS = 3;

  function getLayoutOrder() {
    const raw = LS.get("layoutOrder", DEFAULT_LAYOUT) || DEFAULT_LAYOUT;
    const parts = raw.split(",").map(s => s.trim()).filter(Boolean);
    // keep only known keys, then append any missing ones (forward-compat)
    const known = parts.filter(k => LAYOUT_BLOCKS.includes(k));
    LAYOUT_BLOCKS.forEach(k => { if (!known.includes(k)) known.push(k); });
    return known;
  }

  function getSensorOrder() {
    const raw = LS.get("sensorOrder", DEFAULT_SENSOR_ORDER) || DEFAULT_SENSOR_ORDER;
    const parts = raw.split(",").map(s => s.trim()).filter(Boolean);
    const known = parts.filter(k => SENSOR_ITEMS.includes(k));
    SENSOR_ITEMS.forEach(k => { if (!known.includes(k)) known.push(k); });
    return known;
  }

  // Which blocks are hidden (sent to the "non-display" zone). Comma-joined set.
  function getHiddenBlocks() {
    const DEFAULT_HIDDEN_BLOCKS = "custom,graph,graph2,graph3";
    const raw = LS.get("hiddenBlocks", DEFAULT_HIDDEN_BLOCKS);
    return (raw == null ? DEFAULT_HIDDEN_BLOCKS : raw)
      .split(",").map(s => s.trim()).filter(k => LAYOUT_BLOCKS.includes(k));
  }

  // Hide/show whole blocks on the clock by toggling display on the data-block
  // element. Independent of the per-sensor hidden state.
  // opts.animate = fade/collapse a block out before hiding it (preview only).
  function applyBlockVisibility(opts = {}) {
    const animate = !!opts.animate && document.body.classList.contains("preview");
    const hidden = new Set(getHiddenBlocks());
    LAYOUT_BLOCKS.forEach(key => {
      const el = document.querySelector(`#app-content [data-block="${key}"]`);
      if (!el) return;
      const wasHidden = el.dataset.blockHidden === "1";
      const nowHidden = hidden.has(key);
      if (nowHidden) {
        el.dataset.blockHidden = "1";
        if (animate && !wasHidden && el.offsetParent !== null) {
          // fade/scale out, then hide once the transition ends
          el.classList.add("block-leaving");
          const done = () => {
            el.style.display = "none";
            el.classList.remove("block-leaving");
            el.removeEventListener("transitionend", done);
          };
          el.addEventListener("transitionend", done);
          // fallback in case transitionend doesn't fire
          setTimeout(done, 320);
        } else {
          el.style.display = "none";
        }
      } else {
        delete el.dataset.blockHidden;
        el.classList.remove("block-leaving");
        el.style.display = "";
      }
    });
  }

  // Reorder the children of #app-content to match the saved order using
  // flexbox `order`. Using `order` (not DOM moves) keeps it cheap and avoids
  // disturbing the live clock nodes.
  function applyLayoutOrder() {
    const order = getLayoutOrder();
    order.forEach((key, i) => {
      const el = document.querySelector(`#app-content [data-block="${key}"]`);
      if (el) el.style.order = String(i);
    });
  }

  // FLIP: animate layout changes (reorder / show / hide) smoothly. Only runs in
  // preview; on the real device we just apply the change instantly.
  // `mutate` is a callback that performs the actual order/visibility change.
  function animateLayoutChange(mutate) {
    const content = $("#app-content");
    const isPreview = document.body.classList.contains("preview");
    if (!content || !isPreview) { mutate(); return; }

    const items = Array.from(content.querySelectorAll(":scope > [data-block]"));
    // First: record current positions (only of currently-visible items)
    const first = new Map();
    items.forEach(el => {
      if (el.offsetParent !== null) first.set(el, el.getBoundingClientRect());
    });

    // Apply the change
    mutate();

    // Last: measure new positions and invert+play
    items.forEach(el => {
      const f = first.get(el);
      const nowVisible = el.offsetParent !== null;
      if (f && nowVisible) {
        // moved item: FLIP from old to new position
        const l = el.getBoundingClientRect();
        const dx = f.left - l.left;
        const dy = f.top - l.top;
        if (dx || dy) {
          el.style.transition = "none";
          el.style.transform = `translate(${dx}px, ${dy}px)`;
          // next frame: clear transform so the CSS transition animates it home
          requestAnimationFrame(() => requestAnimationFrame(() => {
            el.style.transition = "";
            el.style.transform = "";
          }));
        }
      } else if (!f && nowVisible) {
        // newly shown item: fade/scale in
        el.classList.add("block-entering");
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.classList.remove("block-entering");
        }));
      }
    });
  }

  // Reorder the CPU/GPU/LIQ items inside the sensor block via flex `order`.
  function applySensorOrder() {
    const order = getSensorOrder();
    order.forEach((key, i) => {
      const el = document.querySelector(`.status-block [data-sensor="${key}"]`);
      if (el) el.style.order = String(i);
    });
  }

  // Which sensors are hidden (sent to the sensor "non-display" zone).
  function getHiddenSensors() {
    const raw = LS.get("hiddenSensors", DEFAULT_HIDDEN_SENSORS);
    return (raw == null ? DEFAULT_HIDDEN_SENSORS : raw)
      .split(",").map(s => s.trim()).filter(k => SENSOR_ITEMS.includes(k));
  }

  // Show/hide individual CPU/GPU/LIQ items on the clock.
  function applySensorVisibility() {
    const hidden = new Set(getHiddenSensors());
    SENSOR_ITEMS.forEach(key => {
      const el = document.querySelector(`.status-block [data-sensor="${key}"]`);
      if (el) el.style.display = hidden.has(key) ? "none" : "";
    });
  }

  // Generic config-side drag & drop reorder. Uses Pointer Events so the same
  // code path handles touch (mobile) and mouse. Drags the list item, reorders
  // the <li>s live, persists the resulting key order, then re-applies it.
  //   opts.listId   – id of the <ul>
  //   opts.storageKey – localStorage key to save the comma-joined order
  //   opts.getOrder – returns the saved key array (for initial sequencing)
  //   opts.apply    – called after each change to reflect on the clock
  function setupReorder(opts) {
    const list = $(`#${opts.listId}`);
    if (!list) return;

    // Only the list's DIRECT child <li>s are reorderable. This matters because
    // the sensor list is nested inside the "sensors" hub item, and we must not
    // let the outer layout list grab the inner sensor items (or vice-versa).
    const directItems = () =>
      Array.from(list.children).filter(el => el.classList.contains("cfg-reorder-item"));
    // Normalize any element to the direct-child item that contains it.
    const toDirectItem = (el) => {
      let cur = el;
      while (cur && cur.parentElement !== list) cur = cur.parentElement;
      return (cur && cur.classList?.contains("cfg-reorder-item")) ? cur : null;
    };

    // 1) order the <li>s to match the saved order
    (opts.getOrder() || []).forEach(key => {
      const li = directItems().find(el => el.dataset.key === key);
      if (li) list.appendChild(li); // re-append in saved sequence
    });

    // 2) persist current DOM order + reflect on the clock
    const persist = () => {
      const order = directItems().map(li => li.dataset.key);
      LS.set(opts.storageKey, order.join(","));
      opts.apply();
      sync();
    };

    // 3) pointer-based drag — clone follows finger, placeholder holds the slot
    let dragEl = null, ghost = null, placeholder = null, pointerId = null;
    let grabDX = 0, grabDY = 0, dropBefore = null;

    function makePlaceholder(h) {
      const ph = document.createElement("li");
      ph.className = "cfg-drop-placeholder";
      ph.style.height = h + "px";
      return ph;
    }

    function onPointerDown(e) {
      const handle = e.target.closest(".cfg-reorder-handle");
      if (!handle) return;
      const item = toDirectItem(handle);
      if (!item) return;
      e.preventDefault();
      e.stopPropagation();
      dragEl = item;
      pointerId = e.pointerId;

      const rect = item.getBoundingClientRect();
      grabDX = e.clientX - rect.left;
      grabDY = e.clientY - rect.top;

      ghost = item.cloneNode(true);
      ghost.classList.add("cfg-drag-ghost");
      ghost.style.width = rect.width + "px";
      ghost.style.left = rect.left + "px";
      ghost.style.top = rect.top + "px";
      document.body.appendChild(ghost);

      placeholder = makePlaceholder(rect.height);
      list.insertBefore(placeholder, item);
      item.classList.add("dragging-src");

      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    }

    function onPointerMove(e) {
      if (!dragEl) return;
      e.preventDefault();
      const x = e.clientX, y = e.clientY;
      ghost.style.left = (x - grabDX) + "px";
      ghost.style.top  = (y - grabDY) + "px";

      const sibs = directItems().filter(el => el !== dragEl && el !== placeholder);
      let before = null;
      for (const sib of sibs) {
        const r = sib.getBoundingClientRect();
        if (y < r.top + r.height / 2) { before = sib; break; }
      }
      dropBefore = before;
      if (before) list.insertBefore(placeholder, before);
      else list.appendChild(placeholder);
    }

    function onPointerUp() {
      if (!dragEl) return;
      const landing = dragEl;
      if (placeholder && placeholder.parentElement) {
        placeholder.parentElement.insertBefore(landing, placeholder);
        placeholder.remove();
      }
      placeholder = null;
      if (ghost) { ghost.remove(); ghost = null; }
      landing.classList.remove("dragging-src");
      landing.classList.add("dropped");
      setTimeout(() => landing.classList.remove("dropped"), 240);
      dragEl = null; pointerId = null; dropBefore = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      persist();
    }

    list.addEventListener("pointerdown", onPointerDown);
  }

  // ---- Hub accordion: tap a hub header to expand its detail panel ----
  function setupHubAccordion() {
    const lists = [$("#layoutReorder"), $("#layoutHidden")].filter(Boolean);
    lists.forEach(list => {
      list.addEventListener("click", (e) => {
        // ignore clicks that originated on a drag handle
        if (e.target.closest(".cfg-reorder-handle")) return;
        const header = e.target.closest(".cfg-hub-header");
        if (!header) return;
        const item = header.parentElement;
        if (!item.classList.contains("cfg-hub-item")) return;
        // accordion: open the tapped one, close all others (in both zones)
        const wasOpen = item.classList.contains("open");
        lists.forEach(l => $$(".cfg-hub-item", l).forEach(i => i.classList.remove("open")));
        if (!wasOpen) item.classList.add("open");
      });
    });
  }

  // ---- Layout two-zone drag (visible <-> hidden) ----
  // Items can be reordered within a zone and moved between the visible and
  // hidden zones. Uses a placeholder to show the drop position, highlights the
  // active drop zone, and floats the dragged item under the finger.
  // Place layout hub-items into the visible/hidden zones according to the
  // saved order + hiddenBlocks. Safe to call repeatedly (e.g. after a preset).
  function placeLayoutItems() {
    const visible = $("#layoutReorder");
    const hidden  = $("#layoutHidden");
    if (!visible || !hidden) return;
    const order = getLayoutOrder();
    const hiddenSet = new Set(getHiddenBlocks());
    order.forEach(key => {
      const li = document.querySelector(`#tab-layout .cfg-hub-item[data-key="${key}"]`);
      if (!li) return;
      (hiddenSet.has(key) ? hidden : visible).appendChild(li);
    });
  }

  function setupLayoutZones() {
    const visible = $("#layoutReorder");
    const hidden  = $("#layoutHidden");
    const hiddenLabel = $("#hiddenZoneLabel");
    if (!visible || !hidden) return;

    const zones = [visible, hidden];
    const directItems = (zone) =>
      Array.from(zone.children).filter(el => el.classList.contains("cfg-hub-item"));

    // 1) place items into their saved zone + order on load
    placeLayoutItems();

    // 2) persist current arrangement of both zones
    const persist = () => {
      const vis = directItems(visible).map(li => li.dataset.key);
      const hid = directItems(hidden).map(li => li.dataset.key);
      // saved order = visible first (in their order), then hidden
      LS.set("layoutOrder", [...vis, ...hid].join(","));
      LS.set("hiddenBlocks", hid.join(","));
      // animate the reorder + show/hide on the preview
      animateLayoutChange(() => {
        applyLayoutOrder();
        applyBlockVisibility({ animate: true });
        applyWeather();
      });
      sync();
    };

    // 3) drag — clone follows the finger; a placeholder holds the slot.
    // The floating clone is appended to <body> (not the panel) so the panel's
    // backdrop-filter doesn't break position:fixed tracking.
    let dragEl = null, ghost = null, placeholder = null;
    let pointerId = null, originZone = null;
    let grabDX = 0, grabDY = 0;
    let dropZone = null, dropBefore = null;

    function makePlaceholder(h) {
      const ph = document.createElement("li");
      ph.className = "cfg-drop-placeholder";
      ph.style.height = h + "px";
      return ph;
    }

    function onPointerDown(e) {
      const handle = e.target.closest(".cfg-reorder-handle");
      if (!handle) return;
      const item = handle.closest(".cfg-hub-item");
      if (!item) return;
      e.preventDefault();
      e.stopPropagation();
      dragEl = item;
      originZone = item.parentElement;
      pointerId = e.pointerId;

      // collapse any open detail so the drag is compact
      item.classList.remove("open");

      const rect = item.getBoundingClientRect();
      grabDX = e.clientX - rect.left;
      grabDY = e.clientY - rect.top;

      // floating clone appended to <body> (escapes backdrop-filter)
      ghost = item.cloneNode(true);
      ghost.classList.add("cfg-drag-ghost");
      ghost.style.width = rect.width + "px";
      ghost.style.left = rect.left + "px";
      ghost.style.top = rect.top + "px";
      document.body.appendChild(ghost);

      // placeholder takes the slot; original becomes invisible spacer
      placeholder = makePlaceholder(rect.height);
      originZone.insertBefore(placeholder, item);
      item.classList.add("dragging-src");   // hidden original (keeps DOM ref)

      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    }

    function highlightZone(zone) {
      zones.forEach(z => z.classList.toggle("cfg-zone-active", z === zone && z === hidden));
      if (hiddenLabel) hiddenLabel.classList.toggle("cfg-zone-active", zone === hidden);
    }

    function onPointerMove(e) {
      if (!dragEl) return;
      e.preventDefault();
      const x = e.clientX, y = e.clientY;
      // move the floating clone with the finger
      ghost.style.left = (x - grabDX) + "px";
      ghost.style.top  = (y - grabDY) + "px";

      // which zone is the pointer over?
      const overHidden = isPointerOver(hidden, x, y) || isPointerOver(hiddenLabel, x, y);
      const overVisible = isPointerOver(visible, x, y);
      const targetZone = overHidden ? hidden : (overVisible ? visible : originZone);
      highlightZone(overHidden ? hidden : null);

      // move the placeholder to the slot under the finger (other items shift)
      const sibs = directItems(targetZone).filter(el => el !== dragEl && el !== placeholder);
      let before = null;
      for (const sib of sibs) {
        const r = sib.getBoundingClientRect();
        if (y < r.top + r.height / 2) { before = sib; break; }
      }
      dropZone = targetZone;
      dropBefore = before;
      if (before) targetZone.insertBefore(placeholder, before);
      else targetZone.appendChild(placeholder);
    }

    function isPointerOver(el, x, y) {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    }

    function onPointerUp() {
      if (!dragEl) return;
      const landing = dragEl;

      // drop the real item where the placeholder is
      if (placeholder && placeholder.parentElement) {
        placeholder.parentElement.insertBefore(landing, placeholder);
        placeholder.remove();
      }
      placeholder = null;
      if (ghost) { ghost.remove(); ghost = null; }

      landing.classList.remove("dragging-src");
      landing.classList.add("dropped");
      setTimeout(() => landing.classList.remove("dropped"), 240);

      dragEl = null; pointerId = null; originZone = null;
      dropZone = null; dropBefore = null;

      zones.forEach(z => z.classList.remove("cfg-zone-active"));
      if (hiddenLabel) hiddenLabel.classList.remove("cfg-zone-active");

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      persist();
    }

    zones.forEach(z => z.addEventListener("pointerdown", onPointerDown));
  }

  // Horizontal two-zone drag for sensor cards (visible <-> hidden).
  // Same clone-follow + placeholder pattern, but insertion is decided by the
  // pointer's X position since the cards are laid out in a row.
  function setupSensorZones() {
    const visible = $("#sensorVisible");
    const hidden  = $("#sensorHidden");
    const hiddenLabel = $("#sensorHiddenLabel");
    if (!visible || !hidden) return;

    const zones = [visible, hidden];
    const cards = (zone) =>
      Array.from(zone.children).filter(el => el.classList.contains("cfg-sensor-card"));

    // place cards into saved zone + order on load.
    // Only rearrange from storage if the user has actually saved an arrangement
    // before (key present). On first run we keep the HTML default: first 3
    // visible, the rest hidden.
    const hasSaved = LS.get("hiddenSensors") !== null && LS.get("sensorOrder") !== null;
    if (hasSaved) {
      const order = getSensorOrder();
      const hiddenSet = new Set(getHiddenSensors());
      order.forEach(key => {
        const card = document.querySelector(`#tab-layout .cfg-sensor-card[data-key="${key}"]`);
        if (!card) return;
        (hiddenSet.has(key) ? hidden : visible).appendChild(card);
      });
    }
    // safety: never allow more than the max in the visible zone on load
    let v = cards(visible);
    while (v.length > MAX_VISIBLE_SENSORS) {
      hidden.appendChild(v[v.length - 1]); // push the right-most extra to hidden
      v = cards(visible);
    }

    const persist = () => {
      const vis = cards(visible).map(c => c.dataset.key);
      const hid = cards(hidden).map(c => c.dataset.key);
      LS.set("sensorOrder", [...vis, ...hid].join(","));
      LS.set("hiddenSensors", hid.join(","));
      applySensorOrder();
      applySensorVisibility();
      sync();
    };

    let dragEl = null, ghost = null, placeholder = null;
    let grabDX = 0, grabDY = 0, pointerId = null;
    let dropZone = null, dropBefore = null;
    let fromHidden = false, swapTarget = null;

    function makePlaceholder(w, h) {
      const ph = document.createElement("li");
      ph.className = "cfg-sensor-placeholder";
      // Height matches the dragged card. Width is left to the layout:
      // in the flex (visible) zone CSS gives it flex:1 1 0; in the grid
      // (hidden) zone it fills one grid cell. Setting a fixed px width here
      // breaks the 3-column grid, so we only fix the height.
      ph.style.height = h + "px";
      return ph;
    }

    function isOver(el, x, y) {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    }

    function onDown(e) {
      const card = e.target.closest(".cfg-sensor-card");
      if (!card) return;
      e.preventDefault();
      e.stopPropagation();
      dragEl = card;
      fromHidden = (card.parentElement === hidden);
      pointerId = e.pointerId;
      const rect = card.getBoundingClientRect();
      grabDX = e.clientX - rect.left;
      grabDY = e.clientY - rect.top;

      ghost = card.cloneNode(true);
      ghost.classList.add("cfg-drag-ghost");
      ghost.style.width = rect.width + "px";
      ghost.style.left = rect.left + "px";
      ghost.style.top = rect.top + "px";
      document.body.appendChild(ghost);

      placeholder = makePlaceholder(rect.width, rect.height);
      card.parentElement.insertBefore(placeholder, card);
      card.classList.add("dragging-src");

      window.addEventListener("pointermove", onMove, { passive: false });
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    }

    function clearSwapTarget() {
      if (swapTarget) { swapTarget.classList.remove("cfg-swap-target"); swapTarget = null; }
    }

    function onMove(e) {
      if (!dragEl) return;
      e.preventDefault();
      const x = e.clientX, y = e.clientY;
      ghost.style.left = (x - grabDX) + "px";
      ghost.style.top  = (y - grabDY) + "px";

      const overHidden = isOver(hidden, x, y) || isOver(hiddenLabel, x, y);
      const overVisible = isOver(visible, x, y);
      hidden.classList.toggle("cfg-zone-active", overHidden);
      if (hiddenLabel) hiddenLabel.classList.toggle("cfg-zone-active", overHidden);

      // SWAP MODE: a card from the hidden zone dropped onto an already-full
      // visible zone. Don't open a 4th slot — highlight the card under the
      // pointer as the one that will be swapped out.
      const visibleFull = cards(visible).filter(c => c !== dragEl).length >= MAX_VISIBLE_SENSORS;
      if (overVisible && fromHidden && visibleFull) {
        if (placeholder.parentElement) placeholder.remove();
        const target = cards(visible).find(c => {
          if (c === dragEl) return false;
          const r = c.getBoundingClientRect();
          return x >= r.left && x <= r.right;
        }) || cards(visible).filter(c => c !== dragEl).pop();
        if (target !== swapTarget) {
          clearSwapTarget();
          swapTarget = target;
          swapTarget?.classList.add("cfg-swap-target");
        }
        dropZone = null; dropBefore = null;
        return;
      }

      // normal placeholder mode (reorder within a zone, or move to hidden)
      clearSwapTarget();
      const targetZone = overHidden ? hidden : (overVisible ? visible : (placeholder.parentElement || hidden));
      const sibs = cards(targetZone).filter(el => el !== dragEl && el !== placeholder);
      let before = null;
      for (const sib of sibs) {
        const r = sib.getBoundingClientRect();
        if (x < r.left + r.width / 2) { before = sib; break; }
      }
      dropZone = targetZone;
      dropBefore = before;
      if (before) targetZone.insertBefore(placeholder, before);
      else targetZone.appendChild(placeholder);
    }

    function onUp() {
      if (!dragEl) return;
      const landing = dragEl;

      if (swapTarget) {
        // SWAP: dragged card takes the target's slot; target moves to hidden
        const slot = document.createComment("slot");
        visible.insertBefore(slot, swapTarget);
        hidden.appendChild(swapTarget);
        visible.insertBefore(landing, slot);
        slot.remove();
        clearSwapTarget();
        if (placeholder && placeholder.parentElement) placeholder.remove();
        placeholder = null;
        showToast(t("toast.sensorSwap"));
      } else {
        // normal drop at the placeholder
        if (placeholder && placeholder.parentElement) {
          placeholder.parentElement.insertBefore(landing, placeholder);
          placeholder.remove();
        }
        placeholder = null;
        // safety: never exceed the max
        let vis = cards(visible);
        while (vis.length > MAX_VISIBLE_SENSORS) {
          const evict = vis.find(c => c !== landing) || vis[0];
          hidden.appendChild(evict);
          vis = cards(visible);
          showToast(t("toast.sensorMax"));
        }
      }

      if (ghost) { ghost.remove(); ghost = null; }
      landing.classList.remove("dragging-src");

      dragEl = null; pointerId = null; dropZone = null; dropBefore = null; fromHidden = false;
      hidden.classList.remove("cfg-zone-active");
      if (hiddenLabel) hiddenLabel.classList.remove("cfg-zone-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      persist();
    }

    zones.forEach(z => z.addEventListener("pointerdown", onDown));
  }

  // CSS-class based animations (applied directly to a digit span).
  const SIMPLE_ANIMS = ["fade","blur"];
  // Mechanical-counter style animations that need a two-layer (old/new) DOM.
  const MECH_ANIMS = ["roll","drum","flap","crossfade"];

  // Build the inner two-layer markup used by mechanical-counter animations.
  function ensureMechStructure(el, anim) {
    let mech = el.querySelector(":scope > .mech");
    if (!mech) {
      mech = document.createElement("span");
      mech.className = "mech";
      mech.innerHTML = '<span class="mech-old"></span><span class="mech-new"></span>';
      const prev = el.textContent;
      el.textContent = "";
      el.appendChild(mech);
      mech.querySelector(".mech-old").textContent = prev;
    }
    mech.className = `mech mech-${anim}`;
    return mech;
  }

  // Tear down the two-layer structure, leaving a plain text node again.
  function flattenMech(el, value) {
    const mech = el.querySelector(":scope > .mech");
    if (mech) mech.remove();
    el.textContent = value;
  }

  // Animate a SINGLE digit span (one character). Replays the chosen animation
  // only if its character actually changed.
  function setOneDigit(span, ch) {
    if (!span) return;
    const anim = LS.get("digitAnim","none");
    const current = span.querySelector(":scope > .mech .mech-new")?.textContent
      ?? span.textContent;
    if (current === ch) return; // unchanged digit → no animation

    if (MECH_ANIMS.includes(anim)) {
      const mech = ensureMechStructure(span, anim);
      mech.querySelector(".mech-old").textContent = current;
      mech.querySelector(".mech-new").textContent = ch;
      mech.classList.remove("mech-run");
      void mech.offsetWidth;
      mech.classList.add("mech-run");
      clearTimeout(span._mechTimer);
      span._mechTimer = setTimeout(() => flattenMech(span, ch), 600);
      return;
    }

    if (span.querySelector(":scope > .mech")) flattenMech(span, current);
    span.textContent = ch;
    if (anim === "none" || !SIMPLE_ANIMS.includes(anim)) return;
    const cls = `digit-${anim}`;
    span.classList.remove(cls);
    void span.offsetWidth;
    span.classList.add(cls);
  }

  // Set a two-character value (e.g. "08") on a digit element, splitting it into
  // a tens span and a ones span so each digit animates independently. When only
  // the ones digit changes (e.g. 38 -> 39), the tens digit is left untouched.
  function setDigit(el, value) {
    if (!el) return;
    const str = String(value);
    // ensure the two inner spans exist
    let tens = el.querySelector(":scope > .d-tens");
    let ones = el.querySelector(":scope > .d-ones");
    if (!tens || !ones) {
      el.textContent = "";
      tens = document.createElement("span"); tens.className = "d-tens";
      ones = document.createElement("span"); ones.className = "d-ones";
      el.appendChild(tens);
      el.appendChild(ones);
    }
    // split (always two chars for clock fields; fall back gracefully)
    const t = str.length >= 2 ? str[str.length - 2] : "0";
    const o = str[str.length - 1] ?? "0";
    setOneDigit(tens, t);
    setOneDigit(ones, o);
  }

  function updateClock() {
    const now = new Date();
    const is12 = LS.get("is12Hour") === "true";
    let h = now.getHours();
    let ampm = "";
    if (is12) { ampm = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; }

    const hEl=$("#hour"), mEl=$("#minute"), amEl=$("#ampm"), dEl=$("#date"), sEl=$("#secValue");
    setDigit(hEl, String(h).padStart(2,"0"));
    setDigit(mEl, String(now.getMinutes()).padStart(2,"0"));
    if (amEl) { amEl.textContent = is12 ? ampm : ""; amEl.style.display = is12 ? "block" : "none"; }

    const fmt = LS.get("dateFormat","M/D ddd");
    if (dEl) dEl.textContent = formatDate(now, fmt);

    const sec = now.getSeconds();
    setDigit(sEl, String(sec).padStart(2,"0"));
    updateSecondProgress(now);
  }

  const RING_C = 2 * Math.PI * 48; // ring circumference for r=48
  // Dot-orbit mode pulls the ring ~10px inward. The preview circle renders at
  // roughly 336px, so the 100-unit viewBox maps ~3.36px per unit; 10px ≈ 3 units.
  const RING_R_DOT = 45;                       // r=48 - 3 units (~10px inward)
  const RING_C_DOT = 2 * Math.PI * RING_R_DOT; // circumference for the dot ring
  // 20px forward gap ≈ 6 viewBox units of arc length.
  const RING_FWD_GAP = 6;

  // Gradient presets: [startColor, endColor]
  const RING_PRESETS = {
    bluePurple: ["#3b82f6", "#a855f7"],
    cyanBlue:   ["#22d3ee", "#3b82f6"],
    pinkPurple: ["#ec4899", "#a855f7"],
    greenCyan:  ["#22c55e", "#22d3ee"],
    orangeRed:  ["#f97316", "#ef4444"],
  };

  // Current ring color state, kept so updateRingDot can color the dot to match
  // the gradient position. { mode, a, b, solid }
  let ringColorState = { mode: "sync", a: "#3b82f6", b: "#a855f7", solid: "#ffffff" };
  let lastFrac = 0;
  let ringVanishing = false; // true during the 0.3s "shut" animation at wrap

  // Linear-interpolate between two hex colors. t in 0..1.
  function lerpHex(h1, h2, t) {
    const p = (h) => {
      const s = h.replace("#", "");
      const n = s.length === 3 ? s.split("").map(c => c + c).join("") : s;
      return [parseInt(n.slice(0,2),16), parseInt(n.slice(2,4),16), parseInt(n.slice(4,6),16)];
    };
    const [r1,g1,b1] = p(h1), [r2,g2,b2] = p(h2);
    const r = Math.round(r1 + (r2-r1)*t);
    const g = Math.round(g1 + (g2-g1)*t);
    const b = Math.round(b1 + (b2-b1)*t);
    return `rgb(${r},${g},${b})`;
  }

  // Color the dot/gap for a given progress fraction (0..1). For gradient mode
  // the dot matches the gradient color at that position; otherwise it's solid.
  function ringDotColorAt(frac) {
    const s = ringColorState;
    if (s.mode === "gradient") return lerpHex(s.a, s.b, Math.max(0, Math.min(1, frac)));
    return s.solid;
  }

  // Apply ring color according to its own mode (sync / solid / gradient).
  // `textColor` is used as the synced color.
  function applyRingColor(textColor) {
    const mode = LS.get("ringColorMode") || "sync";
    const ringProg = $("#ringProgress");

    if (mode === "gradient") {
      const a = LS.get("ringGradA") || "#3b82f6";
      const b = LS.get("ringGradB") || "#a855f7";
      const pA = Math.max(0, Math.min(100, +LS.get("ringGradPosA", 0)));
      const pB = Math.max(0, Math.min(100, +LS.get("ringGradPosB", 100)));
      const angle = +LS.get("ringGradAngle", 135) || 135;
      const rad = angle * Math.PI / 180;
      const x1 = (0.5 - 0.5 * Math.sin(rad)) * 100;
      const y1 = (0.5 + 0.5 * Math.cos(rad)) * 100;
      const x2 = (0.5 + 0.5 * Math.sin(rad)) * 100;
      const y2 = (0.5 - 0.5 * Math.cos(rad)) * 100;
      const gradEl = $("#ringGrad");
      if (gradEl) {
        gradEl.setAttribute("x1", `${x1.toFixed(1)}%`);
        gradEl.setAttribute("y1", `${y1.toFixed(1)}%`);
        gradEl.setAttribute("x2", `${x2.toFixed(1)}%`);
        gradEl.setAttribute("y2", `${y2.toFixed(1)}%`);
      }
      const stopA = $("#ringGradA");
      const stopB = $("#ringGradB");
      if (stopA) { stopA.setAttribute("stop-color", a); stopA.setAttribute("offset", `${pA}%`); }
      if (stopB) { stopB.setAttribute("stop-color", b); stopB.setAttribute("offset", `${pB}%`); }
      if (ringProg) ringProg.style.stroke = "url(#ringGrad)";
      ringColorState = { mode, a, b, solid: b };
    } else {
      const solid = (mode === "solid")
        ? (LS.get("ringColor") || textColor)
        : textColor; // sync
      if (ringProg) ringProg.style.stroke = solid;
      ringColorState = { mode, a: solid, b: solid, solid };
    }
    // refresh dot color for the current position
    const ds = $("#ringDot");
    const c = ringDotColorAt(lastFrac);
    if (ds) { ds.style.fill = c; ds.style.color = c; }
  }

  // Update bar/ring progress. `now` optional; defaults to current time.
  function updateSecondProgress(now = new Date()) {
    const sec = now.getSeconds();
    const ms  = now.getMilliseconds();
    // smooth motion uses sub-second precision; tick/ease snap to whole seconds
    const fracFor = (motion) => motion === "smooth" ? (sec + ms / 1000) / 60 : sec / 60;

    // --- Second BAR: own motion + grow ---
    const barMotion = LS.get("secondMotion") || "smooth";
    const barGrow   = LS.get("secondGrow") !== "false"; // default on
    const barFrac   = !barGrow ? 1 : fracFor(barMotion);

    // --- Second RING: own motion + grow (independent of the bar) ---
    const ringMotion = LS.get("ringMotion") || "smooth";
    const ringGrow   = LS.get("ringGrow") !== "false"; // default on
    // Dot always orbits with the real second (so it keeps moving even when the
    // ring is "full"); the arc fill is what `grow` controls.
    const ringDotFrac = fracFor(ringMotion);
    // For the filled-ring style, the progress fill uses 1 when grow is off.
    const ringFrac    = !ringGrow ? 1 : ringDotFrac;

    const secBar = $("#secondBar");
    const ringProg = $("#ringProgress");

    // Detect the 59->0 wrap (use ring's real-second progress as the clock tick).
    const wrapFrac = fracFor("smooth");
    const wrapping = wrapFrac < lastFrac;

    // On the 59->0 wrap, the value decreases. In ease mode that would animate
    // backwards, so momentarily disable the transition for the reset.
    if (wrapping) {
      if (secBar && barMotion === "ease")   secBar.style.transition = "none";
      if (ringProg && ringMotion === "ease") ringProg.style.transition = "none";
      if ((barMotion === "ease") || (ringMotion === "ease")) {
        requestAnimationFrame(() => requestAnimationFrame(applySecondMotion));
      }
    }

    // Ring "shut" effect: when the minute wraps and the ring is enabled with
    // grow on, play a quick (~0.3s) clockwise vanish of the full ring before
    // resuming the normal fill. The bar is unaffected.
    // Ring "shut" effect: tie it to the ring motion instead of a separate
    // toggle. The clockwise vanish only makes sense for continuous motion, so
    // it runs for smooth/ease and is automatically off for "tick" (per-second).
    const ringShut = ringMotion !== "tick";
    const isFillMode = LS.get("ringStyle","fill") !== "dot";
    if (wrapping && ringGrow && ringShut && isFillMode && ringProg && !ringVanishing) {
      playRingVanish(ringProg, ringMotion);
    }

    lastFrac = wrapFrac;

    if (secBar) secBar.style.width = `${barFrac * 100}%`;

    const dotMode = LS.get("ringStyle","fill") === "dot";
    if (ringProg && !ringVanishing) {
      if (dotMode) {
        // dot-orbit: inset radius, gradient arc + leading dot (see updateRingDot).
        // Dot position uses the real second so it keeps orbiting even when full.
        ringProg.setAttribute("r", RING_R_DOT);
        updateRingDot(ringDotFrac, ringGrow);
      } else {
        // filled ring: full-size radius, simple progress fill
        ringProg.setAttribute("r", 48);
        ringProg.style.strokeDasharray = RING_C;
        ringProg.style.strokeDashoffset = RING_C * (1 - ringFrac);
      }
    }
  }

  // Dot-orbit rendering on #ringProgress (inset radius).
  // grow=true : the gradient arc runs from the start up to the dot, with the dot
  //             sitting right on the leading tip (no gap).
  // grow=false: the ring is fully drawn, but a ~20px gap is cut just AHEAD of the
  //             dot (in the travel direction); the dot leads that gap.
  // The dot (and gap) are colored to match the gradient at the dot's position.
  const RING_CX = 50, RING_CY = 50;
  function updateRingDot(frac, grow) {
    const ringProg = $("#ringProgress");
    const dot = $("#ringDot");
    const R = RING_R_DOT;
    const C = RING_C_DOT;
    const ang = (-90 + 360 * frac) * Math.PI / 180; // 12 o'clock start, clockwise
    if (dot) {
      dot.setAttribute("cx", (RING_CX + R * Math.cos(ang)).toFixed(2));
      dot.setAttribute("cy", (RING_CY + R * Math.sin(ang)).toFixed(2));
    }
    if (ringProg) {
      if (grow) {
        // arc from start (12 o'clock) up to the dot; dot connects at the tip
        const vis = Math.max(0, C * frac);
        ringProg.style.strokeDasharray = `${vis} ${C - vis}`;
        ringProg.style.strokeDashoffset = "0";
      } else {
        // Full ring minus a ~20px gap placed just AHEAD of the dot (clockwise).
        // The solid arc ends exactly at the dot; the gap follows in the travel
        // direction. dash pattern is "solid(vis) then gap"; offset = vis - dotDist
        // makes the solid segment terminate at the dot position.
        const gap = RING_FWD_GAP;
        const vis = C - gap;
        const dotDist = C * frac;
        ringProg.style.strokeDasharray = `${vis} ${gap}`;
        ringProg.style.strokeDashoffset = (vis - dotDist).toFixed(2);
      }
    }
    // color the dot to match the gradient at this position
    const c = ringDotColorAt(frac);
    if (dot) { dot.style.fill = c; dot.style.color = c; }
  }

  // Animate the full ring vanishing clockwise from its start point in ~0.3s.
  // Implemented by shrinking the visible arc length from C->0 while advancing
  // the dashoffset negatively, so the arc's start sweeps clockwise as it goes.
  const RING_VANISH_MS = 300;
  function playRingVanish(ringProg, motion) {
    ringVanishing = true;
    // start: full ring
    ringProg.style.transition = "none";
    ringProg.style.strokeDasharray = `${RING_C} ${RING_C}`;
    ringProg.style.strokeDashoffset = "0";
    // force a reflow so the start state is committed before transitioning
    void ringProg.getBoundingClientRect();
    // transition both properties for the sweep
    ringProg.style.transition =
      `stroke-dashoffset ${RING_VANISH_MS}ms cubic-bezier(.4,0,.2,1), ` +
      `stroke-dasharray ${RING_VANISH_MS}ms cubic-bezier(.4,0,.2,1)`;
    // end: zero-length arc, start point swept one full turn clockwise
    requestAnimationFrame(() => {
      ringProg.style.strokeDasharray = `0 ${RING_C}`;
      ringProg.style.strokeDashoffset = `${-RING_C}`;
    });
    // after the sweep, hand control back to the normal fill logic
    clearTimeout(playRingVanish._t);
    playRingVanish._t = setTimeout(() => {
      ringVanishing = false;
      ringProg.style.transition = "none";
      ringProg.style.strokeDasharray = RING_C;
      ringProg.style.strokeDashoffset = RING_C; // empty, ready to fill
      // restore the motion-appropriate transition for subsequent frames
      applySecondMotion();
    }, RING_VANISH_MS + 20);
  }

  // Apply the CSS transition that matches each chosen motion (bar & ring separate).
  function applySecondMotion() {
    const barMotion  = LS.get("secondMotion") || "smooth";
    const ringMotion = LS.get("ringMotion")   || "smooth";
    const bar = $("#secondBar");
    const ring = $("#ringProgress");
    // ease: 0.95s ease transition | smooth & tick: no CSS transition (rAF/instant)
    if (bar) bar.style.transition = barMotion === "ease" ? "width 0.95s ease" : "none";
    // don't touch the ring while the vanish animation owns its transition
    if (ring && !ringVanishing) {
      ring.style.transition = ringMotion === "ease" ? "stroke-dashoffset 0.95s ease" : "none";
    }
  }

  // rAF loop, active when EITHER the bar or the ring uses smooth motion
  let rafId = null;
  function startSmoothLoop() {
    cancelAnimationFrame(rafId);
    const loop = () => {
      const barSmooth  = (LS.get("secondMotion") || "smooth") === "smooth";
      const ringSmooth = (LS.get("ringMotion")   || "smooth") === "smooth";
      if (barSmooth || ringSmooth) {
        updateSecondProgress();
        rafId = requestAnimationFrame(loop);
      }
    };
    rafId = requestAnimationFrame(loop);
  }

  function toggleColon() {
    if (LS.get("colonBlink", "true") !== "true") return;
    const c = $("#colon");
    if (c) c.style.opacity = c.style.opacity === "0" ? "1" : "0";
  }

  // ---- Weather ----
  // opts.silent: true => no toast / status text (used by the auto-update timer)
  async function fetchWeather(city, unit, opts = {}) {
    const { silent = false } = opts;
    const statusEl = $("#weatherStatus");
    if (statusEl && !silent) statusEl.textContent = t("weather.fetching");
    // Open-Meteo (無料・APIキー不要) + geocoding
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      if (!geoData.results?.length) throw new Error(t("weather.notFound"));
      const { latitude, longitude, name } = geoData.results[0];
      const tempUnit = unit === "imperial" ? "fahrenheit" : "celsius";
      const wxRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&temperature_unit=${tempUnit}&timezone=auto`);
      const wxData = await wxRes.json();
      const temp = wxData.current.temperature_2m;
      const code = wxData.current.weathercode;
      const symbol = unit === "imperial" ? "°F" : "°C";

      const WX_ICONS = {
        0:"☀️",1:"🌤",2:"⛅",3:"☁️",45:"🌫",48:"🌫",
        51:"🌦",53:"🌦",55:"🌧",61:"🌧",63:"🌧",65:"🌧",
        71:"🌨",73:"🌨",75:"❄️",80:"🌦",81:"🌧",82:"🌧",
        95:"⛈️",96:"⛈️",99:"⛈️"
      };
      const icon = WX_ICONS[code] ?? "🌡️";

      LS.set("weatherIcon", icon);
      LS.set("weatherTemp", `${Math.round(temp)}${symbol}`);
      LS.set("weatherDesc", name);
      LS.set("weatherOn", "true");
      LS.set("weatherFetchedAt", String(Date.now()));

      applyWeather();
      recalcAndApplyTextScale();
      updateWeatherLastUpdatedUI();
      sync();
      if (statusEl && !silent) statusEl.textContent = t("weather.done");
      if (!silent) showToast(t("toast.weatherOk") + name);
      return true;
    } catch(e) {
      if (statusEl && !silent) statusEl.textContent = t("weather.error") + e.message;
      if (!silent) showToast(t("toast.weatherFail"));
      return false;
    }
  }

  // localStorage may not be written yet when this module first loads (Kraken
  // side reads on storage events); sync() pings other open views.
  function sync() { LS.set("__refresh__", Date.now()); }

  // Auto-update interval: 1 hour.
  const WEATHER_REFRESH_MS = 60 * 60 * 1000;
  let weatherTimer = null;
  let lastUpdatedTicker = null;

  // Format a timestamp as "HH:MM" plus a relative suffix, localized.
  function formatLastUpdated(ts) {
    const en = getLang() === "en";
    const notYet = en ? "n/a" : "未取得";
    if (!ts) return notYet;
    const d = new Date(+ts);
    if (isNaN(d)) return notYet;
    const hhmm = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
    const diffMin = Math.floor((Date.now() - +ts) / 60000);
    let rel;
    if (en) {
      if (diffMin < 1)       rel = "just now";
      else if (diffMin < 60) rel = `${diffMin} min ago`;
      else                   rel = `${Math.floor(diffMin / 60)}h ${diffMin % 60}m ago`;
    } else {
      if (diffMin < 1)       rel = "たった今";
      else if (diffMin < 60) rel = `${diffMin}分前`;
      else                   rel = `${Math.floor(diffMin / 60)}時間${diffMin % 60}分前`;
    }
    return `${hhmm} (${rel})`;
  }

  function updateWeatherLastUpdatedUI() {
    const el = $("#weatherLastUpdated");
    if (!el) return;
    const ts = LS.get("weatherFetchedAt");
    el.textContent = ts ? t("weather.lastPrefix") + formatLastUpdated(ts) : t("weather.lastNever");
  }

  // Refresh weather if it's stale (older than the interval) or never fetched.
  // Called on load and by the hourly timer.
  async function maybeRefreshWeather() {
    const city = LS.get("weatherCity", "Tokyo");
    const unit = LS.get("weatherUnit", "metric");
    if (!city) return;
    const ts = +LS.get("weatherFetchedAt", "0");
    const stale = !ts || (Date.now() - ts) >= WEATHER_REFRESH_MS;
    if (stale) await fetchWeather(city, unit, { silent: true });
  }

  // Start (or restart) the hourly auto-update timer + the 1-min "◯分前" ticker.
  function startWeatherAutoUpdate() {
    clearInterval(weatherTimer);
    clearInterval(lastUpdatedTicker);
    // refresh stale data shortly after load (don't block first paint)
    setTimeout(maybeRefreshWeather, 1500);
    weatherTimer = setInterval(maybeRefreshWeather, WEATHER_REFRESH_MS);
    // keep the relative "◯分前" label fresh
    lastUpdatedTicker = setInterval(updateWeatherLastUpdatedUI, 60 * 1000);
  }

  function applyWeather() {
    const block = $("#weather-block");
    if (!block) return;
    // if the weather block was sent to the hidden zone, keep it hidden
    if (block.dataset.blockHidden === "1") { block.style.display = "none"; return; }
    // shown whenever weather data has been fetched at least once
    const on = LS.get("weatherOn") === "true";
    block.style.display = on ? "flex" : "none";
    if (on) {
      const iconEl = $("#weather-icon");
      const tempEl = $("#weather-temp");
      const descEl = $("#weather-desc");
      if (iconEl) iconEl.textContent = LS.get("weatherIcon","");
      if (tempEl) tempEl.textContent = LS.get("weatherTemp","");
      if (descEl) descEl.textContent = LS.get("weatherDesc","");
    }
  }

  // ---- Sensor history (sparkline graph block) ----
  // In-memory history of recent sensor values: { key: [[timestamp, value], ...] }.
  // History is persisted to localStorage so the graph survives reloads AND is
  // shared across views: the always-on clock (Kraken) view is the source of
  // truth and writes it; the Configure preview loads it and follows along via
  // storage events, so opening Configure shows the device's continuous history
  // instead of resetting to empty.
  const GRAPH_KEYS = ["cpu","gpu","liq","cpuLoad","gpuLoad"];
  const graphHistory = { cpu:[], gpu:[], liq:[], cpuLoad:[], gpuLoad:[] };
  const GRAPH_MAX_MS = 11 * 60 * 1000; // a little over the largest window (10 min)
  const GRAPH_STORE_KEY = "graphHistoryV1";
  let graphHasRealData = false;
  let graphDemoTimer = null;
  let graphPersistAt = 0;

  // Load persisted history into memory (dropping points outside the max window).
  // Returns true if any data was loaded.
  function loadGraphHistory() {
    try {
      const raw = localStorage.getItem(GRAPH_STORE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      const cutoff = Date.now() - GRAPH_MAX_MS;
      let any = false;
      GRAPH_KEYS.forEach(k => {
        const arr = Array.isArray(data[k]) ? data[k] : [];
        graphHistory[k] = arr.filter(p => Array.isArray(p) && typeof p[0] === "number" && p[0] >= cutoff);
        if (graphHistory[k].length) any = true;
      });
      return any;
    } catch { return false; }
  }

  // Persist history (throttled). Only the clock view calls this, to keep one
  // canonical timeline and avoid two views clobbering each other.
  function persistGraphHistory() {
    const now = Date.now();
    if (now - graphPersistAt < 2000) return;
    graphPersistAt = now;
    try {
      const out = {};
      GRAPH_KEYS.forEach(k => { out[k] = graphHistory[k]; });
      localStorage.setItem(GRAPH_STORE_KEY, JSON.stringify(out));
    } catch {}
  }

  function recordGraphSamples(values, opts = {}) {
    const now = Date.now();
    GRAPH_KEYS.forEach(k => {
      const v = values[k];
      if (typeof v !== "number" || Number.isNaN(v)) return;
      const arr = graphHistory[k];
      arr.push([now, v]);
      while (arr.length && arr[0][0] < now - GRAPH_MAX_MS) arr.shift();
    });
    if (opts.persist) persistGraphHistory();
    renderGraph();
  }

  // Load any existing history immediately so the first paint already shows it.
  const graphLoadedFromStore = loadGraphHistory();

  // Draw one graph block's series as an SVG polyline (plus an area fill polygon).
  // X is anchored to "now" at the right edge, so the line slides left as time
  // passes. Y auto-scales to the visible data with a minimum span so idle
  // values don't look like wild swings.
  function renderGraphBlock(gkey) {
    const blockEl = document.querySelector(`#app-content [data-block="${gkey}"]`);
    if (!blockEl) return;
    const line = blockEl.querySelector(".graph-line");
    const area = blockEl.querySelector(".graph-area");
    if (!line) return;
    const sensor = LS.get(`${gkey}Sensor`, GRAPH_DEFAULT_SENSOR[gkey] || "cpu");
    const mins = Math.max(1, Math.min(10, +LS.get(`${gkey}Minutes`, 1) || 1));
    const win  = mins * 60 * 1000;
    const now  = Date.now();
    const pts  = (graphHistory[sensor] || []).filter(p => p[0] >= now - win);
    const isLoad = sensor.endsWith("Load");

    // current value caption + temp warning color (temps only)
    const cur = pts.length ? pts[pts.length - 1][1] : null;
    const valEl = blockEl.querySelector(".graph-value");
    if (valEl) valEl.textContent = cur == null ? "--" : `${Math.round(cur)}${isLoad ? "%" : "°"}`;
    const warnOn = LS.get("tempWarnOn", "false") === "true";
    const warnAt = +LS.get("tempWarn", 80) || 80;
    const hot = warnOn && !isLoad && cur != null && cur >= warnAt;
    blockEl.classList.toggle("graph-warn", hot);

    if (pts.length < 2) {
      line.setAttribute("points", "");
      if (area) area.setAttribute("points", "");
      return;
    }
    let lo = Infinity, hi = -Infinity;
    pts.forEach(p => { if (p[1] < lo) lo = p[1]; if (p[1] > hi) hi = p[1]; });
    const minSpan = isLoad ? 10 : 4;
    if (hi - lo < minSpan) { const m = (hi + lo) / 2; lo = m - minSpan / 2; hi = m + minSpan / 2; }
    const H = 30, PAD = 2; // viewBox is 100x30
    const sx = t => ((1 - (now - t) / win) * 100);
    const sy = v => H - PAD - ((v - lo) / (hi - lo)) * (H - PAD * 2);
    const linePts = pts.map(p => `${sx(p[0]).toFixed(2)},${sy(p[1]).toFixed(2)}`).join(" ");
    line.setAttribute("points", linePts);
    if (area) {
      const x0 = sx(pts[0][0]).toFixed(2);
      const x1 = sx(pts[pts.length - 1][0]).toFixed(2);
      area.setAttribute("points", `${x0},${H} ${linePts} ${x1},${H}`);
    }
  }
  function renderGraph() { GRAPH_BLOCKS.forEach(renderGraphBlock); }

  // Browser-only demo: CAM feeds real monitoring data to both the clock and the
  // Configure view, but a plain browser has none — synthesize gently wandering
  // values so the graph can be previewed and styled. Skipped when we already
  // loaded real history from storage (so the preview mirrors the device rather
  // than overwriting it with fake data). Stops the moment real data arrives.
  function startGraphDemoIfIdle() {
    if (isKraken || graphHasRealData || graphDemoTimer || graphLoadedFromStore) return;
    const state = { cpu: 52, gpu: 46, liq: 33, cpuLoad: 28, gpuLoad: 20 };
    const range = { cpu: [38, 78], gpu: [35, 72], liq: [28, 42], cpuLoad: [3, 98], gpuLoad: [3, 98] };
    const step = (s) => {
      GRAPH_KEYS.forEach(k => {
        const [lo, hi] = range[k];
        s[k] = Math.max(lo, Math.min(hi, s[k] + (Math.random() - 0.5) * 2.2));
      });
    };
    // backfill ~10 min of history (every 3s) so the sparkline is populated and
    // looks good immediately in the preview, instead of building up from empty.
    const now = Date.now();
    const back = { ...state };
    const seeded = [];
    for (let t = now - GRAPH_MAX_MS; t <= now; t += 3000) { step(back); seeded.push([t, { ...back }]); }
    seeded.forEach(([t, vals]) => GRAPH_KEYS.forEach(k => graphHistory[k].push([t, vals[k]])));
    Object.assign(state, back);
    renderGraph();
    graphDemoTimer = setInterval(() => { step(state); recordGraphSamples(state); }, 1000);
  }
  setTimeout(startGraphDemoIfIdle, 2500);

  // ---- NZXT monitoring ----
  window.nzxt = window.nzxt || {};
  window.nzxt.v1 = window.nzxt.v1 || {};

  window.nzxt.v1.onMonitoringDataUpdate = (data) => {
    const cpu = data?.cpus?.[0];
    const gpu = data?.gpus?.[0];
    const kraken = data?.kraken;
    const ram = data?.ram;

    // helper: write a value to a sensor cell, or "--" if unavailable.
    // `warnAt` (optional) turns the cell red when raw >= threshold.
    const tempWarn = +LS.get("tempWarn", 80) || 80;
    const warnEnabled = LS.get("tempWarnOn", "false") === "true";
    const put = (key, raw, suffix = "", warnable = false) => {
      const el = $(`#val-${key}`);
      if (!el) return;
      const ok = !(raw === undefined || raw === null || Number.isNaN(raw));
      el.textContent = ok ? `${Math.round(raw)}${suffix}` : "--";
      if (warnable) {
        const hot = warnEnabled && ok && raw >= tempWarn;
        el.classList.toggle("temp-warn", hot);
      }
    };

    // load is reported as a 0..1 fraction; convert to a 0..100 percentage
    const pct = (v) => (typeof v === "number" ? v * 100 : v);

    put("cpu",      cpu?.temperature, "°", true);
    put("gpu",      gpu?.temperature, "°", true);
    put("liq",      kraken?.liquidTemperature, "°", true);
    put("cpuLoad",  pct(cpu?.load), "%");
    put("gpuLoad",  pct(gpu?.load), "%");
    put("cpuFan",   cpu?.fanSpeed);
    put("gpuFan",   gpu?.fanSpeed);

    // RAM: official type exposes totalSize / inUse in MiB only.
    // memGB  -> used amount in GiB (e.g. "12GB")
    // memPct -> used / total as a percentage
    const inUseMiB = ram?.inUse;
    const totalMiB = ram?.totalSize;
    const memGB  = (typeof inUseMiB === "number") ? inUseMiB / 1024 : undefined;
    const memPct = (typeof inUseMiB === "number" && typeof totalMiB === "number" && totalMiB > 0)
      ? (inUseMiB / totalMiB) * 100
      : undefined;

    // memGB needs one decimal, so handle it directly instead of via put()
    const memGBel = $("#val-memGB");
    if (memGBel) {
      memGBel.textContent = (memGB === undefined || Number.isNaN(memGB))
        ? "--"
        : `${memGB.toFixed(1)}GB`;
    }
    put("memPct", memPct, "%");

    // sensor graph: record this tick. On the first real sample, stop the demo;
    // wipe its synthetic points only if we had no real history loaded.
    if (!graphHasRealData) {
      graphHasRealData = true;
      if (graphDemoTimer) {
        clearInterval(graphDemoTimer);
        graphDemoTimer = null;
        if (!graphLoadedFromStore) GRAPH_KEYS.forEach(k => { graphHistory[k] = []; });
      }
    }
    // The always-on clock view is the canonical writer (persist:true). Other
    // views (Configure preview) only mirror via storage events, so they don't
    // persist and overwrite the device's continuous timeline.
    recordGraphSamples({
      cpu: cpu?.temperature,
      gpu: gpu?.temperature,
      liq: kraken?.liquidTemperature,
      cpuLoad: pct(cpu?.load),
      gpuLoad: pct(gpu?.load),
    }, { persist: isKraken });
  };

  // Mirror graph history across views: when the clock view persists new data,
  // every other view (e.g. the Configure preview) reloads and redraws so its
  // sparkline follows the device's continuous timeline instead of resetting.
  window.addEventListener("storage", (e) => {
    if (e.key === GRAPH_STORE_KEY) { loadGraphHistory(); renderGraph(); }
  });
  // Flush the latest history when the clock view is hidden/closed so a reopen
  // (or the Configure preview) picks up the most recent points.
  if (isKraken) {
    const flush = () => { graphPersistAt = 0; persistGraphHistory(); };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", () => { if (document.hidden) flush(); });
  }

  // ---- Init ----
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(toggleColon, 500);
  applySecondMotion();
  startSmoothLoop();

  // Re-fit font sizes when the display area changes size (CAM preview resize,
  // window resize, device variations). applyCustomizations reads the live edge.
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => recalcAndApplyTextScale(), 120);
  });

  // ---- CONFIG UI ----
  const configUI = $("#config-ui");
  if (!isKraken && configUI) {
    configUI.style.display = "flex";

    // The layout tab ships one sensor-graph hub item (data-key="graph"); clone
    // it for graph2/graph3 so all three share identical markup. Remap every id
    // and the data-key/i18n so each clone binds to its own settings. Must run
    // before applyLang() and the per-block binding loop below.
    (function buildGraphHubClones() {
      const tmpl = document.querySelector('.cfg-hub-item[data-key="graph"]');
      const list = $("#layoutReorder");
      if (!tmpl || !list) return;
      const remapId = (id, key, cap) => {
        if (id === "advGraph") return `adv${cap}`;
        if (id === "advDetailGraph") return `advDetail${cap}`;
        if (id.includes("_graph")) return id.replace("_graph", `_${key}`);
        if (id.startsWith("graph")) return key + id.slice("graph".length);
        return id;
      };
      [["graph2","Graph2"],["graph3","Graph3"]].forEach(([key, cap]) => {
        if (document.querySelector(`.cfg-hub-item[data-key="${key}"]`)) return;
        const li = tmpl.cloneNode(true);
        li.dataset.key = key;
        li.querySelectorAll("[id]").forEach(el => { el.id = remapId(el.id, key, cap); });
        const nameEl = li.querySelector(".cfg-hub-name");
        if (nameEl) nameEl.setAttribute("data-i18n", `block.${key}`);
        list.appendChild(li);
      });
    })();

    applyLang();
    applyCustomizations();
    applyWeather();
    recalcAndApplyTextScale();

    // --- Language selector ---
    const langSel = $("#langSelector");
    if (langSel) {
      langSel.value = getLang();
      langSel.addEventListener("change", e => {
        LS.set("uiLang", e.target.value === "en" ? "en" : "ja");
        applyLang();
        // refresh dynamic labels that aren't plain data-i18n text
        updateWeatherLastUpdatedUI();
        renderPresetButtons();
      });
    }

    // --- Tab switching ---
    $$(".cfg-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        $$(".cfg-tab").forEach(t => t.classList.remove("active"));
        $$(".cfg-panel").forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        $(`#tab-${tab.dataset.tab}`)?.classList.add("active");
      });
    });

    // --- Bind helpers ---
    function bindSelect(id, key, onchange) {
      const el = $(`#${id}`);
      if (!el) return;
      el.value = LS.get(key) || el.options[0]?.value;
      el.addEventListener("change", e => {
        LS.set(key, e.target.value);
        onchange?.(e.target.value);
        sync();
      });
    }

    // Segmented button group: <div id><button data-val>...</button></div>
    // Stores the chosen data-val under `key` and marks the active button.
    function bindSegment(id, key, onchange, defVal) {
      const group = $(`#${id}`);
      if (!group) return;
      const btns = Array.from(group.querySelectorAll(".cfg-seg-btn"));
      const current = LS.get(key) || defVal || btns[0]?.dataset.val;
      const mark = (val) => btns.forEach(b => b.classList.toggle("active", b.dataset.val === val));
      mark(current);
      btns.forEach(b => b.addEventListener("click", () => {
        const val = b.dataset.val;
        LS.set(key, val);
        mark(val);
        onchange?.(val);
        sync();
      }));
    }

    // opts.values: [offValue, onValue] saved instead of "false"/"true"
    // opts.defaultOn: if the key is unset, treat as checked
    function bindToggle(id, key, onchange, opts = {}) {
      const el = $(`#${id}`);
      if (!el) return;
      const [offVal, onVal] = opts.values || ["false", "true"];
      const stored = LS.get(key);
      el.checked = stored === null ? !!opts.defaultOn : String(stored) === String(onVal);
      el.addEventListener("change", e => {
        const checked = e.target.checked;
        LS.set(key, checked ? onVal : offVal);
        onchange?.(checked);
        sync();
      });
    }

    function bindColor(id, key, valId) {
      const el = $(`#${id}`), valEl = $(`#${valId}`);
      if (!el) return;
      el.value = LS.get(key) || el.value;
      if (valEl) valEl.textContent = el.value;
      el.addEventListener("input", e => {
        LS.set(key, e.target.value);
        if (valEl) valEl.textContent = e.target.value;
        applyCustomizations();
        sync();
      });
    }

    function bindSlider(id, key, valId, fmt, onchange) {
      const el = $(`#${id}`), valEl = $(`#${valId}`);
      if (!el) return;
      el.value = LS.get(key) || el.value;
      if (valEl) valEl.textContent = fmt(+el.value);
      el.addEventListener("input", e => {
        const v = e.target.value;
        LS.set(key, v);
        if (valEl) valEl.textContent = fmt(+v);
        onchange?.(v);
        sync();
      });
    }

    // ---- Tab: 文字 ----
    bindSelect("dateFormat","dateFormat", () => updateClock());

    // Font selector with a "custom (PC font)" option that reveals a text input.
    const fontSel = $("#fontSelector");
    const customFontRow = $("#customFontRow");
    const customFontHint = $("#customFontHint");
    const customFontInput = $("#customFontInput");
    const PRESET_FONTS = Array.from(fontSel?.options || [])
      .map(o => o.value).filter(v => v !== "__custom__");
    const showCustomFont = (on) => {
      if (customFontRow) customFontRow.style.display = on ? "flex" : "none";
      if (customFontHint) customFontHint.style.display = on ? "block" : "none";
    };
    // initialize: if the saved fontFamily isn't one of the presets, it's custom
    const savedFont = LS.get("fontFamily", PRESET_FONTS[0]);
    const isCustomFont = savedFont && !PRESET_FONTS.includes(savedFont);
    if (fontSel) fontSel.value = isCustomFont ? "__custom__" : savedFont;
    if (customFontInput && isCustomFont) {
      // strip the wrapping quotes for display (stored as: "Name", sans-serif)
      customFontInput.value = savedFont.replace(/^["']|["'],?\s*sans-serif$|["']$/g, "").replace(/, sans-serif$/, "");
    }
    showCustomFont(isCustomFont);

    fontSel?.addEventListener("change", e => {
      if (e.target.value === "__custom__") {
        showCustomFont(true);
        // apply whatever is currently typed (if any)
        const name = (customFontInput?.value || "").trim();
        if (name) LS.set("fontFamily", `'${name}', sans-serif`);
        customFontInput?.focus();
      } else {
        showCustomFont(false);
        LS.set("fontFamily", e.target.value);
      }
      applyCustomizations(); recalcAndApplyTextScale(); sync();
    });
    customFontInput?.addEventListener("input", e => {
      const name = e.target.value.trim();
      // fall back to a generic family so partial typing still renders
      LS.set("fontFamily", name ? `'${name}', sans-serif` : "sans-serif");
      applyCustomizations(); recalcAndApplyTextScale(); sync();
    });

    bindSegment("fontWeightSeg","fontWeight", () => { applyCustomizations(); recalcAndApplyTextScale(); }, "normal");
    bindColor("colorPicker","textColor","colorPickerVal");
    bindSelect("blendMode","blendMode", () => applyCustomizations());
    bindSlider("textScale","textScale","textScaleVal", v=>`${v}%`, v => {
      textScaleState.pct = clampPct(+v);
      // baselines were captured by the last applyCustomizations; just re-scale
      applyTextOnlyScale(textScaleState.pct);
    });
    bindToggle("toggle12Hour","is12Hour", () => updateClock());
    bindToggle("toggleSeconds","showSeconds", v => {
      document.body.classList.toggle("show-seconds", v);
      // recalc so seconds size scales with the rest
      recalcAndApplyTextScale();
    });
    bindSelect("digitAnim","digitAnim", () => {
      // wipe the inner digit structure so the new animation rebuilds cleanly
      ["#hour","#minute","#secValue"].forEach(sel => {
        const el = $(sel);
        if (el) el.textContent = "";
      });
      updateClock();
    });
    bindToggle("textShadowToggle","textShadow", () => { applyCustomizations(); clearTextScaleInline(); applyTextOnlyScale(textScaleState.pct); });

    // text glow / neon
    const glowRow = $("#glowColorRow");
    const refreshGlowRow = () => { if (glowRow) glowRow.style.display = LS.get("textGlow","false")==="true" ? "flex" : "none"; };
    bindToggle("textGlowToggle","textGlow", () => { refreshGlowRow(); applyCustomizations(); });
    // glow color: a checkbox enables a custom glow color (else uses text color)
    const glowUse = $("#glowColorUse");
    const glowPick = $("#glowColor");
    if (glowUse) {
      glowUse.checked = LS.get("glowColorUse")==="true";
      glowUse.addEventListener("change", e => {
        LS.set("glowColorUse", e.target.checked ? "true":"false");
        // when off, clear the custom color so it falls back to text color
        if (!e.target.checked) LS.set("glowColor","");
        else if (glowPick) LS.set("glowColor", glowPick.value);
        applyCustomizations(); sync();
      });
    }
    if (glowPick) {
      glowPick.value = LS.get("glowColor") || glowPick.value;
      glowPick.addEventListener("input", e => {
        LS.set("glowColor", e.target.value);
        if (glowUse) { glowUse.checked = true; LS.set("glowColorUse","true"); }
        applyCustomizations(); sync();
      });
    }
    refreshGlowRow();

    // temperature warning
    const tempRow = $("#tempWarnRow");
    const refreshTempRow = () => { if (tempRow) tempRow.style.display = LS.get("tempWarnOn","false")==="true" ? "flex" : "none"; };
    bindToggle("tempWarnToggle","tempWarnOn", () => { refreshTempRow(); });
    bindSlider("tempWarn","tempWarn","tempWarnVal", v=>`${v}°`, () => {});
    refreshTempRow();
    bindToggle("dotShapeToggle","dotShape",
      checked => {
        applyCustomizations({ dotShape: checked ? "round" : "square" });
        clearTextScaleInline(); applyTextOnlyScale(textScaleState.pct);
      },
      { values: ["square","round"] }
    );
    bindToggle("colonBlink","colonBlink", checked => {
      const c = $("#colon");
      if (c && !checked) c.style.opacity = "1"; // ensure colon visible when blink off
    }, { defaultOn: true });
    // second ring on/off (independent full-overlay ring, in the 全体 tab)
    function refreshRingSettings() {
      const on = LS.get("secondRing") === "true";
      const box = $("#ringSettings");
      if (box) box.style.display = on ? "" : "none";
    }
    bindToggle("secondRingToggle","secondRing", () => {
      applyCustomizations();
      refreshRingSettings();
    });
    refreshRingSettings();
    // ring display style: filled ring vs orbiting dot
    bindSelect("ringStyle","ringStyle", () => {
      applyCustomizations();
      updateSecondProgress();
      refreshRingMotionRow();
    });
    bindSlider("ringWidth","ringWidth","ringWidthVal", v=>`${v}`, () => { applyCustomizations(); updateSecondProgress(); });
    // ring motion + grow (independent of the bar)
    function refreshRingMotionRow() {
      const grow = LS.get("ringGrow") !== "false";
      const dotMode = (LS.get("ringStyle","fill") || "fill") === "dot";
      const row = $("#ringMotionRow");
      // Dot-orbit keeps moving even when full, so motion always applies there.
      // For the filled ring, motion only matters while it's growing.
      if (row) row.style.display = (dotMode || grow) ? "flex" : "none";
    }
    bindToggle("ringGrow","ringGrow", () => {
      refreshRingMotionRow();
      updateSecondProgress();
    }, { defaultOn: true });
    bindSelect("ringMotion","ringMotion", () => {
      applySecondMotion();
      startSmoothLoop();
      updateSecondProgress();
    });
    refreshRingMotionRow();

    // ring color mode (sync / solid / gradient) and its dependent rows
    function refreshRingColorRows() {
      const mode = LS.get("ringColorMode") || "sync";
      const show = (id, on, disp = "flex") => { const r = $(`#${id}`); if (r) r.style.display = on ? disp : "none"; };
      show("ringSolidSection", mode === "solid", "block");
      show("ringGradRows", mode === "gradient", "block");
      const seg = $("#ringColorModeSeg");
      if (seg) seg.querySelectorAll(".cfg-seg-btn").forEach(b => b.classList.toggle("active", b.dataset.val === mode));
    }
    const ringModeSeg = $("#ringColorModeSeg");
    if (ringModeSeg) {
      ringModeSeg.querySelectorAll(".cfg-seg-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          LS.set("ringColorMode", btn.dataset.val);
          refreshRingColorRows();
          applyCustomizations();
        });
      });
    }
    bindColor("ringColorPicker","ringColor","ringColorVal");
    bindSelect("ringBlend","ringBlend", () => applyCustomizations());
    refreshRingColorRows();
    function refreshSecondMotionRow() {
      const grow = LS.get("secondGrow") !== "false";
      const row = $("#secondMotionRow");
      if (row) row.style.display = grow ? "flex" : "none";
    }
    bindToggle("secondGrow","secondGrow", () => {
      refreshSecondMotionRow();
      updateSecondProgress();
    }, { defaultOn: true });
    bindSelect("secondMotion","secondMotion", () => {
      applySecondMotion();
      startSmoothLoop();
      updateSecondProgress();
    });
    refreshSecondMotionRow();

    // second progress color: sync toggle hides/shows the custom picker row
    function refreshSecondColorRow() {
      const synced = LS.get("secondColorSync") !== "false";
      const row = $("#secondColorRow");
      if (row) row.style.display = synced ? "none" : "flex";
    }
    bindToggle("secondColorSync","secondColorSync", () => { applyCustomizations(); refreshSecondColorRow(); }, { defaultOn: true });
    bindColor("secondColorPicker","secondColor","secondColorVal");
    refreshSecondColorRow();

    // ---- Per-block advanced customization (size + top/bottom margin) ----
    // Each layout block has an "詳細設定" toggle that reveals size/margin
    // sliders. Blocks with a size factor: date/clock/weather/sensors/custom.
    // The second bar has margins only.
    const ADV_BLOCKS = [
      { cap: "Date",    key: "date",    size: true  },
      { cap: "Clock",   key: "clock",   size: true  },
      { cap: "Second",  key: "second",  size: false },
      { cap: "Weather", key: "weather", size: true  },
      { cap: "Sensors", key: "sensors", size: true  },
      { cap: "Custom",  key: "custom",  size: true  },
      { cap: "Graph",   key: "graph",   size: false },
      { cap: "Graph2",  key: "graph2",  size: false },
      { cap: "Graph3",  key: "graph3",  size: false },
    ];

    ADV_BLOCKS.forEach(({ cap, key, size }) => {
      // per-block font / weight / color / blend overrides
      const fontSel = $(`#font_${key}`);
      if (fontSel) {
        // inject __custom__ option if not already present
        if (!Array.from(fontSel.options).some(o => o.value === "__custom__")) {
          const opt = document.createElement("option");
          opt.value = "__custom__";
          opt.setAttribute("data-i18n", "opt.customFont");
          opt.textContent = t("opt.customFont");
          fontSel.appendChild(opt);
        }
        // inject inline custom font input row after the font select row (once)
        const fontRow = fontSel.closest(".cfg-row");
        let customRow = fontRow?.nextElementSibling;
        if (customRow && !customRow.classList.contains(`cfg-custom-font-row-${key}`)) customRow = null;
        if (!customRow && fontRow) {
          customRow = document.createElement("div");
          customRow.className = `cfg-row cfg-custom-font-row-${key}`;
          customRow.style.display = "none";
          customRow.innerHTML = `<label class="cfg-label" data-i18n="label.customFont">${t("label.customFont")}</label>`
            + `<input type="text" id="customFont_${key}" class="cfg-input" placeholder="${t("ph.customFont")}" maxlength="60" />`;
          fontRow.insertAdjacentElement("afterend", customRow);
        }
        const customInput = $(`#customFont_${key}`);
        const showCustomRow = (on) => { if (customRow) customRow.style.display = on ? "flex" : "none"; };

        // initialize
        const saved = LS.get(`font_${key}`, "");
        const isCustom = saved === "__custom__";
        fontSel.value = saved || "";
        if (customInput) customInput.value = LS.get(`customFont_${key}`, "");
        showCustomRow(isCustom);

        fontSel.addEventListener("change", e => {
          LS.set(`font_${key}`, e.target.value);
          const custom = e.target.value === "__custom__";
          showCustomRow(custom);
          if (custom) customInput?.focus();
          applyCustomizations(); sync();
        });
        customInput?.addEventListener("input", e => {
          LS.set(`customFont_${key}`, e.target.value.trim());
          applyCustomizations(); sync();
        });
      }
      bindSegment(`weightSeg_${key}`, `weight_${key}`, () => applyCustomizations(), "");
      bindSelect(`blend_${key}`, `blend_${key}`, () => applyCustomizations());
      // color override: a checkbox enables the per-block color picker
      const cUse = $(`#colorUse_${key}`);
      const cPick = $(`#color_${key}`);
      if (cUse) {
        cUse.checked = LS.get(`colorUse_${key}`) === "true";
        cUse.addEventListener("change", e => {
          LS.set(`colorUse_${key}`, e.target.checked ? "true" : "false");
          applyCustomizations(); sync();
        });
      }
      if (cPick) {
        cPick.value = LS.get(`color_${key}`) || cPick.value;
        cPick.addEventListener("input", e => {
          LS.set(`color_${key}`, e.target.value);
          applyCustomizations(); sync();
        });
      }
      // size slider (font multiplier) — only for blocks that have one
      if (size) {
        bindSlider(`size${cap}`, `size${cap}`, `size${cap}Val`, v=>`${v}%`, () => applyCustomizations());
      }
      // second bar: length of the divider track (second block only)
      if (key === "second") {
        bindSlider("barLength", "barLength", "barLengthVal", v=>`${v}%`, () => applyCustomizations());
      }
      // sensor graph: source sensor, time span, value/fill toggles, size sliders
      if (GRAPH_BLOCKS.includes(key)) {
        // seed select defaults if unset so the UI matches what the graph renders
        if (LS.get(`${key}Sensor`) === null) LS.set(`${key}Sensor`, GRAPH_DEFAULT_SENSOR[key] || "cpu");
        if (LS.get(`${key}Minutes`) === null) LS.set(`${key}Minutes`, "1");
        bindSelect(`${key}Sensor`, `${key}Sensor`, () => applyCustomizations());
        bindSelect(`${key}Minutes`, `${key}Minutes`, () => applyCustomizations());
        bindToggle(`${key}ShowValue`, `${key}ShowValue`, () => applyCustomizations(), { defaultOn: true });
        bindToggle(`${key}Fill`, `${key}Fill`, () => applyCustomizations(), { defaultOn: true });
        bindSlider(`${key}Height`, `${key}Height`, `${key}HeightVal`, v=>`${v}px`, () => applyCustomizations());
        bindSlider(`${key}Width`,  `${key}Width`,  `${key}WidthVal`,  v=>`${v}%`,  () => applyCustomizations());
      }
      // top/bottom margin sliders (px)
      bindSlider(`marginTop_${key}`,    `marginTop_${key}`,    `marginTop_${key}Val`,    v=>`${v}px`, () => applyCustomizations());
      bindSlider(`marginBottom_${key}`, `marginBottom_${key}`, `marginBottom_${key}Val`, v=>`${v}px`, () => applyCustomizations());

      // toggle that shows/hides the detail. State persisted as adv<Cap>.
      const toggle = $(`#adv${cap}`);
      const detail = $(`#advDetail${cap}`);
      if (toggle && detail) {
        const on = LS.get(`adv${cap}`) === "true";
        toggle.checked = on;
        detail.classList.toggle("open", on);
        toggle.addEventListener("change", e => {
          const checked = e.target.checked;
          LS.set(`adv${cap}`, checked ? "true" : "false");
          detail.classList.toggle("open", checked);
        });
      }
    });

    // ---- Tab: 背景 ----
    bindColor("bgColorPicker","bgColor","bgColorPickerVal");
    // background gradient
    const gradRows = $("#bgGradRows");
    // background type: solid vs gradient (stored as bgGradOn for compatibility)
    const solidRow = $("#bgSolidSection");
    const bgTypeSeg = $("#bgTypeSeg");
    const refreshBgType = () => {
      const isGrad = LS.get("bgGradOn","false") === "true";
      if (gradRows) gradRows.style.display = isGrad ? "block" : "none";
      if (solidRow) solidRow.style.display = isGrad ? "none" : "block";
      if (bgTypeSeg) bgTypeSeg.querySelectorAll(".cfg-seg-btn").forEach(b =>
        b.classList.toggle("active", b.dataset.val === (isGrad ? "gradient" : "solid")));
    };
    const refreshGradRows = refreshBgType; // alias used elsewhere
    if (bgTypeSeg) {
      bgTypeSeg.querySelectorAll(".cfg-seg-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          LS.set("bgGradOn", btn.dataset.val === "gradient" ? "true" : "false");
          refreshBgType();
          applyCustomizations();
          sync();
        });
      });
    }

    // gradient editor: a preview bar with two handles that open hidden pickers
    const gradBar = $("#bgGradBar");
    const gradHandleA = $("#bgGradHandleA");
    const gradHandleB = $("#bgGradHandleB");
    const gradPickA = $("#bgGradAPicker");
    const gradPickB = $("#bgGradBPicker");
    // Convert stored 0-100 position to a CSS left value that keeps the handle
    // center within the bar (inset by handle radius = 11px on each side).
    const gradLeft = pct => `calc(11px + (100% - 22px) * ${pct} / 100)`;
    const refreshGradBar = () => {
      const a = LS.get("bgGradA", "#3b82f6");
      const b = LS.get("bgGradB", "#a855f7");
      const pA = Math.max(0, Math.min(100, +LS.get("bgGradPosA", 0)));
      const pB = Math.max(0, Math.min(100, +LS.get("bgGradPosB", 100)));
      // preview bar always shown left-to-right (90deg) regardless of angle
      if (gradBar) gradBar.style.background = `linear-gradient(90deg, ${a} ${pA}%, ${b} ${pB}%)`;
      if (gradHandleA) { gradHandleA.style.backgroundColor = a; gradHandleA.style.left = gradLeft(pA); }
      if (gradHandleB) { gradHandleB.style.backgroundColor = b; gradHandleB.style.left = gradLeft(pB); }
      if (gradPickA) gradPickA.value = a;
      if (gradPickB) gradPickB.value = b;
    };
    // initialize picker values from storage
    if (gradPickA) gradPickA.value = LS.get("bgGradA", "#3b82f6");
    if (gradPickB) gradPickB.value = LS.get("bgGradB", "#a855f7");

    // Drag a handle to move its color stop; a click without dragging opens the
    // color picker. We track movement to tell a tap from a drag.
    function setupGradHandle(handle, picker, posKey, barEl = gradBar, refreshFn = refreshGradBar) {
      if (!handle || !barEl) return;
      let dragging = false, moved = false, startX = 0;
      const barRect = () => barEl.getBoundingClientRect();
      const down = (e) => {
        dragging = true; moved = false;
        startX = (e.touches ? e.touches[0] : e).clientX;
        if (e.cancelable) e.preventDefault();
      };
      const move = (e) => {
        if (!dragging) return;
        const x = (e.touches ? e.touches[0] : e).clientX;
        if (Math.abs(x - startX) > 3) moved = true;
        const r = barRect();
        const inset = 11; // handle radius, matches gradLeft()
        let pct = ((x - r.left - inset) / (r.width - inset * 2)) * 100;
        pct = Math.max(0, Math.min(100, Math.round(pct)));
        LS.set(posKey, String(pct));
        refreshFn();
        applyCustomizations();
      };
      const up = () => {
        if (!dragging) return;
        dragging = false;
        if (!moved) picker?.click();  // a tap (no drag) opens the picker
        else sync();
      };
      handle.addEventListener("mousedown", down);
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
      handle.addEventListener("touchstart", down, { passive: false });
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("touchend", up);
    }
    setupGradHandle(gradHandleA, gradPickA, "bgGradPosA");
    setupGradHandle(gradHandleB, gradPickB, "bgGradPosB");
    // picker change -> save + refresh bar + apply
    gradPickA?.addEventListener("input", e => {
      LS.set("bgGradA", e.target.value); refreshGradBar(); applyCustomizations(); sync();
    });
    gradPickB?.addEventListener("input", e => {
      LS.set("bgGradB", e.target.value); refreshGradBar(); applyCustomizations(); sync();
    });
    bindSlider("bgGradAngle","bgGradAngle","bgGradAngleVal", v=>`${v}°`, () => { refreshGradBar(); applyCustomizations(); });
    refreshGradRows();
    refreshGradBar();

    // ring gradient bar editor
    const ringGradBar = $("#ringGradBar");
    const ringGradHandleA = $("#ringGradHandleA");
    const ringGradHandleB = $("#ringGradHandleB");
    const ringGradPickA = $("#ringGradAPicker");
    const ringGradPickB = $("#ringGradBPicker");
    const refreshRingGradBar = () => {
      const a = LS.get("ringGradA", "#3b82f6");
      const b = LS.get("ringGradB", "#a855f7");
      const pA = Math.max(0, Math.min(100, +LS.get("ringGradPosA", 0)));
      const pB = Math.max(0, Math.min(100, +LS.get("ringGradPosB", 100)));
      if (ringGradBar) ringGradBar.style.background = `linear-gradient(90deg, ${a} ${pA}%, ${b} ${pB}%)`;
      if (ringGradHandleA) { ringGradHandleA.style.backgroundColor = a; ringGradHandleA.style.left = gradLeft(pA); }
      if (ringGradHandleB) { ringGradHandleB.style.backgroundColor = b; ringGradHandleB.style.left = gradLeft(pB); }
      if (ringGradPickA) ringGradPickA.value = a;
      if (ringGradPickB) ringGradPickB.value = b;
    };
    if (ringGradPickA) ringGradPickA.value = LS.get("ringGradA", "#3b82f6");
    if (ringGradPickB) ringGradPickB.value = LS.get("ringGradB", "#a855f7");
    setupGradHandle(ringGradHandleA, ringGradPickA, "ringGradPosA", ringGradBar, refreshRingGradBar);
    setupGradHandle(ringGradHandleB, ringGradPickB, "ringGradPosB", ringGradBar, refreshRingGradBar);
    ringGradPickA?.addEventListener("input", e => {
      LS.set("ringGradA", e.target.value); refreshRingGradBar(); applyCustomizations(); sync();
    });
    ringGradPickB?.addEventListener("input", e => {
      LS.set("ringGradB", e.target.value); refreshRingGradBar(); applyCustomizations(); sync();
    });
    bindSlider("ringGradAngle","ringGradAngle","ringGradAngleVal", v=>`${v}°`, () => { refreshRingGradBar(); applyCustomizations(); });
    refreshRingGradBar();

    // --- Ring color / gradient swatches ---
    const RING_SOLID_SWATCHES = [
      "#ffffff","#cccccc","#ff4455","#ff9900","#ffee00",
      "#44ff88","#00eebb","#4499ff","#aa55ff","#ff44cc",
    ];
    const RING_GRAD_SWATCHES = [
      { a:"#3b82f6", b:"#a855f7", angle:135, posA:0, posB:100 },
      { a:"#22d3ee", b:"#3b82f6", angle:135, posA:0, posB:100 },
      { a:"#ec4899", b:"#a855f7", angle:135, posA:0, posB:100 },
      { a:"#22c55e", b:"#22d3ee", angle:135, posA:0, posB:100 },
      { a:"#f97316", b:"#ef4444", angle:135, posA:0, posB:100 },
      { a:"#fbbf24", b:"#ec4899", angle:160, posA:0, posB:100 },
      { a:"#14b8a6", b:"#8b5cf6", angle:135, posA:0, posB:100 },
      { a:"#ffffff", b:"#3b82f6", angle:135, posA:0, posB:100 },
    ];

    function buildSolidSwatches() {
      const wrap = $("#ringSolidSwatches");
      if (!wrap) return;
      wrap.innerHTML = "";
      const current = LS.get("ringColor","#ffffff").toLowerCase();
      RING_SOLID_SWATCHES.forEach(color => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cfg-swatch" + (color === current ? " active" : "");
        btn.style.background = color;
        btn.title = color;
        btn.addEventListener("click", () => {
          LS.set("ringColor", color);
          const picker = $("#ringColorPicker"), valEl = $("#ringColorVal");
          if (picker) picker.value = color;
          if (valEl) valEl.textContent = color;
          wrap.querySelectorAll(".cfg-swatch").forEach(s => s.classList.toggle("active", s.title === color));
          applyCustomizations(); sync();
        });
        wrap.appendChild(btn);
      });
    }

    function buildGradSwatches() {
      const wrap = $("#ringGradSwatches");
      if (!wrap) return;
      wrap.innerHTML = "";
      const curA = LS.get("ringGradA","#3b82f6").toLowerCase();
      const curB = LS.get("ringGradB","#a855f7").toLowerCase();
      RING_GRAD_SWATCHES.forEach((p, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cfg-swatch cfg-swatch--grad"
          + (p.a === curA && p.b === curB ? " active" : "");
        btn.style.background = `linear-gradient(90deg, ${p.a}, ${p.b})`;
        btn.title = `${p.a} → ${p.b}`;
        btn.dataset.idx = i;
        btn.addEventListener("click", () => {
          LS.set("ringGradA", p.a);
          LS.set("ringGradB", p.b);
          LS.set("ringGradAngle", String(p.angle));
          LS.set("ringGradPosA", String(p.posA));
          LS.set("ringGradPosB", String(p.posB));
          refreshRingGradBar();
          // sync angle slider display
          const angleEl = $("#ringGradAngle"), angleVal = $("#ringGradAngleVal");
          if (angleEl) angleEl.value = p.angle;
          if (angleVal) angleVal.textContent = `${p.angle}°`;
          wrap.querySelectorAll(".cfg-swatch").forEach(s => s.classList.toggle("active", +s.dataset.idx === i));
          applyCustomizations(); sync();
        });
        wrap.appendChild(btn);
      });
    }

    buildSolidSwatches();
    buildGradSwatches();

    // --- Background solid / gradient swatches ---
    const BG_SOLID_SWATCHES = [
      "#000000","#111111","#1a1a2e","#0a0020","#05080f",
      "#012a3a","#001100","#3a0d2a","#2a0a18","#020a02",
    ];
    const BG_GRAD_SWATCHES = [
      { a:"#3b82f6", b:"#a855f7", angle:135, posA:0, posB:100 },
      { a:"#22d3ee", b:"#3b82f6", angle:135, posA:0, posB:100 },
      { a:"#ec4899", b:"#a855f7", angle:135, posA:0, posB:100 },
      { a:"#ff6b6b", b:"#7b2ff7", angle:160, posA:0, posB:100 },
      { a:"#ff9ec4", b:"#6a2c5a", angle:135, posA:0, posB:100 },
      { a:"#22c55e", b:"#22d3ee", angle:135, posA:0, posB:100 },
      { a:"#f97316", b:"#ef4444", angle:135, posA:0, posB:100 },
      { a:"#1a1a2e", b:"#16213e", angle:180, posA:0, posB:100 },
    ];

    function buildBgSolidSwatches() {
      const wrap = $("#bgSolidSwatches");
      if (!wrap) return;
      wrap.innerHTML = "";
      const current = LS.get("bgColor","#000000").toLowerCase();
      BG_SOLID_SWATCHES.forEach(color => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cfg-swatch" + (color === current ? " active" : "");
        btn.style.background = color;
        btn.style.border = "1px solid rgba(255,255,255,0.15)";
        btn.title = color;
        btn.addEventListener("click", () => {
          LS.set("bgColor", color);
          const picker = $("#bgColorPicker"), valEl = $("#bgColorPickerVal");
          if (picker) picker.value = color;
          if (valEl) valEl.textContent = color;
          wrap.querySelectorAll(".cfg-swatch").forEach(s => s.classList.toggle("active", s.title === color));
          applyCustomizations(); sync();
        });
        wrap.appendChild(btn);
      });
    }

    function buildBgGradSwatches() {
      const wrap = $("#bgGradSwatches");
      if (!wrap) return;
      wrap.innerHTML = "";
      const curA = LS.get("bgGradA","#3b82f6").toLowerCase();
      const curB = LS.get("bgGradB","#a855f7").toLowerCase();
      BG_GRAD_SWATCHES.forEach((p, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cfg-swatch cfg-swatch--grad"
          + (p.a === curA && p.b === curB ? " active" : "");
        btn.style.background = `linear-gradient(90deg, ${p.a}, ${p.b})`;
        btn.title = `${p.a} → ${p.b}`;
        btn.dataset.idx = i;
        btn.addEventListener("click", () => {
          LS.set("bgGradA", p.a);
          LS.set("bgGradB", p.b);
          LS.set("bgGradAngle", String(p.angle));
          LS.set("bgGradPosA", String(p.posA));
          LS.set("bgGradPosB", String(p.posB));
          refreshGradBar();
          const angleEl = $("#bgGradAngle"), angleVal = $("#bgGradAngleVal");
          if (angleEl) angleEl.value = p.angle;
          if (angleVal) angleVal.textContent = `${p.angle}°`;
          wrap.querySelectorAll(".cfg-swatch").forEach(s => s.classList.toggle("active", +s.dataset.idx === i));
          applyCustomizations(); sync();
        });
        wrap.appendChild(btn);
      });
    }

    buildBgSolidSwatches();
    buildBgGradSwatches();

    bindSlider("bgOpacity","bgOpacity","bgOpacityVal", v=>`${v}%`, () => applyCustomizations());
    bindSlider("bgBlur","bgBlur","bgBlurVal", v=>`${v}px`, () => applyCustomizations());

    // ---- Background image: local file only, with a 5-slot history ----
    const BG_HISTORY_MAX = 5;
    const BG_MAX_EDGE = 640; // downscale longest edge to this many px

    // history is an array of data URLs, stored in IndexedDB under "history".
    async function getBgHistory() {
      const arr = await idbGet("history");
      return Array.isArray(arr) ? arr.filter(s => typeof s === "string" && s) : [];
    }
    async function saveBgHistory(arr) {
      await idbSet("history", arr.slice(0, BG_HISTORY_MAX));
    }
    // add a data URL to the front of history (de-duped), FIFO-capped at 5
    async function pushBgHistory(dataUrl) {
      let arr = (await getBgHistory()).filter(u => u !== dataUrl);
      arr.unshift(dataUrl);
      arr = arr.slice(0, BG_HISTORY_MAX);
      await saveBgHistory(arr);
      await renderBgHistory();
    }

    // ---- Square crop modal (drag to pan, slider/wheel to zoom) ----
    // Opens with a source image, lets the user position a square crop, then
    // resolves with a square JPEG data URL (or null if cancelled).
    function openCropModal(srcDataUrl, opts = {}) {
      const gifMode = !!opts.gifMode;
      return new Promise((resolve) => {
        const modal = $("#cropModal");
        const vp    = $("#cropViewport");
        const imgEl = $("#cropImg");
        const zoom  = $("#cropZoom");
        if (!modal || !vp || !imgEl || !zoom) { resolve(null); return; }

        const VP = 280; // viewport size in CSS px (matches .crop-viewport)
        let natW = 0, natH = 0;
        let baseScale = 1;
        let scale = 1;
        let tx = 0, ty = 0;

        const clampPan = () => {
          const w = natW * scale, h = natH * scale;
          tx = Math.min(0, Math.max(VP - w, tx));
          ty = Math.min(0, Math.max(VP - h, ty));
        };
        const render = () => {
          clampPan();
          imgEl.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
        };

        const onLoad = () => {
          natW = imgEl.naturalWidth;
          natH = imgEl.naturalHeight;
          baseScale = VP / Math.min(natW, natH); // cover the square
          zoom.value = 100;
          scale = baseScale;
          tx = (VP - natW * scale) / 2;
          ty = (VP - natH * scale) / 2;
          render();
        };

        imgEl.onload = onLoad;
        imgEl.style.transformOrigin = "0 0";
        imgEl.src = srcDataUrl;
        modal.style.display = "flex";

        const onZoom = () => {
          const z = (+zoom.value) / 100;
          const newScale = baseScale * z;
          const cx = VP / 2, cy = VP / 2;
          const ix = (cx - tx) / scale;
          const iy = (cy - ty) / scale;
          scale = newScale;
          tx = cx - ix * scale;
          ty = cy - iy * scale;
          render();
        };
        zoom.oninput = onZoom;

        let dragging = false, lastX = 0, lastY = 0;
        const down = (e) => {
          dragging = true;
          const p = e.touches ? e.touches[0] : e;
          lastX = p.clientX; lastY = p.clientY;
        };
        const move = (e) => {
          if (!dragging) return;
          const p = e.touches ? e.touches[0] : e;
          tx += p.clientX - lastX;
          ty += p.clientY - lastY;
          lastX = p.clientX; lastY = p.clientY;
          render();
          if (e.cancelable) e.preventDefault();
        };
        const up = () => { dragging = false; };
        vp.addEventListener("mousedown", down);
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
        vp.addEventListener("touchstart", down, { passive: true });
        window.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("touchend", up);
        const wheel = (e) => {
          e.preventDefault();
          const step = e.deltaY < 0 ? 8 : -8;
          zoom.value = Math.max(100, Math.min(300, (+zoom.value) + step));
          onZoom();
        };
        vp.addEventListener("wheel", wheel, { passive: false });

        const cleanup = () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseup", up);
          window.removeEventListener("touchmove", move);
          window.removeEventListener("touchend", up);
          vp.removeEventListener("mousedown", down);
          vp.removeEventListener("touchstart", down);
          vp.removeEventListener("wheel", wheel);
          modal.style.display = "none";
          imgEl.src = "";
        };

        $("#cropCancel").onclick = () => { cleanup(); resolve(null); };
        $("#cropApply").onclick = () => {
          if (gifMode) {
            // Don't touch pixels (keep the animation). Convert the current
            // pan/zoom into CSS background-size + background-position so the
            // same framing is reproduced on a square panel.
            // zoom: the slider value (100..300) maps directly to background-size%
            //   because background-size:cover == our baseScale (image covers VP).
            const zoomPct = Math.round((scale / baseScale) * 100);
            // background-position math: pos% P means image point P aligns with
            // container point P. With scale s and pan t (px), the image point at
            // container 0 is (-t/s). Over the "free" range the position fraction
            // is (-t) / (imgSize - VP). Guard against divide-by-zero.
            const imgW = natW * scale, imgH = natH * scale;
            const fx = imgW > VP ? (-tx) / (imgW - VP) : 0.5;
            const fy = imgH > VP ? (-ty) / (imgH - VP) : 0.5;
            const posX = Math.round(Math.max(0, Math.min(1, fx)) * 100);
            const posY = Math.round(Math.max(0, Math.min(1, fy)) * 100);
            cleanup();
            resolve({ gif: true, posX, posY, zoom: zoomPct, aspect: natW / natH });
            return;
          }
          // static image: render the visible square region to a canvas
          const out = Math.min(BG_MAX_EDGE, 640);
          const cv = document.createElement("canvas");
          cv.width = out; cv.height = out;
          const ctx = cv.getContext("2d");
          const sx = (-tx) / scale;
          const sy = (-ty) / scale;
          const sSize = VP / scale;
          ctx.drawImage(imgEl, sx, sy, sSize, sSize, 0, 0, out, out);
          const dataUrl = cv.toDataURL("image/jpeg", 0.85);
          cleanup();
          resolve({ gif: false, dataUrl });
        };
      });
    }

    // downscale an image File to a JPEG data URL (longest edge BG_MAX_EDGE)
    function fileToScaledDataURL(file) {
      return new Promise((resolve, reject) => {
        const rd = new FileReader();
        rd.onerror = () => reject(new Error("read failed"));
        rd.onload = () => {
          // GIFs: keep the original data URL so the animation is preserved
          // (canvas would flatten it to a single still frame). Stored in
          // IndexedDB so even large GIFs don't hit the localStorage quota.
          if (file.type === "image/gif") { resolve(rd.result); return; }
          const img = new Image();
          img.onerror = () => reject(new Error("decode failed"));
          img.onload = () => {
            const { width: w, height: h } = img;
            const scale = Math.min(1, BG_MAX_EDGE / Math.max(w, h));
            const cw = Math.max(1, Math.round(w * scale));
            const ch = Math.max(1, Math.round(h * scale));
            const cv = document.createElement("canvas");
            cv.width = cw; cv.height = ch;
            const ctx = cv.getContext("2d");
            ctx.drawImage(img, 0, 0, cw, ch);
            // JPEG keeps size small; quality 0.85 is plenty for a 640px panel
            resolve(cv.toDataURL("image/jpeg", 0.85));
          };
          img.src = rd.result;
        };
        rd.readAsDataURL(file);
      });
    }

    // set a data URL as the current background (stored in IndexedDB), reveal
    // it via opacity, update the in-memory cache, repaint, and notify Kraken.
    async function applyBgImage(dataUrl) {
      // snapshot current image onto the prev layer for crossfade
      const bgEl  = $("#background-image");
      const prevEl = $("#background-image-prev");
      if (bgEl && prevEl) {
        prevEl.style.backgroundImage    = bgEl.style.backgroundImage;
        prevEl.style.backgroundSize     = bgEl.style.backgroundSize;
        prevEl.style.backgroundPosition = bgEl.style.backgroundPosition;
        bgEl.style.transition = "none";
        bgEl.style.opacity = "0";
      }

      await idbSet("current", dataUrl);
      bgImageCache = dataUrl || "";
      if (LS.get("bgOpacity","100") === "100") {
        LS.set("bgOpacity","0");
        const op = $("#bgOpacity"); if (op) { op.value = "0"; $("#bgOpacityVal").textContent = "0%"; }
      }
      applyCustomizations();
      bumpBgRev();   // tell the Kraken view to re-read the image
      sync();
      await renderBgHistory();

      // fade in the new background
      if (bgEl) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          bgEl.style.transition = "";
          bgEl.style.opacity = "1";
        }));
      }
    }

    // render the history thumbnails
    async function renderBgHistory() {
      const wrap = $("#bgHistory");
      const empty = $("#bgHistoryEmpty");
      if (!wrap) return;
      const arr = await getBgHistory();
      const current = bgImageCache;
      wrap.innerHTML = "";
      if (empty) empty.style.display = arr.length ? "none" : "block";
      arr.forEach(url => {
        const thumb = document.createElement("div");
        thumb.className = "cfg-bg-thumb" + (url === current ? " active" : "");
        thumb.style.backgroundImage = `url('${url}')`;
        thumb.addEventListener("click", async () => {
          await applyBgImage(url);
          showToast(t("toast.bgSet"));
        });
        const del = document.createElement("div");
        del.className = "cfg-bg-thumb-del";
        del.textContent = "×";
        del.addEventListener("click", async (ev) => {
          ev.stopPropagation();
          await saveBgHistory((await getBgHistory()).filter(u => u !== url));
          await renderBgHistory();
        });
        thumb.appendChild(del);
        wrap.appendChild(thumb);
      });
    }

    const bgImageFile = $("#bgImageFile");
    if (bgImageFile) {
      bgImageFile.addEventListener("change", async e => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
          const isGif = file.type === "image/gif";
          // Read the original file as a data URL.
          const rawUrl = await new Promise((res, rej) => {
            const rd = new FileReader();
            rd.onerror = () => rej(new Error("read failed"));
            rd.onload = () => res(rd.result);
            rd.readAsDataURL(file);
          });
          // For static images we crop pixels; for GIFs we keep the data and
          // only record framing (so the animation is preserved).
          const result = await openCropModal(rawUrl, { gifMode: isGif });
          if (!result) { e.target.value = ""; return; } // cancelled

          const nameEl = $("#bgFileNameDisplay");
          if (nameEl) nameEl.textContent = file.name;

          if (result.gif) {
            // store the original GIF data + framing params
            LS.set("bgPosX", result.posX);
            LS.set("bgPosY", result.posY);
            LS.set("bgZoom", result.zoom);
            LS.set("bgAspect", result.aspect);
            await applyBgImage(rawUrl);
            await pushBgHistory(rawUrl);
          } else {
            // pre-cropped square: reset framing to defaults
            LS.set("bgPosX", 50);
            LS.set("bgPosY", 50);
            LS.set("bgZoom", 100);
            await applyBgImage(result.dataUrl);
            await pushBgHistory(result.dataUrl);
          }
          showToast(t("toast.bgSet"));
        } catch (err) {
          showToast(t("toast.bgFail"));
        }
        // reset the input so re-selecting the same file fires change again
        e.target.value = "";
      });
    }

    $("#clearBgImage")?.addEventListener("click", async () => {
      await idbDel("current");
      bgImageCache = "";
      if (bgImageFile) bgImageFile.value = "";
      const nameEl = $("#bgFileNameDisplay");
      if (nameEl) nameEl.textContent = t("file.choose");
      LS.set("bgOpacity","100");
      const bgOpEl = $("#bgOpacity");
      if (bgOpEl) { bgOpEl.value="100"; $("#bgOpacityVal").textContent="100%"; }
      applyCustomizations();
      bumpBgRev();
      sync();
      await renderBgHistory();
      showToast(t("toast.bgRemoved"));
    });

    // initial load: pull the current image from IndexedDB, then paint history
    refreshBgImageCache().then(renderBgHistory);

    // ---- Weather ----
    const weatherCityEl = $("#weatherCity");
    if (weatherCityEl) weatherCityEl.value = LS.get("weatherCity","Tokyo");

    const weatherUnitEl = $("#weatherUnit");
    if (weatherUnitEl) {
      weatherUnitEl.value = LS.get("weatherUnit","metric");
      weatherUnitEl.addEventListener("change", e => {
        const unit = e.target.value;
        LS.set("weatherUnit", unit);
        const city = weatherCityEl?.value.trim() || LS.get("weatherCity","Tokyo");
        // re-fetch immediately so the displayed value switches at once
        fetchWeather(city, unit);
      });
    }

    $("#fetchWeatherBtn")?.addEventListener("click", () => {
      const city = weatherCityEl?.value.trim() || "Tokyo";
      const unit = weatherUnitEl?.value || "metric";
      LS.set("weatherCity", city);
      LS.set("weatherUnit", unit);
      fetchWeather(city, unit);
    });

    // show the last-updated time and keep it ticking
    updateWeatherLastUpdatedUI();
    startWeatherAutoUpdate();

    // Custom text
    const customTextInput = $("#customTextInput");
    if (customTextInput) {
      customTextInput.value = LS.get("customText","Custom Text");
      customTextInput.addEventListener("input", e => {
        LS.set("customText", e.target.value);
        applyCustomizations();
        recalcAndApplyTextScale();
        sync();
      });
    }

    // ---- Layout reorder (drag & drop) ----
    // Layout: two-zone drag (visible <-> hidden) with reorder
    setupLayoutZones();
    // Sensors: horizontal two-zone drag (visible <-> hidden)
    setupSensorZones();

    // hub accordion: tap a layout item to reveal its settings
    setupHubAccordion();

    // preview model (square / circle) — affects only the config preview frame
    const previewModelEl = $("#previewModel");
    if (previewModelEl) {
      previewModelEl.value = LS.get("previewModel", "circle");
      previewModelEl.addEventListener("change", e => {
        LS.set("previewModel", e.target.value);
        document.body.classList.toggle("preview-square", e.target.value !== "circle");
        // re-fit fonts to the new frame size. Double rAF so the layout from the
        // class change is fully settled before #app-content is measured.
        requestAnimationFrame(() => requestAnimationFrame(() => applyCustomizations()));
        sync();
      });
    }

    // Background overlay FX
    const bgOverlayEl = $("#bgOverlay");
    const overlayIntensityRow = $("#overlayIntensityRow");
    const refreshOverlayRow = () => {
      const fx = LS.get("bgOverlay","none") || "none";
      if (overlayIntensityRow) overlayIntensityRow.style.display = (fx === "none") ? "none" : "flex";
    };
    if (bgOverlayEl) {
      bgOverlayEl.value = LS.get("bgOverlay","none");
      bgOverlayEl.addEventListener("change", e => {
        LS.set("bgOverlay", e.target.value);
        refreshOverlayRow();
        applyCustomizations();
        sync();
      });
    }
    bindSlider("overlayIntensity","overlayIntensity","overlayIntensityVal", v=>`${v}%`, () => applyCustomizations());
    refreshOverlayRow();

    // Reset
    $("#resetSettings")?.addEventListener("click", async () => {
      if (!await confirmDialog(t("confirm.reset"), { danger: true })) return;
      const keepLang = getLang(); // language is a UI preference, keep it
      localStorage.clear();
      // also clear the background image + history stored in IndexedDB
      await idbDel("current");
      await idbDel("history");
      bgImageCache = "";
      Object.entries(DEFAULT_SETTINGS).forEach(([k,v]) => LS.set(k,v));
      LS.set("uiLang", keepLang);
      LS.set("__refresh__", Date.now());
      location.reload();
    });

    // ---- Export settings to a JSON file ----
    async function exportSettings() {
      const settings = {};
      ALL_SETTING_KEYS.forEach(k => {
        const v = localStorage.getItem(k);
        if (v !== null) settings[k] = v;
      });
      const payload = {
        app: "meteor-simple-clock",
        version: 1,
        exportedAt: new Date().toISOString(),
        settings,
        backgroundImage: bgImageCache || "",
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");
      a.href = url;
      a.download = `meteor-clock-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast(t("toast.exported"));
    }

    // ---- Import settings from a JSON file ----
    async function importSettings(file) {
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (!data || data.app !== "meteor-simple-clock" || !data.settings) {
          showToast(t("toast.importBad"));
          return;
        }
        const keepLang = getLang();
        // only write known keys (ignore anything unexpected)
        ALL_SETTING_KEYS.forEach(k => {
          if (data.settings[k] !== undefined) LS.set(k, data.settings[k]);
        });
        LS.set("uiLang", keepLang);
        // restore background image and add to history
        if (data.backgroundImage) {
          await idbSet("current", data.backgroundImage);
          bgImageCache = data.backgroundImage;
          await pushBgHistory(data.backgroundImage);
        } else {
          await idbDel("current");
          bgImageCache = "";
        }
        // sync UI controls and re-apply without reloading
        syncUIFromLS();
        placeLayoutItems();
        applyLayoutOrder();
        applyBlockVisibility();
        applyCustomizations();
        applyWeather();
        recalcAndApplyTextScale();
        await renderBgHistory();
        sync();
        showToast(t("toast.imported"));
      } catch (e) {
        showToast(t("toast.importBad"));
      }
    }

    // ---- Apply a built-in preset ----
    // Sync every bound UI element to the current localStorage values.
    // Called after applyPreset so the controls reflect the new settings
    // without a page reload (and without losing the current tab state).
    function syncUIFromLS() {
      // select elements (id === storage key, except fontSelector handled below)
      $$("select[id]").forEach(el => {
        if (el.id === "fontSelector") return;
        const key = el.id;
        const v = localStorage.getItem(key);
        if (v !== null) el.value = v;
      });
      // font selector: maps fontFamily, with a custom-font fallback
      const fSel = $("#fontSelector");
      if (fSel) {
        const presets = Array.from(fSel.options).map(o => o.value).filter(v => v !== "__custom__");
        const fv = LS.get("fontFamily", presets[0]);
        const custom = fv && !presets.includes(fv);
        fSel.value = custom ? "__custom__" : fv;
        const cRow = $("#customFontRow"), cHint = $("#customFontHint"), cIn = $("#customFontInput");
        if (cRow) cRow.style.display = custom ? "flex" : "none";
        if (cHint) cHint.style.display = custom ? "block" : "none";
        if (cIn && custom) cIn.value = fv.replace(/^['"]/, "").replace(/['"],?\s*sans-serif$/, "").replace(/['"]$/, "");
      }
      // per-block custom font selectors: restore __custom__ + show/hide input row
      ["date","clock","second","weather","sensors","custom","graph","graph2","graph3"].forEach(key => {
        const sel = $(`#font_${key}`);
        if (!sel) return;
        const saved = LS.get(`font_${key}`, "");
        sel.value = saved || "";
        const customRow = document.querySelector(`.cfg-custom-font-row-${key}`);
        const customInput = $(`#customFont_${key}`);
        const isCustom = saved === "__custom__";
        if (customRow) customRow.style.display = isCustom ? "flex" : "none";
        if (customInput) customInput.value = LS.get(`customFont_${key}`, "");
      });
      // slider elements (input[type=range])
      $$("input[type=range][id]").forEach(el => {
        const key = el.id;
        const v = localStorage.getItem(key);
        if (v !== null) {
          el.value = v;
          // update sibling value display (element with id = key + "Val")
          const valEl = $(`#${key}Val`);
          if (valEl) {
            // re-use the existing text format: append the existing unit suffix
            const unit = valEl.textContent.replace(/[\d.]+/, "").trim();
            valEl.textContent = v + unit;
          }
        }
      });
      // color pickers
      // color pickers: map id -> storage key (they often differ)
      const colorKeyById = {
        colorPicker:"textColor", bgColorPicker:"bgColor",
        ringColorPicker:"ringColor", ringGradAPicker:"ringGradA", ringGradBPicker:"ringGradB",
        bgGradAPicker:"bgGradA", bgGradBPicker:"bgGradB",
        glowColor:"glowColor", secondColorPicker:"secondColor",
      };
      $$("input[type=color][id]").forEach(el => {
        const key = colorKeyById[el.id] || el.id;
        const v = localStorage.getItem(key);
        if (v) el.value = v;
      });
      // checkboxes / toggles. Some toggles have an id that differs from their
      // storage key (e.g. #textGlowToggle -> "textGlow"), so map them explicitly.
      const toggleKeyById = {
        toggle12Hour:"is12Hour", toggleSeconds:"showSeconds",
        textShadowToggle:"textShadow", textGlowToggle:"textGlow",
        tempWarnToggle:"tempWarnOn", secondRingToggle:"secondRing",
        ringGrow:"ringGrow", secondGrow:"secondGrow",
        secondColorSync:"secondColorSync",
        glowColorUse:"glowColorUse",
      };
      $$("input[type=checkbox][id]").forEach(el => {
        // dotShapeToggle stores a string value, not a boolean — skip here
        if (el.id === "dotShapeToggle") return;
        const key = toggleKeyById[el.id] || el.id;
        const v = localStorage.getItem(key);
        if (v !== null) el.checked = (v === "true" || v === "1");
      });
      // dot shape toggle (round vs square)
      const dotToggle = $("#dotShapeToggle");
      if (dotToggle) dotToggle.checked = LS.get("dotShape","square") === "round";
      // segmented button groups
      $$(".cfg-segment[id]").forEach(group => {
        const key = group.id.replace(/Seg$/, "").replace(/^weightSeg_/, "weight_");
        const realKey = group.id.includes("Seg_")
          ? group.id.replace("Seg_", "_").replace(/^weight/, "weight")
          : key;
        const v = localStorage.getItem(realKey) || localStorage.getItem(group.id);
        if (v !== null) {
          group.querySelectorAll(".cfg-seg-btn").forEach(b =>
            b.classList.toggle("active", b.dataset.val === v));
        }
      });
      // color picker val displays that use a separate span
      [["colorPicker","colorPickerVal","textColor"],
       ["bgColorPicker","bgColorPickerVal","bgColor"],
       ["glowColor","glowColorVal","glowColor"]].forEach(([pid, vid, key]) => {
        const v = localStorage.getItem(key);
        const valEl = $(`#${vid}`);
        if (v && valEl) valEl.textContent = v;
      });
      // conditional rows whose visibility depends on a toggle
      const showRow = (id, on, mode = "flex") => {
        const el = $(`#${id}`);
        if (el) el.style.display = on ? mode : "none";
      };
      const bgIsGrad = LS.get("bgGradOn","false")==="true";
      showRow("bgGradRows", bgIsGrad, "block");
      showRow("bgSolidSection", !bgIsGrad, "block");
      const bgTypeSegEl = $("#bgTypeSeg");
      if (bgTypeSegEl) bgTypeSegEl.querySelectorAll(".cfg-seg-btn").forEach(b =>
        b.classList.toggle("active", b.dataset.val === (bgIsGrad ? "gradient" : "solid")));
      showRow("glowColorRow", LS.get("textGlow","false")==="true");
      showRow("tempWarnRow", LS.get("tempWarnOn","false")==="true");
      showRow("overlayIntensityRow", (LS.get("bgOverlay","none")||"none") !== "none");
      // refresh the gradient preview bar + handles
      const gBar = $("#bgGradBar");
      const gA = LS.get("bgGradA","#3b82f6"), gB = LS.get("bgGradB","#a855f7");
      const gpA = Math.max(0, Math.min(100, +LS.get("bgGradPosA", 0)));
      const gpB = Math.max(0, Math.min(100, +LS.get("bgGradPosB", 100)));
      const gLeft = pct => `calc(11px + (100% - 22px) * ${pct} / 100)`;
      if (gBar) gBar.style.background = `linear-gradient(90deg, ${gA} ${gpA}%, ${gB} ${gpB}%)`;
      const hA = $("#bgGradHandleA"), hB = $("#bgGradHandleB");
      if (hA) { hA.style.backgroundColor = gA; hA.style.left = gLeft(gpA); }
      if (hB) { hB.style.backgroundColor = gB; hB.style.left = gLeft(gpB); }
      // ring gradient bar
      const rBar = $("#ringGradBar");
      if (rBar) {
        const rA = LS.get("ringGradA","#3b82f6"), rB = LS.get("ringGradB","#a855f7");
        const rpA = Math.max(0, Math.min(100, +LS.get("ringGradPosA", 0)));
        const rpB = Math.max(0, Math.min(100, +LS.get("ringGradPosB", 100)));
        rBar.style.background = `linear-gradient(90deg, ${rA} ${rpA}%, ${rB} ${rpB}%)`;
        const rhA = $("#ringGradHandleA"), rhB = $("#ringGradHandleB");
        if (rhA) { rhA.style.backgroundColor = rA; rhA.style.left = gLeft(rpA); }
        if (rhB) { rhB.style.backgroundColor = rB; rhB.style.left = gLeft(rpB); }
      }
      // ring color mode rows
      const ringMode = LS.get("ringColorMode","sync");
      showRow("ringSolidSection", ringMode === "solid", "block");
      showRow("ringGradRows", ringMode === "gradient", "block");
      // rebuild swatches to reflect current active state
      if (typeof buildSolidSwatches === "function") buildSolidSwatches();
      if (typeof buildGradSwatches === "function") buildGradSwatches();
      if (typeof buildBgSolidSwatches === "function") buildBgSolidSwatches();
      if (typeof buildBgGradSwatches === "function") buildBgGradSwatches();
    }

    async function applyPreset(name) {
      const preset = PRESETS[name];
      if (!preset) return;
      // start from defaults so the look is consistent, then layer the preset
      Object.entries(DEFAULT_SETTINGS).forEach(([k,v]) => LS.set(k,v));
      Object.entries(preset.settings).forEach(([k,v]) => LS.set(k,v));
      // presets don't carry a background image; clear any existing one
      await idbDel("current");
      bgImageCache = "";
      // sync UI controls to the new values (no page reload)
      syncUIFromLS();
      // move layout blocks into the correct visible/hidden zones in the UI
      placeLayoutItems();
      // re-apply clock, layout, weather
      applyLayoutOrder();
      applyBlockVisibility();
      applyCustomizations();
      applyWeather();
      recalcAndApplyTextScale();
      await renderBgHistory();
      sync();
    }

    $("#exportBtn")?.addEventListener("click", exportSettings);
    $("#importBtn")?.addEventListener("click", () => $("#importFile")?.click());
    $("#importFile")?.addEventListener("change", e => {
      const f = e.target.files?.[0];
      if (f) importSettings(f);
      e.target.value = "";
    });
    // preset buttons: built dynamically so each shows its theme colors/font
    function renderPresetButtons() {
      const presetGrid = $("#presetGrid");
      if (!presetGrid) return;
      presetGrid.innerHTML = "";
      const lang = getLang();
      Object.entries(PRESETS).forEach(([name, preset]) => {
        const sw = preset.swatch || {};
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cfg-btn cfg-preset-btn";
        btn.setAttribute("data-preset", name);
        btn.style.background = sw.bg || "";
        btn.style.color = sw.fg || "";
        btn.style.borderColor = sw.accent || "";
        btn.style.fontFamily = sw.font || "";
        const dot = document.createElement("span");
        dot.className = "cfg-preset-dot";
        dot.style.background = sw.accent || sw.fg || "#fff";
        const label = document.createElement("span");
        label.textContent = preset.label?.en || name;
        btn.appendChild(dot);
        btn.appendChild(label);
        btn.addEventListener("click", async () => {
          if (await confirmDialog(t("confirm.preset"))) applyPreset(name);
        });
        presetGrid.appendChild(btn);
      });
    }
    renderPresetButtons();
  }

  // ---- Kraken mode ----
  if (isKraken) {
    if (configUI) configUI.style.display = "none";
    textScaleState.pct = clampPct(parseInt(LS.get("textScale","100"),10));
    applyCustomizations();
    applyWeather();
    recalcAndApplyTextScale();
    updateClock();
    applySecondMotion();
    startSmoothLoop();
    startWeatherAutoUpdate();
    // load the background image from IndexedDB (repaints when ready)
    refreshBgImageCache();

    window.addEventListener("storage", (e) => {
      textScaleState.pct = clampPct(parseInt(LS.get("textScale","100"),10));
      applyCustomizations();
      applyWeather();
      recalcAndApplyTextScale();
      updateClock();
      applySecondMotion();
      startSmoothLoop();
      // when the image-change stamp flips, re-read the image from IndexedDB
      if (!e || e.key === "bgRev" || e.key === "__refresh__") refreshBgImageCache();
    });
  }
});
