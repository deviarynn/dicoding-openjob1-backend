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
  pgm.createTable('bookmarks', {
    id: { type: 'UUID', primaryKey: true },

    user_id: {
      type: 'UUID',
      references: 'users',
      onDelete: 'cascade',
    },

    job_id: {
      type: 'UUID',
      references: 'jobs',
      onDelete: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('bookmarks');
};