export function ceilDiv(a, b) {
    const c = a.div(b);
    if (c.eq(a.mul(b))) {
        return c;
    }
    else {
        return c.add(1);
    }
}
//# sourceMappingURL=ceilDiv.js.map