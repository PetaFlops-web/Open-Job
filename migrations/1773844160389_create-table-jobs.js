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
  pgm.createTable("jobs", {
    company_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    category_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    title: {
      type: "VARCHAR(150)",
      notNull: true,
    },
    description: {
      type: "text",
      notNull: true,
    },
    job_type: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    experience_level: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    location_type: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    location_city: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    salary_min: {
      type: "int",
      notNull: true,
    },
    salary_max: {
      type: "int",
      notNull: true,
    },
    is_salary_visible: {
      type: "boolean",
      notNull: true,
    },
    status: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("jobs");
};
