import { TableColumnOptions } from "typeorm";

export class SqlWriter {

    public static addColumn(table, option: TableColumnOptions) {
        const notNullExpression = option.isNullable ? '' : ' NOT NULL ';
        const foreignKey = option.foreignKeyConstraintName ? ` REFERENCES ${option.foreignKeyConstraintName} ` : '';
        return `ALTER TABLE "${table}" ADD "${option.name}" ${option.type}${notNullExpression}${SqlWriter.getDefaultValueExpression(option)}${foreignKey}`;
    }

    public static addColumns(table, options: TableColumnOptions[]) {
        return options.map(option => SqlWriter.addColumn(table, option)).join('; \n');
    }

    public static dropColumn(table, option: TableColumnOptions) {
        return `ALTER TABLE "${table}" DROP COLUMN ${option.name}`;
    }

    public static dropColumns(table, options: TableColumnOptions[]) {
        return options.map(option => SqlWriter.dropColumn(table, option)).join('; \n');
    }

    public static getDefaultValueExpression(option: TableColumnOptions) {
        if (typeof option.default === 'undefined') {
            return '';
        }

        if (['json', 'jsonb'].includes(option.type)) {
            return ` DEFAULT '${JSON.stringify(option.default)}'::${option.type} `;
        }

        if (['boolean', 'bigint', 'int'].includes(option.type)) {
            return ` DEFAULT ${option.default.toString().toUpperCase()} `;
        }

        return ` DEFAULT '${option.default}' `;
    }
}
