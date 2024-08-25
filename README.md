👉 [서비스 바로가기](https://main.d23r3yoflnaol9.amplifyapp.com/) <br />
👉 [기술적 의사결정 및 구현 기능](https://storiesnshared.gitbook.io/storiesnshared/)
<br />
<br />

## 1. 서비스 개요

### 📖 나의 이야기를 공유할 수 있는 SNS 서비스입니다.

### 다른 사람들의 이야기를 보면서 공감하고, 대화도 나누어보세요

<br />
<br />
<br />

## 2. 개발 환경

![Next JS](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/-Zustand-%23C04392?style=for-the-badge&logo&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=white)
![AWS Amplify](https://img.shields.io/badge/Amplify-FF9900?style=for-the-badge&logo=Amplify&logoColor=white)
<br />
<br />
<br />
<strong>서비스 아키텍처</strong>
<br />
<br />
![아키텍처](https://github.com/user-attachments/assets/b32e49d7-ad63-4ec2-9a5e-a5fc3dc644c8)

<br />
<br />
<br />

## 3. 폴더 구조

```
📁 Root
├──📁 public
│   ├──📁assets
│   │   ├──📁icons
│   │   └──📁images
├──📁 app                            # 라우팅 폴더
│   ├──📁(afterLogin)                # 그룹 라우팅
│   │   ├──📁 @modal                 # parellel routing
│   │   │   └──📁(.)post             # intercepting routing
│   │   │        └──📁[id]
│   │   ├──📁_component
│   │   ├──📁chat
│   │   │   ├──📁[id]
│   │   │   └──📁_component
│   │   ├──📁follow-feeds
│   │   │   ├──📁[id]
│   │   │   └──📁_component
│   │   ├──📁post
│   │   │   ├──📁[id]
│   │   │   └──📁_component
│   │   ├──📁search-user
│   │   │   └──📁_component
│   │   ├──📁users
│   │   │   ├──📁[id]
│   │   │   └──📁_component
│   ├──📁(beforeLogin)
│   │   ├──📁_component
│   │   └──📁signup
│   │       └──📁_component
│   ├──📁 components                  # 공통 컴포넌트
│   ├   ├──📁Icon
│   │   └──📁Ui
│   ├──📁 firebase                    # 파이어베이스 셋팅
│   ├──📁 store                       # zustand 상태 관리
│   ├──📁 utils                       # 재사용 유틸 함수
│   ├──📁 service                     # API 연동 및 비동기 작업 관련 함수 관리
│   │   └──📁 hooks                   # 커스텀 훅
│   ├──📄 App.tsx
├──📄 .env
└──📄 README.md
```

<br />
<br />
<br />

## 4. 기능 소개

| 로그인                                                                                    | 회원가입                                                                                   | 홈                                                                                       | 게시글 생성                                                                                 |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![login](https://github.com/user-attachments/assets/bf8e13be-fa27-4749-84c8-3e97b22a7bf2) | ![signup](https://github.com/user-attachments/assets/0a15da68-a5e0-41db-9df4-f63eb5d165cf) | ![home](https://github.com/user-attachments/assets/ebe5bdac-67a8-4b5e-b2dd-6b57fc53f864) | ![posting](https://github.com/user-attachments/assets/c3da69ca-8bf2-44c8-87a6-691b9afc64b1) |

| 상세 페이지                                                                                | 게시글 수정/삭제                                                                             | 게시글 좋아요                                                                            | 댓글 수정/삭제                                                                              |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![detail](https://github.com/user-attachments/assets/54712327-d48a-4cef-8735-c983b96f1179) | ![post_d_u](https://github.com/user-attachments/assets/34b0efae-4ac6-4817-bfb4-5619713eaa0b) | ![like](https://github.com/user-attachments/assets/a001b6f0-0ec0-4dd5-bdb9-78f6c0985b67) | ![comment](https://github.com/user-attachments/assets/65b11087-dda9-4fcf-aad8-aa90e21f8454) |

| 유저 검색                                                                                  | 팔로잉 유저 게시글                                                                              | 채팅                                                                                         | 유저 정보/팔로우                                                                              |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![search](https://github.com/user-attachments/assets/148fd697-e44c-43d2-9563-70fe1d8aef8e) | ![follow-feed](https://github.com/user-attachments/assets/cf2ce858-c2fb-4d8e-a765-0718662725de) | ![chatting](https://github.com/user-attachments/assets/1c08a9d4-a01e-488e-bdc2-155f679a3982) | ![following](https://github.com/user-attachments/assets/385465a8-b040-4bd6-8892-234052c699f5) |
