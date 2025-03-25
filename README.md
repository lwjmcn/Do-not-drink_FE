# Do not drink 프로젝트 - 프론트엔드 

[[Project Page](https://do-not-drink.vercel.app)] 


## 목차
  * [Overview](#overview)
  * [Tech Stack](#tech-stack)
  * [Implementation](#implementation)
    * [폴더 구조 설계](#폴더-구조-설계)
    * [Authentication](#authentication)
    * [API 연동](#api-연동)
    * [CSS](#css)
    * [Theme](#theme)
    * [3D Object 렌더링](#3d-object-렌더링)
    * [반응형 디자인](#반응형-디자인)
    * [카메라 사용과 Video 최적화](#카메라-사용과-video-최적화)
    * [공통 컴포넌트](#공통-컴포넌트)
    * [메타데이터](#메타데이터)
    * [웹뷰 앱](#웹뷰-앱)



## Overview

" 음료수 한 입, 동전 한닢
DO NOT DRINK라는 

코드에 대한 간단한 설명 ...어쩌구

## Tech Stack

Next.js 15.1.6
React 19.0.0
Typescript

Three.js
axios
Mui

## Implementation

개발을 현재까지 진행하면서 고민했던 부분들을 간단히 정리했다.

### 폴더 구조 설계
https://devocean.sk.com/blog/techBoardDetail.do?ID=165995&boardType=techBlog
https://velog.io/@529539/Nextjs14-TypeScript-Project-Setting-Structure
-> 내용 정리하기
- Next15 App router
- MainLayout 컴포넌트에서 flex layout과 copyright 컴포넌트를 정의함
- _api 구조
- public 구조
- _component 구조 : common, 페이지별, 중요 컴포넌트별

### Authentication
처음에는 NextAuth를 사용하여 소셜 로그인을 먼저 구현했다.
https://dev.to/shieldstring/nextjs-15-authentication-1al7#overview-of-authentication-in-nextjs-15
-> 조금 설명

그러나 자체 회원가입과 소셜 회원가입의 통합 등을 고려하여 모든 인증 과정을 백엔드 파트로 옮기고, 프론트엔드에서는 Form 처리와 redirect 및 routhing 처리를 중점적으로 했다.

1. Routing: middleware.ts에서 public/protected route 구현, cookie의 accessToken 존재 여부를 검사하여 접근하지 못 하게 함
2. Authentication - JWT access token (refresh token은 유저편의성 면에서 좋으나 보안상 이점은 없는 듯하여 추후 버전으로 미룸) + spring security, OAuth2.0
3. react-hook-form 처음에 mui로 구현하다가 폼의 코드 길이가 너무 길어져 가독성이 떨어져서 도입함.  → zod resolver로 validation
4. JWT HTTPOnly 쿠키에 저장하기→ server action으로
 https://23life.tistory.com/entry/next-js-server-component%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-1
  - 로컬 스토리지나 쿠키에 저장하면 Javascript 공격에 취약함
  - 프론트엔드에서는 `fetch` 요청마다 `credentials: "include"` 추가, `interceptor`로 헤더에 쿠키의 accessToken 추가
  - cookies util 추가, “use server”;
  - 로그아웃 시 쿠키를 삭제 (`Set-Cookie: jwt=; expires now`)
  - 자체로그인과 소셜로그인을 둘 다 구현할 때, 첫 소셜 로그인 이후 회원가입을 위해 추가 입력창을 둔다고 할 때, 추가 입력하는 부분은 자체 회원가입에서 이메일과 비밀번호를 제외한 부분과 같다. 이때 프론트엔드 쪽에서 폼 입력창을 똑같이 띄우지만, api 호출 로직은 다르게 하고 싶을 때 어떻게 할까? 유저가 회원가입 정보 입력하는 창에 있을 때 그가 소셜로그인인지 자체회원가입인지 구분할 필요가 있다

### API 연동

api 호출 axios 사용 -> NextApi를 사용하지 않은 이유는?
request/response dto 구현

### useServer, Server Action?

조사해서 정리할 필요가 있음

### CSS

- 빠른 컴포넌트 제작을 위해 MUI를 활용함  
  mui 중에서도 어떤 거 활용했는지 서술 필요!!
- Font: Pretendard variable 웹 폰트 다운로드 후 next/font/local로 추가함. theme.ts에서 MUI Typography에서 default font family를 Pretendard font로 지정함
- svg : @svgr/webpack 설치 후 next.config.ts에 추가해서 컴포넌트로 사용할 수 있게 함
- 이미지는 어케 할 거임?

### Theme

- Mui theme 적용 예정 https://mui.com/material-ui/customization/theming/?srsltid=AfmBOorzkNERTSiPt8SeI7DWgU3grSdEYlceHIXuDBiyTtt27SB86KVa
- db에서 유저가 선택한 테마 정보를 갖고 있기 때문에, 회원가입 초기에 테마 정보를 가져와 localStorage에 저장해놓는다


### 3D Object 렌더링
https://blog.bigpi.co/180 -> webgl
https://paveldogreat.github.io/WebGL-Fluid-Simulation/ -> webgl 유체 시뮬레이션 사이트... 흥미롭다

### 반응형 디자인
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia 참고


### 카메라 사용과 Video 최적화
https://nextjs.org/docs/app/building-your-application/optimizing/videos


### 공통 컴포넌트 
(Modal, Toast)
https://blog.bigpi.co/214


### 메타데이터
참고할 만한 자료:
https://nextjs.org/learn/dashboard-app/adding-metadata


### 웹뷰 앱
추후 개발 사항
https://velog.io/@phraqe/Sekkison19-WebView-App-%EB%A7%8C%EB%93%A4%EA%B8%B0-feat.-GoNative