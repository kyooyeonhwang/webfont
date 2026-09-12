# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Astro 4.0으로 구축된 한글 웹폰트 쇼케이스 웹사이트입니다. 일반 폰트와 가변 폰트를 포함한 다양한 한글 폰트를 미리보기하고 비교할 수 있는 플랫폼을 제공합니다. 사용자는 다양한 폰트 스타일과 굵기를 테스트하고, 커스텀 텍스트로 폰트가 어떻게 렌더링되는지 확인할 수 있습니다.

## 개발 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (localhost:3000)
npm run dev
# 또는
npm start

# 프로덕션 빌드 (./dist/에 출력)
npm run build

# 프로덕션 빌드 로컬 미리보기
npm run preview
```

## 아키텍처

### 핵심 기술
- **Astro 4.0**: 컴포넌트 기반 아키텍처를 가진 정적 사이트 생성기
- **SCSS**: Sass 전처리기를 사용한 스타일링
- **Vanilla JavaScript**: 클라이언트 측 인터랙션 (프레임워크 미사용)
- **Netlify**: 서버리스 함수를 지원하는 배포 플랫폼

### 프로젝트 구조

```
/
├── src/
│   ├── components/     # 재사용 가능한 Astro 컴포넌트
│   ├── layouts/        # 페이지 레이아웃 (Layout.astro, MainLayout.astro)
│   └── pages/          # 라우트 페이지 (index.astro, font-list.astro, font-compare.astro)
├── public/
│   ├── fonts/          # 폰트 파일
│   │   ├── static/     # 일반 폰트 파일 (.woff, .woff2)
│   │   └── variable/   # 가변 폰트 파일
│   ├── css/            # 스타일시트 (fonts.scss, styles.scss)
│   └── js/             # 클라이언트 스크립트 (app.js)
└── functions/          # Netlify 서버리스 함수
```

### 레이아웃 시스템

body 클래스와 사이드바 포함 여부만 다른 두 개의 메인 레이아웃이 있습니다:

- **MainLayout.astro**: 홈페이지에 사용, `<body class="home">` 포함, 사이드바 없음
- **Layout.astro**: 미리보기 페이지에 사용, 폰트 커스터마이징 사이드바가 있는 `<FontStyleCustom/>` 컴포넌트 포함

두 레이아웃 모두 동일한 컴포넌트를 import합니다: `Header`, `Footer`, `MainHead`, `FontStyleCustom`, `styles.scss`

### 페이지

1. **index.astro** (홈페이지): 한글 폰트 리소스 목록, GitHub 저장소와 홈페이지 링크 제공
2. **font-list.astro**: 약 17개의 한글 폰트를 인터랙티브하게 미리보기, 커스터마이징 가능한 스타일과 필터 체크리스트 제공
3. **font-compare.astro**: 가변 폰트와 일반 폰트를 나란히 비교 (현재 Pretendard만 지원)

### 폰트 관리

폰트는 두 가지 방법으로 로드됩니다:
1. **CDN import**: `public/css/fonts.scss`에서 `@import` 문 사용
2. **로컬 파일**: `public/fonts/`에서 `@font-face` 선언 사용

폰트 데이터는 페이지 frontmatter에 다음을 포함하는 객체 배열로 정의됩니다:
- `name` 또는 `fontName`: 표시 이름
- `className`: 스타일링을 위한 CSS 클래스
- `github`: GitHub 저장소 URL (선택)
- `homepage`: 폰트 홈페이지 URL (선택)

### 인터랙티브 기능

`public/js/app.js` 스크립트는 실시간 폰트 미리보기 컨트롤을 제공합니다:
- 폰트 크기 슬라이더 (12-100px)
- 폰트 굵기 슬라이더 (100-900)
- 줄 높이 슬라이더 (1-2)
- 색상 선택기
- 배경색 선택기
- 폰트 가시성 토글 체크박스 (font-list 페이지)

이 컨트롤들은 미리보기 컨테이너의 CSS 커스텀 속성을 동적으로 업데이트합니다.

## 새 폰트 추가하기

새로운 한글 폰트를 추가하려면:

1. **폰트 파일 추가**: `.woff2` 파일을 `public/fonts/static/` 또는 `public/fonts/variable/`에 배치

2. **@font-face 정의**: `public/css/fonts.scss`에 선언 추가:
   ```scss
   @font-face {
     font-family: 'YourFont-Regular';
     src: local(※), url('/fonts/static/YourFont-Regular.woff2') format('woff2');
   }
   ```

3. **폰트 목록 업데이트**: `src/pages/index.astro`의 `fontLists` 배열에 추가:
   ```javascript
   {
     name: "Your Font",
     github: "https://github.com/...",
     homepage: "https://..."
   }
   ```

4. **미리보기 항목 추가**: `src/pages/font-list.astro`의 `fontPreviewLists`에 추가:
   ```javascript
   {
     fontName: 'Your Font',
     className: 'yourfont-normal'
   }
   ```

5. **CSS 클래스 정의**: `public/css/styles.scss`에 2단계의 font-family와 일치하는 스타일 추가

## 중요 참고사항

- 사이트는 한국어(`lang="ko"`)를 사용하며 콘텐츠에 한글 텍스트를 포함합니다
- 특정 페이지에서는 `#jsFontWeightRange`를 확인하는 인라인 스크립트를 통해 폰트 굵기 컨트롤이 비활성화됩니다
- 모든 외부 링크는 `target="_blank"`와 `title="새창열림"`을 사용합니다
- 메인 JavaScript는 간단한 `$$()` 셀렉터 헬퍼를 사용합니다: `const $$ = (el) => document.querySelector(el)`
- Textarea 콘텐츠는 미리보기 div에 렌더링될 때 `replace(/\r?\n/g, '<br />')`를 사용하여 처리됩니다
