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
  pgm.createTable('users', {
    id: { type: 'UUID', primaryKey: true },
    name: { type: 'VARCHAR(100)' },
    email: { type: 'VARCHAR(100)', unique: true },
    password: { type: 'TEXT' },
    created_at: { type: 'TIMESTAMP', default: pgm.func('CURRENT_TIMESTAMP') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};