const createCore = () => {
    let state = {
        hunger: 0,    // 0 to 100
        hygiene: 100, // 0 to 100
        teeth: 100,   // 0 to 100
        // Derived state, easier to manage here
        isSad: false,
        isDirty: false,
        hasDirtyTeeth: false,
    };

    const subscribers = [];

    const subscribe = (callback) => {
        subscribers.push(callback);
    };

    const notify = () => {
        subscribers.forEach(callback => callback(state));
    };

    const updateDerivedState = () => {
        state.isSad = (state.hunger > 50 || state.hygiene < 50);
        state.isDirty = (state.hygiene < 30);
        state.hasDirtyTeeth = (state.teeth < 40);
    };

    const decay = (elapsed) => {
        const decayRate = (elapsed / 5000); // 1 point per 5 secs
        state.hunger = Math.min(100, state.hunger + decayRate);
        state.hygiene = Math.max(0, state.hygiene - decayRate);
        state.teeth = Math.max(0, state.teeth - decayRate);
        updateDerivedState();
        notify();
    };

    const feed = () => {
        state.hunger = Math.max(0, state.hunger - 20);
        updateDerivedState();
        notify();
    };

    const wash = () => {
        state.hygiene = Math.min(100, state.hygiene + 30);
        updateDerivedState();
        notify();
    };

    const brushTeeth = () => {
        state.teeth = Math.min(100, state.teeth + 40);
        updateDerivedState();
        notify();
    };

    const dress = () => {
        // Future logic
        console.log("Core: Dress action triggered");
        // No state change yet, so no notify()
    };

    const setState = (newState) => {
        state = { ...state, ...newState };
        updateDerivedState();
        notify();
    };

    const getState = () => {
        return state;
    };

    return {
        subscribe,
        decay,
        feed,
        wash,
        brushTeeth,
        dress,
        setState,
        getState
    };
};
