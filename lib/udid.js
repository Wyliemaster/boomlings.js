function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = class udid {
    udidGen() {
        let udid0 = getRndInteger(268435456, 4294967295).toString(16);
        let udid1 = getRndInteger(4096, 65535).toString(16);
        let udid2 = getRndInteger(4096, 65535).toString(16);
        let udid3 = getRndInteger(4096, 65535).toString(16);
        let udid4 = getRndInteger(68719476736, 1099511627775).toString(16);
        return `${udid0}-${udid1}-${udid2}-${udid3}-${udid4}`;
    }
};
