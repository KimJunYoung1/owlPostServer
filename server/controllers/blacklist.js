const USERINFO = require('../models/userinfo');

module.exports = async (req, res) => {
  const { nickname } = req.query;

  const userinfos = await USERINFO.findOne({ nickname });

  if (req.decode === userinfos.email) {
    // eslint-disable-next-line max-len
    (async () => {
      // eslint-disable-next-line max-len
      await USERINFO.update({ nickname: userinfos.nickname }, { blackList: userinfos.blackList.concat(userinfos.partner_nickname), partner_nickname: null });

      const partnerInfos = await USERINFO.findOne({ nickname: userinfos.partner_nickname });
      await USERINFO.updateOne({ nickname: partnerInfos.nickname }, { partner_nickname: null });
    })();

    res.status(200).json('블랙리스트에 추가되었습니다');
  } else {
    res.status(400).json('형식이 올바르지 않습니다');
  }
};
