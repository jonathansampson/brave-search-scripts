function dumpSchema(obj, indent = "", seen = new Set(), colorize = 1) {
    const color = {
        reset: "\x1b[0m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
    };

    function applyColor(text, code) {
        return colorize ? `${color[code]}${text}${color.reset}` : text;
    }

    if (obj === null) return applyColor("null", "red");
    if (typeof obj === "string") {
        return applyColor(
            `"${obj.substring(0, 50)}${obj.length > 50 ? "..." : ""}"`,
            "green"
        );
    }
    if (typeof obj !== "object") return applyColor(typeof obj, "yellow");

    if (seen.has(obj)) {
        return applyColor("Circular reference detected", "red");
    }
    seen.add(obj);

    let schema = "";
    const keys = Object.keys(obj);

    if (Array.isArray(obj)) {
        if (obj.length > 0) {
            schema +=
                "\n" +
                indent +
                "  ├─ [0]: " +
                dumpSchema(obj[0], indent + "  │  ", new Set(seen), colorize);
            if (obj.length > 1) {
                schema +=
                    "\n" + indent + "  └─ ...and " + (obj.length - 1) + " more items";
            }
        } else {
            schema += " (Empty)";
        }
    } else {
        keys.forEach((key, index) => {
            const isLast = index === keys.length - 1;
            const connector = isLast ? "  └─ " : "  ├─ ";
            const continuationIndent = isLast ? "    " : "  │  ";
            const value = obj[key];
            const valueType = Array.isArray(value) ? "array" : typeof value;
            const extraDesc = "";

            schema +=
                "\n" +
                indent +
                connector +
                applyColor(key, "blue") +
                " (" +
                applyColor(valueType, "yellow") +
                "):" +
                extraDesc;
            if (typeof value === "object") {
                const childSchema = dumpSchema(
                    value,
                    indent + continuationIndent,
                    new Set(seen),
                    colorize
                );
                schema += childSchema.startsWith("\n")
                    ? childSchema
                    : " " + childSchema;
            } else {
                let newValue = value;

                if (typeof value === "string") {
                    newValue = newValue.replace(/(\n|\r|\t)+(\s+)?/g, "");
                    newValue = `"${newValue.length > 50
                        ? newValue.substring(0, 50) + "..."
                        : newValue
                        }"`;
                }

                schema += " " + applyColor(newValue, "green");
            }
        });
    }

    return schema;
}

module.exports = { dumpSchema };
