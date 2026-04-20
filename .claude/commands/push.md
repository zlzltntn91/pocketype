---
description: 변경사항을 커밋하고 원격 저장소에 푸시
argument-hint: [커밋 메시지 (생략 시 자동 생성)]
---

# /push — 커밋 후 푸시

사용자 지정 메시지: $ARGUMENTS

## Step 1 — 현재 상태 파악 (병렬 실행)

다음 Bash 명령을 **한 번에 병렬로** 실행한다:
- `git status` — 변경/추적되지 않은 파일 확인 (`-uall` 금지)
- `git diff` — unstaged 변경
- `git diff --staged` — staged 변경
- `git log --oneline -10` — 최근 커밋 메시지 스타일 확인
- `git branch --show-current` — 현재 브랜치
- `git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null || echo "NO_UPSTREAM"` — upstream 존재 여부

## Step 2 — 가드

- 변경사항이 전혀 없으면(커밋할 것도 푸시할 것도 없음) 사용자에게 알리고 종료.
- `.env`, `credentials*`, `*.pem`, `*.key` 등 시크릿으로 보이는 파일이 스테이징되려 하면 경고하고 사용자 확인을 받는다.
- 현재 브랜치가 `main`/`master`이고 사용자가 강제 푸시를 요청하지 않았다면 일반 푸시만 수행한다. 강제 푸시 요청이 main 계열이면 명시적 재확인을 받는다.

## Step 3 — 커밋 메시지 결정

- `$ARGUMENTS`가 비어있지 않으면 그대로 커밋 메시지 제목으로 사용.
- 비어있으면 `git status` + `git diff` 분석해 한 줄 메시지 작성:
  - 변경 성격에 맞게 접두어 사용(add/update/fix/refactor/test/docs/chore).
  - "왜"에 집중한 1줄.
- 메시지 끝에 `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>` 포함.

## Step 4 — 스테이지 & 커밋 (병렬)

- 스테이지: `git add -A` 대신 변경된 파일을 **명시적으로** `git add <path ...>`로 추가. `.env`/키파일 등은 제외.
- 커밋은 HEREDOC으로 메시지 전달:
  ```bash
  git commit -m "$(cat <<'EOF'
  <제목>

  Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
  EOF
  )"
  ```
- pre-commit hook 실패 시 **amend 금지**. 원인 수정 후 새 커밋을 만든다.

## Step 5 — 푸시

- upstream이 있으면 `git push`.
- upstream이 없으면 `git push -u origin <현재 브랜치>`.
- 푸시 실패(non-fast-forward 등) 시 원인 보고 후 중단. 사용자 지시 없이 `--force`/`--force-with-lease` 사용 금지.

## Step 6 — 결과 보고

- 커밋 해시, 메시지 제목, 푸시된 원격/브랜치, 변경 파일 수를 한 블록으로 요약.
