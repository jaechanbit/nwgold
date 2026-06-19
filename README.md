# 남원금방 랜딩 사이트

전북 남원에서 20년 이상의 경력을 가진 남원금방의 상품, 금 매입, 귀금속 수리 서비스를 소개하고 전화 문의와 매장 방문을 돕는 사이트다.

## 현재 단계

`site/`에 Astro 랜딩페이지가 구현되어 있다. 확정되지 않은 상품 가격과 임시 자산은 공개 배포 전에 반드시 교체하거나 확인한다.

## 로컬 실행

```powershell
cd site
npm install
npm run dev
```

검사 명령은 `npm run verify`, 프로덕션 빌드는 `npm run build`다.

## 기준 문서

- `AGENTS.md`: 작업 규칙과 품질 기준
- `docs/CONTEXT.md`: 사용자, 사업 목표, 제품 범위
- `docs/DESIGN.md`: 브랜드와 사용자 경험 기준
- `docs/CONTENT.md`: 문구, 가격, 사진 기준
- `docs/ARCHITECTURE.md`: 기술 구조와 콘텐츠 모델
- `docs/adr/`: 제품 및 기술 결정 기록

## 확정된 기술

- Astro
- TypeScript
- Sanity Studio 및 Content Lake
- Cloudflare Pages
- GitHub

## 구현 전 남은 정보

- 표시 가격의 조건
- 실제 상품, 점포, 수리 사진
- 카카오톡 채널 링크
- 방문 분석 방식

## 연동 대기

상품 관리 화면은 Sanity 계정과 프로젝트 ID가 준비되면 연결한다. 현재 랜딩페이지는 화면 검증용 샘플 상품 데이터를 사용한다.
