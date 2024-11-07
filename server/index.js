const express = require('express');
const cors = require('cors');
const userRoutes = require('./UserRoutes');
const db = require('./db'); // 모듈화된 DB 연결 코드 가져오기

const app = express();
const port = 3000;


// CORS 설정
app.use(cors());
app.use(express.json()); // JSON 형식의 요청 본문 파싱

// 사용자 데이터를 가져오는 API
app.get('/api/users', (req, res) => {
    const sql = 'SELECT User_name, ID, PW FROM Test';  // DB에서 데이터를 가져오는 쿼리
    db.query(sql, (err, result) => {
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            return res.status(500).send(err); // 에러 발생 시 500 에러 응답
        }
        res.json(result);  // 쿼리 결과를 JSON 형식으로 응답
    });
});


exports.signup = async (req, res) => {
    const { userID, userPW } = req.body;

    try {
        const getUser = await userDB.getUser(userID);
        if (getUser.length) {
            res.status(401).json('이미 존재하는 아이디입니다.');
            return;
        }

        const hash = await textToHash(userPW);
        const signUp = await userDB.signUp([userID, hash]);
        res.status(200).json('가입 성공');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// 서버 실행
app.listen(port, '0.0.0.0', () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});