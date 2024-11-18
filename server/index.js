const express = require('express');
const cors = require('cors');
const db = require('./db'); // 모듈화된 DB 연결 코드 가져오기

const app = express();
const port = 3000;


// CORS 설정
app.use(cors({
    origin: '*', // 모든 도메인 허용
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
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

app.post('/api/addUser', (req, res) => {
    console.log('POST /api/addUser 호출됨:', req.body);
    const { userID, userPW, userName } = req.body;

    const sql = 'INSERT INTO Test (User_name, ID, PW) VALUES (?, ?, ?)';
    db.query(sql, [userName, userID, userPW], (err, result) => {
        if (err) {
            console.error('데이터베이스 오류:', err);
            return res.status(500).json({ message: '데이터베이스 오류' });
        }
        res.status(200).json({ message: '회원가입 성공!' });
    });
});

app.post('/api/loginCheck', (req, res) => {
    console.log('POST /api/loginCheck 호출됨:', req.body);
    const { userID, userPW } = req.body;

    const sql = 'SELECT * FROM Test WHERE ID = ? AND PW = ?';
    db.query(sql, [userID, userPW], (err, result) => {
        if (err) {
            console.error('로그인 쿼리 오류:', err);
            return res.status(500).json({ message: '로그인 오류' });
        }

        if (result.length > 0) {
            // 로그인 성공 
            res.status(200).json({ message: '로그인 성공', user: result[0] });
        } else {
            res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }
    });
});


// 서버 실행
app.listen(port, '0.0.0.0', () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});