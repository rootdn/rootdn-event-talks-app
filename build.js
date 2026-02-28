const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// File paths
const htmlFilePath = path.join(srcDir, 'index.html');
const cssFilePath = path.join(srcDir, 'style.css');
const jsFilePath = path.join(srcDir, 'script.js');
const dataFilePath = path.join(srcDir, 'talks.json');
const outputFilePath = path.join(distDir, 'index.html');

async function buildWebsite() {
    try {
        // Read all source files
        let htmlContent = await fs.promises.readFile(htmlFilePath, 'utf8');
        const cssContent = await fs.promises.readFile(cssFilePath, 'utf8');
        const jsContent = await fs.promises.readFile(jsFilePath, 'utf8');
        const talksData = await fs.promises.readFile(dataFilePath, 'utf8');

        // Inject CSS
        htmlContent = htmlContent.replace(
            '    <!-- Styles will be injected here by the build script -->',
            `    <style>
${cssContent}
    </style>`
        );

        // Inject data and script
        const scriptInjection = `
    <script>
        const talksData = ${talksData};
    </script>
    <script>
${jsContent}
    </script>
        `;
        htmlContent = htmlContent.replace(
            '    <!-- Scripts will be injected here by the build script -->',
            scriptInjection
        );

        // Write the final HTML to the dist directory
        await fs.promises.writeFile(outputFilePath, htmlContent, 'utf8');
        console.log('Successfully built website to dist/index.html');
    } catch (error) {
        console.error('Error during website build:', error);
        process.exit(1);
    }
}

buildWebsite();
