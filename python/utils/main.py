def dump_schema(obj, indent="", seen=None, colorize=1):
    if seen is None:
        seen = set()

    colors = {
        'reset': "\033[0m",
        'red': "\033[31m",
        'green': "\033[32m",
        'yellow': "\033[33m",
        'blue': "\033[34m",
        'magenta': "\033[35m",
    }

    def apply_color(text, code):
        return f"{colors[code]}{text}{colors['reset']}" if colorize else text

    if obj is None:
        return apply_color("None", 'red')
    if isinstance(obj, str):
        return apply_color(f"\"{obj[:50]}{'...' if len(obj) > 50 else ''}\"", 'green')
    if not isinstance(obj, (dict, list)):
        return apply_color(str(type(obj).__name__), 'yellow')

    if id(obj) in seen:
        return apply_color("Circular reference detected", 'red')
    seen.add(id(obj))

    schema = ""
    if isinstance(obj, list):
        if obj:
            schema += "\n" + indent + "  ├─ [0]: " + dump_schema(obj[0], indent + "  │  ", seen.copy(), colorize)
            if len(obj) > 1:
                schema += "\n" + indent + "  └─ ...and " + str(len(obj) - 1) + " more items"
        else:
            schema += " (Empty)"
    else:
        keys = obj.keys()
        for index, key in enumerate(keys):
            is_last = index == len(keys) - 1
            connector = "  └─ " if is_last else "  ├─ "
            continuation_indent = "    " if is_last else "  │  "
            value = obj[key]
            value_type = "list" if isinstance(value, list) else type(value).__name__

            schema += "\n" + indent + connector + apply_color(key, 'blue') + " (" + apply_color(value_type, 'yellow') + "):"
            if isinstance(value, (dict, list)):
                child_schema = dump_schema(value, indent + continuation_indent, seen.copy(), colorize)
                schema += child_schema if child_schema.startswith("\n") else " " + child_schema
            else:
                if isinstance(value, str):
                    value = value.replace("\n", "").replace("\r", "").replace("\t", "")
                    value = f"\"{value[:50]}{'...' if len(value) > 50 else ''}\""
                schema += " " + apply_color(value, 'green')

    return schema
