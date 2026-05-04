/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('categories', {
    id: { type: 'UUID', primaryKey: true },
    name: { type: 'VARCHAR(100)', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('categories');
};
