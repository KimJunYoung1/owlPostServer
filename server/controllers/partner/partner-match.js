/* eslint-disable */
const USERINFO = require('../../models/userinfo');

module.exports = async (req, res) => {
  const { nickname } = req.query;
  const user = await USERINFO.findOne({ nickname });
  const userinfos = [user.nickname, user.age, user.sex, user.select, user.partner_nickname, user.blackList];
  // 현재 사용하고 있는 유저 정보
  
  const results = await USERINFO.find({}, (err, docs) => {return docs});
  // 모든 유저들의 정보
    
  const partnerNullUserInfos = results.map(partnerInfos => {
    if (partnerInfos.partner_nickname === null) { return [partnerInfos.nickname, partnerInfos.age, partnerInfos.sex, partnerInfos.select, partnerInfos.partner_nickname, partnerInfos.blackList]; }
  });
  // 파트너 닉네임이 null인 모든 유저들의 정보  
  
  const copyRandomSelectUser = [];

      const recur = function () {        
        const randomSelectUser = partnerNullUserInfos[Math.floor(Math.random() * partnerNullUserInfos.length - 1)];
        copyRandomSelectUser.push(randomSelectUser);
        // 0번째인자 닉네임, 1번째인자 남자/여자, 2번째인자 이성/상관없음, 3번째인자 파트너닉네임, 4번째인자 블랙리스트

          const match = function(userNickName, partnerNickName) {
            for(let i = 0; i < userinfos[5].length; i++){
              if(userinfos[5][i] === partnerNickName){
                return recur();
              }
            }
            // 나의 블랙리스트에 상대방이 없는지 확인
            for(let j = 0; j < randomSelectUser[5].length; j++){
              if(randomSelectUser[5][j] === userNickName){
                return recur();
              }
            }
            // 상대방의 블랙리스트에 내가 없는지 확인
            if(userinfos[0] === randomSelectUser[0]){
              return ;
            }
            // 나의 닉네임과 상대방의 닉네임이 같다면 return and 401 error
            if(userinfos[1] !== randomSelectUser[1]){
              return;
            }
            // 나의 나이와 상대방의 나이가 다르다면 return and 400 error
            
            // const partnerNick = partnerNickName;
            // const userNick = userNickName;          
            // userinfos[4] = partnerNick;
            // randomSelectUser[4] = userNick;
            (async () => {
              const me = await USERINFO.findOne({ nickname: userNickName })
              
              await USERINFO.updateOne({ nickname: me.nickname }, { partner_nickname: me.partner_nickname })
              const you = await USERINFO.findOne({ nickname: partnerNickName })
              
              await USERINFO.updateOne({ nickname: you.nickname}, { partner_nickname: you.partner_nickname })
            })();                      
          };
          // 아래 조건문에 따라 매칭을 시켜줄 함수

        if (randomSelectUser !== undefined && userinfos[0] !== randomSelectUser[0]) {
          if (userinfos[3] === false && randomSelectUser[3] === false) {
            // 둘다 상관없을때 매칭

            return match(userinfos[0], randomSelectUser[0]);
          } else if (userinfos[3] === true && userinfos[2] === true && randomSelectUser[2] === false) {
            // 남자인데 이성만 원할때 여자

            return match(userinfos[0], randomSelectUser[0]);
          } else if (userinfos[2] === false && randomSelectUser[3] === true && randomSelectUser[2] === true) {
            // 여자인데 상대방이 이성만 원하고 남자일때

            return match(userinfos[0], randomSelectUser[0]);
          } else if (userinfos[3] === true && userinfos[2] === false && randomSelectUser[2] === true) {
            // 여자인데 이성만 원할때 남자

            return match(userinfos[0], randomSelectUser[0]);
          } else if (userinfos[2] === true && randomSelectUser[3] === true && randomSelectUser[2] === false) {
            // 남자인데 상대방이 이성만 원하고 여자일때

            return match(userinfos[0], randomSelectUser[0]);
          } else if (userinfos[2] === true && userinfos[3] === true && randomSelectUser[2] === false && randomSelectUser[3] && true) {
            // 남자인데 이성만 원하고 여자인데 이성만 원할때

            return match(userinfos[0], randomSelectUser[0]);
          } else {
            return ;
          }
        }           
      };
      recur();    
  
  if(copyRandomSelectUser.length > 0){
    if (userinfos[4] !== null) {      
      res.status(200).json('매칭이 완료되었습니다');
      return;      
    } else if(userinfos[1] !== copyRandomSelectUser[copyRandomSelectUser.length - 1][1]){
      res.status(400).json('매칭이 진행중입니다');
      return;
    } else if(userinfos[0] === copyRandomSelectUser[copyRandomSelectUser.length - 1][0]){
      res.status(401).json('매칭이 진행중입니다');
      return;
    } else {
      res.status(402).json('매칭이 진행중입니다');
      return;
    }
  } else {
    res.status(403).json('매칭이 진행중입니다');
    return;
  }
  
};
// 비동기처리로 인하여 한번씩 sync가 안맞아서 내려가면서 읽는순서가 뒤틀릴때가 존재함, fetch 를 5분에 한번정도씩 요청해서 처리해야 할 듯
