:root {
    --bg-deep: #0a0f0a;
    --bg-base: #0d1a0d;
    --bg-elevated: #132413;
    --card-bg: #1a2f1a;
    --card-border: #2d4a2d;
    --fg: #e8f0e8;
    --fg-muted: #7a9a7a;
    --accent-lime: #84cc16;
    --accent-emerald: #10b981;
    --accent-forest: #22863a;
    --accent-glow: rgba(132, 204, 22, 0.25);
    --shadow-green: rgba(34, 134, 58, 0.3);
    --soil-dark: #1a1208;
    --soil-light: #2d2010;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Source Sans 3', sans-serif;
    background: var(--bg-deep);
    color: var(--fg);
    min-height: 100vh;
    line-height: 1.6;
    overflow-x: hidden;
}

/* Background */
.bg-gradient {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: 
        radial-gradient(ellipse 100% 70% at 50% 100%, rgba(34, 134, 58, 0.15) 0%, transparent 60%),
        radial-gradient(ellipse 80% 50% at 20% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse 60% 40% at 80% 30%, rgba(132, 204, 22, 0.06) 0%, transparent 50%),
        linear-gradient(180deg, var(--bg-deep) 0%, var(--soil-dark) 100%);
}

.bg-pattern {
    position: fixed;
    inset: 0;
    z-index: 0;
    opacity: 0.04;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='2' fill='%2322863a'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%2384cc16'/%3E%3Ccircle cx='70' cy='70' r='1' fill='%2310b981'/%3E%3C/svg%3E");
}

/* Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(10, 15, 10, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    opacity: 1;
    visibility: visible;
    transition: all 0.4s ease;
}

.modal-overlay.hidden {
    opacity: 0;
    visibility: hidden;
}

.modal {
    background: var(--bg-elevated);
    border: 1px solid var(--card-border);
    border-radius: 24px;
    padding: 2.5rem;
    max-width: 400px;
    width: 100%;
    text-align: center;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5), 0 0 60px var(--shadow-green);
}

.modal-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 1.5rem;
    background: linear-gradient(135deg, var(--accent-forest), var(--accent-emerald));
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-icon svg {
    width: 36px;
    height: 36px;
    color: var(--fg);
}

.modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 0.5rem;
}

.modal-text {
    color: var(--fg-muted);
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
}

.modal-input {
    width: 100%;
    padding: 1rem 1.25rem;
    background: var(--bg-base);
    border: 2px solid var(--card-border);
    border-radius: 12px;
    color: var(--fg);
    font-size: 1rem;
    font-family: inherit;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
}

.modal-input:focus {
    outline: none;
    border-color: var(--accent-lime);
    box-shadow: 0 0 0 4px var(--accent-glow);
}

.modal-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, var(--accent-lime), var(--accent-emerald));
    border: none;
    border-radius: 12px;
    color: var(--bg-deep);
    font-size: 1rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
}

.modal-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px var(--shadow-green);
}

/* Alert */
.alert-overlay {
    position: fixed;
    inset: 0;
    z-index: 1100;
    background: rgba(10, 15, 10, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.alert-overlay.visible {
    opacity: 1;
    visibility: visible;
}

.alert-box {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 2rem;
    max-width: 320px;
    width: 100%;
    text-align: center;
}

.alert-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    background: rgba(251, 191, 36, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.alert-icon svg {
    width: 24px;
    height: 24px;
    color: #fbbf24;
}

.alert-text {
    color: var(--fg);
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.alert-btn {
    padding: 0.75rem 2rem;
    background: var(--bg-elevated);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    color: var(--fg);
    font-size: 0.9rem;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
}

.alert-btn:hover {
    background: var(--card-bg);
}

/* Container */
.container {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
}

/* Header */
header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-top: 1.5rem;
}

h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 7vw, 3.5rem);
    font-weight: 700;
    color: var(--fg);
    letter-spacing: -0.02em;
}

.garden-subtitle {
    font-size: 1.2rem;
    color: var(--fg-muted);
    margin-top: 0.5rem;
}

.garden-subtitle span {
    color: var(--accent-lime);
    font-weight: 600;
}

/* Input Section */
.input-section {
    background: var(--bg-elevated);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 2rem;
}

.input-wrapper {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.input-wrapper input {
    flex: 1;
    min-width: 200px;
    padding: 0.875rem 1rem;
    background: var(--bg-base);
    border: 2px solid var(--card-border);
    border-radius: 10px;
    color: var(--fg);
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s ease;
}

.input-wrapper input::placeholder {
    color: var(--fg-muted);
}

.input-wrapper input:focus {
    outline: none;
    border-color: var(--accent-lime);
    box-shadow: 0 0 0 3px var(--accent-glow);
}

.btn-add {
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, var(--accent-forest), var(--accent-emerald));
    border: none;
    border-radius: 10px;
    color: var(--fg);
    font-size: 0.95rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-green);
}

.btn-add:focus-visible {
    outline: 2px solid var(--accent-lime);
    outline-offset: 2px;
}

/* Stats */
.stats-bar {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.stat {
    text-align: center;
    padding: 1rem 1.25rem;
    background: var(--bg-elevated);
    border-radius: 12px;
    border: 1px solid var(--card-border);
    min-width: 100px;
}

.stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--accent-lime);
}

.stat-label {
    font-size: 0.8rem;
    color: var(--fg-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

/* Habits Section */
.habits-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    color: var(--fg);
}

.habits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
}

/* Habit Card */
.habit-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.25rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.habit-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-forest), var(--accent-lime));
    opacity: 0;
    transition: opacity 0.3s ease;
}

.habit-card:hover::before {
    opacity: 1;
}

.habit-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 30px var(--shadow-green);
}

.habit-card.consolidated {
    border-color: var(--accent-lime);
    box-shadow: 0 0 40px var(--accent-glow);
}

.habit-card.consolidated::before {
    opacity: 1;
    background: linear-gradient(90deg, #fbbf24, var(--accent-lime));
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.habit-name {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--fg);
    word-break: break-word;
    padding-right: 0.5rem;
}

.btn-delete {
    width: 28px;
    height: 28px;
    border: none;
    background: rgba(239, 68, 68, 0.1);
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.btn-delete:hover {
    background: rgba(239, 68, 68, 0.2);
}

.btn-delete svg {
    width: 14px;
    height: 14px;
    color: #ef4444;
}

/* Plant Display */
.plant-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
}

.plant-emoji {
    font-size: 3.5rem;
    line-height: 1;
    margin-bottom: 0.25rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
    transition: transform 0.1s ease;
}

.plant-emoji.growing {
    animation: plantGrow 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes plantGrow {
    0% { transform: scale(1) rotate(0deg); }
    30% { transform: scale(1.25) rotate(-5deg); }
    50% { transform: scale(1.15) rotate(5deg); }
    70% { transform: scale(1.1) rotate(-3deg); }
    100% { transform: scale(1) rotate(0deg); }
}

.pot {
    width: 70px;
    height: 40px;
    background: linear-gradient(180deg, var(--soil-light) 0%, var(--soil-dark) 100%);
    border-radius: 0 0 16px 16px;
    position: relative;
    box-shadow: inset 0 -8px 16px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3);
}

.pot::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -4px;
    right: -4px;
    height: 10px;
    background: linear-gradient(180deg, #4a3520, var(--soil-light));
    border-radius: 3px;
}

/* Progress */
.progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
}

.days-count {
    color: var(--fg-muted);
}

.stage-name {
    color: var(--accent-lime);
    font-weight: 500;
}

.progress-bar {
    height: 5px;
    background: var(--bg-base);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-emerald), var(--accent-lime));
    border-radius: 3px;
    transition: width 0.5s ease;
}

/* Water Button */
.btn-water {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(135deg, var(--accent-emerald), var(--accent-forest));
    border: none;
    border-radius: 10px;
    color: var(--fg);
    font-size: 0.9rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.btn-water:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-green);
}

.btn-water:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--bg-elevated);
}

.btn-water svg {
    width: 18px;
    height: 18px;
}

.watered-today {
    font-size: 0.75rem;
    color: var(--fg-muted);
    text-align: center;
    margin-top: 0.5rem;
    font-style: italic;
}

/* Empty State */
.empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 3rem 2rem;
    background: var(--bg-elevated);
    border: 2px dashed var(--card-border);
    border-radius: 16px;
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.6;
}

.empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.empty-text {
    color: var(--fg-muted);
    font-size: 0.95rem;
}

/* Export Section */
.export-section {
    margin-top: 2.5rem;
    text-align: center;
}

.btn-export {
    padding: 1rem 2rem;
    background: var(--bg-elevated);
    border: 2px solid var(--card-border);
    border-radius: 12px;
    color: var(--fg);
    font-size: 1rem;
    font-weight: 500;
    font-family:
