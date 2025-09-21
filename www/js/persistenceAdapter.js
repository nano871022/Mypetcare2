const createPersistenceAdapter = (core) => {
    const STORAGE_KEY = 'tomeGameState';

    const saveState = (state) => {
        // We only want to save the primary stats
        const stateToSave = {
            hunger: state.hunger,
            hygiene: state.hygiene,
            teeth: state.teeth,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    };

    const loadState = () => {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
            core.setState(JSON.parse(savedState));
        }
    };

    const connect = () => {
        // Subscribe to changes from the core to save them
        core.subscribe(saveState);
        // Load the initial state from storage
        loadState();
    };

    return {
        connect
    };
};
