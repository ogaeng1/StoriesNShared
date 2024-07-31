# 기능 구현

​

## 🚀 로그인/회원가입

- Firebase Authentication를 통해 이메일 인증 회원가입 기능 구현, 구글 소셜 로그인 구현
- Zustand를 활용한 로그인/회원가입 폼 상태관리
  ​<br />
  ​<br />

## 🚀 게시글/댓글CRUD

- 게시글 및 댓글 CRUD
- 본인의 게시글 및 댓글에만 수정/삭제 권한 부여
- 본인의 게시글에 달린 댓글 삭제 가능
  ​​<br />
  ​<br />

## 🚀 상세 페이지

- 화면 전환 없이 상세 페이지를 볼 수 있도록 Parallel , Intercepting Routes 를 활용한 모달 상세 페이지
- React-query의 HydrationBoundary, QueryClient, dehydrate 를 활용한 SSR 적용
  ​<br />
  ​<br />

## 🚀 게시글 "좋아요"

- 빠른 UI 제공을 위한 Optimistic update 적용
  ​<br />
  ​<br />

## 🚀 유저 검색

- 서비스에 가입된 유저 검색 기능
- 사용자 입력 시 발생하던 API 호출을, React-query 캐싱과 디바운싱을 활용해 API 호출 개선
  ​<br />
  ​<br />

## 🚀 1:1 채팅

- NoSQL 데이터베이스 서비스이며, 실시간 리스너를 통해 사용자와 기기간 데이터의 실시간 동기화가 가능한 FireStore를 사용해 유저 간 1:1 채팅 구현
