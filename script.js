/**
 * AHMED MOHAMED MOUNIR — PORTFOLIO CORE SCRIPTS
 * Network & IT Infrastructure Support Engineer
 * Features:
 *  - Canvas Network Mesh Constellation with data packet animations
 *  - Interactive live CLI Terminal emulator with network commands & ICMP ping
 *  - Real-time IPv4 Subnet Calculator & CIDR parser
 *  - Skills live search & category filtering
 *  - Interactive Project Case Study & Architecture modal
 *  - Career timeline multi-track filter
 *  - Clipboard copy utility & validated contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  initNetworkCanvas();
  initNavigation();
  initTerminal();
  initSkillsFilter();
  initProjectsModal();
  initSubnetCalculator();
  initTimelineFilter();
  initContactForm();
  initBackToTop();
  updateCurrentYear();
});

/* ==========================================================================
   1. DYNAMIC NETWORK MESH CANVAS ANIMATION
   ========================================================================== */
function initNetworkCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodeCount = Math.floor((width * height) / 18000);
  const nodes = [];
  const maxDistance = 140;

  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.2;
      this.color = Math.random() > 0.4 ? 'rgba(6, 182, 212, ' : 'rgba(16, 185, 129, ';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.8)';
      ctx.fill();
    }
  }

  for (let i = 0; i < Math.max(35, Math.min(nodeCount, 80)); i++) {
    nodes.push(new Node());
  }

  // Data packet simulation on links
  const packets = [];
  function createPacket(fromNode, toNode) {
    return {
      x: fromNode.x,
      y: fromNode.y,
      targetX: toNode.x,
      targetY: toNode.y,
      progress: 0,
      speed: 0.015 + Math.random() * 0.02
    };
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw lines between nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Occasionally spawn a packet along connection
          if (Math.random() < 0.0004 && packets.length < 8) {
            packets.push(createPacket(nodes[i], nodes[j]));
          }
        }
      }
    }

    // Update and draw packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;
      if (p.progress >= 1) {
        packets.splice(i, 1);
        continue;
      }
      const curX = p.x + (p.targetX - p.x) * p.progress;
      const curY = p.y + (p.targetY - p.y) * p.progress;

      ctx.beginPath();
      ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. NAVBAR, SCROLL SPY & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   3. HERO INTERACTIVE LIVE CLI TERMINAL
   ========================================================================== */
function initTerminal() {
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalInput = document.getElementById('terminalInput');
  const terminalSubmitBtn = document.getElementById('terminalSubmitBtn');
  const chips = document.querySelectorAll('.term-chip');

  if (!terminalOutput || !terminalInput) return;

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    // Echo input line
    const userLine = document.createElement('div');
    userLine.className = 'term-line';
    userLine.innerHTML = `<span class="term-prompt">guest@terminal:~$</span> <span class="term-cmd">${escapeHTML(cmdRaw)}</span>`;
    terminalOutput.appendChild(userLine);

    const response = document.createElement('div');
    response.className = 'term-response';

    const args = cmd.split(' ');
    const primary = args[0];

    switch (primary) {
      case 'help':
        response.innerHTML = `
          <div class="status-row"><span class="status-key">skills:</span> <span class="status-val text-cyan">List core technical competencies</span></div>
          <div class="status-row"><span class="status-key">projects:</span> <span class="status-val text-emerald">Show active engineering topologies</span></div>
          <div class="status-row"><span class="status-key">ping &lt;host&gt;:</span> <span class="status-val text-cyan">Simulate ICMP ping packets</span></div>
          <div class="status-row"><span class="status-key">github:</span> <span class="status-val text-cyan">Open GitHub repository & profile</span></div>
          <div class="status-row"><span class="status-key">whoami:</span> <span class="status-val text-emerald">Display engineer bio & credentials</span></div>
          <div class="status-row"><span class="status-key">cv:</span> <span class="status-val text-purple">Download official reviewed CV PDF</span></div>
          <div class="status-row"><span class="status-key">contact:</span> <span class="status-val text-cyan">Output direct communication channels</span></div>
          <div class="status-row"><span class="status-key">clear:</span> <span class="status-val text-dim">Reset terminal buffer</span></div>
        `;
        break;

      case 'skills':
        response.innerHTML = `
          <div class="status-row"><span class="status-key">Networking:</span> <span class="status-val text-cyan">Cisco Switching, Inter-VLAN, EtherChannel, HSRP, OSPF</span></div>
          <div class="status-row"><span class="status-key">Security & VPN:</span> <span class="status-val text-emerald">DrayTek Vigor IPsec/SSL VPNs, ACLs, Port Security</span></div>
          <div class="status-row"><span class="status-key">Systems:</span> <span class="status-val text-purple">Windows Server 2025, Active Directory, GPO, Hyper-V</span></div>
          <div class="status-row"><span class="status-key">Surveillance:</span> <span class="status-val text-amber">CCTV NVR/DVR (HCSA), ZKTeco Biometrics (100% sync)</span></div>
          <div class="status-row"><span class="status-key">Diagnostic Tools:</span> <span class="status-val">Wireshark, GNS3, SolarWinds, Packet Tracer</span></div>
        `;
        break;

      case 'projects':
        response.innerHTML = `
          <div class="status-row"><span class="status-key">[01] MEGA SCAN:</span> <span class="status-val text-cyan">5-Branch DrayTek VPN Mesh & Surveillance Overhaul (100% Uptime)</span></div>
          <div class="status-row"><span class="status-key">[02] Campus Lab:</span> <span class="status-val text-emerald">Multilayer Switching, HSRP Gateway & LACP Redundancy</span></div>
          <div class="status-row"><span class="status-key">[03] Server 2025:</span> <span class="status-val text-purple">Active Directory DS, GPOs, DNS/DHCP Failover & Hyper-V</span></div>
        `;
        break;

      case 'ping':
        const host = args[1] || '8.8.8.8';
        response.innerHTML = `
          <div>PING ${escapeHTML(host)} (56 data bytes):</div>
          <div class="status-row"><span class="status-key">Packet 1:</span> <span class="status-val text-emerald">64 bytes from ${escapeHTML(host)}: icmp_seq=1 ttl=118 time=11.4 ms</span></div>
          <div class="status-row"><span class="status-key">Packet 2:</span> <span class="status-val text-emerald">64 bytes from ${escapeHTML(host)}: icmp_seq=2 ttl=118 time=10.8 ms</span></div>
          <div class="status-row"><span class="status-key">Packet 3:</span> <span class="status-val text-emerald">64 bytes from ${escapeHTML(host)}: icmp_seq=3 ttl=118 time=12.1 ms</span></div>
          <div class="status-row"><span class="status-key">Packet 4:</span> <span class="status-val text-emerald">64 bytes from ${escapeHTML(host)}: icmp_seq=4 ttl=118 time=11.0 ms</span></div>
          <div class="status-row"><span class="status-key">Statistics:</span> <span class="status-val text-cyan">4 transmitted, 4 received, 0% packet loss, avg 11.3ms</span></div>
        `;
        break;

      case 'whoami':
        response.innerHTML = `
          <div class="status-row"><span class="status-key">Name:</span> <span class="status-val text-cyan">Ahmed Mohamed Mounir</span></div>
          <div class="status-row"><span class="status-key">Title:</span> <span class="status-val text-emerald">Network & IT Infrastructure Support Engineer</span></div>
          <div class="status-row"><span class="status-key">Location:</span> <span class="status-val">Giza, Egypt (Open to Relocation & Remote)</span></div>
          <div class="status-row"><span class="status-key">Education:</span> <span class="status-val text-purple">IT Diploma (Ain Shams Univ) • Bachelor of Law (Cairo Univ)</span></div>
          <div class="status-row"><span class="status-key">Status:</span> <span class="status-val text-emerald">Available for Full-time & Infrastructure Projects</span></div>
        `;
        break;

      case 'cv':
      case 'resume':
        response.innerHTML = `
          <div class="status-row"><span class="status-key">Dispatching CV:</span> <span class="status-val text-emerald">Initiating download of Ahmed_Mounir_IT_CV_Reviewed.pdf</span></div>
        `;
        const link = document.createElement('a');
        link.href = 'Ahmed_Mounir_IT_CV_Reviewed.pdf';
        link.download = 'Ahmed_Mounir_IT_CV.pdf';
        link.click();
        break;

      case 'contact':
        response.innerHTML = `
          <div class="status-row"><span class="status-key">Email:</span> <span class="status-val text-cyan">Ahmedalshamy247@gmail.com</span></div>
          <div class="status-row"><span class="status-key">Phone / WA:</span> <span class="status-val text-emerald">+20 10 1165 5015</span></div>
          <div class="status-row"><span class="status-key">Location:</span> <span class="status-val">Giza, Egypt</span></div>
        `;
        break;

      case 'github':
      case 'repo':
        response.innerHTML = `
          <div class="status-row"><span class="status-key">Repository:</span> <a href="https://github.com/ahmedalshamy247-lang/Ahmed-portfolio" target="_blank" rel="noopener noreferrer" class="status-val text-cyan" style="text-decoration:underline;">github.com/ahmedalshamy247-lang/Ahmed-portfolio</a></div>
          <div class="status-row"><span class="status-key">Profile:</span> <a href="https://github.com/ahmedalshamy247-lang" target="_blank" rel="noopener noreferrer" class="status-val text-emerald" style="text-decoration:underline;">github.com/ahmedalshamy247-lang</a></div>
        `;
        break;

      case 'clear':
        terminalOutput.innerHTML = `
          <div class="term-line intro-line">
            <span class="term-accent">root@router-edge:</span> BUFFER CLEARED — TERMINAL READY
          </div>
        `;
        terminalInput.value = '';
        return;

      default:
        response.innerHTML = `
          <div style="color: #ef4444;">command not recognized: '${escapeHTML(cmdRaw)}'</div>
          <div class="term-dim">Type 'help' to see valid infrastructure commands.</div>
        `;
    }

    terminalOutput.appendChild(response);
    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Event handlers
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
    }
  });

  if (terminalSubmitBtn) {
    terminalSubmitBtn.addEventListener('click', () => {
      handleCommand(terminalInput.value);
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      terminalInput.value = cmd;
      handleCommand(cmd);
    });
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   4. TECHNICAL SKILLS MATRIX (FILTER & SEARCH)
   ========================================================================= */
function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('skillSearchInput');
  const skillCards = document.querySelectorAll('.skill-card');
  const skillsGrid = document.getElementById('skillsGrid');

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilter() {
    let visibleCount = 0;

    skillCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const title = (card.querySelector('.skill-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.skill-summary')?.textContent || '').toLowerCase();

      const matchesCat = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = !searchTerm || 
        keywords.includes(searchTerm) || 
        title.includes(searchTerm) || 
        desc.includes(searchTerm);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Check empty state
    let emptyMsg = document.getElementById('skillsEmptyMsg');
    if (visibleCount === 0) {
      if (!emptyMsg) {
        emptyMsg = document.createElement('div');
        emptyMsg.id = 'skillsEmptyMsg';
        emptyMsg.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted); font-family: var(--font-mono);';
        emptyMsg.innerHTML = `No skills matching "<span style="color:var(--cyan)">${escapeHTML(searchTerm)}</span>" in this category.`;
        skillsGrid.appendChild(emptyMsg);
      }
    } else if (emptyMsg) {
      emptyMsg.remove();
    }
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCategory = tab.getAttribute('data-filter');
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilter();
    });
  }
}

/* ==========================================================================
   5. PROJECT CASE STUDY ARCHITECTURE MODAL
   ========================================================================== */
const projectData = {
  'mega-scan': {
    badge: 'MULTI-BRANCH PRODUCTION DEPLOYMENT',
    title: 'MEGA SCAN 5-Branch DrayTek VPN Mesh & Surveillance Modernization',
    overview: `
      <p><strong>Client / Organization:</strong> MEGA SCAN Diagnostic Centers (5 Operating Branches across Egypt)</p>
      <p><strong>Primary Objective:</strong> Overhaul a fragmented multi-branch IT setup suffering from unmonitored security, unstable branch communication, and severe CCTV downtime.</p>
      <h4 style="color:var(--cyan); margin: 1rem 0 0.4rem 0;">Key Deliverables & Business Impact:</h4>
      <ul style="padding-left:1.2rem; margin-bottom:1rem;">
        <li><strong>Surveillance Overhaul (20% → 100% Readiness):</strong> Diagnosed dead PoE switches, re-terminated failing RJ45 lines, configured centralized NVR streams with motion detection schedules across all 5 branches.</li>
        <li><strong>Encrypted Multi-Site VPN Mesh:</strong> Deployed and configured DrayTek Vigor routers establishing robust IPsec/SSL site-to-site tunnels connecting all clinics directly to HQ.</li>
        <li><strong>Biometric Attendance Data Sync (70% → 100% Reliability):</strong> Standardized ZKTeco fingerprint/face recognition devices, configured automated WAN sync to central database, ensuring zero lost time logs.</li>
        <li><strong>MILLENSYS Healthcare Applications:</strong> Ensured QoS priority and stable Layer 3 routes for Hospital Information System (HIS), PACS radiology imaging server, and ERP transactions.</li>
      </ul>
    `,
    topology: `
      <h4 style="color:var(--cyan); margin-bottom:0.5rem;">Network Topology & Subnet Schema:</h4>
      <p>HQ acts as the Central Hub (192.168.10.0/24) hosting the MILLENSYS PACS/HIS medical database and Active Directory DC. Each satellite branch connects over redundant DrayTek IPsec tunnels with dedicated VLAN subnets:</p>
      <div style="background:#0a0e17; padding:1rem; border-radius:8px; font-family:var(--font-mono); font-size:0.82rem; margin:1rem 0;">
        • HQ Data Center: 192.168.10.0/24 (HIS / PACS / AD DS)<br>
        • Branch 01 (Mohandessin): 192.168.20.0/24 (VLAN 10: Workstations, VLAN 20: NVR/CCTV)<br>
        • Branch 02 (Dokki): 192.168.30.0/24 (VLAN 10: Workstations, VLAN 20: NVR/CCTV)<br>
        • Branch 03 (Haram): 192.168.40.0/24 (VLAN 10: Workstations, VLAN 20: NVR/CCTV)<br>
        • Branch 04 (Faisal): 192.168.50.0/24 (VLAN 10: Workstations, VLAN 20: NVR/CCTV)<br>
        • Branch 05 (Sheikh Zayed): 192.168.60.0/24 (VLAN 10: Workstations, VLAN 20: NVR/CCTV)
      </div>
    `,
    config: `
      <h4 style="color:var(--cyan); margin-bottom:0.5rem;">DrayTek IPsec VPN & Firewall Policy Snippet:</h4>
      <div class="cli-snippet">
<span class="cli-comment"># DrayTek Vigor IPsec Site-to-Site Tunnel Configuration</span>
<span class="cli-keyword">vpn</span> <span class="cli-param">profile 1</span>
 <span class="cli-keyword">name</span> <span class="cli-string">"VPN_HQ_TO_BRANCH01"</span>
 <span class="cli-keyword">call-direction</span> <span class="cli-param">both</span>
 <span class="cli-keyword">dial-in-protocol</span> <span class="cli-param">ipsec</span>
 <span class="cli-keyword">ipsec-security</span> <span class="cli-param">ikev2-aes256-sha256-dh14</span>
 <span class="cli-keyword">preshared-key</span> <span class="cli-string">"MegaScanSecure@2025#Key!"</span>
 <span class="cli-keyword">local-network</span> <span class="cli-param">192.168.10.0/24</span>
 <span class="cli-keyword">remote-network</span> <span class="cli-param">192.168.20.0/24</span>
 <span class="cli-keyword">keep-alive</span> <span class="cli-param">60</span>
 <span class="cli-keyword">status</span> <span class="cli-string">enable</span>

<span class="cli-comment"># QoS Prioritization for Healthcare PACS/HIS Imaging</span>
<span class="cli-keyword">qos</span> <span class="cli-param">class 1</span> <span class="cli-string">"PACS_DICOM"</span> <span class="cli-keyword">port</span> <span class="cli-param">104</span> <span class="cli-keyword">bandwidth-reserve</span> <span class="cli-param">40%</span>
      </div>
    `
  },
  'network-lab': {
    badge: 'CISCO HIERARCHICAL ARCHITECTURE LAB',
    title: 'Enterprise Multilayer Switching & Redundant Gateway Lab',
    overview: `
      <p><strong>Environment:</strong> Cisco IOS Enterprise Lab (Multilayer Core 3560/3750, Distribution & 2960 Access switches)</p>
      <p><strong>Goal:</strong> Simulate a Fortune-500 enterprise campus LAN with high bandwidth trunking, default gateway zero-downtime failover, and strict Layer 2 access security.</p>
      <h4 style="color:var(--cyan); margin: 1rem 0 0.4rem 0;">Key Architectural Feats:</h4>
      <ul style="padding-left:1.2rem; margin-bottom:1rem;">
        <li><strong>HSRP Default Gateway Redundancy:</strong> Virtual IP failover (< 1 second convergence) between Core-SW01 (Active) and Core-SW02 (Standby).</li>
        <li><strong>LACP EtherChannel (Port-Channel 1):</strong> Aggregated multiple Gigabit links between Core switches providing 2 Gbps full-duplex backbone with automatic link failure compensation.</li>
        <li><strong>Switch Hardening:</strong> Configured 802.1Q trunks with native VLAN tagging, Port Security (maximum 2 MACs per port with violation shutdown), and DHCP Snooping with IP Helper relay.</li>
      </ul>
    `,
    topology: `
      <h4 style="color:var(--cyan); margin-bottom:0.5rem;">VLAN Segmentation & HSRP VIP Schema:</h4>
      <div style="background:#0a0e17; padding:1rem; border-radius:8px; font-family:var(--font-mono); font-size:0.82rem; margin:1rem 0;">
        • VLAN 10 (Finance/Admin): Subnet 10.10.10.0/24 | HSRP VIP: 10.10.10.1<br>
        • VLAN 20 (Clinical/Operations): Subnet 10.10.20.0/24 | HSRP VIP: 10.10.20.1<br>
        • VLAN 30 (VoIP Telephony): Subnet 10.10.30.0/24 | Voice VLAN CoS 5<br>
        • VLAN 99 (Management / SSH): Subnet 10.10.99.0/24 | SSH v2 Only<br>
        • Native VLAN: 999 (Unused & Quarantined)
      </div>
    `,
    config: `
      <h4 style="color:var(--cyan); margin-bottom:0.5rem;">Cisco IOS Multilayer Switch Configuration (CLI):</h4>
      <div class="cli-snippet">
<span class="cli-comment">! Core-SW01: SVI & HSRP Gateway Redundancy</span>
<span class="cli-keyword">interface</span> <span class="cli-param">Vlan10</span>
 <span class="cli-keyword">description</span> <span class="cli-string">"Finance Department Gateway"</span>
 <span class="cli-keyword">ip address</span> <span class="cli-param">10.10.10.2 255.255.255.0</span>
 <span class="cli-keyword">ip helper-address</span> <span class="cli-param">10.10.99.5</span>
 <span class="cli-keyword">standby 10 ip</span> <span class="cli-param">10.10.10.1</span>
 <span class="cli-keyword">standby 10 priority</span> <span class="cli-param">110</span>
 <span class="cli-keyword">standby 10 preempt</span>

<span class="cli-comment">! Access Switch: Port Security Hardening</span>
<span class="cli-keyword">interface range</span> <span class="cli-param">FastEthernet 0/1 - 24</span>
 <span class="cli-keyword">switchport mode</span> <span class="cli-param">access</span>
 <span class="cli-keyword">switchport access vlan</span> <span class="cli-param">10</span>
 <span class="cli-keyword">switchport port-security</span>
 <span class="cli-keyword">switchport port-security maximum</span> <span class="cli-param">2</span>
 <span class="cli-keyword">switchport port-security mac-address</span> <span class="cli-param">sticky</span>
 <span class="cli-keyword">switchport port-security violation</span> <span class="cli-param">shutdown</span>
      </div>
    `
  },
  'windows-server': {
    badge: 'SYSTEMS & CLOUD INFRASTRUCTURE',
    title: 'Windows Server 2025 Active Directory & Hyper-V Environment',
    overview: `
      <p><strong>Environment:</strong> Windows Server 2025 Datacenter, Hyper-V Role, PowerShell 7, Azure Arc Hybrid connectivity.</p>
      <p><strong>Objective:</strong> Deploy a resilient on-premise directory services forest with automated configuration policies, DHCP split scope failover, and segregated Hyper-V virtual workloads.</p>
      <h4 style="color:var(--cyan); margin: 1rem 0 0.4rem 0;">Key Achievements:</h4>
      <ul style="padding-left:1.2rem; margin-bottom:1rem;">
        <li><strong>AD DS Hierarchy:</strong> Created structured Organizational Units (OUs) for Departments, Service Accounts, and Multi-Branch Workstations.</li>
        <li><strong>Group Policy Hardening:</strong> Enforced BitLocker drive encryption, automated screen lockouts, disabled SMBv1/v2, and mapped network drives by security group.</li>
        <li><strong>DHCP Failover (Load Balance 50/50):</strong> Configured high-availability DHCP scopes between two servers ensuring zero IP exhaustion during maintenance.</li>
      </ul>
    `,
    topology: `
      <h4 style="color:var(--cyan); margin-bottom:0.5rem;">Hyper-V Virtual Infrastructure Map:</h4>
      <div style="background:#0a0e17; padding:1rem; border-radius:8px; font-family:var(--font-mono); font-size:0.82rem; margin:1rem 0;">
        • Host: Windows Server 2025 Bare-Metal (32 Cores, 128GB RAM, RAID 10 NVMe)<br>
        • VM 1: DC01.corp.local (Primary Domain Controller, DNS Root, GC)<br>
        • VM 2: DC02.corp.local (Secondary DC, DHCP Failover Partner)<br>
        • VM 3: FS01.corp.local (Clustered File Server, NTFS Permissions, DFS-R)<br>
        • Virtual Switch: vSwitch-Core (External, Teaming Dynamic Hash)
      </div>
    `,
    config: `
      <h4 style="color:var(--cyan); margin-bottom:0.5rem;">PowerShell AD DS & DHCP Failover Deployment:</h4>
      <div class="cli-snippet">
<span class="cli-comment"># PowerShell Script: Create Organizational Units & Provision DHCP Scope</span>
<span class="cli-keyword">Import-Module</span> <span class="cli-string">ActiveDirectory</span>

<span class="cli-keyword">New-ADOrganizationalUnit</span> <span class="cli-param">-Name</span> <span class="cli-string">"Medical_Staff"</span> <span class="cli-param">-Path</span> <span class="cli-string">"DC=corp,DC=local"</span>
<span class="cli-keyword">New-ADOrganizationalUnit</span> <span class="cli-param">-Name</span> <span class="cli-string">"Administrative"</span> <span class="cli-param">-Path</span> <span class="cli-string">"DC=corp,DC=local"</span>

<span class="cli-comment"># Configure DHCP Failover Relationship</span>
<span class="cli-keyword">Add-DhcpServerv4Failover</span> <span class="cli-param">-ComputerName</span> <span class="cli-string">"DC01"</span> <span class="cli-param">-Name</span> <span class="cli-string">"DC01-DC02-Failover"</span> <span class="cli-param">\</span>
  <span class="cli-param">-PartnerServer</span> <span class="cli-string">"DC02"</span> <span class="cli-param">-ScopeId</span> <span class="cli-string">"10.10.10.0"</span> <span class="cli-param">-Mode</span> <span class="cli-string">LoadBalance</span> <span class="cli-param">-Percentage</span> <span class="cli-param">50</span>
      </div>
    `
  }
};

function initProjectsModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalTabs = document.querySelectorAll('.m-tab');
  const triggers = document.querySelectorAll('.modal-trigger');

  if (!modal) return;

  let currentProjectKey = 'mega-scan';
  let activeTab = 'overview';

  function renderModalContent() {
    const data = projectData[currentProjectKey];
    if (!data) return;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;

    modalTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === activeTab);
    });

    if (activeTab === 'overview') {
      modalBody.innerHTML = data.overview;
    } else if (activeTab === 'topology') {
      modalBody.innerHTML = data.topology;
    } else if (activeTab === 'config') {
      modalBody.innerHTML = data.config;
    }
  }

  function openModal(projectKey) {
    currentProjectKey = projectKey;
    activeTab = 'overview';
    renderModalContent();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const proj = btn.getAttribute('data-project');
      openModal(proj);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activeTab = tab.getAttribute('data-tab');
      renderModalContent();
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE IPv4 SUBNET CALCULATOR & CIDR PARSER
   ========================================================================== */
function initSubnetCalculator() {
  const ipInput = document.getElementById('subnetIpInput');
  const maskSelect = document.getElementById('subnetMaskSelect');
  const calcBtn = document.getElementById('calculateSubnetBtn');
  const presetBtns = document.querySelectorAll('.preset-btn');

  const resNetwork = document.getElementById('resNetwork');
  const resBroadcast = document.getElementById('resBroadcast');
  const resHostScope = document.getElementById('resHostScope');
  const resNetmask = document.getElementById('resNetmask');
  const resWildcard = document.getElementById('resWildcard');
  const resHostCount = document.getElementById('resHostCount');
  const resIpClass = document.getElementById('resIpClass');
  const resBinaryMask = document.getElementById('resBinaryMask');

  if (!ipInput || !maskSelect) return;

  function ipToLong(ip) {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
      return null;
    }
    return ((parts[0] << 24) >>> 0) + ((parts[1] << 16) >>> 0) + ((parts[2] << 8) >>> 0) + (parts[3] >>> 0);
  }

  function longToIp(long) {
    return [
      (long >>> 24) & 255,
      (long >>> 16) & 255,
      (long >>> 8) & 255,
      long & 255
    ].join('.');
  }

  function toBinary8(num) {
    return num.toString(2).padStart(8, '0');
  }

  function calculate() {
    const rawIp = ipInput.value.trim();
    const cidr = parseInt(maskSelect.value, 10);
    const ipLong = ipToLong(rawIp);

    if (ipLong === null) {
      alert('Please enter a valid IPv4 address (e.g., 192.168.10.1)');
      return;
    }

    const maskLong = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const wildcardLong = ~maskLong >>> 0;
    const networkLong = (ipLong & maskLong) >>> 0;
    const broadcastLong = (networkLong | wildcardLong) >>> 0;

    const netmaskStr = longToIp(maskLong);
    const wildcardStr = longToIp(wildcardLong);
    const networkStr = longToIp(networkLong);
    const broadcastStr = longToIp(broadcastLong);

    let usableHosts = 0;
    let firstHostStr = '';
    let lastHostStr = '';

    if (cidr === 32) {
      usableHosts = 1;
      firstHostStr = lastHostStr = networkStr;
    } else if (cidr === 31) {
      usableHosts = 2;
      firstHostStr = networkStr;
      lastHostStr = broadcastStr;
    } else {
      usableHosts = Math.max(0, (1 << (32 - cidr)) - 2);
      firstHostStr = longToIp(networkLong + 1);
      lastHostStr = longToIp(broadcastLong - 1);
    }

    // IP Class & RFC 1918 Private status
    const firstOctet = (ipLong >>> 24) & 255;
    const secondOctet = (ipLong >>> 16) & 255;
    let ipClass = 'Class A';
    if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'Class B';
    else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'Class C';
    else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'Class D (Multicast)';
    else if (firstOctet >= 240) ipClass = 'Class E (Reserved)';

    let isPrivate = false;
    if (firstOctet === 10) isPrivate = true;
    else if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) isPrivate = true;
    else if (firstOctet === 192 && secondOctet === 168) isPrivate = true;

    const typeStr = isPrivate ? 'RFC 1918 Private' : 'Public Internet';

    // Binary Subnet Mask
    const maskOctets = netmaskStr.split('.').map(Number);
    const binaryStr = maskOctets.map(toBinary8).join('.');

    // Update UI
    resNetwork.textContent = `${networkStr} /${cidr}`;
    resBroadcast.textContent = broadcastStr;
    resHostScope.textContent = `${firstHostStr} — ${lastHostStr}`;
    resNetmask.textContent = netmaskStr;
    resWildcard.textContent = wildcardStr;
    resHostCount.textContent = `${usableHosts.toLocaleString()} usable hosts`;
    resIpClass.textContent = `${ipClass} (${typeStr})`;
    resBinaryMask.textContent = binaryStr;
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', calculate);
  }

  ipInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calculate();
  });

  maskSelect.addEventListener('change', calculate);

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ipInput.value = btn.getAttribute('data-ip');
      maskSelect.value = btn.getAttribute('data-cidr');
      calculate();
    });
  });

  // Run initial calculation
  calculate();
}

/* ==========================================================================
   7. TIMELINE MULTI-TRACK FILTER
   ========================================================================== */
function initTimelineFilter() {
  const filterBtns = document.querySelectorAll('.t-filter');
  const items = document.querySelectorAll('.timeline-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-tfilter');

      items.forEach(item => {
        const group = item.getAttribute('data-group');
        if (filter === 'all' || group === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. CONTACT FORM, VALIDATION & CLIPBOARD COPY
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('formName');
  const emailInput = document.getElementById('formEmail');
  const messageInput = document.getElementById('formMessage');
  const roleSelect = document.getElementById('formRole');
  const toast = document.getElementById('formToast');
  const submitBtn = document.getElementById('submitFormBtn');
  const submitText = document.getElementById('submitBtnText');
  const copyBtn = document.getElementById('copyEmailBtn');

  // One-click copy email
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'Ahmedalshamy247@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.querySelector('span').textContent;
        copyBtn.querySelector('span').textContent = 'Copied!';
        copyBtn.style.background = 'var(--emerald)';
        copyBtn.style.color = '#000';
        setTimeout(() => {
          copyBtn.querySelector('span').textContent = originalText;
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2500);
      }).catch(() => {
        prompt('Copy email:', email);
      });
    });
  }

  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Name
    const nameGroup = nameInput.closest('.form-group');
    if (!nameInput.value.trim()) {
      nameGroup.classList.add('has-error');
      isValid = false;
    } else {
      nameGroup.classList.remove('has-error');
    }

    // Email
    const emailGroup = emailInput.closest('.form-group');
    if (!validateEmail(emailInput.value.trim())) {
      emailGroup.classList.add('has-error');
      isValid = false;
    } else {
      emailGroup.classList.remove('has-error');
    }

    // Message
    const msgGroup = messageInput.closest('.form-group');
    if (!messageInput.value.trim()) {
      msgGroup.classList.add('has-error');
      isValid = false;
    } else {
      msgGroup.classList.remove('has-error');
    }

    if (!isValid) return;

    // Simulate sending with loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Transmitting...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitText.textContent = 'Message Transmitted';
      toast.classList.add('active');

      // Mailto backup link trigger for local desktop client
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${roleSelect.value} from ${nameInput.value.trim()}`);
      const body = encodeURIComponent(
        `Sender: ${nameInput.value.trim()}\n` +
        `Email: ${emailInput.value.trim()}\n` +
        `Inquiry: ${roleSelect.value}\n\n` +
        `Message:\n${messageInput.value.trim()}`
      );
      const mailtoUrl = `mailto:Ahmedalshamy247@gmail.com?subject=${subject}&body=${body}`;

      // Open mailto quietly in background so user's client is primed
      const mailtoAnchor = document.createElement('a');
      mailtoAnchor.href = mailtoUrl;
      mailtoAnchor.style.display = 'none';
      document.body.appendChild(mailtoAnchor);
      mailtoAnchor.click();
      mailtoAnchor.remove();

      form.reset();

      setTimeout(() => {
        submitText.textContent = 'Transmit Message';
        setTimeout(() => {
          toast.classList.remove('active');
        }, 5000);
      }, 3000);
    }, 700);
  });
}

/* ==========================================================================
   9. BACK TO TOP BUTTON & YEAR
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function updateCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
