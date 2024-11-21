const express = require('express');
const cors = require('cors');
const db = require('./db'); // 모듈화된 DB 연결 코드 가져오기

const app = express();
const port = 3000;


// CORS 설정
app.use(cors({
    origin: 'http://localhost:3001', // 클라이언트 도메인
    methods: ['GET', 'POST', 'DELETE'], // 허용할 메소드
    allowedHeaders: ['Content-Type'],
    credentials: true // 클라이언트 쿠키 허용
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

app.post('/api/loginCheck', async (req, res) => {
    const { userID, userPW } = req.body;

    try {
        // 1. 세션 테이블 확인
        const checkSessionSql = 'SELECT * FROM session';
        db.query(checkSessionSql, (err, sessionResults) => {
            if (err) {
                console.error('세션 확인 쿼리 오류:', err);
                return res.status(500).json({ message: '로그인 상태 확인 중 오류 발생' });
            }

            if (sessionResults.length > 0) {
                // 세션이 존재하면 로그인을 차단
                return res.status(400).json({ message: '이미 다른 계정으로 로그인되어 있습니다.' });
            }

            // 2. 아이디와 비밀번호 확인
            const sql = 'SELECT * FROM Test WHERE ID = ? AND PW = ?';
            db.query(sql, [userID, userPW], (err, result) => {
                if (err) {
                    console.error('로그인 쿼리 오류:', err);
                    return res.status(500).json({ message: '로그인 오류' });
                }

                if (result.length > 0) {
                    // 세션 테이블에 데이터 삽입
                    const insertSessionSql = 'INSERT INTO session (user_id, user_name) VALUES (?, ?)';
                    db.query(insertSessionSql, [userID, result[0].User_name], (err) => {
                        if (err) {
                            console.error('세션 저장 오류:', err);
                            return res.status(500).json({ message: '세션 저장 오류' });
                        }

                        res.status(200).json({ message: '로그인 성공' });
                    });
                } else {
                    res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
                }
            });
        });
    } catch (err) {
        console.error('로그인 처리 중 오류:', err);
        res.status(500).json({ message: '로그인 처리 중 문제가 발생했습니다.' });
    }
});

app.get('/api/sessionCheck', (req, res) => {
    const sql = 'SELECT * FROM session';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('세션 확인 오류:', err);
            return res.status(500).json({ message: '서버 오류로 인해 세션 확인에 실패했습니다.' });
        }

        if (results.length > 0) {
            // 세션 테이블에 데이터가 존재하면 이미 로그인 상태
            return res.status(200).json({ message: '이미 로그인 상태입니다.' });
        }

        res.status(200).json({ message: '로그인 가능' });
    });
});


app.delete('/api/logout', (req, res) => {
    // session 테이블의 모든 데이터를 삭제하는 쿼리
    const deleteSessionQuery = 'DELETE FROM session';

    db.query(deleteSessionQuery, (err, result) => {
        if (err) {
            console.error('session 테이블 삭제 오류:', err);
            return res.status(500).json({ message: '서버 오류로 로그아웃 실패' });
        }

        // 로그아웃 성공 응답
        res.status(200).json({ message: '로그아웃 성공, session 테이블 초기화 완료' });
    });
});

// 서버 실행
app.listen(port, '0.0.0.0', () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});