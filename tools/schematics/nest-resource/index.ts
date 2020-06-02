import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
  template,
  externalSchematic,
  Source,
  forEach,
} from '@angular-devkit/schematics';
import { getProjectConfig } from '@nrwl/workspace';
import { strings } from '@angular-devkit/core';
import * as pluralize from 'pluralize';
import * as path from 'path';

function applyWithOverwrite(source: Source, rules: Rule[]): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const rule = mergeWith(
      apply(source, [
        ...rules,
        forEach((fileEntry) => {
          if (tree.exists(fileEntry.path)) {
            tree.overwrite(fileEntry.path, fileEntry.content);
            return null;
          }
          return fileEntry;
        }),
      ])
    );

    return rule(tree, _context);
  };
}

function generateFiles(schema: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('adding NOTES.md to lib');

    const templateSource = applyWithOverwrite(url('./files'), [
      template({
        template: '',
        className: strings.classify(schema.resourceName),
        fileName: strings.dasherize(schema.resourceName),
        attributeName: strings.camelize(schema.resourceName),
        pluralize: pluralize.plural,
        projectName: schema.projectName,
      }),
      move(
        path.join(
          getProjectConfig(tree, schema.projectName).sourceRoot,
          'app',
          strings.dasherize(schema.resourceName)
        )
      ),
    ]);

    return chain([templateSource])(tree, context);
  };
}

export default function (schema: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      externalSchematic('@nestjs/schematics', 'module', {
        name: schema.resourceName,
        language: 'ts',
        sourceRoot: getProjectConfig(tree, schema.projectName).sourceRoot,
        path: 'app',
      }),
      generateFiles(schema),
    ])(tree, context);
  };
}
