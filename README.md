# Anjali & Robin — Wedding Invitation (Self-Hosted Clone)

An exact, pixel-perfect, self-contained clone of the wedding invitation from ChungDoi. Completely free to host on your own custom domain via **GitHub Pages** or **Cloudflare Pages / CDN** with zero subscription fees, watermarks, or paywalls.

---

## ✨ Features Included

1. **Interactive Click-to-Open Envelope**:
   - Velvet burgundy background vignette with floating golden hearts and rose petals.
   - Elegant ivory envelope card with side flower bouquets and pulsating gold wax seal.
   - Smooth opening transition: breaking seal animation, flowers flying outwards, and revealing the card.
2. **Background Wedding Music**:
   - Plays the wedding song (`assets/music/wedding-song.mp3`) automatically upon opening.
   - Floating music control button with real-time animated equalizer soundwave bars.
3. **Hero Polaroid Slide-out**:
   - Burgundy velvet envelope with wax seal and Robin & Anjali's romantic photo styled as an authentic polaroid sliding out.
   - Architectural castle watermark and paper grain texture overlay.
4. **Wedding Announcement & Family Information**:
   - Announcement of Robin & Anjali's wedding.
   - Groom's family & Bride's family details with parent names and addresses.
5. **Full Celebrations & Ceremonies Schedule**:
   - **Engagement Ceremony**: Nov 22, 2026 at The Opulence Hotel & Banquets, Delhi.
   - **Mehndi Function**: Nov 23, 2026 at Hotel Palazzo Inn, Janakpuri, Delhi.
   - **Haldi Function**: Nov 24, 2026 at Hotel Palazzo Inn, Janakpuri, Delhi.
   - **Wedding Celebration**: Nov 25, 2026 at Midori By Tivoli, Kapashera, Delhi.
   - Direct Google Maps navigation link and calendar integration on each event.
6. **Live Real-Time Countdown & Calendar**:
   - Real-time countdown timer showing remaining days, hours, minutes, and seconds.
   - Interactive November 2026 calendar with the 25th marked by a burgundy heart badge.
   - "Add to Calendar" button (downloads standard `.ics` file).
7. **Wedding Venue & Embedded Map**:
   - Interactive Google Map centered on Midori by Tivoli Kapashera with direct "Get Directions" button.
8. **Wedding Program Timeline**:
   - 19:00: Welcome of Baraat
   - 20:00: Varmala
   - 21:00: Dinner
   - 00:00: Phere
   - 04:00: Vidai
9. **Casper's Paw-some Note**:
   - The couple's furry host Casper inviting guests to the wedding procession!
10. **Full Photo Gallery (24 Photos)**:
    - High-resolution gallery preview with an interactive Lightbox modal covering all 24 downloaded couple photos.
11. **Guestbook & Wishes Board**:
    - Guests can type their names and send warm blessings, persisted instantly in `localStorage`.
12. **RSVP Attendance Confirmation Modal**:
    - Dialog allows guests to select attendance status, number of guests, and events attending, followed by a personal thank you confirmation note.
13. **100% Self-Contained**:
    - All 24 photos, theme graphics, and the wedding song are stored locally in `assets/`. No external dependencies or risk of links breaking.

---

## 🚀 How to Run Locally

```bash
# In this directory, start a local HTTP server:
python3 -m http.server 8080

# Then open in your browser:
# http://localhost:8080/
```

---

## 🌐 How to Deploy for Free

### Option 1: GitHub Pages (Free with Custom Domain)

1. Initialize a git repository in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Robin & Anjali wedding invitation"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Link and push your repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **Repository Settings** > **Pages**:
   - Under **Source**, select `Deploy from a branch` and branch `main` / `root`.
   - Under **Custom domain**, enter your domain (e.g., `wedding.yourdomain.com`).
   - Add a `CNAME` record in your DNS provider pointing to `YOUR_USERNAME.github.io`.

---

### Option 2: Cloudflare Pages (Free & Fastest CDN)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git** (or direct upload this folder).
3. Set build command to empty and output directory to `.`.
4. Click **Save and Deploy**.
5. Under **Custom Domains**, add your domain — Cloudflare will automatically handle SSL and CDN caching!
