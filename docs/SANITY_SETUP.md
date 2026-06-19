# Sanity 연결 방법

랜딩페이지는 Sanity가 연결되면 관리 상품을 사용하고, 연결 전에는 샘플 상품으로 빌드된다.

## 1. 프로젝트 만들기

Sanity 계정을 만든 뒤 새 프로젝트와 공개형 `production` 데이터셋을 준비한다. Vercel Marketplace의 Sanity 연동을 사용해도 된다.

## 2. 환경변수 설정

`site/.env.example`을 참고해 로컬 `site/.env`에 아래 값을 설정한다.

```text
PUBLIC_SANITY_PROJECT_ID=발급받은-project-id
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=발급받은-project-id
SANITY_STUDIO_DATASET=production
```

Vercel 프로젝트에는 `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`을 Production과 Preview 환경에 추가한다. 토큰은 공개 저장소에 커밋하지 않는다.

## 3. 관리 화면 실행

```powershell
npm --prefix site/studio install
npm --prefix site/studio run dev
```

상품을 만들고 `사이트에 공개`를 켠 뒤 게시한다. 가격 확인일로부터 14일이 지나면 공개 사이트에서 자동으로 숨겨진다.

## 4. 자동 재배포

사이트는 정적 빌드이므로 콘텐츠 게시 후 재배포가 필요하다.

1. Vercel 프로젝트의 Settings → Git → Deploy Hooks에서 훅을 만든다.
2. Sanity 관리 화면의 Settings → API → Webhooks에 훅 URL을 등록한다.
3. 필터는 `_type in ["product", "storeSettings"]`로 설정한다.
4. 생성된 훅 URL은 비밀값으로 취급하고 저장소에 넣지 않는다.

## 5. 공개 전 확인

- 실제 상품 사진과 가격을 사용한다.
- 가격 확인일과 소재·중량·옵션을 확인한다.
- Vercel 재배포가 성공했는지 확인한다.
- 사이트에서 오래된 가격 상품이 숨겨졌는지 확인한다.
