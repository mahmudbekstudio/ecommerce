const initRoutes = (list, options = {}) => {
    const result = [];
    options.name = options.name || [];

    for (const item of list) {
        if (Array.isArray(item.children)) {
            const childrenOptions = JSON.parse(JSON.stringify(options));
            item.name && childrenOptions.name.push(item.name);
            item.children = initRoutes(item.children, childrenOptions);
        }

        if (item.name) {
            item.name = [...options.name, item.name].join('.');
        }

        result.push(item);
    }

    return result;
}

export default initRoutes;