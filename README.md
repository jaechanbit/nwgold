# 남원금방 랜딩 사이트

전북 남원에서 20년 이상의 경력을 가진 남원금방의 상품, 금 매입, 귀금속 수리 서비스를 소개하고 전화 문의와 매장 방문을 돕는 사이트다.

## 현재 구성

- `site/`: Astro 랜딩페이지
- `site/studio/`: 상품, 가격, 점포 정보를 수정하는 Sanity 관리 화면
- `vercel.json`: Vercel 빌드 설정

Sanity가 연결되지 않은 환경에서는 샘플 상품이 표시된다. 실제 상품 가격과 임시 사진은 공개 전에 반드시 교체하거나 확인한다.

## 로컬 실행

```powershell
cd site
npm install
npm run dev
```

검사 명령은 `npm run verify`, 프로덕션 빌드는 `npm run build`다.

## 상품 관리 화면

Sanity 프로젝트를 연결한 뒤 아래 명령으로 관리 화면을 실행한다.

```powershell
npm --prefix site/studio install
npm --prefix site/studio run dev
```

관리 화면에는 가격 확인일이 14일보다 오래된 상품을 모아 보여주는 `가격 확인 필요` 메뉴가 있다. 연결 절차와 자동 재배포 설정은 `docs/SANITY_SETUP.md`를 따른다.

## 기준 문서

- `AGENTS.md`: 작업 규칙과 품질 기준
- `docs/CONTEXT.md`: 사용자, 사업 목표, 제품 범위
- `docs/DESIGN.md`: 브랜드와 사용자 경험 기준
- `docs/CONTENT.md`: 문구, 가격, 사진 기준
- `docs/ARCHITECTURE.md`: 기술 구조와 콘텐츠 모델
- `docs/SANITY_SETUP.md`: 상품 관리 화면 연결 및 자동 배포 방법
- `docs/adr/`: 제품 및 기술 결정 기록

## 확정된 기술

- Astro
- TypeScript
- Sanity Studio 및 Content Lake
- Vercel
- GitHub

## 공개 전 남은 정보

- 표시 가격의 조건
- 실제 상품, 점포, 수리 사진
- 카카오톡 채널 링크
- 방문 분석 방식

## 연동 상태

관리 화면과 사이트 연동 코드는 준비되어 있다. Sanity 프로젝트 ID와 Vercel 환경변수를 등록하면 실제 관리 상품으로 전환된다.
