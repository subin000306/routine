const express = require('express');
const router = express.Router();
const db = require('../db'); // DB 연결 코드 가져오기

router.get('/session', (req, res) => {
    const query = `SELECT user_id FROM session LIMIT 1`; // 현재 로그인된 사용자의 세션만 가져오도록 설정
    db.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching session:", error);
            res.status(500).json({ error: "Failed to fetch session data" });
        } else {
            if (results.length > 0) {
                res.json({ user_id: results[0].user_id });
            } else {
                res.status(404).json({ error: "No active session found" });
            }
        }
    });
});

router.post('/purposeupdate', async (req, res) => {
    const { user_id, selectedNumber, content } = req.body;

    if (!user_id || !selectedNumber || !content) {
        return res.status(400).json({ message: "필수 데이터가 누락되었습니다." });
    }

    const columnContent = `purpose_${selectedNumber}_content`;
    const columnTitle = `purpose_${selectedNumber}_title`;

    const query = `
        UPDATE purpose
        SET ${columnContent} = ?, ${columnTitle} = ?
        WHERE user_id = ?
    `;

    try {
        const [result] = await db.execute(query, [content, `목적 ${selectedNumber}`, user_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "업데이트할 데이터가 없습니다." });
        }
        res.status(200).json({ message: "목적 업데이트 성공" });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

router.post('/achieveupdate', async (req, res) => {
    const { user_id, selectedNumber, content } = req.body;

    if (!user_id || !selectedNumber || !content) {
        return res.status(400).json({ message: "필수 데이터가 누락되었습니다." });
    }

    const columnContent = `achieve_${selectedNumber}_content`;
    const columnTitle = `achieve_${selectedNumber}_title`;

    const query = `
        UPDATE achieve
        SET ${columnContent} = ?, ${columnTitle} = ?
        WHERE user_id = ?
    `;

    try {
        const [result] = await db.execute(query, [content, `목표 ${selectedNumber}`, user_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "업데이트할 데이터가 없습니다." });
        }
        res.status(200).json({ message: "목표 업데이트 성공" });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// 목적 데이터 조회 API
router.get('/purposefetch', (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ message: "사용자 ID가 필요합니다." });
    }

    const query = `SELECT purpose_1_content, purpose_2_content, purpose_3_content FROM purpose WHERE user_id = ?`;
    db.query(query, [user_id], (err, result) => {
        if (err) {
            console.error("목적 데이터 조회 실패:", err);
            return res.status(500).json({ message: "서버 오류" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "데이터가 없습니다." });
        }

        const data = result[0];
        res.status(200).json({
            mainGoals: [data.purpose_1_content, data.purpose_2_content, data.purpose_3_content],
        });
    });
});

// 달성 리스트 데이터 조회 API
router.get('/achievefetch', (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ message: "사용자 ID가 필요합니다." });
    }

    const query = `SELECT achieve_1_content, achieve_2_content, achieve_3_content FROM achieve WHERE user_id = ?`;
    db.query(query, [user_id], (err, result) => {
        if (err) {
            console.error("달성 리스트 데이터 조회 실패:", err);
            return res.status(500).json({ message: "서버 오류" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "데이터가 없습니다." });
        }

        const data = result[0];
        res.status(200).json({
            achievedList: [data.achieve_1_content, data.achieve_2_content, data.achieve_3_content],
        });
    });
});

module.exports = router;