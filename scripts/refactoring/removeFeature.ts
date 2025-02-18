import { Node, Project, SyntaxKind } from 'ts-morph';
import * as process from 'node:process';

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removedFeatureName) {
    throw new Error('Укажите название фича-флага');
}
if (!featureState) {
    throw new Error('Укажите состояние фичи (on or off)');
}
if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Значение состояния должно быть on или off');
}

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
    let isToggleFunc = false;
    node.forEachChild((child) => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
            isToggleFunc = true;
        }
    });
    return isToggleFunc;
};

files.forEach((file) => {
    file.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

            if (!objectOptions) return;

            const offFuncProperty = objectOptions.getProperty('off');
            const onFuncProperty = objectOptions.getProperty('on');
            const featureNameProperty = objectOptions.getProperty('name');

            const offFunc = offFuncProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const onFunc = onFuncProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const featureName = featureNameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                ?.getText()
                .slice(1, -1);

            if (featureName !== removedFeatureName) return;

            if (featureState === 'off') {
                node.replaceWithText(offFunc?.getBody().getText() ?? '');
            }
            if (featureState === 'on') {
                node.replaceWithText(onFunc?.getBody().getText() ?? '');
            }
        }
    });
});

project.save();
