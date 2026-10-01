const {
  getActivityLogs,
} = require("../service/activityLog.service");

const getAll = async (req, res) => {
  try {
    const logs = await getActivityLogs();

    res.status(200).json({
      success: true,
      message: "Data activity log berhasil diambil",
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
};