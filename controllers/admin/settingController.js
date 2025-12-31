const Setting = require("../../modules/setting.model");
module.exports.general = async (req, res) => {
  const settingGeneral = await Setting.findOne({});
  res.render("admin/pages/setting/general", {
    pageTitle: "Cài đặt chung",
    settingGeneral: settingGeneral,
  });
};
module.exports.generalPost = async (req, res) => {
  const settingGeneral = await Setting.findOne({});
  if (settingGeneral) {
    await Setting.updateOne({ _id: settingGeneral.id }, req.body);
  } else {
    const record = new Setting(req.body);
    await record.save();
  }
  res.redirect(req.get("Referer"));
};
