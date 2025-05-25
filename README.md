# Kraken Custom Web Integration UI

NZXT Kraken Elite 用に作成した、カスタム時計＆モニタリングUIです。  
NZXT CAM の Web Integration 機能を使って、自由な表示が可能です。

※他Krakenシリーズは仮対応です。

## 🔧

## 🔧 機能一覧

- デジタル時計（時・分、点滅するコロン）
- 日付表示（例：5/24 Fri）
- CPU / GPU / 冷却水温のリアルタイム表示
- 背景画像・背景色の切り替え（透過・ぼかし対応）
- フォント切り替え　計6種
- 秒数に連動するシークバー（秒針）
- 文字色のカスタマイズ
- テキストシャドウ（ON/OFF）
- 各種設定を保存・即時反映
- 設定初期化ボタンつき

## 🌐 GitHub Pages

CAMのWeb Integrationに以下URLを登録することで、Kraken上に表示できます：
https://meteor-oo0.github.io/Meteor-Simple-Clock/

## 💻 使用方法

1. CAMの設定から「Web Integration」を有効化
2. 上記URLをCAMに登録
3. 表示が反映されます
4. CAM上で表示を右クリック → `Configure` からカスタマイズできます

### 🚀 CAMにすぐ適用したい方へ！

👉 [ここをクリックしてCAMに読み込む](https://cam-redirect.nzxt.com/action/load-web-integration?url=https://meteor-oo0.github.io/Meteor-Simple-Clock/)

## 📷 スクリーンショット

### 🎛️ 設定画面（CAM 上）

![設定画面プレビュー](img/preview.jpg)

### 🧊 Kraken Elite 実機での表示例

![Kraken表示例](img/kraken-image.jpg)


## 🧠 開発サポート

このプロジェクトは [ChatGPT (OpenAI)] (https://chat.openai.com) を活用して開発しました。  
UI設計、JavaScript構築、エラー修正、GitHub公開設定まで幅広く支援を受けています。

## 📘 更新履歴 / Changelog
### v1.1.0 – 解像度対応 & 新フォント追加（2025-05-25）
- Kraken の解像度（240×240 / 320×320）に応じて 自動調整
- フォントに Orbitron, Roboto を追加
- 「背景画像を削除」ボタンを追加（背景設定時のみ表示）
- 背景画像を設定すると背景透明度が自動的に100%へリセットされる仕様を追加
- 「設定をリセット」時に確認ダイアログを表示

### v1.0.0 – 初回リリース（2025-05-24）

## 📜 ライセンス

MIT License（自由に改変・再配布可）

## 🔗 SNS & Contact

[![X (Twitter)](https://img.shields.io/badge/X-%23000000.svg?style=for-the-badge&logo=X&logoColor=white)](https://x.com/MeteoR_oo0)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@MeteoR_oo0)
