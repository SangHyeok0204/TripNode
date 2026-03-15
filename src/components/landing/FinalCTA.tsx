import { Button } from "@/components/ui";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
              radial-gradient(circle at 80% 50%, white 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-white/20 animate-pulse" />
      <div className="absolute top-1/3 right-20 w-6 h-6 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full bg-white/15 animate-pulse" style={{ animationDelay: "0.5s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          지금 나만의 여행 코스를
          <br />
          만들어보세요
        </h2>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          복잡한 계획은 잊고, 지도 위에서 직관적으로 설계하세요
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            href="/plan"
            className="bg-white text-primary-600 hover:bg-primary-50 active:bg-primary-100 shadow-lg"
          >
            시작하기
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-primary-200">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            무료로 시작
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            회원가입 없이 체험
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            1분이면 첫 코스 완성
          </span>
        </div>
      </div>
    </section>
  );
}
