---
description: 멀티에이전트 TDD로 기능 구현 (Red → Green → Review → Refactor)
argument-hint: [기능 설명]
---

# /feature — 멀티에이전트 TDD 기능 구현

요구사항: $ARGUMENTS

너는 오케스트레이터다. 직접 코드를 작성하지 말고 아래 플로우에 따라 서브에이전트에 분배한다.
프로젝트 루트: `/Users/zlamstn/Documents/tutorial-hannes`

## 컨텍스트 변수 (대화 중 채워가며 다음 에이전트 호출 프롬프트에 반드시 포함)

- `$REQUIREMENT` — Phase 1에서 확정된 요구사항 한 줄.
- `$TEST_FILES` — tester가 만든 테스트 파일 절대 경로 목록.
- `$TEST_CMD` — 테스트 실행 명령 (프로젝트 루트 기준).
- `$IMPL_FILES` — implementer/refactorer가 수정·생성한 소스 파일 절대 경로 목록.
- `$LAST_TEST_OUTPUT` — 직전 테스트 실행의 통과/실패 로그 마지막 부분.
- `$REVIEW_FINDINGS` — reviewer가 반환한 지적사항 원문.
- `$LOOP_COUNT` — Review↔Refactor 반복 횟수 (초기값 0).

서브에이전트는 콜드 스타트라 부모 컨텍스트를 보지 못한다. 위 변수를 **값 그대로** 프롬프트에 꽂아야 한다. "구현된 파일들" 같은 추상 참조 금지.

## Phase 0 — 스킵 체크
요구사항이 다음 중 하나면 **서브에이전트를 호출하지 않고** 직접 한 번에 편집 후 종료한다.
- 타이포, 리네임, 1~2줄 수정
- 주석/문서만 변경
- 기존 테스트를 수정하지 않고 실행만 하는 경우

해당 없으면 Phase 1로 진행.

## Phase 1 — 요구사항 명확화
모호하면 `AskUserQuestion`으로 사용자에게 질문한다. 추측 금지.
답변을 반영해 한 줄 요구사항을 확정하고 `$REQUIREMENT`로 저장.

## Phase 2 — Red (tester)
`Agent(subagent_type="tester")` 호출. 프롬프트 템플릿:

```
요구사항: {$REQUIREMENT}
프로젝트 루트: /Users/zlamstn/Documents/tutorial-hannes
대상 모듈/파일 후보 (오케스트레이터가 Grep/Glob으로 탐색한 절대 경로):
  - <path-1>
  - <path-2>
예상 테스트 실행 명령 후보: <예: npm test -- <경로>, pytest <경로>, ./gradlew test --tests "...">

작업: 위 요구사항에 대한 실패하는 테스트를 작성하고 실행해 실패를 확인한다.
반환: 작성한 테스트 파일 절대 경로, 실행 명령, 실패 로그 마지막 부분, 구현자에게 전달할 기대 동작 한 줄.
```

대상 파일 후보가 없으면 Grep/Glob으로 직접 탐색한 뒤 목록을 채운다.
반환 결과로 `$TEST_FILES`, `$TEST_CMD`, `$LAST_TEST_OUTPUT` 채움.

## Phase 3 — Green (implementer)
`Agent(subagent_type="implementer")` 호출. 프롬프트 템플릿:

```
통과시켜야 할 테스트 파일 (절대 경로):
{$TEST_FILES}
테스트 실행 명령: {$TEST_CMD}
직전 실패 로그:
{$LAST_TEST_OUTPUT}
기대 동작: <tester가 반환한 "구현자에게 전달할 기대 동작" 원문>

제약:
- 테스트 파일을 수정하지 않는다.
- 테스트를 통과시키는 최소 구현만 작성한다.
- 요구되지 않은 에러 처리/검증/추상화를 추가하지 않는다.
- 기존 유틸/패턴을 먼저 Grep으로 찾아 재사용한다.

반환: 수정/생성한 소스 파일 절대 경로 목록, 테스트 실행 결과(통과 로그).
```

반환 결과로 `$IMPL_FILES` 갱신, `$LAST_TEST_OUTPUT`을 통과 로그로 갱신.

## Phase 4 — Review (reviewer)
`Agent(subagent_type="reviewer")` 호출. 프롬프트 템플릿:

```
변경 파일 전체 (절대 경로):
{$TEST_FILES} ∪ {$IMPL_FILES}
테스트 실행 명령: {$TEST_CMD}

작업: reviewer.md의 승인 기준 4가지(테스트 통과, 커버리지, 스타일, 보안)로 판정한다.
필요하면 위 명령으로 직접 테스트를 실행해 통과를 확인한다.

반환 형식은 reviewer.md 규약 그대로:
- 승인: YES / 승인: NO
- NO인 경우 지적사항 목록 (각 항목에 파일:라인, 분류 태그 포함)
```

결과 파싱:
- `승인: YES` → Phase 6(정상 종료).
- `승인: NO` → 지적사항 원문을 `$REVIEW_FINDINGS`에 저장, Phase 5로.

## Phase 5 — Refactor (refactorer)
조건: `$LOOP_COUNT < 3`. `$LOOP_COUNT == 3`이면 Phase 6(중단 경로)로.

`Agent(subagent_type="refactorer")` 호출. 프롬프트 템플릿:

```
반영할 지적사항 (원문 그대로):
{$REVIEW_FINDINGS}
현재 소스 파일 (절대 경로):
{$IMPL_FILES}
테스트 실행 명령: {$TEST_CMD}

제약:
- 지적사항 범위를 벗어난 수정 금지 (스코프 크립 금지).
- 테스트 파일은 reviewer가 명시적으로 지적한 경우에만 수정한다.
- 수정 후 반드시 테스트를 재실행해 통과를 확인한다.

반환: 반영한 지적사항 목록, 미반영 지적사항과 근거(있다면), 테스트 실행 결과.
```

`$LOOP_COUNT += 1`.
반환 결과로 `$IMPL_FILES`/`$LAST_TEST_OUTPUT` 갱신 후 Phase 4로 복귀.

## Phase 6 — 완료/중단 보고
**정상 종료** (`승인: YES`):
```
구현 완료
- 요구사항: {$REQUIREMENT}
- 구현 파일: {$IMPL_FILES}
- 테스트 파일: {$TEST_FILES}
- 테스트: {$TEST_CMD} → PASS
- 반복 횟수: {$LOOP_COUNT}
```

**중단** (3회 후에도 `승인: NO`):
```
3회 반복 후에도 리뷰 미승인. 사용자 판단 요청.
- 잔여 지적사항:
{$REVIEW_FINDINGS}
- 마지막 테스트 결과: {$LAST_TEST_OUTPUT}
- 구현 파일: {$IMPL_FILES}
```

learnings.md 갱신은 언급하지 않는다 (Stop hook이 자동 처리).
