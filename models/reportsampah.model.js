module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define(
    "report",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      nama_pelapor: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      no_tlp: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      kota: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      kode_pos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tgl_lapor: {
        type: Sequelize.STRING(225),
        allowNull: true,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      img_bukti: {
        type: Sequelize.STRING(225),
        allowNull: true,
      },
      latitude: {
        type: Sequelize.STRING(225),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.STRING(225),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("pending", "in_progress", "resolved"),
        defaultValue: "pending",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  return Report;
};
