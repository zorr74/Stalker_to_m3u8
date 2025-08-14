# 🎯 Stalker Portal IPTV Toolkit

Two Cloudflare Worker scripts for working with **Stalker Portal IPTV servers**.

---

## 📜 Overview

This repository contains:

1. **Stalker-Portal Playlist Live Generator**  
   ➡ Generates a full `.m3u8` auto updated playlist from your Stalker Portal account (including metadata, info channels, and stream links).

2. **Stalker-Portal Stream Link Extractor**  
   ➡ Extracts a direct `.m3u8` stream link for a given channel ID.

These scripts **run entirely on Cloudflare Workers** (no hosting server required), are free to deploy, and allow you to generate playlists or stream links **directly in the browser**.

---

## 📂 Files

| File Name                | Description |
|--------------------------|-------------|
| `auto-updated-playlist-generator.js`  | Generates `.m3u8` playlist from a Stalker Portal. |
| `stream-link-extractor.js` | Gets the direct stream link for a specific channel ID. |

---

## ⚙ Requirements

- A **Stalker Portal** account a valid MAC address and device details are required).
- **Cloudflare Workers account** ([Sign up here](https://dash.cloudflare.com/sign-up))
- Your own **portal details**:
  - **Host** (e.g. `example.com`)
  - **MAC Address** (e.g. `00:1A:79:XX:XX:XX`)
  - **Serial Number** (e.g. `ABCD12345678`)
  - **Device IDs** (`device_id` and `device_id2`)
  - **STB Type** (e.g. `MAG250`)

---
### How to access scripts
• auto-updated-playlist-generator => <your-deployment-url>/playlist.m3u8 ( eg. https://your-worker.worker.dev/playlist.m3u8 )

• Stream-link-extractorb => <your-deployment-url>/$id.m3u8 (eg. https://your-worker.worker.dev/{$channel_id}.m3u8

## 🚀 Deployment

### 1️⃣ Create a new Cloudflare Worker
1. Go to **Cloudflare Dashboard → Workers & Pages → Create Application → Create Worker**.
2. Give it a name (e.g., `stalker-playlist`).
3. Click **Deploy**.
4. Replace the default code with the script from this repo.
5. Click **Save and Deploy**.

---

### 2️⃣ Configure the script
In **both scripts**, you will see a `config` object:

```js
const config = {
    Host: 'your.portal.host',
    mac_address: '00:1A:79:XX:XX:XX',
    serial_number: 'YOUR_SERIAL',
    device_id: 'YOUR_DEVICE_ID',
    device_id_2: 'YOUR_DEVICE_ID_2',
    stb_type: 'MAG250',
    api_signature: '263',
    stream_url: 'https://your-worker-url/${real_cmd}.m3u8'
};

📬 Contact
• Author: @tg_aadi
• Telegram: https://t.me/tg_aadi
