# 경력 기술서 사이트

`index.html` 을 더블클릭하면 브라우저에서 바로 열립니다. 서버가 필요 없습니다.

## 파일 구성

| 파일 | 역할 | 수정 빈도 |
|---|---|---|
| `content.js` | **모든 글 내용** (이름, 경력, 프로젝트, 링크) | 자주 |
| `assets/` | 이미지 | 가끔 |
| `style.css` | 색 · 글꼴 · 여백 | 드묾 |
| `app.js` | content.js 를 화면에 그리는 코드 | 거의 없음 |
| `index.html` | 뼈대 | 거의 없음 |

## 내용 고치기

1. `content.js` 를 메모장이나 VS Code로 엽니다.
2. 따옴표 안의 글을 고칩니다. 항목을 지우려면 그 줄(또는 `{ ... },` 블록)을 통째로 지웁니다.
3. 저장 후 브라우저에서 새로고침합니다.

자주 쓰는 위치:

- 첫 화면 한 줄 소개 → `profile.headline`
- 프로필 사진 → `profile.avatar` 에 `"assets/photo.jpg"` 처럼. 비워두면 `profile.initials` 글자가 동그라미로 표시됩니다
- 첫 화면 숫자 타일 → `profile.stats` (4개 권장)
- 경력 요약 표 → `timeline`
- 회사별 작업 항목 → `careers[...].projects[...].works` (항목 하나가 `{ title, slogan, lead, points, lesson }`)
- 한 항목 안에 소항목을 더 두려면 `subs: [ { title, slogan, points } ]` (Voyager 전투 시스템 참고)
- 인생 목표 한 줄 → `principles.goal.title`
- 개인 프로젝트 → `personal`
- 상용작 기반 설계 문서 → `designPortfolio` (개인 프로젝트와 같은 형식)
- 제목 붙은 소단락 → `blocks: [ { label, items } ]`. 문장 안 `**굵게**` 사용 가능
- 버튼 여러 개 → `links: [ { label, url } ]`
- 이름 아래 장르 뱃지 → `tags: ["키워드", ...]`
- 카드 오른쪽 작은 대표 이미지 → `thumb: "assets/파일.jpg"` (16:9로 잘려 보임)
- 이메일 버튼은 누르면 `profile.email` 주소를 복사합니다. 주소만 바꾸면 두 버튼 모두 따라갑니다

주의: 따옴표(`"`)와 쉼표(`,`)가 빠지면 페이지가 비어 보입니다. 그럴 땐 마지막에 고친 곳을 확인하세요. 문장 안에 따옴표를 쓰려면 `\"` 로 적습니다.

## 이미지 바꾸기

1. 이미지를 `assets/` 폴더에 넣습니다 (png, jpg).
2. `content.js` 에서 `image: "assets/파일이름.png"` 로 경로를 바꿉니다.
3. 프로젝트 대표 이미지는 16:9 비율로 잘려 보입니다. 로고처럼 전체가 보여야 하면 파일 이름에 `logo` 를 넣으세요.

## 색 · 글꼴 바꾸기

`style.css` 맨 위 `:root` 블록의 값만 바꾸면 됩니다. shadcn/ui 의 zinc 토큰 이름을 그대로 씁니다.

- `--background`, `--foreground` : 배경 · 글자색
- `--muted`, `--muted-foreground` : 보조 배경 · 보조 글자색
- `--border` : 카드 테두리, 구분선
- `--primary`, `--primary-foreground` : 강조 버튼과 인생 목표 띠
- `--radius` : 모서리 둥글기

다크 모드는 뷰어의 시스템 설정을 따라갑니다. 같은 파일 아래쪽 다크 블록에 같은 이름의 값이 있으니 둘 다 바꿔야 합니다.

## 공개 주소와 다시 올리기

- 공개 주소: https://jigear.github.io/
- 저장소: https://github.com/JiGear/JiGear.github.io

이 폴더가 곧 저장소입니다. 고친 뒤 올리면 1~2분 안에 공개 주소에 반영됩니다.

**GitHub Desktop으로 올리기**

1. GitHub Desktop 에서 File → Add local repository 로 이 폴더를 한 번 추가합니다.
2. 파일을 고친 뒤 왼쪽 아래 Summary 에 한 줄 설명을 적고 **Commit to main** 을 누릅니다.
3. 위쪽 **Push origin** 을 누릅니다.

**터미널로 올리기**

```
git add -A
git commit -m "내용 수정"
git push
```

`.gitignore` 에 적힌 파일은 올라가지 않습니다. 공개하면 안 되는 이미지는 여기에 이름을 추가하세요.

## PDF로 저장

브라우저에서 Ctrl+P → "PDF로 저장". 접힌 작업 항목은 인쇄 전에 펼쳐 두세요.
