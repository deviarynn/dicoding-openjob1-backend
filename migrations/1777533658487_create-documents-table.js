exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('documents', {
    id: { type: 'UUID', primaryKey: true },
    user_id: { type: 'UUID', notNull: true, references: 'users', onDelete: 'cascade' },
    filename: { type: 'VARCHAR(200)', notNull: true },
    original_name: { type: 'VARCHAR(200)', notNull: true },
    path: { type: 'TEXT', notNull: true },
    created_at: { type: 'TIMESTAMP', default: pgm.func('CURRENT_TIMESTAMP') },
  });
};

exports.down = (pgm) => { pgm.dropTable('documents'); };
