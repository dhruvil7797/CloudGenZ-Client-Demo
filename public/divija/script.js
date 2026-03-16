// ===== Particle Background =====
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
})();

// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
});

// ===== Typing Effect =====
(function typeGreeting() {
    const el = document.getElementById('greetingText');
    const text = "Hello, I'm";
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 80);
        }
    }
    setTimeout(type, 800);
})();

// ===== Navbar =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});


// ===== Scroll Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in, .cert-item, .skill-category').forEach(el => {
    observer.observe(el);
});

// ===== Stat Counter Animation =====
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                }, 40);
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stats').forEach(el => statObserver.observe(el));

// ===== Skill Bars Animation =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar').forEach(bar => {
                const level = bar.dataset.level;
                // Create fill element if not exists
                if (!bar.querySelector('.bar-fill')) {
                    const fill = document.createElement('div');
                    fill.className = 'bar-fill';
                    bar.appendChild(fill);
                    setTimeout(() => { fill.style.width = level + '%'; }, 200);
                }
            });
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

// ===== Project Filters =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== Hero Interactive Chart =====
(function initHeroChart() {
    const container = document.getElementById('heroChart');
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    new Chart(canvas, {
        type: 'radar',
        data: {
            labels: ['Python', 'SQL', 'Power BI', 'Statistics', 'ML', 'Visualization'],
            datasets: [{
                label: 'Skill Level',
                data: [85, 80, 90, 80, 70, 85],
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                borderColor: 'rgba(139, 92, 246, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: '#8b5cf6',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 4,
                pointHoverRadius: 7,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { display: false, stepSize: 20 },
                    grid: { color: 'rgba(255,255,255,0.06)' },
                    angleLines: { color: 'rgba(255,255,255,0.06)' },
                    pointLabels: {
                        color: '#a1a1aa',
                        font: { size: 13, family: 'Inter' }
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1a1a2e',
                    titleColor: '#a78bfa',
                    bodyColor: '#e4e4e7',
                    borderColor: 'rgba(99,102,241,0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                }
            },
            animation: { duration: 2000, easing: 'easeOutQuart' }
        }
    });
})();

// ===== Project Mini Charts =====
function createMiniChart(canvas, type, data, colors) {
    new Chart(canvas, {
        type: type,
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: colors.bg,
                borderColor: colors.border,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false },
                y: { display: false }
            },
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            animation: { duration: 1500 }
        }
    });
}

const miniChartData = {
    sales: { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'], values: [30,45,35,60,48,72,55,80] },
    netflix: { labels: ['2016','2017','2018','2019','2020','2021','2022','2023'], values: [20,35,55,70,90,85,75,65] },
    housing: { labels: ['1','2','3','4','5','6','7','8'], values: [150,180,200,220,280,310,350,400] },
    covid: { labels: ['M1','M2','M3','M4','M5','M6','M7','M8'], values: [10,50,120,200,180,140,90,60] },
    churn: { labels: ['Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8'], values: [25,22,28,20,18,24,16,14] },
    sentiment: { labels: ['1','2','3','4','5','6','7','8'], values: [60,65,55,70,75,68,80,85] },
};

const miniChartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const chartKey = el.dataset.chart;
            if (chartKey && miniChartData[chartKey] && !el.querySelector('canvas')) {
                const canvas = document.createElement('canvas');
                el.appendChild(canvas);
                createMiniChart(canvas, 'line', miniChartData[chartKey], {
                    bg: 'rgba(99, 102, 241, 0.1)',
                    border: 'rgba(139, 92, 246, 0.6)'
                });
            }
            miniChartObserver.unobserve(el);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.project-live-chart').forEach(el => miniChartObserver.observe(el));


// ===== Data Playground =====
const datasets = {
    iris: {
        labels: ['Setosa', 'Versicolor', 'Virginica'],
        values: [50, 50, 50],
        colors: ['rgba(99,102,241,0.7)', 'rgba(139,92,246,0.7)', 'rgba(167,139,250,0.7)'],
        stats: { mean: '5.84', median: '5.80', std: '0.83' }
    },
    sales: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        values: [12400, 15800, 14200, 18600, 21000, 19500, 23400, 25100, 22800, 27600, 31200, 35800],
        colors: 'rgba(99,102,241,0.7)',
        stats: { total: '$247,600', avg: '$20,633', peak: 'December' }
    },
    weather: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        values: [22, 25, 19, 28, 31, 27, 24],
        colors: 'rgba(139,92,246,0.7)',
        stats: { avg: '25.1°C', high: '31°C', low: '19°C' }
    }
};

let playgroundChart = null;

function renderPlayground() {
    const datasetKey = document.getElementById('datasetSelect').value;
    const chartType = document.getElementById('chartType').value;
    const data = datasets[datasetKey];
    const canvas = document.getElementById('playgroundChart');

    if (playgroundChart) playgroundChart.destroy();

    const isMultiColor = Array.isArray(data.colors);

    playgroundChart = new Chart(canvas, {
        type: chartType,
        data: {
            labels: data.labels,
            datasets: [{
                label: datasetKey.charAt(0).toUpperCase() + datasetKey.slice(1),
                data: data.values,
                backgroundColor: isMultiColor ? data.colors : data.colors,
                borderColor: isMultiColor ? data.colors.map(c => c.replace('0.7', '1')) : data.colors.replace('0.7', '1'),
                borderWidth: 2,
                fill: chartType === 'line',
                tension: 0.4,
                pointBackgroundColor: '#8b5cf6',
                pointRadius: chartType === 'scatter' ? 6 : 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: chartType !== 'scatter',
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { color: '#71717a', font: { size: 11 } }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { color: '#71717a', font: { size: 11 } }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1a1a2e',
                    titleColor: '#a78bfa',
                    bodyColor: '#e4e4e7',
                    borderColor: 'rgba(99,102,241,0.3)',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 8,
                }
            },
            animation: { duration: 800, easing: 'easeOutQuart' }
        }
    });

    // Update stats
    const statsEl = document.getElementById('chartStats');
    const stats = data.stats;
    statsEl.innerHTML = Object.entries(stats).map(([key, val]) =>
        `<span><span class="stat-dot" style="background:${isMultiColor ? data.colors[0] : data.colors}"></span>${key}: ${val}</span>`
    ).join('');
}

document.getElementById('datasetSelect').addEventListener('change', renderPlayground);
document.getElementById('chartType').addEventListener('change', renderPlayground);

// Init playground when visible
const playgroundObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            renderPlayground();
            playgroundObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const playgroundSection = document.querySelector('.playground');
if (playgroundSection) playgroundObserver.observe(playgroundSection);

// ===== SQL Sandbox =====
const sqlDB = {
    students: [
        { id: 1, name: 'Aarav Sharma', department: 'Computer Science', gpa: 3.9, year: 3 },
        { id: 2, name: 'Priya Patel', department: 'Data Science', gpa: 3.7, year: 2 },
        { id: 3, name: 'Rohan Gupta', department: 'Computer Science', gpa: 3.5, year: 4 },
        { id: 4, name: 'Sneha Reddy', department: 'Statistics', gpa: 3.8, year: 3 },
        { id: 5, name: 'Vikram Singh', department: 'Mathematics', gpa: 3.2, year: 2 },
        { id: 6, name: 'Ananya Iyer', department: 'Data Science', gpa: 3.6, year: 3 },
        { id: 7, name: 'Karthik Nair', department: 'Computer Science', gpa: 3.4, year: 4 },
        { id: 8, name: 'Meera Joshi', department: 'Statistics', gpa: 3.9, year: 2 },
        { id: 9, name: 'Arjun Das', department: 'Mathematics', gpa: 3.1, year: 3 },
        { id: 10, name: 'Divya Menon', department: 'Data Science', gpa: 3.8, year: 4 },
    ],
    courses: [
        { id: 101, name: 'Machine Learning', credits: 4, department: 'Computer Science' },
        { id: 102, name: 'Data Visualization', credits: 3, department: 'Data Science' },
        { id: 103, name: 'Statistical Methods', credits: 4, department: 'Statistics' },
        { id: 104, name: 'Database Systems', credits: 3, department: 'Computer Science' },
        { id: 105, name: 'Linear Algebra', credits: 4, department: 'Mathematics' },
    ]
};

function parseSQL(query) {
    query = query.trim().replace(/;$/, '');
    const lower = query.toLowerCase();

    if (!lower.startsWith('select')) {
        return { error: 'Only SELECT queries are supported in this sandbox.' };
    }

    // Parse table
    const fromMatch = lower.match(/from\s+(\w+)/);
    if (!fromMatch) return { error: 'Missing FROM clause.' };
    const tableName = fromMatch[1];
    if (!sqlDB[tableName]) return { error: `Table "${tableName}" not found. Available: students, courses` };

    let rows = [...sqlDB[tableName]];

    // Parse WHERE
    const whereMatch = lower.match(/where\s+(.+?)(?:\s+order|\s+limit|\s+group|$)/);
    if (whereMatch) {
        const condition = whereMatch[1].trim();
        rows = rows.filter(row => {
            try {
                // Handle common operators
                const ops = condition.match(/(\w+)\s*(>=|<=|!=|>|<|=|like)\s*['"]?([^'"]+)['"]?/i);
                if (!ops) return true;
                const [, col, op, val] = ops;
                const cellVal = row[col];
                if (cellVal === undefined) return true;
                const numVal = parseFloat(val);
                const isNum = !isNaN(numVal) && !isNaN(cellVal);
                switch (op) {
                    case '>': return isNum ? cellVal > numVal : false;
                    case '<': return isNum ? cellVal < numVal : false;
                    case '>=': return isNum ? cellVal >= numVal : false;
                    case '<=': return isNum ? cellVal <= numVal : false;
                    case '=': return isNum ? cellVal === numVal : String(cellVal).toLowerCase() === val.toLowerCase();
                    case '!=': return isNum ? cellVal !== numVal : String(cellVal).toLowerCase() !== val.toLowerCase();
                    case 'like': return String(cellVal).toLowerCase().includes(val.replace(/%/g, '').toLowerCase());
                    default: return true;
                }
            } catch { return true; }
        });
    }

    // Parse ORDER BY
    const orderMatch = lower.match(/order\s+by\s+(\w+)(?:\s+(asc|desc))?/);
    if (orderMatch) {
        const col = orderMatch[1];
        const dir = orderMatch[2] === 'asc' ? 1 : -1;
        rows.sort((a, b) => {
            if (typeof a[col] === 'number') return (a[col] - b[col]) * dir;
            return String(a[col]).localeCompare(String(b[col])) * dir;
        });
    }

    // Parse LIMIT
    const limitMatch = lower.match(/limit\s+(\d+)/);
    if (limitMatch) rows = rows.slice(0, parseInt(limitMatch[1]));

    // Parse columns
    const selectMatch = query.match(/select\s+(.+?)\s+from/i);
    let columns;
    if (selectMatch && selectMatch[1].trim() !== '*') {
        columns = selectMatch[1].split(',').map(c => c.trim().toLowerCase());
    } else {
        columns = Object.keys(rows[0] || sqlDB[tableName][0]);
    }

    // Filter columns
    const result = rows.map(row => {
        const filtered = {};
        columns.forEach(col => {
            if (row[col] !== undefined) filtered[col] = row[col];
        });
        return filtered;
    });

    return { columns, rows: result, count: result.length };
}

function renderSQLResult(result) {
    const output = document.getElementById('sqlOutput');
    if (result.error) {
        output.innerHTML = `<p class="sql-error">❌ ${result.error}</p>`;
        return;
    }
    if (result.rows.length === 0) {
        output.innerHTML = `<p class="sql-success">Query executed. 0 rows returned.</p>`;
        return;
    }

    let html = `<p class="sql-success">${result.count} row(s) returned</p>`;
    html += '<table class="sql-table"><thead><tr>';
    result.columns.forEach(col => { html += `<th>${col}</th>`; });
    html += '</tr></thead><tbody>';
    result.rows.forEach(row => {
        html += '<tr>';
        result.columns.forEach(col => { html += `<td>${row[col] !== undefined ? row[col] : 'NULL'}</td>`; });
        html += '</tr>';
    });
    html += '</tbody></table>';
    output.innerHTML = html;
}

document.getElementById('runSQL').addEventListener('click', () => {
    const query = document.getElementById('sqlInput').value;
    const result = parseSQL(query);
    renderSQLResult(result);
});

// Allow Ctrl+Enter to run
document.getElementById('sqlInput').addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('runSQL').click();
    }
});

// ===== Fade-in on scroll for all major elements =====
document.querySelectorAll('.project-card, .playground-card, .about-grid, .contact-content').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});
