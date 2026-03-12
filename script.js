// Plant stages configuration
const STAGES = [
    { emoji: '', name: 'tierra', threshold: 0 },
    { emoji: '\u{1F331}', name: 'brote', threshold: 1 },
    { emoji: '\u{1F33F}', name: 'planta', threshold: 5 },
    { emoji: '\u{1F333}', name: 'arbol', threshold: 10 }
];

// State
let habits = [];

// DOM Elements
const habitInput = document.getElementById('habitInput');
const addBtn = document.getElementById('addBtn');
const habitsGrid = document.getElementById('habitsGrid');
const totalHabitsEl = document.getElementById('totalHabits');
const totalWatersEl = document.getElementById('totalWaters');
const totalTreesEl = document.getElementById('totalTrees');

// Initialize
function init() {
    loadHabits();
    renderHabits();
    updateStats();
    setupEventListeners();
}

// LocalStorage
function loadHabits() {
    const stored = localStorage.getItem('gardenHabits');
    if (stored) {
        try {
            habits = JSON.parse(stored);
        } catch (e) {
            habits = [];
        }
    }
}

function saveHabits() {
    localStorage.setItem('gardenHabits', JSON.stringify(habits));
}

// Get current stage based on water count
function getStage(waterCount) {
    let currentStage = STAGES[0];
    let nextStage = STAGES[1];

    for (let i = STAGES.length - 1; i >= 0; i--) {
        if (waterCount >= STAGES[i].threshold) {
            currentStage = STAGES[i];
            nextStage = STAGES[i + 1] || STAGES[i];
            break;
        }
    }

    return { currentStage, nextStage };
}

// Calculate progress percentage
function getProgress(waterCount) {
    const { currentStage, nextStage } = getStage(waterCount);

    if (currentStage.threshold === nextStage.threshold) {
        return 100;
    }

    const progress = ((waterCount - currentStage.threshold) / (nextStage.threshold - currentStage.threshold)) * 100;
    return Math.min(Math.max(progress, 0), 100);
}

// Create habit card HTML
function createHabitCard(habit, animate = false) {
    const { currentStage, nextStage } = getStage(habit.waterCount);
    const progress = getProgress(habit.waterCount);
    const isMaxStage = currentStage.threshold === nextStage.threshold;

    const card = document.createElement('article');
    card.className = `habit-card${animate ? ' card-enter' : ''}`;
    card.dataset.id = habit.id;
    card.setAttribute('role', 'listitem');

    card.innerHTML = `
        <div class="card-header">
            <h3 class="habit-name">${escapeHtml(habit.name)}</h3>
            <button class="btn-delete" aria-label="Eliminar habito ${escapeHtml(habit.name)}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
            </button>
        </div>
        
        <div class="plant-container">
            <div class="plant-display" data-water-count="${habit.waterCount}">
                ${currentStage.emoji}
            </div>
            <div class="pot"></div>
        </div>

        <div class="progress-section">
            <div class="progress-info">
                <span class="water-count">${habit.waterCount} riegos</span>
                <span class="next-stage">
                    ${isMaxStage ? 'Maximo alcanzado' : `${nextStage.name} en ${nextStage.threshold - habit.waterCount}`}
                </span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>

        <button class="btn-water" aria-label="Regar ${escapeHtml(habit.name)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
            </svg>
            Regar
        </button>
    `;

    return card;
}

// Render all habits
function renderHabits() {
    habitsGrid.innerHTML = '';

    if (habits.length === 0) {
        habitsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"></div>
                <h3 class="empty-title">Tu jardin esta vacio</h3>
                <p class="empty-text">Planta tu primer habito para comenzar a cultivar</p>
            </div>
        `;
        return;
    }

    habits.forEach(habit => {
        const card = createHabitCard(habit);
        habitsGrid.appendChild(card);
    });
}

// Add new habit
function addHabit(name) {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const habit = {
        id: Date.now().toString(),
        name: trimmedName,
        waterCount: 0,
        createdAt: new Date().toISOString()
    };

    habits.unshift(habit);
    saveHabits();

    // Add card with animation
    const emptyState = habitsGrid.querySelector('.empty-state');
    if (emptyState) {
        habitsGrid.innerHTML = '';
    }

    const card = createHabitCard(habit, true);
    habitsGrid.insertBefore(card, habitsGrid.firstChild);

    updateStats();
    habitInput.value = '';
}

// Water habit
function waterHabit(id) {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const oldStage = getStage(habit.waterCount).currentStage;
    habit.waterCount++;
    saveHabits();

    const newStage = getStage(habit.waterCount).currentStage;
    const card = habitsGrid.querySelector(`[data-id="${id}"]`);

    if (card) {
        // Update plant display
        const plantDisplay = card.querySelector('.plant-display');
        plantDisplay.textContent = newStage.emoji;
        plantDisplay.dataset.waterCount = habit.waterCount;

        // Animate if stage changed
        if (oldStage.threshold !== newStage.threshold) {
            plantDisplay.classList.add('growing');
            setTimeout(() => {
                plantDisplay.classList.remove('growing');
            }, 600);
        }

        // Update progress
        const { nextStage } = getStage(habit.waterCount);
        const progress = getProgress(habit.waterCount);
        const isMaxStage = newStage.threshold === nextStage.threshold;

        card.querySelector('.water-count').textContent = `${habit.waterCount} riegos`;
        card.querySelector('.next-stage').textContent = isMaxStage 
            ? 'Maximo alcanzado' 
            : `${nextStage.name} en ${nextStage.threshold - habit.waterCount}`;
        card.querySelector('.progress-fill').style.width = `${progress}%`;

        // Create water drop animation
        createWaterDrop(card);
    }

    updateStats();
}

// Delete habit
function deleteHabit(id) {
    habits = habits.filter(h => h.id !== id);
    saveHabits();

    const card = habitsGrid.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
            card.remove();
            if (habits.length === 0) {
                renderHabits();
            }
        }, 300);
    }

    updateStats();
}

// Create water drop animation
function createWaterDrop(card) {
    const btn = card.querySelector('.btn-water');
    const rect = btn.getBoundingClientRect();

    const drop = document.createElement('div');
    drop.className = 'water-drop';
    drop.innerHTML = '\u{1F4A7}';
    drop.style.cssText = `
        left: ${rect.left + rect.width / 2 - 10}px;
        top: ${rect.top - 30}px;
        font-size: 20px;
    `;

    document.body.appendChild(drop);

    setTimeout(() => {
        drop.remove();
    }, 800);
}

// Update stats
function updateStats() {
    const totalWaters = habits.reduce((sum, h) => sum + h.waterCount, 0);
    const totalTrees = habits.filter(h => h.waterCount >= 10).length;

    totalHabitsEl.textContent = habits.length;
    totalWatersEl.textContent = totalWaters;
    totalTreesEl.textContent = totalTrees;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listeners
function setupEventListeners() {
    // Add habit
    addBtn.addEventListener('click', () => {
        addHabit(habitInput.value);
    });

    habitInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addHabit(habitInput.value);
        }
    });

    // Water and delete (event delegation)
    habitsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.habit-card');
        if (!card) return;

        const id = card.dataset.id;

        if (e.target.closest('.btn-water')) {
            waterHabit(id);
        } else if (e.target.closest('.btn-delete')) {
            deleteHabit(id);
        }
    });
}

// Initialize app
init();
