const loadConfig = {
    bucket: 'envent-staging',
    region: 'us-east-2',
    toLoad: {
        'script': {
            'ui-inventory': ['runtime.js', 'polyfills.js', 'main.js'],
        },
        'link': {
            'ui-inventory': ['styles.css']
        }
    }
};
Object.entries(loadConfig.toLoad).forEach((configs) => {
    const type = configs[0];
    const segregatedConfigs = configs[1];
    Object.entries(segregatedConfigs).forEach((segregatedConfig) => {
        const folder = segregatedConfig[0];
        const files = segregatedConfig[1];

        const prefix = `https://${loadConfig.bucket}.s3.${loadConfig.region}.amazonaws.com`;

        files.forEach(file => {
            const element = document.createElement(type);
            const path = `${prefix}/${folder}/${file}`;

            if (type === 'link') {
                element.setAttribute('href', path);
                element.setAttribute('rel', 'stylesheet');
                document.head.appendChild(element);
            } else if (type === 'script') {
                element.setAttribute('src', path);
                element.setAttribute('type', 'module');
                document.head.appendChild(element);
            }
        });
    });
});

const l = document.createElement('link');
l.setAttribute('href', "https://fonts.googleapis.com/icon?family=Material+Icons");
l.setAttribute('rel', "stylesheet");
document.head.appendChild(l);
