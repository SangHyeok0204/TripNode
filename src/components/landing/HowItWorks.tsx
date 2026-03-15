import { SectionWrapper } from "@/components/ui";

const steps = [
  {
    number: "01",
    title: "장소 검색",
    description: "가고 싶은 장소를 검색하세요",
    mockType: "search",
  },
  {
    number: "02",
    title: "노드 추가",
    description: "지도 위에 노드로 배치하세요",
    mockType: "add",
  },
  {
    number: "03",
    title: "생성하기",
    description: "버튼 하나로 주변 추천 스팟을 받으세요",
    mockType: "generate",
  },
  {
    number: "04",
    title: "경로 완성",
    description: "마음에 드는 코스를 저장하세요",
    mockType: "complete",
  },
];

function StepMock({ type }: { type: string }) {
  if (type === "search") {
    return (
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div className="flex-1 h-4 bg-gray-100 rounded text-xs text-gray-400 flex items-center px-2">
            경복궁
          </div>
        </div>
      </div>
    );
  }

  if (type === "add") {
    return (
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">
            +
          </div>
          <span className="text-xs text-gray-600">노드 추가</span>
        </div>
      </div>
    );
  }

  if (type === "generate") {
    return (
      <div className="bg-primary-500 rounded-lg p-3 shadow-sm">
        <div className="flex items-center justify-center gap-2 text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xs font-medium">생성</span>
        </div>
      </div>
    );
  }

  if (type === "complete") {
    return (
      <div className="bg-white rounded-lg p-3 shadow-sm border border-primary-200">
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-xs text-primary-700 font-medium">저장 완료</span>
        </div>
      </div>
    );
  }

  return null;
}

export function HowItWorks() {
  return (
    <SectionWrapper background="primary-light">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          생각보다 쉬워요
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          단 4단계로 나만의 여행 코스 완성
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Connection line (desktop only) */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary-200 -translate-y-1/2 z-0" />

        <div className="grid md:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Step Number */}
              <div className="w-14 h-14 rounded-full bg-white border-4 border-primary-200 flex items-center justify-center mb-4 shadow-sm">
                <span className="text-lg font-bold text-primary-600">
                  {step.number}
                </span>
              </div>

              {/* Mock UI */}
              <div className="w-full max-w-[160px] mb-4">
                <StepMock type={step.mockType} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600">{step.description}</p>

              {/* Arrow (mobile only) */}
              {index < steps.length - 1 && (
                <div className="md:hidden my-4">
                  <svg className="w-6 h-6 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
