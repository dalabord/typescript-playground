module.exports = {
    devtool: 'inline-source-map',
    entry: "./main.ts",
    context: __dirname, // identifier tsconfig.json automatiquement
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
        { test: /\.tsx?$/, // ts & tsx gérés
            loader: 'ts-loader',
            options: {
              transpileOnly: true 
            } 
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
    ]}
};
