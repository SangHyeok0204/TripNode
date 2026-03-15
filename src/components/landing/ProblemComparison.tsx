import { SectionWrapper } from "@/components/ui";
import { LegacyUIStack, MapMock } from "@/components/mock";

export function ProblemComparison() {
  return (
    <SectionWrapper background="gray">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          여행 계획, 아직도 이렇게 하고 계신가요?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          여러 앱을 오가며 정보를 모으고, 머릿속으로 동선을 그리는 번거로움
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left - Legacy Way */}
        <div className="relative">
          <div className="absolute -top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700">
              기존 방식
            </span>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 min-h-[400px]">
            <LegacyUIStack />
            <div className="mt-4 pt-4 border-t border-gray-100">
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  지도 앱에서 길찾기 따로
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  리뷰 확인하려면 또 다른 앱
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  전체 동선 파악이 어려움
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right - TripNode Way */}
        <div className="relative">
          <div className="absolute -top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
              TripNode
            </span>
          </div>
          <div
            className="bg-white rounded-2xl p-6 shadow-lg border-2 border-primary-200 min-h-[400px]"
            style={{
              transform: "perspective(1000px) rotateY(-2deg)",
            }}
          >
            <MapMock
              className="h-[300px]"
              showPanel={false}
              showButton={true}
              showNodes={true}
              showSpots={true}
              showRoutes={true}
            />
            <div className="mt-4 pt-4 border-t border-primary-100">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  지도 위에서 한눈에 파악
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  노드 배치 후 추천 스팟 자동 표시
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  경로와 소요시간 즉시 확인
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
