import React, { useState, useEffect } from "react";
import { useNavigation } from "../../hooks/navigation";
import styled from "styled-components";
import { primaryColor, textColor, buttontextColor, secondaryColor } from "../../styles/colors";
import login from "../../assets/img/login.png"; 

function Header() {
    const navigation = useNavigation();
    const [currentPage, setCurrentPage] = useState(null);

    const routesMap = {
        "/": { name: "home", action: navigation.goToHome },
        "/purpose": { name: "prupose", action: navigation.goToPurpose },
        "/routine": { name: "routine", action: navigation.goToRoutine },
        "/typetest": { name: "test", action: navigation.goToTypeTest },
        "/typetest/result": { name: "test", action: navigation.goToTestResult },
        "/mypage": { name: "mypage", action: navigation.goToMypage },
        "/signin": { name: "signin", action: navigation.goToSignIn },
    };

    useEffect(() => {
        setCurrentPage(routesMap[window.location.pathname]?.name || null);
    }, []);

    const handleNavigation = (path) => {
        const route = routesMap[path];
        if (route) {
            route.action();
            setCurrentPage(route.name);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/sessionCheck", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // 쿠키/세션 포함
            });
    
            const result = await response.json();
    
            if (response.ok && result.message === '이미 로그인 상태입니다.') {
                alert(result.message); // 이미 로그인 상태일 경우 알림
            } else if (response.ok) {
                // 로그인 가능하면 로그인 페이지로 이동
                handleNavigation("/signin");
            } else {
                alert("로그인 상태 확인 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("로그인 상태 확인 중 오류 발생:", error);
            alert("로그인 상태 확인 중 오류가 발생했습니다.");
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                alert('로그아웃 성공');
                navigation.goToHome(); // 메인 페이지로 이동
            } else {
                const result = await response.json();
                alert(`로그아웃 실패: ${result.message}`);
            }
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

    return (
        <Wrap>
            <HeaderWrap>
                <NavWrap>
                    <FirstUl>
                    <FirstLi
                            onClick={() => handleNavigation("/")}
                            isClickable={true}
                            isActive={currentPage === "home"}
                        >
                            홈
                    </FirstLi>
                    <Divider />
                    <FirstLi
                            isClickable={false}
                            isActive={currentPage === "test"}
                        >
                            유형검사
                            <SecondUl>
                                <SecondLi
                                    onClick={() => handleNavigation("/typetest")}
                                >
                                    Test
                                </SecondLi>
                                <SecondLi
                                    onClick={() => handleNavigation("/typetest/result")}
                                >
                                    결과보기
                                </SecondLi>
                            </SecondUl>
                        </FirstLi>
                        <Divider />
                        <FirstLi
                            onClick={() => handleNavigation("/purpose")}
                            isClickable={true}
                            isActive={currentPage === "purpose"}
                        >
                            목적
                        </FirstLi>
                        <Divider />
                        <FirstLi
                            isClickable={true}
                            onClick={() => handleNavigation("/routine")}
                            isActive={currentPage === "routine"}
                        >
                            루틴
                        </FirstLi>
                        <Divider />
                        <FirstLi
                            isClickable={true}
                            onClick={() => handleNavigation("/mypage")}
                            isActive={currentPage === "mypage"}
                        >
                            마이페이지
                        </FirstLi>
                    </FirstUl>
                </NavWrap>
                <ButtonWrap>
                    <LoginIcon src={login} alt="login" />
                    <SignButton onClick={handleLogin}>로그인</SignButton>
                    <SignButton onClick={handleLogout}>로그아웃</SignButton>
                </ButtonWrap>
            </HeaderWrap>
        </Wrap>
    );
}

export default Header;

const Wrap = styled.div`
    background-color: ${secondaryColor};
`;

const HeaderWrap = styled.header`
    display: flex;
    justify-content: space-between;
    height: 90px;
    width: 1280px;
    margin: 0 auto;
`;

const NavWrap = styled.nav`
    & li {
        text-align: center;
    }
`;

const FirstUl = styled.ul`
    display: flex;
    align-items: center;
    height: 100%;
`;

const FirstLi = styled(({ isClickable, isActive, ...rest }) => (
    <li {...rest} />
))`
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;
    padding: 0 30px;
    cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: ${primaryColor};
        transform: scaleX(0);
        transform-origin: bottom right;
        ${({ isActive }) =>
            isActive &&
            `
            transform: scaleX(1);
            transform-origin: bottom left;
        `}
    }

    &:hover {
        &::before {
            transform: scaleX(1);
            transform-origin: bottom left;
        }
    }
`;

const Divider = styled.div`
    align-self: center;
    width: 2px;
    height: 2px;
    background-color: #000;
    border-radius: 50%;
    margin: 0 10px;

`;

const SecondUl = styled.ul`
    width: 150%;
    position: absolute;
    top: 100%;
    left: 50%;
    background: #fff;
    visibility: hidden;
    opacity: 0;
    transform: translate(-50%, -10px);
    transition: opacity 0.3s, transform 0.3s;

    ${FirstLi}:hover & {
        visibility: visible;
        opacity: 1;
        transform: translate(-50%, 0px);
    }

`;

const SecondLi = styled.li`
    padding: 15px 0;
    cursor: pointer;

`;

const ButtonWrap = styled.div`
    display: flex;
    align-items: center;
    height: 100%;

`;

const LoginIcon = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 8px;
    
`;

const SignButton = styled.button`
    background-color: transparent;
    color: ${textColor};

    &:last-of-type {
        margin-left: 20px;
    }
`;