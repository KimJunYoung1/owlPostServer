const USERINFO = require('../../models/userinfo');

module.exports = async (req, res) => {
  try {
    const userInfos = await USERINFO.findOne({ email: req.decode });
    const partnerInfos = await USERINFO.findOne({ nickname: userInfos.partner_nickname });

    if (userInfos === null) {
      res.status(403).json('존재하지 않는 유저 정보입니다.');
    } else {
      await USERINFO.updateOne({ email: partnerInfos.email }, { partner_nickname: null });
      await USERINFO.deleteOne(userInfos);
      res.status(200).json('성공적으로 회원 탈퇴 되었습니다.');
    }
  } catch (error) {
    res.status(400).json(`withdrawalError: ${error}`);
  }
};
