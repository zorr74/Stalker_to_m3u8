# 📺 Stalker-Portal to M3U Playlist Generator

**Author:** [@tg_aadi](https://t.me/tg_aadi)  
**Telegram Support:** [https://t.me/tg_aadi](https://t.me/tg_aadi)  
**License:** Free to use  

This project allows you to **convert any Stalker-Portal account into an M3U playlist** that can be used in IPTV players like **TiviMate, OTT Navigator, VLC, Perfect Player**, etc.

With this script, you can:
- 🔑 Authenticate to any Stalker-Portal using **MAC Address** and **Device IDs**  
- 🎯 Generate a **dynamic M3U playlist** directly from your portal  
- 📡 Get direct stream links (`.m3u8`) for any channel  
- 🌍 Host your own IPTV playlist server using **Cloudflare Workers** (free)

---

## ⚡ Features
- Works with most Stalker-Portals worldwide
- Fetches **Account Info, Profile, Channel List, Genres**
- Auto-detects **User IP** and shows it in playlist info
- Fully compatible with all IPTV players
- 100% serverless hosting using Cloudflare Workers

---

## 📋 Requirements
- A **working Stalker-Portal account** (Host, MAC address, serial number, etc.)
- A **Cloudflare account** (free) to deploy the worker
- Basic GitHub knowledge to fork & deploy

---

## 🛠 Configuration

Edit the **`config`** object in the script before deployment:

```javascript
const config = {
    host: '',             // e.g. 'example.com' (your portal host without http/https)
    mac_address: '',      // Your portal MAC address (e.g., 00:1A:79:12:34:56)
    serial_number: '',    // Your device serial number
    device_id: '',        // Your Device ID
    device_id_2: '',      // Your Device ID 2
    stb_type: 'MAG250',   // STB type (default MAG250)
    api_signature: '263', // Keep as is
};
