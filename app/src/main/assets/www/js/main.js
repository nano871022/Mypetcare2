window.addEventListener('load', () => {
    // --- Get DOM Elements ---
    const canvas = document.getElementById('game-canvas');
    const feedButton = document.getElementById('feed-button');
    const washButton = document.getElementById('wash-button');
    const brushTeethButton = document.getElementById('brush-teeth-button');
    const dressButton = document.getElementById('dress-button');

    // --- Application Core ---
    const core = createCore();

    // --- Adapters ---
    const canvasAdapter = createCanvasAdapter(canvas, core);
    const persistenceAdapter = createPersistenceAdapter(core);

    // --- Connect Adapters to Core ---
    canvasAdapter.connect();
    persistenceAdapter.connect(); // This also loads the initial state

    // --- Set up Driving Adapters (UI and Timers) ---
    feedButton.addEventListener('click', () => {
        core.feed();
    });

    washButton.addEventListener('click', () => {
        core.wash();
    });

    brushTeethButton.addEventListener('click', () => {
        core.brushTeeth();
    });

    dressButton.addEventListener('click', () => {
        core.dress();
        alert("¡Próximamente! Aún no puedes cambiar la ropa de Tome.");
    });

    // --- Game Loop Timer ---
    let lastUpdate = new Date().getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const elapsed = now - lastUpdate;
        lastUpdate = now;
        core.decay(elapsed);
    }, 1000); // The core is updated every second

    // --- Initial Render ---
    // The persistence adapter loads the state, which triggers a notification,
    // which in turn triggers the first render. So, a manual first render isn't strictly needed,
    // but it can prevent a flicker on first load.
    canvasAdapter.render(core.getState());
});
