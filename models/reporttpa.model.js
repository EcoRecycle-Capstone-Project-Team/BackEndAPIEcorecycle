module.exports = (sequelize, Sequelize) => {
  const Pelaporan = sequelize.define(
    "reports_tpa",
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
      jenis_lokasi: {
        type: Sequelize.ENUM("TPA", "Bank Sampah"),
        allowNull: false,
      },
      nama_lokasi: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      kota: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      kode_pos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      provinsi: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      latitude: {
        type: Sequelize.STRING(225),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.STRING(225),
        allowNull: true,
      },
      img_tpa: {
        type: Sequelize.STRING(225),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(45),
        allowNull: true,
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

  return Pelaporan;
};
