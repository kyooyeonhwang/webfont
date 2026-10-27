# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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
- **Netlify**: 배포 플랫폼

### 프로젝트 구조

```
/
├── src/
│   ├── components/     # 재사용 가능한 Astro 컴포넌트
│   ├── layouts/        # 페이지 레이아웃 (Layout.astro)
│   └── pages/          # 라우트 페이지 (index.astro, font-list.astro, preview.astro, font-compare.astro)
├── public/
│   ├── fonts/          # 폰트 파일
│   │   ├── static/     # 일반 폰트 파일 (.woff, .woff2)
│   │   └── variable/   # 가변 폰트 파일
│   ├── css/            # 스타일시트 (fonts.scss, styles.scss)
│   └── js/             # 클라이언트 스크립트 (app.js)
```

### 레이아웃 시스템

모든 페이지는 `Layout.astro` 하나를 사용합니다:

- `isHome`: 홈페이지용. `<body class="home">`를 붙이고 사이드바(`FontStyleCustom`)와 `app.js`를 넣지 않음
- `disableWeight`: 폰트 굵기 슬라이더(`#jsFontWeightRange`) 비활성화 (일반 폰트 페이지용)

### 공통 컴포넌트

- `FontPreviewSection.astro`: 제목, 미리보기 textarea, 폰트 미리보기 목록 (`heading`, `lead`, `fonts` props)
- `FontFilter.astro`: 폰트 표시 필터 체크리스트 (`fonts` props)
- `FontStyleCustom.astro`: 크기·굵기·줄높이·색상 조절 사이드바
- `ExternalLink.astro`: `target="_blank"`, `rel="noopener noreferrer"`, `title="새창열림"`을 붙인 외부 링크
- `Header.astro`, `Footer.astro`, `MainHead.astro`

### 페이지

1. **index.astro** (홈페이지): 한글 폰트 리소스 목록, GitHub 저장소와 홈페이지 링크 제공
2. **font-list.astro**: 18개의 한글 일반 폰트를 인터랙티브하게 미리보기, 커스터마이징 가능한 스타일과 필터 체크리스트 제공
3. **preview.astro**: 한글 가변 폰트 미리보기와 필터 체크리스트 제공
4. **font-compare.astro**: 가변 폰트와 일반 폰트를 나란히 비교 (현재 Pretendard만 지원)

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
- 폰트 가시성 토글 체크박스 (font-list, preview 페이지)

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
- 일반 폰트 페이지(font-list)에서는 `Layout`의 `disableWeight` prop으로 폰트 굵기 컨트롤이 비활성화됩니다
- 외부 링크는 `ExternalLink` 컴포넌트를 사용합니다
- 메인 JavaScript는 간단한 `$$()` 셀렉터 헬퍼를 사용합니다: `const $$ = (el) => document.querySelector(el)`
- Textarea 콘텐츠는 미리보기 div에 렌더링될 때 `replace(/\r?\n/g, '<br />')`를 사용하여 처리됩니다
