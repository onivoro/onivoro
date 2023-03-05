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

    public static dropColumn(table: string, option: TableColumnOptions) {
        return `ALTER TABLE "${table}" DROP COLUMN ${option.name}`;
    }

    public static dropColumns(table: string, options: TableColumnOptions[]) {
        return options.map(option => SqlWriter.dropColumn(table, option)).join('; \n');
    }

    public static dropIndex(index: string): string {
        return `DROP INDEX IF EXISTS ${index}`;
    }

    public static createIndex(table: string, column: string, unique: boolean): string {
        const index = SqlWriter.getIndexName(table, column);
        return `CREATE ${unique ? 'UNIQUE' : ''} INDEX IF NOT EXISTS ${index} ON "${table}"(${column})`;
    }

    public static getIndexName(table: string, column: string): string {
        return `${table}_${column}`;
    }

    public static createUniqueIndex(table: string, column: string): string {
        return SqlWriter.createIndex(table, column, true);
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
