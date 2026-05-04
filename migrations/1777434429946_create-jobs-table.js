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
  pgm.createTable('jobs', {
  id: { type: 'UUID', primaryKey: true },

  company_id: {
    type: 'UUID',
    references: 'companies',
    onDelete: 'cascade',
  },

  category_id: {
    type: 'UUID',
    references: 'categories',
    onDelete: 'cascade',
  },

  title: { type: 'VARCHAR(200)' },
  description: { type: 'TEXT' },

  job_type: { type: 'VARCHAR(50)' },
  experience_level: { type: 'VARCHAR(50)' },
  location_type: { type: 'VARCHAR(50)' },
  location_city: { type: 'VARCHAR(100)' },

  salary_min: { type: 'INTEGER' },
  salary_max: { type: 'INTEGER' },

  is_salary_visible: { type: 'BOOLEAN' },
  status: { type: 'VARCHAR(50)' },
});
};

exports.down = (pgm) => {
  pgm.dropTable('jobs');
};