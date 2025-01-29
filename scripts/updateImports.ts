import { Project } from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const isAbsolutePath = (value: string) => {
    const layers = ['app', 'shared', 'widgets', 'features', 'entities', 'pages'];

    return layers.some((layer) => value.startsWith(layer));
};

files.forEach((file) => {
    const importDeclaration = file.getImportDeclarations();
    importDeclaration.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();

        if (isAbsolutePath(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

project.save();
