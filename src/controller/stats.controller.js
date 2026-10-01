const {
  getSummary,
} = require("../service/stats.service");

const getSummaryStats = async (req, res) => {
  try {
    const stats = await getSummary();

    res.status(200).json({
      success: true,
      message: "Data statistik berhasil diambil",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSummaryStats,
};