# owlPost Application
어딘가에 있을, 나만의 펜팔 친구를 찾는 android application.
원하는 시간대에 딱 하루 한 통.
nickname만 아는 낯선 사람과 편지를 주고받으며 서로에 대해 천천히 알아갈 수 있습니다.

## Getting Started
root file은 [app.js](https://github.com/KimJunYoung1/owlPost-server/blob/dev/server/app.js)입니다.
DB schema는 `server/models`에 있으며 routing하는 부분 또한 `server/routes`에 있습니다.
배포된 mongoDB를 연결하는 주소는 [connection.js](https://github.com/KimJunYoung1/owlPost-server/blob/dev/server/models/connection.js) 15번째줄 입니다.
배포환경이 아닌 로컬환경에서 테스트해야한다면 터미널에서 mongoDB를 실행시킨후 url을 `mongodb://localhost:${port}/${DB_NAME}`으로 변경이 필요합니다.

## Prerequisites
프로젝트 시작전 설정이 필요합니다.
만약 새 라이브러리나 모듈을 설치했다면 아래의 명령어를 다시 실행시켜야합니다.
```
npm install
```
## Settings VScode
프로젝트의 코드 통일성을 위해 VScode `settings.json`에 아래의 코드를 추가해야합니다
```
{
  "workbench.colorTheme": "Spirited Away",
  "window.zoomLevel": 1,
  "liveServer.settings.donotShowInfoMsg": true,
  "eslint.autoFixOnSave": true,
  "terminal.integrated.rendererType": "dom",
  "editor.formatOnSave": true,
  "prettier.singleQuote": false,
  "javascript.updateImportsOnFileMove.enabled": "never",
  "javascript.format.enable": false,
  "files.associations": {
    ".gitignore": "ignore"
  },
  "eslint.alwaysShowStatus": true,
  "workbench.sideBar.location": "left",
}
```
## Running the tests
---
먼저 테스트하기전에 [connection.js](https://github.com/KimJunYoung1/owlPost-server/blob/dev/server/models/connection.js) 15번째줄과 [JWT](https://github.com/KimJunYoung1/owlPost-server/blob/dev/server/middleware/jwt.js) 5번, 12번째줄의 `process.env`는 `.bash_profile`에 환경 변수를 등록해주어야 원활하게 테스트가 가능합니다.

로컬환경에서 테스트하기 위해서는 아래의 명령어를 터미널에서 실행시킵니다.
server가 정상적으로 로컬 혹은 배포된 EC2와 연결된다면 [app.js](https://github.com/KimJunYoung1/owlPost-server/blob/dev/server/app.js) 30번째줄의 `success!`라는 콘솔이 터미널에 떠야합니다.
또 server와 mongoDB의 경우 [connection.js](https://github.com/KimJunYoung1/owlPost-server/blob/dev/server/models/connection.js) 15번째줄 `connected to mongod server` 콘솔이 떠야 정상적으로 연결됐음을 알 수 있습니다.
```
npm start
```
그리고 각 path에 대한 API 요청 테스트는 Postman에서 합니다.
테스트 방법은 해당 url [Postman](https://meetup.toast.com/posts/107)을 참고해주시기 바랍니다.

## Built With
- [Node.js](https://nodejs.org/ko/)
- [Express.js](https://expressjs.com/ko/) - 기본 웹 프레임워크
- [mongoDB](https://www.mongodb.com/)
- [mongoose](https://mongoosejs.com/) - ODM
- [AWS EC2](https://aws.amazon.com/ko/ec2/)
