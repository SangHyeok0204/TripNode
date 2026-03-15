import { Button } from "@/components/ui";
import { MapMock } from "@/components/mock";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - Blurred Map Mock */}
      <div className="absolute inset-0 opacity-10 blur-sm">
        <MapMock
          className="w-full h-full"
          showPanel={false}
          showButton={true}
          showNodes={true}
          showSpots={true}
          showRoutes={true}
        />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Copy */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          혼자 떠나는 여행,
          <br />
          <span className="text-primary-600">지도 위에서 직접 설계</span>
          하세요
        </h1>

        {/* Sub Copy */}
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          원하는 장소를 노드로 배치하고,
          <br className="hidden sm:block" />
          나만의 여행 경로를 직관적으로 완성하세요
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" variant="primary">
            여행 코스 만들기
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
          <Button size="lg" variant="outline">
            서비스 미리보기
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
