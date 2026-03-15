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
  // 1. Ubah nama kolom 'undefined' menjadi 'id'
  pgm.renameColumn("users", "undefined", "id");

  // 2. Sekarang baru kita ubah tipe datanya menjadi varchar(255)
  pgm.alterColumn("users", "id", {
    type: "varchar(255)",
    notNull: true,
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.renameColumn("users", "id", "undefined");
  pgm.alterColumn("users", "undefined", {
    type: "varchar(50)", // Kembalikan ke asal jika perlu
  });
};
