const ActivityLog = require("../model/activityLog.model");

const createActivityLog = async ({
  userId,
  action,
  resource,
  resourceId = null,
}) => {
  const activityLog = await ActivityLog.create({
    user: userId,
    action,
    resource,
    resource_id: resourceId,
    created_by: userId,
    updated_by: userId,
    archived: false,
  });

  return activityLog;
};

const getActivityLogs = async () => {
  return await ActivityLog.find({
    archived: false,
  }).sort({ created_at: -1 });
};

module.exports = {
  createActivityLog,
  getActivityLogs,
};