import type { Metadata } from "next";
import Image from "next/image";
import SocialLinks from "@/components/social-links";
import {
  LuServer,
  LuZap,
  LuWorkflow,
  LuGitMerge,
  LuPlug,
  LuLayers,
  LuCode,
  LuScanLine,
  LuShield,
  LuCloud,
  LuFileText,
  LuMapPin,
  LuContainer,
  LuKanban,
  LuGraduationCap,
  LuBookOpen,
  LuLightbulb,
} from "react-icons/lu";

export const metadata: Metadata = {
  title: "About | 이성",
  description: "백엔드 개발자 이성에 대해 알아보세요.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Profile */}
      <section className="flex items-start gap-6">
        <Image
          src="/images/profile.jpg"
          alt="이성 프로필 사진"
          width={128}
          height={128}
          className="rounded-full"
          priority
        />
        <div className="min-w-0 space-y-2">
          <h1 className="text-3xl font-bold text-ctp-text text-wrap-balance">이성</h1>
          <p className="text-lg text-ctp-subtext-1">Backend Developer</p>
          <p className="text-sm text-ctp-subtext-0">
            한국방송통신대학교 컴퓨터과학과 재학 중
          </p>
        </div>
      </section>

      {/* Career */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-ctp-text text-wrap-balance">Career</h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-ctp-mantle p-4">
            <h3 className="font-medium text-ctp-text">(주)어딩 (Eoding)</h3>
            <p className="text-sm text-ctp-subtext-0">
              개발팀 &middot; Backend Developer &middot; 2022.06 &ndash;
              2024.08
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ctp-subtext-1">
              <li className="flex gap-2">
                <LuServer aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                Django 기반 대규모 프로젝트 백엔드 개발 및 DB 관리
              </li>
              <li className="flex gap-2">
                <LuZap aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                페이지 로딩 속도 10초 → 1초 이내 최적화 (사전 집계 테이블 설계,
                SQL 최적화)
              </li>
              <li className="flex gap-2">
                <LuWorkflow aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                Redis + Celery 기반 비동기 처리 시스템 구축으로 서버 과부하 해소
              </li>
              <li className="flex gap-2">
                <LuGitMerge aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                마이그레이션 표준 프로세스 도입으로 협업 효율성 및 시스템 안정성
                향상
              </li>
              <li className="flex gap-2">
                <LuPlug aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                외부 API 연동 및 항공권 예약 데이터 핸들링 시스템 개발
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-ctp-text text-wrap-balance">Projects</h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-ctp-mantle p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-ctp-text">SoftwareCampus</h3>
              <div className="flex gap-3">
                <a
                  href="https://softwarecampus.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ctp-blue hover:text-ctp-sapphire"
                >
                  Live &rarr;
                </a>
                <a
                  href="https://github.com/sw-campus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ctp-blue hover:text-ctp-sapphire"
                >
                  GitHub &rarr;
                </a>
              </div>
            </div>
            <p className="text-sm text-ctp-subtext-0">
              백엔드 리드 &middot; 5인 개발 &middot; 2025 &ndash; 현재
            </p>
            <p className="mt-2 text-sm text-ctp-subtext-1">
              개발자 준비생을 위한 부트캠프 비교 플랫폼. 최우수상 수상 후
              런칭하여 유지보수 및 신규 기능 개발 중.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ctp-subtext-1">
              <li className="flex gap-2">
                <LuLayers aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                멀티 모듈 아키텍처(api/domain/infra) 설계로 레이어 간 의존성
                분리
              </li>
              <li className="flex gap-2">
                <LuCode aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                105개+ REST API 설계 및 구현
              </li>
              <li className="flex gap-2">
                <LuScanLine aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                OCR + Jaro-Winkler 유사도 알고리즘 기반 수료증 자동 검증
                시스템 개발
              </li>
              <li className="flex gap-2">
                <LuShield aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                JWT + OAuth 2.0(Google, GitHub) 인증/인가 시스템 구현
              </li>
              <li className="flex gap-2">
                <LuCloud aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                AWS S3 Presigned URL 파일 업로드, Redis 캐싱, Rate Limiting
                적용
              </li>
              <li className="flex gap-2">
                <LuFileText aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                문서 주도 개발 프로세스 구축 (PRD → 시퀀스 → Spec → 구현)
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                "Spring Boot 3.4",
                "JPA",
                "PostgreSQL",
                "Next.js",
                "Redis",
                "AWS S3",
                "OAuth 2.0",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-ctp-surface-0 px-2 py-0.5 text-xs text-ctp-subtext-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-ctp-mantle p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-ctp-text">
                원데이 클래스 매칭 서비스
              </h3>
              <a
                href="https://github.com/305forproject/for_project"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ctp-blue hover:text-ctp-sapphire"
              >
                GitHub &rarr;
              </a>
            </div>
            <p className="text-sm text-ctp-subtext-0">
              팀장 &middot; 3인 개발 &middot; 2025
            </p>
            <p className="mt-2 text-sm text-ctp-subtext-1">
              원데이/정기 클래스 수요를 자동 매칭하고 예약·결제를 간소화하는
              서비스.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ctp-subtext-1">
              <li className="flex gap-2">
                <LuMapPin aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                클래스 등록 시스템 전체 개발 및 KAKAO MAP API Geocoder 연동
              </li>
              <li className="flex gap-2">
                <LuContainer aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                Docker 컨테이너 자동화 구성
              </li>
              <li className="flex gap-2">
                <LuKanban aria-hidden="true" className="mt-0.5 shrink-0 text-ctp-overlay-1" />
                GitHub Issue, Wiki, Projects를 활용한 프로젝트 관리 주도
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Java Servlet", "JSP", "MySQL", "Docker", "Kakao MAP API"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-ctp-surface-0 px-2 py-0.5 text-xs text-ctp-subtext-1"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-ctp-text text-wrap-balance">Tech Stack</h2>
        <div className="space-y-3">
          <div>
            <p className="mb-1.5 text-sm font-medium text-ctp-subtext-0">
              Backend
            </p>
            <div className="flex flex-wrap gap-2">
              {["Java", "Spring Boot", "JPA", "MyBatis", "Python", "Django"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-ctp-surface-0 px-3 py-1 text-sm text-ctp-subtext-1"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-sm font-medium text-ctp-subtext-0">
              Frontend
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind CSS",
                "JavaScript",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-ctp-surface-0 px-3 py-1 text-sm text-ctp-subtext-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-sm font-medium text-ctp-subtext-0">
              Infrastructure & DB
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "PostgreSQL",
                "MySQL",
                "Redis",
                "Docker",
                "AWS S3",
                "GitHub Actions",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-ctp-surface-0 px-3 py-1 text-sm text-ctp-subtext-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-ctp-text text-wrap-balance">Education</h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-ctp-mantle p-4">
            <h3 className="font-medium text-ctp-text">
              한국방송통신대학교
            </h3>
            <p className="text-sm text-ctp-subtext-0">
              컴퓨터과학과 &middot; 2023.06 &ndash; 2027.06 (졸업예정)
            </p>
          </div>
          <div className="rounded-lg bg-ctp-mantle p-4">
            <h3 className="font-medium text-ctp-text">
              한국소프트웨어기술진흥협회 (KOSTA)
            </h3>
            <p className="text-sm text-ctp-subtext-0">
              클라우드 네이티브 애플리케이션 개발(CNA) 전문가 양성과정 &middot;
              2025.07 &ndash; 2025.12
            </p>
            <p className="mt-1 text-sm text-ctp-subtext-1">
              Java, Spring, JPA, React, MySQL
            </p>
          </div>
          <div className="rounded-lg bg-ctp-mantle p-4">
            <h3 className="font-medium text-ctp-text">스파르타코딩클럽</h3>
            <p className="text-sm text-ctp-subtext-0">
              내일배움캠프 AI 백엔드 개발자 양성과정 1기 &middot; 2021.12
              &ndash; 2022.04
            </p>
            <p className="mt-1 text-sm text-ctp-subtext-1">
              Python, Django, Flask, MySQL
            </p>
          </div>
        </div>
      </section>

      {/* Now */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-ctp-text text-wrap-balance">Now</h2>
        <ul className="space-y-2 text-ctp-subtext-1 leading-relaxed">
          <li className="flex gap-2">
            <LuGraduationCap aria-hidden="true" className="mt-1 shrink-0 text-ctp-overlay-1" />
            한국방송통신대학교 컴퓨터과학과에서 CS 기초를 다지고 있습니다.
          </li>
          <li className="flex gap-2">
            <LuBookOpen aria-hidden="true" className="mt-1 shrink-0 text-ctp-overlay-1" />
            Spring Boot + JPA 기반 백엔드 아키텍처를 깊이 있게 학습하고
            있습니다.
          </li>
          <li className="flex gap-2">
            <LuLightbulb aria-hidden="true" className="mt-1 shrink-0 text-ctp-overlay-1" />
            문서 주도 개발 프로세스와 AI 협업 환경 최적화에 관심을 갖고
            개인 프로젝트를 진행하고 있습니다.
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-ctp-text text-wrap-balance">Contact</h2>
        <p className="text-ctp-subtext-1">
          협업이나 대화에 관심이 있으시다면 편하게 연락주세요.
        </p>
        <SocialLinks />
      </section>
    </div>
  );
}
