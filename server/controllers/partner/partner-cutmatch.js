const USERINFO = require('../../models/userinfo');

module.exports = async (req, res) => {
  try {
    const userInfo = await USERINFO.findOne({ email: req.decode });
    if (userInfo.partner_nickname === null) {
      res.status(403).json('matching된 partner가 없습니다.');
    } else if (userInfo.partner_nickname !== null) {
      const partnerInfo = await USERINFO.findOne({ nickname: userInfo.partner_nickname });
      const updateRe = async data => {
        try {
          await USERINFO.updateOne(data, { partner_nickname: null });
          res.status(201).json('partner의 관계가 성공적으로 끊겼습니다.');
        } catch (error) {
          res.status(400).json(`cutmatcherror: ${error}`);
        }
      };
      updateRe(partnerInfo);
      updateRe(userInfo);
    }
  } catch (error) {
    res.status(400).json(`cutmatchfinderror: ${error}`);
  }
};
