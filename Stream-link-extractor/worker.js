// Stalker Portal Stream link extractor Script
// Created by: @tg_aadi 
// Telegram: https://t.me/tg_aadi
// This script is free for everyone to use
// If you encounter issues, check the console logs for debug information

// ⚙ INSTRUCTIONS FOR USERS ⚙
// Update the 'config' object below with your Stalker-Portal details
// Access the Stream link by visiting: <your-deployment-url>/$id.m3u8

export default {
  async fetch(request, env, ctx) {
    const config = {
      host: "sky.dittotvv.cc", // Replace with your Stalker-Portal host (e.g., 'example.com')
      mac: "00:1A:79:00:5C:6D", // Replace with your MAC address
      serial: "436613AC7210D", // Replace with your serial number
      device_id: "F33CE35DD81647CA8BA6FF4A7941D7B8B7392F39976FCA6B20CB2E22F3C041B1", // Replace with your device_id
      device_id2: "F33CE35DD81647CA8BA6FF4A7941D7B8B7392F39976FCA6B20CB2E22F3C041B1", // Replace with your device_id_2
      stb_type: 'MAG250', // Replace with Stalker-Portal Stb_type
      api_signature: "263", // No need to change 
    };

    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    const id = lastPart.replace(/\.m3u8$/, ''); 

    if (!id) {
      return new Response("❌ Missing channel ID in URL", { status: 400 });
    }

    const headers = (token = null) => ({
      "Cookie": `mac=${config.mac}; stb_lang=en; timezone=GMT`,
      "Referer": `http://${config.host}/stalker_portal/c/`,
      "User-Agent": "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3",
      "X-User-Agent": "Model: ${config.stb_type}; Link: WiFi",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });

    async function getToken() {
      const res = await fetch(`http://${config.host}/stalker_portal/server/load.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml`, {
        headers: headers()
      });
      const json = await res.json();
      return json?.js?.token;
    }

    async function authProfile(token) {
      const metrics = encodeURIComponent(JSON.stringify({
        mac: config.mac,
        model: "",
        type: "STB",
        uid: "",
        device: "",
        random: ""
      }));

      const hwv1 = "1.7-BD-" + (await hash(config.mac)).substring(0, 2).toUpperCase();
      const hwv2 = await hash(config.serial.toLowerCase() + config.mac.toLowerCase());

      const profileUrl = `http://${config.host}/stalker_portal/server/load.php?type=stb&action=get_profile` +
        `&hd=1&ver=ImageDescription:%200.2.18-r14-pub-250; PORTAL version:%205.5.0; API Version:%20328;` +
        `&num_banks=2&sn=${config.serial}` +
        `&stb_type=${config.stb_type}&client_type=STB&image_version=218&video_out=hdmi` +
        `&device_id=${config.device_id}&device_id2=${config.device_id2}` +
        `&signature=&auth_second_step=1&hw_version=${hwv1}` +
        `&not_valid_token=0&metrics=${metrics}` +
        `&hw_version_2=${hwv2}&api_signature=${config.api_signature}` +
        `&prehash=&JsHttpRequest=1-xml`;

      await fetch(profileUrl, { headers: headers(token) });
    }

    async function getStreamURL(id, token) {
      const url = `http://${config.host}/stalker_portal/server/load.php?type=itv&action=create_link&cmd=ffrt%20http://localhost/ch/${id}&JsHttpRequest=1-xml`;
      const res = await fetch(url, { headers: headers(token) });
      const data = await res.json();
      return data?.js?.cmd;
    }

    try {
      const token = await getToken();
      if (!token) throw new Error("Failed to get token");

      await authProfile(token); 
      const stream = await getStreamURL(id, token);

      if (!stream) throw new Error("No stream URL received");

      return Response.redirect(stream, 302);
    } catch (err) {
      return new Response("Internal Error: " + err.message, { status: 500 });
    }
  }
}

async function hash(str) {
  const data = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest("MD5", data);
  return Array.from(new Uint8Array(digest)).map(x => x.toString(16).padStart(2, "0")).join("");
}
