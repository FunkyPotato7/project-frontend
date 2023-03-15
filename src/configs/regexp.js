const regexp = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
};

export {
    regexp
};