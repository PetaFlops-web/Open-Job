/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.addConstraint(
    "jobs",
    "company_id",
    "FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE",
  );
  pgm.addConstraint(
    "jobs",
    "category_id",
    "FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE",
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropConstraint("jobs", "company_id");
  pgm.dropConstraint("jobs", "category_id");
};
