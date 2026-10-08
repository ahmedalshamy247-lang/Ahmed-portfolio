# Ahmed Mohamed Mounir — Personal Portfolio & Infrastructure Showcase

A high-converting, modern personal portfolio website built for **Ahmed Mohamed Mounir** (Network & IT Infrastructure Support Engineer). Designed with a **high-tech cyber dark aesthetic**, vibrant neon cyan and emerald glowing accents, glassmorphic cards, smooth micro-interactions, and real-time interactive engineering tools.

---

## 🌟 Key Features

1. **High-Tech Cyber Visual Identity**:
   - Modern dark slate & carbon background with electric cyan (`#06b6d4`) and emerald green (`#10b981`) glowing accents.
   - Dynamic HTML5 Canvas background rendering a real-time interconnected network topology with pulsing data packets.
   - Glassmorphism UI components with `backdrop-filter: blur(16px)` and subtle glowing borders.

2. **Hero Section with Interactive CLI Terminal**:
   - High-impact headline, status indicator (*"Available For Hire"*), and live metric cards.
   - Working interactive terminal with commands: `help`, `skills`, `projects`, `ping 8.8.8.8`, `whoami`, `contact`, `cv`, `clear`.
   - Clickable quick-action command chips.

3. **About & Engineering Pillars**:
   - Highlights Ahmed's dual strengths: hands-on Layer 2/3 networking & systems engineering alongside executive sales management & stakeholder communication.
   - 4 core engineering pillars: Multi-Branch Connectivity, Windows Server 2025 & AD DS, Network Security & Hardening, and Rapid SLA Resolution.

4. **Interactive Skills Matrix**:
   - Filter tabs: *All Skills*, *Networking & Switching*, *Security & VPN*, *Windows Server & Virtualization*, *IT Support & Monitoring*, *CCTV & Biometrics*.
   - Live search filter: Quickly search skills by keyword (e.g., `VLAN`, `DrayTek`, `Hyper-V`, `Wireshark`).

5. **Featured Engineering Projects & Architecture Modals**:
   - **MEGA SCAN Multi-Branch DrayTek VPN Mesh & Surveillance Overhaul**: 5 connected branches, boosted CCTV readiness from 20% to 100%, biometric sync from 70% to 100%.
   - **Enterprise Multilayer Switching & Redundant Gateway Lab**: Cisco Core/Dist/Access hierarchy, HSRP sub-second failover, LACP EtherChannel, IP Helper relay, Port Security.
   - **Windows Server 2025 Active Directory & Hyper-V Environment**: AD DS domain forests, GPOs, DHCP 50/50 failover, NTFS security, PowerShell scripts.
   - Interactive modal popup with **Overview**, **Topology**, and **Configuration CLI snippets** tabs for each project.

6. **Interactive IPv4 Subnet Calculator Tool**:
   - Built-in utility to test network segmentation live in the browser.
   - Calculates Network ID, Broadcast, Usable Host Scope, Subnet Mask, Wildcard Mask, Host Count, IP Class, and Binary format.
   - Includes one-click presets: *Branch LAN (/24)*, *DrayTek P2P VPN (/30)*, *Cisco Voice VLAN (/26)*, *Campus Enterprise (/16)*.

7. **Multi-Track Career & Education Timeline**:
   - Filter by *Technical Experience*, *Education & Certifications*, and *Leadership & Commercial Background*.
   - Features Ain Shams University IT Diploma, Cairo University Law degree, CCNA, CompTIA Network+, CompTIA A+, Windows Server 2025, and HCSA certifications.

8. **Contact & Lead Generation**:
   - Direct contact links: Email (`Ahmedalshamy247@gmail.com`), Phone (`010-11655015`), and WhatsApp.
   - One-click **"Copy Email"** button with visual feedback.
   - Validated contact form with animated confirmation toast and `mailto:` prefilled fallback.
   - Direct download link to the reviewed CV PDF (`Ahmed_Mounir_IT_CV_Reviewed.pdf`).

---

## 🚀 How to Run Locally

### Option 1: Using the Included Node.js Static Server (Recommended)
From the portfolio directory, run:
```bash
node server.js
```
Then open your browser and navigate to:
```
http://localhost:3000
```

### Option 2: Direct File Open
Since the portfolio is built with modern vanilla HTML, CSS, and JavaScript with zero external build dependencies:
- Simply double-click [`index.html`](file:///c:/Users/Ahmed/Desktop/portfolio/index.html) in Windows File Explorer to open it in your default browser.

### Option 3: VS Code Live Server
- Open the folder in VS Code.
- Right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Deploying to the Web (Free Hosting Options)

### 1. GitHub Repository & GitHub Pages
Your remote repository is configured at:  
👉 **`https://github.com/ahmedalshamy247-lang/Ahmed-portfolio.git`**

To push this codebase to your repository:
```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit the changes
git commit -m "feat: initial commit for high-converting network & IT infrastructure portfolio"

# 4. Set the main branch
git branch -M main

# 5. Connect the remote GitHub repository
git remote add origin https://github.com/ahmedalshamy247-lang/Ahmed-portfolio.git

# 6. Push to GitHub
git push -u origin main
```

#### To enable free hosting on GitHub Pages:
1. In your GitHub repository, go to **Settings** > **Pages** (in the left sidebar).
2. Under **Build and deployment > Branch**, choose **`main`** and **`/(root)`**, then click **Save**.
3. In ~1 minute, your portfolio will be live at:  
   👉 **`https://ahmedalshamy247-lang.github.io/Ahmed-portfolio/`**

### 2. Vercel
1. Link your GitHub repository directly on [vercel.com/new](https://vercel.com/new).
2. Click **Deploy** (zero configuration needed).

### 3. Netlify
1. Drag and drop this folder directly into [app.netlify.com/drop](https://app.netlify.com/drop) or import from GitHub.

---

## 📁 File Structure

```
portfolio/
├── index.html                       # Semantic HTML5 markup, SEO meta tags, SVG icons
├── style.css                        # Cyber dark mode design system, responsive styles
├── script.js                        # Canvas mesh, terminal emulator, subnet calculator, modal
├── server.js                        # Zero-dependency local Node.js HTTP server
├── Ahmed_Mounir_IT_CV_Reviewed.pdf  # Ahmed's official reviewed CV document
└── README.md                        # Documentation & deployment guide
```

---

## 👤 Author
**Ahmed Mohamed Mounir**  
Network & IT Infrastructure Support Engineer  
Giza, Egypt  
- Email: [Ahmedalshamy247@gmail.com](mailto:Ahmedalshamy247@gmail.com)  
- Phone: [+20 10 1165 5015](tel:+201011655015)
