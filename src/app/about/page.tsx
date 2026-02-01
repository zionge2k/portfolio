import type { Metadata } from "next";
import Image from "next/image";
import CommandBlock from "@/components/command-block";
import { VimBuffer, Line } from "@/components/vim-buffer";
import VimToggle from "@/components/vim-toggle";

export const metadata: Metadata = {
  title: "About | 이성",
  description: "백엔드 개발자 이성에 대해 알아보세요.",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      {/* Profile */}
      <CommandBlock command="vim ~/about/profile.md" aria-label="프로필">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            src="/images/profile.png"
            alt="이성 프로필 사진"
            width={128}
            height={128}
            className="shrink-0 rounded-lg"
            priority
          />
          <VimBuffer filename="~/about/profile.md">
            <Line n={1}>
              <span className="font-semibold text-t-fg">이성 (Zion)</span>
            </Line>
            <Line n={2}>
              <span className="text-t-border" aria-hidden="true">
                ─────────────────
              </span>
            </Line>
            <Line n={3}>
              <span className="text-t-blue">Role</span>
              <span className="text-t-muted">: </span>
              <span className="text-t-fg">Backend Developer</span>
            </Line>
            <Line n={4}>
              <span className="text-t-blue">Education</span>
              <span className="text-t-muted">: </span>
              <span className="text-t-fg">
                한국방송통신대학교 컴퓨터과학과 재학 중
              </span>
            </Line>
          </VimBuffer>
        </div>
      </CommandBlock>

      {/* Career */}
      <CommandBlock command="vim ~/about/career.md" aria-label="경력">
        <VimBuffer filename="~/about/career.md">
          {(() => {
            const careers = [
              {
                company: "(주)소프트웨어캠퍼스 (SoftwareCampus)",
                role: "Backend Lead",
                period: "2026.01 – 현재",
                items: [
                  "부트캠프 비교 플랫폼 softwarecampus.co.kr 런칭 및 운영",
                  "프로젝트 상세: ~/projects/SoftwareCampus 참조",
                ],
              },
              {
                company: "(주)어딩 (Eoding)",
                role: "Backend Developer",
                period: "2022.06 – 2024.08",
                items: [
                  "Django 기반 대규모 프로젝트 백엔드 개발 및 DB 관리",
                  "페이지 로딩 속도 10초 → 1초 이내 최적화 (사전 집계 테이블 설계, SQL 최적화)",
                  "Redis + Celery 기반 비동기 처리 시스템 구축으로 서버 과부하 해소",
                  "마이그레이션 표준 프로세스 도입으로 협업 효율성 및 시스템 안정성 향상",
                  "외부 API 연동 및 항공권 예약 데이터 핸들링 시스템 개발",
                ],
              },
            ];
            let lineNum = 0;
            return careers.map(({ company, role, period, items }, idx) => (
              <div key={company}>
                {idx > 0 && <Line n={++lineNum} />}
                <Line n={++lineNum}>
                  <span className="font-semibold text-t-fg">
                    [{company}]
                  </span>
                </Line>
                <Line n={++lineNum}>
                  {"  "}
                  <span className="text-t-blue">Role</span>
                  <span className="text-t-muted">{":   "}</span>
                  <span className="text-t-fg">{role}</span>
                </Line>
                <Line n={++lineNum}>
                  {"  "}
                  <span className="text-t-blue">Period</span>
                  <span className="text-t-muted">{": "}</span>
                  <span className="text-t-fg">{period}</span>
                </Line>
                {items.map((item) => (
                  <Line key={item} n={++lineNum}>
                    {"  "}
                    <span className="text-t-green" aria-hidden="true">
                      &gt;{" "}
                    </span>
                    <span className="text-t-fg">{item}</span>
                  </Line>
                ))}
              </div>
            ));
          })()}
        </VimBuffer>
      </CommandBlock>

      {/* Projects */}
      <CommandBlock command="ls ~/projects" aria-label="프로젝트">
        <div className="space-y-6 text-sm">
          {/* SoftwareCampus */}
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <span className="text-t-blue" aria-hidden="true">
                drwxr-xr-x
              </span>
              <span className="font-semibold text-t-fg">SoftwareCampus/</span>
              <a
                href="https://softwarecampus.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SoftwareCampus 사이트"
                className="rounded text-t-cyan hover:text-t-br-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
              >
                [live]
              </a>
              <a
                href="https://github.com/sw-campus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SoftwareCampus GitHub"
                className="rounded text-t-cyan hover:text-t-br-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
              >
                [github]
              </a>
            </div>
            <p className="text-t-muted">
              {"  "}백엔드 리드 · 5인 개발 · 2025 – 현재
            </p>
            <p className="text-t-muted">
              {"  "}개발자 준비생을 위한 부트캠프 비교 플랫폼. 최우수상 수상 후
              런칭하여 유지보수 및 신규 기능 개발 중.
            </p>
            <VimToggle
              defaultOpen
              filename="SoftwareCampus/README.md"
              items={[
                "멀티 모듈 아키텍처(api/domain/infra) 설계로 레이어 간 의존성 분리",
                "105개+ REST API 설계 및 구현",
                "OCR + Jaro-Winkler 유사도 알고리즘 기반 수료증 자동 검증 시스템 개발",
                "JWT + OAuth 2.0(Google, GitHub) 인증/인가 시스템 구현",
                "AWS S3 Presigned URL 파일 업로드, Redis 캐싱, Rate Limiting 적용",
                "문서 주도 개발 프로세스 구축 (PRD → 시퀀스 → Spec → 구현)",
              ]}
            />
            <div className="mt-1 flex flex-wrap gap-1.5 pl-2">
              {[
                "Spring Boot 3.4",
                "JPA",
                "PostgreSQL",
                "Next.js",
                "Redis",
                "AWS S3",
                "OAuth 2.0",
              ].map((tech) => (
                <span key={tech} className="text-xs text-t-subtle">
                  [{tech}]
                </span>
              ))}
            </div>
          </div>

          {/* 원데이 클래스 */}
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <span className="text-t-blue" aria-hidden="true">
                drwxr-xr-x
              </span>
              <span className="font-semibold text-t-fg">
                oneday-class-matching/
              </span>
              <a
                href="https://github.com/305forproject/for_project"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="원데이 클래스 매칭 GitHub"
                className="rounded text-t-cyan hover:text-t-br-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
              >
                [github]
              </a>
            </div>
            <p className="text-t-muted">{"  "}팀장 · 3인 개발 · 2025</p>
            <p className="text-t-muted">
              {"  "}원데이/정기 클래스 수요를 자동 매칭하고 예약·결제를 간소화하는
              서비스.
            </p>
            <VimToggle
              defaultOpen
              filename="oneday-class-matching/README.md"
              items={[
                "클래스 등록 시스템 전체 개발 및 KAKAO MAP API Geocoder 연동",
                "Docker 컨테이너 자동화 구성",
                "GitHub Issue, Wiki, Projects를 활용한 프로젝트 관리 주도",
              ]}
            />
            <div className="mt-1 flex flex-wrap gap-1.5 pl-2">
              {[
                "Java Servlet",
                "JSP",
                "MySQL",
                "Docker",
                "Kakao MAP API",
              ].map((tech) => (
                <span key={tech} className="text-xs text-t-subtle">
                  [{tech}]
                </span>
              ))}
            </div>
          </div>
        </div>
      </CommandBlock>

      {/* Tech Stack */}
      <CommandBlock command="vim ~/.config/tech-stack.yml" aria-label="기술 스택">
        <VimBuffer filename="~/.config/tech-stack.yml">
          {(() => {
            const groups = [
              {
                category: "backend",
                items: [
                  "Java",
                  "Spring Boot",
                  "JPA",
                  "MyBatis",
                  "Python",
                  "Django",
                ],
              },
              {
                category: "frontend",
                items: [
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                  "JavaScript",
                ],
              },
              {
                category: "infra",
                items: [
                  "PostgreSQL",
                  "MySQL",
                  "Redis",
                  "Docker",
                  "AWS S3",
                  "GitHub Actions",
                ],
              },
            ];
            let lineNum = 0;
            return groups.map(({ category, items }) => (
              <div key={category}>
                <Line n={++lineNum}>
                  <span className="text-t-blue">{category}</span>
                  <span className="text-t-muted">:</span>
                </Line>
                {items.map((item) => (
                  <Line key={item} n={++lineNum}>
                    {"  "}
                    <span className="text-t-green">-</span>{" "}
                    <span className="text-t-fg">{item}</span>
                  </Line>
                ))}
              </div>
            ));
          })()}
        </VimBuffer>
      </CommandBlock>

      {/* Education */}
      <CommandBlock command="vim ~/education/history.log" aria-label="학력">
        <VimBuffer filename="~/education/history.log">
          {(() => {
            const entries = [
              {
                name: "한국방송통신대학교",
                detail: "컴퓨터과학과 · 2023.06 – 2027.06 (졸업예정)",
              },
              {
                name: "한국소프트웨어기술진흥협회 (KOSTA)",
                detail:
                  "클라우드 네이티브 애플리케이션 개발(CNA) 전문가 양성과정 · 2025.07 – 2025.12",
                stack: "Java, Spring, JPA, React, MySQL",
              },
              {
                name: "스파르타코딩클럽",
                detail:
                  "내일배움캠프 AI 백엔드 개발자 양성과정 1기 · 2021.12 – 2022.04",
                stack: "Python, Django, Flask, MySQL",
              },
            ];
            let lineNum = 0;
            return entries.map(({ name, detail, stack }) => (
              <div key={name} className="mb-1">
                <Line n={++lineNum}>
                  <span className="text-t-fg">[{name}]</span>
                </Line>
                <Line n={++lineNum}>
                  <span className="text-t-muted">
                    {"  "}
                    {detail}
                  </span>
                </Line>
                {stack && (
                  <Line n={++lineNum}>
                    <span className="text-t-subtle">
                      {"  "}# {stack}
                    </span>
                  </Line>
                )}
              </div>
            ));
          })()}
        </VimBuffer>
      </CommandBlock>

      {/* Now */}
      <CommandBlock command="vim ~/status/now.md" aria-label="현재">
        <VimBuffer filename="~/status/now.md">
          {[
            "한국방송통신대학교 컴퓨터과학과에서 CS 기초를 다지고 있습니다.",
            "Spring Boot + JPA 기반 백엔드 아키텍처를 깊이 있게 학습하고 있습니다.",
            "문서 주도 개발 프로세스와 AI 협업 환경 최적화에 관심을 갖고 개인 프로젝트를 진행하고 있습니다.",
          ].map((item, i) => (
            <Line key={item} n={i + 1}>
              <span className="text-t-green" aria-hidden="true">
                -{" "}
              </span>
              <span className="text-t-fg">{item}</span>
            </Line>
          ))}
        </VimBuffer>
      </CommandBlock>

      {/* Contact */}
      <CommandBlock command="vim ~/.ssh/contact.pub" aria-label="연락처">
        <VimBuffer filename="~/.ssh/contact.pub">
          <Line n={1}>
            <span className="text-t-fg">
              협업이나 대화에 관심이 있으시다면 편하게 연락주세요.
            </span>
          </Line>
          <Line n={2} />
          <Line n={3}>
            <a
              href="https://github.com/zionge2k"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub 프로필"
              className="rounded text-t-blue hover:text-t-br-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
            >
              <span className="text-t-green" aria-hidden="true">
                ${" "}
              </span>
              open github.com/zionge2k
            </a>
          </Line>
          <Line n={4}>
            <a
              href="mailto:zion.geek.py@gmail.com"
              aria-label="이메일 보내기"
              className="rounded text-t-blue hover:text-t-br-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
            >
              <span className="text-t-green" aria-hidden="true">
                ${" "}
              </span>
              mail zion.geek.py@gmail.com
            </a>
          </Line>
        </VimBuffer>
      </CommandBlock>
    </div>
  );
}
