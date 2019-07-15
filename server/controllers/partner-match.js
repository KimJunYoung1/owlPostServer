/* eslint-disable */
const USERINFO = require('../models/userinfo');

module.exports = async (req, res) => {
  const { nickname } = req.query;
  console.log(111111);
  const user = await USERINFO.findOne({ nickname });
  const userinfos = [user.nickname, user.sex, user.select, user.partner_nickname];

  console.log(222222);
  const results = await USERINFO.find({}, (err, docs) => {
    // await을 위해서 어쩔수 없이 넣어줌
    if (!err) {
      const partnerExist = docs.map(users => {
        if (users.partner_nickname === null) { return [users.nickname, users.sex, users.select, user.partner_nickname]; }
      });
      console.log(333333);


      const recur = function () {
        const randomSelectUser = partnerExist[Math.floor(Math.random() * partnerExist.length - 1)];
        // 0번째인자 닉네임, 1번째인자 남자/여자, 2번째인자 이성/상관없음, 3번째인자 파트너닉네임
        console.log('너는 왜 안되니?', randomSelectUser);

        const match = function(userNickName, partnerNickName) {
          console.log('확인을 한번 하자', userNickName, partnerNickName);
          // if else 걸어서 blacklist 에 for문 돌려서 있는사람인지 확인하고 없다면 계속 진행, 있는사람이라면 recur()돌려서 다시 진행시켜야 함
          const partnerNick = partnerNickName;
          const userNick = userNickName;
          userinfos[3] = partnerNick;
          randomSelectUser[3] = userNick;
          (async () => {
            await USERINFO.findOne({ nickname: userNick })
            await USERINFO.updateOne({ nickname: userNick }, { partner_nickname: partnerNick })
            await USERINFO.findOne({ nickname: partnerNick })
            await USERINFO.updateOne({ nickname: partnerNick}, { partner_nickname: userNick })
          })();          
        };
        // 아래 조건문에 따라 매칭을 시켜줄 함수

        if (randomSelectUser !== undefined) {
          if (userinfos[2] === false && randomSelectUser[2] === false) {
            // 둘다 상관없을때 매칭

            match(userinfos[0], randomSelectUser[0]);
          } else if (userinfos[2] === true && userinfos[1] === true && randomSelectUser[1] === false) {
            // 남자인데 이성만 원할때 여자

            match(userinfos[0], randomSelectUser[0]);
          } else if (userinfos[1] === false && randomSelectUser[2] === true && randomSelectUser[1] === true) {
            // 여자인데 상대방이 이성만 원하고 남자일때

            match(userinfos[0], randomSelectUser[0]);
          } else if (userinfos[2] === true && userinfos[1] === false && randomSelectUser[1] === true) {
            // 여자인데 이성만 원할때 남자

            match(userinfos[0], randomSelectUser[0]);
          } else if (userinfos[1] === true && randomSelectUser[2] === true && randomSelectUser[1] === false) {
            // 남자인데 상대방이 이성만 원하고 여자일때

            match(userinfos[0], randomSelectUser[0]);
          } else if (userinfos[1] === true && userinfos[2] === true && randomSelectUser[1] === false && randomSelectUser[2] && true) {
            // 남자인데 이성만 원하고 여자인데 이성만 원할때

            match(userinfos[0], randomSelectUser[0]);
          }
        }
        console.log('userinfos: ', userinfos, 'partnerExist: ', partnerExist, 'randomSelectUser: ', randomSelectUser);
      };
      recur();
      console.log(444444);
    //   process.exit();
    }
  });
  console.log(555555);
  if (userinfos[3] !== null) {
    console.log('who your partner', userinfos);
    res.status(200).json('매칭이 완료되었습니다');
  } else {
    res.status(400).json('매칭이 진행중입니다');
  }
};
// 비동기처리로 인하여 한번씩 sync가 안맞아서 내려가면서 읽는순서가 뒤틀릴때가 존재함, fetch 를 5분에 한번정도씩 요청해서 처리해야 할 듯
